"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  { src: "/images/hero-wide-01.png", alt: "Consultants ALTINDIS échangeant dans un salon professionnel au Maroc" },
  { src: "/images/hero-wide-02.png", alt: "Professionnels marocains avançant ensemble dans un environnement d’entreprise" },
  { src: "/images/hero-wide-03.png", alt: "Équipe inclusive participant à un atelier de formation à Casablanca" },
  { src: "/images/hero-wide-04.png", alt: "Consultants échangeant autour d’une table avec Casablanca en arrière-plan" },
] as const;

function ArrowIcon() {
  return <svg viewBox="0 0 18 18" aria-hidden="true" focusable="false"><path d="M4 9h10M10 5l4 4-4 4" /></svg>;
}

function CarouselArrow({ direction }: { direction: "previous" | "next" }) {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true" focusable="false">
      {direction === "previous" ? <path d="M11.5 4 6.5 9l5 5" /> : <path d="m6.5 4 5 5-5 5" />}
    </svg>
  );
}

export default function HomeHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const showPrevious = () => setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  const showNext = () => setActiveIndex((current) => (current + 1) % slides.length);

  return (
    <section
      className="homeHero"
      aria-labelledby="home-hero-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="homeHeroFrame">
        <div className="homeHeroSlides" aria-live="off">
          {slides.map((slide, index) => (
            <Image
              src={slide.src}
              alt={index === activeIndex ? slide.alt : ""}
              fill
              priority={index === 0}
              sizes="calc(100vw - 24px)"
              className={`homeHeroImage homeHeroImageSlide${index + 1}${index === activeIndex ? " homeHeroImageActive" : ""}`}
              aria-hidden={index !== activeIndex}
              key={slide.src}
            />
          ))}
        </div>

        <div className="homeHeroOverlay" aria-hidden="true" />

        <div className="homeHeroContent">
          <p className="homeHeroEyebrow">Recrutement <span>·</span> Formation <span>·</span> Accompagnement</p>
          <h1 id="home-hero-title" className="homeHeroTitle">
            <span>Des talents</span>
            <span>au service d’un Maroc</span>
            <span>qui avance.</span>
          </h1>
          <p className="homeHeroLead">Recrutement, formation sur mesure et accompagnement des organisations au Maroc.</p>
          <div className="homeHeroActions">
            <Link href="/#expertises" className="homeHeroPrimaryAction"><span>Découvrir nos services</span><ArrowIcon /></Link>
            <Link href="/contact" className="homeHeroSecondaryAction"><span>Parlons de vos besoins</span><ArrowIcon /></Link>
          </div>
        </div>

        <div className="homeHeroCarouselControls" aria-label="Contrôles du carrousel">
          <button type="button" onClick={showPrevious} aria-label="Afficher l’image précédente"><CarouselArrow direction="previous" /></button>
          <div className="homeHeroCarouselDots" role="group" aria-label="Choisir une image">
            {slides.map((slide, index) => (
              <button
                type="button"
                className={index === activeIndex ? "isActive" : ""}
                onClick={() => setActiveIndex(index)}
                aria-label={`Afficher l’image ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
                key={slide.src}
              />
            ))}
          </div>
          <span aria-hidden="true">0{activeIndex + 1} / 0{slides.length}</span>
          <button type="button" onClick={showNext} aria-label="Afficher l’image suivante"><CarouselArrow direction="next" /></button>
        </div>
      </div>
    </section>
  );
}
