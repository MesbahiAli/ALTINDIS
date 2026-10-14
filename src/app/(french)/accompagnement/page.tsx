import { pageMetadata } from "@/lib/site";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Cta from "@/components/Cta";

export const metadata: Metadata = pageMetadata("/accompagnement", "fr", "Accompagnement", "ALTINDIS accompagne les projets d'investissement, de développement, de performance et de certification.");

const areas = [
  ["Amélioration des performances", "Structurer les priorités et accompagner les démarches d’amélioration."],
  ["Démarrage de projets", "Apporter un soutien ciblé aux étapes clés du lancement d’un projet."],
  ["Stratégie & développement", "Accompagner les politiques et plans de développement de l’organisation."],
  ["Systèmes de management QHSE", "Soutenir les démarches de management, qualité, hygiène, sécurité et environnement."],
  ["Investissements", "Accompagner certaines dimensions des projets d’investissement selon les besoins."],
  ["Achats & Supply Chain", "Renforcer la performance des achats, des flux et de la chaîne d’approvisionnement."],
];

export default function SupportPage() {
  return (
    <>
      <section className="pageHero pageHeroInk">
        <div className="container pageHeroGrid">
          <div>
            <p className="eyebrow eyebrowLight">Pôle Accompagnement</p>
            <h1>Transformer les projets en résultats durables.</h1>
          </div>
          <p className="pageHeroLead">
            ALTINDIS propose un accompagnement des projets d’investissement, de développement, d’amélioration des performances et de certification, avec la possibilité de prendre en charge certaines dimensions dans une démarche d’externalisation efficace.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Domaines d’intervention"
            title="Un accompagnement adapté à la réalité de votre projet."
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
