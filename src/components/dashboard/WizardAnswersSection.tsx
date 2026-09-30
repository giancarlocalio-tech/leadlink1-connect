import { FileText } from 'lucide-react';
import type { WizardAnswer } from '@/lib/types';

interface WizardAnswersSectionProps {
  answers: WizardAnswer[] | unknown;
}

// Helper to parse wizard answers from various formats
function parseWizardAnswers(data: unknown): WizardAnswer[] {
  if (!data) return [];
  if (Array.isArray(data)) {
    return data.filter(
      (item): item is WizardAnswer =>
        typeof item === 'object' &&
        item !== null &&
        'questionId' in item &&
        'answer' in item
    );
  }
  return [];
}

export function WizardAnswersSection({ answers }: WizardAnswersSectionProps) {
  const parsedAnswers = parseWizardAnswers(answers);
  
  if (parsedAnswers.length === 0) {
    return null;
  }

  return (
    <div className="p-4 bg-muted/30 border-t border-border">
      <div className="flex items-center gap-2 mb-3">
        <FileText className="h-4 w-4 text-primary" />
        <span className="font-medium text-sm text-foreground">Dettagli richiesta</span>
      </div>
      <div className="space-y-2">
        {parsedAnswers.map((answer, index) => (
          <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-1 text-sm">
            <span className="text-muted-foreground">{answer.questionTitle || answer.questionId}:</span>
            <span className="font-medium text-foreground">{answer.answer}</span>
          </div>
        ))}
      </div>
    </div>
  );
}