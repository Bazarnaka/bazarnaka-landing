/**
 * Validation email partagée client / serveur.
 * Volontairement permissive : on filtre les fautes de frappe évidentes, la
 * vérification réelle se fait à l'envoi du premier message.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function isValidEmail(value: string): boolean {
  const email = normalizeEmail(value);
  return email.length <= 254 && EMAIL_PATTERN.test(email);
}
