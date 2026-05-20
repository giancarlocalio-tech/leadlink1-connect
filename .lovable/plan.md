## Obiettivo
Trasformare il sistema attuale (crediti + 3 prove gratuite) in un sistema **saldo in euro** sul modello ProntoPro, con restyle completo della dashboard idraulico e della pagina /auth.

---

## 1. Modello economico — da Crediti a Saldo €

**Cosa cambia per l'idraulico:**
- Niente più "3 prove gratuite" alla registrazione → saldo iniziale **0,00 €**
- Niente più "crediti" → saldo in euro reali (es. 9,74 €)
- Pacchetti ricarica: **20 € / 40 € / 80 € / 200 € / 300 €** (IVA inclusa, come ProntoPro)
- Costo sblocco contatto in euro (non più crediti). Esempio mapping proposto:
  - Urgenza "Subito" → **6,00 €**
  - Urgenza "Entro 24h" → **4,00 €**
  - Urgenza "Prossimi giorni" → **2,50 €**
  - (valori modificabili da admin nella tabella `unlock_costs`)

**Saldo memorizzato in centesimi (`integer`)** per evitare problemi di arrotondamento float.

---

## 2. Modifiche database (migration)

```text
plumber_credits
  + balance_cents (int, default 0)
  + total_purchased_cents (int, default 0)
  + total_spent_cents (int, default 0)
  (le vecchie colonne balance/total_purchased/total_spent restano per ora,
   non vengono lette ma migrate via copia iniziale × 100 come fallback)

credit_packages
  + amount_cents (int)   -- importo della ricarica (es. 2000, 4000, 8000)
  (price_cents resta = stesso valore, credits diventa irrilevante)
  → inserire 5 nuovi pacchetti: 20/40/80/200/300 €

unlock_costs
  + cost_cents (int)
  (credits_cost resta per retrocompatibilità, non più usato)
  → aggiornare 3 righe con i nuovi importi

plumber_subscriptions
  → free_requests_remaining e is_trial restano in tabella ma vengono ignorati
    dalla logica (default forzato a is_trial=false, free_requests_remaining=0
    per i nuovi iscritti). Trigger handle_new_plumber_subscription aggiornato.

credit_transactions
  + amount_cents_delta (int)  -- variazione saldo in centesimi (+/-)
  + balance_after_cents (int)
```

**Nuove funzioni SQL (sostituiscono `unlock_contact_with_credits` e `trial_claim_request`):**
- `unlock_contact_with_balance(p_plumber_id, p_request_id)` — scala euro dal saldo, niente più trial path
- `add_balance(p_plumber_id, p_amount_cents, p_stripe_payment_id, p_description)` — accredito post-pagamento

---

## 3. Edge functions

- `create-credit-checkout` → diventa `create-topup-checkout`: riceve `package_id`, crea Stripe Checkout con `amount` in centesimi
- `verify-credit-purchase` → diventa `verify-topup`: legge la sessione Stripe, chiama `add_balance()`
- Resto invariato

---

## 4. Frontend — Restyle stile ProntoPro

### 4.1 Sidebar dashboard (`DashboardSidebar.tsx`)
Look ProntoPro: logo in alto, voci con icona a sinistra, voce attiva con pill grigio chiaro, profilo utente in basso.
Voci: Opportunità (richieste), Lavori ottenuti, Profilo, **Saldo: X,XX €** (pillola evidenziata).

### 4.2 Pagina "Il mio conto" (`/dashboard/crediti` → rinominata "Conto")
Layout ProntoPro:
- H1 "Il mio conto"
- Card "Ricarica il conto" (titolo + sottotitolo + chevron)
- Card "Preferenze di pagamento"
- Card "Saldo" (storico transazioni)

### 4.3 Pagina "Ricarica" (`/dashboard/conto/ricarica`)
- Saldo corrente in cima
- Sezione "Importo": 5 radio-card (20/40/80/200/300 €)
- Sezione "Metodo di pagamento": Carta / PayPal / Altri (per ora solo Carta, gli altri "in arrivo")
- Sezione "Indirizzo di fatturazione"
- CTA sticky in basso "Procedi con la carta" + badge "Pagamenti sicuri tramite stripe"

### 4.4 Pagina "Preferenze di pagamento"
- Empty state "Nessuna carta salvata" + illustrazione + bottone "Aggiungi carta"
- (Gestione carte salvate fuori scope di questo round, link a Stripe Customer Portal)

### 4.5 Pagina /auth
- Restyle con palette **Siena** (blu/verde brand già definiti, ma look moderno tipo SaaS 2025: card con shadow morbida, input arrotondati grandi, micro-animazioni, gradient sottile)
- Rimossi tutti i copy "3 prove gratuite" / "trial gratuito" → sostituiti con: *"Ricevi richieste verificate dai clienti della tua zona. Paghi solo i contatti che sblocchi."*
- Form multi-step: progress bar in alto, step più ariosi, input con label flottante, bottoni grandi con icona

### 4.6 Componenti dashboard da aggiornare
- `CreditsCard.tsx` → mostra "Saldo: X,XX €" invece di "X crediti"
- `TrialPaywall.tsx` → diventa `LowBalancePaywall.tsx` ("Saldo insufficiente — ricarica per sbloccare")
- `RequestCard.tsx` → bottone "Sblocca contatto — 4,00 €" invece di "3 crediti"
- Rimuovere `TrialRequestCard.tsx` / `AcceptedTrialRequestCard.tsx` o unificarli con la versione paid
- `useTrialRequests.ts` → deprecato, rimosso dalla dashboard

---

## 5. Copy & marketing da ripulire (rimozione "prove gratuite")

File da scandire e aggiornare:
- `AuthPage.tsx`, `PlumberLandingPage.tsx`, `PlumberPlanSelectionPage.tsx`
- `LandingPage.tsx`, `LandingComeFunzionaPage.tsx`
- `Footer.tsx`, `Header.tsx`, qualsiasi badge "Prova gratis"
- Email di benvenuto (`send-welcome-email`) se menziona trial

Nuovo messaggio standard: *"Iscrizione gratuita · Ricarica quando vuoi · Paghi solo i contatti che sblocchi"*

---

## 6. Aggiornamento memoria progetto
Aggiornare `mem://index.md` core rule e `mem://business/monetization-model-credits` → nuovo modello "Saldo €".

---

## 7. Cosa NON è incluso in questo round (per non esplodere lo scope)
- Salvataggio carte di credito permanente (Stripe Setup Intents) → per ora solo checkout one-shot
- PayPal e Google Pay come metodi di pagamento → mostrati disabilitati "in arrivo"
- Migrazione dati storici dei crediti esistenti di idraulici già registrati → verrà fatta come script separato dopo conferma (se preferisci, posso convertire 1 credito = 1 € come default)

## Domande aperte prima di procedere
1. **Conversione idraulici esistenti**: 1 credito attuale = quanti euro nel nuovo saldo? Proposta: **1 credito = 1 €** (semplice). Confermi?
2. **Costo sblocco**: vanno bene 6 / 4 / 2,50 € per subito/24h/giorni? O preferisci altri valori?
3. **Pacchetti ricarica**: confermo esattamente 20/40/80/200/300 € come ProntoPro?

Rispondimi a queste 3 domande (anche solo "ok a tutto") e parto con migration + codice.
