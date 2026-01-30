/**
 * ProblemCityWhereSection - "Dove succede più spesso a [Città]?"
 * 
 * Shows neighborhoods where the problem is most common
 */

import { MapPin } from 'lucide-react';

interface ProblemCityWhereSectionProps {
  cityName: string;
  citySlug: string;
  problemName: string;
  problemSlug: string;
  neighborhoods: string;
  buildingAge: string;
}

// Extended neighborhoods by city with specific areas
const cityNeighborhoodsExtended: Record<string, string[]> = {
  milano: ["Centro storico", "Navigli", "Porta Romana", "Città Studi", "Isola", "Lambrate", "Bovisa", "Brera"],
  roma: ["Centro storico", "Trastevere", "Prati", "Testaccio", "San Giovanni", "Pigneto", "Garbatella", "Monteverde"],
  torino: ["Centro", "San Salvario", "Crocetta", "Vanchiglia", "Aurora", "Barriera di Milano", "Mirafiori", "Lingotto"],
  napoli: ["Centro storico", "Chiaia", "Vomero", "Posillipo", "Quartieri Spagnoli", "Fuorigrotta", "Bagnoli", "Mergellina"],
  bologna: ["Centro storico", "Santo Stefano", "Bolognina", "Saragozza", "San Donato", "Savena", "Navile", "Porto"],
  firenze: ["Centro", "Oltrarno", "Santa Croce", "San Lorenzo", "Campo di Marte", "Rifredi", "Novoli", "Gavinana"],
  genova: ["Centro storico", "Nervi", "Albaro", "Sampierdarena", "Sestri Ponente", "Voltri", "Foce", "Marassi"],
  verona: ["Centro storico", "Borgo Trento", "Veronetta", "San Zeno", "Borgo Roma", "Stadio", "Golosine", "Montorio"],
  bari: ["Centro murattiano", "Bari Vecchia", "Libertà", "Poggiofranco", "Japigia", "Carrassi", "Madonnella", "San Paolo"],
  padova: ["Centro storico", "Portello", "Prato della Valle", "Arcella", "Mandria", "Sant'Osvaldo", "Forcellini", "Guizza"],
  palermo: ["Centro storico", "Kalsa", "Vucciria", "Politeama", "Mondello", "Zisa", "Brancaccio", "Partanna"],
  catania: ["Centro storico", "Ognina", "Borgo", "San Giovanni Galermo", "Librino", "Nesima", "Cibali", "Picanello"],
  venezia: ["San Marco", "Cannaregio", "Dorsoduro", "Mestre centro", "Marghera", "Giudecca", "Murano", "Lido"],
  trieste: ["Centro", "Barcola", "Roiano", "San Giovanni", "Servola", "Muggia", "Gretta", "San Vito"]
};

// Problem-specific location context
const problemLocationContext: Record<string, string> = {
  "lavandino-intasato": "negli edifici con impianti datati e nelle zone con acqua molto calcarea. I condomini degli anni '60-'80 sono particolarmente soggetti",
  "wc-otturato": "nelle abitazioni con tubature di scarico sottodimensionate, tipiche degli edifici costruiti prima degli anni '90",
  "scaldabagno-non-scalda": "nelle case con impianti elettrici o a gas datati, specialmente in condomini senza manutenzione regolare",
  "caldaia-in-blocco": "durante i mesi invernali, in particolare negli appartamenti dove la caldaia non viene sottoposta a manutenzione annuale",
  "tubo-che-perde": "nei palazzi storici con tubature in ferro zincato o piombo, soggette a corrosione e usura",
  "doccia-non-scarica": "nei bagni ristrutturati con piatti doccia a filo pavimento e nei box doccia con piletta di scarico sottodimensionata",
  "scarico-cucina-lento": "nelle cucine con sifoni vecchi e nelle abitazioni dove si scaricano frequentemente grassi e residui alimentari",
  "termosifone-freddo": "nei condomini con impianto centralizzato datato e nelle case con termosifoni mai sfiatati"
};

export function ProblemCityWhereSection({
  cityName,
  citySlug,
  problemName,
  problemSlug,
  neighborhoods,
  buildingAge
}: ProblemCityWhereSectionProps) {
  const extendedNeighborhoods = cityNeighborhoodsExtended[citySlug] || neighborhoods.split(', ').slice(0, 5);
  const locationContext = problemLocationContext[problemSlug] || "nelle zone con edifici più datati e impianti non recentemente rinnovati";

  return (
    <section className="py-6">
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
        <MapPin className="h-6 w-6 text-primary" />
        Dove Succede Più Spesso a {cityName}?
      </h2>
      
      <div className="prose prose-lg max-w-none mb-6">
        <p className="text-muted-foreground leading-relaxed">
          A {cityName}, il problema di <strong className="text-foreground">{problemName.toLowerCase()}</strong> si 
          verifica frequentemente {locationContext}. La città presenta {buildingAge}, che contribuiscono 
          a rendere questo problema particolarmente diffuso in alcune zone.
        </p>
      </div>

      <div className="bg-muted/30 rounded-xl p-5 border border-border">
        <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
          Zone più colpite a {cityName}:
        </h3>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {extendedNeighborhoods.slice(0, 8).map((neighborhood, index) => (
            <li 
              key={index}
              className="flex items-center gap-2 text-muted-foreground text-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              {neighborhood}
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground mt-4 pt-3 border-t border-border">
          💡 Se abiti in una di queste zone e riscontri {problemName.toLowerCase()}, 
          potrebbe essere legato alle caratteristiche degli impianti locali.
        </p>
      </div>
    </section>
  );
}
