/**
 * MidArticleCTA - Mid-article WhatsApp CTA
 */

import { MessageCircle } from 'lucide-react';
import { WhatsAppCTA } from '@/components/WhatsAppCTA';
import { buildWhatsAppUrl } from '@/lib/whatsappConfig';

interface MidArticleCTAProps {
  cityName: string;
  problemContext?: string;
  variant?: 'compact' | 'full';
}

export function MidArticleCTA({
  cityName,
  problemContext,
  variant = 'compact',
}: MidArticleCTAProps) {
  if (variant === 'compact') {
    return (
      <div className="bg-[#25D366]/5 border border-[#25D366]/30 rounded-xl p-4 md:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 my-6">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <MessageCircle className="h-5 w-5 text-[#25D366] shrink-0 hidden sm:block fill-[#25D366]" />
          <p className="text-foreground font-medium">
            Non riesci a risolvere?{' '}
            <span className="text-[#1ebe5d]">Scrivici su WhatsApp da {cityName}</span>
          </p>
        </div>
        <WhatsAppCTA
          cityName={cityName}
          problemContext={problemContext}
          label="Contattaci"
          size="sm"
        />
      </div>
    );
  }

  // Full variant
  const href = buildWhatsAppUrl({ cityName, problemContext });
  return (
    <div className="bg-gradient-to-r from-[#25D366] to-[#1ebe5d] rounded-2xl p-6 md:p-8 text-white my-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-xl md:text-2xl font-bold mb-2">
            Trova un Idraulico a {cityName} Ora
          </h3>
          <p className="text-white/90 max-w-md">
            Scrivici su WhatsApp: ti rispondiamo subito e organizziamo l'intervento.
          </p>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-2 bg-white text-[#1ebe5d] font-bold rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all"
        >
          <MessageCircle className="h-5 w-5 fill-[#1ebe5d]" />
          Scrivici ora
        </a>
      </div>
    </div>
  );
}
