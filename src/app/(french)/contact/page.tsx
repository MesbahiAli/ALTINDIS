import { pageMetadata } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";
import EnquiryForm from "@/components/EnquiryForm";
export const metadata: Metadata = pageMetadata("/contact", "fr", "Contact", "Contactez ALTINDIS pour vos projets.");
export default function ContactPage() {
  return <>
    <section className="enquiryHero"><div className="container enquiryHeroInner"><p className="eyebrow eyebrowLight">Contact ALTINDIS</p><h1>Parlons de vos projets.</h1><p>Recrutement, formation ou accompagnement : construisons ensemble une solution pour votre organisation.</p></div></section>
    <section className="enquirySection"><div className="container enquiryContainer">
      <EnquiryForm />
      <div className="enquiryDetails">
        <div><h3>Email</h3><a href="mailto:Contact@Altindis.ma">Contact@Altindis.ma</a></div>
        <div><h3>Téléphone</h3><a href="tel:+212661386782">+212 6 61 38 67 82</a><br />{" "}<a href="tel:+212655555292">+212 6 55 55 52 92</a></div>
        <div><h3>Casablanca</h3><p>59 Boulevard Zerktouni<br />{" "}6e étage, 20360 Casablanca, Maroc</p></div>
      </div>
      <p className="enquiryCrossLink">Vous souhaitez nous transmettre votre candidature ? <Link href="/submit-cv">Déposer votre CV →</Link></p>
    </div></section>
  </>;
}
