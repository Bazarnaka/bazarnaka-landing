# Handoff : Landing page « coming soon » — Bazar Nakà

## Overview
Landing page publique unique, en français, dont le seul objectif est d'annoncer que Bazar Nakà se prépare et de collecter des emails pour la waitlist. Premier lancement à Toamasina (Madagascar), ouverture 2026. Aucune navigation, aucune autre page.

## About the Design Files
Les fichiers de ce paquet sont des **références de design réalisées en HTML** : des prototypes qui montrent l'apparence et le comportement voulus, **pas du code de production à copier tel quel**.
Le travail consiste à **recréer ces designs dans l'environnement du projet cible** (Next.js / React / Astro / autre) en suivant ses conventions et ses librairies. S'il n'existe pas encore de codebase, choisir la stack la plus adaptée à une landing page statique avec formulaire (recommandation : Next.js App Router + Tailwind, ou Astro + Tailwind) et implémenter les designs dedans.

## Fidelity
**High-fidelity.** Couleurs, typographie, espacements et copies sont définitifs. Reproduire au pixel près, en réutilisant les composants existants du codebase pour l'input et le bouton s'ils existent.

## Direction retenue
Trois directions ont été explorées. **1a est la direction recommandée** (la plus simple, une seule action). 1b et 1c sont documentées comme alternatives — n'en implémenter qu'une.

| Réf | Nom | Screenshot |
|---|---|---|
| 1a | Splash dégradé plein écran (recommandé) | screenshots/1a-desktop.png, screenshots/1a-mobile.png |
| 1b | Split photo + 3 points de service | screenshots/1b-desktop.png |
| 1c | Éditorial crème typographique | screenshots/1c-desktop.png |

---

## Screen : Landing 1a (recommandé)

**Purpose** — l'utilisateur comprend en 3 secondes ce qui se prépare et laisse son email.

### Layout desktop (référence 1120 × 700, à rendre en plein écran : `min-height: 100vh`)
Une seule section, `display:flex; flex-direction:column; justify-content:space-between`, padding `44px 56px`, `overflow:hidden`, `position:relative`.
Fond : `linear-gradient(118deg, #8E3B57 0%, #C9455A 22%, #D95441 46%, #EE8140 72%, #F9C74A 100%)`.

Trois blocs empilés :
1. **Header** — logo (marque astérisque, 26 px, blanc) + wordmark « Bazar Nakà », `flex`, `gap:12px`. Wordmark : Outfit 500, 19 px, `#fff`, `letter-spacing:.01em`.
2. **Bloc central** — `max-width:660px`, `flex-direction:column`, `gap:26px` :
   - Eyebrow : « NOUS PRÉPARONS QUELQUE CHOSE » — DM Mono 500, 12 px, `#FFE9B5`, `letter-spacing:.22em`, `text-transform:uppercase`.
   - H1 : « Les courses du quotidien,<br>à portée de main. » — Outfit 600, 66 px, `line-height:1.02`, `letter-spacing:-.025em`, couleur `#FFE9B5`, `text-wrap:pretty`.
   - Paragraphe (`max-width:520px`) : « Une plateforme locale qui centralise produits, paiement et livraison. Premier lancement à Toamasina. » — Outfit 300, 21 px, `line-height:1.45`, `rgba(255,255,255,.92)`.
   - **Formulaire** (`max-width:540px`, `gap:12px`) : rangée `flex`, `gap:10px`.
     - Input email : `flex:1`, padding `17px 20px`, `border:none`, `border-radius:999px`, fond `rgba(255,255,255,.95)`, texte `#1C1B1A` 16 px, `box-shadow:0 2px 14px rgba(0,0,0,.10)`, placeholder « votre@email.mg », `outline:none` (prévoir un focus ring accessible : `box-shadow:0 0 0 3px rgba(255,233,181,.6)`).
     - Bouton : « Rester connecté » — padding `17px 30px`, `border-radius:999px`, fond `#1C1B1A`, texte `#FFE9B5` Outfit 600 15 px, `cursor:pointer`, hover fond `#000`.
     - Sous le formulaire, état par défaut : « Un seul email, le jour du lancement. Rien d'autre. » — Outfit 400, 13.5 px, `rgba(255,255,255,.72)`.
     - Après soumission valide, ce texte est remplacé par : « Merci — on vous écrit dès l'ouverture à Toamasina. » — Outfit 400, 14 px, `#FFE9B5`.
3. **Footer** — `flex`, `justify-content:space-between`, DM Mono 400, 13 px, `rgba(255,255,255,.8)` : « Toamasina · 2026 » à gauche, « www.bazarnaka.mg » à droite.

**Filigrane décoratif** — mot « Bazar / Nakà » sur deux lignes, Outfit 800, 210 px, `line-height:.84`, `letter-spacing:-.04em`, couleur `rgba(255,255,255,.13)`, positionné `right:-90px; top:96px`, `pointer-events:none`, `aria-hidden`. Il passe DERRIÈRE le texte : c'est voulu.

### Layout mobile (référence 390 × 700)
Même structure, padding `30px 26px`, gradient `linear-gradient(155deg, …)` (mêmes stops).
H1 38 px / `line-height:1.05`; paragraphe 16 px (texte raccourci : « Produits, paiement et livraison réunis. Premier lancement à Toamasina. »); eyebrow 10.5 px; formulaire empilé (input puis bouton pleine largeur, padding 16 px); footer « Toamasina · 2026 » seul. Filigrane : 130 px, `right:-40px; top:120px`, opacité `.10`.
Breakpoint : passer en layout mobile sous 768 px.

## Alternative 1b (split photo)
Grille `430px 1fr`, hauteur plein écran.
- Colonne gauche : photo du coursier (`assets/rider3.png`) en `object-fit:cover; object-position:45% 6%` (important : ce cadrage garde le visage), overlay `linear-gradient(200deg, rgba(217,84,65,.30), rgba(142,59,87,.55))`, logo + wordmark blancs en haut à gauche (34/32 px), et en bas : « Le bon moment pour transformer la débrouille en service structuré. » Outfit 400, 20 px, `#FFE9B5`.
- Colonne droite : fond `#FFFBF2`, padding `52px 56px`, `gap:34px`. Eyebrow « BIENTÔT À TOAMASINA » (DM Mono 11.5 px, `#D75448`, précédé d'un trait 26×1 px). H1 « Ce dont vous avez besoin, / portée de main. » Outfit 600 52 px, `#1C1B1A`, la 2ᵉ ligne en `#D75448`. Paragraphe Outfit 300 19 px `#4A4441`. Trois entrées numérotées 01/02/03 (numéro DM Mono 12 px `#EE8140`; titre Outfit 600 17 px; texte Outfit 300 15 px `#6B635F`) : « Une application », « Un paiement », « Une livraison ». Formulaire en pill unique : conteneur `border:1.5px solid #E4D9C6; border-radius:999px; padding:5px; background:#fff`, input transparent, bouton `#D75448` (hover `#B93E38`) « Rejoindre la liste ». Confirmation : « C'est noté. Vous serez prévenu en premier. » Ligne de contact en DM Mono 12.5 px `#9A918C` : contact@bazarnaka.mg / +261 38 11 999 39.

## Alternative 1c (éditorial crème)
Fond `#FFFBF2`. Barre supérieure (padding `30px 48px`, `border-bottom:1px solid #EFE3CE`) : logo `#D75448` 24 px + wordmark `#1C1B1A`; à droite DM Mono 13 px : « Toamasina, Madagascar » (`#9A918C`) et « Ouverture 2026 » (`#D75448`).
Corps en grille `1fr 330px`. Gauche (padding 48 px) : eyebrow « EN PRÉPARATION », H1 « Un seul parcours / pour les courses / du quotidien. » Outfit 600 62 px `letter-spacing:-.03em` (3ᵉ ligne `#D75448`), paragraphe Outfit 300 18 px. Formulaire minimal : label DM Mono 11 px uppercase « VOTRE EMAIL », input sans bordure avec `border-bottom:1.5px solid #1C1B1A`, 17 px; bouton « M'avertir » `border-radius:6px`, fond `#1C1B1A`, texte `#FFE9B5`, hover fond `#D75448`. Mention « Un projet porté par Restaurant Cibus · Tamatave ». Droite : panneau `linear-gradient(170deg,#D95441,#EE8140 55%,#F9C74A)` avec la marque astérisque blanche 200 px centrée (`opacity:.9`) et, en bas, « 85% des foyers interrogés font leurs courses au moins une fois par semaine. » Outfit 500 15 px `#FFE9B5`.

---

## Interactions & Behavior
- **Soumission** : valider le format email côté client (`type="email"` + regex simple). Si vide ou invalide → message d'erreur sous le champ, Outfit 400 13.5 px, couleur `#FFE9B5` sur fond dégradé / `#B93E38` sur fond crème : « Entrez une adresse email valide. »
- **Succès** : remplacer la ligne d'aide par le message de confirmation, désactiver le bouton (`opacity:.6`) et vider le champ. Pas de redirection, pas de modale.
- **Envoi réel** : brancher sur le service email choisi (Brevo, Mailchimp, Resend ou une table Supabase/Airtable). Le prototype ne fait qu'un état local.
- **Loading** : libellé du bouton → « Envoi… », bouton désactivé.
- **Hover** : bouton sombre → `#000`; bouton rouge → `#B93E38`; transition `background 150ms ease`.
- **Focus** : anneau visible sur input et bouton (accessibilité clavier obligatoire).
- **Responsive** : ≥768 px layout desktop, <768 px layout mobile décrit ci-dessus. Le H1 doit rester lisible : `clamp(38px, 5.2vw, 66px)`.
- **Motion** (optionnel, discret) : fade-in + translateY(12px) du bloc central, 500 ms `cubic-bezier(.2,.8,.2,1)`, au chargement. Respecter `prefers-reduced-motion`.

## State Management
- `email: string`
- `status: 'idle' | 'loading' | 'success' | 'error'`
- `errorMessage: string | null`
Transitions : saisie → `idle`; submit → `loading`; réponse OK → `success`; échec réseau ou validation → `error`.

## Design Tokens
Couleurs
- Rouge marque `#D75448` (hover `#B93E38`)
- Orange `#EE8140`
- Jaune `#F9C74A`
- Prune `#8E3B57`, rose profond `#C9455A`, rouge dégradé `#D95441`
- Crème texte `#FFE9B5`
- Fond crème clair `#FFFBF2`, bordure crème `#EFE3CE`, bordure input `#E4D9C6`
- Encre `#1C1B1A`, texte secondaire `#4A4441`, tertiaire `#6B635F`, discret `#9A918C`
- Dégradé principal : `linear-gradient(118deg,#8E3B57 0%,#C9455A 22%,#D95441 46%,#EE8140 72%,#F9C74A 100%)`

Typographie — **Outfit** (Google Fonts, 300/400/500/600/800) pour tout le texte, **DM Mono** (400/500) pour les eyebrows, chiffres et mentions techniques.
Échelle : 66 / 52 / 38 / 21 / 19 / 17 / 16 / 15 / 13.5 / 12 / 11 px.
Note : la police exacte du pitch deck n'a pas été fournie ; Outfit en est l'équivalent le plus proche. Si la police d'origine est connue (ex. Gilroy, Poppins), la substituer partout.

Espacements : 5 / 10 / 12 / 14 / 22 / 26 / 34 / 44 / 48 / 56 px.
Radius : 6 px (bouton 1c), 10 px (carte), 999 px (pills).
Ombres : `0 2px 14px rgba(0,0,0,.10)` (input), `0 2px 10px rgba(0,0,0,.07)` (carte).

## Assets
- `assets/rider3.png` (328×645) — photo du coursier Bazar Nakà, extraite du pitch deck (slide « Marché de départ »). Utilisée par 1b. **Demander la photo source en pleine résolution avant la mise en production.**
- `assets/scooter.png` (480×570) — scooter Bazar Nakà devant une boutique, extraite du deck (slide de contact). Non utilisée dans les maquettes, disponible en variante.
- **Logo astérisque** : reconstruit en CSS pur, sans image. 8 pétales identiques ; chaque pétale = rectangle de largeur `0.215 × taille` et hauteur `0.36 × taille`, `border-radius: 0 0 (largeur/2) (largeur/2)` (extrémité intérieure arrondie), rayon intérieur `0.145 × taille`, positionné par `translate(-50%,-50%) rotate(i*45deg) translateY(-(rayonIntérieur + hauteur/2))`. Voir `NakaMark.dc.html` pour l'implémentation exacte. Si un SVG officiel du logo existe, l'utiliser à la place.
- Favicon / OG image : à fournir. Meta à prévoir : titre « Bazar Nakà — bientôt à Toamasina », description « Les courses du quotidien, à portée de main. Produits, paiement et livraison réunis. », OG image 1200×630 reprenant le splash 1a.

## Contenu de référence (verbatim, ne pas réécrire)
- « Les courses du quotidien, à portée de main. »
- « Une plateforme locale qui centralise produits, paiement et livraison. »
- « Premier lancement Toamasina »
- « Ce dont vous avez besoin, portée de main. »
- « Un projet porté par Restaurant Cibus »
- contact@bazarnaka.mg · +261 38 11 999 39 · www.bazarnaka.mg

## Files
- `Bazar Naka Landing.dc.html` — les trois directions (1a, 1b, 1c) dans un seul fichier de design.
- `NakaMark.dc.html` — le logo astérisque en CSS.
- `assets/rider3.png`, `assets/scooter.png` — photos extraites du pitch deck.
- `screenshots/` — captures de référence de chaque direction.
- `PROMPT.md` — prompt prêt à coller dans Claude Code.
