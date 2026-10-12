import Link from "next/link";
import { LockIcon, ShieldCheck } from "./icons";

const LEARN = [
  { href: "/guide", label: "Scam guide" },
  { href: "/8171", label: "The 8171 fact" },
  { href: "/faq", label: "FAQ" },
];

const TOOL = [
  { href: "/", label: "Check a message" },
  { href: "/help", label: "I got scammed" },
  { href: "/about", label: "About" },
];

export default function SiteFooter() {
  return (
    <footer className="mt-14 border-t border-slate-900/5 bg-white">
      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <span className="text-base font-extrabold tracking-tight text-slate-900">
                Scam SMS Checker
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-500">
              Pakistani families ke liye ek aasan madadgar. Message paste karein, saaf
              jawab paayein.
              <br />
              A simple helper for Pakistani families — paste a message, get a clear answer.
            </p>
          </div>

          <nav aria-label="Learn">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Learn
            </h2>
            <ul className="mt-3 flex flex-col gap-2">
              {LEARN.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-slate-600 hover:text-emerald-700"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Tool">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              The tool
            </h2>
            <ul className="mt-3 flex flex-col gap-2">
              {TOOL.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-slate-600 hover:text-emerald-700"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-1.5">
            <LockIcon className="h-3.5 w-3.5" />
            Hum aap ke messages save nahi karte &middot; We never store your messages.
          </p>
          <p>Yeh official advice nahi hai &middot; This is not official advice.</p>
        </div>
      </div>
    </footer>
  );
}
