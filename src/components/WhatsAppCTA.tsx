/**
 * WhatsAppCTA - Reusable WhatsApp call-to-action button
 *
 * Used across all SEO pages (blog, guides, city, problem+city, hub, pricing)
 * to send users directly to WhatsApp with a pre-filled message.
 */

import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/whatsappConfig';
import { cn } from '@/lib/utils';
import analytics from '@/lib/analytics';

interface WhatsAppCTAProps {
  cityName?: string;
  problemContext?: string;
  interventionType?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

export function WhatsAppCTA({
  cityName,
  problemContext,
  interventionType,
  label = 'Contattaci su WhatsApp',
  size = 'lg',
  fullWidth = false,
  className,
}: WhatsAppCTAProps) {
  const href = buildWhatsAppUrl({ cityName, problemContext, interventionType });

  const sizeClasses = {
    sm: 'text-sm px-4 py-2 gap-2',
    md: 'text-base px-5 py-3 gap-2',
    lg: 'text-lg px-6 py-4 gap-3',
  };

  const iconSize = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const handleClick = () => {
    try {
      (analytics as any)?.leadFormSubmit?.(
        interventionType || 'whatsapp',
        cityName || '',
        'whatsapp_click'
      );
    } catch {
      // analytics non bloccante
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={cn(
        'inline-flex items-center justify-center font-bold rounded-full',
        'bg-[#25D366] hover:bg-[#1ebe5d] text-white',
        'shadow-lg hover:shadow-xl transition-all duration-200',
        'transform hover:-translate-y-0.5 active:translate-y-0',
        sizeClasses[size],
        fullWidth && 'w-full',
        className
      )}
    >
      <MessageCircle className={cn(iconSize[size], 'fill-white')} />
      <span>{label}</span>
    </a>
  );
}

/**
 * WhatsAppCTABox - Full card-style CTA with title + WhatsApp button
 * Drop-in replacement for the lead-capture form boxes.
 */
interface WhatsAppCTABoxProps {
  title?: string;
  description?: string;
  cityName?: string;
  problemContext?: string;
  interventionType?: string;
  buttonLabel?: string;
  className?: string;
  compact?: boolean;
}

export function WhatsAppCTABox({
  title = 'Hai bisogno di un idraulico?',
  description = 'Scrivici subito su WhatsApp: ti rispondiamo in pochi minuti e ti mettiamo in contatto con un professionista nella tua zona.',
  cityName,
  problemContext,
  interventionType,
  buttonLabel = 'Contattaci ora su WhatsApp',
  className,
  compact = false,
}: WhatsAppCTABoxProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border-2 border-[#25D366]/30 bg-gradient-to-br from-[#25D366]/10 via-[#25D366]/5 to-[#25D366]/10',
        compact ? 'p-5' : 'p-6 md:p-8',
        'my-8 text-center shadow-md',
        className
      )}
    >
      {!compact && (
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg">
            <MessageCircle className="h-7 w-7 text-white fill-white" />
          </div>
        </div>
      )}

      <h3 className={cn('font-bold text-foreground mb-2', compact ? 'text-lg' : 'text-xl md:text-2xl')}>
        {title}
      </h3>
      <p className="text-muted-foreground mb-5 max-w-xl mx-auto">{description}</p>

      <WhatsAppCTA
        cityName={cityName}
        problemContext={problemContext}
        interventionType={interventionType}
        label={buttonLabel}
        size={compact ? 'md' : 'lg'}
      />

      <p className="text-xs text-muted-foreground mt-3">
        Risposta rapida • Servizio gratuito • Senza impegno
      </p>
    </div>
  );
}
