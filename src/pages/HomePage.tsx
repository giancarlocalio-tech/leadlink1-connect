import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Droplets, 
  Wrench, 
  Trash2, 
  Flame, 
  HelpCircle, 
  ArrowRight,
  ArrowLeft,
  ShowerHead,
  Thermometer,
  Wind,
  Home,
  FileCheck,
  Gauge,
  Pipette,
  X,
  Search,
  CheckCircle,
  Clock,
  MapPin,
  Shield,
  Star,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Layout } from '@/components/Layout';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { InterventionType } from '@/lib/types';
import { INTERVENTION_LABELS } from '@/lib/types';
import { CATEGORY_FLOWS, getNextQuestionId, type WizardQuestion } from '@/lib/wizardConfig';
import { CityAutocomplete, type ItalianCity } from '@/components/CityAutocomplete';
import analytics from '@/lib/analytics';
import { generateJsonLd, BASE_URL } from '@/lib/seoJsonLd';
import heroPlumber from '@/assets/hero-plumber-2026.jpg';
import plumberMarco from '@/assets/plumber-marco.jpg';
import plumberGiuseppe from '@/assets/plumber-giuseppe.jpg';
import plumberLuca from '@/assets/plumber-luca.jpg';
import { TOP_50_CITIES } from '@/lib/seoConfig';
import { buildWhatsAppUrl } from '@/lib/whatsappConfig';
import { CITIES } from '@/lib/seoData';

// Get ALL Top 50 cities data for internal linking (SEO critical)
const TOP_50_CITY_LINKS = CITIES.filter(city => 
  TOP_50_CITIES.includes(city.slug as any)
).sort((a, b) => {
  // Sort by population (largest first)
  const popA = parseInt(a.population.replace(/\./g, ''));
  const popB = parseInt(b.population.replace(/\./g, ''));
  return popB - popA;
});

// All intervention types for the first selection
const ALL_INTERVENTION_TYPES: InterventionType[] = [
  'installazione_sostituzione',
  'perdita_acqua',
  'sturare_spurgo',
  'riparazione',
  'impianto_idraulico',
  'box_doccia',
  'caldaia',
  'impianto_riscaldamento',
  'termoidraulico',
  'condizionatori',
  'ristrutturazione',
  'certificazione',
  'termosifone',
  'contatore',
  'addolcitore_acqua',
  'depuratore_acqua',
  'sostituzione_rubinetto',
  'altro',
];

// Icons for intervention types
const INTERVENTION_ICONS: Partial<Record<InterventionType, React.ReactNode>> = {
  installazione_sostituzione: <Wrench className="h-5 w-5" />,
  perdita_acqua: <Droplets className="h-5 w-5" />,
  sturare_spurgo: <Trash2 className="h-5 w-5" />,
  riparazione: <Wrench className="h-5 w-5" />,
  impianto_idraulico: <Pipette className="h-5 w-5" />,
  box_doccia: <ShowerHead className="h-5 w-5" />,
  caldaia: <Flame className="h-5 w-5" />,
  impianto_riscaldamento: <Thermometer className="h-5 w-5" />,
  termoidraulico: <Thermometer className="h-5 w-5" />,
  condizionatori: <Wind className="h-5 w-5" />,
  ristrutturazione: <Home className="h-5 w-5" />,
  certificazione: <FileCheck className="h-5 w-5" />,
  termosifone: <Thermometer className="h-5 w-5" />,
  contatore: <Gauge className="h-5 w-5" />,
  addolcitore_acqua: <Droplets className="h-5 w-5" />,
  depuratore_acqua: <Droplets className="h-5 w-5" />,
  sostituzione_rubinetto: <Wrench className="h-5 w-5" />,
  altro: <HelpCircle className="h-5 w-5" />,
};

interface WizardAnswerLocal {
  questionId: string;
  questionTitle: string;
  answer: string;
}

export default function HomePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'intervention' | 'questions' | 'city'>('intervention');
  const [selectedType, setSelectedType] = useState<InterventionType | null>(null);
  const [answers, setAnswers] = useState<WizardAnswerLocal[]>([]);
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(null);
  const [city, setCity] = useState('');
  const [selectedCity, setSelectedCity] = useState<ItalianCity | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Track wizard open
  const openWizard = () => {
    setShowModal(true);
    analytics.wizardOpen();
  };

  const filteredTypes = ALL_INTERVENTION_TYPES.filter(type =>
    INTERVENTION_LABELS[type].toLowerCase().includes(searchFilter.toLowerCase())
  );

  const getCurrentFlow = () => {
    if (!selectedType) return null;
    return CATEGORY_FLOWS[selectedType] || null;
  };

  const getCurrentQuestion = (): WizardQuestion | null => {
    const flow = getCurrentFlow();
    if (!flow || !currentQuestionId) return null;
    return flow.questions[currentQuestionId] || null;
  };

  const getCurrentPriceRange = (): string | null => {
    const question = getCurrentQuestion();
    return question?.priceRange || null;
  };

  const getAnswersSummary = (): string => {
    return answers.map(a => a.answer).join(' → ');
  };

  const handleSelectType = (type: InterventionType) => {
    setSelectedType(type);
    setAnswers([]);
    
    const flow = CATEGORY_FLOWS[type];
    if (flow) {
      // Special case for sostituzione_rubinetto - preselect Rubinetto
      if (type === 'sostituzione_rubinetto') {
        const startQuestion = flow.questions['cosa_sostituire'];
        setAnswers([{ 
          questionId: 'cosa_sostituire', 
          questionTitle: startQuestion?.title || 'Cosa vorresti sostituire?',
          answer: 'Rubinetto' 
        }]);
        setCurrentQuestionId('rubinetto_tipo');
        setStep('questions');
        analytics.wizardStep('questions', type);
      } else {
        setCurrentQuestionId(flow.startQuestionId);
        setStep('questions');
        analytics.wizardStep('questions', type);
      }
    } else {
      setStep('city');
      analytics.wizardStep('city', type);
    }
  };

  const handleSelectAnswer = (answer: string) => {
    const question = getCurrentQuestion();
    if (!question) return;

    const newAnswers = [...answers, { 
      questionId: question.id, 
      questionTitle: question.title,
      answer 
    }];
    setAnswers(newAnswers);

    const nextId = getNextQuestionId(question, answer);
    if (nextId) {
      setCurrentQuestionId(nextId);
    } else {
      setStep('city');
      analytics.wizardStep('city', selectedType || undefined);
    }
  };

  const handleContinue = () => {
    if (selectedType && city.trim()) {
      // Track wizard completion before navigating
      analytics.wizardClose(step, selectedType, true);
      analytics.leadFormStart(selectedType, 'wizard');
      
      navigate('/richiesta', {
        state: {
          interventionType: selectedType,
          answers: answers,
          city: city.trim(),
          cityData: selectedCity,
        },
      });
    }
  };

  const handleCityChange = (cityData: ItalianCity | null, displayValue: string) => {
    setCity(displayValue);
    setSelectedCity(cityData);
  };

  const handleBack = () => {
    if (step === 'city') {
      if (answers.length > 0) {
        const prevAnswers = answers.slice(0, -1);
        setAnswers(prevAnswers);
        
        const flow = getCurrentFlow();
        if (flow && prevAnswers.length > 0) {
          const lastAnswer = prevAnswers[prevAnswers.length - 1];
          const lastQuestion = flow.questions[lastAnswer.questionId];
          const nextId = getNextQuestionId(lastQuestion, lastAnswer.answer);
          setCurrentQuestionId(nextId || lastAnswer.questionId);
        } else if (flow) {
          setCurrentQuestionId(flow.startQuestionId);
        }
        setStep('questions');
      } else {
        setStep('intervention');
        setSelectedType(null);
      }
    } else if (step === 'questions') {
      if (answers.length > 0) {
        const prevAnswers = answers.slice(0, -1);
        setAnswers(prevAnswers);
        
        if (prevAnswers.length > 0) {
          const lastAnswer = prevAnswers[prevAnswers.length - 1];
          const flow = getCurrentFlow();
          if (flow) {
            const lastQuestion = flow.questions[lastAnswer.questionId];
            const nextId = getNextQuestionId(lastQuestion, lastAnswer.answer);
            setCurrentQuestionId(nextId || lastAnswer.questionId);
          }
        } else {
          const flow = getCurrentFlow();
          if (flow) {
            setCurrentQuestionId(flow.startQuestionId);
          }
        }
      } else {
        setStep('intervention');
        setSelectedType(null);
      }
    }
  };

  const closeModal = () => {
    // Track abandonment if closing without completing
    analytics.wizardClose(step, selectedType || undefined, false);
    
    setShowModal(false);
    setSearchFilter('');
    setStep('intervention');
    setSelectedType(null);
    setAnswers([]);
    setCurrentQuestionId(null);
    setCity('');
    setSelectedCity(null);
  };

  const progress = step === 'intervention' ? 20 : step === 'questions' ? 50 + (answers.length * 10) : 90;

  const homePageFAQs = [
    {
      question: "Come funziona Idraulici Subito?",
      answer: "Semplice: descrivi il tuo problema, inserisci la tua città e ricevi preventivi gratuiti da idraulici verificati della tua zona in pochi minuti."
    },
    {
      question: "È davvero gratuito?",
      answer: "Sì, richiedere preventivi è completamente gratuito e senza impegno. Paghi solo se decidi di procedere con un professionista."
    },
    {
      question: "Quanto tempo ci vuole per ricevere un preventivo?",
      answer: "In media ricevi una risposta entro 15 minuti dalla tua richiesta. Per emergenze urgenti, i nostri professionisti premium rispondono ancora più velocemente."
    }
  ];

  const structuredData = generateJsonLd(
    {
      name: 'Idraulici Subito',
      description: 'Trova idraulici professionisti verificati nella tua città. Richiedi preventivi gratuiti per riparazioni, installazioni, caldaie, scarichi intasati e emergenze idrauliche.',
      url: BASE_URL,
      areaServed: [{ type: 'Country', name: 'Italia' }]
    },
    homePageFAQs,
    []
  );

  return (
    <Layout>
      <Helmet>
        <title>Idraulici Subito - Trova Idraulici Professionisti nella Tua Zona | Preventivi Gratuiti</title>
        <meta name="description" content="Trova idraulici professionisti verificati nella tua città. Richiedi preventivi gratuiti per riparazioni, installazioni, caldaie, scarichi intasati e emergenze idrauliche. Risposta in 15 minuti." />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://www.idraulicisubito.com/" />
        <meta property="og:title" content="Idraulici Subito - Trova Idraulici Professionisti nella Tua Zona" />
        <meta property="og:description" content="Trova idraulici professionisti verificati nella tua città. Richiedi preventivi gratuiti per riparazioni e installazioni. Risposta in 15 minuti." />
        <meta property="og:url" content="https://www.idraulicisubito.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.idraulicisubito.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Idraulici Subito - Trova Idraulici Professionisti" />
        <meta name="twitter:description" content="Trova idraulici professionisti verificati. Preventivi gratuiti e risposta in 15 minuti." />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      {/* Hero Section 2026 - Split layout, light bg, photo dx */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/30">
        {/* Subtle decorative blobs */}
        <div aria-hidden className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-20 h-[28rem] w-[28rem] rounded-full bg-secondary/10 blur-3xl" />

        <div className="container mx-auto px-4 relative z-10 py-10 md:py-20">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* LEFT: Text + CTA */}
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* LIVE Badge */}
              <div className="inline-flex items-center gap-2 bg-success/10 text-success border border-success/20 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-semibold mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                </span>
                <span>12 idraulici disponibili ORA nella tua zona</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground mb-5 leading-[1.05] tracking-tight">
                Idraulico a casa tua
                <span className="block text-primary">in 30 minuti.</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                Preventivo gratis in 30 secondi. Nessun obbligo. Solo professionisti verificati.
              </p>

              {/* CTA Stack */}
              <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto lg:mx-0 mb-6">
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 group bg-[#25D366] hover:bg-[#1fb455] text-white text-lg font-bold py-4 px-6 rounded-2xl shadow-[0_10px_30px_-10px_rgba(37,211,102,0.5)] hover:shadow-[0_15px_40px_-10px_rgba(37,211,102,0.6)] transition-all hover:-translate-y-0.5 flex items-center justify-center gap-3"
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>Scrivi su WhatsApp</span>
                </a>
                <button
                  onClick={() => openWizard()}
                  className="flex-1 group bg-foreground hover:bg-foreground/90 text-background text-lg font-bold py-4 px-6 rounded-2xl transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  Preventivo gratis
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* Quick chips */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-8">
                <span className="text-xs text-muted-foreground mr-1">Problemi più richiesti:</span>
                <a href={buildWhatsAppUrl({ interventionType: 'perdita' })} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-background border border-border hover:border-primary/50 hover:bg-primary/5 text-foreground px-3 py-1.5 rounded-full text-xs font-medium transition-all">
                  <Droplets className="h-3.5 w-3.5 text-primary" /> Perdita d'acqua
                </a>
                <a href={buildWhatsAppUrl({ interventionType: 'caldaia' })} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-background border border-border hover:border-primary/50 hover:bg-primary/5 text-foreground px-3 py-1.5 rounded-full text-xs font-medium transition-all">
                  <Flame className="h-3.5 w-3.5 text-primary" /> Caldaia
                </a>
                <a href={buildWhatsAppUrl({ interventionType: 'scarico' })} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-background border border-border hover:border-primary/50 hover:bg-primary/5 text-foreground px-3 py-1.5 rounded-full text-xs font-medium transition-all">
                  <Trash2 className="h-3.5 w-3.5 text-primary" /> Scarico intasato
                </a>
              </div>

              {/* Trust row */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Shield className="h-4 w-4 text-success" />
                  <span className="font-medium text-foreground">Verificati</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span><span className="font-bold text-foreground">4.8/5</span> · 500+ recensioni</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Senza impegno</span>
                </div>
              </div>
            </div>

            {/* RIGHT: Photo */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main photo card */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-foreground/5 aspect-[4/5]">
                  <img
                    src={heroPlumber}
                    alt="Idraulico professionista al lavoro in una cucina italiana"
                    className="w-full h-full object-cover"
                    width={1024}
                    height={1280}
                    fetchPriority="high"
                  />
                  {/* Gradient overlay bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
                  {/* Caption inside */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs uppercase tracking-wider opacity-80">In azione ora</p>
                    <p className="text-base font-semibold">Marco · Idraulico verificato</p>
                  </div>
                </div>

                {/* Floating card: rating */}
                <div className="hidden sm:flex absolute -left-4 lg:-left-8 top-8 bg-background rounded-2xl shadow-xl border border-border p-3 items-center gap-3 animate-fade-in">
                  <div className="flex -space-x-2">
                    <img src={plumberMarco} alt="" className="h-9 w-9 rounded-full ring-2 ring-background object-cover" loading="lazy" />
                    <img src={plumberGiuseppe} alt="" className="h-9 w-9 rounded-full ring-2 ring-background object-cover" loading="lazy" />
                    <img src={plumberLuca} alt="" className="h-9 w-9 rounded-full ring-2 ring-background object-cover" loading="lazy" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-yellow-500 text-yellow-500" />)}
                    </div>
                    <p className="text-xs font-semibold text-foreground">12.000+ richieste gestite</p>
                  </div>
                </div>

                {/* Floating card: live */}
                <div className="hidden sm:flex absolute -right-3 lg:-right-6 bottom-12 bg-background rounded-2xl shadow-xl border border-border px-4 py-3 items-center gap-3 animate-fade-in">
                  <div className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-muted-foreground">Tempo medio risposta</p>
                    <p className="text-sm font-bold text-foreground">~ 8 minuti</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar - numeri grossi */}
      <section className="border-y border-border bg-muted/30">
        <div className="container mx-auto px-4 py-8 md:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-black text-foreground">12.000+</p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">Richieste gestite</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-black text-foreground">4.8<span className="text-primary">★</span></p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">Recensioni verificate</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-black text-foreground">800+</p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">Idraulici partner</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-black text-foreground">~8 min</p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">Tempo medio risposta</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Wizard */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-card rounded-xl border border-border shadow-2xl overflow-hidden animate-scale-in">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <Wrench className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-semibold text-foreground">
                  {selectedType ? INTERVENTION_LABELS[selectedType] : 'Idraulico'}
                </span>
              </div>
              <Button variant="ghost" size="icon" onClick={closeModal}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Progress */}
            <div className="px-4 pt-4">
              <Progress value={Math.min(progress, 100)} className="h-1.5" />
              {getCurrentPriceRange() && (
                <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
                  <span>Fascia di prezzo:</span>
                  <span className="font-medium text-foreground">{getCurrentPriceRange()}</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              {step === 'intervention' && (
                <div className="animate-fade-in">
                  <h2 className="text-lg font-semibold mb-4">
                    Di quale servizio idraulico hai bisogno?
                  </h2>
                  
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Cerca servizio..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <ScrollArea className="h-[350px] pr-4">
                    <div className="space-y-2">
                      {filteredTypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => handleSelectType(type)}
                          className="w-full flex items-center gap-3 p-4 rounded-lg border border-border bg-background hover:bg-accent hover:border-primary/50 transition-all text-left group"
                        >
                          <div className="text-muted-foreground group-hover:text-primary transition-colors">
                            {INTERVENTION_ICONS[type] || <HelpCircle className="h-5 w-5" />}
                          </div>
                          <span className="font-medium text-foreground">
                            {INTERVENTION_LABELS[type]}
                          </span>
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}

              {step === 'questions' && getCurrentQuestion() && (
                <div className="animate-fade-in">
                  <h2 className="text-lg font-semibold mb-4">
                    {getCurrentQuestion()?.title}
                  </h2>

                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-2">
                      {getCurrentQuestion()?.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleSelectAnswer(option)}
                          className="w-full flex items-center gap-3 p-4 rounded-lg border border-border bg-background hover:bg-accent hover:border-primary/50 transition-all text-left"
                        >
                          <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                          <span className="font-medium text-foreground">{option}</span>
                        </button>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="mt-4 p-3 bg-success/10 rounded-lg flex items-center gap-2 text-sm text-success">
                    <CheckCircle className="h-4 w-4 shrink-0" />
                    <span>Questo servizio è molto richiesto!</span>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <Button variant="outline" onClick={handleBack} className="flex-1">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Indietro
                    </Button>
                  </div>
                </div>
              )}

              {step === 'city' && (
                <div className="animate-fade-in">
                  <div className="mb-4 pb-4 border-b border-border">
                    <p className="text-sm text-muted-foreground">Servizio selezionato:</p>
                    <p className="font-semibold text-primary">
                      {selectedType && INTERVENTION_LABELS[selectedType]}
                      {getAnswersSummary() && ` → ${getAnswersSummary()}`}
                    </p>
                  </div>

                  <h2 className="text-lg font-semibold mb-4">Dove ti trovi?</h2>
                  
                  <CityAutocomplete
                    value={city}
                    onChange={handleCityChange}
                    placeholder="Cerca città o CAP..."
                    className="mb-6"
                    autoFocus
                  />

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={handleBack} className="flex-1">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Indietro
                    </Button>
                    <Button onClick={handleContinue} disabled={!city.trim()} className="flex-1">
                      Avanti
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* How it works Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-primary font-semibold text-sm uppercase tracking-wide">Semplice e veloce</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Come funziona</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="relative bg-card rounded-2xl p-8 shadow-lg border border-border hover:shadow-xl transition-shadow">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary rounded-full w-10 h-10 flex items-center justify-center shadow-md">
                <span className="text-lg font-bold text-primary-foreground">1</span>
              </div>
              <div className="mt-4 text-center">
                <div className="bg-primary/10 rounded-xl w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <Search className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Scegli il servizio</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Seleziona il tipo di intervento di cui hai bisogno dal nostro wizard guidato
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="relative bg-card rounded-2xl p-8 shadow-lg border border-border hover:shadow-xl transition-shadow">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary rounded-full w-10 h-10 flex items-center justify-center shadow-md">
                <span className="text-lg font-bold text-primary-foreground">2</span>
              </div>
              <div className="mt-4 text-center">
                <div className="bg-primary/10 rounded-xl w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Descrivi il problema</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Rispondi a poche domande per dettagliare al meglio la tua richiesta
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="relative bg-card rounded-2xl p-8 shadow-lg border border-border hover:shadow-xl transition-shadow">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary rounded-full w-10 h-10 flex items-center justify-center shadow-md">
                <span className="text-lg font-bold text-primary-foreground">3</span>
              </div>
              <div className="mt-4 text-center">
                <div className="bg-primary/10 rounded-xl w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Vieni contattato</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Gli idraulici della tua zona ti contatteranno direttamente
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
            <div>
              <p className="text-3xl font-bold text-primary">500+</p>
              <p className="text-sm text-muted-foreground">Idraulici attivi</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">10k+</p>
              <p className="text-sm text-muted-foreground">Richieste gestite</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">4.8</p>
              <p className="text-sm text-muted-foreground">Rating medio</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">15min</p>
              <p className="text-sm text-muted-foreground">Tempo medio risposta</p>
            </div>
          </div>
        </div>
      </section>

      {/* Perché sceglierci Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground text-center mb-4">
              Perché scegliere Idraulici Subito?
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              Trovare un idraulico affidabile non è mai stato così semplice
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border">
                <div className="bg-success/10 rounded-full p-3 shrink-0">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Professionisti verificati</h3>
                  <p className="text-sm text-muted-foreground">
                    Tutti gli idraulici sulla piattaforma sono professionisti qualificati e verificati
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border">
                <div className="bg-primary/10 rounded-full p-3 shrink-0">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Risposta rapida</h3>
                  <p className="text-sm text-muted-foreground">
                    Ricevi contatti dagli idraulici della tua zona in pochi minuti
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border">
                <div className="bg-primary/10 rounded-full p-3 shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Idraulici vicino a te</h3>
                  <p className="text-sm text-muted-foreground">
                    Contatta solo professionisti che operano nella tua zona
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border">
                <div className="bg-success/10 rounded-full p-3 shrink-0">
                  <Shield className="h-6 w-6 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Servizio gratuito</h3>
                  <p className="text-sm text-muted-foreground">
                    Per i clienti il servizio è completamente gratuito, senza costi nascosti
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border">
                <div className="bg-primary/10 rounded-full p-3 shrink-0">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Recensioni reali</h3>
                  <p className="text-sm text-muted-foreground">
                    Leggi le opinioni di altri clienti prima di scegliere
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border">
                <div className="bg-success/10 rounded-full p-3 shrink-0">
                  <Phone className="h-6 w-6 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Contatto diretto</h3>
                  <p className="text-sm text-muted-foreground">
                    Parla direttamente con l'idraulico senza intermediari
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cities Section - Internal Linking for SEO (ALL 50 Cities visible) */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
              Trova un Idraulico nelle Principali Città Italiane
            </h2>
            <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              Professionisti verificati in oltre 50 città italiane. Seleziona la tua città per trovare idraulici disponibili nella tua zona con risposta in 15 minuti.
            </p>

            {/* First 15 cities - Most visible */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
              {TOP_50_CITY_LINKS.slice(0, 15).map((city) => (
                <a
                  key={city.slug}
                  href={`/${city.slug}`}
                  className="flex items-center gap-2 bg-card hover:bg-primary/10 border border-border rounded-lg px-4 py-3 transition-colors group"
                >
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm font-medium text-foreground group-hover:text-primary truncate">
                    {city.name}
                  </span>
                </a>
              ))}
            </div>

            {/* Remaining 35 cities */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2">
              {TOP_50_CITY_LINKS.slice(15).map((city) => (
                <a
                  key={city.slug}
                  href={`/${city.slug}`}
                  className="flex items-center justify-center gap-1.5 bg-muted/50 hover:bg-primary/10 border border-border/50 rounded-md px-3 py-2 transition-colors group"
                >
                  <MapPin className="h-3 w-3 text-primary/70 shrink-0" />
                  <span className="text-xs font-medium text-muted-foreground group-hover:text-primary truncate">
                    {city.name}
                  </span>
                </a>
              ))}
            </div>

            <div className="text-center mt-8">
              <a 
                href="/idraulico-vicino-a-me"
                className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
              >
                Non trovi la tua città? Cerca idraulici vicino a te
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
}
