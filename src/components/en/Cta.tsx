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
          <p className="eyebrow eyebrowLight">Contact ALTINDIS</p>
          <h2>Let’s discuss your recruitment, training or consulting needs.</h2>
          <p className="ctaCasablancaLead">Tell us about your priorities. We will help you identify the right next step.</p>
        <div className="ctaActions">
          <Link href="/en/contact" className="button buttonLight">
            Discuss your needs <span aria-hidden="true">→</span>
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
