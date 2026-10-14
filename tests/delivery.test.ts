import { test } from "node:test";
import assert from "node:assert/strict";
import nodemailer from "nodemailer";
import { POST } from "../src/app/api/enquiry/route";

test("delivery endpoint fails safely and only confirms accepted mail", async t => {
  const keys = ["SITE_URL", "SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASSWORD", "MAIL_FROM", "MAIL_TO", "TURNSTILE_SITE_KEY", "TURNSTILE_SECRET_KEY"];
  const previous = Object.fromEntries(keys.map(key => [key, process.env[key]]));
  for (const key of keys) delete process.env[key];
  t.after(() => { for (const key of keys) { if (previous[key] === undefined) delete process.env[key]; else process.env[key] = previous[key]; } });
  function request(origin = "http://localhost:3000") {
    const body = new FormData();
    for (const [key, value] of Object.entries({ kind: "contact", firstName: "Test", lastName: "User", email: "test@example.com", message: "Test only", turnstileToken: "mock-token" })) body.set(key, value);
    return new Request("http://localhost:3000/api/enquiry", { method: "POST", headers: { origin }, body });
  }
  assert.equal((await POST(request("https://other.test"))).status, 403);
  assert.equal((await POST(request())).status, 503);
  Object.assign(process.env, { SMTP_HOST: "smtp.example.test", SMTP_PORT: "465", SMTP_USER: "test", SMTP_PASSWORD: "test-only", MAIL_FROM: "forms@example.test", MAIL_TO: "team@example.test", TURNSTILE_SITE_KEY: "test", TURNSTILE_SECRET_KEY: "test" });
  let deliveries = 0;
  let rejectMail = false;
  let captchaValid = false;
  t.mock.method(globalThis, "fetch", async () => Response.json({ success: captchaValid, hostname: "localhost", action: "enquiry" }));
  t.mock.method(nodemailer, "createTransport", () => ({
    sendMail: async () => { deliveries++; return { accepted: rejectMail ? [] : ["team@example.test"], rejected: rejectMail ? ["team@example.test"] : [] }; }, close() {},
  }) as never);
  assert.equal((await POST(request())).status, 400); assert.equal(deliveries, 0);
  captchaValid = true;
  const success = await POST(request()); assert.equal(success.status, 200); assert.deepEqual(await success.json(), { ok: true });
  rejectMail = true;
  const failure = await POST(request()); assert.equal(failure.status, 502); assert.equal((await failure.json()).error, "delivery_failed");
  assert.equal(deliveries, 2);
});
