import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export interface BlogFAQItem {
  question: string;
  answer: string;
}

// Generate FAQs based on article topic
function generateFAQs(articleSlug: string, articleTitle: string): BlogFAQItem[] {
  const lowerSlug = articleSlug.toLowerCase();
  const lowerTitle = articleTitle.toLowerCase();
  
  // WC / Water intasato
  if (lowerSlug.includes('wc') || lowerSlug.includes('water') || lowerTitle.includes('wc')) {
    return [
      {
        question: 'Posso sturare il WC da solo senza chiamare l\'idraulico?',
        answer: 'Sì, nella maggior parte dei casi puoi provare con ventosa, acqua calda e detersivo, o bicarbonato e aceto. Se dopo 2-3 tentativi il problema persiste, è meglio chiamare un professionista per evitare danni alle tubature.'
      },
      {
        question: 'Quanto costa far sturare il WC da un idraulico?',
        answer: 'Il costo medio per sturaccare un WC va da 60€ a 150€ in orario normale. Per interventi urgenti, notturni o festivi, il prezzo può salire a 150€-250€. Se serve videoispezione o idrogetto, i costi aumentano.'
      },
      {
        question: 'È urgente chiamare l\'idraulico per un WC intasato?',
        answer: 'Se hai un solo bagno e il WC è completamente bloccato, è urgente. Se l\'acqua risale o trabocca, chiudi subito la valvola dell\'acqua e chiama un idraulico. Se scarica lentamente, puoi provare i metodi fai-da-te prima.'
      },
      {
        question: 'Quanto tempo ci vuole per sturare un WC?',
        answer: 'Con i metodi fai-da-te, puoi risolvere in 10-30 minuti se l\'ostruzione è leggera. Un idraulico professionista risolve in 30-60 minuti anche i casi più complessi, usando strumenti professionali.'
      }
    ];
  }
  
  // Lavandino intasato
  if (lowerSlug.includes('lavandino') || lowerTitle.includes('lavandino')) {
    return [
      {
        question: 'Posso sturare il lavandino senza prodotti chimici?',
        answer: 'Assolutamente sì. Bicarbonato e aceto, acqua bollente, o la ventosa sono metodi naturali ed efficaci. Evita i disgorganti chimici aggressivi che possono danneggiare le tubature nel tempo.'
      },
      {
        question: 'Quanto costa far sturare un lavandino?',
        answer: 'Un intervento standard di sturamento lavandino costa tra 50€ e 120€. Se serve smontare il sifone o intervenire su ostruzioni profonde con sonda, il costo sale a 100€-180€.'
      },
      {
        question: 'Ogni quanto dovrei pulire lo scarico del lavandino?',
        answer: 'Per prevenire intasamenti, versa acqua bollente nello scarico una volta a settimana e pulisci il filtro ogni 15 giorni. Una pulizia profonda con bicarbonato e aceto ogni 1-2 mesi è ideale.'
      },
      {
        question: 'Quando il lavandino intasato diventa un\'emergenza?',
        answer: 'È urgente se l\'acqua non defluisce affatto e il lavandino è l\'unico della casa, se senti cattivi odori di fogna, o se noti acqua che risale da altri scarichi. In questi casi chiama subito un idraulico.'
      }
    ];
  }
  
  // Caldaia
  if (lowerSlug.includes('caldaia') || lowerTitle.includes('caldaia')) {
    return [
      {
        question: 'Posso riparare la caldaia da solo?',
        answer: 'Solo controlli di base come pressione, reset e verifica gas. Per qualsiasi intervento tecnico interno alla caldaia è obbligatorio chiamare un tecnico abilitato. Intervenire da soli può essere pericoloso e invalida la garanzia.'
      },
      {
        question: 'Quanto costa la riparazione di una caldaia?',
        answer: 'Dipende dal guasto: un reset o regolazione costa 50€-80€, sostituzione componenti 100€-300€, riparazione complessa 200€-500€. La manutenzione annuale obbligatoria costa 80€-150€.'
      },
      {
        question: 'In quanto tempo arriva il tecnico per la caldaia?',
        answer: 'Per emergenze invernali (caldaia in blocco senza riscaldamento), i servizi pronto intervento arrivano in 2-4 ore. Per guasti non urgenti, di solito entro 24-48 ore lavorative.'
      },
      {
        question: 'La caldaia in blocco è un\'emergenza?',
        answer: 'In inverno sì, soprattutto se hai bambini, anziani o persone fragili in casa. Se senti odore di gas, è un\'emergenza assoluta: apri le finestre, non usare interruttori elettrici e chiama subito il pronto intervento.'
      }
    ];
  }
  
  // Doccia
  if (lowerSlug.includes('doccia') || lowerTitle.includes('doccia')) {
    return [
      {
        question: 'Come posso prevenire che la doccia si intasi?',
        answer: 'Usa un filtro raccogli-capelli sulla griglia, puliscilo dopo ogni doccia, e versa acqua bollente nello scarico settimanalmente. Evita che grandi quantità di capelli finiscano nello scarico.'
      },
      {
        question: 'Quanto costa far sturare lo scarico della doccia?',
        answer: 'Un intervento di sturamento doccia costa mediamente 60€-130€. Se serve intervenire sul sifone incassato o sulla colonna di scarico, il prezzo può salire a 150€-250€.'
      },
      {
        question: 'Devo chiamare l\'idraulico se la doccia scarica lentamente?',
        answer: 'Prima prova i metodi fai-da-te: rimuovi capelli visibili, usa bicarbonato e aceto, prova la ventosa. Se dopo 2-3 tentativi il problema persiste, chiama un professionista prima che peggiori.'
      },
      {
        question: 'Lo scarico doccia lento può causare danni?',
        answer: 'Sì, a lungo andare. L\'acqua stagnante può infiltrarsi nelle fughe, causare muffe, danneggiare il piatto doccia e le strutture sottostanti. Meglio risolvere subito.'
      }
    ];
  }
  
  // Rubinetto
  if (lowerSlug.includes('rubinetto') || lowerTitle.includes('rubinetto')) {
    return [
      {
        question: 'Posso sostituire la guarnizione del rubinetto da solo?',
        answer: 'Sì, è un intervento fai-da-te fattibile. Ti servono solo cacciavite, chiave inglese e la guarnizione giusta. Chiudi l\'acqua, smonta la manopola, sostituisci la guarnizione e rimonta.'
      },
      {
        question: 'Quanto costa far riparare un rubinetto che gocciola?',
        answer: 'La sostituzione di una guarnizione costa 40€-70€. Se serve sostituire la cartuccia di un miscelatore moderno, 60€-120€. La sostituzione completa del rubinetto parte da 80€-150€ più il costo del rubinetto.'
      },
      {
        question: 'Un rubinetto che gocciola spreca molta acqua?',
        answer: 'Sì, molto più di quanto pensi. Un rubinetto che perde 1 goccia al secondo spreca circa 20 litri al giorno, oltre 7.000 litri all\'anno. Ripararlo fa bene all\'ambiente e al portafoglio.'
      },
      {
        question: 'Quando devo chiamare l\'idraulico per un rubinetto?',
        answer: 'Se dopo aver sostituito guarnizione e cartuccia continua a gocciolare, se la sede è corrosa, se ci sono perdite dai raccordi, o se non riesci a smontare i componenti ossidati.'
      }
    ];
  }
  
  // Tubo che perde / Allagamento
  if (lowerSlug.includes('tubo') || lowerSlug.includes('perdita') || lowerSlug.includes('allagamento')) {
    return [
      {
        question: 'Cosa devo fare subito se un tubo perde acqua?',
        answer: 'Chiudi immediatamente la valvola generale dell\'acqua, posiziona contenitori sotto la perdita, e se l\'acqua è vicina a prese elettriche stacca la corrente. Poi chiama un idraulico per la riparazione.'
      },
      {
        question: 'Quanto costa riparare un tubo che perde?',
        answer: 'Una riparazione semplice con fascetta o nastro costa 60€-100€. Se serve sostituire un tratto di tubo, 100€-250€. Se il tubo è nel muro o nel pavimento, i costi salgono a 200€-500€ per la rottura e ripristino.'
      },
      {
        question: 'Le riparazioni fai-da-te sui tubi sono sicure?',
        answer: 'Sono soluzioni temporanee di emergenza. Nastro autoagglomerante, fascette e stucco epossidico possono fermare la perdita temporaneamente, ma serve sempre un intervento professionale definitivo.'
      },
      {
        question: 'Come faccio a trovare una perdita nascosta?',
        answer: 'Controlla il contatore dell\'acqua: se gira con tutti i rubinetti chiusi, c\'è una perdita. Cerca macchie di umidità, muffa, pavimenti più caldi, o cali di pressione. Un idraulico può usare la termocamera o il cercaperdite acustico.'
      }
    ];
  }
  
  // Termosifone
  if (lowerSlug.includes('termosifone') || lowerSlug.includes('sfiata') || lowerTitle.includes('termosifone')) {
    return [
      {
        question: 'Quanto spesso devo sfiatare i termosifoni?',
        answer: 'Idealmente all\'inizio di ogni stagione invernale. Se senti gorgoglii o noti termosifoni freddi in alto e caldi in basso, sfiata subito. Se devi farlo spesso, potrebbe esserci una perdita nell\'impianto.'
      },
      {
        question: 'Posso sfiatare i termosifoni da solo?',
        answer: 'Sì, è un\'operazione semplice. Ti serve solo una chiave per sfiato (o cacciavite piatto) e uno straccio. Apri la valvolina di sfiato, lascia uscire l\'aria finché non esce acqua, poi richiudi.'
      },
      {
        question: 'Il termosifone freddo è sempre da sfiatare?',
        answer: 'Non sempre. Potrebbe essere un problema di circolazione, valvola bloccata, o calcare nell\'impianto. Se dopo lo sfiato resta freddo, chiama un tecnico per verificare l\'impianto.'
      },
      {
        question: 'Quanto costa far controllare l\'impianto di riscaldamento?',
        answer: 'Un controllo completo dell\'impianto costa 80€-150€. La sostituzione di una valvola termosifone 50€-100€. Il lavaggio chimico dell\'impianto 150€-300€.'
      }
    ];
  }
  
  // Manutenzione generale
  if (lowerSlug.includes('manutenzione') || lowerTitle.includes('manutenzione')) {
    return [
      {
        question: 'Ogni quanto va fatta la manutenzione dell\'impianto idraulico?',
        answer: 'La caldaia richiede manutenzione annuale obbligatoria. Per il resto dell\'impianto, un controllo ogni 2-3 anni è consigliato. Scarichi e sifoni andrebbero puliti ogni 3-6 mesi.'
      },
      {
        question: 'Quanto costa un contratto di manutenzione annuale?',
        answer: 'Un contratto base per la caldaia costa 100€-200€/anno e include manutenzione ordinaria e chiamate prioritarie. Contratti più completi (caldaia + impianto) partono da 200€-350€/anno.'
      },
      {
        question: 'La manutenzione preventiva fa davvero risparmiare?',
        answer: 'Assolutamente sì. Prevenire costa molto meno che riparare. Una caldaia ben mantenuta dura 15-20 anni invece di 10, e consuma meno. Un\'ostruzione prevenuta evita allagamenti costosi.'
      },
      {
        question: 'Quali sono i segnali che serve manutenzione?',
        answer: 'Scarichi lenti, rumori nelle tubature, cali di pressione, acqua che non si scalda bene, bollette anomale, macchie di umidità. Non aspettare l\'emergenza: intervieni ai primi segnali.'
      }
    ];
  }
  
  // Default FAQs for generic articles
  return [
    {
      question: 'Posso risolvere questo problema da solo?',
      answer: 'Per problemi semplici, i metodi fai-da-te possono essere efficaci. Tuttavia, se il problema persiste dopo 2-3 tentativi o se noti segnali gravi, è meglio chiamare un professionista per evitare danni maggiori.'
    },
    {
      question: 'Quanto costa chiamare un idraulico?',
      answer: 'I costi variano in base al tipo di intervento: da 50€-80€ per riparazioni semplici, a 100€-200€ per interventi standard, fino a 200€-400€ per lavori complessi. Gli interventi urgenti o notturni hanno maggiorazioni del 30-50%.'
    },
    {
      question: 'È una situazione urgente?',
      answer: 'È urgente se c\'è allagamento in corso, perdite d\'acqua consistenti, rischio per la sicurezza (gas, elettricità), o se la situazione sta peggiorando rapidamente. In questi casi, chiama subito un servizio di pronto intervento.'
    },
    {
      question: 'In quanto tempo arriva l\'idraulico?',
      answer: 'Per emergenze, i servizi di pronto intervento arrivano in 1-3 ore. Per interventi programmati, di solito entro 24-48 ore. Nei periodi di alta stagione (inverno per caldaie) i tempi possono allungarsi.'
    }
  ];
}

interface BlogArticleFAQProps {
  articleSlug: string;
  articleTitle: string;
}

export function BlogArticleFAQ({ articleSlug, articleTitle }: BlogArticleFAQProps) {
  const faqs = generateFAQs(articleSlug, articleTitle);
  
  return (
    <section className="my-12 scroll-mt-24" id="faq">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
          <HelpCircle className="h-6 w-6 text-secondary-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          Domande Frequenti
        </h2>
      </div>
      
      <Accordion type="single" collapsible className="w-full space-y-2">
        {faqs.map((faq, index) => (
          <AccordionItem 
            key={index} 
            value={`faq-${index}`}
            className="border border-border rounded-xl px-4 bg-muted/20"
          >
            <AccordionTrigger className="text-left text-base font-medium hover:no-underline py-4">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

// Export function to get FAQs for JSON-LD schema
export function getBlogArticleFAQs(articleSlug: string, articleTitle: string): BlogFAQItem[] {
  return generateFAQs(articleSlug, articleTitle);
}
