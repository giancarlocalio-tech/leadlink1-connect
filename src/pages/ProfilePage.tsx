import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import { usePlumberProfile } from '@/hooks/usePlumberProfile';
import { toast } from 'sonner';
import type { InterventionType, AvailabilityType } from '@/lib/types';
import { INTERVENTION_LABELS, AVAILABILITY_LABELS } from '@/lib/types';
import { CityAutocomplete, type ItalianCity } from '@/components/CityAutocomplete';

const INTERVENTION_TYPES: InterventionType[] = [
  'perdita_acqua',
  'rubinetto_rotto',
  'scarico_intasato',
  'caldaia',
  'altro',
];

const AVAILABILITY_TYPES: AvailabilityType[] = [
  'giorni_feriali',
  'weekend',
  'emergenze',
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading, updateProfile } = usePlumberProfile();
  const [isSaving, setIsSaving] = useState(false);
  const [newAreaValue, setNewAreaValue] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    phone: '',
    mainCity: '',
    description: '',
    interventionTypes: [] as InterventionType[],
    availability: [] as AvailabilityType[],
    serviceAreas: [] as string[],
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.full_name,
        businessName: profile.business_name,
        phone: profile.phone,
        mainCity: profile.main_city,
        description: profile.description || '',
        interventionTypes: profile.intervention_types || [],
        availability: profile.availability || [],
        serviceAreas: profile.service_areas || [],
      });
    }
  }, [profile]);

  const toggleInterventionType = (type: InterventionType) => {
    setFormData(prev => ({
      ...prev,
      interventionTypes: prev.interventionTypes.includes(type)
        ? prev.interventionTypes.filter(t => t !== type)
        : [...prev.interventionTypes, type],
    }));
  };

  const toggleAvailability = (type: AvailabilityType) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.includes(type)
        ? prev.availability.filter(t => t !== type)
        : [...prev.availability, type],
    }));
  };

  const addServiceArea = (city: ItalianCity | null, displayValue: string) => {
    const area = displayValue.trim();
    if (area && !formData.serviceAreas.includes(area)) {
      setFormData(prev => ({
        ...prev,
        serviceAreas: [...prev.serviceAreas, area],
      }));
      setNewAreaValue('');
    }
  };

  const removeServiceArea = (area: string) => {
    setFormData(prev => ({
      ...prev,
      serviceAreas: prev.serviceAreas.filter(a => a !== area),
    }));
  };

  const handleSave = async () => {
    if (!formData.fullName || !formData.businessName || !formData.phone || !formData.mainCity) {
      toast.error('Compila tutti i campi obbligatori');
      return;
    }

    setIsSaving(true);

    const { error } = await updateProfile({
      full_name: formData.fullName,
      business_name: formData.businessName,
      phone: formData.phone,
      main_city: formData.mainCity,
      description: formData.description,
      intervention_types: formData.interventionTypes,
      availability: formData.availability,
      service_areas: formData.serviceAreas.length > 0 ? formData.serviceAreas : [formData.mainCity],
    });

    setIsSaving(false);

    if (error) {
      toast.error('Errore durante il salvataggio');
    } else {
      toast.success('Profilo aggiornato');
      navigate('/dashboard');
    }
  };

  if (authLoading || profileLoading) {
    return (
      <Layout>
        <div className="py-16 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-foreground">Modifica Profilo</h1>
            </div>

            <div className="bg-card rounded-lg border border-border p-6 space-y-6">
              {/* Basic info */}
              <div className="space-y-4">
                <h2 className="font-semibold text-foreground">Informazioni base</h2>
                
                <div>
                  <Label htmlFor="fullName" className="mb-2 block">Nome e Cognome</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="businessName" className="mb-2 block">Nome Attività</Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="mb-2 block">Telefono</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="mainCity" className="mb-2 block">Città principale</Label>
                  <CityAutocomplete
                    value={formData.mainCity}
                    onChange={(city, displayValue) => setFormData(prev => ({ ...prev, mainCity: displayValue }))}
                    placeholder="Cerca la tua città..."
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="mb-2 block">Descrizione</Label>
                  <Textarea
                    id="description"
                    placeholder="Descrivi brevemente la tua attività..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>
              </div>

              {/* Service areas */}
              <div className="space-y-4 pt-4 border-t border-border">
                <h2 className="font-semibold text-foreground">Zone di servizio</h2>
                <p className="text-sm text-muted-foreground">
                  Aggiungi le città o zone dove offri i tuoi servizi. Vedrai solo le richieste da queste zone.
                </p>
                
                <div className="flex gap-2">
                  <CityAutocomplete
                    value={newAreaValue}
                    onChange={(city, displayValue) => {
                      setNewAreaValue(displayValue);
                      if (city) {
                        addServiceArea(city, displayValue);
                      }
                    }}
                    placeholder="Cerca e aggiungi città..."
                    className="flex-1"
                  />
                </div>

                {formData.serviceAreas.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.serviceAreas.map((area) => (
                      <span
                        key={area}
                        className="inline-flex items-center gap-1 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm"
                      >
                        {area}
                        <button
                          type="button"
                          onClick={() => removeServiceArea(area)}
                          className="hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Intervention types */}
              <div className="space-y-4 pt-4 border-t border-border">
                <h2 className="font-semibold text-foreground">Tipi di intervento</h2>
                <div className="space-y-3">
                  {INTERVENTION_TYPES.map((type) => (
                    <div key={type} className="flex items-center gap-3">
                      <Checkbox
                        id={`intervention-${type}`}
                        checked={formData.interventionTypes.includes(type)}
                        onCheckedChange={() => toggleInterventionType(type)}
                      />
                      <Label htmlFor={`intervention-${type}`} className="font-normal">
                        {INTERVENTION_LABELS[type]}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="space-y-4 pt-4 border-t border-border">
                <h2 className="font-semibold text-foreground">Disponibilità</h2>
                <div className="space-y-3">
                  {AVAILABILITY_TYPES.map((type) => (
                    <div key={type} className="flex items-center gap-3">
                      <Checkbox
                        id={`availability-${type}`}
                        checked={formData.availability.includes(type)}
                        onCheckedChange={() => toggleAvailability(type)}
                      />
                      <Label htmlFor={`availability-${type}`} className="font-normal">
                        {AVAILABILITY_LABELS[type]}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save button */}
              <div className="pt-4 border-t border-border">
                <Button onClick={handleSave} disabled={isSaving} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? 'Salvataggio...' : 'Salva modifiche'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
