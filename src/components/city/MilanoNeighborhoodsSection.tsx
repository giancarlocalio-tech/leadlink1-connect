/**
 * MilanoNeighborhoodsSection - Sezione con tutti i 35 quartieri di Milano cliccabili
 * Per uso nella pagina /milano
 */

import { Link } from 'react-router-dom';
import { MapPin, Clock, Users } from 'lucide-react';
import { MILANO_QUARTIERI } from '@/lib/milanoQuartieriData';

// Raggruppa i quartieri per zona geografica
const QUARTIERI_GROUPS = {
  'Centro e Zone Storiche': ['navigli', 'brera', 'ticinese', 'sempione', 'sarpi', 'tortona', 'porta-genova'],
  'Zone Est': ['porta-venezia', 'citta-studi', 'lambrate', 'loreto', 'turro', 'gorla', 'precotto', 'crescenzago', 'greco'],
  'Zone Nord': ['isola', 'porta-nuova', 'garibaldi', 'centrale', 'bicocca', 'bovisa', 'niguarda', 'affori', 'quarto-oggiaro'],
  'Zone Ovest': ['san-siro', 'baggio'],
  'Zone Sud': ['porta-romana', 'barona', 'corvetto', 'gratosoglio', 'chiesa-rossa', 'vigentino', 'rogoredo', 'stadera'],
};

export function MilanoNeighborhoodsSection() {
  return (
    <section className="py-16 bg-background" id="quartieri">
      <div className="container mx-auto px-4">
        {/* Header con statistiche */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-6 mb-6 flex-wrap">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="font-medium">{MILANO_QUARTIERI.length} quartieri coperti</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-medium">Disponibili 24h</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-medium">Arrivo in 30 min</span>
            </div>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Interveniamo in Tutti i Quartieri di Milano
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            I nostri idraulici coprono capillarmente tutta Milano, dai quartieri storici come{' '}
            <Link to="/idraulico-milano-navigli" className="text-primary hover:underline">Navigli</Link> e{' '}
            <Link to="/idraulico-milano-brera" className="text-primary hover:underline">Brera</Link>, 
            alle zone moderne come{' '}
            <Link to="/idraulico-milano-porta-nuova" className="text-primary hover:underline">Porta Nuova</Link> e{' '}
            <Link to="/idraulico-milano-isola" className="text-primary hover:underline">Isola</Link>. 
            Ogni quartiere ha le sue specificità edilizie e i nostri professionisti le conoscono.
          </p>
        </div>

        {/* Griglia quartieri per zona */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {Object.entries(QUARTIERI_GROUPS).map(([groupName, slugs]) => {
            const quartieriInGroup = slugs
              .map(slug => MILANO_QUARTIERI.find(q => q.slug === slug))
              .filter(Boolean);
            
            return (
              <div key={groupName} className="bg-card rounded-xl p-5 border border-border">
                <h3 className="font-semibold text-lg mb-3 text-primary">{groupName}</h3>
                <div className="flex flex-wrap gap-2">
                  {quartieriInGroup.map((quartiere) => (
                    <Link
                      key={quartiere!.slug}
                      to={`/idraulico-milano-${quartiere!.slug}`}
                      className="px-3 py-1.5 bg-muted hover:bg-primary/10 hover:text-primary rounded-full text-sm transition-colors"
                    >
                      {quartiere!.nome}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Testo SEO */}
        <div className="mt-10 max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground text-sm leading-relaxed">
            <strong>Idraulico Milano</strong> in ogni zona: dal centro storico con i suoi palazzi d'epoca 
            (come nei <Link to="/idraulico-milano-navigli" className="text-primary hover:underline">Navigli</Link> e 
            in <Link to="/idraulico-milano-brera" className="text-primary hover:underline">Brera</Link>) 
            ai quartieri universitari (<Link to="/idraulico-milano-citta-studi" className="text-primary hover:underline">Città Studi</Link>, 
            <Link to="/idraulico-milano-bicocca" className="text-primary hover:underline">Bicocca</Link>, 
            <Link to="/idraulico-milano-bovisa" className="text-primary hover:underline">Bovisa</Link>), 
            dalle zone residenziali (<Link to="/idraulico-milano-san-siro" className="text-primary hover:underline">San Siro</Link>, 
            <Link to="/idraulico-milano-niguarda" className="text-primary hover:underline">Niguarda</Link>) 
            ai nuovi quartieri moderni (<Link to="/idraulico-milano-porta-nuova" className="text-primary hover:underline">Porta Nuova</Link>, 
            <Link to="/idraulico-milano-isola" className="text-primary hover:underline">Isola</Link>). 
            Pronto intervento 24 ore su 24, 7 giorni su 7.
          </p>
        </div>
      </div>
    </section>
  );
}

export default MilanoNeighborhoodsSection;
