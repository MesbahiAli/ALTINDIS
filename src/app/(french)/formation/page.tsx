import { pageMetadata } from "@/lib/site";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Cta from "@/components/Cta";

export const metadata: Metadata = pageMetadata("/formation", "fr", "Formation", "Des programmes de formation personnalisés autour des enjeux de performance individuelle et collective.");

const categories = [
  ["Management, Leadership & Efficacité", "Leadership, changement, cohésion d’équipe, gestion des conflits, prise de parole, gestion du temps."],
  ["Ressources Humaines", "Politique RH, pilotage RH, GPEC, recrutement, évaluation, audit social, gestion des compétences."],
  ["Communication", "Communication interne et externe, communication de crise, expression orale, image et notoriété."],
  ["Commercial, Vente & Marketing", "Stratégie commerciale, prospection, négociation, relation client, marketing stratégique et opérationnel."],
  ["Achats, Logistique & International", "Management des achats, négociation, transport, import-export, douane et supply chain."],
  ["Production, Maintenance & QHSE", "Performance industrielle, Lean, maintenance, qualité, sécurité, environnement et systèmes de management."],
  ["Finance & Gestion", "Comptabilité, fiscalité, trésorerie, contrôle de gestion, budgets et analyse financière."],
];

export default function TrainingPage() {
  return (
    <>
      <section className="pageHero pageHeroGreen">
        <div className="container pageHeroGrid">
          <div>
            <p className="eyebrow eyebrowLight">Pôle Formation</p>
            <h1>Développer les compétences qui soutiennent la performance.</h1>
          </div>
          <p className="pageHeroLead">
            Des actions construites autour des besoins réels, de la culture et des objectifs du partenaire, avec une approche participative et personnalisée.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Notre approche"
            title="Du diagnostic aux recommandations mesurables."
            copy="ALTINDIS associe diagnostic préliminaire, ingénierie de formation, personnalisation et méthodes pédagogiques axées sur une efficacité durable."
          />
          <div className="processGrid">
            {[
              ["01", "Diagnostic préliminaire", "Analyse des besoins réels, de la culture et des objectifs de votre organisation."],
              ["02", "Approche personnalisée", "Tenant compte du contexte, des besoins et des contraintes du client."],
              ["03", "Ingénierie de formation", "Accompagnement solide en amont pour plus d’efficacité sur le long terme."],
              ["04", "Plans d’action mesurables", "Des méthodes pédagogiques performantes avec des recommandations justes et réalistes."],
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
          <SectionHeading eyebrow="Thématiques" title="Une offre large, adaptable aux priorités de votre organisation." />
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
