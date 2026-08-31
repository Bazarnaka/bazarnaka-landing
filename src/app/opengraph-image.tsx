import { ImageResponse } from "next/og";

import { PETAL_ANGLES, petalPath } from "@/lib/naka-mark-svg";

export const alt = "Bazar Nakà — bientôt à Toamasina";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Image Open Graph 1200×630 : reprise du splash 1a.
 * TODO(brand) : remplacer par le visuel définitif fourni par la marque
 * (déposer un fichier `opengraph-image.png` dans src/app/, il aura la priorité).
 */

/** Récupère un TTF depuis Google Fonts (satori n'accepte pas le woff2). */
async function loadFont(
  family: string,
  weight: number,
): Promise<ArrayBuffer | null> {
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}`;
    const css = await fetch(cssUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1; rv:5.0)" },
    }).then((res) => res.text());

    const url = css.match(/src:\s*url\((https:\/\/[^)]+)\)/)?.[1];
    if (!url) return null;

    return await fetch(url).then((res) => res.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  // La graisse 400 est indispensable : sans elle satori arrondit la baseline
  // à la 600 chargée, et elle sort en gras alors qu'elle est régulière sur le site.
  const [outfit300, outfit400, outfit600, dmMono500] = await Promise.all([
    loadFont("Outfit", 300),
    loadFont("Outfit", 400),
    loadFont("Outfit", 600),
    loadFont("DM+Mono", 500),
  ]);

  const fonts = [
    outfit300 && { name: "Outfit", data: outfit300, weight: 300 as const },
    outfit400 && { name: "Outfit", data: outfit400, weight: 400 as const },
    outfit600 && { name: "Outfit", data: outfit600, weight: 600 as const },
    dmMono500 && { name: "DM Mono", data: dmMono500, weight: 500 as const },
  ].filter(Boolean) as {
    name: string;
    data: ArrayBuffer;
    weight: 300 | 400 | 500 | 600;
  }[];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          fontFamily: "Outfit",
          backgroundImage:
            "linear-gradient(118deg,#8E3B57 0%,#C9455A 22%,#D95441 46%,#EE8140 72%,#F9C74A 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width={38} height={38} viewBox="0 0 38 38" fill="#FFFFFF">
            {PETAL_ANGLES.map((angle) => (
              <path key={angle} d={petalPath(38)} transform={`rotate(${angle} 19 19)`} />
            ))}
          </svg>
          <span style={{ fontSize: 28, fontWeight: 600, color: "#FFFFFF" }}>
            Bazar Nakà
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span
            style={{
              fontFamily: "DM Mono",
              fontSize: 20,
              fontWeight: 500,
              letterSpacing: "0.22em",
              color: "#FFE9B5",
            }}
          >
            NOUS PRÉPARONS QUELQUE CHOSE
          </span>
          <span
            style={{
              fontSize: 82,
              fontWeight: 600,
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              whiteSpace: "pre-wrap",
              color: "#FFE9B5",
            }}
          >
            Les courses du quotidien,{"\n"}à portée de main.
          </span>
          <span
            style={{
              fontSize: 28,
              fontWeight: 300,
              lineHeight: 1.45,
              color: "rgba(255,255,255,0.92)",
            }}
          >
            Produits, paiement et livraison réunis. Premier lancement à
            Toamasina.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 24,
            fontWeight: 400,
            color: "#FFE9B5",
          }}
        >
          <span>Construisons le prochain réflexe du quotidien à Madagascar.</span>
          <span style={{ fontFamily: "DM Mono", fontSize: 21, color: "rgba(255,255,255,0.8)" }}>
            contact@bazarnaka.mg
          </span>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length > 0 ? fonts : undefined },
  );
}
