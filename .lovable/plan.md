
# Rivoluzione IdrauliciSubito → Consulente AI Idraulico

## Cosa cambia (in una frase)
Ogni pagina del sito porta il visitatore in una **chat con AI idraulico specializzata** che analizza foto/video, diagnostica il problema, e guida passo-passo alla soluzione. Prima diagnosi gratis, poi paywall €4,90 per la guida completa. Se l'AI non risolve, mostriamo idraulici veri vicino via Google Places con recensioni e telefono.

## Modello di business
- **Gratis:** 3-4 messaggi iniziali → diagnosi preliminare + primo consiglio
- **Paywall €4,90 una tantum** → conversazione illimitata, analisi foto/video approfondita, procedura passo-passo, lista attrezzi, avvisi di sicurezza
- **Fallback idraulico:** in qualsiasi momento (o quando l'AI segnala "serve un professionista") mostriamo top 3 idraulici da Google Places con rating, distanza, telefono cliccabile
- **Zero commissioni sul professionista:** l'utente chiama direttamente. Il nostro ricavo è la consulenza AI

## Scope della sostituzione

### Cosa RIMUOVIAMO dal sito pubblico
- Wizard `/richiedi-preventivo` (multi-step form lead)
- Dashboard idraulici pubblica, pagine registrazione idraulico, login idraulico
- Pagine pricing/piani idraulici, sistema crediti idraulici
- CTA "Registrati come idraulico", CTA "Ricevi preventivi gratis"
- Voice AI agent (VAPI)
- Homepage ridisegnata: hero unico = chat AI

### Cosa MANTENIAMO (asset SEO che portano traffico)
- Tutte le guide `/guide/*` (81+42+21+19 visite/mese sono oro)
- Tutte le pagine città `/idraulico-{citta}` (SEO stabile)
- Pagine problema-città localizzate
- Sitemap, robots.txt, schema JSON-LD
- **MA:** ogni pagina ha come CTA principale "Parla con l'AI idraulico" invece di "Richiedi preventivo"

### Cosa CONSERVIAMO nel backend (dormiente, non esposto)
- Tabelle `plumber_profiles`, `plumber_credits`, `service_requests`, `user_roles`, ecc.
- Pannello `/admin` accessibile solo al proprietario
- Motivo: se il pivot non funziona in 4-8 settimane, ripristiniamo senza aver perso dati. Se funziona, in una seconda fase puliamo lo schema.

## Nuove funzionalità core

### 1. Chat AI "Diagnosi Idraulica"
- **Modello:** `google/gemini-3-flash-preview` (multimodale nativo: testo + immagini + video)
- **System prompt** specializzato: idraulico italiano esperto, tono professionale ma accessibile, sicurezza prima di tutto, riconosce quando serve un intervento fisico
- **Upload:** foto e video (max 20MB) caricati su bucket Supabase Storage `ai-chat-media` (privato, RLS per session token)
- **Streaming:** risposte in streaming con AI Elements (`Conversation`, `Message`, `PromptInput`, `Shimmer`)
- **Rate limit:** 20 messaggi/ora per IP + session token per evitare abusi

### 2. Sessione anonima con token
- Nessun login richiesto per iniziare
- Alla prima apertura: creata `ai_consultation_sessions` con `access_token` (hex ≥32 char) salvato in localStorage
- La sessione tiene: messaggi usati, stato pagamento, città rilevata, tipo problema rilevato

### 3. Paywall + Stripe Checkout
- Dopo 4 messaggi utente non paganti: card "Sblocca la soluzione completa - €4,90"
- Guest checkout Stripe (email raccolta al checkout, non prima)
- Edge function `create-ai-consultation-payment` → sessione `mode: "payment"` con `price_id` fisso in codice
- Success URL `/consulenza/successo?session_id={CHECKOUT_SESSION_ID}` → verifica pagamento, marca sessione `unlocked=true`
- Ricevuta email automatica via Stripe

### 4. Fallback Google Places
- Trigger: (a) utente clicca "Chiama un idraulico vero", (b) AI stessa suggerisce "questo problema richiede intervento sul posto"
- Edge function `find-local-plumbers` → chiama Google Places API Nearby Search con query "idraulico" + geolocalizzazione utente (chiediamo permesso browser) o città rilevata dalla conversazione
- Restituisce top 3: nome, rating, n° recensioni, distanza, telefono, indirizzo
- UI card cliccabili con `tel:` per chiamata diretta

## Modifiche struttura database

### Nuove tabelle
- `ai_consultation_sessions`: `access_token`, `messages_used`, `unlocked`, `stripe_session_id`, `paid_at`, `detected_city`, `detected_problem`, `user_email` (opz.), `ip_hash`
- `ai_consultation_messages`: `session_id`, `role` (user/assistant), `content`, `media_urls` (array), `created_at`
- `ai_consultation_events`: log eventi (paywall shown, payment started, fallback shown) per analytics

### Modifiche esistenti
- Nuovo bucket storage `ai-chat-media` privato con policy per `access_token`
- Nessuna modifica alle tabelle idraulici (restano dormienti)

## Modifiche frontend

### Nuove pagine/componenti
- `src/pages/HomePage.tsx` → riscritta: hero con chat AI embedded a tutto schermo
- `src/pages/ConsulenzaPage.tsx` → chat full-page riutilizzabile da CTA di guide/città
- `src/pages/ConsulenzaSuccessoPage.tsx` → verifica pagamento e sblocca chat
- `src/components/ai/AIConsultationChat.tsx` → componente chat con AI Elements
- `src/components/ai/MediaUploader.tsx` → drag&drop foto/video
- `src/components/ai/PaywallCard.tsx` → card sblocco €4,90
- `src/components/ai/LocalPlumbersCard.tsx` → card idraulici Google Places
- `src/hooks/useAIConsultation.ts` → gestione sessione + streaming

### Pagine modificate (solo CTA, contenuto SEO invariato)
- Tutte le guide `/guide/*`: sostituisco `InlineLeadCaptureForm` con `<AIChatCTA />` (bottone "Diagnosi gratis con AI ↓" che apre chat inline o porta a `/consulenza?problema={slug}`)
- Tutte le pagine città: stessa sostituzione
- `Header.tsx`: rimuovo link "Sono un idraulico" e "Richiedi preventivo", nuovo CTA "Parla con l'AI"
- `Footer.tsx`: rimuovo link registrazione/login idraulici

### Route disattivate (redirect 301 a `/consulenza`)
- `/richiedi-preventivo` → `/consulenza`
- `/registrati-idraulico`, `/login-idraulico`, `/pricing-idraulici` → home
- Dashboard idraulici resta accessibile via URL diretto per gli idraulici già registrati, ma non linkata

## Edge functions

### Nuove
- `ai-consultation-chat`: streaming Gemini con system prompt, gestisce upload media, incrementa `messages_used`, blocca se `messages_used > 4 && !unlocked`
- `create-ai-consultation-payment`: crea Stripe Checkout €4,90
- `verify-ai-consultation-payment`: verifica e sblocca sessione
- `find-local-plumbers`: chiama Google Places API (richiede `GOOGLE_PLACES_API_KEY`)
- `upload-consultation-media`: signed URL per upload diretto a Storage

### Da disattivare (mantengo il file ma non più linkate dal frontend)
- `notify-plumbers`, `send-manual-assignment-email`, `create-test-request`, `send-whatsapp-notification`

## Segreti da configurare
- `GOOGLE_PLACES_API_KEY` — nuovo, richiesto all'utente (ha bisogno di attivarlo su Google Cloud Console con billing attivo, costo ~$0.017/richiesta con free tier di $200/mese = ~11.700 ricerche gratis)
- `STRIPE_SECRET_KEY` — già presente
- `LOVABLE_API_KEY` — già presente

## Analytics
- Traccio conversion funnel: pagina landing → chat aperta → 1° messaggio → paywall visto → pagamento → fallback Google
- Dashboard `/admin/ai-analytics` interna per proprietario

## Rischi e mitigazioni
- **Rischio SEO:** rimuovere `/richiedi-preventivo` potrebbe perdere link entranti. **Mitigazione:** redirect 301 verso `/consulenza`.
- **Rischio abusi:** utente potrebbe caricare video enormi/spam. **Mitigazione:** rate limit + max size + moderazione base sul prompt.
- **Rischio legale:** consigliare interventi idraulici può essere rischioso. **Mitigazione:** disclaimer prominente "consigli informativi, non sostituiscono un idraulico professionista per interventi di sicurezza (gas, elettricità)".
- **Rischio Google Places quota:** oltre $200/mese servirebbe carta. **Mitigazione:** cachiamo risultati per città+problema per 7 giorni.
- **Rischio idraulici già registrati:** ~decine di professionisti in DB che ricevono lead. **Mitigazione:** email di comunicazione (fuori piano) prima del deploy per informarli del cambio modello.

## Fasi di implementazione (in un solo deploy)

```text
Fase 1: Backend
├─ Migrazione: ai_consultation_sessions, messages, events
├─ Bucket storage ai-chat-media + policies
├─ Edge functions: ai-consultation-chat, create/verify payment, find-local-plumbers

Fase 2: Frontend chat
├─ AIConsultationChat + AI Elements
├─ MediaUploader, PaywallCard, LocalPlumbersCard
├─ Hook useAIConsultation

Fase 3: Pagine
├─ HomePage riscritta
├─ ConsulenzaPage + SuccessoPage
├─ CTA nelle guide e pagine città sostituite

Fase 4: Cleanup navigazione
├─ Header/Footer aggiornati
├─ Redirect 301 pagine dismesse
├─ Sitemap aggiornata
```

## Dettagli tecnici chiave
- **Chat UI:** AI Elements (`Conversation`, `Message`, `MessageResponse`, `PromptInput`, `PromptInputTextarea`, `PromptInputFooter`, `PromptInputSubmit`, `Shimmer`) — installo con `bun x ai-elements@latest add conversation message prompt-input shimmer`
- **Streaming:** AI SDK `useChat` + edge function con `toUIMessageStreamResponse`
- **Rendering messaggi:** `message.parts` (mai `content` flat), markdown renderizzato con `MessageResponse`
- **Storage RLS:** upload autorizzato solo con `access_token` nella session, lettura solo dalla stessa session
- **Pricing Stripe:** creo product "Consulenza AI Idraulico Completa" con price €4,90 EUR una tantum, uso il `price_id` in codice
- **System prompt AI:** definisce ruolo, tono italiano, safety (mai consigliare interventi su gas o elettricità senza professionista), formato risposta strutturato (diagnosi → cause probabili → passi ordinati → attrezzi → quando chiamare un pro)
- **Detection città:** l'AI estrae la città dalla conversazione o chiede esplicitamente; salvata in `detected_city` per il fallback

## Cosa serve confermare prima di partire
1. **Google Places API key:** devi attivarla su Google Cloud (o autorizzi Lovable a chiedertela nel prossimo messaggio). Senza, il fallback idraulico non funziona
2. **Comunicazione idraulici:** vuoi che prepari un template di email da inviare tu ai ~decine di idraulici registrati per spiegare il cambio modello?
3. **Prezzo €4,90 confermato?** O preferisci un altro importo (es. €2,90 test iniziale, €7,90 premium)
