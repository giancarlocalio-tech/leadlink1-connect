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
const PROPERTY_TYPES: PropertyType[] = ['casa', 'appartamento', 'negozio'];
const ACCESSIBILITY_TYPES: AccessibilityType[] = ['facile', 'media', 'difficile'];

type Step = 'details' | 'contact';

export default function RequestPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('details');
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

  useEffect(() => {
    const state = location.state as { interventionType?: InterventionType; city?: string } | null;
    if (state?.interventionType && state?.city) {
      setFormData(prev => ({
        ...prev,
        interventionType: state.interventionType!,
        city: state.city!,
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

  const isDetailsComplete = 
    formData.description.trim() && 
    formData.urgency && 
    formData.propertyType && 
    formData.accessibility;

  const isContactComplete = 
    formData.clientName.trim() && 
    formData.clientPhone.trim() && 
    formData.privacyAccepted;

  const handleSubmit = async () => {
    if (!isContactComplete || !formData.interventionType) return;

    setIsSubmitting(true);

    const { error } = await supabase
      .from('service_requests')
      .insert({
        intervention_type: formData.interventionType,
        city: formData.city,
        description: formData.description,
        urgency: formData.urgency as UrgencyType,
        property_type: formData.propertyType as PropertyType,
        accessibility: formData.accessibility as AccessibilityType,
        client_name: formData.clientName,
        client_phone: formData.clientPhone,
        client_email: formData.clientEmail || null,
        privacy_accepted: formData.privacyAccepted,
      });

    setIsSubmitting(false);

    if (error) {
      console.error('Error submitting request:', error);
      toast.error('Si è verificato un errore. Riprova.');
    } else {
      navigate('/conferma');
    }
  };

  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Progress indicator */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className={`flex items-center gap-2 ${step === 'details' ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step === 'details' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}>
                  {step === 'contact' ? <Check className="h-4 w-4" /> : '1'}
                </div>
                <span className="hidden sm:inline text-sm font-medium">Dettagli</span>
              </div>
              <div className="w-8 h-px bg-border" />
              <div className={`flex items-center gap-2 ${step === 'contact' ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step === 'contact' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}>
                  2
                </div>
                <span className="hidden sm:inline text-sm font-medium">Contatto</span>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6 md:p-8 shadow-sm">
              {/* Request summary */}
              <div className="mb-6 pb-6 border-b border-border">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {formData.interventionType && INTERVENTION_LABELS[formData.interventionType]}
                  </span>
                  {' · '}
                  {formData.city}
                </p>
              </div>

              {step === 'details' && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="description" className="text-base font-semibold mb-2 block">
                      Descrivi brevemente il problema
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Es. Ho una perdita sotto il lavandino del bagno..."
                      value={formData.description}
                      onChange={(e) => updateFormData('description', e.target.value)}
                      rows={4}
                      className="text-base"
                    />
                  </div>

                  <div>
                    <Label className="text-base font-semibold mb-3 block">
                      Quanto è urgente?
                    </Label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {URGENCY_TYPES.map((type) => (
                        <button
                          key={type}
                          onClick={() => updateFormData('urgency', type)}
                          className={`p-4 rounded-lg border transition-all text-center ${
                            formData.urgency === type
                              ? 'border-primary bg-accent text-accent-foreground'
                              : 'border-border bg-background hover:border-primary/50'
                          }`}
                        >
                          <span className="font-medium">{URGENCY_LABELS[type]}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-semibold mb-3 block">
                      Tipo di abitazione
                    </Label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {PROPERTY_TYPES.map((type) => (
                        <button
                          key={type}
                          onClick={() => updateFormData('propertyType', type)}
                          className={`p-4 rounded-lg border transition-all text-center ${
                            formData.propertyType === type
                              ? 'border-primary bg-accent text-accent-foreground'
                              : 'border-border bg-background hover:border-primary/50'
                          }`}
                        >
                          <span className="font-medium">{PROPERTY_LABELS[type]}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-semibold mb-3 block">
                      Accessibilità
                    </Label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {ACCESSIBILITY_TYPES.map((type) => (
                        <button
                          key={type}
                          onClick={() => updateFormData('accessibility', type)}
                          className={`p-4 rounded-lg border transition-all text-center ${
                            formData.accessibility === type
                              ? 'border-primary bg-accent text-accent-foreground'
                              : 'border-border bg-background hover:border-primary/50'
                          }`}
                        >
                          <span className="font-medium">{ACCESSIBILITY_LABELS[type]}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => navigate('/')}
                      className="flex-1"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Indietro
                    </Button>
                    <Button
                      onClick={() => setStep('contact')}
                      disabled={!isDetailsComplete}
                      className="flex-1"
                    >
                      Continua
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 'contact' && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-base font-semibold mb-2 block">
                      Nome
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Il tuo nome"
                      value={formData.clientName}
                      onChange={(e) => updateFormData('clientName', e.target.value)}
                      className="text-base"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-base font-semibold mb-2 block">
                      Numero di telefono
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
                    <Label htmlFor="email" className="text-base font-semibold mb-2 block">
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
                    <Label htmlFor="privacy" className="text-sm leading-relaxed">
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

                  <div className="flex gap-4 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setStep('details')}
                      className="flex-1"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Indietro
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={!isContactComplete || isSubmitting}
                      className="flex-1"
                    >
                      {isSubmitting ? 'Invio...' : 'Invia richiesta'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
