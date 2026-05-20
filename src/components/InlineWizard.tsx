import { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Check,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { InterventionType, UrgencyType, PropertyType, AccessibilityType } from '@/lib/types';
import { 
  INTERVENTION_LABELS, 
  URGENCY_LABELS, 
  PROPERTY_LABELS, 
  ACCESSIBILITY_LABELS 
} from '@/lib/types';
import { CATEGORY_FLOWS, getNextQuestionId, type WizardQuestion } from '@/lib/wizardConfig';
import { CityAutocomplete, type ItalianCity } from '@/components/CityAutocomplete';
import analytics from '@/lib/analytics';

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

const URGENCY_TYPES: UrgencyType[] = ['subito', 'entro_24_ore', 'prossimi_giorni'];
const PROPERTY_TYPES: PropertyType[] = ['casa', 'appartamento', 'negozio'];
const ACCESSIBILITY_TYPES: AccessibilityType[] = ['facile', 'media', 'difficile'];

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

interface InlineWizardProps {
  onClose: () => void;
  defaultCity?: string;
}

type WizardStep = 'intervention' | 'questions' | 'city' | 'description' | 'urgency' | 'propertyType' | 'accessibility' | 'contact' | 'success';

export default function InlineWizard({ onClose, defaultCity = '' }: InlineWizardProps) {
  const [step, setStep] = useState<WizardStep>('intervention');
  const [selectedType, setSelectedType] = useState<InterventionType | null>(null);
  const [answers, setAnswers] = useState<WizardAnswerLocal[]>([]);
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(null);
  const [city, setCity] = useState(defaultCity);
  const [selectedCity, setSelectedCity] = useState<ItalianCity | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form data for the request
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState<UrgencyType | ''>('');
  const [propertyType, setPropertyType] = useState<PropertyType | ''>('');
  const [accessibility, setAccessibility] = useState<AccessibilityType | ''>('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [noPhoneContact, setNoPhoneContact] = useState(false);

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

  const handleCityChange = (cityData: ItalianCity | null, displayValue: string) => {
    setCity(displayValue);
    setSelectedCity(cityData);
  };

  const handleSubmit = async () => {
    if (!selectedType || !selectedCity || !description.trim() || !urgency || !propertyType || !accessibility || !clientName.trim() || !clientPhone.trim() || !privacyAccepted) {
      toast.error('Compila tutti i campi obbligatori.');
      return;
    }

    setIsSubmitting(true);
    
    analytics.leadFormSubmit(selectedType, city, urgency);

    const requestPayload = {
      intervention_type: selectedType,
      city: `${selectedCity.name} (${selectedCity.province_code})`,
      description: description.trim(),
      urgency: urgency,
      property_type: propertyType,
      accessibility: accessibility,
      client_name: clientName.trim(),
      client_phone: clientPhone.trim(),
      client_email: clientEmail?.trim() || null,
      privacy_accepted: privacyAccepted,
      phone_contact_allowed: !noPhoneContact,
      wizard_answers: answers.length > 0 ? answers : null,
    };

    const { data, error } = await supabase.functions.invoke('notify-plumbers', {
      body: { request: requestPayload },
    });

    if (error || (data as any)?.error) {
      const errorMessage = error?.message || (data as any)?.error || 'Unknown error';
      console.error('Error submitting request:', errorMessage);
      toast.error('Si è verificato un errore. Riprova.');
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setStep('success');
  };

  const handleBack = () => {
    switch (step) {
      case 'success':
        // Can't go back from success
        break;
      case 'contact':
        setStep('accessibility');
        break;
      case 'accessibility':
        setStep('propertyType');
        break;
      case 'propertyType':
        setStep('urgency');
        break;
      case 'urgency':
        setStep('description');
        break;
      case 'description':
        setStep('city');
        break;
      case 'city':
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
        break;
      case 'questions':
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
        break;
      case 'intervention':
        onClose();
        break;
    }
  };

  const getProgress = () => {
    const stepOrder: WizardStep[] = ['intervention', 'questions', 'city', 'description', 'urgency', 'propertyType', 'accessibility', 'contact', 'success'];
    const currentIndex = stepOrder.indexOf(step);
    return Math.round(((currentIndex + 1) / stepOrder.length) * 100);
  };

  const getStepTitle = () => {
    switch (step) {
      case 'intervention':
        return 'Di quale servizio hai bisogno?';
      case 'questions':
        return getCurrentQuestion()?.title || 'Dettagli servizio';
      case 'city':
        return 'Dove ti trovi?';
      case 'description':
        return 'Descrivi il problema';
      case 'urgency':
        return 'Quanto è urgente?';
      case 'propertyType':
        return 'Tipo di abitazione';
      case 'accessibility':
        return 'Accessibilità della zona';
      case 'contact':
        return 'I tuoi dati di contatto';
      case 'success':
        return 'Richiesta inviata!';
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto bg-card rounded-xl border border-border shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Wrench className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground">
            {selectedType ? INTERVENTION_LABELS[selectedType] : 'Richiedi Preventivo'}
          </span>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Progress */}
      {step !== 'success' && (
        <div className="px-4 pt-4">
          <Progress value={getProgress()} className="h-1.5" />
          {getCurrentPriceRange() && (
            <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
              <span>Fascia di prezzo:</span>
              <span className="font-medium text-foreground">{getCurrentPriceRange()}</span>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {step === 'intervention' && (
          <div className="animate-fade-in">
            <h2 className="text-lg font-semibold mb-4">{getStepTitle()}</h2>
            
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
            <h2 className="text-lg font-semibold mb-4">{getStepTitle()}</h2>

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

            <h2 className="text-lg font-semibold mb-4">{getStepTitle()}</h2>
            
            <CityAutocomplete
              value={city}
              onChange={handleCityChange}
              placeholder="Cerca città o CAP..."
              className="mb-2"
              autoFocus
            />
            
            {city.trim() && !selectedCity && (
              <p className="text-sm text-destructive mb-4">
                Seleziona una città dalla lista per continuare
              </p>
            )}
            
            {!city.trim() && (
              <p className="text-sm text-muted-foreground mb-4">
                Inizia a digitare per cercare la tua città
              </p>
            )}
            
            {selectedCity && (
              <p className="text-sm text-success mb-4 flex items-center gap-1">
                <Check className="h-3 w-3" />
                {selectedCity.name} ({selectedCity.province_code}) selezionata
              </p>
            )}

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleBack} className="flex-1">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Indietro
              </Button>
              <Button 
                onClick={() => { 
                  if (!selectedCity) {
                    toast.error('Seleziona una città dalla lista');
                    return;
                  }
                  setStep('description'); 
                  analytics.leadFormStart(selectedType || '', 'inline_wizard'); 
                }} 
                disabled={!selectedCity} 
                className="flex-1"
              >
                Avanti
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 'description' && (
          <div className="animate-fade-in">
            <h2 className="text-lg font-semibold mb-4">{getStepTitle()}</h2>
            
            <Textarea
              placeholder="Es. Ho una perdita sotto il lavandino del bagno..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="text-base mb-4"
              autoFocus
            />

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleBack} className="flex-1">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Indietro
              </Button>
              <Button 
                onClick={() => setStep('urgency')} 
                disabled={!description.trim()} 
                className="flex-1"
              >
                Continua
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 'urgency' && (
          <div className="animate-fade-in">
            <h2 className="text-lg font-semibold mb-4">{getStepTitle()}</h2>
            
            <div className="space-y-2 mb-4">
              {URGENCY_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setUrgency(type);
                    setTimeout(() => setStep('propertyType'), 200);
                  }}
                  className={`w-full p-4 rounded-lg border transition-all text-left ${
                    urgency === type
                      ? 'border-primary bg-accent text-accent-foreground ring-2 ring-primary'
                      : 'border-border bg-background hover:border-primary/50 hover:bg-accent/50'
                  }`}
                >
                  <span className="font-medium">{URGENCY_LABELS[type]}</span>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleBack} className="flex-1">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Indietro
              </Button>
            </div>
          </div>
        )}

        {step === 'propertyType' && (
          <div className="animate-fade-in">
            <h2 className="text-lg font-semibold mb-4">{getStepTitle()}</h2>
            
            <div className="space-y-2 mb-4">
              {PROPERTY_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setPropertyType(type);
                    setTimeout(() => setStep('accessibility'), 200);
                  }}
                  className={`w-full p-4 rounded-lg border transition-all text-left ${
                    propertyType === type
                      ? 'border-primary bg-accent text-accent-foreground ring-2 ring-primary'
                      : 'border-border bg-background hover:border-primary/50 hover:bg-accent/50'
                  }`}
                >
                  <span className="font-medium">{PROPERTY_LABELS[type]}</span>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleBack} className="flex-1">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Indietro
              </Button>
            </div>
          </div>
        )}

        {step === 'accessibility' && (
          <div className="animate-fade-in">
            <h2 className="text-lg font-semibold mb-4">{getStepTitle()}</h2>
            
            <div className="space-y-2 mb-4">
              {ACCESSIBILITY_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setAccessibility(type);
                    setTimeout(() => setStep('contact'), 200);
                  }}
                  className={`w-full p-4 rounded-lg border transition-all text-left ${
                    accessibility === type
                      ? 'border-primary bg-accent text-accent-foreground ring-2 ring-primary'
                      : 'border-border bg-background hover:border-primary/50 hover:bg-accent/50'
                  }`}
                >
                  <span className="font-medium">{ACCESSIBILITY_LABELS[type]}</span>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleBack} className="flex-1">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Indietro
              </Button>
            </div>
          </div>
        )}

        {step === 'contact' && (
          <div className="animate-fade-in">
            <h2 className="text-lg font-semibold mb-4">{getStepTitle()}</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="inline-name" className="text-sm font-medium mb-1.5 block">
                  Nome *
                </Label>
                <Input
                  id="inline-name"
                  type="text"
                  placeholder="Il tuo nome"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  autoFocus
                />
              </div>

              <div>
                <Label htmlFor="inline-phone" className="text-sm font-medium mb-1.5 block">
                  Telefono *
                </Label>
                <Input
                  id="inline-phone"
                  type="tel"
                  placeholder="Il tuo numero"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                />
                <div className="flex items-start gap-2 mt-2">
                  <Checkbox
                    id="inline-no-phone"
                    checked={noPhoneContact}
                    onCheckedChange={(checked) => setNoPhoneContact(checked === true)}
                  />
                  <Label htmlFor="inline-no-phone" className="text-xs leading-relaxed cursor-pointer text-muted-foreground">
                    Non desidero essere contattato telefonicamente (solo via chat/email)
                  </Label>
                </div>
              </div>

              <div>
                <Label htmlFor="inline-email" className="text-sm font-medium mb-1.5 block">
                  Email
                </Label>
                <Input
                  id="inline-email"
                  type="email"
                  placeholder="La tua email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                />
              </div>

              <div className="flex items-start gap-3 pt-2">
                <Checkbox
                  id="inline-privacy"
                  checked={privacyAccepted}
                  onCheckedChange={(checked) => setPrivacyAccepted(checked === true)}
                />
                <Label htmlFor="inline-privacy" className="text-sm leading-relaxed cursor-pointer">
                  Accetto la{' '}
                  <Link to="/privacy" className="text-primary hover:underline" target="_blank">
                    Privacy Policy
                  </Link>
                  {' '}e i{' '}
                  <Link to="/termini" className="text-primary hover:underline" target="_blank">
                    Termini
                  </Link>
                </Label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={handleBack} className="flex-1">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Indietro
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={!clientName.trim() || !clientPhone.trim() || !privacyAccepted || isSubmitting} 
                className="flex-1"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Invio...
                  </>
                ) : (
                  <>
                    Invia richiesta
                    <Check className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="animate-fade-in text-center py-8">
            <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <h2 className="text-xl font-bold mb-2">Richiesta inviata!</h2>
            <p className="text-muted-foreground mb-6">
              Abbiamo ricevuto la tua richiesta. Un idraulico della tua zona ti contatterà al più presto.
            </p>
            <Button onClick={onClose} className="w-full">
              Chiudi
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
