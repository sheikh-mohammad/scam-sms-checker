"use client";

import { useEffect, useRef, useState } from "react";
import {
  MAX_MESSAGE_LENGTH,
  type Bilingual,
  type CheckResponse,
  type ErrorCode,
  type Verdict,
  type VerdictResult,
} from "@/lib/types";

type Lang = "ur" | "en";

const VERDICT_META: Record<
  Verdict,
  {
    label: Bilingual;
    header: string;
    flag: string;
  }
> = {
  SCAM: {
    label: { ur: "Yeh pakka scam hai", en: "This is a scam" },
    header: "bg-red-600 text-white",
    flag: "bg-red-100 text-red-800",
  },
  "PROBABLY SCAM": {
    label: { ur: "Yeh shayad scam hai", en: "This is probably a scam" },
    header: "bg-orange-500 text-white",
    flag: "bg-orange-100 text-orange-900",
  },
  "LOOKS SAFE": {
    label: { ur: "Scam ki koi nishani nahi mili", en: "No scam signs found" },
    header: "bg-green-600 text-white",
    flag: "bg-green-100 text-green-800",
  },
};

const UI: Record<Lang, Record<string, string>> = {
  ur: {
    appName: "Scam SMS Checker",
    tagline: "Message paste karein — hum batayenge scam hai ya nahi.",
    toggleTo: "English",
    boxLabel: "SMS ya WhatsApp message yahan paste karein",
    placeholder:
      "Misal: Mubarak ho! BISP ki taraf se aap ne Rs 25,00,000 ka inaam jeeta hai. Apna CNIC aur code bhejein...",
    check: "Check karein",
    checking: "Check ho raha hai...",
    clear: "Saaf karein",
    listen: "Sunnain",
    stop: "Rok dein",
    warn: "Family group ko warn karein",
    another: "Doosra message check karein",
    resultTitle: "Natija",
    flagsTitle: "Khatarnak nishaniyan (red flags)",
    noFlags: "Koi khaas khatarnak nishani nahi mili.",
    actionTitle: "Kya karein",
    empty: "Pehle message paste karein.",
    tooLong: "Message bohot lamba hai. Chhota kar ke try karein.",
    badRequest: "Masla ho gaya. Dobara try karein.",
    notConfigured: "Service abhi tayyar nahi hai (API key set nahi hai).",
    provider: "AI jawab nahi de saka. Thori der baad try karein.",
    timeout: "Jawab aane mein waqt lag raha hai. Dobara try karein.",
    network: "Internet se rabta nahi ho saka. Dobara try karein.",
    privacy: "Hum aap ke messages save nahi karte. Kuch bhi server par mehfooz nahi hota.",
  },
  en: {
    appName: "Scam SMS Checker",
    tagline: "Paste a message — we'll tell you if it's a scam.",
    toggleTo: "اردو",
    boxLabel: "Paste the SMS or WhatsApp message here",
    placeholder:
      "Example: Mubarak ho! BISP ki taraf se aap ne Rs 25,00,000 ka inaam jeeta hai. Apna CNIC aur code bhejein...",
    check: "Check",
    checking: "Checking...",
    clear: "Clear",
    listen: "Listen",
    stop: "Stop",
    warn: "Warn the family group",
    another: "Check another message",
    resultTitle: "Result",
    flagsTitle: "Red flags",
    noFlags: "No specific red flags were found.",
    actionTitle: "What to do",
    empty: "Please paste a message first.",
    tooLong: "This message is too long. Please shorten it and try again.",
    badRequest: "Something went wrong. Please try again.",
    notConfigured: "The service is not ready yet (no API key set).",
    provider: "The AI could not answer. Please try again in a moment.",
    timeout: "The answer is taking too long. Please try again.",
    network: "Could not reach the server. Please try again.",
    privacy: "We never store your messages. Nothing is saved on the server.",
  },
};

function t(lang: Lang, key: string): string {
  return UI[lang][key] ?? key;
}

function errorMessage(lang: Lang, code: ErrorCode): string {
  switch (code) {
    case "EMPTY":
      return t(lang, "empty");
    case "TOO_LONG":
      return t(lang, "tooLong");
    case "NOT_CONFIGURED":
      return t(lang, "notConfigured");
    case "TIMEOUT":
      return t(lang, "timeout");
    case "BAD_REQUEST":
      return t(lang, "badRequest");
    default:
      return t(lang, "provider");
  }
}

export default function Checker() {
  const [lang, setLang] = useState<Lang>("ur");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerdictResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [speaking, setSpeaking] = useState(false);

  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);

  const primary: Lang = lang;
  const secondary: Lang = lang === "ur" ? "en" : "ur";

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (result) {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const load = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", load);
      window.speechSynthesis.cancel();
    };
  }, []);

  async function onCheck() {
    const text = message.trim();
    if (!text) {
      setError(t(lang, "empty"));
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    stopSpeaking();

    try {
      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = (await res.json()) as CheckResponse;
      if (data.ok) {
        setResult(data.result);
      } else {
        setError(errorMessage(lang, data.code));
      }
    } catch {
      setError(t(lang, "network"));
    } finally {
      setLoading(false);
    }
  }

  function onClear() {
    setMessage("");
    setResult(null);
    setError(null);
    stopSpeaking();
  }

  function buildSpeech(r: VerdictResult): string {
    const meta = VERDICT_META[r.verdict];
    const parts = [
      meta.label[primary],
      r.explanation[primary],
      ...r.redFlags.map((flag) => flag[primary]),
      r.action[primary],
      r.certaintyNote[primary],
    ];
    return parts.filter(Boolean).join(". ");
  }

  function pickVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
    if (primary === "ur") {
      return (
        voices.find((v) => /^ur\b/i.test(v.lang)) ||
        voices.find((v) => /urdu|nastaliq/i.test(v.name))
      );
    }
    return voices.find((v) => /^en\b/i.test(v.lang));
  }

  function onListen() {
    if (speaking) {
      stopSpeaking();
      return;
    }
    if (!result || typeof window === "undefined" || !window.speechSynthesis) return;

    const synth = window.speechSynthesis;
    const voices = voicesRef.current.length ? voicesRef.current : synth.getVoices();
    const utterance = new SpeechSynthesisUtterance(buildSpeech(result));
    const voice = pickVoice(voices);

    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = "en-US";
    }
    utterance.rate = 0.95;

    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    synth.cancel();
    synth.speak(utterance);
    setSpeaking(true);
  }

  function stopSpeaking() {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
  }

  function onWarn() {
    if (!result) return;
    const meta = VERDICT_META[result.verdict];
    const flagLines = result.redFlags.map((flag) => `• ${flag[primary]}`);
    const lines = [
      "⚠️ *Scam SMS Checker*",
      `*${result.verdict}* — ${meta.label[primary]}`,
      result.explanation[primary],
      "",
      `${t(lang, "flagsTitle")}:`,
      ...(flagLines.length ? flagLines : [`• ${t(lang, "noFlags")}`]),
      "",
      `${t(lang, "actionTitle")}: ${result.action[primary]}`,
    ];
    const url = `https://wa.me/?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const meta = result ? VERDICT_META[result.verdict] : null;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col gap-5 px-4 py-6 text-lg">
      <header className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold leading-tight">
            {t(lang, "appName")}
          </h1>
          <p className="mt-1 text-base text-slate-600">{t(lang, "tagline")}</p>
        </div>
        <button
          type="button"
          onClick={() => setLang(lang === "ur" ? "en" : "ur")}
          aria-label="Switch language / زبان بدلیں"
          className="shrink-0 rounded-full border-2 border-slate-900 bg-white px-4 py-2 text-base font-bold text-slate-900 active:bg-slate-900 active:text-white"
        >
          {t(lang, "toggleTo")}
        </button>
      </header>

      <section className="rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-sm">
        <label htmlFor="message" className="mb-2 block text-base font-semibold text-slate-700">
          {t(lang, "boxLabel")}
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={t(lang, "placeholder")}
          maxLength={MAX_MESSAGE_LENGTH}
          rows={5}
          className="w-full resize-y rounded-xl border-2 border-slate-300 p-3 text-lg leading-relaxed outline-none focus:border-slate-900"
        />
        <div className="mt-3 flex gap-3">
          <button
            type="button"
            onClick={onCheck}
            disabled={loading}
            className="flex-1 rounded-xl bg-slate-900 px-5 py-4 text-xl font-extrabold text-white disabled:opacity-60"
          >
            {loading ? t(lang, "checking") : t(lang, "check")}
          </button>
          {(message || result) && (
            <button
              type="button"
              onClick={onClear}
              className="rounded-xl border-2 border-slate-300 px-4 py-4 text-lg font-bold text-slate-700"
            >
              {t(lang, "clear")}
            </button>
          )}
        </div>
      </section>

      {error && (
        <div
          role="alert"
          className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-4 text-base font-semibold text-amber-900"
        >
          {error}
        </div>
      )}

      {result && meta && (
        <div ref={resultRef} className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-sm">
          <div className={`${meta.header} p-5`}>
            <p className="text-sm font-semibold uppercase tracking-wide opacity-90">
              {t(lang, "resultTitle")}
            </p>
            <p className="mt-1 text-4xl font-extrabold">{result.verdict}</p>
            <p className="mt-1 text-xl font-bold">{meta.label[primary]}</p>
            <p className="text-base opacity-90">{meta.label[secondary]}</p>
          </div>

          <div className="flex flex-col gap-5 p-5">
            <p className="text-lg leading-relaxed">
              {result.explanation[primary]}
            </p>
            <p className="text-base leading-relaxed text-slate-500">
              {result.explanation[secondary]}
            </p>

            <div>
              <h2 className="text-base font-bold text-slate-800">
                {t(lang, "flagsTitle")}
              </h2>
              {result.redFlags.length === 0 ? (
                <p className="mt-1 text-base text-slate-600">
                  {t(lang, "noFlags")}
                </p>
              ) : (
                <ul className="mt-2 flex flex-col gap-2">
                  {result.redFlags.map((flag, index) => (
                    <li
                      key={index}
                      className={`rounded-xl px-3 py-2 ${meta.flag}`}
                    >
                      <p className="text-base font-semibold">{flag[primary]}</p>
                      <p className="text-sm opacity-80">{flag[secondary]}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-xl border-2 border-slate-900 bg-slate-50 p-4">
              <h2 className="text-base font-bold text-slate-800">
                {t(lang, "actionTitle")}
              </h2>
              <p className="mt-1 text-lg font-semibold">{result.action[primary]}</p>
              <p className="mt-1 text-base text-slate-500">
                {result.action[secondary]}
              </p>
            </div>

            <p className="text-sm text-slate-500">{result.certaintyNote[primary]}</p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={onWarn}
                className="flex-1 rounded-xl bg-[#25D366] px-5 py-4 text-lg font-extrabold text-white"
              >
                {t(lang, "warn")}
              </button>
              <button
                type="button"
                onClick={onListen}
                className="flex-1 rounded-xl border-2 border-slate-900 bg-white px-5 py-4 text-lg font-extrabold text-slate-900"
              >
                {speaking ? t(lang, "stop") : t(lang, "listen")}
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-auto pt-4 text-center text-sm text-slate-500">
        {t(lang, "privacy")}
      </footer>
    </div>
  );
}
