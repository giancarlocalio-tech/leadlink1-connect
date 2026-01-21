import { useState } from 'react';
import { Plus, MapPin, Phone, User, FileText, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  INTERVENTION_LABELS, 
  URGENCY_LABELS,
  type InterventionType,
  type UrgencyType 
} from '@/lib/types';
import { CityAutocomplete, type ItalianCity } from '@/components/CityAutocomplete';

interface QuickRequestFormProps {
  onRequestCreated?: () => void;
}

export function QuickRequestForm({ onRequestCreated }: QuickRequestFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    client_name: '',
    client_phone: '',
    city: '',
    intervention_type: '' as InterventionType | '',
    urgency: 'prossimi_giorni' as UrgencyType,
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.client_name.trim()) {
      toast.error('Inserisci il nome del cliente');
      return;
    }
    if (!formData.client_phone.trim()) {
      toast.error('Inserisci il telefono del cliente');
      return;
    }
    if (!formData.city.trim()) {
      toast.error('Inserisci la città');
      return;
    }
    if (!formData.intervention_type) {
      toast.error('Seleziona il tipo di intervento');
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('service_requests')
        .insert({
          client_name: formData.client_name.trim(),
          client_phone: formData.client_phone.trim(),
          city: formData.city.trim(),
          intervention_type: formData.intervention_type,
          urgency: formData.urgency,
          description: formData.description.trim() || `Richiesta da social media - ${INTERVENTION_LABELS[formData.intervention_type]}`,
          property_type: 'casa', // Default
          accessibility: 'media', // Default
          privacy_accepted: true,
          status: 'new',
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Richiesta creata con successo!', {
        description: `ID: ${data.id.slice(0, 8)}... - Gli idraulici della zona verranno notificati.`,
      });

      // Reset form
      setFormData({
        client_name: '',
        client_phone: '',
        city: '',
        intervention_type: '',
        urgency: 'prossimi_giorni',
        description: '',
      });

      onRequestCreated?.();
    } catch (error: any) {
      console.error('Error creating request:', error);
      toast.error('Errore durante la creazione', {
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Quick city presets
  const cityPresets = ['Napoli (NA)', 'Milano (MI)', 'Roma (RM)', 'Torino (TO)', 'Firenze (FI)'];

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 rounded-lg p-2">
            <Zap className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Inserimento Rapido</CardTitle>
            <CardDescription>
              Crea richieste da Facebook/Social in pochi secondi
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: Name and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client_name" className="flex items-center gap-1">
                <User className="h-3 w-3" />
                Nome Cliente *
              </Label>
              <Input
                id="client_name"
                placeholder="Mario Rossi"
                value={formData.client_name}
                onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client_phone" className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                Telefono *
              </Label>
              <Input
                id="client_phone"
                placeholder="+39 333 1234567"
                value={formData.client_phone}
                onChange={(e) => setFormData(prev => ({ ...prev, client_phone: e.target.value }))}
                className="bg-background"
              />
            </div>
          </div>

          {/* Row 2: City with presets */}
          <div className="space-y-2">
            <Label htmlFor="city" className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              Città *
            </Label>
            <CityAutocomplete
              value={formData.city}
              onChange={(city: ItalianCity | null, displayValue: string) => setFormData(prev => ({ ...prev, city: displayValue }))}
              placeholder="Cerca città..."
            />
            <div className="flex flex-wrap gap-1 mt-2">
              {cityPresets.map((city) => (
                <Button
                  key={city}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => setFormData(prev => ({ ...prev, city }))}
                >
                  {city.split(' (')[0]}
                </Button>
              ))}
            </div>
          </div>

          {/* Row 3: Intervention Type and Urgency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <FileText className="h-3 w-3" />
                Tipo Intervento *
              </Label>
              <Select
                value={formData.intervention_type}
                onValueChange={(value) => setFormData(prev => ({ ...prev, intervention_type: value as InterventionType }))}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Seleziona..." />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(INTERVENTION_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Urgenza</Label>
              <Select
                value={formData.urgency}
                onValueChange={(value) => setFormData(prev => ({ ...prev, urgency: value as UrgencyType }))}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(URGENCY_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 4: Description (optional) */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Descrizione (opzionale)
            </Label>
            <Textarea
              id="description"
              placeholder="Dettagli aggiuntivi dal post..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="bg-background min-h-[60px]"
              rows={2}
            />
          </div>

          {/* Submit */}
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
            ) : (
              <Plus className="h-4 w-4 mr-2" />
            )}
            Crea Richiesta
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
