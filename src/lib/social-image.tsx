import { ImageResponse } from "next/og";

export function socialImage(language: "fr" | "en") {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 80px", color: "white", background: "linear-gradient(120deg, #111b3c, #342b89)" }}>
      <div style={{ display: "flex", fontSize: 36, letterSpacing: 8 }}>ALTINDIS</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", fontSize: 70, lineHeight: 1.12, maxWidth: 1000 }}>{language === "fr" ? "Des talents au service d’un Maroc qui avance." : "Talent for a Morocco moving forward."}</div>
        <div style={{ display: "flex", fontSize: 27, color: "#ddd8f4" }}>{language === "fr" ? "Recrutement · Formation · Accompagnement" : "Recruitment · Training · Consulting"}</div>
      </div>
      <div style={{ display: "flex", height: 3, background: "#a599df", width: 96 }} />
    </div>, { width: 1200, height: 630 },
  );
}
