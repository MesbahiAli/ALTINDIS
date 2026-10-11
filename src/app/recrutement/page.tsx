import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import Cta from "@/components/Cta";
import RecrutementHero from "@/components/RecrutementHero";

export const metadata: Metadata = {
  title: "Recrutement",
  description: "ALTINDIS accompagne les organisations dans la recherche et l'évaluation des meilleurs talents — hauts dirigeants, managers, ingénieurs et cadres.",
};

const steps = [
  ["01", "Analyse du besoin", "Compréhension du contexte, des enjeux stratégiques et des attentes spécifiques de l'organisation partenaire."],
  ["02", "Recherche ciblée", "Activation du réseau ALTINDIS et sourcing multicanal pour identifier les profils les plus pertinents."],
  ["03", "Évaluation approfondie", "Entretiens structurés, assessment des compétences et vérification des références pour sécuriser la décision."],
  ["04", "Accompagnement", "Présentation des candidats retenus, soutien à la décision et suivi jusqu'à l'intégration dans le poste."],
] as const;

const sectors = [
  "Énergie & Pétrochimie",
  "Mines & Ressources naturelles",
  "Industrie & Manufacture",
  "BTP & Infrastructure",
  "Agroalimentaire",
  "Distribution & Commerce",
  "Logistique & Transport",
  "Finance & Services",
  "Technologie & Digital",
  "Pharmacie & Santé",
] as const;

export default function RecruitmentPage() {
  return (
    <>
      <RecrutementHero />

      <section className="section softSection">
        <div className="container">
          <SectionHeading
            eyebrow="Notre processus"
            title="Une démarche structurée, du brief au poste."
            copy="Chaque mission suit une méthodologie éprouvée — de la compréhension du besoin jusqu'à l'intégration réussie du candidat."
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
            eyebrow="Nos atouts"
            title="Expertise, méthode et impact durable."
          />
          <div className="featureGrid">
            <article>
              <span className="featureNumber">01</span>
              <h3>Expertise & expérience métier</h3>
              <p>Une maîtrise approfondie des secteurs, des fonctions et des enjeux organisationnels pour conduire chaque mission avec précision.</p>
            </article>
            <article>
              <span className="featureNumber">02</span>
              <h3>Processus éprouvé</h3>
              <p>Une méthode structurée de recherche et d'évaluation pour identifier et sélectionner les profils les plus adaptés à chaque contexte.</p>
            </article>
            <article>
              <span className="featureNumber">03</span>
              <h3>Impact durable</h3>
              <p>Des recrutements pensés pour les besoins uniques de l'organisation — avec un accompagnement qui garantit la pérennité de la collaboration.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section valuesSection">
        <div className="container">
          <SectionHeading
            eyebrow="Secteurs d'intervention"
            title="Présents dans les principaux secteurs d'activité."
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
          <p className="eyebrow">Une mission à nous confier ?</p>
          <h2>Parlez-nous du profil que vous recherchez.</h2>
          <Link href="/contact" className="button">Lancer la discussion</Link>
        </div>
      </section>

      <Cta />
    </>
  );
}
