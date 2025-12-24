import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, X, CreditCard, ArrowUpCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import { usePlumberProfile } from '@/hooks/usePlumberProfile';
import { useSubscription } from '@/hooks/useSubscription';
import { useStripeSubscription } from '@/hooks/useStripeSubscription';
import { STRIPE_PLANS, type StripePlanType } from '@/lib/stripeConfig';
import { toast } from 'sonner';
import type { InterventionType, AvailabilityType } from '@/lib/types';
import { INTERVENTION_LABELS, AVAILABILITY_LABELS } from '@/lib/types';
import { CityAutocomplete, type ItalianCity } from '@/components/CityAutocomplete';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

const PLAN_LABELS: Record<string, string> = {
  basic: 'Base',
  medium: 'Medium',
  premium: 'Premium',
};

const INTERVENTION_TYPES: InterventionType[] = [
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
  'rubinetto_rotto',
  'scarico_intasato',
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
  const { subscription, loading: subscriptionLoading } = useSubscription();
  const { createCheckout } = useStripeSubscription();
  const { session } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [newAreaValue, setNewAreaValue] = useState('');
  const [isManagingSubscription, setIsManagingSubscription] = useState(false);
  const [isUpgrading, setIsUpgrading] = useState(false);

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

  const toggleAllInterventions = (selectAll: boolean) => {
    setFormData(prev => ({
      ...prev,
      interventionTypes: selectAll ? [...INTERVENTION_TYPES] : [],
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

  const toggleAllAvailability = (selectAll: boolean) => {
    setFormData(prev => ({
      ...prev,
      availability: selectAll ? [...AVAILABILITY_TYPES] : [],
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

    // Ensure main_city is always included in service_areas
    const finalServiceAreas = formData.serviceAreas.includes(formData.mainCity)
      ? formData.serviceAreas
      : [formData.mainCity, ...formData.serviceAreas];

    const { error } = await updateProfile({
      full_name: formData.fullName,
      business_name: formData.businessName,
      phone: formData.phone,
      main_city: formData.mainCity,
      description: formData.description,
      intervention_types: formData.interventionTypes,
      availability: formData.availability,
      service_areas: finalServiceAreas,
    });

    setIsSaving(false);

    if (error) {
      toast.error('Errore durante il salvataggio');
    } else {
      toast.success('Profilo aggiornato');
      navigate('/dashboard');
    }
  };

  const handleOpenCustomerPortal = async () => {
    setIsManagingSubscription(true);
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });

      if (error) {
        toast.error('Errore nell\'apertura del portale');
        return;
      }

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (err) {
      console.error('Error opening portal:', err);
      toast.error('Errore nell\'apertura del portale');
    } finally {
      setIsManagingSubscription(false);
    }
  };

  const handleUpgradePlan = async (planType: StripePlanType) => {
    setIsUpgrading(true);
    try {
      const url = await createCheckout(planType);
      if (url) {
        window.open(url, '_blank');
      }
    } finally {
      setIsUpgrading(false);
    }
  };

  const getCurrentPlanType = (): StripePlanType | null => {
    if (!subscription) return null;
    return subscription.plan_type as StripePlanType;
  };

  const getAvailableUpgrades = (): StripePlanType[] => {
    const currentPlan = getCurrentPlanType();
    if (!currentPlan) return ['basic', 'medium', 'premium'];
    
    const planOrder: StripePlanType[] = ['basic', 'medium', 'premium'];
    const currentIndex = planOrder.indexOf(currentPlan);
    return planOrder.slice(currentIndex + 1);
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
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-foreground">Tipi di intervento</h2>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => toggleAllInterventions(formData.interventionTypes.length !== INTERVENTION_TYPES.length)}
                  >
                    {formData.interventionTypes.length === INTERVENTION_TYPES.length ? 'Deseleziona tutti' : 'Seleziona tutti'}
                  </Button>
                </div>
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
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-foreground">Disponibilità</h2>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => toggleAllAvailability(formData.availability.length !== AVAILABILITY_TYPES.length)}
                  >
                    {formData.availability.length === AVAILABILITY_TYPES.length ? 'Deseleziona tutti' : 'Seleziona tutti'}
                  </Button>
                </div>
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

              {/* Subscription Management */}
              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <h2 className="font-semibold text-foreground">Gestione Abbonamento</h2>
                </div>

                {subscriptionLoading ? (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Caricamento abbonamento...</span>
                  </div>
                ) : subscription ? (
                  <div className="space-y-4">
                    {/* Current plan info */}
                    <div className="bg-accent/50 rounded-lg p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Piano attuale</span>
                        <Badge variant="default" className="bg-primary">
                          {PLAN_LABELS[subscription.plan_type] || subscription.plan_type}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Stato</span>
                        <Badge variant={subscription.status === 'active' ? 'default' : 'secondary'}>
                          {subscription.status === 'active' ? 'Attivo' : subscription.status === 'pending' ? 'In attesa' : subscription.status}
                        </Badge>
                      </div>
                      {subscription.current_period_end && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Prossimo rinnovo</span>
                          <span className="text-sm font-medium">
                            {new Date(subscription.current_period_end).toLocaleDateString('it-IT')}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Upgrade options */}
                    {getAvailableUpgrades().length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Passa a un piano superiore:</p>
                        <div className="flex flex-wrap gap-2">
                          {getAvailableUpgrades().map((planType) => (
                            <Button
                              key={planType}
                              variant="outline"
                              size="sm"
                              disabled={isUpgrading}
                              onClick={() => handleUpgradePlan(planType)}
                              className="gap-2"
                            >
                              <ArrowUpCircle className="h-4 w-4" />
                              {PLAN_LABELS[planType]} - €{STRIPE_PLANS[planType].price_monthly}/mese
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Manage subscription button */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        variant="outline"
                        onClick={handleOpenCustomerPortal}
                        disabled={isManagingSubscription}
                        className="gap-2"
                      >
                        {isManagingSubscription ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <CreditCard className="h-4 w-4" />
                        )}
                        Gestisci Pagamento
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleOpenCustomerPortal}
                        disabled={isManagingSubscription}
                        className="gap-2"
                      >
                        {isManagingSubscription ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <XCircle className="h-4 w-4" />
                        )}
                        Annulla Abbonamento
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Verrai reindirizzato al portale Stripe per gestire il tuo abbonamento.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Non hai un abbonamento attivo.
                    </p>
                    <Button onClick={() => navigate('/abbonamento')} className="gap-2">
                      <CreditCard className="h-4 w-4" />
                      Scegli un piano
                    </Button>
                  </div>
                )}
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
