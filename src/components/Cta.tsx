import Image from "next/image";
import Link from "next/link";

export default function Cta() {
  return (
    <section className="section ctaSection" id="contact">
      <div className="container ctaCard ctaCasablanca">
        <div className="ctaCasablancaMedia" aria-hidden="true">
          <Image src="/images/contact-casablanca-v2.png" alt="" fill sizes="(max-width: 640px) 100vw, 1240px" />
        </div>
        <div className="ctaCasablancaCopy">
          <p className="eyebrow eyebrowLight">Contactez ALTINDIS</p>
          <h2>Parlons de vos besoins en recrutement, formation ou accompagnement.</h2>
          <p className="ctaCasablancaLead">Présentez-nous vos priorités. Nous vous aidons à définir la prochaine étape.</p>
        <div className="ctaActions">
          <Link href="/contact" className="button buttonLight">
            Parlons de vos besoins <span aria-hidden="true">→</span>
          </Link>
          <a href="mailto:Contact@Altindis.ma" className="textLink textLinkLight">
            Contact@Altindis.ma →
          </a>
        </div>
        </div>
      </div>
    </section>
  );
}
