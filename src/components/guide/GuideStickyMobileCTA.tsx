/**
 * GuideStickyMobileCTA - Sticky WhatsApp CTA on mobile
 */

import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { buildWhatsAppUrl } from '@/lib/whatsappConfig';

export function GuideStickyMobileCTA() {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isMobile || !isVisible) return null;

  const href = buildWhatsAppUrl();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-background/95 backdrop-blur-sm border-t border-border shadow-lg">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold rounded-full px-6 py-3 shadow-lg transition-all"
      >
        <MessageCircle className="h-5 w-5 fill-white" />
        Contattaci su WhatsApp
      </a>
    </div>
  );
}
