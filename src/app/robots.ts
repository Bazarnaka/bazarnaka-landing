import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bazarnaka.mg";

/**
 * Les URLs de préversion (tunnel Cloudflare, déploiements de test) ne doivent
 * pas être indexées : elles feraient concurrence au domaine réel et
 * survivraient à la démo dans l'index de Google.
 */
const isProduction = new URL(siteUrl).hostname.endsWith("bazarnaka.mg");

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
    host: siteUrl,
  };
}
