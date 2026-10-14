import Image from "next/image";

const logos = [
  { key: "totalenergies", src: "/references/totalenergies.png", alt: "TotalEnergies", width: 223, height: 131 },
  { key: "vivo", src: "/references/vivo-energy.png", alt: "Vivo Energy", width: 452, height: 111 },
  { key: "tractafric", src: "/references/tractafric.png", alt: "Tractafric Equipment CAT", width: 600, height: 600 },
  { key: "akwel", src: "/references/akwel.png", alt: "AKWEL", width: 262, height: 81 },
  { key: "ciments", src: "/references/ciments-du-maroc.jpeg", alt: "Ciments du Maroc", width: 633, height: 317 },
  { key: "wilmaco", src: "/references/wilmaco.svg", alt: "WILMACO Food Industries", width: 320, height: 96 },
] as const;

export default function References() {
  return (
    <section className="referencesBand" id="references" aria-labelledby="references-title">
      <div className="container">
        <h2 className="referencesTitle" id="references-title">Our clients</h2>
        <ul className="referencesGrid" aria-label="ALTINDIS client references">
          {logos.map((logo) => (
            <li className="referenceItem" key={logo.key}>
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                sizes="(max-width: 640px) 42vw, (max-width: 1024px) 28vw, 15vw"
                className={`referenceLogo referenceLogo--${logo.key}`}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
