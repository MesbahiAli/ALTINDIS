import nodemailer from "nodemailer";
import { createHash } from "node:crypto";
import { boundedFormData, deliveryConfigured, EnquiryError, parseEnquiry } from "@/lib/enquiry";

export const runtime = "nodejs";
export const maxDuration = 30;

const attempts = new Map<string, { count: number; expires: number }>();
function response(body: object, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin");
    const expected = process.env.SITE_URL ? new URL(process.env.SITE_URL).origin : new URL(request.url).origin;
    if (!origin || origin !== expected) throw new EnquiryError("invalid_origin", 403);
    if (!deliveryConfigured()) throw new EnquiryError("unavailable", 503);

    // Best-effort per-instance limiter; single-use Turnstile tokens are also mandatory.
    const now = Date.now();
    for (const [key, value] of attempts) if (value.expires < now) attempts.delete(key);
    const ip = process.env.VERCEL ? request.headers.get("x-vercel-forwarded-for") : process.env.TRUST_PROXY === "1" ? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() : null;
    if (ip) {
      const key = createHash("sha256").update(ip).digest("hex");
      const current = attempts.get(key) || { count: 0, expires: now + 10 * 60_000 };
      if (++current.count > 5 || attempts.size > 2000) throw new EnquiryError("rate_limited", 429);
      attempts.set(key, current);
    }

    const enquiry = await parseEnquiry(await boundedFormData(request));
    const verified = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: process.env.TURNSTILE_SECRET_KEY, response: enquiry.token }),
      signal: AbortSignal.timeout(8000),
    });
    if (!verified.ok) throw new EnquiryError("unavailable", 503);
    const result = await verified.json();
    if (!result.success || result.hostname !== new URL(expected).hostname || result.action !== "enquiry") throw new EnquiryError("verification_failed", 400);

    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT), secure: Number(process.env.SMTP_PORT) === 465,
      requireTLS: Number(process.env.SMTP_PORT) === 587,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
      connectionTimeout: 8000, greetingTimeout: 8000, socketTimeout: 12000,
      disableFileAccess: true, disableUrlAccess: true,
    });
    const fullName = `${enquiry.firstName} ${enquiry.lastName}`;
    try {
      const info = await transport.sendMail({
        from: process.env.MAIL_FROM, to: process.env.MAIL_TO, replyTo: enquiry.email,
        subject: `[ALTINDIS] ${enquiry.kind === "cv" ? "Candidature" : "Contact"} — ${fullName}`,
        text: [`Nom : ${fullName}`, `Email : ${enquiry.email}`, `Téléphone : ${enquiry.phone || "—"}`, `LinkedIn : ${enquiry.linkedin || "—"}`, "", enquiry.message].join("\n"),
        attachments: enquiry.attachment ? [{ filename: "CV.pdf", content: enquiry.attachment, contentType: "application/pdf" }] : [],
      });
      if (!info.accepted?.length || info.rejected?.length) throw new EnquiryError("delivery_failed", 502);
    } finally { transport.close(); }
    return response({ ok: true });
  } catch (error) {
    // Never log applicant details, CVs, message bodies or SMTP credentials.
    if (error instanceof EnquiryError) return response({ error: error.code }, error.status);
    console.error("Enquiry delivery failed", error instanceof Error ? error.name : "UnknownError");
    return response({ error: "delivery_failed" }, 502);
  }
}
