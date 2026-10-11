import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="siteFooter">
      <div className="container footerGrid">
        <div>
          <Image
            src="/logo-altindis.png"
            alt="ALTINDIS"
            width={250}
            height={60}
            className="footerLogo"
          />
          <p className="footerIntro">
            Cabinet de recrutement, de formation et d’accompagnement au service du développement durable des organisations.
          </p>
        </div>

        <div>
          <p className="footerTitle">Expertises</p>
          <Link href="/recrutement">Recrutement</Link>
          <Link href="/formation">Formation</Link>
          <Link href="/accompagnement">Accompagnement</Link>
        </div>

        <div>
          <p className="footerTitle">Contact</p>
          <a href="mailto:Contact@Altindis.ma">Contact@Altindis.ma</a>
          <a href="tel:+212661386782">+212 6 61 38 67 82</a>
          <a href="tel:+212655555292">+212 6 55 55 52 92</a>
        </div>

        <div>
          <p className="footerTitle">Adresse</p>
          <p>59 Boulevard Zerktouni</p>
          <p>6ème étage, 20360</p>
          <p>Casablanca, Maroc</p>
        </div>
      </div>

      <div className="container footerBottom">
        <span>© {new Date().getFullYear()} ALTINDIS. Tous droits réservés.</span>
        <span>Votre Partenaire de Développement</span>
      </div>
    </footer>
  );
}
