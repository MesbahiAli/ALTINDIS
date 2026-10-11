type Props = {
  eyebrow: string;
  title: string;
  copy?: string;
  light?: boolean;
};

export default function SectionHeading({ eyebrow, title, copy, light = false }: Props) {
  return (
    <div className={`sectionHeading ${light ? "sectionHeadingLight" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {copy ? <p className="sectionLead">{copy}</p> : null}
    </div>
  );
}
