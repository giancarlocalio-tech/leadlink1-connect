/**
 * GuideCTABox — CTA verso l'Idraulico AI (chat gratis, sblocco 4,95€).
 * Wrapper legacy: rende il nuovo AIChatCTA con le varianti richieste.
 */

import { AIChatCTA } from '@/components/AIChatCTA';

interface GuideCTABoxProps {
  variant?: 'default' | 'urgent' | 'minimal';
  className?: string;
  problemContext?: string;
}

export function GuideCTABox({
  variant = 'default',
  className = '',
  problemContext,
}: GuideCTABoxProps) {
  return (
    <AIChatCTA
      variant={variant}
      className={className}
      problemContext={problemContext}
    />
  );
}
