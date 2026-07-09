# Piano crescita organica — Idraulici Subito

## Il problema chiave

Le guide indicizzate su Google (`macchia-acqua-muro`, `scarico-bagno-gorgoglia`, `rubinetto-perde-continuamente`, ecc.) intercettano ESATTAMENTE l'utente-buyer: chi vuole risolvere da solo e cerca aiuto tecnico. Ma tutti i box CTA di guide e blog puntano ancora a WhatsApp (vecchio modello rimosso). L'utente ideale entra e non trova la chat AI.

**Fix prima di tutto il resto**: convertire ogni CTA da "Contattaci su WhatsApp" a "Chiedi all'Idraulico AI · Diagnosi in 60 secondi".

---

## Fase 1 — Conversion fix (settimana 1)

Sostituire i componenti CTA in guide e blog per puntare tutti a `/consulenza` con messaggio ottimizzato per intent DIY.

### File da modificare (solo i componenti CTA, non serve toccare le 100+ pagine)

1. **`src/components/guide/GuideCTABox.tsx`** — sostituire `WhatsAppCTABox` con un nuovo box "Chat AI":
   - Icona AI/sparkle
   - Headline: "Bloccato a metà? Chiedi all'Idraulico AI"
   - Sub: "Diagnosi personalizzata gratis · allega foto se serve"
   - Bottone: "Descrivi il problema →" → link `/consulenza`
   - Micro-copy sotto: "Solo se non riesci a risolvere: consulenza completa a 4,95€"

2. **`src/components/blog/FinalCTABox.tsx`** e **`ArticleRequestForm.tsx`** — stessa sostituzione.

3. **`src/components/guide/GuideCityLinks.tsx`** — rimuovere il `WhatsAppCTA` finale, sostituire con link testuale a `/consulenza`.

4. **`src/pages/ApprofondimentoPage.tsx`** riga 225 — sostituire `WhatsAppCTA` inline.

5. **`src/components/guide/GuideStickyMobileCTA.tsx`** — già punta a `/consulenza`, migliorare copy: "💬 Chiedi all'Idraulico AI".

### CTA multi-punto per ogni guida (auto-applicato tramite i componenti sopra)

- **Dopo intro** (primo scroll): box "Non sei sicuro della causa? Descrivi il problema"
- **A metà articolo** (dopo cause): box "Bloccato allo step X? Fatti guidare"
- **Fine articolo**: box grande "Se non hai risolto: consulenza illimitata a 4,95€"
- **Sticky mobile**: sempre visibile

---

## Fase 2 — Potenziare le 6 pagine città quasi-in-top-10 (settimana 1-2)

Pagine target: Napoli, Bergamo, Ancona, Trieste, Taranto, Verona (tutte in posizione 7-14 su keyword ad alto volume).

Per ognuna aggiungere/rinforzare:

- **H1 con keyword esatta** ("Idraulico Napoli 24h · Diagnosi immediata in chat")
- **Title tag più aggressivo** con CTR-booster: "Gratis in Chat", "24h", "Diagnosi in 60s"
- **Meta description** che promette azione, non caratteristica
- **Sezione quartieri reale** (per Napoli/Bergamo già c'è, verificare altre 4)
- **5 FAQ locali specifiche** con Schema.org FAQPage (per apparire in AI Overview)
- **3-5 link interni** dalle guide correlate → alla pagina città
- **CTA principale**: chat AI, non WhatsApp

---

## Fase 3 — 10 guide nuove ad alto intent DIY (settimana 2-4)

Keyword da confermare con Semrush prima di scrivere (una passata di `keyword_research` su ognuna per validare volume+difficoltà). Candidate:

| Keyword target | Intent | Volume atteso |
|---|---|---|
| rubinetto perde continuamente non si chiude | DIY urgente | 500-1500 |
| cassetta wc perde acqua continuamente | DIY urgente | 800-2000 |
| sifone lavandino perde acqua | DIY | 400-800 |
| doccia perde acqua sotto piatto | DIY | 300-700 |
| caldaia non parte cosa fare | DIY diagnostico | 1000-2500 |
| termosifone perde acqua da valvola | DIY | 400-900 |
| boiler perde acqua dal basso | DIY urgente | 300-600 |
| wc non scarica bene rimedi | DIY | 500-1200 |
| attacco lavatrice perde acqua | DIY | 200-500 |
| tubo scarico intasato grasso | DIY | 300-700 |

### Template guida "conversion-first" (già supportato dai componenti guide)

1. Diagnosi rapida (3 righe, sopra la piega)
2. **CTA #1** – box AI dopo intro
3. Cause possibili (bullet)
4. Soluzione passo-passo dettagliata (contenuto vero, non superficiale)
5. **CTA #2** – "Bloccato? Chiedi conferma prima di fare danni"
6. Attrezzi + costi materiali
7. Quando fermarsi e chiamare un pro
8. **CTA finale** – consulenza AI illimitata 4,95€
9. FAQ con Schema.org

---

## Fase 4 — Segnali extra (settimana 4+)

- **Google Business Profile** ottimizzato (gratis, forte segnale locale)
- **Directory italiane gratuite**: PagineGialle, Cylex, iBusiness
- **Answer marketing**: rispondere su Quora IT e forum casa con link a guide (non spam, risposte vere)
- **Aggiornare `sitemap-blog.xml`** dopo pubblicazione nuove guide

---

## Cosa NON è in questo piano (per volontà tua)

- Google Ads (budget zero)
- Rinnovamento visivo del sito
- Nuovi flussi di prodotto oltre al chat AI esistente

---

## Dettagli tecnici

- Stack invariato: React/Vite + Supabase (Lovable Cloud) + Stripe €4,95
- Nuove guide vanno in `src/lib/guidesV3.ts` (o file dedicato `guidesConversion.ts` per non gonfiare); routing su `/guide/[slug]` già gestito da `GuidePage.tsx`
- CTA fix: modifica 4 componenti condivisi → propagazione automatica su tutte le guide/blog esistenti
- Nessuna migrazione DB necessaria
- Nessun edge function nuovo
- `react-helmet-async` già installato → title/meta/FAQ Schema per-route già funziona
- Aggiornamento `scripts/generate-sitemaps.mjs` per includere le nuove URL

---

## Ordine di esecuzione proposto

1. **Fase 1 completa** (fix CTA) — impatto immediato sulle 100+ pagine indicizzate esistenti, oggi
2. **Fase 2 su Napoli + Bergamo** (le 2 pagine con più upside) — questa settimana
3. **Fase 3: prime 3 guide** validate con Semrush — settimana prossima
4. Iterare Fase 3 (7 guide rimanenti) + Fase 4 in parallelo
