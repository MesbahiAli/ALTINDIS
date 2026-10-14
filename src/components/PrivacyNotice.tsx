export default function PrivacyNotice({ language }: { language: "fr" | "en" }) {
  const en = language === "en";
  const sections = en ? [
    ["Who to contact", "ALTINDIS, 59 Boulevard Zerktouni, 6th floor, 20360 Casablanca, Morocco. For questions about your information, contact Contact@Altindis.ma."],
    ["Information you provide", "Contact requests include your name, email address, optional phone number and message. Applications may also include your LinkedIn profile and CV. Please share only the information needed for your request."],
    ["How the forms work", "The form tells you whether it sends your request directly or prepares an email draft. In draft mode, nothing is sent until you send the email yourself. When direct submission is available, your details and any attached CV are transmitted to ALTINDIS through its configured email service."],
    ["Security and service providers", "Direct submissions use Cloudflare Turnstile for spam protection. The hosting, email and spam-protection providers process the technical data needed to operate these services. The website does not store form submissions in a database or browser storage."],
    ["Your requests", "ALTINDIS uses your information to respond to your enquiry or review your application. Contact the firm to ask about mailbox retention or to request access, correction or deletion of the information you submitted. Do not send identity documents or sensitive information that is unnecessary for your request."],
    ["Cookies and analytics", "The website does not currently include advertising trackers or an analytics service. When direct submissions are enabled, the spam-protection service follows its own privacy terms."],
  ] : [
    ["Votre interlocuteur", "ALTINDIS, 59 Boulevard Zerktouni, 6e étage, 20360 Casablanca, Maroc. Pour toute question concernant vos informations, contactez Contact@Altindis.ma."],
    ["Les informations que vous partagez", "Une demande de contact comprend votre nom, votre email, votre téléphone facultatif et votre message. Une candidature peut également comprendre votre profil LinkedIn et votre CV. Ne partagez que les informations nécessaires à votre demande."],
    ["Le fonctionnement des formulaires", "Le formulaire précise s’il transmet directement votre demande ou prépare un brouillon d’email. En mode brouillon, rien n’est envoyé avant votre propre envoi. Lorsque l’envoi direct est disponible, vos informations et votre CV éventuel sont transmis à ALTINDIS par son service de messagerie configuré."],
    ["La sécurité et les prestataires", "Les envois directs utilisent Cloudflare Turnstile pour limiter les messages indésirables. Les prestataires d’hébergement, de messagerie et de protection traitent les données techniques nécessaires à leur fonctionnement. Le site n’enregistre pas les demandes dans une base de données ou dans le stockage du navigateur."],
    ["Vos demandes", "ALTINDIS utilise vos informations pour répondre à votre demande ou étudier votre candidature. Contactez le cabinet pour connaître la durée de conservation dans sa messagerie ou demander l’accès, la correction ou la suppression des informations transmises. N’envoyez pas de documents d’identité ou de données sensibles inutiles à votre demande."],
    ["Cookies et mesure d’audience", "Le site ne contient actuellement ni traceur publicitaire ni service de mesure d’audience. Lorsque l’envoi direct est activé, le service de protection applique ses propres conditions de confidentialité."],
  ];
  return <section className="section"><article className="container narrow privacyNotice">
    <p className="eyebrow">ALTINDIS</p><h1>{en ? "Privacy and your information" : "Confidentialité et vos informations"}</h1>
    {sections.map(([title, text]) => <section key={title}><h2>{title}</h2><p>{text}</p></section>)}
    <a href="mailto:Contact@Altindis.ma">Contact@Altindis.ma</a>
  </article></section>;
}
