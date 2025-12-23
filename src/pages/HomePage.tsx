import { useState } from 'react';
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
  CheckCircle
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

interface WizardAnswer {
  questionId: string;
  answer: string;
}

export default function HomePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'intervention' | 'questions' | 'city'>('intervention');
  const [selectedType, setSelectedType] = useState<InterventionType | null>(null);
  const [answers, setAnswers] = useState<WizardAnswer[]>([]);
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(null);
  const [city, setCity] = useState('');
  const [selectedCity, setSelectedCity] = useState<ItalianCity | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [showModal, setShowModal] = useState(false);

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
        setAnswers([{ questionId: 'cosa_sostituire', answer: 'Rubinetto' }]);
        setCurrentQuestionId('rubinetto_tipo');
        setStep('questions');
      } else {
        setCurrentQuestionId(flow.startQuestionId);
        setStep('questions');
      }
    } else {
      setStep('city');
    }
  };

  const handleSelectAnswer = (answer: string) => {
    const question = getCurrentQuestion();
    if (!question) return;

    const newAnswers = [...answers, { questionId: question.id, answer }];
    setAnswers(newAnswers);

    const nextId = getNextQuestionId(question, answer);
    if (nextId) {
      setCurrentQuestionId(nextId);
    } else {
      setStep('city');
    }
  };

  const handleContinue = () => {
    if (selectedType && city.trim()) {
      navigate('/richiesta', {
        state: {
          interventionType: selectedType,
          answers: answers,
          city: city.trim(),
          cityData: selectedCity, // Pass full city data for matching
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
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in">
              Trova subito il tuo idraulico
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Professionisti disponibili nella tua zona
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            <Button 
              onClick={() => setShowModal(true)}
              className="w-full text-base md:text-lg py-6 px-6 shadow-lg hover:shadow-xl transition-all gap-3"
              size="lg"
            >
              <Search className="h-5 w-5 shrink-0" />
              <span>Di cosa hai bisogno?</span>
            </Button>
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
    </Layout>
  );
}
