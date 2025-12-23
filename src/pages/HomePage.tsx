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

// Sub-options for "Installazione e sostituzione"
const INSTALLATION_SUB_OPTIONS = [
  'Rubinetto',
  'Lavandino',
  'WC',
  'Bidet',
  'Caldaia',
  'Scaldabagno',
  'Doccia',
  'Box doccia',
  'Colonna doccia',
  'Vasca con doccia',
  'Vasca da bagno',
  'Impianto idraulico',
  'Lavatrice',
  'Lavastoviglie',
  'Condizionatori',
  'Pompa di calore',
  'Piano cottura',
  'Termosifoni',
  'Depuratore acqua',
  'Addolcitore acqua',
  'Contatore acqua',
  'Contatore gas',
  'Riscaldamento a pavimento',
  'Filtro anticalcare caldaia',
  'Altro',
];

// Sub-options for "Sturare / spurgo"
const SPURGO_SUB_OPTIONS = [
  'Lavandino',
  'WC',
  'Doccia',
  'Vasca da bagno',
  'Bidet',
  'Scarico cucina',
  'Colonna di scarico',
  'Pozzetto',
  'Fognatura',
  'Altro',
];

// Sub-options for "Riparazione"
const RIPARAZIONE_SUB_OPTIONS = [
  'Rubinetto',
  'Tubo',
  'Scarico',
  'WC',
  'Lavandino',
  'Doccia',
  'Vasca',
  'Caldaia',
  'Scaldabagno',
  'Termosifone',
  'Altro',
];

// Third-level options for "Rubinetto" under "Installazione e sostituzione"
const RUBINETTO_SUB_OPTIONS = [
  'Cucina',
  'Bagno',
  'Lavabo',
  'Lavello',
  'Lavastoviglie',
  'Altro',
];

// Fourth-level: who provides the faucet
const PROVIDER_OPTIONS = [
  'Li fornirò',
  'Il professionista',
];

// Fifth-level: quantity
const QUANTITY_OPTIONS = [
  '1',
  '2',
  '3',
  '4 o più',
];

// Price ranges for different selections
const PRICE_RANGES: Record<string, string> = {
  'installazione_sostituzione': '70 € - 750 €',
  'Rubinetto': '50 € - 250 €',
  'provider_step': '60 € - 180 €',
  'quantity_step': '60 € - 150 €',
};

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

// Types that have sub-questions
const TYPES_WITH_SUB_QUESTIONS: InterventionType[] = [
  'installazione_sostituzione',
  'sturare_spurgo',
  'riparazione',
];

type WizardStep = 'intervention' | 'sub_question' | 'sub_sub_question' | 'provider_question' | 'quantity_question' | 'city';

export default function HomePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<WizardStep>('intervention');
  const [selectedType, setSelectedType] = useState<InterventionType | null>(null);
  const [selectedSubOption, setSelectedSubOption] = useState<string | null>(null);
  const [selectedSubSubOption, setSelectedSubSubOption] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<string | null>(null);
  const [city, setCity] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Check if selected sub-option has third-level options
  const hasThirdLevelOptions = selectedSubOption === 'Rubinetto' && selectedType === 'installazione_sostituzione';

  const getThirdLevelOptions = (): string[] => {
    if (selectedSubOption === 'Rubinetto') {
      return RUBINETTO_SUB_OPTIONS;
    }
    return [];
  };

  const getThirdLevelTitle = (): string => {
    if (selectedSubOption === 'Rubinetto') {
      return 'Quali rubinetti vorresti sostituire?';
    }
    return '';
  };

  const getCurrentPriceRange = (): string | null => {
    if (step === 'quantity_question') {
      return PRICE_RANGES['quantity_step'];
    }
    if (step === 'provider_question') {
      return PRICE_RANGES['provider_step'];
    }
    if (selectedSubOption && PRICE_RANGES[selectedSubOption]) {
      return PRICE_RANGES[selectedSubOption];
    }
    if (selectedType && PRICE_RANGES[selectedType]) {
      return PRICE_RANGES[selectedType];
    }
    return null;
  };

  const getTotalSteps = () => {
    if (selectedType && TYPES_WITH_SUB_QUESTIONS.includes(selectedType)) {
      if (hasThirdLevelOptions || selectedSubSubOption) {
        return 6; // intervention -> sub -> sub_sub -> provider -> quantity -> city
      }
      return 3;
    }
    return 2;
  };

  const getCurrentStepNumber = () => {
    switch (step) {
      case 'intervention': return 1;
      case 'sub_question': return 2;
      case 'sub_sub_question': return 3;
      case 'provider_question': return 4;
      case 'quantity_question': return 5;
      case 'city': 
        if (selectedQuantity) return 6;
        if (selectedProvider) return 6;
        if (hasThirdLevelOptions || selectedSubSubOption) return 6;
        return selectedType && TYPES_WITH_SUB_QUESTIONS.includes(selectedType) ? 3 : 2;
      default: return 1;
    }
  };

  const progress = (getCurrentStepNumber() / getTotalSteps()) * 100;

  const filteredTypes = ALL_INTERVENTION_TYPES.filter(type =>
    INTERVENTION_LABELS[type].toLowerCase().includes(searchFilter.toLowerCase())
  );

  const getSubOptions = (): string[] => {
    switch (selectedType) {
      case 'installazione_sostituzione':
        return INSTALLATION_SUB_OPTIONS;
      case 'sturare_spurgo':
        return SPURGO_SUB_OPTIONS;
      case 'riparazione':
        return RIPARAZIONE_SUB_OPTIONS;
      default:
        return [];
    }
  };

  const getSubQuestionTitle = (): string => {
    switch (selectedType) {
      case 'installazione_sostituzione':
        return 'Cosa vorresti sostituire / installare?';
      case 'sturare_spurgo':
        return 'Cosa si è intasato?';
      case 'riparazione':
        return 'Cosa devi riparare?';
      default:
        return '';
    }
  };

  const handleSelectType = (type: InterventionType) => {
    setSelectedType(type);
    setSelectedSubOption(null);
    
    if (TYPES_WITH_SUB_QUESTIONS.includes(type)) {
      setStep('sub_question');
    } else {
      setStep('city');
    }
  };

  const handleSelectSubOption = (option: string) => {
    setSelectedSubOption(option);
    setSelectedSubSubOption(null);
    
    // Check if this option needs a third-level question
    if (option === 'Rubinetto' && selectedType === 'installazione_sostituzione') {
      setStep('sub_sub_question');
    } else {
      setStep('city');
    }
  };

  const handleSelectSubSubOption = (option: string) => {
    setSelectedSubSubOption(option);
    setSelectedProvider(null);
    // After selecting faucet type, ask who provides it
    setStep('provider_question');
  };

  const handleSelectProvider = (option: string) => {
    setSelectedProvider(option);
    setSelectedQuantity(null);
    setStep('quantity_question');
  };

  const handleSelectQuantity = (option: string) => {
    setSelectedQuantity(option);
    setStep('city');
  };

  const handleContinue = () => {
    if (selectedType && city.trim()) {
      navigate('/richiesta', {
        state: {
          interventionType: selectedType,
          subOption: selectedSubOption,
          subSubOption: selectedSubSubOption,
          provider: selectedProvider,
          quantity: selectedQuantity,
          city: city.trim(),
        },
      });
    }
  };

  const handleBack = () => {
    switch (step) {
      case 'city':
        if (selectedQuantity) {
          setStep('quantity_question');
        } else if (selectedProvider) {
          setStep('provider_question');
        } else if (selectedSubSubOption) {
          setStep('sub_sub_question');
        } else if (selectedType && TYPES_WITH_SUB_QUESTIONS.includes(selectedType)) {
          setStep('sub_question');
        } else {
          setStep('intervention');
        }
        break;
      case 'quantity_question':
        setStep('provider_question');
        setSelectedQuantity(null);
        break;
      case 'provider_question':
        setStep('sub_sub_question');
        setSelectedProvider(null);
        break;
      case 'sub_sub_question':
        setStep('sub_question');
        setSelectedSubSubOption(null);
        break;
      case 'sub_question':
        setStep('intervention');
        setSelectedType(null);
        break;
      default:
        break;
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setSearchFilter('');
    setStep('intervention');
    setSelectedType(null);
    setSelectedSubOption(null);
    setSelectedSubSubOption(null);
    setSelectedProvider(null);
    setSelectedQuantity(null);
    setCity('');
  };

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

          {/* CTA Button to open modal */}
          <div className="max-w-xl mx-auto">
            <Button 
              onClick={openModal}
              className="w-full text-lg py-7 shadow-lg hover:shadow-xl transition-all"
              size="lg"
            >
              <Search className="h-5 w-5 mr-2" />
              Di quale servizio idraulico hai bisogno?
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
              <div className="flex items-center justify-between mb-2">
                <Progress value={progress} className="h-1.5 flex-1" />
              </div>
              {getCurrentPriceRange() && (
                <div className="flex items-center justify-between text-sm text-muted-foreground">
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
                  
                  {/* Search filter */}
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

              {step === 'sub_question' && (
                <div className="animate-fade-in">
                  <h2 className="text-lg font-semibold mb-4">
                    {getSubQuestionTitle()}
                  </h2>

                  <ScrollArea className="h-[350px] pr-4">
                    <div className="space-y-2">
                      {getSubOptions().map((option) => (
                        <button
                          key={option}
                          onClick={() => handleSelectSubOption(option)}
                          className={`w-full flex items-center gap-3 p-4 rounded-lg border transition-all text-left ${
                            selectedSubOption === option
                              ? 'border-primary bg-accent'
                              : 'border-border bg-background hover:bg-accent hover:border-primary/50'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            selectedSubOption === option
                              ? 'border-primary bg-primary'
                              : 'border-muted-foreground'
                          }`}>
                            {selectedSubOption === option && (
                              <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                            )}
                          </div>
                          <span className="font-medium text-foreground">{option}</span>
                        </button>
                      ))}
                    </div>
                  </ScrollArea>

                  {/* Info banner */}
                  <div className="mt-4 p-3 bg-success/10 rounded-lg flex items-center gap-2 text-sm text-success">
                    <CheckCircle className="h-4 w-4 shrink-0" />
                    <span>Questo servizio è molto richiesto in questo momento!</span>
                  </div>

                  {/* Navigation */}
                  <div className="flex gap-3 mt-4">
                    <Button variant="outline" onClick={handleBack} className="flex-1">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Indietro
                    </Button>
                    <Button 
                      onClick={() => selectedSubOption && setStep('city')}
                      disabled={!selectedSubOption}
                      className="flex-1"
                    >
                      Avanti
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 'sub_sub_question' && (
                <div className="animate-fade-in">
                  <h2 className="text-lg font-semibold mb-4">
                    {getThirdLevelTitle()}
                  </h2>

                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-2">
                      {getThirdLevelOptions().map((option) => (
                        <button
                          key={option}
                          onClick={() => handleSelectSubSubOption(option)}
                          className={`w-full flex items-center gap-3 p-4 rounded-lg border transition-all text-left ${
                            selectedSubSubOption === option
                              ? 'border-primary bg-accent'
                              : 'border-border bg-background hover:bg-accent hover:border-primary/50'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            selectedSubSubOption === option
                              ? 'border-primary bg-primary'
                              : 'border-muted-foreground'
                          }`}>
                            {selectedSubSubOption === option && (
                              <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                            )}
                          </div>
                          <span className="font-medium text-foreground">{option}</span>
                        </button>
                      ))}
                    </div>
                  </ScrollArea>

                  {/* Navigation */}
                  <div className="flex gap-3 mt-4">
                    <Button variant="outline" onClick={handleBack} className="flex-1">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Indietro
                    </Button>
                    <Button 
                      onClick={() => selectedSubSubOption && setStep('provider_question')}
                      disabled={!selectedSubSubOption}
                      className="flex-1"
                    >
                      Avanti
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 'provider_question' && (
                <div className="animate-fade-in">
                  <h2 className="text-lg font-semibold mb-4">
                    Chi fornirà il rubinetto?
                  </h2>

                  <div className="space-y-2">
                    {PROVIDER_OPTIONS.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleSelectProvider(option)}
                        className={`w-full flex items-center gap-3 p-4 rounded-lg border transition-all text-left ${
                          selectedProvider === option
                            ? 'border-primary bg-accent'
                            : 'border-border bg-background hover:bg-accent hover:border-primary/50'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          selectedProvider === option
                            ? 'border-primary bg-primary'
                            : 'border-muted-foreground'
                        }`}>
                          {selectedProvider === option && (
                            <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                          )}
                        </div>
                        <span className="font-medium text-foreground">{option}</span>
                      </button>
                    ))}
                  </div>

                  {/* Navigation */}
                  <div className="flex gap-3 mt-4">
                    <Button variant="outline" onClick={handleBack} className="flex-1">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Indietro
                    </Button>
                    <Button 
                      onClick={() => selectedProvider && setStep('quantity_question')}
                      disabled={!selectedProvider}
                      className="flex-1"
                    >
                      Avanti
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 'quantity_question' && (
                <div className="animate-fade-in">
                  <h2 className="text-lg font-semibold mb-4">
                    Di quanti rubinetti hai bisogno per la sostituzione?
                  </h2>

                  <div className="space-y-2">
                    {QUANTITY_OPTIONS.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleSelectQuantity(option)}
                        className={`w-full flex items-center gap-3 p-4 rounded-lg border transition-all text-left ${
                          selectedQuantity === option
                            ? 'border-primary bg-accent'
                            : 'border-border bg-background hover:bg-accent hover:border-primary/50'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          selectedQuantity === option
                            ? 'border-primary bg-primary'
                            : 'border-muted-foreground'
                        }`}>
                          {selectedQuantity === option && (
                            <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                          )}
                        </div>
                        <span className="font-medium text-foreground">{option}</span>
                      </button>
                    ))}
                  </div>

                  {/* Navigation */}
                  <div className="flex gap-3 mt-4">
                    <Button variant="outline" onClick={handleBack} className="flex-1">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Indietro
                    </Button>
                    <Button 
                      onClick={() => selectedQuantity && setStep('city')}
                      disabled={!selectedQuantity}
                      className="flex-1"
                    >
                      Avanti
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 'city' && (
                <div className="animate-fade-in">
                  <div className="mb-4 pb-4 border-b border-border">
                    <p className="text-sm text-muted-foreground">
                      Servizio selezionato:
                    </p>
                    <p className="font-semibold text-primary">
                      {selectedType && INTERVENTION_LABELS[selectedType]}
                      {selectedSubOption && ` → ${selectedSubOption}`}
                      {selectedSubSubOption && ` → ${selectedSubSubOption}`}
                      {selectedQuantity && ` (${selectedQuantity})`}
                      {selectedProvider && ` - ${selectedProvider}`}
                    </p>
                  </div>

                  <h2 className="text-lg font-semibold mb-4">
                    Dove ti trovi?
                  </h2>
                  
                  <Input
                    placeholder="Inserisci la tua città o CAP"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="text-base mb-6"
                    autoFocus
                  />

                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      onClick={handleBack}
                      className="flex-1"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Indietro
                    </Button>
                    <Button 
                      onClick={handleContinue}
                      disabled={!city.trim()}
                      className="flex-1"
                    >
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