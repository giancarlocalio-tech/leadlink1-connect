/**
 * GuideCTABox - WhatsApp-powered CTA for guide pages
 */

import { WhatsAppCTA, WhatsAppCTABox } from '@/components/WhatsAppCTA';
import { cn } from '@/lib/utils';

interface GuideCTABoxProps {
  variant?: 'default' | 'urgent' | 'minimal';
  className?: string;
}

export function GuideCTABox({ variant = 'default', className = '' }: GuideCTABoxProps) {
  if (variant === 'minimal') {
    return (
      <div className={cn('my-6 p-4 bg-muted/50 rounded-lg border border-border', className)}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            <strong className="text-foreground">Hai bisogno di un intervento?</strong> Scrivici su WhatsApp.
          </p>
          <WhatsAppCTA size="sm" label="Contattaci ora" />
        </div>
      </div>
    );
  }

  if (variant === 'urgent') {
    return (
      <WhatsAppCTABox
        title="🚨 Hai questo problema adesso?"
        description="Scrivici su WhatsApp: ti rispondiamo subito e troviamo un idraulico disponibile nella tua zona."
        buttonLabel="Contattaci ora su WhatsApp"
        className={className}
      />
    );
  }

  return (
    <WhatsAppCTABox
      title="🚨 Hai bisogno di un intervento?"
      description="Scrivici su WhatsApp e ti mettiamo in contatto con un idraulico verificato della tua zona."
      className={className}
    />
  );
}
