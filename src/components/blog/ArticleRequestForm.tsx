import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Wrench, Check, Loader2, CheckCircle, Phone, Mail, User, MapPin } from 'lucide-react';
import { CityAutocomplete, type ItalianCity } from '@/components/CityAutocomplete';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import analytics from '@/lib/analytics';

interface ArticleRequestFormProps {
  /** Pre-fill intervention type based on article context */
  interventionType?: string;
  /** Problem description from article context */
  problemContext?: string;
  /** Title displayed above the form */
  title?: string;
  /** Description displayed above the form */
  description?: string;
}

export function ArticleRequestForm({
  interventionType = 'altro',
  problemContext = '',
  title = 'Non si è ancora risolto?',
  description = 'Trova subito un idraulico qualificato vicino a te.',
}: ArticleRequestFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form fields
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [city, setCity] = useState('');
  const [selectedCity, setSelectedCity] = useState<ItalianCity | null>(null);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const handleCityChange = (cityData: ItalianCity | null, displayValue: string) => {
    setCity(displayValue);
    setSelectedCity(cityData);
  };

  const canSubmit = 
    clientName.trim().length > 0 && 
    clientPhone.trim().length >= 8 && 
    clientEmail.trim().length > 0 &&
    selectedCity !== null && 
    privacyAccepted;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canSubmit) {
      toast.error('Compila tutti i campi obbligatori.');
      return;
    }

    setIsSubmitting(true);
    
    analytics.leadFormSubmit(interventionType, city, 'entro_24_ore');

    const requestPayload = {
      intervention_type: interventionType,
      city: `${selectedCity!.name} (${selectedCity!.province_code})`,
      description: problemContext || 'Richiesta da articolo blog - contattare per dettagli',
      urgency: 'entro_24_ore',
      property_type: 'casa',
      accessibility: 'facile',
      client_name: clientName.trim(),
      client_phone: clientPhone.trim(),
      client_email: clientEmail.trim(),
      privacy_accepted: privacyAccepted,
      wizard_answers: problemContext ? [{ questionId: 'article_context', questionTitle: 'Contesto', answer: problemContext }] : null,
    };

    try {
      const { data, error } = await supabase.functions.invoke('notify-plumbers', {
        body: { request: requestPayload },
      });

      if (error || (data as any)?.error) {
        throw new Error(error?.message || (data as any)?.error || 'Unknown error');
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success('Richiesta inviata con successo!');
    } catch (err) {
      console.error('Error submitting request:', err);
      toast.error('Si è verificato un errore. Riprova.');
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-primary/10 border-2 border-primary/30 rounded-2xl p-8 my-10 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Richiesta inviata! ✅
        </h3>
        <p className="text-muted-foreground mb-4">
          Un idraulico qualificato nella tua zona ti contatterà a breve.
        </p>
        <p className="text-sm text-muted-foreground">
          Controlla il telefono e l'email per ricevere il preventivo.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-primary/10 border-2 border-primary/30 rounded-2xl p-6 md:p-8 my-10">
      <div className="text-center mb-6">
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          {title}
        </h3>
        <p className="text-muted-foreground text-lg">
          {description}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        {/* Name */}
        <div>
          <Label htmlFor="inline-name" className="text-sm font-medium mb-1.5 block">
            <User className="h-4 w-4 inline mr-1" />
            Nome *
          </Label>
          <Input
            id="inline-name"
            type="text"
            placeholder="Il tuo nome"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="bg-background"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="inline-phone" className="text-sm font-medium mb-1.5 block">
            <Phone className="h-4 w-4 inline mr-1" />
            Telefono *
          </Label>
          <Input
            id="inline-phone"
            type="tel"
            placeholder="Il tuo numero di telefono"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
            className="bg-background"
            required
          />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="inline-email" className="text-sm font-medium mb-1.5 block">
            <Mail className="h-4 w-4 inline mr-1" />
            Email *
          </Label>
          <Input
            id="inline-email"
            type="email"
            placeholder="La tua email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            className="bg-background"
            required
          />
        </div>

        {/* City */}
        <div>
          <Label htmlFor="inline-city" className="text-sm font-medium mb-1.5 block">
            <MapPin className="h-4 w-4 inline mr-1" />
            Città *
          </Label>
          <CityAutocomplete
            value={city}
            onChange={handleCityChange}
            placeholder="Cerca la tua città..."
            className="bg-background"
          />
          {selectedCity && (
            <p className="text-xs text-primary mt-1 flex items-center gap-1">
              <Check className="h-3 w-3" />
              {selectedCity.name} ({selectedCity.province_code})
            </p>
          )}
        </div>

        {/* Privacy */}
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
              Termini di Utilizzo
            </Link>
          </Label>
        </div>

        {/* Submit */}
        <Button 
          type="submit" 
          size="lg" 
          className="w-full text-lg py-6 h-auto font-semibold shadow-lg hover:shadow-xl transition-all"
          disabled={!canSubmit || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Invio in corso...
            </>
          ) : (
            <>
              <Wrench className="h-5 w-5 mr-2" />
              🔧 TROVA UN IDRAULICO ORA
            </>
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Servizio gratuito • Preventivo senza impegno • Risposta rapida
        </p>
      </form>
    </div>
  );
}
