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

// TODO(waitlist): brancher Brevo.
// POST https://api.brevo.com/v3/contacts avec l'en-tête `api-key: BREVO_API_KEY`,
// body { email, listIds: [Number(BREVO_LIST_ID)], updateEnabled: true }.
// Traiter le code 400 `duplicate_parameter` comme un succès (email déjà inscrit).
async function saveToBrevo(_entry: WaitlistEntry): Promise<void> {
  throw new Error(
    "WAITLIST_PROVIDER=brevo : intégration non implémentée (voir le TODO dans src/lib/waitlist-store.ts)",
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
