import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import EnquiryForm from "@/components/EnquiryForm";
export const metadata: Metadata = { title: "Déposer votre CV", description: "Présentez votre parcours et votre projet professionnel à ALTINDIS." };
export default function SubmitCvPage() {
  return <>
    <section className="enquiryHero enquiryCvHero">
      <div className="container enquiryHeroInner"><p className="eyebrow eyebrowLight">Candidats · ALTINDIS</p><h1>Votre prochain chapitre<br />commence ici.</h1><p>Présentez-nous votre parcours, vos compétences et vos envies pour la suite de votre carrière.</p></div>
      <div className="enquiryHeroPhoto"><Image src="/images/expertise-recrutement.png" alt="" fill sizes="(max-width: 640px) 100vw, 40vw" /></div>
    </section>
    <section className="enquirySection"><div className="container enquiryContainer">
      <div className="enquiryIntro"><h2>Faisons connaissance.</h2><p>Partagez votre projet professionnel et préparez votre candidature par email. Pensez à joindre un CV à jour avant l’envoi.</p></div>
      <EnquiryForm cv />
      <p className="enquiryCrossLink">Vous représentez une organisation ? <Link href="/contact">Parlons de vos besoins →</Link></p>
    </div></section>
  </>;
}
