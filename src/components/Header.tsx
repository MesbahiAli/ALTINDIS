"use client";

import Image from "next/image";
import Link from "next/link";
import LanguageSwitch from "@/components/LanguageSwitch";
import { useEffect, useRef, useState } from "react";

const expertiseLinks = [
  { href: "/recrutement", label: "Recrutement", description: "Identifier et attirer les talents qui font la différence." },
  { href: "/formation", label: "Formations sur mesure", description: "Développer des compétences directement opérationnelles." },
  { href: "/#diagnostics", label: "Études & diagnostics", description: "Éclairer les décisions RH et organisationnelles." },
  { href: "/accompagnement", label: "Accompagnement projets", description: "Structurer et sécuriser les projets de transformation." },
] as const;

const primaryLinks = [
  { href: "/recrutement", label: "Recrutement" },
  { href: "/formation", label: "Formation" },
  { href: "/accompagnement", label: "Accompagnement" },
  { href: "/#a-propos", label: "Le cabinet" },
] as const;

function ChevronIcon() {
  return <svg viewBox="0 0 12 8" aria-hidden="true" focusable="false"><path d="m1 1.25 5 5 5-5" /></svg>;
}

function ArrowIcon() {
  return <svg viewBox="0 0 18 18" aria-hidden="true" focusable="false"><path d="M4 9h10M10 5l4 4-4 4" /></svg>;
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <circle cx="10" cy="10" r="7.25" />
      <path d="M2.9 10h14.2M10 2.75c2 2.05 3.1 4.45 3.1 7.25S12 15.2 10 17.25C8 15.2 6.9 12.8 6.9 10S8 4.8 10 2.75Z" />
    </svg>
  );
}

export default function Header() {
  const desktopMenuRef = useRef<HTMLDetailsElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        desktopMenuRef.current?.removeAttribute("open");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const closeDesktopMenu = (event: PointerEvent) => {
      if (!desktopMenuRef.current?.contains(event.target as Node)) {
        desktopMenuRef.current?.removeAttribute("open");
      }
    };
    document.addEventListener("pointerdown", closeDesktopMenu);
    return () => document.removeEventListener("pointerdown", closeDesktopMenu);
  }, []);

  return (
    <>
      <a className="skipLink" href="#main-content">Aller au contenu principal</a>
      <header className={`siteHeader${scrolled ? " siteHeaderScrolled" : ""}${menuOpen ? " siteHeaderMenuOpen" : ""}`}>
        <div className="headerUtility">
          <div className="headerUtilityInner">
            <div className="headerUtilityLeft">
              <Link href="/#expertises">Conseil &amp; expertise <ArrowIcon /></Link>
              <span className="headerUtilityDivider" aria-hidden="true" />
              <a href="tel:+212661386782">+212 6 61 38 67 82</a>
            </div>
            <div className="headerUtilityRight">
              <LanguageSwitch />
              <div className="headerActionPair">
                <Link href="/contact" className="headerAction headerActionContact">Contactez-nous <span><ArrowIcon /></span></Link>
                <Link href="/submit-cv" className="headerAction headerActionCv">Déposer un CV <span><ArrowIcon /></span></Link>
              </div>
            </div>
          </div>
        </div>

        <div className="headerMain">
          <div className="headerInner">
            <Link href="/" className="brand" aria-label="ALTINDIS — Accueil">
              <Image src="/logo-altindis.png" alt="ALTINDIS — Votre Partenaire de Développement" width={230} height={56} priority className="brandLogo" />
            </Link>

            <nav className="desktopNav" aria-label="Navigation principale">
              <details className="navDropdown" ref={desktopMenuRef}>
                <summary className="navLink">
                  Nos expertises <ChevronIcon />
                </summary>
                <div className="navDropdownPanel">
                  <p className="navDropdownEyebrow">Nos expertises</p>
                  <div className="navDropdownGrid">
                    {expertiseLinks.map((link, index) => (
                      <Link href={link.href} className="navDropdownLink" onClick={() => desktopMenuRef.current?.removeAttribute("open")} key={`${link.label}-${index}`}>
                        <span className="navDropdownIndex">0{index + 1}</span>
                        <span><strong>{link.label}</strong><small>{link.description}</small></span>
                        <ArrowIcon />
                      </Link>
                    ))}
                  </div>
                </div>
              </details>
              {primaryLinks.map((link) => <Link href={link.href} className="navLink" key={link.label}>{link.label}</Link>)}
            </nav>

            <button type="button" className="mobileMenuButton" aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>
              <span /><span />
            </button>
          </div>
        </div>

        <div className="mobileNavigation" id="mobile-navigation" aria-hidden={!menuOpen} inert={menuOpen ? undefined : true}>
          <nav className="container mobileNavigationInner" aria-label="Navigation mobile">
            <details className="mobileExpertise">
              <summary><span>Nos expertises</span><ChevronIcon /></summary>
              <div className="mobileExpertiseLinks">
                {expertiseLinks.map((link, index) => (
                  <Link href={link.href} key={`${link.label}-${index}`} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{link.label}</Link>
                ))}
              </div>
            </details>
            {primaryLinks.map((link) => (
              <Link href={link.href} className="mobileNavLink" key={link.label} onClick={() => setMenuOpen(false)}><span>{link.label}</span><ArrowIcon /></Link>
            ))}
            <div className="headerActionPair mobileActionPair">
              <Link href="/contact" className="headerAction headerActionContact" onClick={() => setMenuOpen(false)}>Contactez-nous <span><ArrowIcon /></span></Link>
              <Link href="/submit-cv" className="headerAction headerActionCv" onClick={() => setMenuOpen(false)}>Déposer un CV <span><ArrowIcon /></span></Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
