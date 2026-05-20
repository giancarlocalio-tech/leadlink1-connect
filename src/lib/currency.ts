/**
 * Formatta un importo in centesimi come stringa Euro italiana.
 * @param cents - importo in centesimi (es. 974)
 * @returns es. "9,74 €"
 */
export function formatEuroFromCents(cents: number | null | undefined): string {
  const c = cents ?? 0;
  return `${(c / 100).toLocaleString("it-IT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} €`;
}

/** Alias breve. */
export const formatEuro = formatEuroFromCents;

/**
 * Formatta un importo in centesimi come solo numero "X,XX" (senza €).
 */
export function formatEuroValueFromCents(cents: number | null | undefined): string {
  const c = cents ?? 0;
  return (c / 100).toLocaleString("it-IT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
