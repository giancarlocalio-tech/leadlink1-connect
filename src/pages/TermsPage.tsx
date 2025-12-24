import { useEffect } from 'react';
import { Layout } from '@/components/Layout';

export default function TermsPage() {
  useEffect(() => {
    document.title = "Termini di Utilizzo | Idraulici Subito";
  }, []);

  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-8">Termini di Utilizzo</h1>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">1. Il servizio</h2>
              <p className="text-muted-foreground mb-4">
                Idraulici Subito è una piattaforma che mette in contatto clienti che cercano un idraulico con professionisti del settore. La piattaforma facilita il contatto ma non è parte degli accordi tra cliente e idraulico.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">2. Cosa non facciamo</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Non gestiamo pagamenti tra cliente e idraulico</li>
                <li>Non prendiamo commissioni sui lavori</li>
                <li>Non garantiamo la qualità dei lavori eseguiti</li>
                <li>Non siamo responsabili per accordi presi fuori dalla piattaforma</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">3. Per i clienti</h2>
              <p className="text-muted-foreground mb-4">
                Quando invii una richiesta, i tuoi dati di contatto saranno visibili agli idraulici registrati. Gli idraulici potranno contattarti direttamente. Qualsiasi accordo successivo è tra te e l'idraulico.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">4. Per gli idraulici</h2>
              <p className="text-muted-foreground mb-4">
                Registrandoti dichiari di essere un professionista del settore. Ti impegni a utilizzare i dati dei clienti solo per rispondere alle richieste di lavoro e non per altri scopi.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">5. Responsabilità</h2>
              <p className="text-muted-foreground mb-4">
                La piattaforma è un semplice strumento di contatto. Non siamo responsabili per la qualità dei servizi, i prezzi applicati, o eventuali controversie tra cliente e idraulico.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">6. Modifiche</h2>
              <p className="text-muted-foreground">
                Ci riserviamo il diritto di modificare questi termini in qualsiasi momento. Le modifiche saranno pubblicate su questa pagina.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
