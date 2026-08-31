"use client";

import { useId, useState, type FormEvent } from "react";

import { isValidEmail } from "@/lib/email";

type Status = "idle" | "loading" | "success" | "error";

/** Copies verbatim — design_handoff_landing/README.md. */
const HELP_TEXT = "Un seul email, le jour du lancement. Rien d'autre.";
const SUCCESS_TEXT = "Merci — on vous écrit dès l'ouverture à Toamasina.";
const INVALID_EMAIL_TEXT = "Entrez une adresse email valide.";
/** Non spécifié par le handoff : cas d'échec réseau / serveur. */
const NETWORK_ERROR_TEXT = "Envoi impossible pour le moment. Réessayez.";

export default function WaitlistForm() {
  const inputId = useId();
  const statusId = useId();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isLoading) return;

    if (!isValidEmail(email)) {
      setStatus("error");
      setErrorMessage(INVALID_EMAIL_TEXT);
      return;
    }

    setStatus("loading");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;

        setStatus("error");
        setErrorMessage(
          body?.error === "invalid_email"
            ? INVALID_EMAIL_TEXT
            : NETWORK_ERROR_TEXT,
        );
        return;
      }

      setStatus("success");
      setErrorMessage(null);
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMessage(NETWORK_ERROR_TEXT);
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-[10px] md:max-w-[clamp(540px,30vw,620px)] md:gap-[12px]"
    >
      <div className="flex flex-col gap-[10px] md:flex-row">
        <label htmlFor={inputId} className="sr-only">
          Adresse email
        </label>

        <input
          id={inputId}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Entrez votre email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status !== "idle") {
              setStatus("idle");
              setErrorMessage(null);
            }
          }}
          aria-invalid={isError}
          aria-describedby={statusId}
          className="w-full rounded-full border-none bg-white/95 px-[18px] py-[16px] text-[15px] text-ink outline-none placeholder:text-ink/65 focus-visible:shadow-[0_0_0_3px_rgba(255,233,181,0.6)] md:flex-1 md:px-[clamp(20px,1.3vw,24px)] md:py-[clamp(17px,1.15vw,20px)] md:text-[clamp(16px,1.05vw,18px)] md:shadow-input md:focus-visible:shadow-[0_0_0_3px_rgba(255,233,181,0.6),0_2px_14px_rgba(0,0,0,0.10)]"
        />

        <button
          type="submit"
          disabled={isLoading || isSuccess}
          className="w-full cursor-pointer rounded-full border-none bg-ink py-[16px] text-[15px] font-semibold whitespace-nowrap text-cream transition-colors duration-150 hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream disabled:cursor-default disabled:opacity-60 md:w-auto md:px-[clamp(30px,2vw,38px)] md:py-[clamp(17px,1.15vw,20px)] md:text-[clamp(15px,1vw,17px)]"
        >
          {isLoading ? "Envoi…" : "Rester connecté"}
        </button>
      </div>

      <p
        id={statusId}
        aria-live="polite"
        className={
          isSuccess
            ? "text-[14px] font-normal text-cream"
            : isError
              ? "text-[13.5px] font-normal text-cream"
              : "text-[13.5px] font-normal text-white/72"
        }
      >
        {isSuccess ? SUCCESS_TEXT : isError ? errorMessage : HELP_TEXT}
      </p>
    </form>
  );
}
