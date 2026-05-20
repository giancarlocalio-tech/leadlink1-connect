
# Piano: Opportunità + Preventivi + Chat stile ProntoPro

## 1. Sidebar idraulico — 2 sezioni

In `DashboardSidebar.tsx` sostituisco la voce unica "Richieste" con:

- **Opportunità** → `/dashboard/opportunita` — richieste matchate **non ancora sbloccate** dall'idraulico loggato. Card grandi stile ProntoPro: nome cliente con iniziale (es. "Mario M."), titolo servizio + città + scadenza, descrizione troncata, tag categorie, badge "telefono disponibile", pulsante **Rispondi (X €)** dove X = costo crediti.
- **Preventivi** → `/dashboard/preventivi` — richieste **già sbloccate** (presenti in `contact_unlocks` per quel plumber). Lista a sinistra (nome cliente, titolo, prezzo offerto, data), dettaglio + chat a destra. Click → apre conversazione.

Rinomino l'attuale "Richieste" → "Opportunità" e creo la pagina nuova "Preventivi".

## 2. Flusso pagamento (invariato)

Il pulsante "Rispondi (X €)" nella card Opportunità chiama `unlock_contact_with_balance` (già esistente). Allo sblocco:
- la richiesta sparisce da Opportunità e appare in Preventivi
- si crea automaticamente una **conversation** (vedi sotto) tra plumber e client
- al cliente viene inviata email + WhatsApp con un **magic link** per accedere alla chat

Nessuna modifica al sistema crediti.

## 3. Chat in-app bidirezionale

### Modello dati (nuova migration)

```sql
-- una conversazione per coppia (richiesta, idraulico)
conversations (
  id uuid PK,
  request_id uuid,
  plumber_id uuid,
  client_access_token text UNIQUE,  -- per magic link cliente
  quote_amount_cents integer,        -- prezzo offerto dall'idraulico
  created_at, updated_at
)

conversation_messages (
  id uuid PK,
  conversation_id uuid,
  sender_type text CHECK ('plumber','client'),
  sender_id uuid,                    -- plumber_id se plumber, null se client
  content text,
  created_at
)
```

RLS:
- plumber legge/scrive solo conversazioni dove `plumber_id` è il suo
- client accede via edge function pubblica con `client_access_token` (no auth Supabase)
- abilito Realtime su `conversation_messages`

### Edge function `client-chat`
Endpoint pubblico parametrizzato da `?token=xxx`. Operazioni:
- `GET messages` → lista messaggi della conversazione
- `POST message` → inserisce messaggio come client

### Pagina pubblica cliente
Nuova route `/chat/:token` (no auth richiesta). Layout semplice:
- header: nome idraulico + servizio richiesto
- thread messaggi (bolla dx = cliente, bolla sx = idraulico)
- input + bottone invia

Polling ogni 3s o Supabase Realtime tramite token.

### Pagina Preventivi idraulico
Layout 2 colonne (responsive: lista sopra, chat sotto su mobile):
- **Sinistra:** lista conversazioni ordinate per `updated_at DESC`. Card con avatar iniziali, nome cliente, snippet ultimo messaggio, data.
- **Destra:** header (nome cliente + "Dettagli" che apre sheet con tutti i dati richiesta), thread messaggi, input in basso. Realtime su `conversation_messages`.

## 4. Notifiche cliente

Allo sblocco → invio:
- **Email** (via `send-welcome-email` riusato/nuova edge function `notify-client-quote`): "L'idraulico X ha risposto alla tua richiesta. [Apri chat]"
- **WhatsApp** (via Respond.io): stesso link

## 5. Stile

Colori Siena (azzurro `199 89% 48%`) già attivi. Card ProntoPro-style: bordi arrotondati `rounded-2xl`, shadow leggera, hover, tag pill grigi. Bottone "Rispondi (X €)" full-width primario blu.

## File toccati

**Nuovi:**
- `supabase/migrations/` (conversations + messages + RLS)
- `supabase/functions/client-chat/index.ts`
- `supabase/functions/notify-client-quote/index.ts`
- `src/pages/dashboard/OpportunitaPage.tsx` (rinomina/refactor di RichiestePage)
- `src/pages/dashboard/PreventiviPage.tsx`
- `src/pages/ClientChatPage.tsx` (route pubblica `/chat/:token`)
- `src/components/dashboard/OpportunityCard.tsx`
- `src/components/dashboard/ConversationList.tsx`
- `src/components/dashboard/ChatWindow.tsx`

**Modificati:**
- `src/components/dashboard/DashboardSidebar.tsx` (2 voci nuove)
- `src/App.tsx` (route nuove)
- `unlock_contact_with_balance` RPC (aggiunta: crea conversazione + token al successo) — oppure trigger su `contact_unlocks` INSERT

## Aggiornamenti memoria

Aggiorno `mem://constraints/platform-model` rimuovendo "no chat / no quotes" perché il modello cambia: ora la piattaforma **ospita la chat e il preventivo** dopo lo sblocco a crediti.

## Cosa NON faccio

- Niente account cliente completo (uso magic link via token).
- Niente Stripe per singola risposta (resta sistema crediti).
- Niente file upload nella chat (solo testo per MVP).
- Niente notifiche push real-time al cliente (solo email + WhatsApp iniziale + polling/realtime quando apre la chat).
