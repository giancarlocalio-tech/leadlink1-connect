/**
 * Pricing helper for lead unlock cost shown to plumbers.
 *
 * Server source of truth: public.unlock_contact_with_balance() in Supabase.
 * This client mirror is for previewing the price before unlock.
 *
 * Formula:
 *   price = base(urgency) × multiplier(intervention_type) × (chat_only ? 0.7 : 1)
 */

import type { UrgencyType, InterventionType } from '@/lib/types';

export const URGENCY_BASE_CENTS: Record<UrgencyType, number> = {
  subito: 600,
  entro_24_ore: 400,
  prossimi_giorni: 250,
};

export type PricingTier = 'S' | 'M' | 'L' | 'XL';

export const INTERVENTION_PRICING: Record<
  InterventionType,
  { tier: PricingTier; multiplier: number }
> = {
  sostituzione_rubinetto: { tier: 'S', multiplier: 0.6 },
  rubinetto_rotto: { tier: 'S', multiplier: 0.6 },
  termosifone: { tier: 'S', multiplier: 0.6 },
  contatore: { tier: 'S', multiplier: 0.6 },
  altro: { tier: 'S', multiplier: 0.6 },

  perdita_acqua: { tier: 'M', multiplier: 1.0 },
  scarico_intasato: { tier: 'M', multiplier: 1.0 },
  sturare_spurgo: { tier: 'M', multiplier: 1.0 },
  riparazione: { tier: 'M', multiplier: 1.0 },
  installazione_sostituzione: { tier: 'M', multiplier: 1.0 },
  box_doccia: { tier: 'M', multiplier: 1.0 },
  addolcitore_acqua: { tier: 'M', multiplier: 1.0 },
  depuratore_acqua: { tier: 'M', multiplier: 1.0 },

  caldaia: { tier: 'L', multiplier: 1.4 },
  impianto_idraulico: { tier: 'L', multiplier: 1.4 },
  impianto_riscaldamento: { tier: 'L', multiplier: 1.4 },
  termoidraulico: { tier: 'L', multiplier: 1.4 },
  condizionatori: { tier: 'L', multiplier: 1.4 },
  certificazione: { tier: 'L', multiplier: 1.4 },

  ristrutturazione: { tier: 'XL', multiplier: 1.8 },
};

export const CHAT_ONLY_DISCOUNT = 0.7;

export interface UnlockPriceBreakdown {
  baseCents: number;
  multiplier: number;
  tier: PricingTier;
  chatOnly: boolean;
  finalCents: number;
}

export function computeUnlockPriceCents(input: {
  urgency: UrgencyType;
  intervention_type: InterventionType;
  phone_contact_allowed?: boolean | null;
}): UnlockPriceBreakdown {
  const baseCents = URGENCY_BASE_CENTS[input.urgency] ?? 400;
  const tierInfo = INTERVENTION_PRICING[input.intervention_type] ?? {
    tier: 'M' as PricingTier,
    multiplier: 1.0,
  };
  const chatOnly = input.phone_contact_allowed === false;

  let finalCents = Math.round(baseCents * tierInfo.multiplier);
  if (chatOnly) finalCents = Math.round(finalCents * CHAT_ONLY_DISCOUNT);

  return {
    baseCents,
    multiplier: tierInfo.multiplier,
    tier: tierInfo.tier,
    chatOnly,
    finalCents,
  };
}
