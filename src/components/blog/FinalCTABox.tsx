import { ArticleRequestForm } from './ArticleRequestForm';

interface FinalCTABoxProps {
  title?: string;
  description?: string;
  interventionType?: string;
  problemContext?: string;
}

export function FinalCTABox({ 
  title = "Non si è ancora sturato?",
  description = "Il problema potrebbe essere più profondo. Trova subito un idraulico qualificato vicino a te.",
  interventionType = 'altro',
  problemContext = ''
}: FinalCTABoxProps) {
  return (
    <ArticleRequestForm
      title={title}
      description={description}
      interventionType={interventionType}
      problemContext={problemContext}
    />
  );
}
