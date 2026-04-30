/**
 * WhatsApp configuration
 * Central place to manage the business WhatsApp number and message builders.
 */

// Business WhatsApp number (international format, no spaces, no '+')
export const WHATSAPP_NUMBER = '393917787994';

interface BuildMessageOptions {
  cityName?: string;
  problemContext?: string;
  interventionType?: string;
  pageUrl?: string;
}

const PRETTY_INTERVENTION: Record<string, string> = {
  perdita: 'una perdita d\'acqua',
  scarico: 'uno scarico otturato',
  caldaia: 'un problema alla caldaia',
  rubinetto: 'un problema al rubinetto',
  wc: 'un problema al WC',
  boiler: 'un problema al boiler',
  altro: 'un intervento idraulico',
};

export function buildWhatsAppMessage(opts: BuildMessageOptions = {}): string {
  const { cityName, problemContext, interventionType } = opts;

  const what = interventionType && PRETTY_INTERVENTION[interventionType.toLowerCase()]
    ? PRETTY_INTERVENTION[interventionType.toLowerCase()]
    : 'un idraulico';

  const where = cityName ? ` a ${cityName}` : '';
  const detail = problemContext ? `\n\nDettaglio: ${problemContext}` : '';

  return `Ciao! Ho bisogno di ${what}${where}. Potete aiutarmi?${detail}`;
}

export function buildWhatsAppUrl(opts: BuildMessageOptions = {}): string {
  const message = buildWhatsAppMessage(opts);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
