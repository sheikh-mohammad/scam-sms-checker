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

interface IconProps {
  className?: string;
}

function ShieldCheck({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3l7 3v5.2c0 4.4-2.9 8-7 9.3-4.1-1.3-7-4.9-7-9.3V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function AlertTriangle({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M10.3 4.3 2.6 18a1.6 1.6 0 0 0 1.4 2.4h16a1.6 1.6 0 0 0 1.4-2.4L13.7 4.3a1.6 1.6 0 0 0-2.8 0Z" />
      <path d="M12 9.5v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function VolumeIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M11 5 6 9H3v6h3l5 4V5z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M18.5 5.5a9 9 0 0 1 0 13" />
    </svg>
  );
}

function StopIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <rect x="6" y="6" width="12" height="12" rx="2.5" />
    </svg>
  );
}

function WhatsAppIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.18-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.7.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35M12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.12 1.03 6.98 2.9a9.83 9.83 0 0 1 2.9 6.99c0 5.45-4.44 9.89-9.89 9.89m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.54 4.14 1.58 5.95L.05 24l6.31-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.41" />
    </svg>
  );
}

function LockIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="4" y="10" width="16" height="10" rx="2.5" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function SearchIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" />
    </svg>
  );
}

function Spinner({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${className} animate-spin`} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function VerdictIcon({ verdict, className }: { verdict: Verdict; className?: string }) {
  return verdict === "LOOKS SAFE" ? (
    <ShieldCheck className={className} />
  ) : (
    <AlertTriangle className={className} />
  );
}

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
    header: "vh-scam",
    flag: "bg-rose-50 text-rose-900 ring-1 ring-rose-100",
  },
  "PROBABLY SCAM": {
    label: { ur: "Yeh shayad scam hai", en: "This is probably a scam" },
    header: "vh-probably",
    flag: "bg-amber-50 text-amber-900 ring-1 ring-amber-100",
  },
  "LOOKS SAFE": {
    label: { ur: "Scam ki koi nishani nahi mili", en: "No scam signs found" },
    header: "vh-safe",
    flag: "bg-emerald-50 text-emerald-900 ring-1 ring-emerald-100",
  },
};

const UI: Record<Lang, Record<string, string>> = {
  ur: {
    appName: "Scam SMS Checker",
    eyebrow: "Pakistani families ke liye",
    tagline: "Message paste karein — hum batayenge scam hai ya nahi.",
    boxLabel: "SMS ya WhatsApp message yahan paste karein",
    placeholder:
      "Misal: Mubarak ho! BISP ki taraf se aap ne Rs 25,00,000 ka inaam jeeta hai. Apna CNIC aur code bhejein...",
    check: "Check karein",
    checking: "Check ho raha hai...",
    clear: "Saaf karein",
    listen: "Sunnain",
    stop: "Rok dein",
    warn: "Family group ko warn karein",
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
    eyebrow: "For Pakistani families",
    tagline: "Paste a message — we'll tell you if it's a scam.",
    boxLabel: "Paste the SMS or WhatsApp message here",
    placeholder:
      "Example: Mubarak ho! BISP ki taraf se aap ne Rs 25,00,000 ka inaam jeeta hai. Apna CNIC aur code bhejein...",
    check: "Check",
    checking: "Checking...",
    clear: "Clear",
    listen: "Listen",
    stop: "Stop",
    warn: "Warn the family group",
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
    <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col gap-6 px-4 pb-10 pt-6 text-lg text-slate-800">
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-lg shadow-emerald-500/20">
            <ShieldCheck className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-xl font-extrabold leading-tight tracking-tight text-slate-900">
              {t(lang, "appName")}
            </h1>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-emerald-700">
              {t(lang, "eyebrow")}
            </p>
          </div>
        </div>

        <div
          role="group"
          aria-label="Language"
          className="flex shrink-0 items-center rounded-full bg-slate-200/70 p-1"
        >
          {(["ur", "en"] as const).map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setLang(code)}
              aria-pressed={lang === code}
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${
                lang === code
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {code === "ur" ? "اردو" : "English"}
            </button>
          ))}
        </div>
      </header>

      <p className="-mt-2 text-base text-slate-500">{t(lang, "tagline")}</p>

      <section className="rounded-3xl border border-slate-900/5 bg-white/80 p-4 shadow-[0_10px_40px_-12px_rgba(15,23,42,0.15)] backdrop-blur">
        <label
          htmlFor="message"
          className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500"
        >
          <ShieldCheck className="h-4 w-4 text-slate-400" />
          {t(lang, "boxLabel")}
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={t(lang, "placeholder")}
          maxLength={MAX_MESSAGE_LENGTH}
          rows={5}
          className="w-full resize-y rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-lg leading-relaxed text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
        />
        <div className="mt-3 flex items-center gap-3">
          <button
            type="button"
            onClick={onCheck}
            disabled={loading}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 px-5 py-4 text-lg font-bold text-white shadow-lg shadow-slate-900/20 transition hover:from-slate-700 hover:to-slate-900 active:scale-[0.99] disabled:opacity-60"
          >
            {loading ? (
              <>
                <Spinner className="h-5 w-5" />
                {t(lang, "checking")}
              </>
            ) : (
              <>
                <SearchIcon className="h-5 w-5" />
                {t(lang, "check")}
              </>
            )}
          </button>
          {(message || result) && (
            <button
              type="button"
              onClick={onClear}
              className="rounded-2xl px-4 py-4 text-base font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            >
              {t(lang, "clear")}
            </button>
          )}
        </div>
      </section>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-base font-medium text-amber-900 animate-rise"
        >
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
          <span>{error}</span>
        </div>
      )}

      {result && meta && (
        <div
          ref={resultRef}
          className="overflow-hidden rounded-3xl border border-slate-900/5 bg-white shadow-[0_20px_60px_-20px_rgba(15,23,42,0.3)] animate-rise"
        >
          <div className={`${meta.header} px-5 py-6 text-white`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
                  {t(lang, "resultTitle")}
                </p>
                <p className="mt-2 text-4xl font-extrabold tracking-tight">{result.verdict}</p>
                <p className="mt-1 text-lg font-semibold">{meta.label[primary]}</p>
                <p className="text-sm text-white/85">{meta.label[secondary]}</p>
              </div>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/20 backdrop-blur">
                <VerdictIcon verdict={result.verdict} className="h-7 w-7" />
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-6 p-5">
            <div className="space-y-1">
              <p className="text-lg leading-relaxed text-slate-800">{result.explanation[primary]}</p>
              <p className="text-base leading-relaxed text-slate-400">{result.explanation[secondary]}</p>
            </div>

            <div>
              <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-500">
                <AlertTriangle className="h-4 w-4 text-slate-400" />
                {t(lang, "flagsTitle")}
              </h2>
              {result.redFlags.length === 0 ? (
                <p className="mt-2 text-base text-slate-500">{t(lang, "noFlags")}</p>
              ) : (
                <ul className="mt-3 flex flex-col gap-2">
                  {result.redFlags.map((flag, index) => (
                    <li key={index} className={`rounded-2xl px-4 py-3 ${meta.flag}`}>
                      <p className="text-base font-semibold">{flag[primary]}</p>
                      <p className="text-sm opacity-70">{flag[secondary]}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-2xl border-2 border-slate-900 bg-slate-50 p-4">
              <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-500">
                <ShieldCheck className="h-4 w-4 text-slate-400" />
                {t(lang, "actionTitle")}
              </h2>
              <p className="mt-2 text-lg font-semibold text-slate-900">{result.action[primary]}</p>
              <p className="mt-1 text-base text-slate-500">{result.action[secondary]}</p>
            </div>

            <p className="text-sm text-slate-400">{result.certaintyNote[primary]}</p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={onWarn}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-4 text-lg font-bold text-white shadow-lg shadow-[#25D366]/25 transition hover:brightness-105 active:scale-[0.99]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {t(lang, "warn")}
              </button>
              <button
                type="button"
                onClick={onListen}
                aria-pressed={speaking}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-slate-900 bg-white px-5 py-4 text-lg font-bold text-slate-900 transition hover:bg-slate-900 hover:text-white active:scale-[0.99]"
              >
                {speaking ? (
                  <>
                    <StopIcon className="h-4 w-4" />
                    {t(lang, "stop")}
                  </>
                ) : (
                  <>
                    <VolumeIcon className="h-5 w-5" />
                    {t(lang, "listen")}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-auto flex items-center justify-center gap-1.5 pt-4 text-center text-xs text-slate-400">
        <LockIcon className="h-3.5 w-3.5" />
        {t(lang, "privacy")}
      </footer>
    </div>
  );
}
