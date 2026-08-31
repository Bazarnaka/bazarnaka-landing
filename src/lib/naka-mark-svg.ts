/**
 * Géométrie de la marque astérisque, en SVG — pour les contextes où le CSS
 * n'est pas disponible : images Open Graph et icônes générées par satori.
 * Le rendu HTML utilise <NakaMark />, qui applique la même géométrie en CSS.
 * Source des proportions : design_handoff_landing/README.md § « Assets ».
 */
export const PETAL_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

/** Tracé d'un pétale : rectangle à extrémité intérieure arrondie. */
export function petalPath(size: number): string {
  const c = size / 2;
  const w = size * 0.215;
  const l = size * 0.36;
  const inner = size * 0.145;
  const r = w / 2;
  const x0 = c - w / 2;
  const top = c - (inner + l);
  const bottom = c - inner;

  return (
    `M${x0} ${top}H${x0 + w}V${bottom - r}` +
    `A${r} ${r} 0 0 1 ${x0 + w - r} ${bottom}` +
    `H${x0 + r}A${r} ${r} 0 0 1 ${x0} ${bottom - r}Z`
  );
}
