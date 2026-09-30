## Obiettivo

Far variare il costo del lead che l'idraulico sblocca in base a 3 fattori del form cliente:

1. **Urgenza** (già attivo: `subito` 6€, `entro_24_ore` 4€, `prossimi_giorni` 2,50€)
2. **Tipo di intervento** (NUOVO): un rifacimento bagno vale molto più di una sostituzione rubinetto
3. **Contatto telefonico** (già attivo: −30% se solo chat)

Il prezzo finale mostrato all'idraulico sarà:

```text
prezzo = costo_base(urgenza) × moltiplicatore(tipo_intervento) × (chat_only ? 0.7 : 1)
```

## Tiering tipi di intervento

Raggruppo i 20 `intervention_type` esistenti in 4 tier con un moltiplicatore:

| Tier | × | Tipi inclusi |
|---|---|---|
| **S — micro** | 0.6 | `sostituzione_rubinetto`, `rubinetto_rotto`, `termosifone`, `contatore`, `altro` |
| **M — standard** | 1.0 | `perdita_acqua`, `scarico_intasato`, `sturare_spurgo`, `riparazione`, `installazione_sostituzione`, `box_doccia`, `addolcitore_acqua`, `depuratore_acqua` |
| **L — impianto** | 1.4 | `caldaia`, `impianto_idraulico`, `impianto_riscaldamento`, `termoidraulico`, `condizionatori`, `certificazione` |
| **XL — opera** | 1.8 | `ristrutturazione` |

Esempi (urgenza `subito` = 6€ base):
- Sostituzione rubinetto + telefono → 6 × 0.6 = **3,60 €**
- Perdita acqua + telefono → 6 × 1.0 = **6,00 €**
- Caldaia + telefono → 6 × 1.4 = **8,40 €**
- Ristrutturazione + telefono → 6 × 1.8 = **10,80 €**
- Ristrutturazione + chat-only → 10,80 × 0.7 = **7,56 €**

## Modifiche DB

1. Nuova tabella `intervention_pricing` (admin-editable):
   ```text
   intervention_type (PK, enum) | tier text | multiplier numeric | updated_at
   ```
   Seed con i 20 tipi mappati come sopra. RLS: lettura pubblica, scrittura solo admin.

2. Aggiornare `unlock_contact_with_balance(p_plumber_id, p_request_id)`:
   - leggere `sr.intervention_type`
   - moltiplicare `v_cost_cents` per `multiplier` (default 1.0 se mancante)
   - applicare poi lo sconto chat-only esistente
   - `ROUND` finale a centesimi

3. Aggiornare `description` della `credit_transactions` per includere tier + tipo + sconto chat (utile per supporto/contabilità).

## Modifiche UI idraulico

- `TrialRequestCard.tsx` (e card simili): mostrare il prezzo calcolato in anteprima usando una funzione client `computeUnlockPriceCents({urgency, intervention_type, phone_contact_allowed})` che replica la formula. Niente RPC: i 3 dati sono già visibili al lead prima dello sblocco.
- Esporre il breakdown sotto il pulsante: «Urgenza subito · Caldaia · solo chat → **5,88 €**» con tooltip dei 3 fattori.
- L'edge function `unlock_contact_with_balance` resta la sorgente di verità.

## File toccati

- Migrazione: crea `intervention_pricing`, seed, RLS, update RPC.
- `src/lib/pricing.ts` (nuovo): tabella tier + helper `computeUnlockPriceCents`.
- `src/components/dashboard/TrialRequestCard.tsx`: usa l'helper, breakdown UI.
- Eventuali altri punti che mostrano il costo (pricing page interna, admin): aggiornare se mostrano il vecchio costo fisso.

## Non incluso

- Pricing dinamico per città / orario.
- Modifica del listino base per urgenza (resta com'è oggi in `unlock_costs`).
- Pannello admin di editing dei moltiplicatori (la tabella è già editabile via Cloud, UI dedicata in futuro).
