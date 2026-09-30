import { WhatsAppCTABox } from '@/components/WhatsAppCTA';

interface PricingCTAProps {
  variant?: 'default' | 'urgent';
}

export function PricingCTA({ variant = 'default' }: PricingCTAProps) {
  if (variant === 'urgent') {
    return (
      <WhatsAppCTABox
        title="Hai questo problema adesso?"
        description="Scrivici subito su WhatsApp: ti rispondiamo in pochi minuti e troviamo un idraulico disponibile nella tua zona."
        buttonLabel="Contattaci ora su WhatsApp"
      />
    );
  }

  return (
    <WhatsAppCTABox
      title="🚨 Hai bisogno di un intervento?"
      description="Scrivici su WhatsApp e ricevi assistenza da un idraulico verificato della tua zona."
    />
  );
}
