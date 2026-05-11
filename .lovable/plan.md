# Restyle Homepage — Standard 2026

## Obiettivo
Trasformare la homepage da "template marketplace 2019" a sito moderno, credibile e ad alta conversione, mantenendo l'identità (verde/blu Mario, Nunito) ma usandola con criterio.

## Principi guida (estetica 2026)
- **Sfondo chiaro dominante** (bianco/off-white), il verde diventa accent, non protagonista
- **Foto reali** di idraulici/lavori al posto del gradient grigio
- **Tipografia espressiva**: display molto grande, contrasto forte tra weight
- **Bento grid** per sezioni (card asimmetriche, bordi sottili, micro-shadow)
- **Micro-animazioni**: numeri che scorrono, badge live pulsante, scroll-reveal soft
- **Trust visivo above the fold**: foto + rating + numeri grossi insieme

## Step 1 — Hero nuovo (questo intervento)

```
┌────────────────────────────────────────────────────┐
│  [Nav minimale + logo]                             │
├────────────────────────────────────────────────────┤
│                                                    │
│  [● LIVE] 12 idraulici disponibili ORA             │
│                                                    │
│  Idraulico a casa tua                              │
│  in 30 minuti.                ┌──────────────┐    │
│                               │              │    │
│  Preventivo gratis. Nessun    │  FOTO REALE  │    │
│  obbligo. Verificati.         │  idraulico   │    │
│                               │  al lavoro   │    │
│  [📱 Contattaci su WhatsApp]  │              │    │
│  [Chiama ora 800.xxx]         └──────────────┘    │
│                                                    │
│  ★ 4.8/5  •  12.000+ richieste  •  Verificati AIPS│
└────────────────────────────────────────────────────┘
```

- Layout **split 60/40** (testo sx, foto dx) su desktop, stacked su mobile
- Foto generata su misura (idraulico italiano al lavoro, luce naturale)
- Display heading **80px+ desktop**, peso black
- Badge "LIVE" con dot verde pulsante
- Trust strip integrata nell'hero, non sotto

## Step 2 — Trust Bar + "Come funziona" bento

- Strip con loghi/numeri (12K richieste, 4.8★, X città coperte, X idraulici)
- "Come funziona" come **bento grid 3 card** con icone custom (no emoji), micro-illustrazioni
- Sezione "I nostri idraulici" con 3-4 foto reali + nome/città/rating (anche stock italiano credibile)

## Step 3 — Polish globale
- Palette ricalibrata: verde Mario solo su CTA principali, secondario blu desaturato
- Spacing più generoso (sistema 8pt)
- Footer ridisegnato con link interni SEO ben organizzati

## Dettagli tecnici
- File toccati: `src/pages/Index.tsx`, `src/components/HomeHero.tsx` (o equivalente), nuovo `src/components/TrustBar.tsx`, `src/components/HowItWorksBento.tsx`
- Nuove immagini generate via `imagegen` (idraulico al lavoro, foto idraulici per cards) salvate in `src/assets/`
- Token design system in `index.css` + `tailwind.config.ts`: aggiungere `--bg-soft`, `--surface-card`, `--shadow-soft`
- Nessuna modifica a logica business, routing, SEO meta, JSON-LD, sitemap
- Nessuna modifica al funnel di richiesta (resta identico, cambia solo presentazione)

## Cosa NON tocco in questo round
- Logica preventivi / matching / crediti
- Pagine città/servizio (verranno dopo, con stessa estetica)
- Auth / dashboard idraulico
- SEO struttura

## Ordine di esecuzione
1. Genero le immagini (hero + 3 idraulici)
2. Aggiorno design tokens
3. Riscrivo Hero
4. Aggiungo TrustBar + HowItWorksBento
5. Verifica visiva con screenshot

Tempo stimato: un singolo turno.
