"use client";
import { useState, type FormEvent } from "react";

export default function EnquiryForm({ cv = false }: { cv?: boolean }) {
  const [draftUrl, setDraftUrl] = useState("");
  function prepareDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = `${data.get("firstName")} ${data.get("lastName")}`;
    const body = ["Hello ALTINDIS,", "", cv ? "I would like to submit my application." : "I would like to speak with your team.", "", `Name: ${name}`, `Email: ${data.get("email")}`, `Phone: ${data.get("phone") || "Not provided"}`, ...(cv ? [`LinkedIn: ${data.get("linkedin") || "Not provided"}`, "I have attached my CV to this email."] : []), "", String(data.get("message") || ""), "", "Kind regards,", name].join("\n");
    const url = `mailto:Contact@Altindis.ma?subject=${encodeURIComponent(`${cv ? "Application" : "Contact enquiry"} — ${name}`)}&body=${encodeURIComponent(body)}`;
    setDraftUrl(url);
    window.location.href = url;
  }
  return (
    <form className="enquiryForm" onSubmit={prepareDraft}>
      <h2>{cv ? "Tell us about your experience" : "Contact us"}</h2>
      <div className="enquiryFields">
        <label htmlFor="firstName">First name <span>*</span><input id="firstName" name="firstName" autoComplete="given-name" required maxLength={80} /></label>
        <label htmlFor="lastName">Last name <span>*</span><input id="lastName" name="lastName" autoComplete="family-name" required maxLength={80} /></label>
        <label htmlFor="email">Email <span>*</span><input id="email" name="email" type="email" autoComplete="email" required maxLength={150} /></label>
        <label htmlFor="phone">Phone<input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={40} /></label>
        {cv && <label className="enquiryFull" htmlFor="linkedin">LinkedIn profile <small>(optional)</small><input id="linkedin" name="linkedin" type="url" placeholder="https://www.linkedin.com/in/…" maxLength={300} /></label>}
        <label className="enquiryFull" htmlFor="message">{cv ? "Your career goals" : "Your message"} {!cv && <span>*</span>}<textarea id="message" name="message" rows={4} required={!cv} maxLength={2000} /></label>
      </div>
      {cv && <div className="cvAttachmentNote"><strong>Attach your CV</strong><p>When the draft opens in your email app, attach your CV as a PDF, then send your application.</p></div>}
      <p className="enquiryDeliveryNote">This form prepares an email for you to review and send from your email app. No data is stored on this website.</p>
      <button className="enquirySubmit" type="submit">Prepare my email <span aria-hidden="true">→</span></button>
      {draftUrl && <p className="enquiryStatus" role="status">Draft prepared. Send it from your email app{cv ? " after attaching your CV" : ""}. If your email app did not open, <a href={draftUrl}>open the draft</a> or email <a href="mailto:Contact@Altindis.ma">Contact@Altindis.ma</a>.</p>}
    </form>
  );
}
