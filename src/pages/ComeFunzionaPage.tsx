/**
 * Come Funziona Page - EEAT Trust Page
 * Explains the service process with HowTo and FAQ schema
 */

import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { WhatsAppCTA } from '@/components/WhatsAppCTA';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  MessageSquare, 
  Phone, 
  FileCheck, 
  Wrench,
  ArrowRight,
  Clock,
  Euro,
  Shield,
  HelpCircle
} from 'lucide-react';

const BASE_URL = 'https://www.idraulicisubito.com';

const steps = [
  {
    icon: MessageSquare,
    number: '1',
    title: 'Invia la Richiesta',
    description: 'Descrivi il problema idraulico che hai riscontrato. Indica la tipologia di intervento (perdita, scarico, caldaia, ecc.), la tua città e l\'urgenza. Il modulo richiede meno di un minuto.',
    details: [
      'Nessuna registrazione richiesta',
      'Indica il tipo di problema',
      'Specifica la tua zona',
      'Scegli il livello di urgenza'
    ]
  },
  {
    icon: Phone,
    number: '2',
    title: 'Vieni Contattato',
    description: 'La tua richiesta viene inoltrata agli idraulici che operano nella tua zona e sono disponibili. Un professionista interessato ti contatterà direttamente per capire meglio la situazione.',
    details: [
      'Contatto diretto con il professionista',
      'Tempi di risposta variabili in base all\'urgenza',
      'Possibilità di descrivere il problema a voce',
      'Nessun intermediario nella comunicazione'
    ]
  },
  {
    icon: FileCheck,
    number: '3',
    title: 'Ricevi il Preventivo',
    description: 'Il professionista ti fornisce un preventivo per l\'intervento. Puoi chiedere chiarimenti sui costi, sui tempi e sulle modalità di lavoro prima di prendere qualsiasi decisione.',
    details: [
      'Preventivo chiaro prima dell\'intervento',
      'Possibilità di chiedere dettagli',
      'Nessun obbligo di accettare',
      'Confronta con altre opzioni se vuoi'
    ]
  },
  {
    icon: Wrench,
    number: '4',
    title: 'Intervento',
    description: 'Se decidi di procedere, il professionista esegue l\'intervento. Il rapporto economico e lavorativo avviene direttamente tra te e l\'idraulico, senza intermediari.',
    details: [
      'Accordi diretti con il professionista',
      'Fattura rilasciata dal professionista',
      'Garanzia sui lavori secondo accordi',
      'Nessuna commissione della piattaforma'
    ]
  }
];

const faqs = [
  {
    question: 'Quanto tempo ci vuole per ricevere una risposta?',
    answer: 'I tempi dipendono dall\'urgenza indicata e dalla disponibilità dei professionisti nella tua zona. Per richieste urgenti, le risposte arrivano generalmente entro 15-30 minuti. Per interventi programmabili, potresti ricevere contatto entro qualche ora.'
  },
  {
    question: 'Il servizio è gratuito?',
    answer: 'Sì, richiedere un preventivo tramite IdrauliciSubito è completamente gratuito per i clienti. Non ci sono costi nascosti per l\'invio della richiesta o per ricevere il contatto del professionista.'
  },
  {
    question: 'Sono obbligato ad accettare il preventivo?',
    answer: 'No, non hai nessun obbligo. Ricevi il contatto di un professionista e un preventivo, poi sei libero di decidere se procedere o meno. Puoi anche chiedere altri preventivi prima di scegliere.'
  },
  {
    question: 'Come vengono selezionati gli idraulici?',
    answer: 'Gli idraulici si registrano sulla piattaforma indicando la loro zona operativa e disponibilità. Ogni professionista gestisce autonomamente il proprio profilo e decide quali richieste accettare.'
  },
  {
    question: 'Cosa succede se non sono soddisfatto dell\'intervento?',
    answer: 'Il rapporto è diretto tra te e il professionista. In caso di problemi, ti consigliamo di contattare direttamente l\'idraulico per risolvere la situazione. La maggior parte dei professionisti offre garanzia sui lavori eseguiti.'
  },
  {
    question: 'Posso richiedere interventi urgenti di notte o nei weekend?',
    answer: 'Sì, molti professionisti sulla piattaforma offrono disponibilità per emergenze 24/7. Indica l\'urgenza nella richiesta e specifica se hai bisogno di un intervento immediato. Tieni presente che gli interventi fuori orario possono avere costi maggiorati.'
  },
  {
    question: 'In quali città è attivo il servizio?',
    answer: 'IdrauliciSubito è attivo in oltre 50 città italiane, con particolare copertura nelle principali aree metropolitane: Milano, Roma, Napoli, Torino, Bologna, Firenze, e molte altre. La copertura dipende dalla presenza di professionisti registrati nella zona.'
  },
  {
    question: 'I preventivi includono IVA e materiali?',
    answer: 'Dipende dal professionista. Ti consigliamo sempre di chiedere un preventivo dettagliato che specifichi cosa è incluso: manodopera, materiali, IVA, eventuali costi di uscita. Un buon professionista sarà trasparente su tutti i costi.'
  }
];

export default function ComeFunzionaPage() {
  const canonicalUrl = `${BASE_URL}/come-funziona`;

  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Come richiedere un idraulico su IdrauliciSubito',
    description: 'Guida passo passo per richiedere l\'intervento di un idraulico professionista tramite IdrauliciSubito.',
    totalTime: 'PT5M',
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title,
      text: step.description
    }))
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Come Funziona', item: canonicalUrl }
    ]
  };

  return (
    <Layout>
      <Helmet>
        <title>Come Funziona | IdrauliciSubito - Richiedi un Idraulico in 4 Passi</title>
        <meta 
          name="description" 
          content="Scopri come funziona IdrauliciSubito: invia la richiesta, vieni contattato da un idraulico della tua zona, ricevi il preventivo e decidi. Gratuito e senza impegno." 
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(howToJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <section className="bg-muted/30 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span className="text-foreground">Come Funziona</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Come Funziona IdrauliciSubito
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Trova un idraulico professionista nella tua zona in 4 semplici passi. 
              Il servizio è gratuito per i clienti e senza nessun obbligo.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full">
                <Clock className="h-4 w-4 text-primary" />
                <span>Richiesta in 1 minuto</span>
              </div>
              <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full">
                <Euro className="h-4 w-4 text-primary" />
                <span>Gratuito per i clienti</span>
              </div>
              <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full">
                <Shield className="h-4 w-4 text-primary" />
                <span>Nessun obbligo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {steps.map((step, index) => (
                <Card key={step.number} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Step Number */}
                      <div className="bg-primary/10 p-6 md:p-8 flex items-center justify-center md:w-32">
                        <div className="text-4xl md:text-5xl font-bold text-primary">
                          {step.number}
                        </div>
                      </div>
                      {/* Step Content */}
                      <div className="p-6 md:p-8 flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <step.icon className="h-6 w-6 text-primary" />
                          <h2 className="text-xl md:text-2xl font-bold">{step.title}</h2>
                        </div>
                        <p className="text-muted-foreground mb-4">{step.description}</p>
                        <ul className="grid sm:grid-cols-2 gap-2">
                          {step.details.map((detail, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Pronto a Iniziare?
            </h2>
            <p className="text-muted-foreground mb-6">
              Descrivi il tuo problema e trova un idraulico nella tua zona. 
              È completamente gratuito e non hai nessun obbligo.
            </p>
            <WhatsAppCTA size="lg" label="Contattaci su WhatsApp" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-8 justify-center">
              <div className="bg-primary/10 p-3 rounded-full">
                <HelpCircle className="h-6 w-6 text-primary" />
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
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">
              Hai Altre Domande?
            </h2>
            <p className="text-muted-foreground mb-6">
              Contattaci per qualsiasi dubbio sul funzionamento del servizio.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contatti">
                <Button variant="outline">
                  Contattaci
                </Button>
              </Link>
              <WhatsAppCTA label="Contattaci su WhatsApp" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
