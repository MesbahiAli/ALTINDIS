import PrivacyNotice from "@/components/PrivacyNotice";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata("/en/privacy", "en", "Privacy", "Information about contact enquiries and applications submitted to ALTINDIS.");
export default function PrivacyPage() { return <PrivacyNotice language="en" />; }
