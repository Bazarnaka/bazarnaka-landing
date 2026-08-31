import { ImageResponse } from "next/og";

import { PETAL_ANGLES, petalPath } from "@/lib/naka-mark-svg";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Icône d'écran d'accueil iOS. Sans elle, Safari capture une vignette de la
 * page — ici un aplat de dégradé illisible. Fond rouge de marque plein : les
 * icônes iOS ne sont pas détourées et sont rognées en « squircle ».
 */
export default function AppleIcon() {
  const mark = 104;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#D75448",
        }}
      >
        <svg width={mark} height={mark} viewBox={`0 0 ${mark} ${mark}`} fill="#FFFFFF">
          {PETAL_ANGLES.map((angle) => (
            <path
              key={angle}
              d={petalPath(mark)}
              transform={`rotate(${angle} ${mark / 2} ${mark / 2})`}
            />
          ))}
        </svg>
      </div>
    ),
    size,
  );
}
