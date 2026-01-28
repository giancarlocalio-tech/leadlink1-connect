/**
 * GuideAuthorBox - EEAT component showing content authorship
 * Displays author info and last update date for guides/hubs
 */

import { Calendar, Users } from 'lucide-react';

interface GuideAuthorBoxProps {
  updatedAt: string;
  className?: string;
}

export function GuideAuthorBox({ updatedAt, className = '' }: GuideAuthorBoxProps) {
  // Format date to Italian locale
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className={`flex flex-wrap items-center gap-4 text-sm text-muted-foreground ${className}`}>
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4" />
        <span>Contenuto a cura della <strong className="text-foreground">Redazione IdrauliciSubito</strong></span>
      </div>
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4" />
        <span>Aggiornato il {formatDate(updatedAt)}</span>
      </div>
    </div>
  );
}
