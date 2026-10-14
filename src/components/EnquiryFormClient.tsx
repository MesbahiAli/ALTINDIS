"use client";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState, type FormEvent } from "react";

declare global {
  interface Window { turnstile?: {
    render: (element: HTMLElement, options: Record<string, unknown>) => string;
    remove: (id: string) => void; reset: (id: string) => void;
  } }
}

export default function EnquiryFormClient({ cv, language, ready, siteKey }: { cv: boolean; language: "fr" | "en"; ready: boolean; siteKey: string }) {
  const en = language === "en";
  const t = (fr: string, english: string) => en ? english : fr;
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<"" | "success" | "error" | "draft">("");
  const [errorCode, setErrorCode] = useState("");
  const [draft, setDraft] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [token, setToken] = useState("");
  const widget = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const guard = useRef(false);

  useEffect(() => {
    if (!ready || !loaded || !widget.current || !window.turnstile) return;
    const id = window.turnstile.render(widget.current, {
      sitekey: siteKey, action: "enquiry", language, size: "flexible",
      callback: (value: string) => setToken(value), "expired-callback": () => setToken(""),
      "error-callback": () => { setToken(""); setStatus("error"); setErrorCode("verification_failed"); },
    });
    widgetId.current = id;
    return () => { window.turnstile?.remove(id); widgetId.current = null; };
  }, [ready, loaded, siteKey, language]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (guard.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (!ready) {
      const name = `${data.get("firstName")} ${data.get("lastName")}`;
      const subject = cv ? t("Candidature", "Application") : t("Demande de contact", "Contact enquiry");
      const body = [t("Bonjour ALTINDIS,", "Hello ALTINDIS,"), "", `${t("Nom", "Name")}: ${name}`, `Email: ${data.get("email")}`, `${t("Téléphone", "Phone")}: ${data.get("phone") || "—"}`, `LinkedIn: ${data.get("linkedin") || "—"}`, "", String(data.get("message") || ""), ...(cv ? ["", t("CV : à joindre avant l’envoi.", "CV: attach before sending.")] : [])].join("\n");
      const url = `mailto:Contact@Altindis.ma?subject=${encodeURIComponent(`${subject} — ${name}`)}&body=${encodeURIComponent(body)}`;
      setDraft(url); setStatus("draft"); window.location.href = url;
      return;
    }
    guard.current = true; setBusy(true); setStatus("");
    data.set("kind", cv ? "cv" : "contact"); data.set("turnstileToken", token);
    try {
      const result = await fetch("/api/enquiry", { method: "POST", body: data, signal: AbortSignal.timeout(30_000) });
      const payload = await result.json();
      if (!result.ok || payload.ok !== true) { setErrorCode(payload.error || "delivery_failed"); setStatus("error"); }
      else { setStatus("success"); form.reset(); }
    } catch { setStatus("error"); setErrorCode("delivery_failed"); }
    finally { guard.current = false; setBusy(false); setToken(""); if (widgetId.current) window.turnstile?.reset(widgetId.current); }
  }
  const errors: Record<string, [string, string]> = {
    invalid_fields: ["Vérifiez les champs du formulaire.", "Please check the form fields."],
    invalid_linkedin: ["Utilisez une adresse https://www.linkedin.com/… valide.", "Use a valid https://www.linkedin.com/… address."],
    missing_cv: ["Ajoutez votre CV au format PDF.", "Please attach your CV as a PDF."],
    invalid_cv: ["Le CV doit être un fichier PDF valide.", "Your CV must be a valid PDF file."],
    cv_too_large: ["Le CV doit faire moins de 2 Mo.", "Your CV must be smaller than 2 MB."],
    request_too_large: ["Le fichier est trop volumineux (2 Mo maximum).", "The file is too large (2 MB maximum)."],
    verification_failed: ["Veuillez refaire la vérification avant de réessayer.", "Please repeat verification before trying again."],
    rate_limited: ["Trop de tentatives. Réessayez dans dix minutes.", "Too many attempts. Please try again in ten minutes."],
  };
  const errorText = errors[errorCode]?.[en ? 1 : 0] || t("L’envoi n’a pas pu être confirmé. Réessayez ou contactez-nous par email.", "Your submission could not be confirmed. Please try again or email us directly.");
  return <form className="enquiryForm" onSubmit={submit}>
    <h2>{cv ? t("Présentez-nous votre parcours", "Tell us about your experience") : t("Contactez-nous", "Contact us")}</h2>
    <div className="enquiryFields">
      <label htmlFor="firstName">{t("Prénom", "First name")} <span>*</span><input id="firstName" name="firstName" autoComplete="given-name" required maxLength={80} /></label>
      <label htmlFor="lastName">{t("Nom", "Last name")} <span>*</span><input id="lastName" name="lastName" autoComplete="family-name" required maxLength={80} /></label>
      <label htmlFor="email">Email <span>*</span><input id="email" name="email" type="email" autoComplete="email" required maxLength={150} /></label>
      <label htmlFor="phone">{t("Téléphone", "Phone")}<input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={40} /></label>
      {cv && <label className="enquiryFull" htmlFor="linkedin">{t("Profil LinkedIn (facultatif)", "LinkedIn profile (optional)")}<input id="linkedin" name="linkedin" type="url" placeholder="https://www.linkedin.com/in/…" maxLength={300} /></label>}
      <label className="enquiryFull" htmlFor="message">{cv ? t("Votre projet professionnel", "Your career goals") : t("Votre message", "Your message")} {!cv && <span>*</span>}<textarea id="message" name="message" rows={4} required={!cv} maxLength={2000} /></label>
      {cv && ready && <label className="enquiryFull" htmlFor="cv">{t("Votre CV · PDF, 2 Mo maximum", "Your CV · PDF, max. 2 MB")} <span>*</span><input id="cv" name="cv" type="file" accept="application/pdf,.pdf" required /></label>}
    </div>
    <div className="enquiryHoneypot" aria-hidden="true"><label htmlFor="companyWebsite">Website<input id="companyWebsite" name="companyWebsite" tabIndex={-1} autoComplete="off" /></label></div>
    {cv && !ready && <div className="cvAttachmentNote"><strong>{t("Votre CV en pièce jointe", "Attach your CV")}</strong><p>{t("Ajoutez votre CV PDF au brouillon avant de l’envoyer.", "Attach your PDF CV to the draft before sending it.")}</p></div>}
    <p className="enquiryDeliveryNote">{ready ? t("Vos informations seront transmises par email à ALTINDIS pour répondre à votre demande.", "Your details will be emailed to ALTINDIS to respond to your enquiry.") : t("Ce formulaire prépare un email à relire et envoyer depuis votre messagerie.", "This form prepares an email for you to review and send from your email app.")} <Link href={en ? "/en/privacy" : "/confidentialite"}>{t("Confidentialité", "Privacy")}</Link></p>
    {ready && <><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={() => setLoaded(true)} onError={() => { setStatus("error"); setErrorCode("verification_failed"); }} /><div className="enquiryVerification" ref={widget} /></>}
    <button className="enquirySubmit" type="submit" disabled={busy || (ready && !token)}>{busy ? t("Envoi en cours…", "Sending…") : ready ? cv ? t("Envoyer ma candidature", "Send my application") : t("Envoyer mon message", "Send my message") : t("Préparer mon email", "Prepare my email")}<span aria-hidden="true">→</span></button>
    {status === "success" && <p className="enquiryStatus" role="status">{t("Votre demande a été acceptée par notre service de messagerie. Merci d’avoir contacté ALTINDIS.", "Your submission has been accepted by our email service. Thank you for contacting ALTINDIS.")}</p>}
    {status === "error" && <p className="enquiryStatus enquiryError" role="alert">{errorText} <a href="mailto:Contact@Altindis.ma">Contact@Altindis.ma</a></p>}
    {status === "draft" && <p className="enquiryStatus" role="status">{t("Relisez puis envoyez votre email", "Review and send your email")}{cv ? t(" après avoir joint votre CV.", " after attaching your CV.") : "."} <a href={draft}>{t("Ouvrir le brouillon", "Open the draft")}</a>.</p>}
  </form>;
}
