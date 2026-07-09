import { AIChatCTA } from '@/components/AIChatCTA';

interface ArticleRequestFormProps {
  interventionType?: string;
  problemContext?: string;
  title?: string;
  description?: string;
  compact?: boolean;
}

export function ArticleRequestForm({
  problemContext = '',
  title,
  description,
  compact = false,
}: ArticleRequestFormProps) {
  return (
    <AIChatCTA
      variant={compact ? 'minimal' : 'inline'}
      title={title}
      description={description}
      problemContext={problemContext}
    />
  );
}
