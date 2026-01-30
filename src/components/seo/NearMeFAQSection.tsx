import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const NEAR_ME_FAQS = [
  {
    question: "Quanto tempo impiega un idraulico vicino a me ad arrivare?",
    answer: "In caso di urgenza molti idraulici possono intervenire in giornata, spesso entro poche ore, soprattutto se si trovano nella tua zona."
  },
  {
    question: "Posso trovare un idraulico vicino a me anche di notte o nei festivi?",
    answer: "Sì, molti tecnici offrono servizio di pronto intervento 24 ore su 24, inclusi weekend e festivi, per emergenze come perdite d'acqua o allagamenti."
  },
  {
    question: "Come faccio a scegliere un idraulico vicino a me affidabile?",
    answer: "Controlla recensioni, chiedi sempre un preventivo prima dell'intervento e assicurati che il tecnico sia specializzato nel tipo di problema che devi risolvere."
  }
];

export function NearMeFAQSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Domande frequenti su come trovare un idraulico vicino a me
        </h2>
        
        <Accordion type="single" collapsible className="space-y-4">
          {NEAR_ME_FAQS.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`faq-${index}`}
              className="bg-card border border-border rounded-lg px-6"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

// Generate FAQ JSON-LD schema
export function generateNearMeFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": NEAR_ME_FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}
