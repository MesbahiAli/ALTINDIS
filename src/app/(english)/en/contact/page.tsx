import type { Metadata } from "next";
import Link from "next/link";
import EnquiryForm from "@/components/en/EnquiryForm";
export const metadata: Metadata = { title: "Contact", description: "Contact ALTINDIS about your projects." };
export default function ContactPage() {
  return <>
    <section className="enquiryHero"><div className="container enquiryHeroInner"><p className="eyebrow eyebrowLight">Contact ALTINDIS</p><h1>Let’s discuss your projects.</h1><p>Recruitment, training or consulting: let’s build a solution for your organisation together.</p></div></section>
    <section className="enquirySection"><div className="container enquiryContainer">
      <EnquiryForm />
      <div className="enquiryDetails">
        <div><h3>Email</h3><a href="mailto:Contact@Altindis.ma">Contact@Altindis.ma</a></div>
        <div><h3>Phone</h3><a href="tel:+212661386782">+212 6 61 38 67 82</a><br /><a href="tel:+212655555292">+212 6 55 55 52 92</a></div>
        <div><h3>Casablanca</h3><p>59 Boulevard Zerktouni<br />6th floor, 20360 Casablanca, Morocco</p></div>
      </div>
      <p className="enquiryCrossLink">Would you like to apply? <Link href="/en/submit-cv">Submit your CV →</Link></p>
    </div></section>
  </>;
}
