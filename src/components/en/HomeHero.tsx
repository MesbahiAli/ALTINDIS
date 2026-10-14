"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  { src: "/images/hero-wide-01.png", alt: "ALTINDIS consultants meeting in a professional lounge in Morocco" },
  { src: "/images/hero-wide-02.png", alt: "Moroccan professionals working together in a business setting" },
  { src: "/images/hero-wide-03.png", alt: "An inclusive team taking part in a training workshop in Casablanca" },
  { src: "/images/hero-wide-04.png", alt: "Consultants meeting around a table with Casablanca in the background" },
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
          <p className="homeHeroEyebrow">Recruitment <span>·</span> Training <span>·</span> Consulting</p>
          <h1 id="home-hero-title" className="homeHeroTitle">
            <span>Talent</span>
            <span>for a Morocco</span>
            <span>moving forward.</span>
          </h1>
          <p className="homeHeroLead">Recruitment, tailored training and consulting for organisations in Morocco.</p>
          <div className="homeHeroActions">
            <Link href="/en#expertises" className="homeHeroPrimaryAction"><span>Explore our services</span><ArrowIcon /></Link>
            <Link href="/en/contact" className="homeHeroSecondaryAction"><span>Discuss your needs</span><ArrowIcon /></Link>
          </div>
        </div>

        <div className="homeHeroCarouselControls" aria-label="Slideshow controls">
          <button type="button" onClick={showPrevious} aria-label="Show previous image"><CarouselArrow direction="previous" /></button>
          <div className="homeHeroCarouselDots" role="group" aria-label="Choose an image">
            {slides.map((slide, index) => (
              <button
                type="button"
                className={index === activeIndex ? "isActive" : ""}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show image ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
                key={slide.src}
              />
            ))}
          </div>
          <span aria-hidden="true">0{activeIndex + 1} / 0{slides.length}</span>
          <button type="button" onClick={showNext} aria-label="Show next image"><CarouselArrow direction="next" /></button>
        </div>
      </div>
    </section>
  );
}
