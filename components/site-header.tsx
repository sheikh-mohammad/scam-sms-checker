"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck } from "./icons";

const NAV = [
  { href: "/", label: "Check" },
  { href: "/guide", label: "Guide" },
  { href: "/8171", label: "8171" },
  { href: "/help", label: "Help" },
  { href: "/about", label: "About" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-900/5 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-md shadow-emerald-500/20">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <span className="hidden text-base font-extrabold tracking-tight text-slate-900 sm:inline">
            Scam SMS Checker
          </span>
        </Link>

        <nav aria-label="Main" className="ml-auto flex items-center gap-1 overflow-x-auto">
          {NAV.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                  active
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
