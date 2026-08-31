# Prompt à coller dans Claude Code

Copie ce bloc dans Claude Code, à la racine du projet, avec le dossier de handoff présent (`design_handoff_landing/`).

---

Je veux implémenter une landing page « coming soon » pour Bazar Nakà, un service de courses du quotidien avec livraison qui lance à Toamasina (Madagascar).

Lis d'abord `design_handoff_landing/README.md` en entier, puis regarde les captures dans `design_handoff_landing/screenshots/`. Le fichier `design_handoff_landing/Bazar Naka Landing.dc.html` contient les trois directions de design en HTML : ce sont des **références visuelles**, pas du code à copier. Recrée le design dans ce projet en suivant ses conventions existantes.

Implémente **la direction 1a** (`screenshots/1a-desktop.png` et `screenshots/1a-mobile.png`) : un splash plein écran en dégradé, avec logo, titre, sous-titre, formulaire email de waitlist et pied de page. Ignore 1b et 1c pour le moment.

Contraintes :
1. Page unique, plein écran (`min-height:100dvh`), aucune navigation, aucun scroll sur desktop.
2. Respecte au pixel près les couleurs, tailles de police, graisses et espacements listés dans la section « Design Tokens » et « Screen : Landing 1a » du README.
3. Polices : Outfit (300/400/500/600/800) et DM Mono (400/500) via Google Fonts, avec préchargement et `display=swap`.
4. Le logo astérisque est à générer en CSS selon la formule décrite dans la section « Assets » du README (8 pétales pivotés de 45°). Fais-en un composant réutilisable avec des props `size` et `color`.
5. Textes en français, **verbatim** depuis la section « Contenu de référence » — ne les réécris pas.
6. Formulaire : validation email côté client, états `idle / loading / success / error` avec les messages exacts du README. Branche l'envoi sur une route API `POST /api/waitlist` qui stocke l'email ; laisse l'intégration du fournisseur (Brevo / Resend / Supabase) derrière une variable d'environnement et un TODO clair.
7. Accessibilité : label associé à l'input, focus ring visible, contrastes AA, `aria-hidden` sur le filigrane typographique décoratif, `aria-live="polite"` sur le message de confirmation.
8. Responsive : bascule sur le layout mobile décrit dans le README sous 768 px. Vérifie à 390, 768, 1280 et 1920 px de large.
9. Ajoute les balises meta / Open Graph indiquées dans la section « Assets » du README.
10. Respecte `prefers-reduced-motion` si tu ajoutes l'animation d'entrée.

Avant de coder, dis-moi en quelques lignes la structure de fichiers que tu vas créer et attends ma validation. Ensuite implémente, puis lance le projet et vérifie le rendu aux quatre largeurs.

---

## Variantes de ce prompt
- Pour la direction 1b (split photo) : remplace le point sur la direction par « Implémente la direction 1b (`screenshots/1b-desktop.png`) » et copie `assets/rider3.png` dans le dossier public du projet. Précise `object-position:45% 6%` sur la photo : sans ça le visage du coursier est coupé.
- Pour la direction 1c (éditorial crème) : « Implémente la direction 1c (`screenshots/1c-desktop.png`) ». Pas d'image nécessaire, uniquement le logo CSS.
