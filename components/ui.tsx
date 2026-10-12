import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "./icons";

export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`mx-auto w-full max-w-5xl px-4 sm:px-6 ${className}`}>{children}</div>
  );
}

export function PageHero({
  icon,
  eyebrow,
  title,
  titleEn,
  lead,
  leadEn,
}: {
  icon?: ReactNode;
  eyebrow?: string;
  title: string;
  titleEn?: string;
  lead?: string;
  leadEn?: string;
}) {
  return (
    <header className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-6 sm:p-10">
      <div className="max-w-3xl">
        {icon && (
          <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-white text-emerald-600 shadow-sm ring-1 ring-emerald-100">
            {icon}
          </span>
        )}
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          {title}
        </h1>
        {titleEn && <p className="mt-1 text-lg font-semibold text-slate-500">{titleEn}</p>}
        {lead && <p className="mt-4 text-lg leading-relaxed text-slate-700">{lead}</p>}
        {leadEn && <p className="mt-2 text-base leading-relaxed text-slate-400">{leadEn}</p>}
      </div>
    </header>
  );
}

export function Bilingual({
  ur,
  en,
  className = "",
  urClassName = "",
  enClassName = "",
}: {
  ur: string;
  en?: string;
  className?: string;
  urClassName?: string;
  enClassName?: string;
}) {
  return (
    <div className={className}>
      <p className={`text-lg font-medium leading-relaxed text-slate-800 ${urClassName}`}>{ur}</p>
      {en && (
        <p className={`mt-1 text-base leading-relaxed text-slate-500 ${enClassName}`}>{en}</p>
      )}
    </div>
  );
}

export function SectionTitle({
  ur,
  en,
  id,
}: {
  ur: string;
  en?: string;
  id?: string;
}) {
  return (
    <div className="mb-5">
      <h2 id={id} className="text-2xl font-extrabold tracking-tight text-slate-900">
        {ur}
      </h2>
      {en && <p className="text-base text-slate-500">{en}</p>}
    </div>
  );
}

export function Card({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`rounded-3xl border border-slate-900/5 bg-white p-5 shadow-[0_10px_40px_-16px_rgba(15,23,42,0.18)] ${className}`}
    >
      {children}
    </div>
  );
}

export function FeatureCard({
  icon,
  title,
  titleEn,
  children,
}: {
  icon: ReactNode;
  title: string;
  titleEn?: string;
  children: ReactNode;
}) {
  return (
    <Card className="flex flex-col gap-3">
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
        {icon}
      </span>
      <div>
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        {titleEn && <p className="text-sm font-semibold text-slate-400">{titleEn}</p>}
      </div>
      <div className="text-base leading-relaxed text-slate-600">{children}</div>
    </Card>
  );
}

export function CTABand({
  title,
  titleEn,
  buttonLabel,
  href = "/",
}: {
  title: string;
  titleEn?: string;
  buttonLabel: string;
  href?: string;
}) {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-6 text-white shadow-xl sm:p-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">{title}</h2>
          {titleEn && <p className="mt-1 text-base text-slate-300">{titleEn}</p>}
        </div>
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-white px-5 py-3 text-base font-bold text-slate-900 transition hover:bg-emerald-50 active:scale-[0.99]"
        >
          {buttonLabel}
          <ArrowRightIcon className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}
