/**
 * CityWhySection - "Perché succede spesso a [CITTÀ]"
 * 
 * Displays localized content explaining why this problem is common
 * in the specific city based on water type, building age, climate, etc.
 */

import { MapPin, Building2, Droplets, Thermometer } from 'lucide-react';

interface CityWhySectionProps {
  cityName: string;
  problemName: string;
  waterType: string;
  buildingAge: string;
  commonIssues: string;
  neighborhoods: string;
  problemSlug: string;
}

// Problem-specific local reasons
const getProblemSpecificReasons = (
  problemSlug: string,
  cityName: string,
  waterType: string,
  buildingAge: string,
  commonIssues: string
): { icon: React.ComponentType<{ className?: string }>; title: string; description: string }[] => {
  const baseReasons = {
    "lavandino-intasato": [
      {
        icon: Droplets,
        title: "Qualità dell'acqua",
        description: `L'${waterType} tipica di ${cityName} favorisce l'accumulo di calcare che si combina con sapone e residui organici, creando ostruzioni più resistenti.`
      },
      {
        icon: Building2,
        title: "Età degli edifici",
        description: `Gli ${buildingAge} hanno spesso tubature di diametro ridotto e materiali più soggetti a incrostazioni.`
      },
      {
        icon: MapPin,
        title: "Problematiche locali",
        description: `${commonIssues.charAt(0).toUpperCase() + commonIssues.slice(1)} rendono il problema particolarmente frequente in questa zona.`
      }
    ],
    "wc-otturato": [
      {
        icon: Droplets,
        title: "Caratteristiche dell'acqua",
        description: `L'${waterType} di ${cityName} può contribuire alla formazione di depositi calcarei nel sifone del WC, riducendo il passaggio.`
      },
      {
        icon: Building2,
        title: "Impianti datati",
        description: `Negli ${buildingAge}, i WC spesso hanno scarichi con pendenze non ottimali e tubature di vecchia generazione.`
      },
      {
        icon: Thermometer,
        title: "Fattori stagionali",
        description: `Durante i mesi freddi, la temperatura più bassa dell'acqua rallenta lo scioglimento dei depositi organici.`
      }
    ],
    "scaldabagno-non-scalda": [
      {
        icon: Droplets,
        title: "Durezza dell'acqua",
        description: `L'${waterType} accelera la formazione di calcare sulla resistenza e sulla serpentina, riducendo l'efficienza.`
      },
      {
        icon: Building2,
        title: "Tipologia impiantistica",
        description: `Negli ${buildingAge} di ${cityName}, gli scaldabagni sono spesso dimensionati per esigenze diverse da quelle attuali.`
      },
      {
        icon: Thermometer,
        title: "Temperature invernali",
        description: `Gli inverni di ${cityName} richiedono uno sforzo maggiore agli scaldabagni, accelerando l'usura dei componenti.`
      }
    ],
    "caldaia-in-blocco": [
      {
        icon: Droplets,
        title: "Qualità dell'acqua",
        description: `L'${waterType} causa depositi di fanghi e calcare nell'impianto che possono mandare in blocco la caldaia.`
      },
      {
        icon: Building2,
        title: "Impianti condominiali",
        description: `Negli ${buildingAge}, gli impianti centralizzati e le colonne montanti datate creano problemi di pressione.`
      },
      {
        icon: Thermometer,
        title: "Sollecitazione invernale",
        description: `Durante i mesi freddi a ${cityName}, le caldaie lavorano a regime massimo, aumentando il rischio di blocchi.`
      }
    ],
    "tubo-che-perde": [
      {
        icon: Droplets,
        title: "Corrosione accelerata",
        description: `L'${waterType} accelera la corrosione delle tubature metalliche, tipiche degli ${buildingAge}.`
      },
      {
        icon: Building2,
        title: "Materiali obsoleti",
        description: `Molti edifici di ${cityName} hanno ancora tubature in ferro zincato o rame datato soggetti a perdite.`
      },
      {
        icon: Thermometer,
        title: "Sbalzi termici",
        description: `Le escursioni termiche stagionali di ${cityName} stressano le giunzioni e i raccordi delle tubature.`
      }
    ],
    "doccia-non-scarica": [
      {
        icon: Droplets,
        title: "Depositi calcarei",
        description: `L'${waterType} forma incrostazioni nella piletta e nelle tubature che intrappolano capelli e sapone.`
      },
      {
        icon: Building2,
        title: "Design dei bagni",
        description: `I bagni negli ${buildingAge} spesso hanno pendenze insufficienti e pilette di dimensioni ridotte.`
      },
      {
        icon: MapPin,
        title: "Fattori locali",
        description: `${commonIssues.charAt(0).toUpperCase() + commonIssues.slice(1)} contribuiscono a questo problema frequente.`
      }
    ],
    "scarico-cucina-lento": [
      {
        icon: Droplets,
        title: "Reazione con i grassi",
        description: `L'${waterType} reagisce con i grassi alimentari creando depositi saponosi difficili da rimuovere.`
      },
      {
        icon: Building2,
        title: "Tubature sottodimensionate",
        description: `Le cucine negli ${buildingAge} hanno spesso scarichi con diametri non adeguati all'uso moderno.`
      },
      {
        icon: Thermometer,
        title: "Temperature stagionali",
        description: `In inverno, i grassi si solidificano più rapidamente nelle tubature, accelerando le ostruzioni.`
      }
    ],
    "termosifone-freddo": [
      {
        icon: Droplets,
        title: "Fanghi e calcare",
        description: `L'${waterType} deposita fanghi e calcare nei radiatori, riducendo la circolazione dell'acqua calda.`
      },
      {
        icon: Building2,
        title: "Impianti storici",
        description: `Negli ${buildingAge} di ${cityName}, gli impianti di riscaldamento sono spesso datati e mai lavati.`
      },
      {
        icon: Thermometer,
        title: "Clima invernale",
        description: `Gli inverni di ${cityName} mettono sotto stress gli impianti, evidenziando problemi di distribuzione.`
      }
    ]
  };

  return baseReasons[problemSlug as keyof typeof baseReasons] || baseReasons["lavandino-intasato"];
};

export function CityWhySection({
  cityName,
  problemName,
  waterType,
  buildingAge,
  commonIssues,
  neighborhoods,
  problemSlug
}: CityWhySectionProps) {
  const reasons = getProblemSpecificReasons(problemSlug, cityName, waterType, buildingAge, commonIssues);

  return (
    <section className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 md:p-8 border border-primary/20">
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
        <MapPin className="h-6 w-6 text-primary" />
        Perché {problemName} Succede Spesso a {cityName}?
      </h2>
      
      <p className="text-muted-foreground mb-6">
        A {cityName}, questo problema è particolarmente frequente per una combinazione di fattori locali 
        che interessano soprattutto le zone di {neighborhoods}.
      </p>

      <div className="grid gap-4 md:gap-6">
        {reasons.map((reason, index) => (
          <div 
            key={index}
            className="bg-card rounded-xl p-4 md:p-5 border border-border flex gap-4"
          >
            <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <reason.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">{reason.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
