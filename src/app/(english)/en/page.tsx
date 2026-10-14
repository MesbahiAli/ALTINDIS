import { pageMetadata } from "@/lib/site";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HomeHero from "@/components/en/HomeHero";
import References from "@/components/en/References";
import Cta from "@/components/en/Cta";

const expertisePillars = [
  {
    icon: "recruitment",
    title: "Recruitment",
    text: "Finding and assessing executives, managers, engineers and staff to meet each organisation’s needs.",
    id: "recrutement",
    image: "/images/expertise-recrutement-casablanca.png",
  },
  {
    icon: "training",
    title: "Tailored training",
    text: "Participative learning programmes shaped around your business, culture and goals.",
    id: "formation",
    image: "/images/expertise-formation-casablanca.png",
  },
  {
    icon: "diagnostics",
    title: "Studies & assessments",
    text: "In-depth analysis to identify priorities and inform your organisational decisions.",
    id: "diagnostics",
    image: "/images/expertise-diagnostics-casablanca.png",
  },
  {
    icon: "support",
    title: "Project consulting",
    text: "Project launches, investment, development strategy, performance improvement, QHSE and certification, procurement and supply chain: support tailored to your project.",
    id: "accompagnement",
    image: "/images/expertise-accompagnement-casablanca.png",
  },
] as const;

const themes = [
  { category: "People", title: "Helping people grow", description: "Strengthen management practices and everyday collaboration.", topics: ["Management, Leadership & Effectiveness", "Human Resources Management", "Personal & Interpersonal Communication", "Corporate Communication"], image: "/images/expertise-formation-casablanca.png" },
  { category: "Business growth", title: "Build your commercial momentum", description: "Connect your teams’ skills with your business growth goals.", topics: ["Sales & Sales Teams", "Marketing & Market Intelligence", "Customer Relationship Management", "Procurement & International Trade"], image: "/images/hero-wide-02.png" },
  { category: "Operations", title: "Strengthen practical expertise", description: "Develop learning programmes grounded in the realities of your work.", topics: ["Supply & Logistics", "Production & Maintenance", "Quality, Health, Safety & Environment", "Finance & Management"], image: "/images/expertise-diagnostics-casablanca.png" },
] as const;

const sectorHighlights = [
  { title: "Energy & Petrochemicals", text: "Operations, engineering and energy professions.", icon: "energy" },
  { title: "Industry & Manufacturing", text: "Production, maintenance and industrial quality.", icon: "industry" },
  { title: "Construction & Infrastructure", text: "Construction, technical studies and project management.", icon: "building" },
  { title: "Retail & Trade", text: "Sales, procurement and business development.", icon: "commerce" },
  { title: "Finance & Services", text: "Finance, management and support functions.", icon: "finance" },
  { title: "Technology & Digital", text: "Information systems and digital professions.", icon: "digital" },
] as const;

function SectorIcon({ name }: { name: (typeof sectorHighlights)[number]["icon"] }) {
  return <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    {name === "energy" && <><path d="m26 5-15 22h12l-1 16 15-23H25l1-15Z" /><path d="M8 10H5v7M40 31h3v7" /></>}
    {name === "industry" && <><path d="M6 41V23l12-7v9l12-7v23H6ZM30 41V8h7l5 33H30M12 32h3M21 32h3M12 37h3M21 37h3" /><path d="M31 14h7" /></>}
    {name === "building" && <><path d="M9 41V14l19-7v34M28 20h11v21M5 41h38M16 17h5M16 24h5M16 31h5M33 27h2M33 33h2M16 41v-4h5v4" /></>}
    {name === "commerce" && <><path d="M8 20h32v21H8V20ZM5 20l5-13h28l5 13M5 20c0 5 8 5 8 0 0 5 8 5 8 0 0 5 8 5 8 0 0 5 8 5 8 0 0 5 6 5 6 0M13 7l-2 13M21 7v13M29 7l2 13M15 41V29h10v12M31 29h4v6h-4" /></>}
    {name === "finance" && <><path d="m5 17 19-11 19 11H5ZM8 41h32M5 36h38M12 22v14M24 22v14M36 22v14" /><circle cx="24" cy="13" r="1.5" /></>}
    {name === "digital" && <><rect x="12" y="12" width="24" height="24" rx="4" /><path d="M18 5v7M24 5v7M30 5v7M18 36v7M24 36v7M30 36v7M5 18h7M5 24h7M5 30h7M36 18h7M36 24h7M36 30h7m-14-10-4 4 4 4m-10-8 4 4-4 4" /></>}
  </svg>;
}

function ExpertiseIcon({ name }: { name: (typeof expertisePillars)[number]["icon"] }) {
  if (name === "recruitment") {
    return <svg viewBox="0 0 36 36" aria-hidden="true"><circle cx="13" cy="12" r="4" /><circle cx="25" cy="13" r="3.5" /><path d="M5 27v-2.2c0-4 3.5-7.2 8-7.2s8 3.2 8 7.2V27M21 19.5c1.2-.8 2.6-1.2 4-1.2 3.7 0 6.7 2.7 6.7 6.1V27" /></svg>;
  }
  if (name === "training") {
    return <svg viewBox="0 0 36 36" aria-hidden="true"><path d="m3.5 13.5 14.5-7 14.5 7L18 20.7 3.5 13.5Z" /><path d="M9.5 16.6v7.7c4.7 4.1 12.3 4.1 17 0v-7.7M32.5 13.5v9" /></svg>;
  }
  if (name === "diagnostics") {
    return <svg viewBox="0 0 36 36" aria-hidden="true"><circle cx="16" cy="16" r="9" /><path d="m22.5 22.5 7 7M12 16h8M16 12v8" /></svg>;
  }
  return <svg viewBox="0 0 36 36" aria-hidden="true"><path d="M6 29h24" /><rect x="8" y="20" width="5" height="7" rx="1" /><rect x="16" y="14" width="5" height="13" rx="1" /><rect x="24" y="7" width="5" height="20" rx="1" /></svg>;
}

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <References />

      <section className="aboutOverview" id="a-propos" aria-labelledby="about-overview-title">
        <div className="homeSectionInner aboutInspiredInner">
          <div className="aboutOverviewHeading">
            <p className="eyebrow">About ALTINDIS</p>
            <h2 id="about-overview-title">A trusted partner<br />{" "}for your people challenges</h2>
            <p className="aboutInspiredDescription">We support organisations with recruitment, training and skills development. We take the time to understand your needs and build tailored solutions together, with confidentiality, objectivity and professional discretion.</p>
            <Link href="/en/contact" className="aboutOverviewLink">Discuss your needs <span aria-hidden="true">→</span></Link>
          </div>
          <ul className="aboutInspiredValues" aria-label="Our commitments">
            <li>
              <span className="aboutValueIcon"><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 29V22a16 16 0 0 1 32 0v7" /><rect x="6" y="27" width="8" height="14" rx="2" /><rect x="34" y="27" width="8" height="14" rx="2" /></svg></span>
              <h3>Listening</h3><p>Understand your needs</p>
            </li>
            <li>
              <span className="aboutValueIcon"><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M7 13h34M7 24h34M7 35h34" /><rect x="15" y="9" width="6" height="8" rx="2" fill="currentColor" stroke="none" /><rect x="29" y="20" width="6" height="8" rx="2" fill="currentColor" stroke="none" /><rect x="11" y="31" width="6" height="8" rx="2" fill="currentColor" stroke="none" /></svg></span>
              <h3>Tailored solutions</h3><p>Adapt every solution</p>
            </li>
            <li>
              <span className="aboutValueIcon"><svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="18" cy="15" r="7" /><path d="M5 40v-5a13 13 0 0 1 26 0v5M32 9a7 7 0 0 1 0 14M36 28a12 12 0 0 1 7 11" /></svg></span>
              <h3>Partnership</h3><p>Work alongside you</p>
            </li>
            <li>
              <span className="aboutValueIcon"><svg viewBox="0 0 48 48" aria-hidden="true"><path d="m24 5 16 6v12c0 10-9 17-16 21C17 40 8 33 8 23V11l16-6Z" /><path d="m16 24 6 6 11-12" /></svg></span>
              <h3>Ethics</h3><p>Act with integrity and professional ethics</p>
            </li>
          </ul>
          <blockquote className="aboutInspiredQuote">“Developing<br />{" "}talent for a<br />{" "}stronger Morocco.”<cite>Our ambition</cite></blockquote>
        </div>
      </section>

      <section className="expertiseOverview" id="expertises" aria-labelledby="expertise-overview-title">
        <div className="homeSectionInner">
          <div className="expertiseOverviewHeading">
            <p className="eyebrow">How we can help</p>
            <h2 className="expertiseOverviewTitle" id="expertise-overview-title">Solutions for your people challenges</h2>
            <p>An integrated approach to attracting, developing and supporting talent.</p>
          </div>
          <div className="expertiseOverviewGrid">
            {expertisePillars.map((service) => (
              <article className="expertiseOverviewCard" id={service.id} key={service.title}>
                <div className="expertiseCardMedia">
                  <Image src={service.image} alt="" fill sizes="(max-width: 640px) 92vw, (max-width: 1080px) 45vw, 24vw" />
                </div>
                <div className="expertiseCardBody">
                  <span className="expertiseIcon"><ExpertiseIcon name={service.icon} /></span>
                  <div className="expertiseCardCopy">
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="homeImpact" aria-labelledby="home-impact-title">
        <div className="homeSectionInner homeImpactGrid">
          <div>
            <p className="eyebrow eyebrowLight">Our commitment</p>
            <h2 id="home-impact-title">Helping talent and organisations grow</h2>
          </div>
          <ul className="homeImpactItems">
            <li>
              <h3>Recruit the right people</h3>
              <p>People who match your needs.</p>
            </li>
            <li>
              <h3>Develop skills</h3>
              <p>Programmes tailored to your teams.</p>
            </li>
            <li>
              <h3>Support change</h3>
              <p>Support grounded in your reality.</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="homeSectors sectorsEditorial" id="secteurs" aria-labelledby="home-sectors-title">
        <div className="homeSectionInner homeSectorsGrid">
          <div className="homeSectorsIntro">
            <p className="eyebrow">Industries</p>
            <h2 id="home-sectors-title">Your business.<br />{" "}Our focus.</h2>
            <p>Every industry has its own demands. We take the time to understand your environment and identify the skills you need.</p>
            <Link href="/en/contact" className="homeTrainingLink">Discuss your needs <span aria-hidden="true">→</span></Link>
          </div>
          <div className="homeSectorsCards">
            {sectorHighlights.map((sector) => (
              <article className="sectorEditorialCard" key={sector.icon}>
                <div className="sectorEditorialIcon"><SectorIcon name={sector.icon} /></div>
                <h3>{sector.title}</h3>
                <p>{sector.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="homeTraining trainingEditorial" id="formations" aria-labelledby="home-training-title">
        <div className="homeSectionInner">
          <div className="homeTrainingIntro">
            <p className="eyebrow">Training</p>
            <h2 id="home-training-title">Skills that make a difference at work.</h2>
            <p>Tailored training designed around your business, teams and goals.</p>
          </div>
          <div className="trainingEditorialGrid">
            {themes.map((theme) => (
              <article className="trainingEditorialCard" key={theme.category}>
                <div className="trainingEditorialMedia"><Image src={theme.image} alt="" fill sizes="(max-width: 640px) 92vw, (max-width: 1080px) 45vw, 30vw" /></div>
                <div className="trainingEditorialBody">
                  <span className="trainingCategory">{theme.category}</span>
                  <h3>{theme.title}</h3>
                  <p>{theme.description}</p>
                  <ul>{theme.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="trainingApproach" id="notre-demarche" aria-labelledby="training-approach-title">
        <div className="homeSectionInner trainingApproachGrid">
          <div className="trainingApproachIntro">
            <h2 id="training-approach-title">Our training approach</h2>
            <p>Training is closely linked to individual and team performance.</p>
            <p>An approach focused on our partners’ real needs, culture and goals, for lasting effectiveness.</p>
          </div>
          <ol className="trainingApproachSteps">
            {[
              ["Initial assessment", "Focus on our partners’ real needs, culture and agreed goals."],
              ["Training design", "Thorough preparation and support to deliver lasting results."],
              ["Participative, personalised approach", "Taking account of the client’s context, needs and constraints."],
              ["Methodology", "Effective teaching methods, sound recommendations and realistic, measurable action plans."],
            ].map(([title, description], index) => (
              <li key={title}>
                <div className="trainingApproachNumber" aria-hidden="true"><span>{index + 1}</span></div>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <Cta />
    </>
  );
}

export const metadata: Metadata = pageMetadata("/en", "en", "Recruitment, Training and Consulting", "ALTINDIS supports organisations with recruitment, training and skills development.");
