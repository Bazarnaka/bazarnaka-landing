import type { CSSProperties } from "react";

/**
 * Marque astérisque Bazar Nakà, en CSS pur (pas d'image).
 *
 * Géométrie — design_handoff_landing/README.md § « Assets » :
 *   8 pétales identiques, chacun un rectangle de
 *     largeur = 0.215 × taille
 *     hauteur = 0.36  × taille
 *     border-radius: 0 0 (largeur/2) (largeur/2)   → 0.1075 × taille, extrémité
 *                                                    intérieure arrondie
 *   rayon intérieur = 0.145 × taille, d'où le décalage
 *     translateY(-(rayonIntérieur + hauteur/2)) = -0.325 × taille
 *
 * Toutes les longueurs dérivent de `--naka-size` par calc() : une seule source
 * de vérité pour la taille. Les classes sont écrites en littéral (et non
 * interpolées) pour rester détectables par le scanner Tailwind.
 */

const PETAL_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

const PETAL_CLASS =
  "absolute top-1/2 left-1/2 " +
  "h-[calc(var(--naka-size)*0.36)] " +
  "w-[calc(var(--naka-size)*0.215)] " +
  "rounded-b-[calc(var(--naka-size)*0.1075)] " +
  "bg-[var(--naka-color)]";

type NakaMarkProps = {
  /** Côté du carré englobant : nombre = pixels, ou toute longueur CSS
   *  (`0.5em`, `clamp(...)`) pour une taille fluide. */
  size?: number | string;
  /** Couleur des pétales (toute valeur CSS valide). */
  color?: string;
  className?: string;
};

export default function NakaMark({
  size = 48,
  color = "#D75448",
  className,
}: NakaMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={[
        "relative block h-[var(--naka-size)] w-[var(--naka-size)] flex-none",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        {
          "--naka-size": typeof size === "number" ? `${size}px` : size,
          "--naka-color": color,
        } as CSSProperties
      }
    >
      {PETAL_ANGLES.map((angle) => (
        <span
          key={angle}
          className={PETAL_CLASS}
          style={{
            transform: `translate(-50%,-50%) rotate(${angle}deg) translateY(calc(var(--naka-size) * -0.325))`,
          }}
        />
      ))}
    </span>
  );
}
