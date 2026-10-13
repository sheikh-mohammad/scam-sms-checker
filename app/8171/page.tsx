import type { Metadata } from "next";
import { Container, PageHero, SectionTitle, Card, CTABand } from "@/components/ui";
import {
  AlertTriangle,
  BookIcon,
  MessageIcon,
  ShieldAlert,
  ShieldCheck,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "The 8171 rule",
  description:
    "Real BISP messages only ever come from 8171. Any other number claiming to be BISP is fake. Learn to tell the difference in Roman Urdu and English.",
};

const STEPS = [
  "Message ka screenshot lein (saboot ke liye).",
  "Kisi ko code/OTP, CNIC ya paisa na dein — chahe kitna bhi “official” naam ho.",
  "Agar message kisi aur number se hai, to Scam SMS Checker par paste kar ke natija dekhein.",
  "BISP ke official raaste (8171) par hi apni eligibility check karein — ajeeb links par nahi.",
  "Apne aas-paas ko bata kar warn karein — ammi abbu, rishtedaar, WhatsApp group.",
];

export default function Page8171() {
  return (
    <div className="flex flex-col gap-12 pb-4 pt-8">
      <Container>
        <PageHero
          icon={<BookIcon className="h-7 w-7" />}
          eyebrow="The fact you can trust"
          title="8171"
          titleEn="The one number to remember"
          lead="Asli BISP ki taraf se aaya har message is number se aata hai. Aur is number se aaya message kabhi paisa, OTP ya fee nahi mangta."
          leadEn="Every real BISP message comes from this number. And a real message from this number never asks for money, OTPs, or a fee."
        />
      </Container>

      <Container>
        <section aria-labelledby="fact-heading">
          <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-6 sm:p-10">
            <p
              id="fact-heading"
              className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl"
            >
              Real BISP messages only come from{" "}
              <span className="rounded-xl bg-emerald-600 px-3 py-1 text-white">
                8171
              </span>
              .{" "}
              <span className="text-emerald-700">
                Bas. Itna hi yaad rakhna hai.
              </span>
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">
              Agar kisi aur number se “BISP” ke naam par message aaye — chahe wo kitna
              bhi official lage — woh pakka jhoot iss liye hai, kyunki BISP sirf 8171 se
              he baat karti hai.
            </p>
          </div>
        </section>
      </Container>

      <Container>
        <section aria-labelledby="compare-heading">
          <SectionTitle
            id="compare-heading"
            ur="Jhoot vs. Sach"
            en="Fake vs. Real, side by side"
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <Card className="border-rose-200">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-rose-100 text-rose-600">
                  <ShieldAlert className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-rose-600">
                    Jhota
                  </p>
                  <p className="text-xs font-semibold text-slate-400">Fake message</p>
                </div>
              </div>
              <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                <p className="text-base font-medium leading-relaxed text-slate-800">
                  From: +92-31X-XXXXXXX
                </p>
                <p className="mt-2 text-base leading-relaxed text-slate-700">
                  &ldquo;Congrats! BISP ki taraf se aap ne Rs 25,00,000 ka inaam jeeta
                  hai. Confirm karne ke liye apna CNIC aur code bhejein.&rdquo;
                </p>
              </div>
              <ul className="mt-4 flex flex-col gap-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                  Galt number se aaya — BISP nahi hai.
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                  CNIC aur code mangne wala baap x hamesha jhoot.
                </li>
              </ul>
            </Card>

            <Card className="border-emerald-200">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-emerald-100 text-emerald-600">
                  <ShieldCheck className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-emerald-600">
                    Sach
                  </p>
                  <p className="text-xs font-semibold text-slate-400">Real message</p>
                </div>
              </div>
              <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                <p className="text-base font-medium leading-relaxed text-slate-800">
                  From: 8171
                </p>
                <p className="mt-2 text-base leading-relaxed text-slate-700">
                  &ldquo;BISP: Aap ki payment se mutaliq update. Asli maloomat ke liye
                  sirf 8171 istemal karein.&rdquo;
                </p>
              </div>
              <ul className="mt-4 flex flex-col gap-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  Sirf 8171 se aata hai.
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  Paisa, OTP, CNIC ya fee — kabhi nahi mangta.
                </li>
              </ul>
            </Card>
          </div>
        </section>
      </Container>

      <Container>
        <section aria-labelledby="do-heading">
          <div className="grid gap-5 lg:grid-cols-2">
            <div>
              <SectionTitle
                id="do-heading"
                ur="Aisa message aaye to kya karein?"
                en="What to do when such a message arrives"
              />
              <ol className="flex flex-col gap-4">
                {STEPS.map((step, index) => (
                  <li key={step} className="flex items-start gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-900 font-extrabold text-white">
                      {index + 1}
                    </span>
                    <p className="text-base leading-relaxed text-slate-700">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex items-center">
              <Card className="flex w-full flex-col gap-4 border-slate-900/10 bg-slate-900 text-white">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-emerald-300">
                  <MessageIcon className="h-6 w-6" />
                </span>
                <p className="text-lg font-bold">Ek line yaad rakhein</p>
                <p className="text-base leading-relaxed text-slate-300">
                  Agar koi message aap ko paise ka wada karta hai aur saath hi kuch
                  maangta hai — to wo wada jhoot hai:
                </p>
                <p className="rounded-2xl bg-white/10 p-4 text-xl font-extrabold leading-snug text-emerald-300">
                  &ldquo;Jo sach mein paisa de raha hai, wo kuch nahi maangta. Jo
                  maangta hai, wo chura raha hai.&rdquo;
                </p>
              </Card>
            </div>
          </div>
        </section>
      </Container>

      <Container>
        <section className="rounded-3xl border border-slate-900/5 bg-white p-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Source &amp; daleel
          </p>
          <p className="mt-2 max-w-3xl text-base leading-relaxed text-slate-600">
            Reported by Business Recorder&nbsp;
            <a
              href="https://www.brecorder.com/news/40283711"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-emerald-700 underline decoration-emerald-300 decoration-2 underline-offset-2 hover:text-emerald-800"
            >
              brecorder.com/news/40283711
            </a>
            : women are being duped by fake BISP messages. The security rule repeated
            everywhere is simple — real BISP messages come only from{" "}
            <span className="font-bold text-slate-900">8171</span>.
          </p>
        </section>
      </Container>

      <Container>
        <CTABand
          title="8171 ke naam ka jhota message mila?"
          titleEn="Got a fake 8171 message?"
          buttonLabel="Check karein"
        />
      </Container>
    </div>
  );
}