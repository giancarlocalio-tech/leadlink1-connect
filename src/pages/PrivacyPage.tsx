import { Layout } from '@/components/Layout';
import { Helmet } from 'react-helmet-async';

export default function PrivacyPage() {
  return (
    <Layout>
      <Helmet>
        <title>Privacy Policy | Idraulici Subito</title>
        <meta name="description" content="Informativa sulla privacy di Idraulici Subito: come trattiamo i tuoi dati personali in conformità al GDPR." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.idraulicisubito.com/privacy" />
        <meta property="og:title" content="Privacy Policy | Idraulici Subito" />
        <meta property="og:description" content="Informativa sulla privacy di Idraulici Subito: come trattiamo i tuoi dati personali." />
        <meta property="og:url" content="https://www.idraulicisubito.com/privacy" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-slate">
            <h1 className="text-3xl font-bold text-foreground mb-8">Privacy Policy</h1>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">1. Introduzione</h2>
              <p className="text-muted-foreground mb-4">
                Idraulici Subito rispetta la tua privacy. Questa pagina spiega in modo semplice come trattiamo i tuoi dati personali quando usi la nostra piattaforma.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">2. Quali dati raccogliamo</h2>
              <p className="text-muted-foreground mb-4">Raccogliamo solo i dati necessari per far funzionare il servizio:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Per i clienti:</strong> nome, numero di telefono, email (opzionale), città, descrizione del problema</li>
                <li><strong>Per gli idraulici:</strong> nome, nome attività, email, telefono, città di lavoro</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">3. Come usiamo i tuoi dati</h2>
              <p className="text-muted-foreground mb-4">Usiamo i tuoi dati esclusivamente per:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Permettere agli idraulici di visualizzare e rispondere alle richieste</li>
                <li>Permettere ai clienti di essere contattati</li>
                <li>Gestire gli account degli idraulici registrati</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">4. Con chi condividiamo i dati</h2>
              <p className="text-muted-foreground mb-4">
                I dati di contatto dei clienti sono visibili solo agli idraulici registrati sulla piattaforma. Non vendiamo né condividiamo i tuoi dati con terze parti per scopi pubblicitari.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">5. I tuoi diritti</h2>
              <p className="text-muted-foreground mb-4">Hai il diritto di:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Richiedere l'accesso ai tuoi dati</li>
                <li>Richiedere la cancellazione dei tuoi dati</li>
                <li>Richiedere la modifica dei tuoi dati</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">6. Contatti</h2>
              <p className="text-muted-foreground">
                Per qualsiasi domanda sulla privacy, puoi contattarci tramite i canali indicati sul sito.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
