import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Cta from "@/components/en/Cta";

export const metadata: Metadata = {
  title: "Training",
  description: "Personalised training programmes focused on individual and team performance.",
};

const categories = [
  ["Management, Leadership & Effectiveness", "Leadership, change, team cohesion, conflict resolution, public speaking and time management."],
  ["Human Resources", "HR policy, workforce planning, recruitment, assessment, social audits and skills management."],
  ["Communication", "Internal and external communication, crisis communication, speaking skills, image and reputation."],
  ["Sales & Marketing", "Sales strategy, prospecting, negotiation, customer relationships and strategic and operational marketing."],
  ["Procurement, Logistics & International Trade", "Procurement management, negotiation, transport, imports and exports, customs and supply chain."],
  ["Production, Maintenance & QHSE", "Industrial performance, Lean, maintenance, quality, safety, environment and management systems."],
  ["Finance & Management", "Accounting, tax, cash flow, management control, budgeting and financial analysis."],
];

export default function TrainingPage() {
  return (
    <>
      <section className="pageHero pageHeroGreen">
        <div className="container pageHeroGrid">
          <div>
            <p className="eyebrow eyebrowLight">Training</p>
            <h1>Develop the skills that drive performance.</h1>
          </div>
          <p className="pageHeroLead">
            Programmes built around your real needs, culture and goals, with a participative, personalised approach.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Our approach"
            title="From assessment to measurable recommendations."
            copy="ALTINDIS combines initial assessment, training design, personalisation and teaching methods focused on lasting effectiveness."
          />
          <div className="processGrid">
            {[
              ["01", "Initial assessment", "Focus on our partners’ real needs, culture and goals."],
              ["02", "Personalised approach", "Taking account of the client’s context, needs and constraints."],
              ["03", "Training design", "Thorough preparation and support for lasting effectiveness."],
              ["04", "Measurable action plans", "Effective teaching methods with sound, realistic recommendations."],
            ].map(([n, label, desc]) => (
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

      <section className="section softSection">
        <div className="container">
          <SectionHeading eyebrow="Training topics" title="A broad range of programmes tailored to your organisation’s priorities." />
          <div className="categoryGrid">
            {categories.map(([title, text]) => (
              <article className="categoryCard" key={title}>
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
