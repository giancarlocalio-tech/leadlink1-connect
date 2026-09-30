import { WhatsAppCTABox } from '@/components/WhatsAppCTA';

interface FinalCTABoxProps {
  title?: string;
  description?: string;
  interventionType?: string;
  problemContext?: string;
}

export function FinalCTABox({
  title = 'Hai bisogno di un professionista?',
  description = 'Scrivici subito su WhatsApp: ti rispondiamo in pochi minuti e troviamo un idraulico nella tua zona.',
  interventionType = 'altro',
  problemContext = '',
}: FinalCTABoxProps) {
  return (
    <WhatsAppCTABox
      title={`🔧 ${title}`}
      description={description}
      interventionType={interventionType}
      problemContext={problemContext}
    />
  );
}
