import { pageMetadata } from "@/lib/site";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Cta from "@/components/en/Cta";

export const metadata: Metadata = pageMetadata("/en/consulting", "en", "Consulting", "ALTINDIS supports investment, development, performance improvement and certification projects.");

const areas = [
  ["Performance improvement", "Set priorities and support improvement initiatives."],
  ["Project launches", "Provide focused support at key stages of a project launch."],
  ["Strategy & development", "Support your organisation’s development policies and plans."],
  ["QHSE management systems", "Support management, quality, health, safety and environmental initiatives."],
  ["Investment", "Support selected aspects of investment projects according to your needs."],
  ["Procurement & Supply Chain", "Improve procurement, logistics and supply chain performance."],
];

export default function SupportPage() {
  return (
    <>
      <section className="pageHero pageHeroInk">
        <div className="container pageHeroGrid">
          <div>
            <p className="eyebrow eyebrowLight">Project consulting</p>
            <h1>Turn projects into lasting results.</h1>
          </div>
          <p className="pageHeroLead">
            ALTINDIS supports investment, development, performance improvement and certification projects. We can take responsibility for selected aspects through effective outsourcing.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Areas of expertise"
            title="Support tailored to the realities of your project."
          />
          <div className="supportGrid">
            {areas.map(([title, text], index) => (
              <article className="supportCard" key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
