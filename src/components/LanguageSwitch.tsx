"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { languageRoutes as routes } from "@/lib/routes";

function LanguageFlag({ english }: { english: boolean }) {
  return <span className="languageFlag" aria-hidden="true">
    {english ? <svg viewBox="0 0 30 20" preserveAspectRatio="xMidYMid slice"><path fill="#183568" d="M0 0h30v20H0z" /><path stroke="#fff" strokeWidth="4" d="m0 0 30 20M30 0 0 20" /><path stroke="#d62839" strokeWidth="1.4" d="m0 0 30 20M30 0 0 20" /><path stroke="#fff" strokeWidth="6" d="M15 0v20M0 10h30" /><path stroke="#d62839" strokeWidth="3.5" d="M15 0v20M0 10h30" /></svg> : <svg viewBox="0 0 30 20" preserveAspectRatio="xMidYMid slice"><path fill="#fff" d="M0 0h30v20H0z" /><path fill="#244691" d="M0 0h10v20H0z" /><path fill="#e63b49" d="M20 0h10v20H20z" /></svg>}
  </span>;
}

export default function LanguageSwitch() {
  const dropdownRef = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  const english = pathname === "/en" || pathname.startsWith("/en/");
  const frenchPath = english ? Object.keys(routes).find(path => routes[path] === pathname) || "/" : pathname;
  const [hash, setHash] = useState("");

  useEffect(() => {
    const update = () => setHash(window.location.hash);
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, [pathname]);

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) dropdownRef.current?.removeAttribute("open");
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && dropdownRef.current?.open) {
        dropdownRef.current.removeAttribute("open");
        dropdownRef.current.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <nav className="languageSwitch" aria-label={english ? "Language" : "Langue"}>
      <details className="languageDropdown" ref={dropdownRef}>
        <summary className="languageTrigger" aria-label={english ? "Change language — English" : "Changer de langue — Français"}>
          <svg className="languageTranslateIcon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 5h11M8 3v2M5 5c.5 5 3.5 8 7 10M12 5c-.5 5-3.5 8-7 10m9 5 4-10 4 10m-6.5-3h5" /></svg>
          <LanguageFlag english={english} />
          <span className="languageCurrentName">{english ? "English" : "Français"}</span>
          <span className="languageCurrentCode">{english ? "EN" : "FR"}</span>
          <svg className="languageChevron" viewBox="0 0 12 8" fill="none" aria-hidden="true"><path d="m1 1 5 5 5-5" /></svg>
        </summary>
        <div className="languageSwitchOptions">
          <p className="languageDropdownLabel">{english ? "Choose your language" : "Choisissez votre langue"}</p>
          {[{ en: false, name: "Français", code: "FR", href: frenchPath + hash }, { en: true, name: "English", code: "EN", href: (routes[frenchPath] || "/en") + hash }].map(language => (
            <Link key={language.code} href={language.href} hrefLang={language.en ? "en" : "fr"} lang={language.en ? "en" : "fr"} aria-label={language.name} aria-current={english === language.en ? "page" : undefined} onClick={() => dropdownRef.current?.removeAttribute("open")}>
              <LanguageFlag english={language.en} />
              <span className="languageOptionName">{language.name}<small>{language.code}</small></span>
              {english === language.en && <svg className="languageCheck" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m3 8 3 3 7-7" /></svg>}
            </Link>
          ))}
        </div>
      </details>
    </nav>
  );
}
