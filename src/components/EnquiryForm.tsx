import EnquiryFormClient from "@/components/EnquiryFormClient";
import { deliveryConfigured } from "@/lib/enquiry";

export default function EnquiryForm({ cv = false, language = "fr" }: { cv?: boolean; language?: "fr" | "en" }) {
  const ready = deliveryConfigured();
  return <EnquiryFormClient cv={cv} language={language} ready={ready} siteKey={ready ? process.env.TURNSTILE_SITE_KEY! : ""} />;
}
