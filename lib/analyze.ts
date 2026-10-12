import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { GoogleGenAI } from "@google/genai";
import Groq from "groq-sdk";
import { SYSTEM_PROMPT, buildUserPrompt } from "./prompt";
import type { Bilingual, Verdict, VerdictResult } from "./types";

export class ConfigError extends Error {}
export class TimeoutError extends Error {}

const TIMEOUT_MS = 25_000;

type Provider = "gemini" | "anthropic" | "groq";

export async function analyzeMessage(message: string): Promise<VerdictResult> {
  const provider = resolveProvider();
  const raw = await withTimeout(callProvider(provider, message), TIMEOUT_MS);
  return parseResult(raw) ?? fallbackResult();
}

function resolveProvider(): Provider {
  const value = (process.env.AI_PROVIDER || "gemini").trim().toLowerCase();
  if (value === "gemini" || value === "anthropic" || value === "groq") {
    return value;
  }
  throw new ConfigError(
    `Unknown AI_PROVIDER "${value}". Use "gemini", "anthropic", or "groq".`
  );
}

function callProvider(provider: Provider, message: string): Promise<string> {
  switch (provider) {
    case "gemini":
      return callGemini(message);
    case "anthropic":
      return callAnthropic(message);
    case "groq":
      return callGroq(message);
  }
}

async function callGemini(message: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new ConfigError("GEMINI_API_KEY is not set.");

  const ai = new GoogleGenAI({ apiKey });
  const model = process.env.GEMINI_MODEL || "gemini-flash-latest";

  const response = await ai.models.generateContent({
    model,
    contents: buildUserPrompt(message),
    config: {
      systemInstruction: SYSTEM_PROMPT,
      responseMimeType: "application/json",
      temperature: 0.2,
      maxOutputTokens: 1024,
    },
  });

  return response.text ?? "";
}

async function callAnthropic(message: string): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new ConfigError("ANTHROPIC_API_KEY is not set.");

  const client = new Anthropic({ apiKey });
  const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-5";

  const response = await client.messages.create({
    model,
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: buildUserPrompt(message) }],
  });

  return response.content
    .map((block) => (block.type === "text" ? block.text : ""))
    .join("");
}

async function callGroq(message: string): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new ConfigError("GROQ_API_KEY is not set.");

  const groq = new Groq({ apiKey });
  const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

  const completion = await groq.chat.completions.create({
    model,
    temperature: 0.2,
    max_tokens: 1024,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildUserPrompt(message) },
    ],
  });

  return completion.choices[0]?.message?.content ?? "";
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new TimeoutError("The AI model took too long to answer.")),
      ms
    );
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      }
    );
  });
}

function parseResult(raw: string): VerdictResult | null {
  const json = extractJson(raw);
  if (!json) return null;
  try {
    return coerceResult(JSON.parse(json));
  } catch {
    return null;
  }
}

function extractJson(raw: string): string | null {
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  return raw.slice(start, end + 1);
}

function coerceResult(data: unknown): VerdictResult | null {
  if (!data || typeof data !== "object") return null;
  const obj = data as Record<string, unknown>;
  if (!("verdict" in obj)) return null;

  const fallback = fallbackResult();
  const rawFlags = Array.isArray(obj.redFlags) ? obj.redFlags : [];
  const redFlags = rawFlags
    .map((flag) => asBilingual(flag, { ur: "", en: "" }))
    .filter((flag) => flag.ur || flag.en);

  return {
    verdict: asVerdict(obj.verdict),
    redFlags,
    action: asBilingual(obj.action, fallback.action),
    explanation: asBilingual(obj.explanation, fallback.explanation),
    certaintyNote: asBilingual(obj.certaintyNote, fallback.certaintyNote),
  };
}

function asVerdict(value: unknown): Verdict {
  const text = String(value ?? "")
    .toUpperCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (text.includes("PROBABLY")) return "PROBABLY SCAM";
  if (text.includes("SAFE")) return "LOOKS SAFE";
  if (text.includes("SCAM")) return "SCAM";
  return "PROBABLY SCAM";
}

function asBilingual(value: unknown, fallback: Bilingual): Bilingual {
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const ur = typeof obj.ur === "string" ? obj.ur.trim() : "";
    const en = typeof obj.en === "string" ? obj.en.trim() : "";
    if (ur || en) return { ur: ur || en, en: en || ur };
  }
  if (typeof value === "string" && value.trim()) {
    const text = value.trim();
    return { ur: text, en: text };
  }
  return fallback;
}

export function fallbackResult(): VerdictResult {
  return {
    verdict: "PROBABLY SCAM",
    redFlags: [
      {
        ur: "Hum is message ko theek se parh nahi sake.",
        en: "We could not read this message properly.",
      },
    ],
    action: {
      ur: "Ehtiyaat karein: koi code ya PIN share na karein, number par call na karein, aur asli website par check karein.",
      en: "Be careful: do not share any code or PIN, do not call the number, and check on the official website.",
    },
    explanation: {
      ur: "System saaf jawab nahi de saka. Shaq ki surat mein ehtiyaat behtar hai.",
      en: "The system could not give a clear answer. When in doubt, it is safer to be careful.",
    },
    certaintyNote: {
      ur: "Koi bhi message 100% safe nahi kaha ja sakta.",
      en: "No message can be called 100% safe.",
    },
  };
}
