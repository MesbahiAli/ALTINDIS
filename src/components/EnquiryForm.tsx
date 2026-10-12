"use client";
import { useState, type FormEvent } from "react";

export default function EnquiryForm({ cv = false }: { cv?: boolean }) {
  const [draftUrl, setDraftUrl] = useState("");
  function prepareDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = `${data.get("firstName")} ${data.get("lastName")}`;
    const body = ["Bonjour ALTINDIS,", "", cv ? "Je souhaite vous présenter ma candidature." : "Je souhaite échanger avec votre équipe.", "", `Nom : ${name}`, `Email : ${data.get("email")}`, `Téléphone : ${data.get("phone") || "Non renseigné"}`, ...(cv ? [`LinkedIn : ${data.get("linkedin") || "Non renseigné"}`, "Je joins mon CV à cet email."] : []), "", String(data.get("message") || ""), "", "Cordialement,", name].join("\n");
    const url = `mailto:Contact@Altindis.ma?subject=${encodeURIComponent(`${cv ? "Candidature" : "Demande de contact"} — ${name}`)}&body=${encodeURIComponent(body)}`;
    setDraftUrl(url);
    window.location.href = url;
  }
  return (
    <form className="enquiryForm" onSubmit={prepareDraft}>
      <h2>{cv ? "Présentez-nous votre parcours" : "Contactez-nous"}</h2>
      <div className="enquiryFields">
        <label htmlFor="firstName">Prénom <span>*</span><input id="firstName" name="firstName" autoComplete="given-name" required maxLength={80} /></label>
        <label htmlFor="lastName">Nom <span>*</span><input id="lastName" name="lastName" autoComplete="family-name" required maxLength={80} /></label>
        <label htmlFor="email">Email <span>*</span><input id="email" name="email" type="email" autoComplete="email" required maxLength={150} /></label>
        <label htmlFor="phone">Téléphone<input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={40} /></label>
        {cv && <label className="enquiryFull" htmlFor="linkedin">Profil LinkedIn <small>(facultatif)</small><input id="linkedin" name="linkedin" type="url" placeholder="https://www.linkedin.com/in/…" maxLength={300} /></label>}
        <label className="enquiryFull" htmlFor="message">{cv ? "Votre projet professionnel" : "Votre message"} {!cv && <span>*</span>}<textarea id="message" name="message" rows={4} required={!cv} maxLength={2000} /></label>
      </div>
      {cv && <div className="cvAttachmentNote"><strong>Votre CV en pièce jointe</strong><p>Après ouverture du brouillon, ajoutez votre CV au format PDF dans votre application de messagerie, puis envoyez votre candidature.</p></div>}
      <p className="enquiryDeliveryNote">Ce formulaire prépare un email à relire et envoyer depuis votre messagerie. Aucune donnée n’est enregistrée sur ce site.</p>
      <button className="enquirySubmit" type="submit">Préparer mon email <span aria-hidden="true">→</span></button>
      {draftUrl && <p className="enquiryStatus" role="status">Brouillon préparé. Envoyez-le dans votre messagerie{cv ? " après avoir joint votre CV" : ""}. Si elle ne s’est pas ouverte, <a href={draftUrl}>ouvrir le brouillon</a> ou écrire à <a href="mailto:Contact@Altindis.ma">Contact@Altindis.ma</a>.</p>}
    </form>
  );
}
