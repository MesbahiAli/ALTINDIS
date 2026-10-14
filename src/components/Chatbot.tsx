"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";

type Topic = "recruitment" | "training" | "consulting" | "cv" | "contact";
type Message = { role: "user" | "assistant"; text: string; topic?: Topic };

const content = {
  fr: {
    title: "Parlons de votre projet", subtitle: "Le guide ALTINDIS", badge: "Guide virtuel",
    greeting: "Bonjour et bienvenue chez ALTINDIS. Comment pouvons-nous vous accompagner ?",
    open: "Ouvrir le guide ALTINDIS", close: "Fermer la conversation", send: "Envoyer", placeholder: "Écrivez votre question…",
    note: "Réponses automatiques · Aucun message envoyé au cabinet",
    fallback: "Pour une réponse adaptée à votre situation, notre équipe peut vous aider. Vous pouvez la contacter au +212 6 61 38 67 82 ou à Contact@Altindis.ma.",
    fallbackLink: "Contacter le cabinet", caption: "Un projet en tête ?",
    topics: {
      recruitment: { label: "Recruter des talents", answer: "Nous vous accompagnons dans la recherche et l’évaluation de dirigeants, managers, ingénieurs et collaborateurs, avec une approche adaptée aux besoins de votre organisation.", link: "Découvrir le recrutement", path: "/recrutement" },
      training: { label: "Former mon équipe", answer: "Nos formations sur mesure partent de vos besoins, de votre culture et de vos objectifs : management, RH, communication, vente, logistique, QHSE, finance et bien plus.", link: "Explorer les formations", path: "/formation" },
      consulting: { label: "Accompagner un projet", answer: "ALTINDIS accompagne vos projets d’investissement, de développement, d’amélioration des performances et de certification, ainsi que vos enjeux d’achats et de supply chain.", link: "Découvrir l’accompagnement", path: "/accompagnement" },
      cv: { label: "Déposer mon CV", answer: "Présentez-nous votre parcours et votre projet professionnel. Suivez les indications du formulaire pour joindre votre CV en PDF et transmettre votre candidature.", link: "Préparer ma candidature", path: "/submit-cv" },
      contact: { label: "Contacter ALTINDIS", answer: "Retrouvez-nous au 59 Boulevard Zerktouni, 6e étage, 20360 Casablanca. Téléphone : +212 6 61 38 67 82 / +212 6 55 55 52 92. Email : Contact@Altindis.ma.", link: "Parlons de votre projet", path: "/contact" },
    },
  },
  en: {
    title: "Let’s discuss your project", subtitle: "Your ALTINDIS guide", badge: "Virtual guide",
    greeting: "Hello and welcome to ALTINDIS. How can we support you?",
    open: "Open the ALTINDIS guide", close: "Close conversation", send: "Send", placeholder: "Type your question…",
    note: "Automated answers · No messages sent to the firm",
    fallback: "For an answer tailored to your situation, our team can help. Contact us at +212 6 61 38 67 82 or Contact@Altindis.ma.",
    fallbackLink: "Contact our team", caption: "Have a project in mind?",
    topics: {
      recruitment: { label: "Recruit talent", answer: "We help you find and assess executives, managers, engineers and staff, with an approach tailored to your organisation’s needs.", link: "Explore recruitment", path: "/en/recruitment" },
      training: { label: "Train my team", answer: "Our tailored training starts with your needs, culture and goals: management, HR, communication, sales, logistics, QHSE, finance and more.", link: "Explore training", path: "/en/training" },
      consulting: { label: "Support a project", answer: "ALTINDIS supports investment, development, performance improvement and certification projects, as well as procurement and supply chain initiatives.", link: "Explore consulting", path: "/en/consulting" },
      cv: { label: "Submit my CV", answer: "Tell us about your experience and career goals. Follow the form instructions to attach your CV as a PDF and send your application.", link: "Prepare my application", path: "/en/submit-cv" },
      contact: { label: "Contact ALTINDIS", answer: "Find us at 59 Boulevard Zerktouni, 6th floor, 20360 Casablanca. Phone: +212 6 61 38 67 82 / +212 6 55 55 52 92. Email: Contact@Altindis.ma.", link: "Let’s discuss your project", path: "/en/contact" },
    },
  },
};

function ChatIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8l-6 4v-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" /><path d="M7 9h10M7 13h6" /></svg>;
}

function detectTopic(text: string): Topic | undefined {
  const value = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (/\bcv\b|candid|apply|application|emploi|career|job|resume/.test(value)) return "cv";
  if (/recrut|recruit|talent|hiring/.test(value)) return "recruitment";
  if (/format|train|learn|competenc|skill/.test(value)) return "training";
  if (/accompagn|consult|projet|project|certif|qhse|supply/.test(value)) return "consulting";
  if (/contact|phone|teleph|email|adresse|address|where|casablanca|bonjour|hello|salut/.test(value)) return "contact";
  return undefined;
}

export default function Chatbot({ language = "fr" }: { language?: "fr" | "en" }) {
  const copy = content[language];
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const launcher = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  function close() { setOpen(false); launcher.current?.focus(); }

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") close(); };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);

  useEffect(() => {
    if (historyRef.current) historyRef.current.scrollTop = historyRef.current.scrollHeight;
  }, [messages, open]);

  function answer(text: string, topic?: Topic) {
    setMessages(current => [...current, { role: "user", text }, { role: "assistant", text: topic ? copy.topics[topic].answer : copy.fallback, topic }]);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;
    answer(text, detectTopic(text));
    setInput("");
  }

  return <div className="altChat">
    {open && <section className="altChatPanel" role="dialog" aria-label={copy.subtitle}>
      <header className="altChatHeader">
        <div className="altChatAvatar" aria-hidden="true">A<span>✦</span></div>
        <div><span className="altChatBrand">ALTINDIS</span><h2>{copy.subtitle}</h2><p>{copy.badge}</p></div>
        <button className="altChatClose" type="button" aria-label={copy.close} onClick={close}><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15" /></svg></button>
      </header>
      <div className="altChatHistory" ref={historyRef} role="log" aria-live="polite" aria-relevant="additions text">
        <div className="altChatWelcome"><span aria-hidden="true">✦</span><h3>{copy.title}</h3><p>{copy.greeting}</p></div>
        <div className="altChatTopics">{(Object.keys(copy.topics) as Topic[]).map(topic => <button type="button" key={topic} onClick={() => answer(copy.topics[topic].label, topic)}>{copy.topics[topic].label}<span aria-hidden="true">↗</span></button>)}</div>
        {messages.map((message, index) => <div key={index} className={`altChatMessage altChatMessage-${message.role}`}>
          <span className="altChatSender">{message.role === "assistant" ? "ALTINDIS" : language === "en" ? "You" : "Vous"}</span>
          <p>{message.text}</p>
          {message.role === "assistant" && <Link href={message.topic ? copy.topics[message.topic].path : copy.topics.contact.path} onClick={close}>{message.topic ? copy.topics[message.topic].link : copy.fallbackLink}<span aria-hidden="true"> →</span></Link>}
        </div>)}
      </div>
      <form className="altChatComposer" onSubmit={submit}>
        <label className="altChatSrOnly" htmlFor="alt-chat-input">{copy.placeholder}</label>
        <input id="alt-chat-input" ref={inputRef} value={input} onChange={event => setInput(event.target.value)} placeholder={copy.placeholder} maxLength={500} autoComplete="off" />
        <button type="submit" disabled={!input.trim()} aria-label={copy.send}><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10h12m-5-5 5 5-5 5" /></svg></button>
      </form>
      <p className="altChatNote">{copy.note}</p>
    </section>}
    <button className={`altChatLauncher${open ? " isOpen" : ""}`} type="button" ref={launcher} aria-expanded={open} aria-label={open ? copy.close : copy.open} onClick={() => open ? close() : setOpen(true)}>
      <ChatIcon /><span>{open ? "ALTINDIS" : copy.caption}</span><span className="altChatLauncherSpark" aria-hidden="true">✦</span>
    </button>
  </div>;
}
