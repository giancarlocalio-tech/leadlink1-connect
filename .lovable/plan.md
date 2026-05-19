# Scalare la SERP per "idraulico Siena"

**Contesto SEO** (Semrush, mercato IT)
- Keyword "idraulico siena": **KD 11/100** (molto facile), 210 ricerche/mese
- Varianti: "idraulici siena", "idraulici a siena", "idraulico a siena" (110/mese ciascuna), "idraulico urgenza" (70/mese)
- SERP attuale: PagineGialle, ProntoPro, ProntoIdraulicoSiena, La Chi Marcello, PagineBianche, StarOfService — **nessun competitor forte**, solo directory e micro-siti locali. Siamo in posizione perfetta per puntare al #1.
- La nostra pagina `/siena` oggi usa il template generico `CityLandingPage` mentre Napoli e Milano hanno una pagina dedicata con 10+ componenti ricchi: questo è il gap da colmare.

---

## Cosa costruiamo

### 1. Pagina dedicata `SienaLandingPage`
Stessa struttura di `NapoliLandingPage` / `MilanoLandingPage` con sezioni siena-specifiche:
- **Hero** con H1 "Idraulico a Siena — Pronto Intervento 24/7" + CTA WhatsApp
- **TableOfContents** sticky per ridurre bounce rate
- **Intro lunga locale**: centro storico UNESCO (Terzi di Città, Camollia, San Martino), edifici medievali con tubature complesse, contrade, dipendenza dall'acquedotto del Vivo, durezza dell'acqua senese
- **Quartieri/Zone** con link interni: Centro Storico, San Prospero, Ravacciano, Acquacalda, Isola d'Arbia, Taverne d'Arbia, Costalpino, San Miniato, Vico Alto
- **Tipologie edifici Siena**: palazzi medievali nel centro UNESCO, case in pietra, condomini anni '60-'80 nelle zone esterne, ville nelle colline
- **Perché i problemi a Siena**: età degli impianti nel centro storico, calcare alto, vincoli soprintendenza per interventi nel centro
- **Statistiche locali**: tempo medio intervento, n° interventi gestiti
- **Costi a Siena**: tabella prezzi pronto intervento, riparazione perdita, sblocco scarico, sostituzione rubinetto, riparazione caldaia (range realistici per la zona)
- **FAQ estesa siena-specifica** (10+ domande): "quanto costa un idraulico urgente a Siena?", "intervengono nel centro storico UNESCO?", "intervento di notte/festivo?", "tempi medi?", "zone coperte?", ecc. + JSON-LD `FAQPage`
- **Recensioni locali** (CustomerReviews siena-tagged)
- **Link problemi locali**: perdita acqua siena, scarico intasato siena, caldaia siena, ecc.
- **CTA finale** sticky mobile

### 2. Pagine quartiere `/siena-{quartiere}-idraulico`
Replico il pattern Milano/Napoli quartieri per 6-8 quartieri principali di Siena:
centro-storico, san-prospero, ravacciano, acquacalda, isola-arbia, costalpino.
Indicizzate via nuova `sitemap-siena-quartieri.xml`.

### 3. SEO tecnico
- Meta title: "Idraulico Siena 24/7 | Pronto Intervento Subito" (≤60 char)
- Meta description focalizzata su urgenza + città (≤160 char)
- Canonical self-referenziale a `https://www.idraulicisubito.com/siena`
- JSON-LD: `Service` con `areaServed` (Siena + provincia), `FAQPage`, `BreadcrumbList`
- Aggiunta `sitemap-siena-quartieri.xml` all'index `sitemap.xml`
- Internal linking: aggiungo Siena ai link in evidenza nelle pagine hub e nei link interni delle guide
- Contenuto totale stimato: **2500–3500 parole** sulla pagina principale (oggi è ~600)

### 4. Differenziazione contenutistica (anti-cannibalizzazione)
H1 e angle unici rispetto a Napoli/Milano/Roma — focus su:
- Centro storico UNESCO e vincoli artistici
- Contrade e identità di quartiere
- Acqua dura del Vivo e impianti datati

---

## File da creare/modificare

**Nuovi**
- `src/pages/SienaLandingPage.tsx`
- `src/components/city/SienaIntroSection.tsx`
- `src/components/city/SienaNeighborhoodsSection.tsx`
- `src/components/city/SienaBuildingTypesSection.tsx`
- `src/components/city/SienaWhyProblemsSection.tsx`
- `src/components/city/SienaStatisticsSection.tsx`
- `src/components/city/SienaCostSection.tsx`
- `src/components/city/SienaExtendedFAQSection.tsx`
- `src/components/city/SienaEmergencyTipsSection.tsx`
- `src/components/city/SienaTableOfContents.tsx`
- `src/components/city/SienaProblemLinksSection.tsx`
- `src/components/city/SienaReviewsSection.tsx`
- `src/lib/sienaSeoContent.ts` (dati centralizzati)
- `src/lib/sienaQuartieriData.ts`
- `src/pages/SienaQuartierePage.tsx`
- `public/sitemap-siena-quartieri.xml`

**Modifiche**
- `src/App.tsx` — route `/siena` → `SienaLandingPage`, route `/siena-:slug-idraulico` → `SienaQuartierePage`
- `public/sitemap.xml` — aggiungo `sitemap-siena-quartieri.xml`
- `src/components/city/index.ts` — export nuovi componenti
- `src/lib/canonicalHierarchy.ts` se necessario per anti-cannibalizzazione

## Stima risultato
KD 11 + nessun competitor forte + contenuto 5x più ricco dei top SERP attuali = **realistico arrivare in top 3 in 6-10 settimane**, top 1 in 3-4 mesi. La pagina diventa template replicabile per le altre 47 città Top 50.

---

Confermi e procedo, o vuoi che modifichi qualcosa (es. più/meno quartieri, focus diverso sull'angle del centro storico, prima solo la landing senza i quartieri)?
