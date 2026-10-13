import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHero, SectionTitle, CTABand } from "@/components/ui";
import { HelpIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions about Scam SMS Checker: is it safe, does it really know, what the verdicts mean, privacy, cost, and how to help your family.",
};

const FAQS = [
  {
    q: "Kya yeh istemal karna mehfooz hai?",
    qEn: "Is it safe to use?",
    aUr: "Haan. Na account, na login, na koi message store. Aap ka message sirf check ke waqt process hota hai aur phir kabhi nahi rehta. Aur khyal rahein: koi bhi live/unused OTP ya code kisi ko (is tool ko bhi) na bhejein.",
    aEn: "Yes. There is no account, no login, and no message is stored. Your message is processed only at check time and never kept. And one caution: never share a live, unused OTP or code with anyone — including this tool.",
  },
  {
    q: "Kya yeh sach mein bata pata hai?",
    qEn: "Does it really know?",
    aUr: "Yeh AI par chalta hai jo message ka mazmoon, uski bol-chaal aur aam faraib ki tarkeebon ko samajhta hai. Yeh ek tez dost ki mashwarati raai hai — official guarantee nahi. Aakhri faisla bank aur FIA Cyber Crime ke paas hai.",
    aEn: "It runs on an AI that understands the message, its tone, and common scam patterns. Think of it as a fast, second opinion from a friend — not an official guarantee. The final word belongs to your bank and FIA Cyber Crime.",
  },
  {
    q: "SCAM, PROBABLY SCAM aur LOOKS SAFE ka kya matlab hai?",
    qEn: "What do the three verdicts mean?",
    aUr: "SCAM = khatarnak nishaniyan bohat clear hain, turant bachein. PROBABLY SCAM = kuch cheezein khatarnak hain, hoshyari se aage barhein. LOOKS SAFE = koi khaas nishani nahi mili — phir bhi aakhri faisla aap ki aqal ka kaam hai.",
    aEn: "SCAM = the red flags are clear. PROBABLY SCAM = something is off, be careful. LOOKS SAFE = no specific signs found — but staying alert is still your job.",
  },
  {
    q: "Kya koi app download karni paregi?",
    qEn: "Do I need to download an app?",
    aUr: "Nahi. Yeh kisi bhi phone ke browser par chalta hai — iPhone, Android, koi bhi. Chahein to browser menu se “Add to Home Screen” kar ke app jaisa ikon bana sakte hain.",
    aEn: "No. It works in any phone browser — iPhone, Android, anything. If you like, use the browser menu’s “Add to Home Screen” to give it an app-like icon.",
  },
  {
    q: "Kya is ki qeemat hai?",
    qEn: "Does it cost anything?",
    aUr: "Tool bilkul muft hai. Sirf aap ka mobile data istemal hota hai, bilkul WhatsApp ki tarah. Koi hidden paisa nahi, koi trial khatam hone ka dhamka nahi.",
    aEn: "The tool is completely free. It only uses your mobile data, just like WhatsApp. No hidden fees, no end-of-trial threats.",
  },
  {
    q: "Meri family har waqt scam forward karti rehti hai. Kya karein?",
    qEn: "My family keeps forwarding scam messages. What do I do?",
    aUr: "Unko is site ka link WhatsApp group mein bhejein aur Guide parhne ko kehein. Aur jab bhi koi “inaam”, “BISP” ya “code” ka message aaye — forward karnese pehle check karne ka pakka wada lein.",
    aEn: "Send them this site’s link in the WhatsApp group and ask them to read the Guide. And get a promise: before forwarding any “prize”, “BISP” or “code” message, they check it first.",
  },
  {
    q: "8171 ki kya khaas baat hai?",
    qEn: "What is special about 8171?",
    aUr: "Asli BISP messages sirf 8171 se aate hain. Aur asli message kabhi CNIC, OTP ya fee nahi maangta. Doosre number se BISP ka naam le kar aaya koi message — pakka jhoot.",
    aEn: "Real BISP messages only come from 8171, and they never ask for your CNIC, OTP, or a fee. Any message using the BISP name from another number is definitely fake.",
  },
];

function FaqItem({
  q,
  qEn,
  aUr,
  aEn,
}: {
  q: string;
  qEn: string;
  aUr: string;
  aEn: string;
}) {
  return (
    <details className="group rounded-2xl border border-slate-900/5 bg-white shadow-sm transition hover:border-slate-900/10">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-3 p-5">
        <span>
          <span className="block text-lg font-bold text-slate-900">{q}</span>
          <span className="block text-sm font-semibold text-slate-400">{qEn}</span>
        </span>
        <span
          aria-hidden="true"
          className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-500 transition group-open:rotate-180 group-open:bg-emerald-100 group-open:text-emerald-700"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </summary>
      <div className="px-5 pb-5">
        <p className="text-base leading-relaxed text-slate-700">{aUr}</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">{aEn}</p>
      </div>
    </details>
  );
}

export default function FaqPage() {
  return (
    <div className="flex flex-col gap-12 pb-4 pt-8">
      <Container>
        <PageHero
          icon={<HelpIcon className="h-7 w-7" />}
          eyebrow="FAQ"
          title="Aksar pooche jaane wale sawaal"
          titleEn="Frequently asked questions"
          lead="Choti si cheezon ki saaf jaankari — taake aap chain se istemal karein."
          leadEn="Clear answers to the small questions, so you can use the tool with peace of mind."
        />
      </Container>

      <Container>
        <section aria-labelledby="faq-heading">
          <SectionTitle id="faq-heading" ur="Sawaal aur jawab" en="Questions and answers" />
          <div className="flex flex-col gap-3">
            {FAQS.map((faq) => (
              <FaqItem key={faq.qEn} {...faq} />
            ))}
          </div>
        </section>
      </Container>

      <Container>
        <section className="rounded-3xl border border-slate-900/5 bg-white p-6 sm:p-8">
          <SectionTitle ur="Aur sawaal?" en="More questions?" />
          <p className="max-w-2xl text-base leading-relaxed text-slate-600">
            Hum koi contact line nahi chalate — yeh ek tool aur kuch parhne wale pages
            hain. Aap ka sawaal Guide, Help ya{" "}
            <Link href="/8171" className="font-semibold text-emerald-700 underline decoration-emerald-300 decoration-2 underline-offset-2 hover:text-emerald-800">
              8171 page
            </Link>{" "}
            par shaayad jawab mil sakta hai.
          </p>
        </section>
      </Container>

      <Container>
        <CTABand
          title="Sawaal ka jawab apne hathon se karein"
          titleEn="Answer the questions yourself"
          buttonLabel="Check karna shuru karein"
        />
      </Container>
    </div>
  );
}