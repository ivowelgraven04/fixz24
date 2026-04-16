/* ============================================================
   FIXZ24 — Blog posts data
   Simple static array, Markdown-light (paragraphs + headings)
   ============================================================ */

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string; // ISO
  author: string;
  gradient: [string, string]; // from, to
  content: BlogBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "kor-zzp-2026",
    title: "Hoe werkt de KOR voor ZZP'ers in 2026?",
    excerpt:
      "De kleineondernemersregeling (KOR) is een belangrijke keuze voor ZZP'ers. We leggen uit wanneer het slim is en wanneer juist niet.",
    category: "BTW",
    readTime: "6 min",
    date: "2026-03-18",
    author: "Fixz24 redactie",
    gradient: ["#464888", "#ac9773"],
    content: [
      {
        type: "p",
        text: "De kleineondernemersregeling (KOR) klinkt aantrekkelijk: geen BTW-administratie, geen kwartaalaangiftes. Maar is het ook écht voordelig voor jou? In dit artikel leggen we uit wanneer de KOR een slimme keuze is en wanneer je 'm juist beter kunt overslaan.",
      },
      { type: "h2", text: "Wat is de KOR?" },
      {
        type: "p",
        text: "De KOR is een vrijstellingsregeling voor ondernemers met een jaaromzet van maximaal € 20.000 (cijfers 2026). Meld je je aan, dan hoef je drie jaar lang geen BTW te berekenen aan klanten en geen BTW-aangifte in te dienen. Simpel, zou je zeggen — maar er zit een keerzijde aan.",
      },
      { type: "h2", text: "Voordelen van de KOR" },
      {
        type: "ul",
        items: [
          "Geen BTW-administratie en kwartaalaangiftes",
          "Je facturen zijn aantrekkelijker voor particuliere klanten (geen 21% BTW)",
          "Minder administratieve last, dus minder kosten voor je boekhouder",
        ],
      },
      { type: "h2", text: "Het grote nadeel" },
      {
        type: "p",
        text: "Wanneer je de KOR gebruikt, kun je géén voorbelasting meer terugvragen. Heb je dus veel zakelijke kosten met BTW (apparatuur, software, auto, inkoopproducten) dan loop je die terugbetaling compleet mis. Voor ZZP'ers met investeringen of veel kosten kan dat al snel meer zijn dan wat je bespaart op administratie.",
      },
      { type: "h3", text: "Wanneer is de KOR slim?" },
      {
        type: "p",
        text: "De KOR is typisch voordelig als je: lage of geen zakelijke inkopen hebt, voornamelijk aan particulieren levert, en onder de € 20.000 omzet per jaar blijft. Denk aan: yogaleraren, coaches, schoonmakers, sommige creatieve freelancers.",
      },
      { type: "h3", text: "Wanneer juist niet?" },
      {
        type: "p",
        text: "Lever je voornamelijk aan BV's of zakelijke klanten? Dan maakt het hen niets uit dat je BTW rekent — zij kunnen het toch terugvragen. En ben je aan het investeren? Dan verlies je een flink belastingvoordeel. Voor consultants, developers en freelancers met veel zakelijke kosten is de KOR meestal niet de juiste keuze.",
      },
      {
        type: "quote",
        text: "De KOR is geen 'gratis' besparing — het is een ruil. Weet wat je inlevert voordat je je aanmeldt.",
      },
      { type: "h2", text: "Hoe meld je je aan?" },
      {
        type: "p",
        text: "Aanmelden voor de KOR doe je via Mijn Belastingdienst Zakelijk. Let op: je zit dan minimaal drie jaar aan de regeling vast. Daarna kun je pas weer terug naar de reguliere BTW. Twijfel je? Laat ons meerekenen — we bepalen in 15 minuten of de KOR bij jouw situatie past.",
      },
    ],
  },
  {
    slug: "vennootschapsbelasting-uitgelegd",
    title: "Vennootschapsbelasting uitgelegd in 5 minuten",
    excerpt:
      "Heb je een BV? Dan heb je te maken met vennootschapsbelasting (VPB). We leggen de tarieven, voorlopige aanslagen en valkuilen uit.",
    category: "BV",
    readTime: "5 min",
    date: "2026-03-02",
    author: "Fixz24 redactie",
    gradient: ["#2e3060", "#5a5ca8"],
    content: [
      {
        type: "p",
        text: "Als BV betaal je geen inkomstenbelasting over je winst — je betaalt vennootschapsbelasting (VPB). Een paar belangrijke dingen om te weten voordat je jaar eindigt.",
      },
      { type: "h2", text: "De tarieven in 2026" },
      {
        type: "ul",
        items: [
          "Tot € 200.000 winst: 19% VPB",
          "Boven € 200.000 winst: 25,8% VPB",
        ],
      },
      {
        type: "p",
        text: "Let op: de schijfgrens is dus € 200.000. Zit je net daarboven? Het kan de moeite waard zijn om een investering of salariscorrectie naar voren te halen om onder de grens te blijven.",
      },
      { type: "h2", text: "Voorlopige aanslag" },
      {
        type: "p",
        text: "De Belastingdienst stuurt je gedurende het jaar een voorlopige aanslag VPB gebaseerd op je vorige jaar. Klopt die niet met de werkelijkheid? Laat 'm dan wijzigen — je wilt niet plotseling aan het eind van het jaar een grote bijbetaling krijgen, inclusief belastingrente.",
      },
      { type: "h2", text: "De directeur-grootaandeelhouder (DGA)" },
      {
        type: "p",
        text: "Als DGA moet je jezelf een 'gebruikelijk loon' uitkeren — in 2026 minimaal € 56.000 (behoudens uitzonderingen). Dit loon is aftrekbaar voor de VPB maar jij betaalt er privé inkomstenbelasting over. De juiste balans tussen loon en dividend bepaalt hoeveel je in totaal kwijt bent.",
      },
      {
        type: "quote",
        text: "Een paar procent verschil op loon-vs-dividend kan € 5.000–€ 10.000 per jaar schelen voor een gemiddelde DGA.",
      },
      { type: "h2", text: "Innovatiebox en andere aftrekposten" },
      {
        type: "p",
        text: "Doe je onderzoek, software-ontwikkeling of innovatief werk? De innovatiebox verlaagt het effectieve VPB-tarief tot 9% voor kwalificerende winst. Niet elke BV komt in aanmerking, maar als je dat wel doet is dit enorm de moeite waard om uit te zoeken.",
      },
    ],
  },
  {
    slug: "auto-van-de-zaak",
    title: "Auto van de zaak: ja of nee?",
    excerpt:
      "De bekende vraag: zet ik de auto op de zaak of houd ik 'm privé? Een concreet stappenplan om te kiezen.",
    category: "Advies",
    readTime: "7 min",
    date: "2026-02-22",
    author: "Fixz24 redactie",
    gradient: ["#ac9773", "#c4b08e"],
    content: [
      {
        type: "p",
        text: "Auto op de zaak of auto privé — het is een van de meest gestelde vragen. Het antwoord hangt af van hoe je hem gebruikt. Geen universele regel, wel een duidelijke checklist.",
      },
      { type: "h2", text: "De bijtelling-val" },
      {
        type: "p",
        text: "Zet je een auto op de zaak, dan krijg je er bijtelling bij: 22% (2026, elektrisch 17%) van de cataloguswaarde wordt bij je inkomen geteld — tenzij je minder dan 500 privékilometers per jaar rijdt en dit sluitend bijhoudt. Die 500-km-grens is strikt; één boodschappenritje buiten werk kan er al overheen gaan.",
      },
      { type: "h2", text: "Wanneer is zakelijk voordeliger?" },
      {
        type: "ul",
        items: [
          "Je rijdt veel zakelijke kilometers (> 15.000 per jaar)",
          "Je rijdt elektrisch (lage bijtelling)",
          "De auto is duur (cataloguswaarde hoog) en je koopt 'm anders niet",
          "Je gebruikt 'm echt zakelijk en kunt bijtelling betalen als acceptabel",
        ],
      },
      { type: "h2", text: "Wanneer privé houden?" },
      {
        type: "ul",
        items: [
          "Je rijdt weinig zakelijk (< 5.000 km) — de € 0,23/km vergoeding compenseert royaal",
          "De auto heeft hoge cataloguswaarde maar je rijdt 'm nauwelijks",
          "Je bent ZZP en de inkomstenbijtelling tikt hard door in schijven",
        ],
      },
      { type: "h2", text: "Concreet rekenvoorbeeld" },
      {
        type: "p",
        text: "Stel: cataloguswaarde € 40.000, 22% bijtelling = € 8.800 extra inkomen per jaar. Bij 49,5% IB-schijf is dat € 4.356 belasting. Rijd je 20.000 zakelijke km privé, dan vergoed je jezelf € 4.600 belastingvrij. Die twee zitten dichtbij elkaar — en dan hebben we het nog niet gehad over afschrijving, onderhoud en financieringskosten.",
      },
      {
        type: "quote",
        text: "Voor 80% van onze klanten is de privéauto met kilometervergoeding de voordeligere keuze. Laat 'm sluitend bijhouden met een app.",
      },
    ],
  },
  {
    slug: "btw-aangifte-starter-stappenplan",
    title: "BTW-aangifte doen als starter: stappenplan",
    excerpt:
      "Net begonnen en staat je eerste BTW-aangifte voor de deur? Hier is wat je moet weten en doen, stap voor stap.",
    category: "Starter",
    readTime: "8 min",
    date: "2026-02-10",
    author: "Fixz24 redactie",
    gradient: ["#5a5ca8", "#464888"],
    content: [
      {
        type: "p",
        text: "Je eerste BTW-aangifte kan intimiderend voelen. Goed nieuws: het is een kwestie van de juiste cijfers op de juiste plek. Volg dit stappenplan en je komt er wel.",
      },
      { type: "h2", text: "Stap 1: Weet je of je BTW-plichtig bent?" },
      {
        type: "p",
        text: "Na KvK-inschrijving krijg je automatisch een BTW-nummer (tenzij je je voor de KOR hebt aangemeld — zie ons andere artikel). Je krijgt van de Belastingdienst een brief met je aangiftetijdvak (meestal per kwartaal).",
      },
      { type: "h2", text: "Stap 2: Verzamel je verkoop-BTW" },
      {
        type: "p",
        text: "Tel alle BTW die je in je facturen hebt berekend aan klanten. Voor 21% klanten, 9% klanten en 0% klanten apart. Dit is de BTW die je moet afdragen.",
      },
      { type: "h2", text: "Stap 3: Verzamel je voorbelasting" },
      {
        type: "p",
        text: "Tel alle BTW die je zelf hebt betaald op zakelijke inkopen: software, apparatuur, zakelijke maaltijden (deels), inkoopproducten. Dit is de BTW die je mag terugvragen. Bewaar alle facturen met BTW-nummer van de leverancier zichtbaar.",
      },
      { type: "h2", text: "Stap 4: Bereken het saldo" },
      {
        type: "p",
        text: "Verkoop-BTW min voorbelasting. Positief saldo? Je moet betalen aan de Belastingdienst. Negatief saldo? Je krijgt geld terug.",
      },
      { type: "h2", text: "Stap 5: Aangifte indienen" },
      {
        type: "p",
        text: "Log in op Mijn Belastingdienst Zakelijk, kies de juiste periode, vul de cijfers in. Klaar. Betaal uiterlijk de eerste dag van de maand volgend op het tijdvak (31 januari, 30 april, 31 juli, 31 oktober).",
      },
      { type: "h3", text: "Veelvoorkomende fouten" },
      {
        type: "ul",
        items: [
          "Factuur zonder BTW-nummer van leverancier → geen aftrek mogelijk",
          "Privé-uitgaven bij de zakelijke BTW gerekend",
          "Te laat indienen → direct boete (min. € 68)",
          "Verkoop aan EU-bedrijven verkeerd geboekt (moet meestal 0% met verlegging)",
        ],
      },
      {
        type: "quote",
        text: "Na de eerste twee kwartalen voelt het als routine. Daarvoor: laat 'm even nakijken door iemand die dit dagelijks doet.",
      },
    ],
  },
  {
    slug: "van-zzp-naar-bv",
    title: "Van ZZP naar BV: wanneer is overstappen slim?",
    excerpt:
      "Op welk winstniveau wordt een BV voordeliger dan een eenmanszaak? We rekenen het door met concrete cijfers.",
    category: "Advies",
    readTime: "6 min",
    date: "2026-01-28",
    author: "Fixz24 redactie",
    gradient: ["#464888", "#5a5ca8"],
    content: [
      {
        type: "p",
        text: "'Boven de ton moet je naar een BV' hoor je vaak. Klopt dat? Niet zomaar. Er zijn drie factoren die de keuze bepalen: winst, privéverbruik en risico.",
      },
      { type: "h2", text: "De fiscale break-even" },
      {
        type: "p",
        text: "Een ZZP'er profiteert van zelfstandigenaftrek (€ 3.750 in 2026) en MKB-winstvrijstelling (13,31%). Een BV betaalt VPB over winst en inkomstenbelasting over uitgekeerd loon/dividend. Met een optimale salaris-vs-dividend split ligt het break-even punt rond € 100.000 winst. Daarboven wordt een BV typisch voordeliger; daaronder kost 'm je meestal meer.",
      },
      { type: "h2", text: "Naast geld: waarom óók een BV?" },
      {
        type: "ul",
        items: [
          "Aansprakelijkheidsbescherming — je privévermogen staat los",
          "Professionele uitstraling bij grote klanten",
          "Makkelijker investeerders aantrekken",
          "Flexibele winstreserve (niet direct belast)",
        ],
      },
      { type: "h2", text: "Maar ook: de kosten" },
      {
        type: "ul",
        items: [
          "Oprichting: € 500–€ 1.500 eenmalig",
          "Jaarlijkse kosten boekhouder: typisch € 500+ hoger dan eenmanszaak",
          "Gebruikelijk loon verplichting (min. € 56.000 in 2026)",
          "Jaarrekening deponeren bij KvK (openbaar)",
        ],
      },
      {
        type: "quote",
        text: "We zien klanten vaak één jaar te laat overstappen. Een BV-switch werkt pas per 1 januari (of per fusiedatum). Ga niet wachten tot je aangifte tegenvalt.",
      },
      { type: "h2", text: "Ons advies" },
      {
        type: "p",
        text: "Zit je al twee jaar rond € 80.000+ winst, groeit je business of zit je met risicogevoelige projecten (IT-consultancy, bouw, adviesdiensten), dan is een BV-gesprek het waard. Laat ons je persoonlijke situatie doorrekenen — we maken een vergelijking op papier met jouw cijfers erin.",
      },
    ],
  },
  {
    slug: "administratie-opzetten-7-tips",
    title: "Administratie opzetten: 7 praktische tips",
    excerpt:
      "Of je nu net begint of je administratie op orde wilt brengen: deze 7 tips maken je boekhouding vanaf dag één soepel.",
    category: "Starter",
    readTime: "5 min",
    date: "2026-01-14",
    author: "Fixz24 redactie",
    gradient: ["#ac9773", "#464888"],
    content: [
      {
        type: "p",
        text: "Een goede administratie bespaart je jaarlijks uren én geld. Hier zijn zeven praktische tips die direct verschil maken.",
      },
      { type: "h3", text: "1. Scheid zakelijk en privé vanaf dag één" },
      {
        type: "p",
        text: "Open een aparte zakelijke rekening, gebruik 'm voor alle zakelijke transacties. Geen privé-aankopen, geen zakelijke diners van je privépas. Dit is het fundament — zonder dit wordt alles chaotisch.",
      },
      { type: "h3", text: "2. Kies één boekhoudpakket en blijf erbij" },
      {
        type: "p",
        text: "Of het nou e-Boekhouden, Moneybird of Exact Online is — kies één, leer 'm goed en wissel niet elk jaar. De winst zit in routine.",
      },
      { type: "h3", text: "3. Factureer dezelfde dag" },
      {
        type: "p",
        text: "Werk af, factureer af. Elke dag dat een factuur ligt is een dag die je cashflow vertraagt. Binnen 24 uur factureren bespaart je gemiddeld 8 dagen sneller betaald worden.",
      },
      { type: "h3", text: "4. Bonnen digitaliseren, fysiek weg" },
      {
        type: "p",
        text: "Gebruik een bon-scanapp (iedere boekhouder heeft er een). Foto, koppelen aan uitgave, bon weg. Een doos met bonnen in de garage is een administratief nachtmerrie wachtend om te gebeuren.",
      },
      { type: "h3", text: "5. Plan een vast admin-uur per week" },
      {
        type: "p",
        text: "Elke vrijdag 30 minuten: bonnen verwerken, facturen na-checken, bankafschriften koppelen. Dit voorkomt dat je in januari een berg van 12 maanden moet opruimen.",
      },
      { type: "h3", text: "6. Zet automatische BTW-reservering op" },
      {
        type: "p",
        text: "Elke week (of bij elke inkomende betaling) direct 21% naar een aparte spaarrekening. Als de BTW-aangifte komt is het al klaar en staat er niet opeens een gat in je operationele cashflow.",
      },
      { type: "h3", text: "7. Laat iemand meekijken" },
      {
        type: "p",
        text: "Zelfs als je het 'zelf doet': een kwartaalcheck door een vakman kost weinig en voorkomt dat jouw lijstje met 'ik kijk het later wel uit' eindigt als een forse naheffing. Geld goed besteed.",
      },
      {
        type: "quote",
        text: "De beste administratie is één die 's avonds niet wakker houdt. Niet perfect — wel consistent.",
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, count = 3): BlogPost[] {
  const current = getPost(slug);
  if (!current) return [];
  return blogPosts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => (a.category === current.category ? -1 : 1))
    .slice(0, count);
}
