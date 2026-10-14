import PrivacyNotice from "@/components/PrivacyNotice";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata("/confidentialite", "fr", "Confidentialité", "Informations sur les demandes de contact et candidatures transmises à ALTINDIS.");
export default function PrivacyPage() { return <PrivacyNotice language="fr" />; }
