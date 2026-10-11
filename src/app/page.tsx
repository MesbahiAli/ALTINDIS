import Image from "next/image";
import Link from "next/link";
import HomeHero from "@/components/HomeHero";
import References from "@/components/References";
import Cta from "@/components/Cta";

const expertisePillars = [
  {
    icon: "recruitment",
    title: "Recrutement",
    text: "Recherche et évaluation de dirigeants, managers, ingénieurs, cadres et non-cadres, selon les besoins de chaque organisation.",
    href: "/recrutement",
    image: "/images/hero-slide-01.png",
  },
  {
    icon: "training",
    title: "Formations sur mesure",
    text: "Des parcours participatifs construits autour de vos métiers, de votre culture et de vos objectifs.",
    href: "/formation",
    image: "/images/hero-slide-02.png",
  },
  {
    icon: "diagnostics",
    title: "Études & Diagnostics",
    text: "Une analyse approfondie pour identifier les priorités et éclairer vos décisions organisationnelles.",
    href: "/accompagnement",
    image: "/images/hero-slide-03.png",
  },
  {
    icon: "support",
    title: "Accompagnement projets",
    text: "Un appui à vos projets de développement, de transformation et d’amélioration des performances.",
    href: "/accompagnement",
    image: "/images/hero-slide-04.png",
  },
] as const;

const strengths = [
  { number: "01", title: "Expertise métier", text: "Comprendre vos fonctions et leurs enjeux." },
  { number: "02", title: "Éthique", text: "Agir avec confidentialité et objectivité." },
  { number: "03", title: "Performance", text: "Viser des résultats durables et utiles." },
] as const;

const themes = [
  "Management & Leadership",
  "Ressources Humaines",
  "Communication",
  "Commercial & Vente",
  "Marketing & Veille",
  "Achats & Supply Chain",
  "Production & Maintenance",
  "QHSE & Finance",
] as const;

const sectorHighlights = [
  "Énergie & Pétrochimie",
  "Industrie & Manufacture",
  "BTP & Infrastructure",
  "Distribution & Commerce",
  "Finance & Services",
  "Technologie & Digital",
] as const;

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
        <div className="homeSectionInner aboutOverviewGrid">
          <div className="aboutOverviewCopy">
            <p className="eyebrow">À propos d’ALTINDIS</p>
            <h2 id="about-overview-title">Un partenaire de confiance pour vos enjeux humains</h2>
            <p>ALTINDIS accompagne les organisations dans leurs enjeux de recrutement, de formation et de développement des compétences. Notre approche associe connaissance des métiers, écoute et exigence de qualité.</p>
            <Link href="/contact" className="aboutOverviewLink">Échanger avec ALTINDIS <span aria-hidden="true">→</span></Link>
          </div>
          <div className="aboutOverviewStrengths" aria-label="Nos engagements">
            {strengths.map((strength) => (
              <div className="aboutStrength" key={strength.title}>
                <span className="aboutStrengthNumber">{strength.number}</span>
                <h3>{strength.title}</h3>
                <p>{strength.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="expertiseOverview" id="expertises" aria-labelledby="expertise-overview-title">
        <div className="homeSectionInner">
          <div className="expertiseOverviewHeading">
            <p className="eyebrow">Nos expertises</p>
            <h2 className="expertiseOverviewTitle" id="expertise-overview-title">Des solutions pour vos enjeux humains</h2>
            <p>Une approche intégrée pour attirer, développer et accompagner les talents.</p>
          </div>
          <div className="expertiseOverviewGrid">
            {expertisePillars.map((service) => (
              <article className="expertiseOverviewCard" key={service.title}>
                <div className="expertiseCardMedia">
                  <Image src={service.image} alt="" fill sizes="(max-width: 640px) 92vw, (max-width: 1080px) 45vw, 24vw" />
                </div>
                <div className="expertiseCardBody">
                  <span className="expertiseIcon"><ExpertiseIcon name={service.icon} /></span>
                  <div className="expertiseCardCopy">
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                    <Link href={service.href} className="expertiseCardLink">En savoir plus <span aria-hidden="true">→</span></Link>
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
            <p className="eyebrow eyebrowLight">Notre engagement</p>
            <h2 id="home-impact-title">Des résultats durables pour les organisations</h2>
          </div>
          <div className="homeImpactItems">
            <p>Recruter avec justesse</p>
            <p>Développer les compétences</p>
            <p>Accompagner le changement</p>
          </div>
        </div>
      </section>

      <section className="homeSectors" aria-labelledby="home-sectors-title">
        <div className="homeSectionInner homeSectorsGrid">
          <div className="homeSectorsIntro">
            <p className="eyebrow">Secteurs d’activité</p>
            <h2 id="home-sectors-title">Une expertise sectorielle au service de vos ambitions</h2>
            <p>Nos missions de recrutement s’appuient sur une compréhension des métiers et des réalités de chaque secteur.</p>
            <Link href="/recrutement" className="homeTrainingLink">Découvrir notre approche <span aria-hidden="true">→</span></Link>
          </div>
          <div className="homeSectorsCards">
            {sectorHighlights.map((sector, index) => (
              <div className="homeSectorCard" key={sector}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{sector}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="homeTraining" aria-labelledby="home-training-title">
        <div className="homeSectionInner homeTrainingGrid">
          <div className="homeTrainingIntro">
            <p className="eyebrow">Formation</p>
            <h2 id="home-training-title">Des thématiques au plus près des réalités opérationnelles</h2>
            <p>Des actions pensées autour de la performance individuelle et collective, selon le contexte, les besoins et les contraintes de chaque client.</p>
            <Link href="/formation" className="homeTrainingLink">Explorer la formation <span aria-hidden="true">→</span></Link>
          </div>
          <div className="homeTrainingThemes">
            {themes.map((theme, index) => (
              <div className="homeTrainingTheme" key={theme}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{theme}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Cta />
    </>
  );
}
