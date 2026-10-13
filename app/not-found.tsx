import Link from "next/link";
import { Container } from "@/components/ui";
import { SearchIcon, ShieldCheck } from "@/components/icons";

export default function NotFound() {
  return (
    <Container>
      <div className="flex flex-col items-center gap-6 py-20 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-lg shadow-emerald-500/25">
          <ShieldCheck className="h-8 w-8" />
        </span>
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Yeh page nahi mila
          </h1>
          <p className="mt-2 text-lg font-semibold text-slate-500">
            Page not found
          </p>
          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-slate-500">
            Shayad link purani hai, ya kuch ghalat likha gaya. Fikar nahi — checker
            wahan hai jahan hona chahiye.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-slate-900/20 transition hover:from-slate-700 active:scale-[0.99]"
        >
          <SearchIcon className="h-5 w-5" />
          Check page par wapas jayein
        </Link>
      </div>
    </Container>
  );
}