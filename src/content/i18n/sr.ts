import type { Dictionary } from "./types";

/**
 * Serbian, in Latin script.
 *
 * WHO THIS IS FOR. Serbs are the largest foreign property-owning group in
 * Chalkidiki by a wide margin — plots, holiday houses and small rental
 * apartments, bought over decades, and they drive down every summer. They
 * need exactly what he does: clearing, digging, a septic tank, a yard put
 * right before the season.
 *
 * LATIN, NOT CYRILLIC. Serbian is genuinely digraphic and neither script is
 * wrong, but Latin is also readable to Bosnian and Croatian speakers, who own
 * property here too. Cyrillic would narrow the page for no gain. The <html
 * lang> is tagged sr-Latn so a search engine is not left guessing.
 *
 * REGISTER. The Greek is a man talking about his own work — short sentences,
 * concrete nouns, no salesmanship. Serbian business copy slides into stiff
 * officialese ("vršimo usluge iskopa") very easily; that would sound like a
 * state enterprise, not two brothers with machines. Keep it spoken.
 *
 * TRADE TERMS ARE THE RISK. Bager, not "kopač". Septička jama, not "septik
 * tank". Šut for rubble, zemlja for soil — a Serb building a house knows
 * these words precisely and a wrong one costs credibility immediately.
 *
 * PLACE NAMES stay in their Latin transliteration as Serbs write them:
 * Halkidiki, Sitonija, Metamorfosi, Daskalon, Nikiti, Vatopedi, Psakudija.
 *
 * WORTH A NATIVE CHECK before any advertising money is pointed at this page.
 */

export const sr: Dictionary = {
  seo: {
    title: "Zemljani radovi na Halkidikiju od 1987 | TSOPOUROGLOU",
    description:
      "Porodična firma za zemljane radove u Metamorfosiju, Halkidiki, na istom terenu od 1987. Iskopi, čišćenje placeva, septičke jame, razbijanje stena, rušenje. Pozovite 697 355 7903.",
  },

  tagline: {
    full: "ZEMLJANI RADOVI · METAMORFOSI, HALKIDIKI",
    short: "ZEMLJANI RADOVI · HALKIDIKI",
  },

  hero: {
    eyebrow: "ZEMLJANI RADOVI · HALKIDIKI",
    headingLead: "Kopamo ovu zemlju od",
    lede: [
      "Iskopi, čišćenje placeva, septičke jame, razbijanje stena.",
      "Baza nam je Metamorfosi i naselje Daskalon.",
    ],
    callLabel: "POZOVITE",
    quoteLabel: "Pitajte za cenu",
    hours: "Javljamo se na telefon 24 sata, svaki dan.",
    credentials: [
      { key: "Licencirani rukovalac", value: "od 1990." },
      { key: "Telefon", value: "24 sata" },
      { key: "Tri bagera", value: "veliki, srednji, mali" },
    ],
  },

  chrome: {
    navAria: "Glavna navigacija",
    menu: "MENI",
    navigation: "NAVIGACIJA",
    close: "ZATVORI",
    phoneLabel: "TELEFON",
    phoneAria: "Telefon",
    skipToContent: "Pređi na sadržaj",
    footerServices: "Usluge",
    footerAreas: "Područja",
    footerContact: "Kontakt",
    footerPages: "Stranice",
    footerRights: "Zemljani radovi u Metamorfosiju, Halkidiki, od 1987.",
    privacyLabel: "Politika privatnosti",
    privacyNote: "",
  },

  navLabels: {
    home: "Početna",
    services: "Usluge",
    areas: "Područja",
    fleet: "Mašine",
    about: "O nama",
    contact: "Kontakt",
    faq: "Pitanja",
  },

  servicesSection: {
    eyebrow: "ŠTA RADIMO",
    heading: "Šta radimo",
    lede: "Devet poslova. To radimo i to znamo.",
    cta: "Sve usluge",
  },

  areasSection: {
    eyebrow: "GDE RADIMO",
    heading: "Gde radimo",
    lede: "Metamorfosi i naselje Daskalon su naš teren — tamo stižemo prvi. Radimo i u Nikitiju, Vatopediju i Psakudiji. Pet sela, sva na nekoliko minuta od mašina.",
    priorityLabel: "NAŠ TEREN",
  },

  whySection: {
    eyebrow: "ZAŠTO MI",
    heading: "Zašto mi",
    items: [
      {
        figure: "1987",
        title: "Ista zemlja od 1987.",
        body: "Ista porodica, isto selo, dva brata.",
      },
      {
        figure: "1990",
        title: "Licencirani rukovalac od 1990.",
        body: "Sertifikovani rukovalac građevinskim mašinama.",
      },
      {
        figure: "24",
        title: "Telefon radi 24 sata",
        body: "Pukla cev ne čeka radno vreme.",
      },
      {
        figure: "3",
        title: "Tri bagera — veliki, srednji, mali",
        body: "Za otvoreno gradilište i za usko dvorište.",
      },
    ],
  },

  reviewsSection: {
    eyebrow: "UTISCI",
    heading: "Šta kažu klijenti",
    lede: "Utisci sa našeg Google profila, tačno onako kako su ih klijenti napisali. Većina je na grčkom — ocena i broj utisaka govore ostalo.",
    cta: "Pogledajte utiske na Google-u",
    onGoogle: "na Google-u",
    reviewsNoun: "utisaka",
  },

  contactSection: {
    eyebrow: "KONTAKT",
    heading: "Pozovite nas",
    lede: "Recite nam kakav je posao i gde. Reći ćemo vam šta je potrebno i koliko košta.",
    mobileLabel: "Mobilni",
    landlineLabel: "Fiksni",
    emailLabel: "Email",
    baseLabel: "Sedište",
    baseValue: "Metamorfosi, Halkidiki",
    hoursLabel: "Radno vreme",
    hoursValue: "Otvoreno 24 sata, svaki dan",
    quoteCta: "Pitajte za cenu",
    quoteNote: "Recite nam posao i selo. Odgovaramo što pre.",
    faqLink: "česta pitanja",
  },

  services: {
    ekskafes: {
      title: "Iskopi",
      navTitle: "Iskopi",
      h1: "Iskopi na Halkidikiju",
      card: "Temelji, podrumi, rovovi. Tri bagera — veliki za gradilište, mali za uske prolaze.",
      metaTitle: "Iskopi Halkidiki | TSOPOUROGLOU",
      metaDescription:
        "Iskopi za temelje, podrume i rovove u Metamorfosiju, Halkidiki, od 1987. Tri bagera za svaku veličinu posla. Pozovite 697 355 7903.",
      lede: "Temelji za novu kuću, podrum, rov za cev. Kopamo ovu zemlju od 1987. i znamo šta je ispod nje.",
      includesHeading: "Šta obuhvata",
      includes: [
        "Iskop za temelje i podrume",
        "Rovovi za vodu, kanalizaciju i kablove",
        "Ravnanje i oblikovanje terena",
        "Utovar i odvoz zemlje našim kamionima",
      ],
      machinesHeading: "Čime to radimo",
      machines:
        "Imamo tri bagera: veliki, srednji i mali. Veliki vadi temelje i velike količine zemlje. Mali ulazi u dvorišta i prolaze gde ništa drugo ne staje. Na istom poslu mogu da zatrebaju sva tri — to procenjujemo kad vidimo plac.",
      askHeading: "Šta da nam kažete kad pozovete",
      ask: [
        "Koliko kvadrata ima plac",
        "Šta će se graditi, ako već znate",
        "Da li kamion može da dođe do mesta",
        "Da li je na susednom placu izbila stena",
      ],
    },

    "katharismos-oikopedon": {
      title: "Čišćenje placeva",
      navTitle: "Čišćenje placeva",
      h1: "Čišćenje placeva na Halkidikiju",
      card: "Suvo rastinje, šiblje, šut. Čist plac, spreman za gradnju ili prodaju.",
      metaTitle: "Čišćenje placeva Halkidiki | TSOPOUROGLOU",
      metaDescription:
        "Čišćenje placeva od suvog rastinja, šiblja i šuta u Metamorfosiju, Halkidiki, i po celoj Sitoniji. Od 1987. Pozovite 697 355 7903.",
      lede: "Plac koji niko nije dirao godinama. Očistimo ga, utovarimo ono što se skine, pa možete da vidite šta zapravo imate.",
      includesHeading: "Šta obuhvata",
      includes: [
        "Sečenje i uklanjanje suvog rastinja i šiblja",
        "Vađenje starog šuta i smeća",
        "Ravnanje površine da se po placu može hodati",
        "Odvoz svega našim kamionima",
      ],
      machinesHeading: "Čime to radimo",
      machines:
        "Obično utovarivač i kamion, a bager tamo gde ima korenja ili zakopanog šuta. Na malom ili ograđenom placu ulazi mini utovarivač — okreće se u mestu i ne treba mu zalet.",
      note: "Ako se plac čisti radi prodaje ili papira, recite nam na telefon. Šta znači „čisto“ nije isto u ta dva slučaja.",
      askHeading: "Šta da nam kažete kad pozovete",
      ask: [
        "U kom selu je plac i otprilike koliki je",
        "Koliko dugo nije čišćen",
        "Da li ima drveća ili samo rastinja",
        "Da li kamion može da dođe do njega",
      ],
    },

    vothroi: {
      title: "Septičke jame",
      navTitle: "Septičke jame",
      h1: "Izrada septičkih jama na Halkidikiju",
      card: "Od iskopa do poklopca. Gradimo ih; ne praznimo ih.",
      metaTitle: "Septičke jame Halkidiki | TSOPOUROGLOU",
      metaDescription:
        "Izrada septičkih jama u Metamorfosiju, Halkidiki, i po Sitoniji — od iskopa do poklopca. Od 1987. Pozovite 697 355 7903.",
      lede: "Za kuću bez priključka na kanalizaciju, ovo je deo koji mora da bude urađen kako treba. Iskopamo, sagradimo i zatvorimo.",
      includesHeading: "Šta obuhvata",
      includes: [
        "Iskop do dubine koju posao traži",
        "Zidanje jame i postavljanje cevi koje u nju ulaze",
        "Poklopac i otvor za pristup",
        "Zatrpavanje i sređivanje terena posle",
      ],
      machinesHeading: "Čime to radimo",
      machines:
        "Bager prema prilazu, i naši kamioni za zemlju. Koji dolazi zavisi od toga koliko je jama blizu kuće i šta treba zaobići da bi se stiglo do nje.",
      note: "Gradimo septičke jame. Ne praznimo ih — to radi cisterna i to je drugi zanat. Ako vam treba pražnjenje ili odgušenje, nismo mi pravi.",
      askHeading: "Šta da nam kažete kad pozovete",
      ask: [
        "Za koliko ljudi je kuća",
        "Da li u blizini postoji priključak na kanalizaciju",
        "Koliko je mesto udaljeno od kuće",
        "Da li mašina može da dođe do njega",
      ],
    },

    ekvrachismoi: {
      title: "Razbijanje stena",
      navTitle: "Razbijanje stena",
      h1: "Razbijanje stena na Halkidikiju",
      card: "Stena usred placa? Razbijamo je i odvozimo.",
      metaTitle: "Razbijanje stena Halkidiki | TSOPOUROGLOU",
      metaDescription:
        "Razbijanje stena na placevima u Metamorfosiju, Halkidiki, i po Sitoniji — čekićem, uz odvoz materijala. Od 1987. Pozovite 697 355 7903.",
      lede: "Stena ume da zaustavi posao u mestu. Izbije u temeljima, u rovu, ili tačno tamo gde je trebalo da bude prilaz.",
      includesHeading: "Šta obuhvata",
      includes: [
        "Razbijanje stene hidrauličnim čekićem",
        "Vađenje iz temelja i rovova",
        "Utovar i odvoz razbijenog materijala",
        "Ravnanje onoga što ostane",
      ],
      machinesHeading: "Čime to radimo",
      machines:
        "Način zavisi od toga koliko je stena tvrda i šta je oko nje — kuća, ograda, cevi. To treba videti izbliza pre nego što damo cenu.",
      askHeading: "Šta da nam kažete kad pozovete",
      ask: [
        "Gde je tačno izbila stena i na kojoj dubini",
        "Šta je oko nje — kuća, zid, cevi",
        "Da li je zbog nje stao neki drugi posao",
        "Da li mašina može da dođe do nje",
      ],
    },

    katedafiseis: {
      title: "Rušenje",
      navTitle: "Rušenje",
      h1: "Rušenje na Halkidikiju",
      card: "Stare kamene kuće, šupe, ograde, betonske ploče. Rušimo i sklanjamo sa placa.",
      metaTitle: "Rušenje Halkidiki | TSOPOUROGLOU",
      metaDescription:
        "Rušenje manjih objekata u Metamorfosiju, Halkidiki, i po Sitoniji — rušenje, utovar i odvoz šuta. Od 1987. Pozovite 697 355 7903.",
      lede: "Stara kućica koja više ne stoji, šupa, ograda, betonska ploča usred placa. Srušimo, pokupimo šut i utovarimo ga u naše kamione.",
      includesHeading: "Šta obuhvata",
      includes: [
        "Rušenje manjih objekata — šupa, starih kamenih kuća, baraka",
        "Razbijanje betonskih ploča, ograda i temelja",
        "Skupljanje i utovar šuta",
        "Odvoz, i čist plac na kraju",
      ],
      machinesHeading: "Čime to radimo",
      machines:
        "Bager sa čekićem razbija beton i kamen, utovarivač skuplja, kamioni odvoze. Koji bager dolazi zavisi od toga koliko ima mesta oko objekta — u uskom dvorištu ulazi mali.",
      note: "Primamo manje objekte. Za veliko rušenje treba projekat i dozvola — pozovite nas da vidimo šta važi u vašem slučaju.",
      askHeading: "Šta da nam kažete kad pozovete",
      ask: [
        "Šta je objekat i otprilike koliki",
        "Od čega je zidan — kamen, beton, cigla",
        "Da li kamion može da dođe do njega",
        "Da li imate dozvolu za rušenje ili je još tražite",
      ],
    },

    "katharismos-paralias": {
      title: "Čišćenje plaže",
      navTitle: "Čišćenje plaže",
      h1: "Čišćenje plaže na Halkidikiju",
      card: "Alge, drvo, kamenje. Čista obala pre sezone i tokom nje.",
      metaTitle: "Čišćenje plaže Halkidiki | TSOPOUROGLOU",
      metaDescription:
        "Čišćenje plaže na Halkidikiju — alge, naplavljeno drvo i kamenje, za hotele, beach barove i apartmane. Od 1987. Pozovite 697 355 7903.",
      lede: "Alge posle nevremena, naplavljeno drvo, kamenje koje je izbilo. Za hotel ili beach bar to je prvo što gost vidi.",
      includesHeading: "Šta obuhvata",
      includes: [
        "Uklanjanje algi, drveta i smeća sa peska",
        "Ravnanje i grabuljanje površine",
        "Odvoz onoga što se skupi",
        "Ponovni dolasci tokom sezone, ako vam tako treba",
      ],
      machinesHeading: "Čime to radimo",
      machines:
        "Na pesku traktor i utovarivač rade bolje od teškog bagera, koji propada i ostavlja tragove. Uzimamo najlakšu mašinu koja može da odradi posao.",
      askHeading: "Šta da nam kažete kad pozovete",
      ask: [
        "Otprilike koliko metara obale",
        "Da li je jednokratno ili kroz celu sezonu",
        "Kako mašina silazi na pesak",
        "Do kada treba da bude gotovo",
      ],
    },

    "metafores-chomaton": {
      title: "Prevoz zemlje i šuta",
      navTitle: "Prevoz",
      h1: "Prevoz zemlje i šuta na Halkidikiju",
      card: "Sopstveni kamioni za zemlju, šut i šljunak. Utovar i prevoz, u oba smera.",
      metaTitle: "Prevoz zemlje i šuta Halkidiki | TSOPOUROGLOU",
      metaDescription:
        "Prevoz zemlje, šuta i šljunka u Metamorfosiju, Halkidiki, i po Sitoniji, sopstvenim kamionima. Od 1987. Pozovite 697 355 7903.",
      lede: "Zemlja koju treba odneti, ili zemlja koju treba dovesti. Kamioni su naši, pa posao ne čeka tuđi raspored.",
      includesHeading: "Šta obuhvata",
      includes: [
        "Utovar i odvoz zemlje, šuta i kamena",
        "Dovoz materijala za nasipanje",
        "Isporuka šljunka i agregata",
        "Uredan plac na kraju",
      ],
      machinesHeading: "Čime to radimo",
      machines:
        "Naši kamioni i utovarivač. Pošto su i mašina i kamion naši, utovar i prevoz su jedan posao, a ne dve firme koje čekaju jedna drugu.",
      askHeading: "Šta da nam kažete kad pozovete",
      ask: [
        "Da li materijal izlazi ili ulazi",
        "Otprilike koliko, ako znate",
        "Da li kamion može do mesta utovara",
        "Koje selo, da isplaniramo turu",
      ],
    },

    "choma-kipou": {
      title: "Baštenska zemlja",
      navTitle: "Baštenska zemlja",
      h1: "Baštenska zemlja na Halkidikiju",
      card: "Nasuta i poravnata zemlja, spremna za travu ili sadnju.",
      metaTitle: "Baštenska zemlja Halkidiki | TSOPOUROGLOU",
      metaDescription:
        "Dovoz, nasipanje i ravnanje baštenske zemlje u Metamorfosiju, Halkidiki, i po Sitoniji. Spremno za travu ili sadnju. Pozovite 697 355 7903.",
      lede: "Poslednji posao pre nego što bašta postoji. Dovezemo zemlju, razastremo je i poravnamo da možete da sadite ili da položite travu.",
      includesHeading: "Šta obuhvata",
      includes: [
        "Dovoz baštenske zemlje",
        "Razastiranje na ujednačenu debljinu",
        "Ravnanje i oblikovanje terena",
        "Rad oko onoga što je već zasađeno",
      ],
      machinesHeading: "Čime to radimo",
      machines:
        "Kamioni da je dovezu, a mali bager ili mini utovarivač da je razastru — mašine koje prolaze kroz kapiju i neće uništiti ono što je već tu.",
      askHeading: "Šta da nam kažete kad pozovete",
      ask: [
        "Otprilike koliko kvadrata",
        "Da li je za travu, za sadnju, ili oboje",
        "Koliko je širok najuži prolaz kroz koji mašina mora da prođe",
        "Da li ima nečega već zasađenog oko čega treba raditi",
      ],
    },

    "syndeseis-nerou-apocheteusi": {
      title: "Vodovodni i kanalizacioni priključci",
      navTitle: "Voda i kanalizacija",
      h1: "Vodovodni i kanalizacioni priključci na Halkidikiju",
      card: "Iskop, priključak, zatrpavanje. Voda i kanalizacija.",
      metaTitle: "Vodovod i kanalizacija Halkidiki | TSOPOUROGLOU",
      metaDescription:
        "Iskop rovova i priključenje na vodovod i kanalizaciju u Metamorfosiju, Halkidiki, i po Sitoniji. Od 1987. Pozovite 697 355 7903.",
      lede: "Rov od kuće do mreže, sam priključak, i teren vraćen u stanje u kom je bio.",
      includesHeading: "Šta obuhvata",
      includes: [
        "Iskop rova od kuće do mesta priključenja",
        "Izrada podloge i polaganje cevi",
        "Zatrpavanje i nabijanje",
        "Vraćanje površine u prvobitno stanje",
      ],
      machinesHeading: "Čime to radimo",
      machines:
        "Bager prema rovu i prilazu. Duž ulice ili uređenog prilaza uzimamo mali, jer je ono što posle treba vratiti deo posla.",
      note: "Sam priključak na mrežu odobrava vodovod. Mi radimo iskop, cev i vraćanje terena — recite nam u kojoj ste fazi pa ćemo reći šta je naše.",
      askHeading: "Šta da nam kažete kad pozovete",
      ask: [
        "Koliko ima od kuće do mesta priključenja",
        "Da li je voda, kanalizacija, ili oboje",
        "Šta rov mora da pređe — zemlju, beton, ploče",
        "Da li vam je vodovod već odredio mesto priključenja",
      ],
    },
  },

  servicesPage: {
    eyebrow: "USLUGE",
    h1: "Šta radimo",
    metaTitle: "Usluge — Zemljani radovi Halkidiki | TSOPOUROGLOU",
    metaDescription:
      "Iskopi, čišćenje placeva, septičke jame, razbijanje stena, rušenje, čišćenje plaže, prevoz, baštenska zemlja, vodovod i kanalizacija. Halkidiki, od 1987.",
    lede: "Devet poslova, sopstvenim mašinama. Ispod, radovi koje smo već završili na Halkidikiju.",
    body: "Devet poslova, našim mašinama i našim kamionima. Od čišćenja placa do priključka na mrežu.",
    relatedHeading: "Povezane usluge",
    areasHeading: "Gde radimo",
    areasBody:
      "Baza nam je Metamorfosi i naselje Daskalon — tamo stižemo prvi. Radimo i u Nikitiju, Vatopediju i Psakudiji, sva na nekoliko minuta od mašina.",
    ctaHeading: "Recite nam kakav je posao",
    ctaBody: "Jedan telefonski poziv je dovoljan da razumemo šta treba i koliko košta.",
    backToAll: "Sve usluge",
    workHeading: "Naši radovi",
    workLede: "Fotografije sa naših gradilišta na Halkidikiju. Nijedna nije sa interneta.",
  },

  ergaSection: {
    eyebrow: "NAŠI RADOVI",
    heading: "Šta smo završili",
    lede: "Završeni radovi na placevima, dvorištima i obalama Halkidikija. Svaka fotografija je naša.",
    galleryHeading: "Radovi koje smo završili",
    galleryLede: "Završeni radovi na placevima, dvorištima i obalama Halkidikija. Svaka fotografija je naša — nijedna nije sa interneta.",
  },

  callBand: { label: "TELEFON", endLabel: "KRAJ" },

  areas: {
    metamorfosi: {
      name: "Metamorfosi",
      inName: "u Metamorfosiju",
      h1: "Zemljani radovi u Metamorfosiju",
      metaTitle: "Zemljani radovi Metamorfosi i Daskalon | TSOPOUROGLOU",
      metaDescription:
        "Zemljani radovi u Metamorfosiju, Halkidiki, i naselju Daskalon, od 1987. Iskopi, čišćenje placeva, septičke jame, razbijanje stena. Pozovite 697 355 7903.",
      lede: "Ovde nam je baza. Mašine su u selu — ne silazimo mi odnekud drugde.",
      card: "Naša baza. Ovde radimo od 1987. i mašine su u selu.",
      blocks: [
        {
          heading: "Mi smo odavde",
          body: "Od 1987. radimo na istim placevima. Često smo već kopali na susednom, pa znamo odakle mašina može da uđe i kuda kamion ne prolazi. A ako hoćete da se raspitate o nama, ne treba vam internet — pitajte u selu.",
        },
        {
          heading: "Ovde dolazimo prvo",
          body: "Metamorfosi i naselje Daskalon su naša baza. Kad se poslovi nagomilaju, ova dva imaju prednost.",
        },
        {
          heading: "I u naselju Daskalon",
          body: "Odmah pored, i naše od 1987. Isti prioritet, isti poslovi, isti telefon.",
        },
        {
          heading: "U Sitoniji",
          body: "Metamorfosi i naselje Daskalon su u opštini Sitonija, i odavde svakog jutra kreću mašine. Ako tražite zemljane radove u Sitoniji a niste sigurni kom selu pripada vaš plac, recite nam gde je — mi znamo put.",
        },
      ],
    },

    nikiti: {
      name: "Nikiti",
      inName: "u Nikitiju",
      h1: "Zemljani radovi u Nikitiju",
      metaTitle: "Zemljani radovi Nikiti | TSOPOUROGLOU",
      metaDescription:
        "Zemljani radovi u Nikitiju, Halkidiki. Iskopi, čišćenje placeva, septičke jame, razbijanje stena. Baza u Metamorfosiju od 1987. Pozovite 697 355 7903.",
      lede: "Dolazimo u Nikiti. Baza nam je Metamorfosi, ali posao se radi tamo gde treba.",
      card: "U Nikiti dolazimo sa mašinom koju posao traži.",
      blocks: [
        {
          heading: "Šta donosimo",
          body: "Tri bagera — veliki, srednji i mali — utovarivač, kamione i ostalo. Koji dolazi procenjujemo na osnovu onoga što nam opišete. Licencirani rukovalac od 1990.",
        },
        {
          heading: "Koliko brzo",
          body: "Nismo u Nikitiju, u Metamorfosiju smo. Pozovite, recite šta je i gde, pa ćemo vam reći kada možemo da dođemo. Ne dajemo termin koji ne možemo da održimo.",
        },
        {
          heading: "Ista opština kao i mi",
          body: "Nikiti je u opštini Sitonija, kao i Metamorfosi. Nije naše selo, ali je odmah pored — isti telefon, iste mašine, isti rukovalac.",
        },
      ],
    },

    vatopedi: {
      name: "Vatopedi",
      inName: "u Vatopediju",
      h1: "Zemljani radovi u Vatopediju",
      metaTitle: "Zemljani radovi Vatopedi | TSOPOUROGLOU",
      metaDescription:
        "Zemljani radovi u Vatopediju, Halkidiki. Iskopi, čišćenje placeva, čišćenje plaže. Baza u Metamorfosiju od 1987. Pozovite 697 355 7903.",
      lede: "Dolazimo u Vatopedi. Pošto je na moru, ovde je na spisku i čišćenje obale, pored placeva i dvorišta.",
      card: "Placevi, dvorišta i čišćenje obale u Vatopediju.",
      blocks: [
        {
          heading: "Šta donosimo",
          body: "Tri bagera — veliki, srednji i mali — utovarivač, kamione i traktor. Na pesku traktor i utovarivač rade bolje od teškog bagera. Licencirani rukovalac od 1990.",
        },
        {
          heading: "Koliko brzo",
          body: "Baza nam je Metamorfosi. Pozovite, recite šta je i gde, pa ćemo vam reći kada možemo da dođemo.",
        },
        {
          heading: "Vatopedi i Psakudija zajedno",
          body: "Vatopedi i Psakudija su jedno pored drugog na istoj obali, i često ih radimo istog dana. Ako imate posao na oba mesta, recite nam kad pozovete — jedan izlazak ispadne jeftinije.",
        },
      ],
    },

    psakoudia: {
      name: "Psakudija",
      inName: "u Psakudiji",
      h1: "Zemljani radovi u Psakudiji",
      metaTitle: "Zemljani radovi Psakudija | TSOPOUROGLOU",
      metaDescription:
        "Zemljani radovi u Psakudiji, Halkidiki. Iskopi, čišćenje placeva, čišćenje plaže, baštenska zemlja. Od 1987. Pozovite 697 355 7903.",
      lede: "Dolazimo u Psakudiju. I ovde je, pošto smo na moru, na spisku i čišćenje obale.",
      card: "Placevi, dvorišta i čišćenje obale u Psakudiji.",
      blocks: [
        {
          heading: "Šta donosimo",
          body: "Mašinu biramo prema poslu, a ne obrnuto. U usko dvorište ide mali bager ili mini utovarivač; na otvoren plac veliki. Licencirani rukovalac od 1990.",
        },
        {
          heading: "Koliko brzo",
          body: "Baza nam je Metamorfosi. Pozovite, recite šta je i gde, pa ćemo vam reći kada možemo da dođemo.",
        },
        {
          heading: "Psakudija i Vatopedi zajedno",
          body: "Psakudija i Vatopedi su na istoj obali, nekoliko minuta jedno od drugog. Kad ima posla na oba mesta, dogovaramo ih zajedno — pa plaćate jedan izlazak mašine umesto dva.",
        },
      ],
    },
  },

  areasPage: {
    eyebrow: "PODRUČJA",
    h1: "Gde radimo",
    metaTitle: "Područja — Zemljani radovi u Sitoniji, Halkidiki | TSOPOUROGLOU",
    metaDescription:
      "Zemljani radovi u Metamorfosiju, naselju Daskalon, Nikitiju, Vatopediju i Psakudiji. Sitonija, Halkidiki, od 1987. Pozovite 697 355 7903.",
    lede: "Baza nam je Metamorfosi i naselje Daskalon. Radimo i u Nikitiju, Vatopediju i Psakudiji. Pet sela, sva blizu — i tu smo dobri.",
    listHeading: "Gde dolazimo",
    servicesHeading: "Šta ovde radimo",
    servicesBody: "Svih devet naših poslova, bez izuzetka.",
    priorityLabel: "NAŠ TEREN",
    otherAreasHeading: "Druga područja",
    backToAll: "Sva područja",
  },

  daskalon: {
    name: "Naselje Daskalon",
    card: "Odmah pored, i naše od 1987. Isti prioritet kao Metamorfosi.",
  },


  coverageSection: {
    eyebrow: "SAMO OVDE",
    heading: "Radimo samo ovde u okolini",
    body: "Pet sela, sva na nekoliko minuta od mesta gde su parkirane mašine. Metamorfosi, naselje Daskalon i Nikiti su u Sitoniji; Vatopedi i Psakudija su malo više, na istoj obali. Ne silazimo iz Soluna niti sa druge strane Halkidikija, i zato možemo da kažemo dan i da ga održimo.",
    closing: "Ako je vaš plac u nekom od tih sela, dolazimo. Ako je dalje, pozovite nas pa ćemo vam iskreno reći da li smo mi pravi — ne primamo posao koji ne možemo da odradimo kako treba.",
  },

  faqPage: {
    eyebrow: "ČESTA PITANJA",
    h1: "Česta pitanja",
    metaTitle: "Česta pitanja — Zemljani radovi Halkidiki | TSOPOUROGLOU",
    metaDescription:
      "Koliko košta, kakva dozvola treba, odakle počinje posao kad gradite, koliko brzo dolazimo. Zemljani radovi na Halkidikiju od 1987. Pozovite 697 355 7903.",
    lede: "Ovo nas pitaju na telefon. Ako ne nađete svoje, pozovite — javljamo se 24 sata.",
    questionsHeading: "Ovo nas pitaju",
  },

  buildJourney: {
    eyebrow: "GRADITE?",
    heading: "Gradite? Evo šta ide pre betona",
    lede: "Ako vam je prvi put, redosled je obično ovakav. Ne morate da znate stručne izraze — recite nam šta hoćete da sagradite pa ćemo vam mi reći u kojoj ste fazi.",
    steps: [
      {
        n: "1",
        title: "Plac se čisti",
        body: "Suvo rastinje, šiblje, stari šut, šta god se nakupilo. Dok se ne očisti, ne vidi se ni šta imate.",
        id: "katharismos-oikopedon",
      },
      {
        n: "2",
        title: "Odlazi ono što smeta",
        body: "Ako ima star objekat, ograda ili betonska ploča usred placa, ruši se i utovaruje. Ako izbije stena, razbija se.",
        id: "katedafiseis",
      },
      {
        n: "3",
        title: "Ravnanje, pa temelji",
        body: "Teren dobija oblik koji projekat traži i otvaraju se temelji. Tu je važno koji bager dolazi.",
        id: "ekskafes",
      },
      {
        n: "4",
        title: "Ulaze voda i kanalizacija",
        body: "Rovovi za priključak na mrežu, i septička jama ako kuća nije na kanalizaciji.",
        id: "syndeseis-nerou-apocheteusi",
      },
      {
        n: "5",
        title: "Na kraju, prostor oko kuće",
        body: "Kad se gradnja završi, nasipa se baštenska zemlja i uređuje dvorište. Mnogi nas zbog toga zovu i godinama kasnije.",
        id: "choma-kipou",
      },
    ],
    closing: "Ne morate sve da dogovorite unapred. Većina nas pozove na prvom koraku, a ostalo rešavamo usput.",
  },

  faqs: [
    {
      q: "Koliko koštaju zemljani radovi?",
      a: "Zavisi šta je, koliko je veliko, kakav je teren i da li mašina može da dođe. Ne dajemo cenu naslepo. Recite nam na telefon šta hoćete da se uradi i gde, pa ćemo vam ili odmah reći ili doći da pogledamo. Klijenti pišu da smo povoljni — ali cenu kažemo kad znamo posao.",
    },
    {
      q: "Da li treba dozvola?",
      a: "Zavisi od posla. Čišćenje placa obično ne traži ništa; temelji, septička jama i rušenje traže papire. Dozvolu vadi vaš inženjer, ne mi — ali recite nam šta planirate pa ćemo vam reći šta smo videli da traže na sličnim poslovima, da znate šta da ga pitate.",
    },
    {
      q: "Koliko brzo možete da dođete?",
      a: "U Metamorfosi i naselje Daskalon dolazimo prvo — tu nam je baza i tu su parkirane mašine. U ostala mesta zavisi šta je te nedelje u toku. Pozovite pa ćemo vam reći pravi dan. Ne dajemo termin koji ne možemo da održimo.",
    },
    {
      q: "Radite li vikendom i praznicima?",
      a: "Telefon se javlja 24 sata, svaki dan. Pukla cev ili septička jama koja se prelila ne čekaju ponedeljak. Kada mašina stvarno dolazi dogovaramo se na telefon.",
    },
    {
      q: "Imam usko dvorište. Staje li mašina?",
      a: "Obično da. Imamo tri bagera — veliki, srednji i mali — i mini utovarivač. Mali i mini ulaze u dvorišta i prolaze gde ništa drugo ne staje. Izmerite najuže mesto kroz koje mašina mora da prođe pa ćemo vam odmah reći.",
    },
    {
      q: "Pravite li septičke jame? Da li ih i praznite?",
      a: "Pravimo septičke jame, od iskopa do poklopca. Ne praznimo ih — to radi cisterna i to je drugi zanat. Ako tražite pražnjenje ili odgušenje, nismo mi pravi.",
    },
    {
      q: "Odvozite li šut i zemlju sa placa?",
      a: "Da, imamo sopstvene kamione. Utovarimo i odvozimo zemlju, šut i kamen, a plac ostaje čist. Dovozimo i baštensku zemlju ili materijal za nasipanje, ako vam treba obrnuto.",
    },
    {
      q: "U koja područja dolazite?",
      a: "U pet: Metamorfosi, naselje Daskalon, Nikiti, Vatopedi i Psakudija. Prva dva su naš teren i tamo stižemo prvi. Dalje ne radimo — radije smo blizu i pouzdani u nekoliko sela nego razvučeni i u kašnjenju svuda. Ako ste dalje, pozovite pa ćemo vam iskreno reći da li smo mi pravi."
    },
    {
      q: "Ne znam kako se to zove. Šta da kažem na telefon?",
      a: "Recite svojim rečima. „Hoću da gradim a sve je zaraslo“, „izbila mi je stena“, „hoću da sredim dvorište“, „rušim nešto staro“. Dovoljno je. Od 1987. smo sve to čuli i razumećemo šta treba.",
    },
    {
      q: "Da li govorite srpski?",
      a: "Ne govorimo, ali to nikada nije bio problem. Ovde radimo sa srpskim vlasnicima godinama — posao se dogovori na engleskom, preko komšije ili preko agenta. Napišite nam email pa ćemo se snaći.",
    },
    {
      q: "Šta da pripremim pre nego što pozovem?",
      a: "Četiri stvari pomažu: u kom je selu, otprilike koliko kvadrata, šta hoćete da se uradi, i da li kamion može da dođe. Ako ne znate sve, svejedno pozovite.",
    },
  ],

  about: {
    eyebrow: "O NAMA",
    h1: "Dva brata, jedno selo, od 1987.",
    metaTitle: "O nama — Zemljani radovi Halkidiki | TSOPOUROGLOU",
    metaDescription:
      "Grigoris i Nikolaos Tsopouroglou rade zemljane radove u Metamorfosiju, Halkidiki, od 1987. Licencirani rukovalac od 1990. Pozovite 697 355 7903.",
    lede: "Dva brata sa mašinama, u istom selu, od 1987.",
    blocks: [
      {
        heading: "Kako je počelo",
        body: "Godine 1987. počeli smo da radimo u Metamorfosiju i naselju Daskalon. Od tada nismo promenili ni selo ni posao. Ista zemlja, ista porodica.",
      },
      {
        heading: "Licenca rukovaoca",
        body: "Od 1990. sertifikovani rukovalac građevinskim mašinama. Malo ko u ovom poslu to napiše, ali znači: jedno je izučiti zanat, a drugo kupiti mašinu.",
      },
      {
        heading: "Zašto nas ponovo zovu",
        body: "Najveći deo posla dolazi od ljudi koji su nas već zvali ili su čuli za nas na susednom placu. Često nas pitaju i šta bismo mi uradili na njihovom mestu — gde da ide trava, odakle da ulazi auto. Kažemo svoje mišljenje, jer smo videli kako ispadne i jedno i drugo.",
      },
      {
        heading: "Telefon",
        body: "Javljamo se 24 sata. Ne pišemo to da bismo ostavili utisak — pukla cev ili posao koji je stao ne čekaju ponedeljak.",
      },
    ],
  },

  contact: {
    eyebrow: "KONTAKT",
    h1: "Pozovite nas",
    metaTitle: "Kontakt — Zemljani radovi Halkidiki | TSOPOUROGLOU",
    metaDescription:
      "Mobilni 697 355 7903, fiksni 2375 061341, email. Zemljani radovi u Metamorfosiju, Halkidiki. Otvoreno 24 sata.",
    lede: "Telefon je otvoren 24 sata. Ako više volite da pišete, pošaljite email pa ćemo vam se javiti.",
    formHeading: "Pitajte za cenu",
    formLede: "Pozovite nas ili pošaljite email. Odgovaramo što pre.",
    askNote:
      "Recite nam kakav je posao, u kom je području, i kada ga želite. Sa tim možemo da damo cenu.",
  },

  fleet: {
    eyebrow: "MAŠINE",
    h1: "Naše mašine",
    metaTitle: "Mašine i oprema | TSOPOUROGLOU",
    metaDescription:
      "Naše mašine: tri bagera, utovarivač, kamioni, JCB, mini utovarivač i traktor.",
    lede: "Tri bagera — veliki, srednji i mali — utovarivač, kamioni, JCB, mini utovarivač i traktor.",
    items: [
      "Veliki bager",
      "Srednji bager",
      "Mali bager",
      "Utovarivač",
      "Kamioni",
      "JCB",
      "Mini utovarivač",
      "Traktor",
    ],
  },

  privacy: {
    eyebrow: "PRAVNE INFORMACIJE",
    h1: "Politika privatnosti",
    metaTitle: "Politika privatnosti | TSOPOUROGLOU",
    metaDescription:
      "Šta čuvamo kada nas kontaktirate, zašto, i koliko dugo.",
    lede: "Kratka, jer prikupljamo vrlo malo.",
    updated: "PRIVATNOST",
    blocks: [
      { heading: "Ko smo mi", body: [] },
      {
        heading: "Šta prikupljamo",
        body: [
          "Sajt nema formular i sam po sebi ne prikuplja ništa. Čuvamo samo ono što nam vi pošaljete kada nas pozovete ili nam pišete — vaše ime, vaš broj telefona i posao koji želite. Ništa drugo.",
        ],
      },
      {
        heading: "Zašto",
        body: [
          "Da bismo vam odgovorili i dali cenu. Ne šaljemo reklamne poruke i ne dajemo vaše podatke nijednoj trećoj strani u komercijalne svrhe.",
        ],
      },
      {
        heading: "Gde idu",
        body: [
          "Na naš telefon i u naše sanduče. Sajt je hostovan na Vercel-u, koji ga prikazuje u naše ime.",
        ],
      },
      {
        heading: "Koliko dugo se čuvaju",
        body: [
          "Email ostaje u našem sandučetu onoliko koliko treba za posao i eventualnu kasniju komunikaciju. Ako želite da se obriše, pozovite ili pišite i briše se.",
        ],
      },
      {
        heading: "Kolačići i merenja",
        body: [
          "Sajt ne koristi kolačiće za praćenje ni reklamne kolačiće. Zato nećete videti iskačući prozor za saglasnost.",
          "Merimo samo koliko puta se svaka stranica otvori, uslugom Vercel Analytics. Merenje se radi bez kolačića i bez podataka koji vas identifikuju — ne saznajemo ko je posetio stranicu, samo koliko ih je bilo.",
        ],
      },
      {
        heading: "Vaša prava",
        body: [
          "Možete tražiti pristup, ispravku ili brisanje svojih podataka, ili povući saglasnost, jednim pozivom ili emailom. Imate i pravo da se žalite grčkoj Agenciji za zaštitu podataka o ličnosti.",
        ],
      },
    ],
  },

  notFound: {
    metaTitle: "Stranica nije pronađena | TSOPOUROGLOU",
    h1: "Stranica nije pronađena",
    lede: "Možda smo promenili adresu ili je došlo do greške u kucanju. Pozovite nas pa ćemo vam odmah reći šta vam treba.",
    servicesHeading: "Možda ste tražili nešto od ovoga?",
    areasHeading: "Ili svoje područje",
  },
};
