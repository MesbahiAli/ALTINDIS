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
            A recruitment, training and consulting firm supporting the sustainable growth of organisations.
          </p>
        </div>

        <div>
          <p className="footerTitle">Expertise</p>
          <Link href="/en/recruitment">Recruitment</Link>
          <Link href="/en/training">Training</Link>
          <Link href="/en/consulting">Consulting</Link>
        </div>

        <div>
          <p className="footerTitle">Contact</p>
          <a href="mailto:Contact@Altindis.ma">Contact@Altindis.ma</a>
          <a href="tel:+212661386782">+212 6 61 38 67 82</a>
          <a href="tel:+212655555292">+212 6 55 55 52 92</a>
        </div>

        <div>
          <p className="footerTitle">Address</p>
          <p>59 Boulevard Zerktouni</p>
          <p>6th floor, 20360</p>
          <p>Casablanca, Morocco</p>
        </div>
      </div>

      <div className="container footerBottom">
        <span>© {new Date().getFullYear()} ALTINDIS. All rights reserved.</span>
        <Link href="/en/privacy">Privacy</Link>
      </div>
    </footer>
  );
}
