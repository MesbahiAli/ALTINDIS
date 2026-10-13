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
          <p className="eyebrow eyebrowLight">Let’s discuss your projects</p>
          <h2>Let’s build your future success together</h2>
          <p className="ctaCasablancaLead">Tell us about your recruitment, training or consulting needs, and let’s build the right solution together.</p>
        <div className="ctaActions">
          <Link href="/en/contact" className="button buttonLight">
            Let’s discuss your project <span aria-hidden="true">→</span>
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
