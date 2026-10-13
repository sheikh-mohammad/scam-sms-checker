import type { Metadata } from "next";
import { Container, PageHero, SectionTitle, Card, CTABand } from "@/components/ui";
import {
  AlertTriangle,
  LifebuoyIcon,
  LockIcon,
  ShieldCheck,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "I got scammed",
  description:
    "Calm, ordered steps to take if money or a code was already lost to an SMS or WhatsApp scam in Pakistan — block, save evidence, and report to FIA Cyber Crime.",
};

const STEPS = [
  {
    title: "Ruk jayein. Ghabrao mat.",
    titleEn: "Stop and breathe",
    body: "Aap ne galti nahi ki hai — dheet ne ki hai. Ghabrahat se ghalat decisions bante hain. Saans lena hi sabse zaroori pehla qadam hai.",
  },
  {
    title: "Code ya details de chuke hain? Foran block karein.",
    titleEn: "Block it right now",
    body: "Agar OTP, card number ya PIN de diya hai — turant bank app ya wallet app mein card/wallet block karein. Phir bank ki official fraud reporting line par call karein.",
  },
  {
    title: "Saboot mehfooz karein",
    titleEn: "Save the evidence",
    body: "Message ka screenshot, sender ka number, transaction ka screenshot aur waqt — sab save karein. CCTV se kahin ka, par evidence se hota hai.",
  },
  {
    title: "FIA Cyber Crime ko report karein",
    titleEn: "Report to FIA Cyber Crime",
    body: "Online complaint kisi bhi waqt ho sakti hai: complaint.fia.gov.pk. Helpline 1991 (Mon–Fri, 8AM–4PM). Aap ki complaint register ho jati hai.",
  },
  {
    title: "WhatsApp par contact ko report karein",
    titleEn: "Report the WhatsApp contact",
    body: "Chat kholen → contact ka naam/header tap karein → neeche scroll → “Report” (aur block bhi). Aisa karne se aap aur aap ka group dono mehfooz.",
  },
  {
    title: "Family ko warn karein",
    titleEn: "Warn your people",
    body: "Isi dheet se dobara wahi message doosron ko aa sakta hai. Poore WhatsApp group ko bata dein — aap ka batana hi doosron ko bacha sakta hai.",
  },
];

const DONT = [
  "“Release fee” ya “return fee” nam ki koi bhi payment — jhoot.",
  "Koi “recovery aadmi” jo wapsi ke liye pehle paisa maange.",
  "Doosra OTP ya code “confirm video” ke baad bhejna.",
  "Aakhri “deadline” ya “at login” ka pressure jo paisa magwane ke liye ho.",
];

export default function HelpPage() {
  return (
    <div className="flex flex-col gap-12 pb-4 pt-8">
      <Container>
        <PageHero
          icon={<LifebuoyIcon className="h-7 w-7" />}
          eyebrow="Help"
          title="Paisa ya code chala gaya?"
          titleEn="Money or a code was lost?"
          lead="Ghabraane ki zaroorat nahi. Thoda saplan ho to door hona waala. Yeh steps hath se pehle karein."
          leadEn="No need to panic. A calm, ordered plan goes much further than worry. Work through these steps."
        />
      </Container>

      <Container>
        <section aria-labelledby="steps-heading">
          <SectionTitle
            id="steps-heading"
            ur="Ab kya karein"
            en="What to do now"
          />
          <ol className="flex flex-col gap-5">
            {STEPS.map((step, index) => (
              <li key={step.title}>
                <Card className="flex flex-col gap-2 sm:flex-row sm:gap-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-slate-900 text-lg font-extrabold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                    <p className="text-sm font-semibold text-slate-400">{step.titleEn}</p>
                    <p className="mt-2 text-base leading-relaxed text-slate-700">
                      {step.body}
                    </p>
                  </div>
                </Card>
              </li>
            ))}
          </ol>
        </section>
      </Container>

      <Container>
        <section className="rounded-3xl border border-rose-100 bg-rose-50/50 p-6 sm:p-8">
          <SectionTitle ur="In se bachna" en="Avoid these traps" />
          <ul className="grid gap-3 sm:grid-cols-2">
            {DONT.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-2xl bg-white p-4">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
                <p className="text-base font-medium text-slate-800">{item}</p>
              </li>
            ))}
          </ul>
        </section>
      </Container>

      <Container>
        <section aria-labelledby="reassure-heading">
          <div className="grid gap-5 lg:grid-cols-2">
            <Card className="flex flex-col gap-3 bg-emerald-50/60">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-100 text-emerald-600">
                <ShieldCheck className="h-6 w-6" />
              </span>
              <h2 id="reassure-heading" className="text-lg font-bold text-slate-900">
                Aap tanha nahi hain
              </h2>
              <p className="text-base leading-relaxed text-slate-700">
                Yehi chori hazaaroon gharano ke saath hoti hai, har hafta. FIA ki
                cybercrime team aur bank ki fraud lines isi din ke liye hain. Aap ne
                report kiya — yeh pehla aur sabse zaroori qadam hai.
              </p>
            </Card>
            <Card className="flex flex-col gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-100 text-slate-600">
                <LockIcon className="h-6 w-6" />
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                Kal se bachne ka formula
              </h2>
              <p className="text-base leading-relaxed text-slate-700">
                OTP ya code sirf usi “request” ke jawab mein aata hai jo aap ne khud
                shuru ki ho. Baaki har aaya hua code jhoot hai. Aur kisi bhi message ko
                pehle check kiye bina forward mat karein.
              </p>
            </Card>
          </div>
        </section>
      </Container>

      <Container>
        <CTABand
          title="Agli baar se pahle check karein"
          titleEn="Check from next time"
          buttonLabel="Message check karein"
        />
      </Container>

      <Container>
        <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-slate-400">
          Yeh page mashwara hai, official guidance nahi. Madad aur legal muamle ke liye
          FIA Cyber Crime aur apne bank se rabta karein.
        </p>
      </Container>
    </div>
  );
}