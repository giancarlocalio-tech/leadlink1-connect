/**
 * CityIntroSection - Strong local SEO intro for city pages
 * 
 * Generates a personalized intro that:
 * - Mentions the city 3+ times naturally
 * - Talks about local building characteristics
 * - Mentions coverage of entire city and nearby areas
 */

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CityIntroSectionProps {
  cityName: string;
  citySlug: string;
  region: string;
  onRequestClick: () => void;
}

// City-specific intro content
const getCityIntroContent = (cityName: string, citySlug: string, region: string) => {
  const cityIntros: Record<string, { paragraph1: string; paragraph2: string; buildingContext: string }> = {
    'milano': {
      paragraph1: `Se stai cercando un idraulico a Milano pronto a intervenire per perdite d'acqua, scarichi intasati o altre emergenze, sei nel posto giusto. Milano, con i suoi edifici storici nel centro e i condomini degli anni '60-'80 nelle zone residenziali, presenta spesso problematiche idrauliche legate all'età degli impianti e alla durezza dell'acqua.`,
      paragraph2: `Il nostro servizio collega rapidamente chi ha bisogno con tecnici disponibili a Milano e provincia, qualunque sia il problema idraulico. Interveniamo in tutte le zone: dal Centro ai Navigli, da Porta Romana a Lambrate, fino alle periferie e ai comuni limitrofi.`,
      buildingContext: 'condomini storici, palazzi d\'epoca e nuove costruzioni'
    },
    'roma': {
      paragraph1: `Cerchi un idraulico a Roma per un'emergenza o una riparazione? Roma, con il suo patrimonio edilizio che spazia dai palazzi storici del Centro alle costruzioni moderne di EUR e Tiburtino, richiede professionisti esperti in ogni tipo di impianto idraulico.`,
      paragraph2: `Il nostro servizio ti mette in contatto con idraulici professionisti disponibili in tutta Roma e provincia. Interveniamo in ogni quartiere: dal Centro Storico a Trastevere, da Prati a Monteverde, fino a Ostia e ai Castelli Romani.`,
      buildingContext: 'palazzi storici, condomini e abitazioni moderne'
    },
    'napoli': {
      paragraph1: `Hai bisogno di un idraulico a Napoli? La città partenopea, con i suoi edifici storici nel Centro e i complessi residenziali di Vomero e Fuorigrotta, presenta sfide idrauliche uniche legate alla conformazione del territorio e all'età degli impianti.`,
      paragraph2: `Con IdrauliciSubito trovi rapidamente un professionista disponibile a Napoli e in tutta la provincia. Copriamo ogni zona: dal Centro Storico a Chiaia, da Posillipo a Ponticelli, fino a Pozzuoli, Portici e tutti i comuni limitrofi.`,
      buildingContext: 'palazzi storici, condomini e ville'
    },
    'torino': {
      paragraph1: `Stai cercando un idraulico a Torino per un intervento urgente? Torino, con la sua architettura sabauda nel centro e i quartieri residenziali come Mirafiori e Santa Rita, richiede tecnici esperti capaci di lavorare su impianti di ogni epoca.`,
      paragraph2: `Il nostro servizio ti collega con idraulici professionisti attivi in tutta Torino e prima cintura. Interveniamo ovunque: dal Centro a San Salvario, da Crocetta al Lingotto, fino a Moncalieri, Collegno e tutti i comuni della provincia.`,
      buildingContext: 'palazzi storici, condomini anni \'60 e nuove costruzioni'
    },
    'bologna': {
      paragraph1: `Cerchi un idraulico a Bologna disponibile per un'emergenza? Bologna, famosa per i suoi portici storici e i quartieri universitari densamente popolati, presenta spesso problemi idraulici legati all'età degli edifici e all'alto turnover abitativo.`,
      paragraph2: `Con IdrauliciSubito trovi rapidamente un professionista a Bologna e dintorni. Copriamo tutta la città: dal Centro alla Bolognina, da San Donato a Savena, fino a Casalecchio, San Lazzaro e tutti i comuni della provincia.`,
      buildingContext: 'edifici storici sotto i portici, condomini e studentati'
    },
    'firenze': {
      paragraph1: `Hai bisogno di un idraulico a Firenze? La città del Rinascimento, con i suoi edifici storici nel centro e le zone residenziali di Campo di Marte e Rifredi, richiede professionisti esperti in impianti di ogni tipo e epoca.`,
      paragraph2: `Il nostro servizio ti mette in contatto con idraulici professionisti disponibili in tutta Firenze e provincia. Interveniamo in ogni quartiere: dal Centro a Santa Croce, da San Lorenzo a Novoli, fino a Scandicci, Fiesole e tutti i comuni limitrofi.`,
      buildingContext: 'palazzi rinascimentali, condomini e ville collinari'
    },
    'genova': {
      paragraph1: `Cerchi un idraulico a Genova per un'emergenza idraulica? Genova, con il suo Centro Storico labirintico e le costruzioni che si arrampicano sulle colline, presenta sfide uniche per gli impianti idraulici, spesso aggravate dall'umidità marina.`,
      paragraph2: `Con IdrauliciSubito trovi rapidamente un professionista a Genova e in tutta la riviera. Copriamo ogni zona: dal Centro a Nervi, da Sampierdarena a Pegli, fino a Rapallo, Chiavari e tutti i comuni della provincia.`,
      buildingContext: 'caruggi storici, palazzi dei rolli e condomini moderni'
    },
    'palermo': {
      paragraph1: `Stai cercando un idraulico a Palermo? Il capoluogo siciliano, con i suoi palazzi arabo-normanni nel centro e i quartieri residenziali di Politeama e Libertà, richiede tecnici esperti in impianti di ogni epoca e tipologia.`,
      paragraph2: `Il nostro servizio ti collega con idraulici professionisti attivi in tutta Palermo e provincia. Interveniamo ovunque: dal Centro Storico a Mondello, dalla Zisa a Brancaccio, fino a Monreale, Bagheria e tutti i comuni limitrofi.`,
      buildingContext: 'palazzi storici, condomini e ville'
    }
  };

  // Default content for cities not in the map
  const defaultIntro = {
    paragraph1: `Stai cercando un idraulico a ${cityName} per un intervento urgente o una riparazione programmata? ${cityName}, con i suoi edifici residenziali e le costruzioni di varie epoche, presenta le tipiche problematiche idrauliche delle città italiane: tubature datate, calcare e impianti che richiedono manutenzione.`,
    paragraph2: `Con IdrauliciSubito trovi rapidamente un professionista disponibile a ${cityName} e in tutta la provincia. Il nostro servizio copre l'intera città e i comuni limitrofi, garantendoti una risposta rapida qualunque sia la tua zona.`,
    buildingContext: 'condomini, abitazioni singole e attività commerciali'
  };

  return cityIntros[citySlug] || defaultIntro;
};

export function CityIntroSection({ cityName, citySlug, region, onRequestClick }: CityIntroSectionProps) {
  const content = getCityIntroContent(cityName, citySlug, region);

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-accent/30 border-l-4 border-primary p-6 rounded-r-lg mb-8">
            <p className="text-lg leading-relaxed">
              {content.paragraph1}
            </p>
            <p className="text-lg leading-relaxed mt-4">
              {content.paragraph2.split('IdrauliciSubito').map((part, i, arr) => (
                i < arr.length - 1 ? (
                  <span key={i}>
                    {part}
                    <Link to="/" className="text-primary hover:underline font-medium">IdrauliciSubito</Link>
                  </span>
                ) : part
              ))}
            </p>
          </div>
          
          <div className="text-center">
            <WhatsAppCTA cityName={cityName} label={`Contattaci su WhatsApp da ${cityName}`} size="lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
