import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Layout } from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';
import type { 
  InterventionType, 
  UrgencyType, 
  PropertyType, 
  AccessibilityType,
  RequestFormData
} from '@/lib/types';
import { 
  INTERVENTION_LABELS, 
  URGENCY_LABELS, 
  PROPERTY_LABELS, 
  ACCESSIBILITY_LABELS 
} from '@/lib/types';

const URGENCY_TYPES: UrgencyType[] = ['subito', 'entro_24_ore', 'prossimi_giorni'];
const PROPERTY_TYPES: PropertyType[] = ['casa', 'appartamento', 'negozio', 'ufficio', 'condominio'];
const ACCESSIBILITY_TYPES: AccessibilityType[] = ['facile', 'media', 'difficile'];

// Step definitions
const STEPS = [
  'description',
  'urgency', 
  'propertyType',
  'accessibility',
  'contact'
] as const;

type StepType = typeof STEPS[number];

export default function RequestPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<RequestFormData>({
    interventionType: '',
    city: '',
    description: '',
    urgency: '',
    propertyType: '',
    accessibility: '',
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    privacyAccepted: false,
  });

  const currentStep = STEPS[currentStepIndex];
  const progress = ((currentStepIndex + 1) / STEPS.length) * 100;

  useEffect(() => {
    interface WizardAnswer {
      questionId: string;
      answer: string;
    }
    
    const state = location.state as { 
      interventionType?: InterventionType; 
      answers?: WizardAnswer[];
      city?: string 
    } | null;
    
    if (state?.interventionType && state?.city) {
      // Build initial description from wizard answers
      let initialDescription = '';
      
      if (state.answers && state.answers.length > 0) {
        // Format answers as a readable summary
        const answersSummary = state.answers.map(a => a.answer).join(' → ');
        initialDescription = answersSummary + ': ';
      }
      
      setFormData(prev => ({
        ...prev,
        interventionType: state.interventionType!,
        city: state.city!,
        description: initialDescription,
      }));
    } else {
      navigate('/');
    }
  }, [location.state, navigate]);

  const updateFormData = <K extends keyof RequestFormData>(
    key: K,
    value: RequestFormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 'description':
        return formData.description.trim().length > 0;
      case 'urgency':
        return !!formData.urgency;
      case 'propertyType':
        return !!formData.propertyType;
      case 'accessibility':
        return !!formData.accessibility;
      case 'contact':
        return formData.clientName.trim().length > 0 && 
               formData.clientPhone.trim().length > 0 && 
               formData.privacyAccepted;
      default:
        return false;
    }
  };

  const goNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const goBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    } else {
      navigate('/');
    }
  };

  const handleSubmit = async () => {
    if (!formData.interventionType) return;

    setIsSubmitting(true);

    // Using type assertion as the database types will be regenerated
    const insertData = {
      intervention_type: formData.interventionType,
      city: formData.city,
      description: formData.description,
      urgency: formData.urgency,
      property_type: formData.propertyType,
      accessibility: formData.accessibility,
      client_name: formData.clientName,
      client_phone: formData.clientPhone,
      client_email: formData.clientEmail || null,
      privacy_accepted: formData.privacyAccepted,
    };

    const { error } = await supabase
      .from('service_requests')
      .insert(insertData as any);

    setIsSubmitting(false);

    if (error) {
      console.error('Error submitting request:', error);
      toast.error('Si è verificato un errore. Riprova.');
    } else {
      navigate('/conferma');
    }
  };

  const getStepTitle = (): string => {
    switch (currentStep) {
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
      default:
        return '';
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'description':
        return (
          <div className="space-y-4">
            <Textarea
              id="description"
              placeholder="Es. Ho una perdita sotto il lavandino del bagno..."
              value={formData.description}
              onChange={(e) => updateFormData('description', e.target.value)}
              rows={5}
              className="text-base"
              autoFocus
            />
          </div>
        );

      case 'urgency':
        return (
          <div className="grid grid-cols-1 gap-3">
            {URGENCY_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => {
                  updateFormData('urgency', type);
                  setTimeout(goNext, 200);
                }}
                className={`p-5 rounded-lg border transition-all text-left ${
                  formData.urgency === type
                    ? 'border-primary bg-accent text-accent-foreground ring-2 ring-primary'
                    : 'border-border bg-background hover:border-primary/50 hover:bg-accent/50'
                }`}
              >
                <span className="font-medium text-lg">{URGENCY_LABELS[type]}</span>
              </button>
            ))}
          </div>
        );

      case 'propertyType':
        return (
          <div className="grid grid-cols-1 gap-3">
            {PROPERTY_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => {
                  updateFormData('propertyType', type);
                  setTimeout(goNext, 200);
                }}
                className={`p-5 rounded-lg border transition-all text-left ${
                  formData.propertyType === type
                    ? 'border-primary bg-accent text-accent-foreground ring-2 ring-primary'
                    : 'border-border bg-background hover:border-primary/50 hover:bg-accent/50'
                }`}
              >
                <span className="font-medium text-lg">{PROPERTY_LABELS[type]}</span>
              </button>
            ))}
          </div>
        );

      case 'accessibility':
        return (
          <div className="grid grid-cols-1 gap-3">
            {ACCESSIBILITY_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => {
                  updateFormData('accessibility', type);
                  setTimeout(goNext, 200);
                }}
                className={`p-5 rounded-lg border transition-all text-left ${
                  formData.accessibility === type
                    ? 'border-primary bg-accent text-accent-foreground ring-2 ring-primary'
                    : 'border-border bg-background hover:border-primary/50 hover:bg-accent/50'
                }`}
              >
                <span className="font-medium text-lg">{ACCESSIBILITY_LABELS[type]}</span>
              </button>
            ))}
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-5">
            <div>
              <Label htmlFor="name" className="text-base font-medium mb-2 block">
                Nome *
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Il tuo nome"
                value={formData.clientName}
                onChange={(e) => updateFormData('clientName', e.target.value)}
                className="text-base"
                autoFocus
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-base font-medium mb-2 block">
                Numero di telefono *
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Il tuo numero di telefono"
                value={formData.clientPhone}
                onChange={(e) => updateFormData('clientPhone', e.target.value)}
                className="text-base"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-base font-medium mb-2 block">
                Email <span className="text-muted-foreground font-normal">(opzionale)</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="La tua email"
                value={formData.clientEmail}
                onChange={(e) => updateFormData('clientEmail', e.target.value)}
                className="text-base"
              />
            </div>

            <div className="flex items-start gap-3 pt-2">
              <Checkbox
                id="privacy"
                checked={formData.privacyAccepted}
                onCheckedChange={(checked) => updateFormData('privacyAccepted', checked === true)}
              />
              <Label htmlFor="privacy" className="text-sm leading-relaxed cursor-pointer">
                Accetto la{' '}
                <Link to="/privacy" className="text-primary hover:underline" target="_blank">
                  Privacy Policy
                </Link>
                {' '}e i{' '}
                <Link to="/termini" className="text-primary hover:underline" target="_blank">
                  Termini di Utilizzo
                </Link>
              </Label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Passo {currentStepIndex + 1} di {STEPS.length}
                </span>
                <span className="text-sm font-medium text-primary">
                  {Math.round(progress)}%
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-sm">
              {/* Request summary */}
              <div className="mb-6 pb-4 border-b border-border">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {formData.interventionType && INTERVENTION_LABELS[formData.interventionType]}
                  </span>
                  {' · '}
                  {formData.city}
                </p>
              </div>

              {/* Step title */}
              <h2 className="text-xl md:text-2xl font-bold mb-6">
                {getStepTitle()}
              </h2>

              {/* Step content */}
              <div className="min-h-[200px]">
                {renderStepContent()}
              </div>

              {/* Navigation buttons */}
              <div className="flex gap-4 pt-6 mt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={goBack}
                  className="flex-1"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Indietro
                </Button>

                {currentStep === 'contact' ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={!canProceed() || isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? 'Invio...' : 'Invia richiesta'}
                    {!isSubmitting && <Check className="h-4 w-4 ml-2" />}
                  </Button>
                ) : currentStep === 'description' ? (
                  <Button
                    onClick={goNext}
                    disabled={!canProceed()}
                    className="flex-1"
                  >
                    Continua
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
