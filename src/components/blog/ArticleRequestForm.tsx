import { WhatsAppCTABox } from '@/components/WhatsAppCTA';

interface ArticleRequestFormProps {
  interventionType?: string;
  problemContext?: string;
  title?: string;
  description?: string;
  compact?: boolean;
}

export function ArticleRequestForm({
  interventionType = 'altro',
  problemContext = '',
  title = 'Non si è ancora risolto?',
  description = 'Scrivici subito su WhatsApp: ti mettiamo in contatto con un idraulico qualificato nella tua zona.',
  compact = false,
}: ArticleRequestFormProps) {
  return (
    <WhatsAppCTABox
      title={title || undefined}
      description={description || undefined}
      interventionType={interventionType}
      problemContext={problemContext}
      compact={compact}
    />
  );
}
