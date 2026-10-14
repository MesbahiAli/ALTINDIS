import { pageMetadata } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import Cta from "@/components/en/Cta";
import RecrutementHero from "@/components/en/RecrutementHero";

export const metadata: Metadata = pageMetadata("/en/recruitment", "en", "Recruitment", "ALTINDIS helps organisations find and assess outstanding executives, managers, engineers and professionals.");

const steps = [
  ["01", "Needs analysis", "Understand the partner organisation’s context, strategic challenges and specific expectations."],
  ["02", "Targeted search", "Use the ALTINDIS network and multiple sourcing channels to identify the most suitable candidates."],
  ["03", "In-depth assessment", "Structured interviews, skills assessments and reference checks to support a sound decision."],
  ["04", "Consulting", "Present shortlisted candidates, support your decision and follow through to onboarding."],
] as const;

const sectors = [
  "Energy & Petrochemicals",
  "Mining & Natural Resources",
  "Industry & Manufacturing",
  "Construction & Infrastructure",
  "Food & Agriculture",
  "Retail & Trade",
  "Logistics & Transport",
  "Finance & Services",
  "Technology & Digital",
  "Pharmaceuticals & Healthcare",
] as const;

export default function RecruitmentPage() {
  return (
    <>
      <RecrutementHero />

      <section className="section softSection">
        <div className="container">
          <SectionHeading
            eyebrow="Our process"
            title="A structured approach, from brief to appointment."
            copy="Every assignment follows a proven method, from understanding your needs to successful onboarding."
          />
          <div className="processGrid">
            {steps.map(([n, label, desc]) => (
              <div className="processCard" key={n}>
                <span>{n}</span>
                <div>
                  <h3>{label}</h3>
                  <p className="processCardDesc">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Our strengths"
            title="Expertise, method and lasting impact."
          />
          <div className="featureGrid">
            <article>
              <span className="featureNumber">01</span>
              <h3>Industry expertise & experience</h3>
              <p>In-depth knowledge of industries, roles and organisational challenges to deliver every assignment with precision.</p>
            </article>
            <article>
              <span className="featureNumber">02</span>
              <h3>A proven process</h3>
              <p>A structured search and assessment method to identify and select the best candidates for each context.</p>
            </article>
            <article>
              <span className="featureNumber">03</span>
              <h3>Lasting impact</h3>
              <p>Recruitment tailored to your organisation’s specific needs, with support designed to build lasting working relationships.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section valuesSection">
        <div className="container">
          <SectionHeading
            eyebrow="Industries we serve"
            title="Working across the major industries."
            light
          />
          <div className="sectorGrid">
            {sectors.map((s, i) => (
              <div className="sectorCard" key={s}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <strong>{s}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section centeredSection">
        <div className="container narrow">
          <p className="eyebrow">Have a role to fill?</p>
          <h2>Tell us about the person you are looking for.</h2>
          <Link href="/en/contact" className="button">Discuss your needs</Link>
        </div>
      </section>

      <Cta />
    </>
  );
}
