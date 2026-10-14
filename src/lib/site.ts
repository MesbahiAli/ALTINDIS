import type { Metadata } from "next";
import { languageRoutes } from "@/lib/routes";
export { languageRoutes } from "@/lib/routes";

export function isPublicProduction(): boolean {
  return process.env.SITE_STAGE === "production";
}

export function siteUrl(): URL {
  const configured = process.env.SITE_URL;
  if (!configured && isPublicProduction()) {
    throw new Error("Set SITE_URL to the public HTTPS domain before deploying to production.");
  }
  const url = new URL(configured || "http://localhost:3000");
  if (configured && (url.protocol !== "https:" || url.pathname !== "/" || url.search || url.hash || url.username || url.password)) {
    throw new Error("SITE_URL must be an HTTPS origin, without a path, credentials, query or fragment.");
  }
  return url;
}

export function pageMetadata(path: string, language: "fr" | "en", title: string, description: string): Metadata {
  const french = language === "fr" ? path : Object.keys(languageRoutes).find(key => languageRoutes[key] === path)!;
  const base = siteUrl();
  const image = language === "fr" ? "/og" : "/en/og";
  return {
    title, description, metadataBase: base,
    alternates: { canonical: path, languages: { fr: french, en: languageRoutes[french], "x-default": french } },
    openGraph: {
      title: `${title} | ALTINDIS`, description, url: path, siteName: "ALTINDIS", type: "website",
      locale: language === "fr" ? "fr_MA" : "en_GB", alternateLocale: language === "fr" ? "en_GB" : "fr_MA",
      images: [{ url: image, width: 1200, height: 630, alt: "ALTINDIS — Recruitment, Training & Consulting" }],
    },
    twitter: { card: "summary_large_image", title: `${title} | ALTINDIS`, description, images: [image] },
    icons: { icon: "/favicon.svg" },
    robots: !isPublicProduction() || !process.env.SITE_URL ? { index: false, follow: false } : { index: true, follow: true },
  };
}
