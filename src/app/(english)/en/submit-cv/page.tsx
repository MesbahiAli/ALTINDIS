import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import EnquiryForm from "@/components/en/EnquiryForm";
export const metadata: Metadata = { title: "Submit your CV", description: "Share your experience and career goals with ALTINDIS." };
export default function SubmitCvPage() {
  return <>
    <section className="enquiryHero enquiryCvHero">
      <div className="container enquiryHeroInner"><p className="eyebrow eyebrowLight">Candidates · ALTINDIS</p><h1>Your next chapter<br />starts here.</h1><p>Tell us about your experience, skills and ambitions for the next stage of your career.</p></div>
      <div className="enquiryHeroPhoto"><Image src="/images/expertise-recrutement-casablanca.png" alt="" fill sizes="(max-width: 640px) 100vw, 40vw" /></div>
    </section>
    <section className="enquirySection"><div className="container enquiryContainer">
      <div className="enquiryIntro"><h2>Let’s get to know you.</h2><p>Share your career goals and prepare your application by email. Remember to attach an up-to-date CV before sending it.</p></div>
      <EnquiryForm cv />
      <p className="enquiryCrossLink">Are you representing an organisation? <Link href="/en/contact">Let’s discuss your needs →</Link></p>
    </div></section>
  </>;
}
