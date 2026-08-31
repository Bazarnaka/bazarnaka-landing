import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

export type WaitlistEntry = {
  email: string;
  createdAt: string;
  source: string;
};

/**
 * Fournisseur de stockage de la waitlist, choisi par la variable
 * d'environnement `WAITLIST_PROVIDER` (voir .env.example).
 *
 * `file` est le défaut : il écrit dans .data/waitlist.jsonl et permet de
 * développer sans compte tiers. Il n'est PAS destiné à la production
 * (le système de fichiers est éphémère sur Vercel & co).
 */
export type WaitlistProvider = "file" | "brevo" | "resend" | "supabase";

const DEFAULT_PROVIDER: WaitlistProvider = "file";
const FILE_PATH = path.join(process.cwd(), ".data", "waitlist.jsonl");

export function getProvider(): WaitlistProvider {
  return (process.env.WAITLIST_PROVIDER as WaitlistProvider) || DEFAULT_PROVIDER;
}

export async function saveSubscriber(entry: WaitlistEntry): Promise<void> {
  const provider = getProvider();

  switch (provider) {
    case "brevo":
      return saveToBrevo(entry);
    case "resend":
      return saveToResend(entry);
    case "supabase":
      return saveToSupabase(entry);
    case "file":
      return saveToFile(entry);
    default:
      throw new Error(`WAITLIST_PROVIDER inconnu : « ${provider} »`);
  }
}

/** Stockage local, pour le développement uniquement. */
async function saveToFile(entry: WaitlistEntry): Promise<void> {
  await mkdir(path.dirname(FILE_PATH), { recursive: true });
  await appendFile(FILE_PATH, `${JSON.stringify(entry)}\n`, "utf8");
}

/** Lit une variable d'environnement obligatoire, avec un message actionnable. */
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `${name} est absente. Renseignez-la dans les variables d'environnement (voir .env.example).`,
    );
  }
  return value;
}

/**
 * Ajoute le contact à une liste Brevo.
 *
 * Aucun attribut personnalisé n'est envoyé : avec `updateEnabled`, Brevo rejette
 * un attribut qui n'a pas été déclaré au préalable dans le compte. La date
 * d'inscription est de toute façon enregistrée par Brevo lui-même.
 */
async function saveToBrevo(entry: WaitlistEntry): Promise<void> {
  const apiKey = requireEnv("BREVO_API_KEY");
  const listId = Number(requireEnv("BREVO_LIST_ID"));

  if (!Number.isInteger(listId)) {
    throw new Error("BREVO_LIST_ID doit être l'identifiant numérique de la liste.");
  }

  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      email: entry.email,
      listIds: [listId],
      updateEnabled: true,
    }),
    // Sans délai maximal, un appel qui traîne bloquerait la fonction serverless
    // jusqu'à son propre timeout, et l'utilisateur resterait sur « Envoi… ».
    signal: AbortSignal.timeout(8000),
  });

  if (response.ok) return;

  const body = (await response.json().catch(() => null)) as {
    code?: string;
    message?: string;
  } | null;

  // Un email déjà inscrit n'est pas une erreur pour l'utilisateur : il a bien
  // manifesté son intérêt, et il est déjà dans la liste.
  if (response.status === 400 && body?.code === "duplicate_parameter") return;

  throw new Error(
    `Brevo a répondu ${response.status} : ${body?.code ?? "erreur inconnue"} — ${body?.message ?? ""}`.trim(),
  );
}

// TODO(waitlist): brancher Resend.
// POST https://api.resend.com/audiences/{RESEND_AUDIENCE_ID}/contacts
// avec `Authorization: Bearer RESEND_API_KEY`, body { email, unsubscribed: false }.
async function saveToResend(_entry: WaitlistEntry): Promise<void> {
  throw new Error(
    "WAITLIST_PROVIDER=resend : intégration non implémentée (voir le TODO dans src/lib/waitlist-store.ts)",
  );
}

// TODO(waitlist): brancher Supabase.
// Table `waitlist` (email text primary key, created_at timestamptz, source text).
// Insérer via @supabase/supabase-js avec SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
// et `upsert({ onConflict: 'email', ignoreDuplicates: true })`.
async function saveToSupabase(_entry: WaitlistEntry): Promise<void> {
  throw new Error(
    "WAITLIST_PROVIDER=supabase : intégration non implémentée (voir le TODO dans src/lib/waitlist-store.ts)",
  );
}
