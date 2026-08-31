import type { Metadata, Viewport } from "next";
import { DM_Mono, Outfit } from "next/font/google";

import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "800"],
  display: "swap",
  preload: true,
  variable: "--font-outfit",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: true,
  variable: "--font-dm-mono",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bazarnaka.mg";

const title = "Bazar Nakà — bientôt à Toamasina";
const description =
  "Les courses du quotidien, à portée de main. Produits, paiement et livraison réunis.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Bazar Nakà",
  keywords: ["Bazar Nakà", "Toamasina", "Madagascar", "courses", "livraison"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_MG",
    url: "/",
    siteName: "Bazar Nakà",
    title,
    description,
    // Image générée par src/app/opengraph-image.tsx (1200×630, reprise du splash 1a).
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

/**
 * Données structurées : sans elles, un moteur ne peut relier le nom de la
 * marque, son email et sa zone de service. L'échappement de « < » est celui
 * recommandé par la doc Next (guides/json-ld) : il empêche une injection de
 * balise si un champ devient dynamique un jour.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Bazar Nakà",
  url: siteUrl,
  logo: new URL("/apple-icon", siteUrl).toString(),
  email: "contact@bazarnaka.mg",
  description,
  areaServed: {
    "@type": "City",
    name: "Toamasina",
    address: { "@type": "PostalAddress", addressCountry: "MG" },
  },
};

export const viewport: Viewport = {
  themeColor: "#D95441",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${outfit.variable} ${dmMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
