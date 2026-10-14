import type { MetadataRoute } from "next";
import { languageRoutes, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return Object.entries(languageRoutes).flatMap(([fr, en]) => [fr, en].map(path => ({
    url: new URL(path, base).href,
    alternates: { languages: { fr: new URL(fr, base).href, en: new URL(en, base).href } },
  })));
}
