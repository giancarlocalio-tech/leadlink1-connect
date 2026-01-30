import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NearMeSEOSectionsProps {
  onShowWizard: () => void;
}

export function NearMeIntroSection({ onShowWizard }: NearMeSEOSectionsProps) {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Idraulico vicino a me: come trovare un tecnico affidabile in pochi minuti
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          Quando cerchi un <strong>idraulico vicino a me</strong> significa che hai un problema urgente e ti serve un 
          tecnico nella tua zona in tempi rapidi. Con IdrauliciSubito puoi inviare una richiesta e trovare un 
          idraulico disponibile vicino a te, pronto a intervenire per perdite, tubature intasate, scaldabagni 
          guasti o emergenze domestiche.
        </p>
        <Button onClick={onShowWizard} size="lg" className="rounded-full">
          Trova un idraulico vicino a me ora <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
}

export function NearMeLocalIntentSection() {
  const topCities = [
    { name: 'Milano', slug: 'milano' },
    { name: 'Roma', slug: 'roma' },
    { name: 'Napoli', slug: 'napoli' },
    { name: 'Torino', slug: 'torino' },
    { name: 'Bologna', slug: 'bologna' },
    { name: 'Firenze', slug: 'firenze' },
    { name: 'Genova', slug: 'genova' },
    { name: 'Palermo', slug: 'palermo' },
    { name: 'Bari', slug: 'bari' },
    { name: 'Catania', slug: 'catania' },
    { name: 'Verona', slug: 'verona' },
    { name: 'Padova', slug: 'padova' },
  ];

  return (
    <section className="py-12 bg-muted/50">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Trova un idraulico vicino a te in qualsiasi città italiana
        </h2>
        <p className="text-lg text-muted-foreground text-center leading-relaxed mb-10 max-w-3xl mx-auto">
          Se cerchi un <strong>idraulico vicino a me</strong> a Milano, Roma, Napoli, Torino, Bologna, Firenze 
          o in qualsiasi altra città, puoi inviare una richiesta e trovare un tecnico disponibile nella tua zona. 
          Il servizio è pensato per aiutarti a trovare rapidamente un professionista vicino a casa tua, 
          riducendo i tempi di attesa e risolvendo il problema il prima possibile.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {topCities.map((city) => (
            <Link
              key={city.slug}
              to={`/${city.slug}`}
              className="flex items-center justify-center gap-2 bg-card hover:bg-primary/10 border border-border rounded-lg p-3 text-center transition-colors group"
            >
              <MapPin className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-medium text-sm">{city.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
