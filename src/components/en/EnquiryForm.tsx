import EnquiryForm from "@/components/EnquiryForm";
export default function EnglishEnquiryForm({ cv = false }: { cv?: boolean }) {
  return <EnquiryForm cv={cv} language="en" />;
}
