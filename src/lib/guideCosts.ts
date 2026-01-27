/**
 * Guide Costs - Pricing data for guide pages
 * 
 * Maps guide slugs to their relevant costs and pricing pages.
 */

export interface GuideCost {
  service: string;
  price: string;
}

export interface RelatedPricingPage {
  slug: string;
  title: string;
}

// Costs by guide slug
const GUIDE_COSTS_DATA: Record<string, GuideCost[]> = {
  // ============ PERDITE ============
  'perdita-acqua-tubo-muro': [
    { service: 'Ricerca perdita con strumenti', price: '100-250€' },
    { service: 'Riparazione tubo accessibile', price: '80-150€' },
    { service: 'Riparazione tubo sotto traccia', price: '200-500€' },
    { service: 'Pronto intervento (extra)', price: '+30-50%' },
  ],
  'tubo-perde-muro-urgente': [
    { service: 'Ricerca perdita con strumenti', price: '100-250€' },
    { service: 'Riparazione tubo accessibile', price: '80-150€' },
    { service: 'Riparazione tubo sotto traccia', price: '200-500€' },
  ],
  'perdita-acqua-soffitto-chi-chiamare': [
    { service: 'Uscita urgente + diagnosi', price: '60-100€' },
    { service: 'Riparazione perdita', price: '80-200€' },
    { service: 'Ripristino intonaco (muratore)', price: '150-400€' },
  ],
  'rubinetto-perde-acqua-goccia': [
    { service: 'Sostituzione guarnizione', price: '30-60€' },
    { service: 'Sostituzione cartuccia', price: '50-100€' },
    { service: 'Installazione rubinetto nuovo', price: '60-120€' },
  ],
  'rubinetto-perde-continuamente-soluzione': [
    { service: 'Sostituzione guarnizione', price: '30-60€' },
    { service: 'Sostituzione cartuccia', price: '50-100€' },
    { service: 'Sostituzione rubinetto completo', price: '80-150€' },
  ],
  'perdita-acqua-sotto-lavello': [
    { service: 'Riparazione raccordo/sifone', price: '40-80€' },
    { service: 'Sostituzione sifone', price: '30-60€' },
    { service: 'Riparazione tubo flessibile', price: '40-70€' },
  ],
  'perdita-acqua-termosifone': [
    { service: 'Riparazione raccordo', price: '40-80€' },
    { service: 'Sostituzione valvola', price: '50-100€' },
    { service: 'Sostituzione termosifone', price: '150-400€' },
  ],

  // ============ SCARICHI ============
  'wc-intasato-non-scarica': [
    { service: 'Disostruzione semplice', price: '60-100€' },
    { service: 'Disostruzione con sonda', price: '80-150€' },
    { service: 'Intervento con idrogetto', price: '150-300€' },
  ],
  'scarico-doccia-intasato': [
    { service: 'Disostruzione semplice', price: '60-100€' },
    { service: 'Disostruzione con sonda professionale', price: '80-150€' },
    { service: 'Intervento con idrogetto', price: '150-250€' },
  ],
  'scarico-cucina-intasato': [
    { service: 'Disostruzione sifone', price: '40-80€' },
    { service: 'Disostruzione con sonda', price: '80-150€' },
    { service: 'Smontaggio tubature sotto lavello', price: '100-180€' },
  ],
  'lavandino-otturato-rimedi': [
    { service: 'Disostruzione semplice', price: '50-90€' },
    { service: 'Disostruzione con sonda', price: '80-130€' },
    { service: 'Sostituzione sifone', price: '40-70€' },
  ],
  'vasca-non-scarica-acqua': [
    { service: 'Disostruzione sifone vasca', price: '60-100€' },
    { service: 'Disostruzione con sonda', price: '80-150€' },
    { service: 'Sostituzione piletta/sifone', price: '80-150€' },
  ],
  'bidet-intasato-non-scarica': [
    { service: 'Disostruzione semplice', price: '50-80€' },
    { service: 'Disostruzione con sonda', price: '70-120€' },
  ],

  // ============ CALDAIE ============
  'caldaia-non-parte-blocco': [
    { service: 'Uscita + diagnosi', price: '50-80€' },
    { service: 'Reset e ripristino', price: '60-100€' },
    { service: 'Sostituzione componente', price: '100-400€' },
    { service: 'Manutenzione completa', price: '80-150€' },
  ],
  'caldaia-perde-acqua-sotto': [
    { service: 'Diagnosi perdita', price: '50-80€' },
    { service: 'Sostituzione valvola sicurezza', price: '60-120€' },
    { service: 'Sostituzione scambiatore', price: '250-500€' },
  ],
  'caldaia-non-scalda-acqua': [
    { service: 'Diagnosi e controllo', price: '50-80€' },
    { service: 'Sostituzione valvola 3 vie', price: '150-300€' },
    { service: 'Pulizia scambiatore', price: '100-180€' },
  ],
  'termosifoni-non-scaldano': [
    { service: 'Sfiatamento radiatori', price: '30-60€' },
    { service: 'Lavaggio impianto', price: '200-400€' },
    { service: 'Bilanciamento impianto', price: '100-200€' },
  ],
  'pressione-caldaia-bassa': [
    { service: 'Ricarica impianto + controllo', price: '40-70€' },
    { service: 'Ricerca perdita impianto', price: '80-150€' },
    { service: 'Sostituzione vaso espansione', price: '100-200€' },
  ],
  'calorifero-gocciola-pericolo': [
    { service: 'Riparazione raccordo', price: '40-80€' },
    { service: 'Sostituzione valvola', price: '50-100€' },
    { service: 'Sostituzione radiatore', price: '150-400€' },
  ],
};

// Related pricing pages by guide slug
const RELATED_PRICING_PAGES: Record<string, RelatedPricingPage> = {
  // Perdite
  'perdita-acqua-tubo-muro': { slug: '/costo-riparazione-perdita-acqua', title: 'Costi riparazione perdite acqua' },
  'tubo-perde-muro-urgente': { slug: '/costo-riparazione-perdita-acqua', title: 'Costi riparazione perdite acqua' },
  'perdita-acqua-soffitto-chi-chiamare': { slug: '/costo-riparazione-perdita-acqua', title: 'Costi riparazione perdite acqua' },
  'rubinetto-perde-acqua-goccia': { slug: '/costo-riparazione-perdita-acqua', title: 'Costi riparazione perdite' },
  'rubinetto-perde-continuamente-soluzione': { slug: '/costo-riparazione-perdita-acqua', title: 'Costi riparazione perdite' },
  'perdita-acqua-sotto-lavello': { slug: '/costo-riparazione-perdita-acqua', title: 'Costi riparazione perdite' },
  'perdita-acqua-termosifone': { slug: '/costo-riparazione-perdita-acqua', title: 'Costi riparazione perdite' },
  
  // Scarichi
  'wc-intasato-non-scarica': { slug: '/costo-disostruzione-scarichi', title: 'Costi disostruzione scarichi' },
  'scarico-doccia-intasato': { slug: '/costo-disostruzione-scarichi', title: 'Costi disostruzione scarichi' },
  'scarico-cucina-intasato': { slug: '/costo-disostruzione-scarichi', title: 'Costi disostruzione scarichi' },
  'lavandino-otturato-rimedi': { slug: '/costo-disostruzione-scarichi', title: 'Costi disostruzione scarichi' },
  'vasca-non-scarica-acqua': { slug: '/costo-disostruzione-scarichi', title: 'Costi disostruzione scarichi' },
  'bidet-intasato-non-scarica': { slug: '/costo-disostruzione-scarichi', title: 'Costi disostruzione scarichi' },
  
  // Caldaie
  'caldaia-non-parte-blocco': { slug: '/costo-manutenzione-caldaia', title: 'Costi manutenzione caldaia' },
  'caldaia-perde-acqua-sotto': { slug: '/costo-manutenzione-caldaia', title: 'Costi manutenzione caldaia' },
  'caldaia-non-scalda-acqua': { slug: '/costo-manutenzione-caldaia', title: 'Costi manutenzione caldaia' },
  'termosifoni-non-scaldano': { slug: '/costo-manutenzione-caldaia', title: 'Costi manutenzione caldaia' },
  'pressione-caldaia-bassa': { slug: '/costo-manutenzione-caldaia', title: 'Costi manutenzione caldaia' },
  'calorifero-gocciola-pericolo': { slug: '/costo-manutenzione-caldaia', title: 'Costi manutenzione caldaia' },
};

// Default costs for guides without specific data
const DEFAULT_COSTS: GuideCost[] = [
  { service: 'Uscita e diagnosi', price: '50-80€' },
  { service: 'Intervento base', price: '60-120€' },
  { service: 'Intervento complesso', price: '150-300€' },
  { service: 'Pronto intervento (maggiorazione)', price: '+30-50%' },
];

export function getGuideCosts(slug: string): GuideCost[] {
  return GUIDE_COSTS_DATA[slug] || DEFAULT_COSTS;
}

export function getRelatedPricingPage(slug: string): RelatedPricingPage | undefined {
  return RELATED_PRICING_PAGES[slug];
}
