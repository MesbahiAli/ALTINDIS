import { test } from "node:test";
import assert from "node:assert/strict";
import { languageRoutes, pageMetadata, siteUrl } from "../src/lib/site";
import sitemap from "../src/app/sitemap";
import robots from "../src/app/robots";

test("production SEO uses the configured origin and matches both languages", t => {
  const original = { SITE_URL: process.env.SITE_URL, SITE_STAGE: process.env.SITE_STAGE };
  t.after(() => { for (const [key, value] of Object.entries(original)) { if (value === undefined) delete process.env[key]; else process.env[key] = value; } });
  process.env.SITE_URL = "https://example.test"; process.env.SITE_STAGE = "production";
  const entries = sitemap(); assert.equal(entries.length, Object.keys(languageRoutes).length * 2);
  for (const [fr, en] of Object.entries(languageRoutes)) {
    assert.equal(pageMetadata(fr, "fr", "Title", "Description").alternates?.canonical, fr);
    const english = pageMetadata(en, "en", "Title", "Description");
    assert.equal(english.alternates?.canonical, en); assert.equal(english.alternates?.languages?.fr, fr);
  }
  assert.equal(robots().sitemap, "https://example.test/sitemap.xml");
  assert.ok(!entries.some(entry => entry.url.includes("chatbot")));
  process.env.SITE_STAGE = "preview"; assert.deepEqual(robots().rules, { userAgent: "*", disallow: "/" });
  process.env.SITE_URL = "http://bad.test"; assert.throws(siteUrl);
  delete process.env.SITE_URL; process.env.SITE_STAGE = "production"; assert.throws(siteUrl);
});
