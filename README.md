# Bazar Nakà — landing « coming soon »

Page unique, en français, qui annonce le lancement de Bazar Nakà à Toamasina et
collecte les emails de la waitlist. Implémentation de la **direction 1a** du
handoff (`design_handoff_landing/`) : splash plein écran en dégradé.

## Stack

- **Next.js 16** (App Router) + React 19 + TypeScript
- **Tailwind CSS v4** — les tokens du handoff vivent dans `@theme`
  (`src/app/globals.css`), il n'y a pas de fichier de config JS
- **next/font/google** — Outfit (300/400/500/600/800) et DM Mono (400/500),
  auto-hébergées, `display: swap`, préchargées

## Démarrer

```bash
npm install
cp .env.example .env.local
npm run dev            # http://localhost:3000
```

Autres scripts : `npm run build`, `npm start`, `npm run typecheck`.

## Structure

```
src/app/layout.tsx              polices, metadata, Open Graph
src/app/page.tsx                l'écran 1a
src/app/globals.css             tokens @theme + utilitaires (dégradés, animation)
src/app/icon.svg                favicon (marque astérisque)
src/app/opengraph-image.tsx     image OG 1200×630 générée, reprise du splash
src/app/api/waitlist/route.ts   POST /api/waitlist
src/components/NakaMark.tsx     marque astérisque en CSS, props size + color
src/components/WaitlistForm.tsx formulaire, états idle/loading/success/error
src/lib/email.ts                validation partagée client / serveur
src/lib/waitlist-store.ts       stockage, derrière WAITLIST_PROVIDER
```

## Waitlist

`POST /api/waitlist` avec `{ "email": "…" }` :

| Réponse | Cas |
|---|---|
| `201 { ok: true }` | email enregistré |
| `400 { error: "invalid_email" }` | format invalide |
| `400 { error: "invalid_body" }` | corps non JSON |
| `500 { error: "storage_failed" }` | le fournisseur a échoué |

Le fournisseur est choisi par `WAITLIST_PROVIDER` :

- `file` (défaut) — écrit dans `.data/waitlist.jsonl`. **Développement
  uniquement** : le système de fichiers est éphémère sur Vercel & co.
- `brevo` / `resend` / `supabase` — **à implémenter**. Chaque fonction est un
  stub qui lève une erreur explicite, avec en commentaire l'endpoint et les
  variables d'environnement attendues (voir `src/lib/waitlist-store.ts` et
  `.env.example`).

## Avant la mise en production

- [ ] Implémenter un fournisseur réel dans `src/lib/waitlist-store.ts`
- [ ] Fournir le SVG officiel du logo, s'il existe, à la place de `NakaMark`
- [ ] Fournir le visuel Open Graph définitif (déposer `opengraph-image.png`
      dans `src/app/`, il prendra la priorité sur le fichier généré)
- [ ] Trancher les contrastes AA du texte clair sur la partie claire du
      dégradé (voir ci-dessous)

## Contraste

Mesuré au pixel sur le rendu réel (WCAG 2.1 AA). Conformes : wordmark 5.5:1,
H1 3.3:1 (texte large, seuil 3), bouton 14.4:1, placeholder 5.2:1.

En dessous du seuil 4.5:1, avec les valeurs du handoff : eyebrow 3.8:1,
paragraphe 3.5:1, ligne d'aide 2.9:1, footer 3.3:1 — et 1.5:1 pour
`www.bazarnaka.mg`, posé sur l'extrémité jaune du dégradé. Aucune couleur
claire ne peut y passer : il faut soit assombrir le dégradé derrière le texte,
soit passer ce texte en encre foncée. C'est une décision de design, laissée
ouverte.
