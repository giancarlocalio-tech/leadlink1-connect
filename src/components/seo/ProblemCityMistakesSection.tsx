/**
 * ProblemCityMistakesSection - "Errori comuni che peggiorano il problema"
 * 
 * Lists 4 common mistakes people make that worsen the issue
 */

import { XCircle } from 'lucide-react';

interface ProblemCityMistakesSectionProps {
  problemName: string;
  problemSlug: string;
}

// Mistakes by problem type
const mistakesByProblem: Record<string, { mistakes: { title: string; description: string }[] }> = {
  "lavandino-intasato": {
    mistakes: [
      {
        title: "Usare prodotti chimici aggressivi",
        description: "Disgorganti troppo potenti possono corrodere le tubature, specialmente se vecchie o in PVC sottile."
      },
      {
        title: "Versare acqua bollente su tubature in plastica",
        description: "Temperature eccessive possono deformare i tubi in PVC e peggiorare le perdite."
      },
      {
        title: "Infilare oggetti improvvisati nello scarico",
        description: "Fili di ferro o bastoncini possono spingere l'ostruzione più in profondità o danneggiare i tubi."
      },
      {
        title: "Ignorare il problema sperando che si risolva",
        description: "Un intasamento parziale peggiora sempre col tempo, trasformandosi in blocco totale."
      }
    ]
  },
  "wc-otturato": {
    mistakes: [
      {
        title: "Tirare lo sciacquone ripetutamente",
        description: "Se il WC è otturato, ogni sciacquone rischia di farlo traboccare e allagare il bagno."
      },
      {
        title: "Usare candeggina per sturare",
        description: "La candeggina non scioglie le ostruzioni e può creare gas tossici se mischiata ad altri prodotti."
      },
      {
        title: "Infilare oggetti rigidi nel WC",
        description: "Grucce o bastoni possono graffiare la ceramica e spingere l'ostruzione nel tubo principale."
      },
      {
        title: "Aspettare troppo per chiamare aiuto",
        description: "Un WC otturato può indicare problemi alla rete fognaria che peggiorano rapidamente."
      }
    ]
  },
  "scaldabagno-non-scalda": {
    mistakes: [
      {
        title: "Tentare di aprire lo scaldabagno da soli",
        description: "Gli interventi interni richiedono competenze tecniche e possono essere pericolosi."
      },
      {
        title: "Alzare al massimo la temperatura",
        description: "Temperature troppo alte aumentano il consumo e possono danneggiare l'apparecchio."
      },
      {
        title: "Ignorare le perdite d'acqua",
        description: "Anche piccole perdite indicano problemi che peggiorano e causano danni maggiori."
      },
      {
        title: "Non fare manutenzione per anni",
        description: "Il calcare si accumula e riduce l'efficienza, fino a bloccare completamente l'apparecchio."
      }
    ]
  },
  "caldaia-in-blocco": {
    mistakes: [
      {
        title: "Resettare la caldaia troppe volte",
        description: "Reset ripetuti possono mascherare un problema serio e peggiorare il guasto."
      },
      {
        title: "Aprire il pannello interno",
        description: "L'interno della caldaia contiene componenti pericolosi che richiedono tecnici certificati."
      },
      {
        title: "Ignorare i codici di errore",
        description: "Ogni codice indica un problema specifico che va diagnosticato, non semplicemente resettato."
      },
      {
        title: "Caricare troppa pressione nell'impianto",
        description: "Una pressione superiore a 2 bar può danneggiare l'impianto e causare perdite."
      }
    ]
  },
  "tubo-che-perde": {
    mistakes: [
      {
        title: "Non chiudere subito l'acqua",
        description: "Ogni minuto di perdita causa danni aggiuntivi a muri, pavimenti e strutture."
      },
      {
        title: "Usare nastro adesivo normale",
        description: "Il nastro comune non è impermeabile e si stacca rapidamente, dando falsa sicurezza."
      },
      {
        title: "Stringere troppo i raccordi",
        description: "Forzare i raccordi può rompere i filetti o spaccare i tubi, peggiorando la perdita."
      },
      {
        title: "Coprire la perdita senza ripararla",
        description: "Nascondere il problema (con mobili, pannelli) causa danni strutturali nascosti e muffa."
      }
    ]
  },
  "doccia-non-scarica": {
    mistakes: [
      {
        title: "Versare acidi forti nello scarico",
        description: "Prodotti troppo aggressivi corrodono la piletta e le guarnizioni del piatto doccia."
      },
      {
        title: "Smontare la piletta senza esperienza",
        description: "Pilette moderne hanno sistemi complessi che, se rimontati male, causano perdite."
      },
      {
        title: "Continuare a usare la doccia",
        description: "L'acqua stagnante può infiltrarsi sotto il piatto doccia e causare danni nascosti."
      },
      {
        title: "Usare sonde improvvisate",
        description: "Fili metallici possono graffiare le tubature e creare punti dove si accumula sporco."
      }
    ]
  },
  "scarico-cucina-lento": {
    mistakes: [
      {
        title: "Scaricare grassi e oli nel lavandino",
        description: "I grassi si solidificano nelle tubature fredde e creano blocchi sempre più grandi."
      },
      {
        title: "Usare acqua fredda per sciacquare",
        description: "L'acqua fredda solidifica i grassi presenti nelle tubature invece di scioglierli."
      },
      {
        title: "Non pulire mai il sifone",
        description: "Il sifone accumula residui che col tempo bloccano completamente il flusso."
      },
      {
        title: "Ignorare i cattivi odori",
        description: "L'odore indica accumuli organici che peggiorano e possono ostruire del tutto."
      }
    ]
  },
  "termosifone-freddo": {
    mistakes: [
      {
        title: "Sfiatare senza chiudere la caldaia",
        description: "Sfiatare con caldaia accesa può creare bolle d'aria nell'impianto invece di eliminarle."
      },
      {
        title: "Forzare la valvola di sfiato",
        description: "Valvole bloccate dal calcare possono rompersi e causare perdite d'acqua."
      },
      {
        title: "Coprire il termosifone",
        description: "Copritermosifoni e mobili davanti riducono l'efficienza e mascherano eventuali perdite."
      },
      {
        title: "Abbassare la pressione troppo",
        description: "Una pressione sotto 1 bar impedisce all'acqua di circolare nei radiatori più alti."
      }
    ]
  }
};

export function ProblemCityMistakesSection({ 
  problemName, 
  problemSlug 
}: ProblemCityMistakesSectionProps) {
  const mistakeData = mistakesByProblem[problemSlug] || {
    mistakes: [
      { title: "Ignorare il problema", description: "I problemi idraulici peggiorano sempre se trascurati." },
      { title: "Usare prodotti non adatti", description: "Prodotti chimici aggressivi possono danneggiare le tubature." },
      { title: "Tentare riparazioni improvvisate", description: "Riparazioni fai-da-te sbagliate possono peggiorare la situazione." },
      { title: "Non chiamare un professionista", description: "Alcuni problemi richiedono attrezzature e competenze specifiche." }
    ]
  };

  return (
    <section className="py-6">
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
        <XCircle className="h-6 w-6 text-destructive" />
        Errori Comuni che Peggiorano {problemName}
      </h2>

      <p className="text-muted-foreground mb-5">
        Evita questi errori frequenti che possono trasformare un problema semplice in un intervento costoso:
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {mistakeData.mistakes.map((mistake, index) => (
          <div 
            key={index}
            className="bg-card border border-border rounded-xl p-4 hover:border-destructive/30 transition-colors"
          >
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                <XCircle className="w-4 h-4 text-destructive" />
              </span>
              <div>
                <h3 className="font-semibold text-foreground text-sm mb-1">
                  {mistake.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {mistake.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
