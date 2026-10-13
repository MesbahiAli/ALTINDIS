import type { Metadata } from "next";
import Chatbot from "@/components/Chatbot";
import "../../chatbot.css";

export const metadata: Metadata = {
  title: "Aperçu du chatbot",
  robots: { index: false, follow: false },
};

export default function ChatbotPreview() {
  return <>
    <section className="section"><div className="container narrow">
      <p className="eyebrow">Prototype · ALTINDIS</p>
      <h1>Aperçu du guide virtuel</h1>
      <p>Ouvrez le bouton en bas à droite pour découvrir le design et les réponses guidées. Ce prototype n’apparaît pas sur les pages du site.</p>
    </div></section>
    <Chatbot language="fr" />
  </>;
}
