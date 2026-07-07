import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Zap,
  Camera,
  MessageCircle,
  Shield,
  MapPin,
  ArrowRight,
  Wrench,
  Droplets,
  Flame,
  ShowerHead,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { AIConsultationChat } from "@/components/ai/AIConsultationChat";

const problemi = [
  { icon: Droplets, label: "Perdite d'acqua", slug: "perdite-acqua" },
  { icon: ShowerHead, label: "Scarichi otturati", slug: "scarico-otturato" },
  { icon: Flame, label: "Caldaia in blocco", slug: "caldaia-blocco" },
  { icon: Wrench, label: "Rubinetti gocciolanti", slug: "rubinetto-gocciola" },
  { icon: Droplets, label: "WC che perde", slug: "wc-perde" },
  { icon: Wrench, label: "Bassa pressione", slug: "pressione-bassa" },
];

export default function HomePage() {
  return (
    <Layout>
      <Helmet>
        <title>Idraulico AI · Diagnosi Gratis Online + Idraulico Vicino a Te</title>
        <meta
          name="description"
          content="Chatta con l'Idraulico AI: descrivi il problema, invia foto o video, ricevi la soluzione passo-passo. Prima diagnosi gratis. Se serve, ti troviamo un idraulico vero vicino."
        />
        <link rel="canonical" href="https://www.idraulicisubito.com/" />
        <meta property="og:title" content="Idraulico AI · Risolvi i tuoi problemi idraulici" />
        <meta property="og:description" content="Diagnosi AI in chat + foto/video. Prima domanda gratis. Se non basta, ti troviamo un idraulico vicino." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Idraulico AI - IdrauliciSubito",
            description:
              "Consulenza idraulica AI 24/7 con analisi di foto e video. Diagnosi gratuita, soluzione passo-passo. Trova idraulici vicino a te.",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "4.90",
              priceCurrency: "EUR",
              description: "Consulenza AI completa",
            },
            url: "https://www.idraulicisubito.com/",
          })}
        </script>
      </Helmet>

      {/* Hero + Chat */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-sky-500/5 to-background pt-5 md:pt-14 pb-8 md:pb-10">
        {/* Decorative blobs */}
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-primary/20 blur-3xl pointer-events-none" aria-hidden />
        <div className="absolute -bottom-32 -right-24 w-80 h-80 rounded-full bg-sky-400/20 blur-3xl pointer-events-none" aria-hidden />

        <div className="container mx-auto px-3 md:px-4 relative">
          <div className="text-center max-w-3xl mx-auto mb-5 md:mb-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/70 backdrop-blur border border-primary/20 text-primary text-[11px] md:text-xs font-bold mb-3 md:mb-5 shadow-sm">
              <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5" />
              Prima diagnosi gratis · No registrazione
            </div>
            <h1 className="text-[26px] leading-[1.1] md:text-6xl lg:text-7xl font-black tracking-tight mb-3 md:mb-5">
              Risolvi il tuo problema{" "}
              <span className="bg-gradient-to-r from-primary to-sky-500 bg-clip-text text-transparent">
                idraulico in 30 secondi
              </span>
            </h1>
            <p className="text-sm md:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
              Chatta con l'<strong className="text-foreground">Idraulico AI</strong>, invia una foto e ricevi la soluzione passo-passo.
            </p>
          </div>

          <div className="max-w-3xl mx-auto h-[70vh] min-h-[460px] md:min-h-[520px] max-h-[720px] shadow-2xl shadow-primary/10 rounded-2xl">
            <AIConsultationChat />
          </div>

          {/* Trust bar */}
          <div className="max-w-3xl mx-auto mt-4 md:mt-5 flex flex-wrap justify-center items-center gap-x-4 md:gap-x-6 gap-y-1.5 text-[11px] md:text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" /> Risposta immediata</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" /> Foto & video</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" /> Idraulici vicino</span>
          </div>


          {/* Quick problems */}
          <div className="max-w-4xl mx-auto mt-10">
            <p className="text-center text-sm font-semibold text-muted-foreground mb-3">Oppure parti da un problema comune:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              {problemi.map((p) => (
                <Link
                  key={p.slug}
                  to={`/consulenza?problema=${p.slug}`}
                  className="group flex items-center gap-2 px-3 py-2.5 rounded-xl border bg-card hover:border-primary hover:bg-primary/5 hover:shadow-md transition-all text-sm"
                >
                  <p.icon className="w-4 h-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="truncate font-medium">{p.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Come funziona */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-black mb-3">Come funziona</h2>
            <p className="text-muted-foreground">Semplice, veloce, senza registrazione.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: MessageCircle, title: "1. Racconta il problema", text: "Descrivi cosa succede in chat. L'AI ti fa le domande giuste." },
              { icon: Camera, title: "2. Invia foto o video", text: "Un'immagine vale mille parole. L'AI analizza direttamente il problema." },
              { icon: Zap, title: "3. Soluzione passo-passo", text: "Diagnosi, attrezzi, procedura ordinata. Se puoi risolvere da solo, lo fai." },
              { icon: MapPin, title: "4. Idraulico vicino", text: "Se serve un pro, ti mostriamo i migliori idraulici vicino a te con recensioni." },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <s.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-black mb-3">Trasparente e onesto</h2>
            <p className="text-muted-foreground mb-8">
              Nessun abbonamento. Paghi solo se vuoi la soluzione completa.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-2xl border-2 bg-card p-6 text-left">
                <div className="text-3xl font-bold mb-1">Gratis</div>
                <div className="text-sm text-muted-foreground mb-4">per sempre</div>
                <ul className="space-y-2 text-sm mb-4">
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />Prima diagnosi con l'AI</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />Consigli iniziali</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />Ricerca idraulici locali</li>
                </ul>
              </div>
              <div className="rounded-2xl border-2 border-primary bg-primary/5 p-6 text-left relative">
                <span className="absolute -top-3 right-4 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">Popolare</span>
                <div className="text-3xl font-bold mb-1 text-primary">€4,90</div>
                <div className="text-sm text-muted-foreground mb-4">una tantum, niente rinnovi</div>
                <ul className="space-y-2 text-sm mb-4">
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />Chat illimitata con l'AI</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />Analisi foto e video approfondita</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />Procedura passo-passo dettagliata</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />Lista attrezzi e sicurezza</li>
                </ul>
              </div>
            </div>
            <Link to="/consulenza" className="inline-block mt-8">
              <Button size="lg" className="gap-2 h-12 px-8">
                Inizia gratis
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust / FAQ */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-black mb-6 text-center">Domande frequenti</h2>
          <div className="space-y-4">
            {[
              {
                q: "L'AI può davvero risolvere il mio problema?",
                a: "Per problemi comuni (perdite di rubinetti, scarichi otturati, sifoni, WC che perde, cassette, sfiati termosifoni, ecc.) la percentuale di successo è alta: l'AI ti fa le domande giuste, analizza le foto e ti spiega passo-passo. Per problemi complessi o urgenze (allagamenti, gas, guasti caldaie) ti indirizza subito a un idraulico vero.",
              },
              {
                q: "Come funziona il pagamento?",
                a: "La prima diagnosi è gratis. Se vuoi la soluzione completa e la chat illimitata, sblocchi tutto a €4,90 una tantum con Stripe (carte, Apple Pay, Google Pay). Niente abbonamenti, niente rinnovi.",
              },
              {
                q: "Cosa succede se non riesco a risolvere?",
                a: "Nessun problema: cerchiamo per te i migliori idraulici vicino a te su Google, con rating e recensioni verificate. Li chiami direttamente, senza intermediari.",
              },
              {
                q: "I miei dati sono al sicuro?",
                a: "Sì. La chat è anonima (senza login), le foto sono private, e non condividiamo nulla con terzi. Il pagamento è gestito da Stripe.",
              },
            ].map((f, i) => (
              <details key={i} className="rounded-xl border bg-card p-4 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                  {f.q}
                  <ArrowRight className="w-4 h-4 group-open:rotate-90 transition" />
                </summary>
                <p className="text-sm text-muted-foreground mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
