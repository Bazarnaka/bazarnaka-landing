import { NextResponse } from "next/server";

import { isValidEmail, normalizeEmail } from "@/lib/email";
import { saveSubscriber } from "@/lib/waitlist-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const email =
    typeof payload === "object" &&
    payload !== null &&
    "email" in payload &&
    typeof (payload as { email: unknown }).email === "string"
      ? (payload as { email: string }).email
      : "";

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  try {
    await saveSubscriber({
      email: normalizeEmail(email),
      createdAt: new Date().toISOString(),
      source: "landing-1a",
    });
  } catch (error) {
    console.error("[waitlist] échec de l'enregistrement", error);
    return NextResponse.json({ error: "storage_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
