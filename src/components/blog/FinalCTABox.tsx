import { AIChatCTA } from '@/components/AIChatCTA';

interface FinalCTABoxProps {
  title?: string;
  description?: string;
  interventionType?: string;
  problemContext?: string;
}

export function FinalCTABox({
  title,
  description,
  problemContext = '',
}: FinalCTABoxProps) {
  return (
    <AIChatCTA
      variant="default"
      title={title}
      description={description}
      problemContext={problemContext}
    />
  );
}
