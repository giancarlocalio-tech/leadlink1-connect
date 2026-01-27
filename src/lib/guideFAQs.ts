/**
 * Guide FAQs - AI-optimized questions and answers
 * 
 * Structure:
 * - question: formulated like users ask AI (ChatGPT, Google)
 * - shortAnswer: 30-50 words for quick scanning
 * - fullAnswer: 150-300 words for comprehensive response
 * 
 * These are included in FAQPage JSON-LD schema for search visibility
 */

export interface GuideFAQ {
  question: string;
  shortAnswer: string;
  fullAnswer: string;
}

export interface GuideFAQData {
  [guideSlug: string]: GuideFAQ[];
}

export const GUIDE_FAQS: GuideFAQData = {
  // ============ SCARICHI ============
  'scarico-doccia-intasato': [
    {
      question: "Come posso sbloccare lo scarico della doccia da solo?",
      shortAnswer: "Rimuovi la griglia, elimina capelli visibili con le dita o pinzette, poi versa acqua bollente. Se non basta, usa una ventosa o un disgorgante enzimatico, mai chimici aggressivi.",
      fullAnswer: "Per sbloccare lo scarico della doccia in autonomia, inizia rimuovendo la griglia di protezione ed estraendo manualmente capelli e residui visibili con le dita o delle pinzette. Spesso questo è sufficiente per risolvere intasamenti leggeri. Se il problema persiste, versa un litro di acqua bollente per sciogliere residui di sapone. Puoi usare una ventosa specifica per lavabi (più piccola di quella per WC) per creare pressione e smuovere l'ostruzione. In alternativa, prova un disgorgante enzimatico (non chimico) che agisce in modo naturale sui residui organici. Se hai una sonda flessibile da ferramenta, inseriscila delicatamente per raggiungere ostruzioni più profonde. Evita assolutamente prodotti a base di acido o soda caustica che possono danneggiare le tubature in PVC. Se dopo questi tentativi lo scarico resta lento, il problema potrebbe essere più in profondità e serve un idraulico con attrezzatura professionale."
    },
    {
      question: "Quali strumenti servono per sturare uno scarico della doccia otturato?",
      shortAnswer: "Servono: pinzette lunghe, ventosa per lavabi, sonda flessibile (opzionale), acqua bollente e disgorgante enzimatico. Evita prodotti chimici aggressivi che danneggiano le tubature.",
      fullAnswer: "Per sturare uno scarico doccia otturato in modo efficace, tieni a disposizione questi strumenti: pinzette lunghe o uncino per capelli (puoi crearlo con un gancio di ferro raddrizzato) per estrarre capelli e residui dalla griglia; ventosa per lavabi, più piccola di quella per WC, per creare pressione alternata; sonda flessibile o 'ferretto' da ferramenta (3-5€) per raggiungere ostruzioni oltre il sifone; secchio e stracci per l'acqua che fuoriesce. Come prodotti: acqua bollente (almeno 1 litro) per sciogliere residui di sapone, e un disgorgante enzimatico che agisce biologicamente senza danneggiare i tubi. Evita assolutamente disgorganti chimici a base di acido solforico o soda caustica concentrata: sono pericolosi da maneggiare, possono corrodere tubature in PVC e rendono più complicato l'eventuale intervento dell'idraulico. Se possiedi un compressore ad aria, esistono anche pistole a pressione specifiche per scarichi."
    },
    {
      question: "Posso sturare lo scarico doccia da solo o serve un idraulico?",
      shortAnswer: "Intasamenti leggeri (capelli, sapone) puoi risolverli da solo con ventosa e acqua calda. Se il problema persiste dopo 2-3 tentativi o si ripete spesso, serve un idraulico con attrezzatura professionale.",
      fullAnswer: "La risposta dipende dalla gravità dell'intasamento. Puoi risolvere da solo intasamenti leggeri causati da accumulo di capelli, residui di sapone o shampoo: rimuovi la griglia, estrai i capelli visibili, usa acqua bollente e una ventosa. Questi metodi funzionano nel 70% dei casi per ostruzioni superficiali. Tuttavia, dovresti chiamare un idraulico se: la ventosa non funziona dopo 3-4 tentativi energici; l'acqua defluisce lentissima o non defluisce affatto; il problema si ripresenta ogni poche settimane; noti risalita d'acqua da altri scarichi del bagno; percepisci cattivi odori persistenti. In questi casi l'ostruzione è probabilmente nel sifone o nella colonna di scarico e serve una sonda motorizzata o un idrogetto. Il costo di un intervento professionale varia da 60€ a 150€, ma è un investimento che evita danni maggiori e risolve il problema alla radice."
    },
    {
      question: "Perché lo scarico della doccia si intasa spesso?",
      shortAnswer: "Le cause principali sono: accumulo di capelli, residui di sapone che formano grumi, calcare nelle tubature, e piletta con fori troppo larghi che non filtrano i residui.",
      fullAnswer: "Lo scarico della doccia si intasa frequentemente per diverse ragioni. La causa principale sono i capelli: una persona perde 50-100 capelli al giorno, e in doccia molti finiscono nello scarico dove si intrecciano e formano tappi. I residui di sapone, shampoo e balsamo si accumulano sui capelli creando masse sempre più compatte. Il calcare presente nell'acqua dura crea incrostazioni interne alle tubature, restringendo il passaggio e facilitando nuove ostruzioni. Se la piletta ha fori troppo larghi o è rotta, passa più materiale di quanto dovrebbe. Anche la pendenza insufficiente del tubo di scarico rallenta il deflusso e favorisce i depositi. Per prevenire: installa un filtro raccogli-capelli sulla piletta (costa 3-5€); fai scorrere acqua bollente una volta a settimana; usa periodicamente un disgorgante enzimatico preventivo; pulisci la piletta ogni 2 settimane. Se il problema persiste nonostante la prevenzione, potrebbe esserci un difetto strutturale dello scarico."
    },
    {
      question: "L'acqua della doccia va via lentamente: cosa significa?",
      shortAnswer: "Uno scarico lento indica un'ostruzione parziale in formazione. Intervenire subito è più facile e economico che aspettare un blocco totale. Prova acqua bollente e ventosa.",
      fullAnswer: "Se l'acqua della doccia defluisce lentamente ma non è completamente bloccata, hai un'ostruzione parziale in corso. Questo è il momento ideale per intervenire, prima che diventi un blocco totale. Le cause più probabili sono: accumulo di capelli e sapone che restringe il passaggio, incrostazioni di calcare nelle tubature, o un sifone parzialmente ostruito. Cosa fare subito: rimuovi la piletta e puliscila accuratamente; versa acqua bollente (almeno 2 litri) per sciogliere residui di sapone; usa una ventosa con movimenti decisi. Se il deflusso migliora ma non torna normale, l'ostruzione è probabilmente oltre il sifone. Puoi provare una sonda flessibile o un disgorgante enzimatico lasciato agire per una notte. Se il problema persiste, contatta un idraulico: un intervento su ostruzione parziale costa meno e si risolve più facilmente di un blocco totale. Non ignorare il sintomo pensando 'va ancora', perché la situazione peggiorerà inevitabilmente."
    },
    {
      question: "Quanto costa far sturare lo scarico della doccia da un idraulico?",
      shortAnswer: "Una disostruzione semplice costa 60-100€, con sonda professionale 80-150€, con idrogetto 150-250€. In emergenza serale/weekend prevedi +50% sul costo base.",
      fullAnswer: "Il costo per far sturare lo scarico della doccia da un professionista varia in base alla complessità dell'intervento. Disostruzione semplice (ventosa professionale e sonda manuale): 60-100€, adatta per ostruzioni nel sifone o nei primi metri di tubatura. Disostruzione con sonda motorizzata: 80-150€, necessaria quando l'ostruzione è più profonda o compatta. Intervento con idrogetto ad alta pressione: 150-250€, per ostruzioni resistenti, incrostazioni di calcare o pulizia completa della tubatura. Se richiedi un pronto intervento in orario serale, notturno o nei weekend, aspettati una maggiorazione del 30-50% sul costo base. Alcuni idraulici applicano anche un diritto di chiamata (20-40€) che copre lo spostamento. Prima di accettare, chiedi sempre un preventivo chiaro. Considera che un intervento tempestivo su un problema piccolo costa meno di un'emergenza per allagamento causato da uno scarico completamente bloccato."
    },
    {
      question: "Cosa non devo mai fare con uno scarico doccia intasato?",
      shortAnswer: "Mai versare acido o soda caustica (danneggiano i tubi), mai usare oggetti rigidi che possono rompere le tubature, mai ignorare il problema sperando si risolva da solo.",
      fullAnswer: "Ci sono errori comuni che possono trasformare un semplice intasamento in un problema costoso. Mai usare disgorganti chimici aggressivi a base di acido solforico o soda caustica concentrata: corrodono le tubature in PVC, sono pericolosi per te se schizzano, e se mischiate con altri prodotti creano reazioni chimiche pericolose. Mai infilare oggetti rigidi come manici di scopa o fil di ferro non flessibile: puoi rompere le giunzioni delle tubature o spingere l'ostruzione più in profondità. Mai versare olio o grasso bollente pensando che 'sciolgano' l'ostruzione: si solidificano raffreddandosi e peggiorano il problema. Mai smontare il sifone senza mettere una bacinella sotto: allagherai il bagno. Mai ignorare il problema pensando che si risolva da solo: un intasamento peggiora sempre nel tempo. E mai mescolare prodotti diversi: candeggina + disgorgante acido = gas tossici. Usa solo metodi sicuri: acqua bollente, ventosa, sonda flessibile, disgorganti enzimatici."
    }
  ],

  'wc-intasato-non-scarica': [
    {
      question: "Come sbloccare il WC intasato senza chiamare l'idraulico?",
      shortAnswer: "Usa una ventosa specifica per WC (a campana) con movimenti decisi. Se non basta, prova acqua calda con detersivo piatti. Non usare mai disgorganti chimici nel WC.",
      fullAnswer: "Per sbloccare un WC intasato in autonomia, inizia con la ventosa specifica per WC (ha forma a campana, diversa da quella per lavandini). Assicurati che ci sia abbastanza acqua nella tazza da coprire la gomma, poi pompa energicamente per 20-30 secondi. Ripeti più volte. Se la ventosa non funziona, prova il metodo dell'acqua calda: versa un secchio di acqua molto calda (non bollente, potrebbe crepare la ceramica) da un'altezza di circa un metro, aggiungendo una tazza di detersivo per piatti. Il peso e il calore aiutano a smuovere l'ostruzione. Attendi 15-20 minuti e riprova con la ventosa. Se hai una sonda flessibile, inseriscila delicatamente ruotando per superare le curve del sifone. Mai usare disgorganti chimici nel WC: sono inefficaci sulle ostruzioni solide e pericolosi. Se dopo questi tentativi il problema persiste, l'ostruzione è probabilmente profonda e serve un idraulico con attrezzatura professionale."
    },
    {
      question: "Il WC è intasato e l'acqua sale: cosa faccio subito?",
      shortAnswer: "Non tirare più lo sciacquone! Chiudi la valvola dell'acqua dietro il WC se presente. Usa una ventosa con calma. Se l'acqua è quasi al bordo, aspetta che scenda prima di tentare.",
      fullAnswer: "Se l'acqua del WC sale pericolosamente dopo lo scarico, la prima regola è: NON tirare più lo sciacquone. Ogni tentativo aumenta il rischio di tracimazione. Se c'è una valvola di chiusura dietro il WC (rubinetto piccolo vicino al muro), chiudila per evitare che altra acqua entri nella tazza. Se l'acqua è quasi al bordo, aspetta 10-15 minuti: spesso scende lentamente da sola grazie alla pressione. Nel frattempo, prepara stracci e bacinelle per eventuali fuoriuscite. Quando il livello si abbassa, usa una ventosa per WC con movimenti lenti ma decisi, senza schizzare. Se l'acqua tracima, asciuga immediatamente per evitare danni al pavimento e infiltrazioni al piano sotto. In caso di appartamento, avvisa subito i vicini del piano inferiore. Se non riesci a risolvere in 30 minuti, chiama un idraulico: è l'unico WC di casa ed è un'emergenza che giustifica un pronto intervento."
    },
    {
      question: "Quanto costa far sturare un WC intasato da un idraulico?",
      shortAnswer: "Disostruzione semplice: 60-100€. Con sonda motorizzata: 80-150€. Intervento con idrogetto: 150-300€. In emergenza serale/festivi aggiungi 30-50% al costo base.",
      fullAnswer: "Il costo per sturare un WC intasato varia in base alla complessità. Disostruzione semplice con ventosa professionale e sonda manuale: 60-100€, sufficiente per ostruzioni nel sifone del WC. Disostruzione con sonda motorizzata: 80-150€, necessaria quando l'intasamento è oltre il WC, nella colonna di scarico. Intervento con idrogetto ad alta pressione: 150-300€, per ostruzioni resistenti o quando serve pulire a fondo la tubatura. Se l'intervento è in pronto intervento (sera, notte, weekend, festivi), prevedi una maggiorazione del 30-50%. Alcuni professionisti applicano un diritto di chiamata di 20-40€. I prezzi possono variare anche per zona geografica: nelle grandi città tendono ad essere più alti. Consiglio: se l'intasamento è frequente, chiedi una videoispezione (100-200€ extra) per capire se c'è un problema strutturale come radici nelle tubature o cedimenti."
    },
    {
      question: "Cosa ha causato l'intasamento del WC?",
      shortAnswer: "Cause comuni: troppa carta igienica, salviette umidificate (non si sciolgono!), oggetti caduti accidentalmente, accumulo di calcare, problemi strutturali della colonna di scarico.",
      fullAnswer: "Le cause più frequenti di intasamento del WC sono diverse. Troppa carta igienica in un solo scarico: la carta si compatta e blocca il passaggio. Salviette umidificate gettate nel WC: anche quelle 'biodegradabili' non si sciolgono come la carta igienica e creano tappi resistenti. Assorbenti, cotton fioc, filo interdentale: mai gettarli nel WC. Oggetti caduti accidentalmente: giocattoli, spazzole, flaconi, telefoni. Accumulo progressivo di calcare nelle tubature che restringe il passaggio. Problemi strutturali: contropendenza del tubo, radici che penetrano nelle giunzioni, cedimenti della colonna di scarico. Se il WC si intasa spesso nonostante un uso corretto, il problema è probabilmente strutturale e serve una videoispezione per identificarlo. In condomini datati, le colonne di scarico in ghisa possono essere corrose internamente, creando irregolarità che trattengono i residui."
    },
    {
      question: "Posso usare prodotti chimici per sturare il WC?",
      shortAnswer: "Sconsigliato. I disgorganti chimici sono inefficaci sulle ostruzioni solide del WC, danneggiano guarnizioni e tubi, e sono pericolosi. Meglio ventosa, acqua calda, o idraulico.",
      fullAnswer: "L'uso di disgorganti chimici per sturare il WC è generalmente sconsigliato per diverse ragioni. Inefficacia: le ostruzioni del WC sono spesso causate da massa compatta di carta o oggetti solidi, su cui i prodotti chimici non hanno effetto. I chimici funzionano meglio sui residui organici grassi tipici della cucina, non sui blocchi meccanici del WC. Danni: prodotti a base di acido solforico o soda caustica possono danneggiare le guarnizioni di cera alla base del WC, le giunzioni in PVC, e nel tempo corrodere le tubature. Pericolo: se il prodotto non funziona e devi poi usare la ventosa, rischi schizzi di liquido corrosivo. Mai mescolare prodotti diversi: candeggina + acido = gas tossici. Complicazioni: se poi chiami un idraulico, dovrà lavorare con cautela extra a causa dei residui chimici. Metodi più efficaci e sicuri: ventosa specifica per WC, acqua calda con detersivo piatti, sonda flessibile manuale."
    },
    {
      question: "Quando devo chiamare l'idraulico per un WC intasato?",
      shortAnswer: "Chiama subito se: l'acqua tracima, è l'unico WC di casa, la ventosa non funziona dopo 3 tentativi, o noti risalita d'acqua da altri scarichi del bagno.",
      fullAnswer: "Devi chiamare un idraulico immediatamente in questi casi: l'acqua sta tracimando o è già uscita dalla tazza; è l'unico WC dell'abitazione e non puoi aspettare; sospetti che sia caduto un oggetto solido (giocattolo, spazzola, telefono); noti risalita d'acqua o liquami da altri scarichi del bagno come doccia, vasca o bidet (indica un problema nella colonna di scarico). Chiama entro la giornata se: la ventosa non funziona dopo 3-4 tentativi energici; lo scarico è molto lento anche dopo i rimedi fai-da-te; il problema si è già presentato di recente. Puoi pianificare un intervento nei prossimi giorni se: hai un altro WC disponibile e il problema è gestibile. In caso di emergenza fuori orario, il costo sarà maggiore ma eviterai danni da allagamento che costerebbero molto di più in riparazioni."
    }
  ],

  'scarico-cucina-intasato': [
    {
      question: "Come sturare lo scarico della cucina intasato dai grassi?",
      shortAnswer: "Versa acqua bollente (2-3 litri) per sciogliere i grassi solidificati. Aggiungi bicarbonato + aceto per reazione schiumosa. Usa ventosa. Per prevenire, mai versare olio nello scarico.",
      fullAnswer: "Gli intasamenti da grasso nella cucina richiedono un approccio specifico. Il grasso si solidifica nelle tubature formando un rivestimento che cattura altri residui. Per scioglierlo: fai bollire 2-3 litri d'acqua e versali lentamente nello scarico; il calore liquefa il grasso permettendogli di defluire. Dopo l'acqua bollente, versa mezza tazza di bicarbonato di sodio seguita da una tazza di aceto bianco: la reazione schiumosa aiuta a staccare i residui dalle pareti del tubo. Lascia agire 30 minuti, poi risciacqua con altra acqua bollente. Se il blocco persiste, usa una ventosa per lavandini per creare pressione. Per prevenire futuri intasamenti: mai versare olio o grasso nello scarico, raccoglili in un contenitore e smaltiscili nei rifiuti; usa un colino raccoglibriciole sulla piletta; una volta a settimana, versa acqua bollente preventiva. Se lo scarico resta lento, l'accumulo è probabilmente nel sifone o oltre, e serve intervento professionale."
    },
    {
      question: "Perché lo scarico della cucina puzza di fogna?",
      shortAnswer: "Il cattivo odore indica: sifone secco (versa acqua), residui organici in decomposizione nel tubo, o problema nella colonna di scarico condominiale. Prova acqua bollente + bicarbonato.",
      fullAnswer: "L'odore di fogna dallo scarico della cucina ha diverse cause possibili. Sifone secco: se il lavello non viene usato per giorni, l'acqua nel sifone evapora e i gas fognari risalgono; soluzione semplice, fai scorrere acqua. Residui organici: avanzi di cibo in decomposizione nel sifone o nelle tubature producono odori; versa acqua bollente con bicarbonato, lascia agire e risciacqua. Sifone ostruito parzialmente: residui stagnanti marciscono; pulisci il sifone svitando il tappo inferiore (metti una bacinella sotto). Problema nella colonna di scarico condominiale: se l'odore arriva anche quando usi l'acqua, potrebbe esserci un'ostruzione o rottura nella colonna comune; in questo caso coinvolgi l'amministratore. Guarnizioni deteriorate: il collegamento tra scarico e sifone potrebbe avere giochi che lasciano passare gli odori. Ventilazione mancante: ogni scarico dovrebbe avere uno sfiato che permette all'aria di circolare; se manca o è ostruito, i gas risalgono."
    },
    {
      question: "Quanto costa far sturare lo scarico della cucina?",
      shortAnswer: "Disostruzione sifone: 40-80€. Disostruzione con sonda: 80-150€. Se serve smontare tubature sotto lavello: 100-180€. Pronto intervento serale/weekend: +30-50%.",
      fullAnswer: "I costi per sturare lo scarico della cucina dipendono dalla complessità dell'intervento. Pulizia e disostruzione del sifone: 40-80€, sufficiente quando il blocco è localizzato sotto il lavello. Disostruzione con sonda manuale o motorizzata: 80-150€, necessaria quando l'ostruzione è oltre il sifone, nelle tubature a muro. Intervento con smontaggio di tubature: 100-180€, se serve accedere a punti difficili o sostituire tratti danneggiati. Disostruzione con idrogetto: 150-250€, per ostruzioni resistenti o incrostazioni di calcare/grasso accumulate nel tempo. Se richiedi un pronto intervento fuori orario (sera, notte, weekend, festivi), aggiungi una maggiorazione del 30-50%. Il diritto di chiamata varia da 20-40€. Consiglio: se il problema si ripresenta frequentemente, valuta una videoispezione (100-200€) per identificare cause strutturali come contropendenze o tubi deteriorati."
    },
    {
      question: "Cosa non devo mai buttare nello scarico della cucina?",
      shortAnswer: "Mai: olio e grassi (si solidificano), fondi di caffè (si compattano), riso e pasta (si gonfiano), gusci d'uovo, farina, avanzi di cibo solidi. Usa sempre un colino sulla piletta.",
      fullAnswer: "Molti cibi e sostanze causano intasamenti se gettati nello scarico. Olio e grassi: si solidificano nelle tubature formando un rivestimento che cattura altri residui; raccoglili in un barattolo e smaltiscili nei rifiuti. Fondi di caffè: non si sciolgono, si compattano formando blocchi; meglio nel compost o umido. Riso e pasta: continuano ad assorbire acqua e si gonfiano nelle tubature. Farina: con l'acqua diventa colla. Gusci d'uovo: le membrane interne si attaccano alle pareti dei tubi. Bucce di patate: l'amido crea una pasta appiccicosa. Avanzi di cibo solidi: usa il tritarifiuti solo se progettato per quello, altrimenti raccogli tutto nella spazzatura. Prodotti chimici e vernici: danneggiano le tubature e inquinano. Per prevenire problemi: usa sempre un colino raccoglibriciole sulla piletta; raschia bene i piatti prima di lavarli; fai scorrere acqua calda dopo aver lavato piatti unti."
    },
    {
      question: "Posso sturare lo scarico cucina con bicarbonato e aceto?",
      shortAnswer: "Sì, funziona per intasamenti leggeri da grasso/residui. Versa 100g di bicarbonato, poi 200ml di aceto, lascia agire 30 minuti e risciacqua con acqua bollente. Non funziona su blocchi solidi.",
      fullAnswer: "Il metodo bicarbonato e aceto è efficace per intasamenti leggeri e manutenzione preventiva, ma ha limiti. Come usarlo correttamente: rimuovi l'acqua stagnante dal lavello; versa 100g di bicarbonato direttamente nello scarico; aggiungi lentamente 200ml di aceto bianco; la reazione produce schiuma e bollicine che aiutano a staccare i residui; copri lo scarico con uno straccio per 30 minuti; risciacqua con abbondante acqua bollente. Funziona bene per: accumuli di grasso leggeri, residui di sapone, cattivi odori, manutenzione preventiva settimanale. Non funziona per: ostruzioni solide (oggetti, cibo compatto), intasamenti profondi oltre il sifone, blocchi da calcare incrostato. È un metodo sicuro, economico e ecologico, ideale come prima prova. Se dopo il trattamento lo scarico resta lento, l'ostruzione richiede intervento meccanico con ventosa, sonda, o idraulico."
    }
  ],

  'perdita-acqua-tubo-muro': [
    {
      question: "Ho una macchia di umidità sul muro: è una perdita d'acqua?",
      shortAnswer: "Potrebbe essere perdita idraulica, infiltrazione da pioggia, o condensa. Se la macchia si espande o il muro è bagnato al tatto, è probabilmente una perdita. Monitora per 24-48 ore.",
      fullAnswer: "Una macchia di umidità sul muro può avere diverse cause. Perdita idraulica: se il muro è bagnato al tatto, la macchia si espande, o noti aumento della bolletta, è molto probabile una perdita da tubature incassate. Infiltrazione da pioggia: se la macchia appare o si ingrandisce solo dopo piogge intense e il muro è esterno o vicino a finestre/balconi, potrebbe essere un problema di impermeabilizzazione. Condensa: tipica di pareti fredde (esposizione nord, ponti termici), appare in inverno con riscaldamento acceso e scompare d'estate. Risalita capillare: umidità dal terreno che sale dal basso verso l'alto, tipica di piani terra e interrati. Per capire se è una perdita idraulica: chiudi tutti i rubinetti e controlla se il contatore continua a girare; monitora se la macchia si espande in 24-48 ore indipendentemente dalle condizioni meteo. Se sospetti una perdita, chiama un idraulico che con strumenti specifici (igrometro, termocamera) può localizzare la fonte."
    },
    {
      question: "Perdita acqua nel muro: quanto costa la riparazione?",
      shortAnswer: "Ricerca con strumenti: 100-250€. Riparazione tubo accessibile: 80-150€. Riparazione sotto traccia (con muratura): 200-500€. Danni collaterali (intonaco, pittura) non inclusi.",
      fullAnswer: "Il costo per riparare una perdita nel muro varia in base a diversi fattori. Ricerca perdita con strumenti professionali (igrometro, termocamera, geofono): 100-250€; è un passaggio fondamentale per evitare di rompere muri inutilmente. Riparazione di tubo accessibile (cassetta WC, dietro lavatrice): 80-150€. Riparazione tubo sotto traccia (incassato nel muro): 200-500€; include apertura del muro, riparazione o sostituzione del tratto, ma non il ripristino muratura. Ripristino muratura e tinteggiatura: 100-300€ aggiuntivi a seconda dell'estensione. Intervento in emergenza serale/weekend: +30-50% sul costo base. Fattori che influenzano il costo: posizione del tubo (più è profondo, più costa), tipo di tubatura (multistrato, rame, piombo), necessità di rompere piastrelle costose, accessibilità della zona. Consiglio: alcuni idraulici offrono pacchetti 'tutto incluso' ricerca + riparazione che possono essere più convenienti."
    },
    {
      question: "Come faccio a capire da dove viene la perdita nel muro?",
      shortAnswer: "Indicatori: controlla contatore con rubinetti chiusi, segui le tubature del bagno/cucina più vicino, nota se la macchia si espande. Un idraulico usa termocamera e geofono per localizzarla con precisione.",
      fullAnswer: "Individuare l'origine di una perdita nel muro richiede metodo. Test del contatore: chiudi tutti i rubinetti e osserva il contatore dell'acqua per 15 minuti; se gira, c'è una perdita. Mappatura tubature: le perdite sono più probabili vicino a bagni e cucine; controlla se la macchia è in corrispondenza di un bagno al piano superiore o di una parete dietro cui passano tubi. Osservazione della macchia: il punto più bagnato è spesso (ma non sempre) vicino alla perdita; l'acqua può però scorrere a lungo dentro il muro prima di manifestarsi. Strumenti professionali: l'idraulico usa igrometro per misurare l'umidità in diversi punti, termocamera a infrarossi per vedere le differenze di temperatura causate dall'acqua, geofono per sentire il rumore della perdita. Videoispezione delle tubature se si sospetta un problema nello scarico. Non tentare di bucare il muro da solo: potresti danneggiare ulteriormente il tubo o colpire cavi elettrici."
    },
    {
      question: "Perdita acqua muro: chi paga in condominio?",
      shortAnswer: "Se la perdita è da tubo privato (tuo appartamento), paghi tu. Se è dalla colonna condominiale, paga il condominio. Per i danni al vicino del piano sotto, risponde chi ha causato la perdita.",
      fullAnswer: "La responsabilità economica dipende da dove si trova la perdita. Tubo privato del tuo appartamento: se la perdita è nel tratto di tubatura che serve solo il tuo immobile (dopo il contatore o dopo il distacco dalla colonna), le spese di riparazione sono tue. Colonna condominiale: se la perdita è nel tratto di tubatura comune (montanti verticali, tratti orizzontali di distribuzione), le spese sono ripartite tra tutti i condomini secondo i millesimi. Danni a terzi: se la tua perdita ha danneggiato l'appartamento del vicino sotto, sei responsabile del risarcimento; la sua assicurazione potrebbe anticipare, poi rivalersi su di te. Responsabilità amministratore: in caso di perdita da parti comuni, l'amministratore deve intervenire tempestivamente; se ritarda e i danni aumentano, potrebbe essere corresponsabile. Consiglio: documenta tutto con foto/video e comunica per iscritto (email, raccomandata) per tutelare la tua posizione. L'assicurazione casa copre spesso questi danni."
    },
    {
      question: "È pericoloso avere una perdita d'acqua nel muro vicino all'impianto elettrico?",
      shortAnswer: "Sì, è molto pericoloso. L'acqua può causare cortocircuiti, incendi, folgorazione. Se la perdita è vicino a prese o interruttori, stacca la corrente dalla zona e chiama un idraulico urgentemente.",
      fullAnswer: "Una perdita d'acqua vicino all'impianto elettrico è una situazione ad alto rischio che richiede intervento immediato. I pericoli sono: cortocircuito che può danneggiare elettrodomestici collegati e l'intero impianto; principio di incendio se il cortocircuito genera scintille vicino a materiali infiammabili; folgorazione se tocchi una presa o interruttore bagnato. Cosa fare immediatamente: non toccare prese, interruttori o elettrodomestici nella zona interessata; vai al quadro elettrico e stacca la corrente del circuito interessato (meglio ancora, stacca l'interruttore generale); chiama un idraulico per intervento urgente. Se sei già stato a contatto con acqua vicino a elettricità e noti formicolii, vai al pronto soccorso. Dopo la riparazione della perdita, fai controllare l'impianto elettrico da un elettricista per verificare che non ci siano danni. La combinazione acqua + elettricità è una delle emergenze domestiche più serie."
    }
  ],

  // Guide caldaie
  'caldaia-non-parte-cosa-fare': [
    {
      question: "La caldaia non parte: quali controlli posso fare da solo?",
      shortAnswer: "Verifica: pressione (deve essere 1-1.5 bar), termostato acceso e temperatura corretta, rubinetto gas aperto, display per codici errore, interruttore caldaia ON. Resetta se indicato.",
      fullAnswer: "Prima di chiamare un tecnico, puoi fare alcuni controlli semplici. Pressione dell'impianto: controlla il manometro, la lancetta deve essere tra 1 e 1.5 bar; se è sotto, rabbocca aprendo il rubinetto di carico sotto la caldaia. Termostato ambiente: verifica che sia acceso, che la temperatura impostata sia superiore a quella attuale, e che le batterie non siano scariche. Rubinetto del gas: assicurati che sia aperto (leva parallela al tubo = aperto). Interruttore della caldaia: spesso c'è un interruttore dedicato vicino alla caldaia, controlla che sia su ON. Display e spie: leggi eventuali codici di errore (tipo E01, F28) e cerca il significato nel manuale. Reset: se sul display appare un errore, prova a premere il pulsante reset (di solito indicato con R o simbolo frecce); se l'errore persiste dopo 2-3 reset, serve un tecnico. Se dopo questi controlli la caldaia non parte, il problema richiede diagnosi professionale."
    },
    {
      question: "Caldaia in blocco con errore: cosa significa il codice sul display?",
      shortAnswer: "I codici variano per marca. Comuni: E01/F28 = problema accensione/gas; E10/F22 = pressione bassa; E35 = problema fiamma; E25/F75 = problema circolazione acqua. Consulta il manuale o chiama il tecnico.",
      fullAnswer: "I codici di errore della caldaia indicano la natura del problema, ma variano da marca a marca. Codici comuni e significati generali: E01, F28, E25 = problema di accensione, mancanza gas, o elettrodo ionizzazione sporco; spesso si risolve con reset, altrimenti serve tecnico. E10, F22 = pressione bassa nell'impianto; risolvi riempiendo l'impianto dal rubinetto di carico sotto la caldaia. E35, F29 = problema di rilevazione fiamma; può essere elettrodo sporco o problema alla scheda. E25, F75 = problema pompa o circolazione acqua; potrebbe essere pompa bloccata o aria nell'impianto. E119, F73 = problema sonda temperatura; serve sostituzione componente. E125, F83 = problema scarico fumi; verifica che lo scarico non sia ostruito. Dove trovare i significati: nel manuale utente della caldaia, sull'etichetta interna della caldaia (apri lo sportello), cercando online 'codice errore + marca caldaia'. Se il codice non si cancella dopo reset, non insistere: ripetuti tentativi possono causare danni. Chiama un tecnico abilitato."
    },
    {
      question: "Quanto costa far riparare una caldaia che non parte?",
      shortAnswer: "Uscita + diagnosi: 50-100€. Piccole riparazioni (reset scheda, pulizia): 80-150€. Sostituzione componenti (scheda, pompa, valvola): 150-400€. In garanzia molti interventi sono gratuiti.",
      fullAnswer: "I costi per riparare una caldaia variano in base al problema riscontrato. Uscita e diagnosi: 50-100€, copre lo spostamento del tecnico e l'identificazione del guasto; alcune aziende lo scontano se si procede con la riparazione. Piccoli interventi (reset scheda, pulizia elettrodi, regolazione pressione): 80-150€ tutto incluso. Sostituzione componenti: scheda elettronica 150-300€; pompa di circolazione 200-350€; valvola gas 150-250€; elettrodo accensione 80-150€; i prezzi includono manodopera. Interventi maggiori: sostituzione scambiatore primario 300-500€; ventilatore 200-350€. Pronto intervento fuori orario: maggiorazione del 30-50%. Se la caldaia è in garanzia (di solito 2 anni, estendibile), molti interventi sono gratuiti; controlla la documentazione. Per caldaie molto vecchie, valuta se conviene riparare o sostituire: una caldaia nuova a condensazione costa 1.500-3.000€ installata ma risparmia il 20-30% in bolletta."
    },
    {
      question: "Posso resettare la caldaia da solo quando va in blocco?",
      shortAnswer: "Sì, premi il pulsante reset (R o simbolo frecce) sul pannello. Se riparte, tutto ok. Se va di nuovo in blocco dopo 2-3 reset, fermati: c'è un problema reale che richiede un tecnico.",
      fullAnswer: "Il reset della caldaia è un'operazione sicura che puoi fare da solo. Come si resetta: trova il pulsante reset sul pannello della caldaia, solitamente indicato con 'R', 'Reset', o un simbolo di frecce circolari; tienilo premuto per 3-5 secondi fino a quando la caldaia si riavvia. Quando il reset risolve: se il blocco era casuale (sbalzo di tensione, piccola anomalia temporanea), il reset fa ripartire la caldaia normalmente. Quando NON insistere con il reset: se la caldaia va di nuovo in blocco entro pochi minuti, ripetere il reset è inutile e potenzialmente dannoso; c'è un problema reale (componente difettoso, mancanza gas, ostruzione scarico) che richiede intervento tecnico. Perché non insistere: forzare ripetutamente l'accensione può causare accumulo di gas incombusto (pericoloso), danneggiare la scheda elettronica, aggravare il guasto originale. Regola pratica: massimo 2-3 reset in 24 ore; se non funzionano, chiama il tecnico."
    },
    {
      question: "La caldaia non produce acqua calda ma i termosifoni funzionano: perché?",
      shortAnswer: "Probabilmente è la valvola a tre vie bloccata in posizione riscaldamento, o il sensore sanitario guasto. Prova a spegnere e riaccendere. Se persiste, serve intervento tecnico per sostituire il componente.",
      fullAnswer: "Questo è un problema comune che indica un guasto specifico. Causa più probabile: la valvola a tre vie è bloccata. Questa valvola devia l'acqua calda tra il circuito dei termosifoni e quello sanitario; se si blocca in posizione riscaldamento, i termosifoni funzionano ma non esce acqua calda dai rubinetti. Altre cause: sensore temperatura sanitario guasto che non segnala la richiesta di acqua calda; scheda elettronica che non gestisce correttamente la commutazione; flussostato sanitario bloccato che non rileva il flusso d'acqua. Cosa puoi provare: spegni la caldaia dall'interruttore per 5 minuti, poi riaccendi; a volte la valvola si sblocca. Verifica che il rubinetto dell'acqua fredda in ingresso alla caldaia sia aperto. Controlla se c'è un codice di errore sul display. Se il problema persiste: serve un tecnico per diagnosticare il componente difettoso e sostituirlo. Il costo per sostituzione valvola a tre vie è circa 150-250€."
    }
  ],

  'caldaia-perde-acqua-sotto': [
    {
      question: "La caldaia perde acqua: è pericoloso?",
      shortAnswer: "Non è pericoloso per la sicurezza personale (non c'è rischio esplosione), ma può causare danni all'abitazione e guasti alla caldaia stessa. Richiede intervento entro 24-48 ore.",
      fullAnswer: "Una caldaia che perde acqua non rappresenta un pericolo immediato per le persone: non c'è rischio di esplosione o fughe di gas. Tuttavia, la situazione richiede attenzione per altri motivi. Rischi per l'abitazione: l'acqua può danneggiare pavimenti, mobili, pareti; se la caldaia è a un piano alto, può infiltrarsi causando danni ai vicini sotto. Rischi per la caldaia: la perdita può causare pressione bassa che manda la caldaia in blocco; se l'acqua raggiunge componenti elettrici interni, può danneggiarli; la corrosione può estendersi. Urgenza in base alla quantità: gocce occasionali = puoi attendere qualche giorno; gocce continue = intervieni entro 24-48 ore; filo d'acqua = chiama oggi. Cosa fare subito: metti un contenitore sotto la perdita; controlla il manometro della pressione; se la perdita è abbondante, chiudi la valvola di ingresso acqua alla caldaia. Chiama un tecnico caldaista (non un generico idraulico) per diagnosi e riparazione."
    },
    {
      question: "Da dove perde acqua la caldaia? Come capirlo?",
      shortAnswer: "Osserva il punto esatto: dalla valvola di sicurezza = pressione troppo alta; dai raccordi = guarnizioni usurate; dal corpo scambiatore = corrosione grave; dal fondo = vaso espansione forato.",
      fullAnswer: "Identificare il punto esatto della perdita aiuta a capire la causa. Perdita dalla valvola di sicurezza (rossa, laterale): si attiva quando la pressione supera i 3 bar; la causa è spesso il vaso espansione sgonfio o forato, oppure un riempimento eccessivo dell'impianto. Perdita dai raccordi idraulici: le connessioni tra tubi e caldaia hanno guarnizioni che si usurano; basta stringerle o sostituire gli O-ring. Perdita dallo scambiatore primario (dentro la caldaia): indica corrosione grave; lo scambiatore va sostituito, intervento costoso (300-500€). Perdita dal fondo della caldaia: spesso è il vaso espansione interno forato; la membrana ha ceduto. Condensa eccessiva: alcune gocce sotto la caldaia a condensazione sono normali; se aumenta, il sistema di scarico condensa è intasato. Per capire l'origine: asciuga bene la zona sotto la caldaia, metti carta assorbente, e osserva dopo qualche ora dove si bagna per prima."
    },
    {
      question: "Caldaia che perde: posso ripararla da solo?",
      shortAnswer: "Solo interventi esterni: stringere raccordi allentati, sostituire guarnizioni accessibili. Mai aprire la caldaia o intervenire sul circuito gas. Per qualsiasi dubbio, chiama un tecnico abilitato.",
      fullAnswer: "Alcuni piccoli interventi puoi farli da solo, altri assolutamente no. Puoi fare da solo: stringere leggermente raccordi esterni visibilmente allentati con una chiave inglese; sostituire una guarnizione esterna accessibile; pulire lo scarico condensa se intasato; ridurre la pressione dell'impianto se è troppo alta (apri una valvola di sfiato di un termosifone). Non devi mai: aprire il carter della caldaia (perdi la garanzia e rischi); intervenire sul circuito gas (è illegale senza abilitazione e pericoloso); forzare valvole bloccate; usare sigillanti chimici che potrebbero intasare altri componenti. Quando chiamare un tecnico: se la perdita viene dall'interno della caldaia; se non riesci a identificare l'origine; se la pressione continua a scendere nonostante i rabbocchi; se ci sono codici di errore sul display. La caldaia è un apparecchio a gas: la sicurezza viene prima di tutto."
    },
    {
      question: "Quanto costa riparare una caldaia che perde acqua?",
      shortAnswer: "Sostituzione guarnizioni/O-ring: 50-100€. Riparazione raccordi: 80-150€. Sostituzione vaso espansione: 150-250€. Sostituzione scambiatore: 300-500€. Diagnosi iniziale: 50-80€.",
      fullAnswer: "Il costo dipende dalla causa della perdita. Interventi minori: sostituzione guarnizioni o O-ring esterni 50-100€; serraggio raccordi e piccole riparazioni 80-150€. Interventi medi: sostituzione vaso espansione interno 150-250€ (componente + manodopera); riparazione valvola di sicurezza 100-180€; sostituzione pompa se perde dalla sede 200-350€. Interventi maggiori: sostituzione scambiatore primario 300-500€; se lo scambiatore è corroso, a volte conviene sostituire la caldaia. Costi accessori: uscita e diagnosi 50-80€ (spesso scalata dalla riparazione); pronto intervento fuori orario +30-50%; eventuale rabbocco antigelo/inibitore 30-50€. Per caldaie in garanzia: verificia la copertura, alcuni componenti sono garantiti 2-5 anni. Valutazione costi-benefici: se la caldaia ha più di 12-15 anni e serve un intervento costoso, considera la sostituzione; una caldaia nuova a condensazione ha efficienza molto superiore."
    }
  ]
};

/**
 * Get FAQs for a specific guide by slug
 */
export function getGuideFAQs(slug: string): GuideFAQ[] {
  return GUIDE_FAQS[slug] || [];
}

/**
 * Check if a guide has FAQ questions
 */
export function hasGuideFAQs(slug: string): boolean {
  return GUIDE_FAQS[slug]?.length > 0;
}
