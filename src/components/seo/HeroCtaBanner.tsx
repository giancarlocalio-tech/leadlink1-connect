/**
 * HeroCtaBanner - Above-the-fold WhatsApp CTA banner
 */

import { Clock, Shield } from 'lucide-react';
import { WhatsAppCTA } from '@/components/WhatsAppCTA';

interface HeroCtaBannerProps {
  cityName: string;
  problemContext?: string;
}

export function HeroCtaBanner({ cityName, problemContext }: HeroCtaBannerProps) {
  return (
    <div className="bg-gradient-to-r from-[#25D366]/10 via-[#25D366]/5 to-[#25D366]/10 border-y border-[#25D366]/20">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-4 w-4 text-[#25D366]" />
              <span>
                Risposta in <strong className="text-foreground">pochi minuti</strong>
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-muted-foreground">
              <Shield className="h-4 w-4 text-[#25D366]" />
              <span>
                Idraulici <strong className="text-foreground">verificati</strong>
              </span>
            </div>
          </div>
          <WhatsAppCTA
            cityName={cityName}
            problemContext={problemContext}
            label={`Scrivici per ${cityName}`}
            size="sm"
          />
        </div>
      </div>
    </div>
  );
}
