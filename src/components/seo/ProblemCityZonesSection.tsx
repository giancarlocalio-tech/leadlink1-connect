/**
 * ProblemCityZonesSection - "Zone servite a [città]"
 * 
 * SEO section showing neighborhoods and areas served in the city
 */

import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProblemCityZonesSectionProps {
  cityName: string;
  citySlug: string;
  neighborhoods: string;
  problemName: string;
}

// Extended neighborhoods by city
const extendedNeighborhoods: Record<string, string[]> = {
  milano: ["Navigli", "Porta Romana", "Città Studi", "Isola", "Brera", "Loreto", "Lambrate", "San Siro", "Sempione", "Bicocca"],
  roma: ["Trastevere", "Prati", "Testaccio", "San Giovanni", "EUR", "Monteverde", "Parioli", "Trionfale", "Nomentano", "Garbatella"],
  torino: ["San Salvario", "Crocetta", "Vanchiglia", "Aurora", "Lingotto", "Santa Rita", "Barriera di Milano", "Cenisia", "Borgo Dora", "Madonna del Pilone"],
  napoli: ["Chiaia", "Vomero", "Posillipo", "Quartieri Spagnoli", "Fuorigrotta", "Bagnoli", "Arenella", "Mergellina", "Ponticelli", "San Giovanni a Teduccio"],
  bologna: ["Santo Stefano", "Bolognina", "Saragozza", "San Donato", "Savena", "Borgo Panigale", "Mazzini", "San Vitale", "Corticella", "Barca"],
  firenze: ["Oltrarno", "Santa Croce", "San Lorenzo", "Campo di Marte", "Novoli", "Rifredi", "Gavinana", "Isolotto", "Le Cure", "Coverciano"],
  genova: ["Centro storico", "Nervi", "Albaro", "Sampierdarena", "Sestri Ponente", "Pegli", "Bolzaneto", "Cornigliano", "Quarto", "Marassi"],
  verona: ["Borgo Trento", "Veronetta", "San Zeno", "Borgo Roma", "Stadio", "Santa Lucia", "Golosine", "Montorio", "Quinzano", "San Massimo"],
  bari: ["Bari Vecchia", "Libertà", "Poggiofranco", "Japigia", "Madonnella", "San Pasquale", "Carrassi", "Picone", "Mungivacca", "Santo Spirito"],
  padova: ["Portello", "Prato della Valle", "Arcella", "Mandria", "Ponte di Brenta", "San Lazzaro", "Madonna Pellegrina", "Mortise", "Torre", "Guizza"]
};

export function ProblemCityZonesSection({ 
  cityName, 
  citySlug, 
  neighborhoods,
  problemName 
}: ProblemCityZonesSectionProps) {
  const zones = extendedNeighborhoods[citySlug] || neighborhoods.split(", ");

  return (
    <section className="bg-card rounded-xl p-6 border border-border">
      <h2 className="text-lg md:text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        <MapPin className="h-5 w-5 text-primary" />
        Zone Servite a {cityName}
      </h2>
      
      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
        Gli idraulici operano in tutte le zone di {cityName} per interventi su {problemName.toLowerCase()}, 
        incluse le aree di:
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {zones.slice(0, 10).map((zone, index) => (
          <span 
            key={index}
            className="bg-muted px-3 py-1.5 rounded-full text-sm text-foreground"
          >
            {zone}
          </span>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        Copriamo anche le aree periferiche e i comuni limitrofi della provincia di {cityName}.
      </p>

      {/* Link to main city page */}
      <div className="mt-4 pt-3 border-t border-border">
        <Link 
          to={`/${citySlug}`}
          className="text-primary hover:underline text-sm font-medium inline-flex items-center gap-1"
        >
          Scopri tutti i servizi idraulici a {cityName} →
        </Link>
      </div>
    </section>
  );
}
