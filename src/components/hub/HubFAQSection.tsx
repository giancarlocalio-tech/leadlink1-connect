import { HelpCircle } from 'lucide-react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { HubFAQ } from '@/lib/hubPagesData';

interface HubFAQSectionProps {
  faqs: HubFAQ[];
}

export function HubFAQSection({ faqs }: HubFAQSectionProps) {
  return (
    <section id="faq" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-500/10 p-3 rounded-full">
          <HelpCircle className="h-6 w-6 text-purple-600" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold">Domande Frequenti</h2>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`faq-${index}`}>
            <AccordionTrigger className="text-left text-base md:text-lg font-medium">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
