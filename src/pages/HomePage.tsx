import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplets, Wrench, Trash2, Flame, HelpCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Layout } from '@/components/Layout';
import type { InterventionType } from '@/lib/types';
import { INTERVENTION_LABELS } from '@/lib/types';

const INTERVENTION_ICONS: Record<InterventionType, React.ReactNode> = {
  perdita_acqua: <Droplets className="h-6 w-6" />,
  rubinetto_rotto: <Wrench className="h-6 w-6" />,
  scarico_intasato: <Trash2 className="h-6 w-6" />,
  caldaia: <Flame className="h-6 w-6" />,
  altro: <HelpCircle className="h-6 w-6" />,
};

const INTERVENTION_TYPES: InterventionType[] = [
  'perdita_acqua',
  'rubinetto_rotto',
  'scarico_intasato',
  'caldaia',
  'altro',
];

export default function HomePage() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<InterventionType | ''>('');
  const [city, setCity] = useState('');

  const handleContinue = () => {
    if (selectedType && city.trim()) {
      navigate('/richiesta', {
        state: {
          interventionType: selectedType,
          city: city.trim(),
        },
      });
    }
  };

  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Trova un idraulico nella tua zona in pochi minuti
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Invia la tua richiesta e vieni contattato da professionisti disponibili
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-card rounded-lg border border-border p-6 md:p-8 shadow-sm">
            <div className="mb-6">
              <Label className="text-base font-semibold mb-4 block">
                Di che tipo di intervento hai bisogno?
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INTERVENTION_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`flex items-center gap-3 p-4 rounded-lg border transition-all ${
                      selectedType === type
                        ? 'border-primary bg-accent text-accent-foreground'
                        : 'border-border bg-background hover:border-primary/50'
                    }`}
                  >
                    <div className={selectedType === type ? 'text-primary' : 'text-muted-foreground'}>
                      {INTERVENTION_ICONS[type]}
                    </div>
                    <span className="font-medium">{INTERVENTION_LABELS[type]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <Label htmlFor="city" className="text-base font-semibold mb-2 block">
                Dove ti trovi?
              </Label>
              <Input
                id="city"
                type="text"
                placeholder="Inserisci la tua città o CAP"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="text-base"
              />
            </div>

            <Button
              onClick={handleContinue}
              disabled={!selectedType || !city.trim()}
              className="w-full text-base py-6"
              size="lg"
            >
              Continua
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Come funziona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold mb-2">Descrivi il problema</h3>
              <p className="text-muted-foreground text-sm">
                Seleziona il tipo di intervento e compila il modulo guidato
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold mb-2">Invia la richiesta</h3>
              <p className="text-muted-foreground text-sm">
                La tua richiesta sarà visibile agli idraulici della zona
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold mb-2">Vieni contattato</h3>
              <p className="text-muted-foreground text-sm">
                Gli idraulici interessati ti contatteranno direttamente
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
