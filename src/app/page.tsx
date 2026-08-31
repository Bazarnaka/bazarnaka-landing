import Image from "next/image";

import NakaMark from "@/components/NakaMark";
import WaitlistForm from "@/components/WaitlistForm";

/**
 * Logotype décoratif en contour, avec l'astérisque en fin de « Nakà ».
 * Le placement est fourni par l'appelant : absolu à droite en desktop, dans le
 * flux entre le hero et le footer en mobile. C'est la seule façon fiable de
 * garantir l'absence de chevauchement, la hauteur du hero variant avec la
 * largeur (3 lignes de H1 en mobile contre 2 à 3 en desktop).
 */
function Wordmark({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={
        "pointer-events-none flex flex-col items-end font-extrabold tracking-[-0.04em] text-transparent " +
        className
      }
    >
      {/* Chaque ligne est balayée séparément ; l'astérisque est HORS du span
          clippé, sinon le balayage le révélerait au lieu de le laisser
          apparaître en dernier. pr-[0.05em] évite que le contour du dernier
          glyphe soit coupé net par le clip-path en fin de course. */}
      <span className="motion-write block pr-[0.05em] leading-[0.82] [animation-delay:500ms]">
        Bazar
      </span>
      <span className="flex items-center gap-[0.05em] leading-[0.82]">
        <span className="motion-write block pr-[0.05em] [animation-delay:1050ms]">
          Nakà
        </span>
        <NakaMark
          size="0.60em"
          color="rgb(255 255 255 / 0.30)"
          className="motion-mark [animation-delay:1750ms]"
        />
      </span>
    </div>
  );
}

export default function LandingPage() {
  return (
    <main className="bg-splash md:bg-splash-wide relative flex min-h-[100dvh] flex-col px-[26px] py-[30px] md:px-[clamp(56px,3.6vw,76px)] md:py-[clamp(44px,3.4vw,56px)]">
      {/* Photo du coursier (deck p.18, 1473×1068) — couche de fond collée au
          bord DROIT DU VIEWPORT, volontairement hors du conteneur borné à
          1440px : sinon elle s'arrête à la gouttière et laisse une bande de
          dégradé nu sur la droite des grands écrans. Fondue vers la gauche pour
          que la colonne de texte reste sur dégradé pur — le crème #FFE9B5 y est
          déjà à la limite du contraste. Desktop seulement : en mobile elle
          passerait sous tout le texte.
          `mix-blend-multiply` et non une simple opacité : en fusion normale la
          photo se mélange vers le blanc et ÉCLAIRCIT le coin jaune du dégradé,
          déjà le point le plus lumineux de la page. En multiply elle assombrit
          et sature — luminance de la moitié droite 0,296 → 0,257, contraste des
          contacts 1,98 → 2,44:1. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] overflow-hidden md:block"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 38%)",
          maskImage: "linear-gradient(to right, transparent 0%, #000 38%)",
        }}
      >
        <Image
          src="/rider-scooter.jpg"
          alt=""
          fill
          sizes="46vw"
          loading="eager"
          className="object-cover object-[62%_45%] opacity-[0.35] mix-blend-multiply"
        />
      </div>

      {/* Desktop : le logotype passe DERRIÈRE le texte, décalé du bord droit
          pour ne plus s'empiler sur le logo imprimé de la caisse. Deux régimes
          de taille, parce qu'un clamp en vw est linéaire et ne peut pas être à
          la fois généreux à 1800px et sûr à 1120px : sous xl, le H1 tient « Les
          courses du quotidien, » sur UNE ligne et court jusqu'à ~670px ; à
          partir de xl il se casse en deux et libère la place. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block">
        <Wordmark className="absolute top-1/2 right-[clamp(56px,3.6vw,76px)] -translate-y-1/2 text-[clamp(100px,9vw,115px)] [-webkit-text-stroke:clamp(2px,0.17vw,3px)_rgb(255_255_255/0.30)] xl:right-[clamp(90px,9vw,180px)] xl:text-[clamp(150px,15vw,290px)]" />
      </div>

      <header className="relative z-10 flex items-center gap-[9px] md:gap-[12px]">
        <NakaMark size={22} color="#FFFFFF" className="md:hidden" />
        <NakaMark size={26} color="#FFFFFF" className="hidden md:block" />
        <span className="text-[16px] font-medium text-white md:text-[19px] md:tracking-[0.01em]">
          Bazar Nakà
        </span>
      </header>

      <section className="motion-rise relative z-10 my-auto flex flex-col gap-[18px] py-[8px] md:max-w-[clamp(660px,44vw,820px)] md:gap-[clamp(26px,2.2vw,34px)]">
        <p className="font-mono text-[10.5px] leading-none font-medium tracking-[0.2em] text-cream uppercase md:text-[12px] md:tracking-[0.22em]">
          Nous préparons quelque chose
        </p>

        <h1 className="m-0 text-[clamp(38px,5.2vw,78px)] leading-[1.05] font-semibold tracking-[-0.02em] text-cream [text-wrap:pretty] md:leading-[1.02] md:tracking-[-0.025em]">
          Les courses du quotidien,{" "}
          <br className="hidden md:inline" />
          à portée de main.
        </h1>

        {/* Deux copies distinctes : le handoff raccourcit le paragraphe en mobile. */}
        <p className="m-0 text-[16px] leading-[1.45] font-light text-white/92 md:hidden">
          Produits, paiement et livraison réunis. Premier lancement à Toamasina.
        </p>
        <p className="m-0 hidden max-w-[clamp(520px,34vw,620px)] text-[clamp(21px,1.25vw,23px)] leading-[1.45] font-light text-white/92 md:block">
          Une plateforme locale qui centralise produits, paiement et livraison.
          Premier lancement à Toamasina.
        </p>

        <WaitlistForm />
      </section>

      {/* Mobile : dans le flux, entre le hero et le footer. Le `my-auto` du
          hero absorbe l'espace libre, ce qui pousse le logotype juste au-dessus
          du footer — il ne peut plus croiser le titre, quelle que soit la
          hauteur d'écran. 17vw ≈ 66px sur 390 : la ligne la plus large
          (« Nakà » + astérisque, ≈2.89em) fait 191px pour 338px disponibles. */}
      <Wordmark className="mb-[30px] text-[17vw] [-webkit-text-stroke:2px_rgb(255_255_255/0.28)] md:hidden" />

      {/* Footer = bloc contact de la slide 18 du deck (copie verbatim).
          Hors du conteneur max-w-[1440px] et donc pleine largeur : la baseline
          se cale sur la marge gauche de la page, les contacts sur la marge
          droite. Dans le conteneur, ils s'arrêtaient à la gouttière — jusqu'à
          180px avant le bord de l'écran sur un grand moniteur.
          Remplace « Toamasina · 2026 » : l'information de lancement est déjà
          portée par le paragraphe du hero, elle n'avait pas à être répétée.
          www.bazarnaka.mg n'y figure pas : c'est l'URL de la page elle-même. */}
      <footer className="relative z-10 flex flex-col gap-[20px] md:flex-row md:items-end md:justify-between md:gap-[48px]">
        <p className="m-0 max-w-[300px] text-[17px] leading-[1.3] font-normal text-cream/90 md:max-w-none md:text-[clamp(17px,1.15vw,20px)]">
          Construisons le prochain réflexe du quotidien à Madagascar.
        </p>

        <a
          href="mailto:contact@bazarnaka.mg"
          className="font-mono text-[11.5px] font-normal text-white/80 transition-colors duration-150 hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream md:text-[13px]"
        >
          contact@bazarnaka.mg
        </a>
      </footer>

    </main>
  );
}
