export const MAX_CV_BYTES = 2 * 1024 * 1024;
export const MAX_REQUEST_BYTES = 3 * 1024 * 1024;

export class EnquiryError extends Error {
  constructor(public code: string, public status = 400) { super(code); }
}

export function deliveryConfigured(): boolean {
  return ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASSWORD", "MAIL_FROM", "MAIL_TO", "TURNSTILE_SITE_KEY", "TURNSTILE_SECRET_KEY"].every(key => Boolean(process.env[key]))
    && [465, 587].includes(Number(process.env.SMTP_PORT));
}

export async function parseEnquiry(data: FormData) {
  const text = (key: string, max: number, required = false, singleLine = true) => {
    const raw = data.get(key);
    if (raw !== null && typeof raw !== "string") throw new EnquiryError("invalid_fields");
    const value = (raw || "").trim();
    if ((required && !value) || value.length > max || /\0/.test(value) || (singleLine && /[\r\n]/.test(value))) throw new EnquiryError("invalid_fields");
    return value;
  };
  const kind = text("kind", 10, true);
  if (kind !== "contact" && kind !== "cv") throw new EnquiryError("invalid_fields");
  if (text("companyWebsite", 200)) throw new EnquiryError("invalid_fields");
  const firstName = text("firstName", 80, true);
  const lastName = text("lastName", 80, true);
  const email = text("email", 150, true);
  if (!/^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(email)) throw new EnquiryError("invalid_fields");
  const phone = text("phone", 40);
  const message = text("message", 2000, kind === "contact", false);
  const linkedin = text("linkedin", 300);
  if (linkedin) {
    try { const url = new URL(linkedin); if (url.protocol !== "https:" || !["linkedin.com", "www.linkedin.com"].includes(url.hostname)) throw new Error(); }
    catch { throw new EnquiryError("invalid_linkedin"); }
  }
  const token = text("turnstileToken", 2048, true);
  let attachment: Buffer | undefined;
  const file = data.get("cv");
  if (kind === "cv") {
    if (!file || typeof file === "string" || !file.size) throw new EnquiryError("missing_cv");
    if (file.size > MAX_CV_BYTES) throw new EnquiryError("cv_too_large", 413);
    if (!file.name.toLowerCase().endsWith(".pdf") || (file.type && file.type !== "application/pdf")) throw new EnquiryError("invalid_cv");
    attachment = Buffer.from(await file.arrayBuffer());
    if (attachment.subarray(0, 5).toString("ascii") !== "%PDF-") throw new EnquiryError("invalid_cv");
  }
  return { kind, firstName, lastName, email, phone, message, linkedin, token, attachment };
}

export async function boundedFormData(request: Request): Promise<FormData> {
  if (!request.headers.get("content-type")?.startsWith("multipart/form-data")) throw new EnquiryError("invalid_fields");
  if (Number(request.headers.get("content-length")) > MAX_REQUEST_BYTES) throw new EnquiryError("request_too_large", 413);
  const reader = request.body?.getReader();
  if (!reader) throw new EnquiryError("invalid_fields");
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const result = await reader.read();
    if (result.done) break;
    size += result.value.byteLength;
    if (size > MAX_REQUEST_BYTES) { await reader.cancel(); throw new EnquiryError("request_too_large", 413); }
    chunks.push(result.value);
  }
  try { return await new Response(Buffer.concat(chunks), { headers: { "content-type": request.headers.get("content-type")! } }).formData(); }
  catch { throw new EnquiryError("invalid_fields"); }
}
