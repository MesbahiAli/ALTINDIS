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
    id: "recrutement",
    image: "/images/expertise-recrutement-casablanca.png",
  },
  {
    icon: "training",
    title: "Formations sur mesure",
    text: "Des parcours participatifs construits autour de vos métiers, de votre culture et de vos objectifs.",
    id: "formation",
    image: "/images/expertise-formation-casablanca.png",
  },
  {
    icon: "diagnostics",
    title: "Études & Diagnostics",
    text: "Une analyse approfondie pour identifier les priorités et éclairer vos décisions organisationnelles.",
    id: "diagnostics",
    image: "/images/expertise-diagnostics-casablanca.png",
  },
  {
    icon: "support",
    title: "Accompagnement projets",
    text: "Démarrage de projets, investissements, stratégie de développement, amélioration des performances, QHSE et certification, achats et supply chain : un appui adapté aux dimensions de votre projet.",
    id: "accompagnement",
    image: "/images/expertise-accompagnement-casablanca.png",
  },
] as const;

const themes = [
  { category: "Les équipes", title: "Faire grandir les personnes", description: "Renforcer les pratiques managériales et la collaboration au quotidien.", topics: ["Management, Leadership & Efficacité", "Gestion des Ressources Humaines", "Communication personnelle & interpersonnelle", "Communication d’entreprise"], image: "/images/expertise-formation-casablanca.png" },
  { category: "Le développement", title: "Développer votre dynamique commerciale", description: "Relier les compétences de vos équipes à vos objectifs de développement.", topics: ["Commercial & Force de Vente", "Marketing & Veille", "Gestion de la Relation Client", "Achats & Commerce International"], image: "/images/hero-wide-02.png" },
  { category: "Les opérations", title: "Renforcer les savoir-faire métiers", description: "Construire des apprentissages adaptés aux réalités du terrain.", topics: ["Approvisionnement & Logistique", "Production & Maintenance", "Qualité, Hygiène, Sécurité & Environnement", "Finance & Gestion"], image: "/images/expertise-diagnostics-casablanca.png" },
] as const;

const sectorHighlights = [
  { title: "Énergie & Pétrochimie", text: "Opérations, ingénierie et métiers de l’énergie.", icon: "energy" },
  { title: "Industrie & Manufacture", text: "Production, maintenance et qualité industrielle.", icon: "industry" },
  { title: "BTP & Infrastructure", text: "Construction, études et conduite de projets.", icon: "building" },
  { title: "Distribution & Commerce", text: "Vente, achats et développement commercial.", icon: "commerce" },
  { title: "Finance & Services", text: "Finance, gestion et fonctions de support.", icon: "finance" },
  { title: "Technologie & Digital", text: "Systèmes d’information et métiers du numérique.", icon: "digital" },
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
            <p className="eyebrow">À propos d’ALTINDIS</p>
            <h2 id="about-overview-title">Un partenaire de confiance<br />pour vos enjeux humains</h2>
            <p className="aboutInspiredDescription">Nous accompagnons les organisations dans leurs besoins de recrutement, de formation et de développement des compétences. Notre approche : comprendre vos réalités et construire avec vous des solutions adaptées, dans le respect de la confidentialité, de l’objectivité et du secret professionnel.</p>
            <Link href="/#contact" className="aboutOverviewLink">Parlons de vos enjeux <span aria-hidden="true">→</span></Link>
          </div>
          <ul className="aboutInspiredValues" aria-label="Nos engagements">
            <li>
              <span className="aboutValueIcon"><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 29V22a16 16 0 0 1 32 0v7" /><rect x="6" y="27" width="8" height="14" rx="2" /><rect x="34" y="27" width="8" height="14" rx="2" /></svg></span>
              <h3>Écoute</h3><p>Comprendre vos besoins</p>
            </li>
            <li>
              <span className="aboutValueIcon"><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M7 13h34M7 24h34M7 35h34" /><rect x="15" y="9" width="6" height="8" rx="2" fill="currentColor" stroke="none" /><rect x="29" y="20" width="6" height="8" rx="2" fill="currentColor" stroke="none" /><rect x="11" y="31" width="6" height="8" rx="2" fill="currentColor" stroke="none" /></svg></span>
              <h3>Sur mesure</h3><p>Adapter chaque solution</p>
            </li>
            <li>
              <span className="aboutValueIcon"><svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="18" cy="15" r="7" /><path d="M5 40v-5a13 13 0 0 1 26 0v5M32 9a7 7 0 0 1 0 14M36 28a12 12 0 0 1 7 11" /></svg></span>
              <h3>Proximité</h3><p>Avancer à vos côtés</p>
            </li>
            <li>
              <span className="aboutValueIcon"><svg viewBox="0 0 48 48" aria-hidden="true"><path d="m24 5 16 6v12c0 10-9 17-16 21C17 40 8 33 8 23V11l16-6Z" /><path d="m16 24 6 6 11-12" /></svg></span>
              <h3>Éthique</h3><p>Agir avec intégrité et déontologie</p>
            </li>
          </ul>
          <blockquote className="aboutInspiredQuote">« Faire grandir<br />les talents pour un<br />Maroc plus fort. »<cite>Notre ambition</cite></blockquote>
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
            <p className="eyebrow eyebrowLight">Notre engagement</p>
            <h2 id="home-impact-title">Faire grandir les talents et les organisations</h2>
          </div>
          <ul className="homeImpactItems">
            <li>
              <h3>Recruter avec justesse</h3>
              <p>Des profils en phase avec vos enjeux.</p>
            </li>
            <li>
              <h3>Développer les compétences</h3>
              <p>Des parcours adaptés à vos équipes.</p>
            </li>
            <li>
              <h3>Accompagner le changement</h3>
              <p>Un appui ancré dans vos réalités.</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="homeSectors sectorsEditorial" id="secteurs" aria-labelledby="home-sectors-title">
        <div className="homeSectionInner homeSectorsGrid">
          <div className="homeSectorsIntro">
            <p className="eyebrow">Secteurs d’activité</p>
            <h2 id="home-sectors-title">Vos métiers.<br />Notre attention.</h2>
            <p>Chaque secteur a ses exigences. Nous prenons le temps de comprendre votre environnement pour identifier les compétences dont vous avez besoin.</p>
            <Link href="/contact" className="homeTrainingLink">Parlons de votre secteur <span aria-hidden="true">→</span></Link>
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
            <p className="eyebrow">Formation</p>
            <h2 id="home-training-title">Des compétences qui prennent vie sur le terrain.</h2>
            <p>Des formations sur mesure, construites autour de vos métiers, de vos équipes et de vos objectifs.</p>
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
            <h2 id="training-approach-title">Notre démarche</h2>
            <p>Les enjeux des actions de formation sont étroitement liés à la performance individuelle et collective.</p>
            <p>Une démarche centrée sur les besoins réels, la culture et les objectifs de nos partenaires, pour plus d’efficacité sur le long terme.</p>
          </div>
          <ol className="trainingApproachSteps">
            {[
              ["Diagnostic préliminaire", "Focus sur les besoins réels, la culture et les objectifs fixés de nos partenaires."],
              ["Ingénierie de formation", "Un accompagnement solide en amont pour plus d’efficacité sur le long terme."],
              ["Approche participative et personnalisée", "Tenant compte du contexte, des besoins et des contraintes du client."],
              ["Méthodologie", "Des méthodes pédagogiques performantes, des recommandations justes et des plans d’actions réalistes et mesurables."],
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
