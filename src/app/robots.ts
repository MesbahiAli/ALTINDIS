import type { MetadataRoute } from "next";
import { isPublicProduction, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = siteUrl();
  if (!process.env.SITE_URL || !isPublicProduction()) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/chatbot-preview"] }, sitemap: new URL("/sitemap.xml", base).href };
}
