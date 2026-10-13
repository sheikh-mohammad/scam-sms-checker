import type { Metadata } from "next";
import Checker from "./checker";
import { Container, SectionTitle, FeatureCard, CTABand } from "@/components/ui";
import {
  BookIcon,
  ClockIcon,
  LockIcon,
  PhoneIcon,
  SearchIcon,
  ShieldAlert,
  ShieldCheck,
  UsersIcon,
  WhatsAppIcon,
} from "@/components/icons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Scam SMS Checker — Scam ya Safe?",
  description:
    "Paste any SMS or WhatsApp message and get a clear answer in Roman Urdu and English: SCAM, PROBABLY SCAM, or LOOKS SAFE.",
};

export default function Home() {
  return (
    <div className="flex flex-col gap-14 pb-4 pt-8">
      <Container>
        <section className="relative overflow-hidden rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-sky-50 px-5 py-10 text-center sm:px-10 sm:py-14">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-lg shadow-emerald-500/25">
            <ShieldCheck className="h-7 w-7" />
          </span>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Pakistani families ke liye
          </p>
          <h1 className="mx-auto mt-2 max-w-2xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Scam SMS Checker
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-xl leading-relaxed text-slate-600">
            Message paste karein, ya WhatsApp par forward karein — hum turant batayenge:
            <span className="font-bold text-rose-600"> SCAM</span>,
            <span className="font-bold text-amber-600"> PROBABLY SCAM</span>, ya
            <span className="font-bold text-emerald-600"> LOOKS SAFE</span>.
          </p>
          <p className="mt-2 text-base text-slate-400">
            Paste the message — we&rsquo;ll tell you right away in Roman Urdu and English.
          </p>
        </section>
      </Container>

      <Container>
        <Checker />
      </Container>

      <Container>
        <section aria-labelledby="how-heading">
          <SectionTitle
            id="how-heading"
            ur="Yeh tool kya karta hai?"
            en="What this tool does"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<SearchIcon className="h-6 w-6" />}
              title="Har message par nazar"
              titleEn="Checks every message"
            >
              Aap code OTP, inaam, BISP, parcel ya bank ka bana message dijiye. AI aap ki
              boli mein analyse karta hai — Roman Urdu aur English.
            </FeatureCard>
            <FeatureCard
              icon={<UsersIcon className="h-6 w-6" />}
              title="Ghar walon ko warn karein"
              titleEn="Warn your family"
            >
              Agar scam ho, to ek button se poore WhatsApp family group ko aagah karein —
              taake ammi abbu bhi bach jayein.
            </FeatureCard>
            <FeatureCard
              icon={<LockIcon className="h-6 w-6" />}
              title="Kuch bhi save nahi hota"
              titleEn="Nothing is saved"
            >
              Na account, na login, na message store. Aap ka message check hokar chala
              jaata hai, kuch nahi rehta.
            </FeatureCard>
          </div>
        </section>
      </Container>

      <Container>
        <section aria-labelledby="8171-heading">
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <SectionTitle
                id="8171-heading"
                ur="Sabse aasaan golden rule"
                en="The one rule that saves families"
              />
              <p className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900">
                Asli BISP message sirf <span className="text-emerald-600">8171</span> se
                aata hai.
              </p>
              <p className="mt-1 text-lg font-semibold text-slate-500">
                Real BISP messages only ever come from 8171.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                Kisi aur number se BISP ka naam le kar aaya message — pakka jhooth. Bas
                yeh ek baat yaad rakhein aur dhoka hona mushkil hai.
              </p>
              <Link
                href="/8171"
                className="mt-5 inline-flex w-fit items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-base font-bold text-white transition hover:bg-emerald-700 active:scale-[0.99]"
              >
                Pori kahani parhein
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="flex items-center">
              <div className="w-full rounded-3xl border border-slate-900/5 bg-white p-6 shadow-[0_16px_50px_-18px_rgba(15,23,42,0.25)]">
                <div className="flex items-start gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-rose-100 text-rose-600">
                    <ShieldAlert className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-rose-600">JHOOTH — SCAM</p>
                    <p className="mt-1 text-lg font-bold text-rose-700">
                      &ldquo;Congrats! Aap ne 25,00,000 ka inaam jeeta hai. Meharbani kar
                      ke apna vote karke code bhejein&rdquo;
                    </p>
                  </div>
                </div>
                <div className="my-4 flex items-center gap-3 text-slate-400">
                  <span className="h-px flex-1 bg-slate-200" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    vs. sach
                  </span>
                  <span className="h-px flex-1 bg-slate-200" />
                </div>
                <div className="flex items-start gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-emerald-100 text-emerald-600">
                    <BookIcon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-emerald-600">
                      SACH — BISP
                    </p>
                    <p className="mt-1 text-lg font-bold text-emerald-700">
                      BISP ki madad ke liye aap ko sirf <span>8171</span> se message
                      aata hai, aur kabhi aap se code, OTP ya paisa nahi mangta.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>

      <Container>
        <section aria-labelledby="learn-heading">
          <SectionTitle
            id="learn-heading"
            ur="Pehle se seekh lein"
            en="Learn before it happens"
          />
          <div className="grid gap-5 sm:grid-cols-3">
            <FeatureCard
              icon={<BookIcon className="h-6 w-6" />}
              title="Scam ki pehchaan"
              titleEn="The scam guide"
            >
              <Link href="/guide" className="underline decoration-emerald-300 decoration-2 underline-offset-2 hover:text-emerald-700">
                Guide parhein
              </Link>
              <span className="mt-2 block text-sm text-slate-400">
                Faraib ki aam tarkeebain: inaam, BISP, code, parcel — sab wahan likha hai.
              </span>
            </FeatureCard>
            <FeatureCard
              icon={<PhoneIcon className="h-6 w-6" />}
              title="Paisa chala gaya?"
              titleEn="Money already lost?"
            >
              <Link href="/help" className="underline decoration-emerald-300 decoration-2 underline-offset-2 hover:text-emerald-700">
                Help parhein
              </Link>
              <span className="mt-2 block text-sm text-slate-400">
                Dero hone ke baad bhi jam ke rahne ka dar nahi. Thandi, saaf plan sabse
                zaroori hai.
              </span>
            </FeatureCard>
            <FeatureCard
              icon={<ClockIcon className="h-6 w-6" />}
              title="Dil ki baatein"
              titleEn="Frequently asked"
            >
              <Link href="/faq" className="underline decoration-emerald-300 decoration-2 underline-offset-2 hover:text-emerald-700">
                FAQ parhein
              </Link>
              <span className="mt-2 block text-sm text-slate-400">
                Kya yeh safe hai? Kaise kaam karta hai? Aksar pooche jane wale sawaal.
              </span>
            </FeatureCard>
          </div>
        </section>
      </Container>

      <Container>
        <CTABand
          title="Aaj hi pehla message check karein"
          titleEn="Check your first message today"
          buttonLabel="Check karein"
        />
      </Container>

      <Container>
        <p className="flex flex-wrap items-center justify-center gap-2 text-center text-sm text-slate-400">
          <WhatsAppIcon className="h-4 w-4" />
          <span>
            Aap ki help ghar ke aakhri kone tak pahunchayein — WhatsApp group mein bhej
            dein.
          </span>
        </p>
      </Container>
    </div>
  );
}