import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez ALTINDIS à Casablanca pour vos besoins en recrutement, formation et accompagnement.",
};

export default function ContactPage() {
  return (
    <>
      <section className="pageHero contactHero">
        <div className="container contactHeroGrid">
          <div>
            <p className="eyebrow eyebrowLight">Contact</p>
            <h1>Parlons de vos besoins et de vos objectifs.</h1>
          </div>
          <p className="pageHeroLead">
            Recrutement, formation ou accompagnement : contactez directement l’équipe ALTINDIS pour présenter votre besoin.
          </p>
        </div>
      </section>

      <section className="section contactSection">
        <div className="container contactGrid">
          <article className="contactCard contactCardPrimary">
            <p className="eyebrow eyebrowLight">Email</p>
            <a href="mailto:Contact@Altindis.ma" className="bigContactLink">Contact@Altindis.ma</a>
            <p>Pour une demande commerciale, une mission ou une prise de contact.</p>
          </article>

          <article className="contactCard">
            <p className="eyebrow">Téléphone</p>
            <a href="tel:+212661386782" className="bigContactLink">+212 6 61 38 67 82</a>
            <a href="tel:+212655555292" className="bigContactLink">+212 6 55 55 52 92</a>
          </article>

          <article className="contactCard">
            <p className="eyebrow">Adresse</p>
            <h2>59 Boulevard Zerktouni</h2>
            <p>6ème étage · 20360 Casablanca · Maroc</p>
          </article>
        </div>
      </section>
    </>
  );
}
