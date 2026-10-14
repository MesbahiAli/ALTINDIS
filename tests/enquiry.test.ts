import { test } from "node:test";
import assert from "node:assert/strict";
import { boundedFormData, EnquiryError, MAX_CV_BYTES, MAX_REQUEST_BYTES, parseEnquiry } from "../src/lib/enquiry";

function form(kind = "contact") {
  const data = new FormData();
  for (const [key, value] of Object.entries({ kind, firstName: "Test", lastName: "Applicant", email: "test@example.com", message: "Test enquiry", turnstileToken: "test-token" })) data.set(key, value);
  return data;
}
function rejects(code: string) { return (error: unknown) => error instanceof EnquiryError && error.code === code; }

test("valid contact enquiry preserves multiline text", async () => {
  const data = form(); data.set("message", "First line\nSecond line");
  const parsed = await parseEnquiry(data);
  assert.equal(parsed.message, "First line\nSecond line"); assert.equal(parsed.attachment, undefined);
});
test("rejects header injection, missing messages, invalid addresses and oversized fields", async () => {
  for (const [key, value] of [["email", "a@example.com\r\nBcc: a@bad.test"], ["firstName", "A\nB"], ["message", ""], ["email", "invalid"], ["message", "a".repeat(2001)]]) {
    const data = form(); data.set(key, value); await assert.rejects(parseEnquiry(data), rejects("invalid_fields"));
  }
});
test("rejects bot honeypot and invalid LinkedIn URLs", async () => {
  const data = form(); data.set("companyWebsite", "spam"); await assert.rejects(parseEnquiry(data), rejects("invalid_fields"));
  data.delete("companyWebsite"); data.set("linkedin", "https://linkedin.com.evil.test/profile");
  await assert.rejects(parseEnquiry(data), rejects("invalid_linkedin"));
});
test("CV requires a bounded PDF attachment with a PDF signature", async () => {
  const data = form("cv"); await assert.rejects(parseEnquiry(data), rejects("missing_cv"));
  data.set("cv", new File(["not a pdf"], "CV.pdf", { type: "application/pdf" })); await assert.rejects(parseEnquiry(data), rejects("invalid_cv"));
  data.set("cv", new File([new Uint8Array(MAX_CV_BYTES + 1)], "CV.pdf", { type: "application/pdf" })); await assert.rejects(parseEnquiry(data), rejects("cv_too_large"));
  data.set("cv", new File(["%PDF-1.4\n%%EOF"], "CV.pdf", { type: "application/pdf" }));
  assert.ok((await parseEnquiry(data)).attachment?.subarray(0, 5).equals(Buffer.from("%PDF-")));
});
test("request body limits work without trusting Content-Length", async () => {
  const request = new Request("https://example.test/api/enquiry", { method: "POST", headers: { "Content-Type": "multipart/form-data; boundary=test" }, body: Buffer.alloc(MAX_REQUEST_BYTES + 1) });
  await assert.rejects(boundedFormData(request), rejects("request_too_large"));
});
