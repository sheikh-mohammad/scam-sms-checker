import type { Metadata } from "next";
import { Container, PageHero, SectionTitle, Card, CTABand } from "@/components/ui";
import {
  GlobeIcon,
  HeartIcon,
  LockIcon,
  ScaleIcon,
  ShieldCheck,
  SparklesIcon,
  UsersIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Scam SMS Checker exists, how the tool works at a high level, our privacy promise, and the honest disclaimer that an AI answer is a second opinion.",
};

const VALUES = [
  {
    icon: <UsersIcon className="h-6 w-6" />,
    title: "Ghar se bana",
    titleEn: "Built for families",
    body: "Ammi abbu, appi, bhai — jo smartphone se naye naye parhte hain. Isliye zuban asaan, font bara, aur koi pressure nahi.",
  },
  {
    icon: <GlobeIcon className="h-6 w-6" />,
    title: "Roman Urdu + English",
    titleEn: "Both languages, always",
    body: "Jawab aap ki boli mein (Roman Urdu) aur saath English mein, dono saath dete hain. Taake aap aur jo bhi padhe, sab samajh sake.",
  },
  {
    icon: <LockIcon className="h-6 w-6" />,
    title: "Kuch save nahi hota",
    titleEn: "Nothing is stored",
    body: "Na login, na account, na message store, na track karna. Check karne ke baad aap ka message hamare paas kabhi nahi rehta.",
  },
  {
    icon: <ScaleIcon className="h-6 w-6" />,
    title: "Imandari se",
    titleEn: "Honestly",
    body: "Yeh ek doosri raai hai, aakhri guarantee nahi. Isi liye hum har jagah likhte hain: official advice nahi.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-12 pb-4 pt-8">
      <Container>
        <PageHero
          icon={<SparklesIcon className="h-7 w-7" />}
          eyebrow="About"
          title="Hamari kahani"
          titleEn="Our story"
          lead="Pakistan mein har hafta lakhon log faraib ke SMS se lut jaate hain — BISP ka naam aur 8171 ko chhod kar doosre number. Hum yeh chhoti si cheez bana rahe hain: kisi bhi message par turant doosri raai."
          leadEn="Every week, Pakistani families lose real money to scam SMS — even names like BISP that come from anywhere but 8171. We built a small thing that gives a second opinion on any message in seconds."
        />
      </Container>

      <Container>
        <section className="grid gap-5 lg:grid-cols-2">
          <Card className="flex flex-col gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-100 text-emerald-700">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <h2 className="text-lg font-bold text-slate-900">Tool kaise kaam karta hai</h2>
            <p className="text-base leading-relaxed text-slate-600">
              Aap message paste karte hain. Hum woh message AI ko bhejte hain — chahe
              Roman Urdu mein likha ho, English mein, ya mix. AI usay parhta hai, aam
              faraib ki alaamat dhoondhta hai, aur natija deta hai:{" "}
              <span className="font-bold text-rose-600">SCAM</span>,{" "}
              <span className="font-bold text-amber-600">PROBABLY SCAM</span> ya{" "}
              <span className="font-bold text-emerald-600">LOOKS SAFE</span>, khatarnak
              nishaniyon ke saath.
            </p>
          </Card>
          <Card className="flex flex-col gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-sky-100 text-sky-700">
              <HeartIcon className="h-6 w-6" />
            </span>
            <h2 className="text-lg font-bold text-slate-900">Sach bhi, saaf bhi</h2>
            <p className="text-base leading-relaxed text-slate-600">
              Hum kisi official department ya bank se taluq nahi rakhte, aur na kisi
              fayde ke peeche hain. Yeh ek khidmat hai, guarantee nahi — sirf aap ki
              pehli madad, taake aap sahi marhalay par khud official raaste apna sakein.
            </p>
          </Card>
        </section>
      </Container>

      <Container>
        <section aria-labelledby="values-heading">
          <SectionTitle
            id="values-heading"
            ur="Kya cheezein hum sab se zyada rakhte hain"
            en="What we hold most dear"
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {VALUES.map((value) => (
              <Card key={value.title} className="flex flex-col gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
                  {value.icon}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{value.title}</h3>
                  <p className="text-sm font-semibold text-slate-400">{value.titleEn}</p>
                </div>
                <p className="text-base leading-relaxed text-slate-600">{value.body}</p>
              </Card>
            ))}
          </div>
        </section>
      </Container>

      <Container>
        <section
          aria-labelledby="honest-heading"
          className="rounded-3xl border border-amber-200 bg-amber-50/60 p-6 sm:p-8"
        >
          <SectionTitle
            id="honest-heading"
            ur="Sawaal ka imaandar jawab"
            en="The honest answer"
          />
          <p className="max-w-3xl text-lg leading-relaxed text-slate-700">
            AI galti kar sakta hai. Kabhi kabhi koi message <em>LOOKS SAFE</em> keh
            dega jo dar-asal khatarnak ho. Isi liye hum kehte hain: yeh ek doosri raai
            hai, aakhri hukm nahi. Aap ka bank aur FIA Cyber Crime hi aakhri authorities
            hain.
          </p>
        </section>
      </Container>

      <Container>
        <CTABand
          title="Khud aazma kar dekhein — turant try kijiye"
          titleEn="Judge it yourself — try it now"
          buttonLabel="Pehla message check karein"
        />
      </Container>
    </div>
  );
}