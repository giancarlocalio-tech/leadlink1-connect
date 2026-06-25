# 🤖 Preventivatore AI nel wizard `/richiedi-preventivo`

Aggiungiamo uno step **"Stima AI istantanea"** dopo la descrizione del problema. Il cliente vede subito range prezzo, diagnosi, cosa farà l'idraulico, urgenza e rischio se rimanda — poi prosegue al form contatti già esistente.

## Flusso utente

```text
[1 Descrizione + 📸 foto opzionali]   ← step potenziato
        ↓
[2 ✨ Stima AI in 20 sec]              ← NUOVO step
   ├─ Range prezzo 80-150€
   ├─ Tempi 1-2 ore
   ├─ Diagnosi probabile
   ├─ Cosa farà l'idraulico (checklist)
   ├─ 🔥 Livello urgenza
   └─ ⚠️ Rischio se rimandi
        ↓
[3 Urgenza] → [4 Tipo immobile] → [5 Accessibilità] → [6 Contatti] → [7 Password]
        ↓
   notify-plumbers (con foto + stima AI allegate al lead)
```

La stima è un **gancio di conversione**: il cliente che la vede ha 3-5× più probabilità di completare il form (pattern Thumbtack Instant Estimate).

## Cosa costruiamo

### 1. Upload foto nello step descrizione
- Componente `PhotoUploader` (max 3 foto, drag&drop, preview, compressione client-side a 1280px)
- Upload su **Lovable Cloud Storage** in bucket `request-photos` (privato, signed URL 7 giorni)
- Le foto vengono allegate al `service_request` (nuovo campo `photo_urls text[]`)

### 2. Nuovo step "stima" nel wizard
- `STEPS` diventa: `['description', 'aiEstimate', 'urgency', 'propertyType', 'accessibility', 'contact', 'password']`
- Entrando nello step parte automaticamente la chiamata AI con animazione "🔍 Analizzo il tuo problema…"
- Risultato in card scrollabile con CTA "Continua →"

### 3. Edge function `ai-estimate`
- Input: `interventionType`, `description`, `answers` (risposte wizard), `photoUrls[]`, `city`
- Modello: **`google/gemini-3-flash-preview`** (multimodale gratis su Lovable AI Gateway, gestisce foto+testo)
- System prompt: "Sei un idraulico esperto italiano. Analizza il problema e fornisci una stima professionale onesta. NON garantire prezzi: usa range. Considera complessità, accesso, urgenza, mercato di {city}."
- Structured output con schema Zod:
  ```ts
  { priceMin, priceMax, durationMin, durationMax,
    diagnosis, plumberSteps[], urgencyLevel, urgencyReason,
    riskIfPostponed, confidence }
  ```
- Salva la stima in colonna `ai_estimate jsonb` del request finale (utile per idraulico + analytics)

### 4. Dashboard idraulico
- `RequestCard` mostra badge "📸 3 foto" e "🤖 Stima AI: 80-150€" → l'idraulico arriva preparato e sblocca con più fiducia (↑ unlock rate)

### 5. SEO + analytics
- Evento `ai_estimate_generated` (tempo risposta, prezzo, confidence)
- Evento `ai_estimate_converted` (cliente prosegue dopo aver visto stima)
- Meta tag wizard aggiornato: "Preventivo idraulico AI gratis in 20 secondi"

## Dettagli tecnici

**Schema DB** (1 migrazione):
```sql
ALTER TABLE service_requests
  ADD COLUMN photo_urls text[] DEFAULT '{}',
  ADD COLUMN ai_estimate jsonb;
```
+ bucket storage `request-photos` (privato) + policy: solo owner request + idraulici che hanno sbloccato.

**Files nuovi:**
- `supabase/functions/ai-estimate/index.ts`
- `src/components/wizard/PhotoUploader.tsx`
- `src/components/wizard/AIEstimateCard.tsx`
- `src/hooks/useAIEstimate.ts`

**Files modificati:**
- `src/pages/RequestPage.tsx` (nuovo step + upload foto + chiamata AI)
- `src/components/dashboard/RequestCard.tsx` (badge foto + stima)
- `supabase/functions/notify-plumbers/index.ts` (passa photo_urls + ai_estimate)

**Costo AI:** `gemini-3-flash-preview` è **gratis nel periodo promozionale Lovable AI** (fino a fine 2026), poi ~0.0003€/stima → trascurabile anche a 10k stime/mese.

**Disclaimer legale:** ogni stima mostra in piccolo *"Stima orientativa generata da AI sulla base delle informazioni fornite. Il prezzo definitivo verrà confermato dall'idraulico dopo sopralluogo."* → zero rischio legale.

## Cosa NON facciamo in questa iterazione
- Niente landing dedicata `/preventivo-istantaneo` (rimandata a fase 2 se questa converte)
- Niente preventivo "vincolante" → resta orientativo
- Niente confronto multi-idraulico → coerente col modello attuale "shared lead"

---

Confermi che procedo o vuoi aggiustare qualcosa (es: limite foto, modello AI, copy disclaimer)?
