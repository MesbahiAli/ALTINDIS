import Link from "next/link";

export default function Cta() {
  return (
    <section className="section ctaSection">
      <div className="container ctaCard">
        <div>
          <p className="eyebrow eyebrowLight">Parlons de vos enjeux</p>
          <h2>Un besoin en recrutement, formation ou accompagnement ?</h2>
        </div>
        <div className="ctaActions">
          <Link href="/contact" className="button buttonLight">
            Échanger avec ALTINDIS
          </Link>
          <a href="mailto:Contact@Altindis.ma" className="textLink textLinkLight">
            Contact@Altindis.ma →
          </a>
        </div>
      </div>
    </section>
  );
}
