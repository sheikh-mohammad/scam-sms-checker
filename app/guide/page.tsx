import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Container, PageHero, SectionTitle, Card, CTABand } from "@/components/ui";
import {
  AlertTriangle,
  BookIcon,
  CardIcon,
  CheckIcon,
  GiftIcon,
  ParcelIcon,
  PhoneIcon,
  ShieldAlert,
  ShieldCheck,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Scam Guide",
  description:
    "Common Pakistani SMS and WhatsApp scams explained in Roman Urdu and English: fake BISP, prizes, bank codes, parcels, and urgent money calls. Plus a checklist of warning signs.",
};

function ScamCard({
  icon,
  title,
  titleEn,
  ur,
  en,
}: {
  icon?: ReactNode;
  title: string;
  titleEn: string;
  ur: string;
  en: string;
}) {
  return (
    <Card className="flex flex-col gap-3">
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-rose-50 text-rose-600">
        {icon}
      </span>
      <div>
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        <p className="text-sm font-semibold text-slate-400">{titleEn}</p>
      </div>
      <p className="text-base leading-relaxed text-slate-700">{ur}</p>
      <p className="text-sm leading-relaxed text-slate-500">{en}</p>
    </Card>
  );
}

const SCAMS = [
  {
    icon: <ShieldAlert className="h-6 w-6" />,
    title: "Jhota BISP ya Ehsaas",
    titleEn: "Fake BISP payment",
    ur: "“Aap ki BISP guzara payment Rs 25,000 taiyaar hai — confirm karne ke liye yeh link kholein ya apna CNIC aur OTP code bhejein.” Jaise hi aap code/OTP dein, aap ka account hijack ho jaata hai. Yehi sabse zyada hota hai is waqt.",
    en: "“Your BISP payment is ready — open this link or send your CNIC and OTP code to confirm.” The moment you share the code, your money and account are hijacked. This is the most common scam right now.",
  },
  {
    icon: <CardIcon className="h-6 w-6" />,
    title: "Bank ya wallet, code mangna",
    titleEn: "Fake bank, OTP trick",
    ur: "Bank, JazzCash, EasyPaisa, SadaPay ya Daraz ka nam likha message: “Aap ka account band hone wala hai — CNIC, card number, PIN aur aaya hua OTP batayein.” Asli bank ya wallet app kabhi PIN ya OTP nahi poochta. Jo pooche, wohi chori hai.",
    en: "A message pretending to be a bank, JazzCash, EasyPaisa, SadaPay or Daraz: “Your account will be blocked — share your CNIC, card number, PIN and the OTP we send you.” A real bank or wallet never asks for your PIN or OTP.",
  },
  {
    icon: <GiftIcon className="h-6 w-6" />,
    title: "Inaam aur lottery",
    titleEn: "Prize and lottery",
    ur: "“Mubarak ho! Aap ne 25,00,000 ka inaam jeeta hai. Inaam choodane ke liye pehle registration fee ya tax Rs 5,000 bharein aur apna bank code bhejein.” Jeetne ke liye fee kabhi nahi deni padti. Yeh fees hi asli chori hai.",
    en: "“Congratulations! You won Rs 25,00,000. To release it, first pay a registration fee or tax of Rs 5,000 and send your bank code.” Winners never pay a fee. The fee is the theft.",
  },
  {
    icon: <ParcelIcon className="h-6 w-6" />,
    title: "Parcel ya courier",
    titleEn: "Fake parcel and customs",
    ur: "“Aap ka parcel customs par ruka hua hai — Rs 5,000 release fee bharein.” Kabhi kisi ne parcel nahi bheja tha, koi track number nahi hai, aur paisa jaata hai kisi personal account mein. Yehi jaal hai.",
    en: "“Your parcel is stuck at customs — pay a Rs 5,000 release fee.” No parcel was ever sent, there is no tracking number, and the money goes to a personal account. That is the trap.",
  },
  {
    icon: <PhoneIcon className="h-6 w-6" />,
    title: "Urgent call — rishtedaar",
    titleEn: "Urgent money call",
    ur: "WhatsApp par aawaaz: “Ammi/Abu/Phoofu ji! Main police ke paas hoon, paisa turant bhejein.” Ya video call mein jhota chehra. Pehla sawaal: yeh kyun? Asli rishtedaar se khud uski jaani-pehchaani number par call kar ke confirm karein — tabhi paisa bhejein.",
    en: "A voice note on WhatsApp: “Mum/Dad/Auntie! I am with the police, send money now.” Or a video call with a fake face. Always call a known number and confirm before you send a rupee.",
  },
];

const WARNINGS = [
  "Paisa mangna — fee, tax, “registration” kahin bhi",
  "CNIC, card number, PIN ya OTP/code poochhna",
  "Jalla zor: “aaj aakhri din hai” ya “foran karein”",
  "Anjaane number se official ka naam bana message",
  "Ajeeb linken: chhoti “bit.ly” ya anjaan domains",
  "Itna acha ki yakeen nahi aata — sach mein hi jhota hai",
];

const RULES = [
  "Asli BISP sirf 8171 se aata hai.",
  "Bank ya wallet kabhi OTP nahi poochta — kabhi nahi.",
  "Jeetne ke liye kabhi paisa nahi dena padta.",
  "Koi paisa mange to ruk jayein — rokar sochne ka waqt kharidte hain.",
  "Tasdeeq karein: jaani number par call, official number par call, aur Scam SMS Checker par check.",
];

export default function GuidePage() {
  return (
    <div className="flex flex-col gap-12 pb-4 pt-8">
      <Container>
        <PageHero
          icon={<BookIcon className="h-7 w-7" />}
          eyebrow="Scam Guide"
          title="Faraib ki tarkeebein"
          titleEn="How these scams work"
          lead="Yeh sabse aam Pakistani scams hain jo SMS aur WhatsApp par aate hain. Inhen ek baar parh lein — aankhen khul jayein gi."
          leadEn="These are the most common Pakistani scams on SMS and WhatsApp. Read them once and your eyes will open."
        />
      </Container>

      <Container>
        <section aria-labelledby="types-heading">
          <SectionTitle
            id="types-heading"
            ur="Aam scam types"
            en="The common scam types"
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {SCAMS.map((scam) => (
              <ScamCard key={scam.title} {...scam} />
            ))}
          </div>
        </section>
      </Container>

      <Container>
        <section
          aria-labelledby="flags-heading"
          className="rounded-3xl border border-rose-100 bg-rose-50/50 p-6 sm:p-8"
        >
          <SectionTitle
            id="flags-heading"
            ur="Agar yeh dikhe, to ruk jayein"
            en="If you see these, stop"
          />
          <ul className="grid gap-3 sm:grid-cols-2">
            {WARNINGS.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-2xl bg-white p-4">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
                <p className="text-base font-medium text-slate-800">{item}</p>
              </li>
            ))}
          </ul>
        </section>
      </Container>

      <Container>
        <section aria-labelledby="rules-heading">
          <SectionTitle
            id="rules-heading"
            ur="Five golden rules"
            en="Five golden rules"
          />
          <div className="grid gap-4">
            {RULES.map((rule, index) => (
              <div
                key={rule}
                className="flex items-center gap-4 rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-emerald-100 font-extrabold text-emerald-700">
                  {index + 1}
                </span>
                <p className="text-base font-semibold text-slate-800">{rule}</p>
                <ShieldCheck className="ml-auto h-5 w-5 shrink-0 text-emerald-500" />
              </div>
            ))}
          </div>
          <p className="mt-4 text-base text-slate-500">
            In rules ko yaad rakhte hain — aur baaki ke liye Scam SMS Checker hai.
          </p>
        </section>
      </Container>

      <Container>
        <CTABand
          title="Ab apne aane wala message check karein"
          titleEn="Now check the next message that arrives"
          buttonLabel="Check message"
        />
      </Container>

      <Container>
        <p className="flex items-start justify-center gap-2 text-center text-sm text-slate-400">
          <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
          <span>
            Yeh guide mashwara hai, official advice nahi. Koi shak ho to check karein —
            help page bhi hai.
          </span>
        </p>
      </Container>
    </div>
  );
}