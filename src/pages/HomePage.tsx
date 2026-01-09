import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import heroBg from '@/assets/hero-bg.avif';

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

  // SEO Meta tags
  useEffect(() => {
    document.title = "Idraulici Subito - Trova Idraulici Professionisti nella Tua Zona | Preventivi Gratuiti";
  }, []);

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

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 md:py-32 relative overflow-hidden min-h-[600px] md:min-h-[700px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroBg} 
            alt="" 
            className="w-full h-full object-cover object-right-top md:object-right"
          />
          {/* Overlay for text readability - lighter to show more image */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl text-center md:text-left">
            {/* Urgency badge */}
            <div className="inline-flex items-center gap-2 bg-success/90 text-success-foreground px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="text-white">12 idraulici disponibili ora nella tua zona</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in leading-tight">
              Problema idraulico?<br />
              <span className="text-primary">Risolto Subito</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-2">
              Ricevi assistenza da idraulici verificati nella tua città.
            </p>
            <p className="text-base text-foreground/60 mb-8">
              Gratis e senza impegno • Rispondono in media in 15 minuti
            </p>

            {/* Main CTA */}
            <Button 
              onClick={openWizard}
              className="w-full md:w-auto text-lg md:text-xl py-8 px-10 shadow-2xl hover:shadow-primary/25 hover:scale-[1.02] transition-all duration-300 gap-3 bg-primary hover:bg-primary/90 rounded-xl font-semibold group"
              size="lg"
            >
              <Wrench className="h-6 w-6 shrink-0 group-hover:rotate-12 transition-transform" />
              <span>Richiedi Preventivo Gratuito</span>
              <ArrowRight className="h-5 w-5 shrink-0 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            {/* Trust indicators */}
            <div className="flex items-center justify-center md:justify-start gap-4 md:gap-6 mt-6 text-sm text-foreground/70">
              <div className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-primary" />
                <span>100% Gratuito</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary" />
                <span>2 minuti</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-primary fill-primary" />
                <span>4.8/5</span>
              </div>
            </div>
            
            {/* Social proof */}
            <p className="text-center md:text-left text-xs text-foreground/50 mt-4">
              Già <span className="font-semibold text-foreground">2.847 richieste</span> gestite questo mese
            </p>
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
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">Come funziona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold mb-2">Scegli il servizio</h3>
              <p className="text-muted-foreground text-sm">
                Seleziona il tipo di intervento di cui hai bisogno
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold mb-2">Descrivi il problema</h3>
              <p className="text-muted-foreground text-sm">
                Rispondi a poche domande guidate per dettagliare la richiesta
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold mb-2">Vieni contattato</h3>
              <p className="text-muted-foreground text-sm">
                Gli idraulici della zona ti contatteranno direttamente
              </p>
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

    </Layout>
  );
}
