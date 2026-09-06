import type { Dictionary } from "./types";

/**
 * English.
 *
 * WHO THIS IS FOR. Not tourists — property owners. British, Dutch, German and
 * Scandinavian people own plots and holiday houses across Chalkidiki, deal
 * with Greek trades at arm's length, and often through an agent or a
 * neighbour. They need to know he is real, that he has been here since 1987,
 * exactly what he does, and the number.
 *
 * REGISTER. The Greek is plain-spoken and slightly blunt — a man describing
 * his own work, not a company describing its offering. English marketing
 * copy drifts to "we pride ourselves on delivering quality solutions"
 * instantly, and that would be a different person. Keep the short sentences
 * and the concrete nouns.
 *
 * SPELLING is British: metre, licence (noun), levelled, haulage. The audience
 * skews UK and northern-European-English, not American.
 *
 * "Halkidiki" not "Chalkidice". It is the spelling on every road sign, map
 * and flight booking these readers have seen, and it is what they will type.
 *
 * TRADE TERMS ARE THE RISK, not grammar. A septic tank is a septic tank, not
 * a "sewage pit"; a τσάπα is an excavator, not a "digger machine"; a
 * διαβολάκι is a skid-steer loader, which most English speakers will
 * recognise as a Bobcat. Getting these wrong makes him look amateur to
 * exactly the customer this page exists to win.
 */

export const en: Dictionary = {
  seo: {
    title: "Earthworks in Halkidiki since 1987 | TSOPOUROGLOU",
    description:
      "Family earthworks business in Metamorfosi, Halkidiki, on the same ground since 1987. Excavation, land clearing, septic tanks, rock breaking, demolition, beach cleaning. Call 697 355 7903.",
  },

  tagline: {
    full: "EARTHWORKS · METAMORFOSI, HALKIDIKI",
    short: "EARTHWORKS · HALKIDIKI",
  },

  hero: {
    eyebrow: "EARTHWORKS · HALKIDIKI",
    headingLead: "We have dug this ground since",
    lede: [
      "Excavation, land clearing, septic tanks, rock breaking.",
      "We are based in Metamorfosi and the Daskalon settlement.",
    ],
    callLabel: "CALL",
    quoteLabel: "Ask for a price",
    hours: "We answer the phone around the clock, every day.",
    credentials: [
      { key: "Licensed operator", value: "since 1990" },
      { key: "Phone", value: "around the clock" },
      { key: "Three excavators", value: "large, medium, small" },
    ],
  },

  chrome: {
    navAria: "Main navigation",
    menu: "MENU",
    navigation: "NAVIGATION",
    close: "CLOSE",
    phoneLabel: "PHONE",
    phoneAria: "Phone",
    skipToContent: "Skip to content",
    footerServices: "Services",
    footerAreas: "Areas",
    footerContact: "Contact",
    footerPages: "Pages",
    footerRights: "Earthworks in Metamorfosi, Halkidiki, since 1987.",
    privacyLabel: "Privacy policy",
    privacyNote: "",
  },

  navLabels: {
    home: "Home",
    services: "Services",
    areas: "Areas",
    fleet: "Machines",
    about: "About us",
    contact: "Contact",
    faq: "Questions",
  },

  servicesSection: {
    eyebrow: "WHAT WE DO",
    heading: "What we do",
    lede: "Nine jobs. These we do, and these we know.",
    cta: "All services",
  },

  areasSection: {
    eyebrow: "WHERE WE WORK",
    heading: "Where we work",
    lede: "Metamorfosi and the Daskalon settlement are home ground — we get there first. We also work in Nikiti, Vatopedi and Psakoudia, and further out in Ormylia, Polygyros, Metaggitsi, Gerakini and Agios Nikolaos.",
    priorityLabel: "HOME GROUND",
  },

  whySection: {
    eyebrow: "WHY US",
    heading: "Why us",
    items: [
      {
        figure: "1987",
        title: "The same ground since 1987",
        body: "Same family, same village, two brothers.",
      },
      {
        figure: "1990",
        title: "Licensed operator since 1990",
        body: "Certified plant operator.",
      },
      {
        figure: "24",
        title: "Phone answered around the clock",
        body: "A burst pipe does not wait for office hours.",
      },
      {
        figure: "3",
        title: "Three excavators — large, medium, small",
        body: "For an open site and for a narrow yard.",
      },
    ],
  },

  reviewsSection: {
    eyebrow: "REVIEWS",
    heading: "What customers say",
    lede: "Reviews from our Google listing, exactly as the customers wrote them. Most are in Greek — the rating and how many there are tell you the rest.",
    cta: "See the reviews on Google",
    onGoogle: "on Google",
    reviewsNoun: "reviews",
  },

  contactSection: {
    eyebrow: "CONTACT",
    heading: "Call us",
    lede: "Tell us what the job is and where. We will tell you what it needs and what it costs.",
    mobileLabel: "Mobile",
    landlineLabel: "Landline",
    emailLabel: "Email",
    baseLabel: "Based in",
    baseValue: "Metamorfosi, Halkidiki",
    hoursLabel: "Hours",
    hoursValue: "Open around the clock, every day",
    quoteCta: "Ask for a price",
    quoteNote: "Tell us the job and the village. We answer as soon as we can.",
    faqLink: "common questions",
  },

  services: {
    ekskafes: {
      title: "Excavation",
      navTitle: "Excavation",
      h1: "Excavation in Halkidiki",
      card: "Foundations, basements, trenches. Three excavators — the large one for a building site, the small one for tight access.",
      metaTitle: "Excavation Halkidiki | TSOPOUROGLOU",
      metaDescription:
        "Excavation for foundations, basements and trenches in Metamorfosi, Halkidiki, since 1987. Three excavators for any size of job. Call 697 355 7903.",
      lede: "Foundations for a new house, a basement, a trench for a pipe. We have dug this ground since 1987 and we know what is under it.",
      includesHeading: "What it covers",
      includes: [
        "Excavation for foundations and basements",
        "Trenches for water, drainage and cable",
        "Levelling and shaping the ground",
        "Loading and hauling the spoil away in our own trucks",
      ],
      machinesHeading: "What we do it with",
      machines:
        "We have three excavators: large, medium and small. The large one takes out foundations and big volumes of soil. The small one gets into yards and gaps where nothing else fits. One job can need all three — we judge that when we see the plot.",
      askHeading: "What to tell us when you call",
      ask: [
        "How many square metres the plot is",
        "What is going to be built, if you already know",
        "Whether a truck can reach the spot",
        "Whether rock has come up on a neighbouring plot",
      ],
    },

    "katharismos-oikopedon": {
      title: "Land clearing",
      navTitle: "Land clearing",
      h1: "Land clearing in Halkidiki",
      card: "Dry brush, scrub, rubble. A clean plot, ready to build on or to sell.",
      metaTitle: "Land clearing Halkidiki | TSOPOUROGLOU",
      metaDescription:
        "Clearing plots of dry brush, scrub and rubble in Metamorfosi, Halkidiki, and across Sithonia. Since 1987. Call 697 355 7903.",
      lede: "A plot nobody has touched for years. We clear it, load what comes off it, and leave you able to see what you actually own.",
      includesHeading: "What it covers",
      includes: [
        "Cutting and removing dry brush and scrub",
        "Taking out old rubble and rubbish",
        "Levelling the surface so the plot is walkable",
        "Hauling everything away in our own trucks",
      ],
      machinesHeading: "What we do it with",
      machines:
        "Usually the loader and a truck, and an excavator where there are roots or buried rubble. On a small or fenced-in plot the skid-steer goes in instead — it turns on the spot and does not need a run-up.",
      note: "If the plot is being cleared for a sale or a permit, tell us on the phone. What counts as clear is not the same in both cases.",
      askHeading: "What to tell us when you call",
      ask: [
        "Which village the plot is in and roughly how big",
        "How long since it was last cleared",
        "Whether there are trees, or only brush",
        "Whether a truck can get to it",
      ],
    },

    vothroi: {
      title: "Septic tanks",
      navTitle: "Septic tanks",
      h1: "Septic tank construction in Halkidiki",
      card: "Built from the excavation through to the cover. We build them; we do not empty them.",
      metaTitle: "Septic tanks Halkidiki | TSOPOUROGLOU",
      metaDescription:
        "Septic tank construction in Metamorfosi, Halkidiki, and across Sithonia — from the excavation to the cover. Since 1987. Call 697 355 7903.",
      lede: "For a house with no connection to a sewer, this is the part that has to be right. We dig it, build it and close it.",
      includesHeading: "What it covers",
      includes: [
        "Excavation to the depth the job needs",
        "Building the tank and the pipework into it",
        "The cover and the access point",
        "Backfilling and tidying the ground afterwards",
      ],
      machinesHeading: "What we do it with",
      machines:
        "An excavator sized to the access, and our own trucks for the spoil. Which one comes depends on how close the tank sits to the house and what has to be got past to reach it.",
      note: "We build septic tanks. We do not empty them — that is a tanker job and a different trade. If you need one emptied or unblocked, we are not the people.",
      askHeading: "What to tell us when you call",
      ask: [
        "How many people the house is for",
        "Whether there is any connection to a sewer nearby",
        "How far the spot is from the house",
        "Whether a machine can reach it",
      ],
    },

    ekvrachismoi: {
      title: "Rock breaking",
      navTitle: "Rock breaking",
      h1: "Rock breaking in Halkidiki",
      card: "Rock in the middle of your plot? We break it out and take it away.",
      metaTitle: "Rock breaking Halkidiki | TSOPOUROGLOU",
      metaDescription:
        "Breaking out rock on plots in Metamorfosi, Halkidiki, and across Sithonia — with a breaker, and the spoil hauled away. Since 1987. Call 697 355 7903.",
      lede: "Rock stops a job dead. It comes up in the foundations, in a trench, or right where the drive was going to be.",
      includesHeading: "What it covers",
      includes: [
        "Breaking rock with a hydraulic breaker",
        "Working it out of foundations and trenches",
        "Loading and hauling the broken rock away",
        "Levelling what is left behind",
      ],
      machinesHeading: "What we do it with",
      machines:
        "How we do it changes with how hard the rock is and what is around it — a house, a boundary wall, pipes. It wants looking at up close before we give you a price.",
      askHeading: "What to tell us when you call",
      ask: [
        "Where exactly the rock came up, and how deep",
        "What is around it — house, wall, pipes",
        "Whether it has stopped other work",
        "Whether a machine can get to it",
      ],
    },

    katedafiseis: {
      title: "Demolition",
      navTitle: "Demolition",
      h1: "Demolition in Halkidiki",
      card: "Old stone buildings, sheds, boundary walls, concrete slabs. We take them down and get them off the plot.",
      metaTitle: "Demolition Halkidiki | TSOPOUROGLOU",
      metaDescription:
        "Demolition of small structures in Metamorfosi, Halkidiki, and across Sithonia — taken down, loaded and hauled away. Since 1987. Call 697 355 7903.",
      lede: "An old cottage that is past saving, a shed, a boundary wall, a concrete slab in the middle of the plot. We take it down, gather the rubble and load it into our trucks.",
      includesHeading: "What it covers",
      includes: [
        "Taking down small structures — sheds, old stone buildings, outbuildings",
        "Breaking up concrete slabs, walls and bases",
        "Gathering and loading the rubble",
        "Hauling it away, and a clean plot at the end",
      ],
      machinesHeading: "What we do it with",
      machines:
        "The excavator with the breaker takes the concrete and stone apart, the loader gathers it, the trucks take it down. Which excavator comes depends on how much room there is around the building — in a tight yard it is the small one.",
      note: "We take on small structures. A large demolition needs a study and a permit — call us and we will go through what applies in your case.",
      askHeading: "What to tell us when you call",
      ask: [
        "What the structure is and roughly how big",
        "What it is built of — stone, concrete, brick",
        "Whether a truck can reach it",
        "Whether you already have a demolition permit, or are still looking into it",
      ],
    },

    "katharismos-paralias": {
      title: "Beach cleaning",
      navTitle: "Beach cleaning",
      h1: "Beach cleaning in Halkidiki",
      card: "Seaweed, driftwood, stones. A clean shoreline before the season and during it.",
      metaTitle: "Beach cleaning Halkidiki | TSOPOUROGLOU",
      metaDescription:
        "Beach cleaning in Halkidiki — seaweed, driftwood and stones cleared for hotels, beach bars and rental properties. Since 1987. Call 697 355 7903.",
      lede: "Seaweed after a blow, driftwood, stones that have worked their way up. For a hotel or a beach bar this is the first thing a guest sees.",
      includesHeading: "What it covers",
      includes: [
        "Clearing seaweed, driftwood and rubbish off the sand",
        "Levelling and raking the surface",
        "Hauling what comes off away",
        "Repeat visits through the season, if that is what you need",
      ],
      machinesHeading: "What we do it with",
      machines:
        "On sand the tractor and the loader work better than a heavy excavator, which sinks and leaves ruts. We take the lightest machine that will do it.",
      askHeading: "What to tell us when you call",
      ask: [
        "Roughly how many metres of shoreline",
        "Whether it is a one-off or through the season",
        "How a machine gets down onto the sand",
        "When you need it done by",
      ],
    },

    "metafores-chomaton": {
      title: "Soil and spoil haulage",
      navTitle: "Haulage",
      h1: "Soil and spoil haulage in Halkidiki",
      card: "Our own trucks for soil, rubble and gravel. Loading and transport, in either direction.",
      metaTitle: "Soil and spoil haulage Halkidiki | TSOPOUROGLOU",
      metaDescription:
        "Hauling soil, rubble and gravel in Metamorfosi, Halkidiki, and across Sithonia, with our own trucks. Since 1987. Call 697 355 7903.",
      lede: "Soil to take away, or soil to bring in. We have our own trucks, so it does not wait on somebody else's schedule.",
      includesHeading: "What it covers",
      includes: [
        "Loading and hauling away soil, rubble and stone",
        "Bringing in fill material for levelling up",
        "Delivering gravel and aggregate",
        "Leaving the plot tidy at the end",
      ],
      machinesHeading: "What we do it with",
      machines:
        "Our own trucks and the loader. Because both the machine and the truck are ours, the loading and the haulage are one job rather than two firms waiting on each other.",
      askHeading: "What to tell us when you call",
      ask: [
        "Whether material is coming out or going in",
        "Roughly how much, if you know",
        "Whether a truck can reach the loading point",
        "Which village, so we can plan the run",
      ],
    },

    "choma-kipou": {
      title: "Garden topsoil",
      navTitle: "Garden topsoil",
      h1: "Garden topsoil in Halkidiki",
      card: "Topsoil laid and levelled, ready for lawn or planting.",
      metaTitle: "Garden topsoil Halkidiki | TSOPOUROGLOU",
      metaDescription:
        "Garden topsoil delivered, laid and levelled in Metamorfosi, Halkidiki, and across Sithonia. Ready for lawn or planting. Call 697 355 7903.",
      lede: "The last job before a garden exists. We bring the soil, spread it and level it so you can plant or lay turf.",
      includesHeading: "What it covers",
      includes: [
        "Delivering garden topsoil",
        "Spreading it to an even depth",
        "Levelling and shaping the ground",
        "Working around what is already planted",
      ],
      machinesHeading: "What we do it with",
      machines:
        "Trucks to bring it, and the small excavator or the skid-steer to spread it — the machines that fit through a gate and will not wreck what is already there.",
      askHeading: "What to tell us when you call",
      ask: [
        "Roughly how many square metres",
        "Whether it is for lawn, for planting, or both",
        "How wide the narrowest point a machine has to pass is",
        "Whether there is anything already planted to work around",
      ],
    },

    "syndeseis-nerou-apocheteusi": {
      title: "Water and sewer connections",
      navTitle: "Water & sewer",
      h1: "Water and sewer connections in Halkidiki",
      card: "Digging, connection, backfill. Mains water and drainage.",
      metaTitle: "Water and sewer connections Halkidiki | TSOPOUROGLOU",
      metaDescription:
        "Trenching and connection to mains water and drainage in Metamorfosi, Halkidiki, and across Sithonia. Since 1987. Call 697 355 7903.",
      lede: "The trench from the house to the mains, the connection itself, and the ground put back the way it was.",
      includesHeading: "What it covers",
      includes: [
        "Trenching from the house to the connection point",
        "Bedding and laying the pipe",
        "Backfilling and compacting",
        "Making good the surface afterwards",
      ],
      machinesHeading: "What we do it with",
      machines:
        "The excavator sized to the trench and the access. Along a street or a made-up drive we take the small one, because what has to be put back afterwards is part of the job.",
      note: "The connection to the network itself is signed off by the water authority. We do the digging, the pipe and the making good — tell us what stage you are at and we will say what is ours.",
      askHeading: "What to tell us when you call",
      ask: [
        "How far it is from the house to the connection point",
        "Whether it is water, drainage, or both",
        "What the trench has to cross — earth, concrete, paving",
        "Whether the authority has already given you a connection point",
      ],
    },
  },

  servicesPage: {
    eyebrow: "SERVICES",
    h1: "What we do",
    metaTitle: "Services — Earthworks Halkidiki | TSOPOUROGLOU",
    metaDescription:
      "Excavation, land clearing, septic tanks, rock breaking, demolition, beach cleaning, haulage, garden topsoil, water and sewer connections. Halkidiki, since 1987.",
    lede: "Nine jobs, with our own machines. Below, work we have already finished in Halkidiki.",
    body: "Nine jobs, with our own machines and our own trucks. From clearing a plot to the connection with the mains.",
    relatedHeading: "Related services",
    areasHeading: "Where we work",
    areasBody:
      "Metamorfosi and the Daskalon settlement are home ground — we get there first. We also work in Nikiti, Vatopedi and Psakoudia, and further out in Ormylia, Polygyros, Metaggitsi, Gerakini and Agios Nikolaos.",
    ctaHeading: "Tell us what the job is",
    ctaBody: "One phone call is enough for us to understand what it needs and what it costs.",
    backToAll: "All services",
    workHeading: "Our work",
    workLede: "Photographs from our own sites in Halkidiki. None of them are from the internet.",
  },

  ergaSection: {
    eyebrow: "OUR WORK",
    heading: "What we have finished",
    lede: "Completed work on plots, yards and shorelines across Halkidiki. Every photograph is our own.",
    galleryHeading: "Work we have finished",
    galleryLede: "Completed work on plots, yards and shorelines across Halkidiki. Every photograph is our own — none from the internet.",
  },

  callBand: { label: "PHONE", endLabel: "END" },

  areas: {
    metamorfosi: {
      name: "Metamorfosi",
      inName: "in Metamorfosi",
      h1: "Earthworks in Metamorfosi",
      metaTitle: "Earthworks Metamorfosi & Daskalon | TSOPOUROGLOU",
      metaDescription:
        "Earthworks in Metamorfosi, Halkidiki, and the Daskalon settlement, since 1987. Excavation, land clearing, septic tanks, rock breaking. Call 697 355 7903.",
      lede: "This is home. The machines are in the village — we are not driving in from somewhere else.",
      card: "Our base. We have worked here since 1987 and the machines are in the village.",
      blocks: [
        {
          heading: "We are from here",
          body: "We have worked the same plots since 1987. Often we have already dug the one next door, so we know where a machine can get in and where a truck cannot. And if you want to ask about us, you do not need the internet — ask in the village.",
        },
        {
          heading: "We come here first",
          body: "Metamorfosi and the Daskalon settlement are home ground. When jobs stack up, these two come first.",
        },
        {
          heading: "And the Daskalon settlement",
          body: "Next door, and ours since 1987 as well. Same priority, same jobs, same phone.",
        },
        {
          heading: "We set out from here",
          body: "Metamorfosi is in the municipality of Sithonia, and this is where the machines leave from. On the road towards Polygyros we pass Vatopedi, Psakoudia, Ormylia and Gerakini; Metaggitsi is a little further in, and Nikiti and Agios Nikolaos are south. If your plot is somewhere along there, we come.",
        },
      ],
    },

    nikiti: {
      name: "Nikiti",
      inName: "in Nikiti",
      h1: "Earthworks in Nikiti",
      metaTitle: "Earthworks Nikiti | TSOPOUROGLOU",
      metaDescription:
        "Earthworks in Nikiti, Halkidiki. Excavation, land clearing, septic tanks, rock breaking. Based in Metamorfosi since 1987. Call 697 355 7903.",
      lede: "We come to Nikiti. We are based in Metamorfosi, but the work happens where it is needed.",
      card: "We come to Nikiti with whichever machine the job needs.",
      blocks: [
        {
          heading: "What we bring",
          body: "Three excavators — large, medium and small — the loader, the trucks and the rest. Which one comes we judge from what you describe on the phone. Licensed operator since 1990.",
        },
        {
          heading: "How quickly",
          body: "We are not in Nikiti, we are in Metamorfosi. Call, tell us what it is and where, and we will tell you when we can come. We do not give you a time we cannot keep.",
        },
        {
          heading: "And nearby",
          body: "Nikiti and Agios Nikolaos are in the same municipality as us, Sithonia. We come to both, same phone and same machines.",
        },
      ],
    },

    vatopedi: {
      name: "Vatopedi",
      inName: "in Vatopedi",
      h1: "Earthworks in Vatopedi",
      metaTitle: "Earthworks Vatopedi | TSOPOUROGLOU",
      metaDescription:
        "Earthworks in Vatopedi, Halkidiki. Excavation, land clearing, beach cleaning. Based in Metamorfosi since 1987. Call 697 355 7903.",
      lede: "We come to Vatopedi. Because it is on the sea, beach cleaning is on the list here as well as plots and yards.",
      card: "Plots, yards and shoreline clearing in Vatopedi.",
      blocks: [
        {
          heading: "What we bring",
          body: "Three excavators — large, medium and small — the loader, the trucks and the tractor. On sand the tractor and the loader work better than a heavy excavator. Licensed operator since 1990.",
        },
        {
          heading: "How quickly",
          body: "We are based in Metamorfosi. Call, tell us what it is and where, and we will tell you when we can come.",
        },
        {
          heading: "And nearby",
          body: "Vatopedi is in the municipality of Polygyros, as are Psakoudia, Ormylia and Gerakini. They are all on the same road and we come to all of them.",
        },
      ],
    },

    psakoudia: {
      name: "Psakoudia",
      inName: "in Psakoudia",
      h1: "Earthworks in Psakoudia",
      metaTitle: "Earthworks Psakoudia | TSOPOUROGLOU",
      metaDescription:
        "Earthworks in Psakoudia, Halkidiki. Excavation, land clearing, beach cleaning, garden topsoil. Since 1987. Call 697 355 7903.",
      lede: "We come to Psakoudia. Here too, because we are on the sea, shoreline clearing is on the list.",
      card: "Plots, yards and shoreline clearing in Psakoudia.",
      blocks: [
        {
          heading: "What we bring",
          body: "We pick the machine from the job, not the other way round. A narrow yard gets the small excavator or the skid-steer; an open plot gets the large one. Licensed operator since 1990.",
        },
        {
          heading: "How quickly",
          body: "We are based in Metamorfosi. Call, tell us what it is and where, and we will tell you when we can come.",
        },
        {
          heading: "And nearby",
          body: "From Psakoudia we carry on to Ormylia, Gerakini, Metaggitsi and as far as Polygyros. Same municipality, same road, same work.",
        },
      ],
    },
  },

  areasPage: {
    eyebrow: "AREAS",
    h1: "Where we work",
    metaTitle: "Areas — Earthworks Halkidiki & Sithonia | TSOPOUROGLOU",
    metaDescription:
      "Earthworks in Metamorfosi, Daskalon, Nikiti, Vatopedi, Psakoudia, Ormylia, Polygyros, Metaggitsi, Gerakini and Agios Nikolaos. Since 1987. Call 697 355 7903.",
    lede: "Metamorfosi and the Daskalon settlement are home ground. We also work in Nikiti, Vatopedi and Psakoudia, and further out in Ormylia, Polygyros, Metaggitsi, Gerakini and Agios Nikolaos.",
    listHeading: "Where we come",
    servicesHeading: "What we do here",
    servicesBody: "All nine of our jobs, without exception.",
    priorityLabel: "HOME GROUND",
    otherAreasHeading: "Other areas",
    backToAll: "All areas",
  },

  daskalon: {
    name: "Daskalon settlement",
    card: "Next door, and ours since 1987 as well. Same priority as Metamorfosi.",
  },

  widerAreas: [
    { name: "Polygyros", note: "On the road we drive anyway." },
    { name: "Ormylia", note: "Between us and Polygyros." },
    { name: "Metaggitsi", note: "A little further in from our road." },
    { name: "Gerakini", note: "On the coast, on the same road." },
    { name: "Agios Nikolaos", note: "South, inside Sithonia." },
  ],

  coverageSection: {
    eyebrow: "FURTHER OUT",
    heading: "And beyond our own villages",
    body: "We work across two municipalities: Sithonia, where we are based, and Polygyros. If your plot is somewhere in between and you are not sure which village it counts as, call and tell us roughly where it is — we know the road.",
    listHeading: "We also come to",
    closing: "Priority stays with Metamorfosi and the Daskalon settlement. To the rest we come, and we tell you on the phone when.",
  },

  faqPage: {
    eyebrow: "COMMON QUESTIONS",
    h1: "Common questions",
    metaTitle: "Common questions — Earthworks Halkidiki | TSOPOUROGLOU",
    metaDescription:
      "What it costs, what permit you need, where the work starts when you are building, how soon we can come. Earthworks in Halkidiki since 1987. Call 697 355 7903.",
    lede: "These are what people ask us on the phone. If yours is not here, call — we answer around the clock.",
    questionsHeading: "What people ask us",
  },

  buildJourney: {
    eyebrow: "BUILDING?",
    heading: "Building? This is what happens before the concrete",
    lede: "If it is your first time, this is usually the order. You do not need to know the terms — tell us what you want to build and we will tell you which stage you are at.",
    steps: [
      {
        n: "1",
        title: "The plot gets cleared",
        body: "Dry brush, scrub, old rubble, whatever has gathered. Until it is clear you cannot even see what you have.",
        id: "katharismos-oikopedon",
      },
      {
        n: "2",
        title: "Whatever is in the way comes out",
        body: "If there is an old structure, a wall or a concrete slab in the middle, it comes down and gets loaded. If rock appears, it is broken out.",
        id: "katedafiseis",
      },
      {
        n: "3",
        title: "Levelling, then the foundations",
        body: "The ground is shaped to what the drawings need and the foundations are dug. This is where which excavator comes matters.",
        id: "ekskafes",
      },
      {
        n: "4",
        title: "Water and drainage go in",
        body: "The trenches for the connection to the mains, and the septic tank if the house is not on a sewer.",
        id: "syndeseis-nerou-apocheteusi",
      },
      {
        n: "5",
        title: "Last, the ground around the house",
        body: "When the building is finished, garden topsoil goes down and the yard is shaped. A lot of people call us back years later for this.",
        id: "choma-kipou",
      },
    ],
    closing: "You do not need to arrange all of it up front. Most people call us at the first step and we work the rest out as we go.",
  },

  faqs: [
    {
      q: "What does earthworks cost?",
      a: "It depends on what it is, how big, what the ground is like and whether a machine can reach it. We do not quote blind. Tell us on the phone what you want done and where, and either we tell you straight away or we come and look. Our customers write that we are reasonable — but we give the price once we know the job.",
    },
    {
      q: "Do I need a permit?",
      a: "It depends on the job. Clearing a plot usually needs nothing; foundations, a septic tank and a demolition need paperwork. The permit is issued through your engineer, not us — but tell us what you are planning and we will tell you what we have seen asked for on jobs like it, so you know what to ask him.",
    },
    {
      q: "How soon can you come?",
      a: "In Metamorfosi and the Daskalon settlement we come first — that is where we are based and where the machines are parked. Everywhere else depends on what is running that week. Call and we will give you a real day. We do not give a time we cannot keep.",
    },
    {
      q: "Do you work weekends and holidays?",
      a: "The phone is answered around the clock, every day. A burst pipe or an overflowing septic tank does not wait for Monday. When the machine actually comes is something we arrange on the call.",
    },
    {
      q: "My yard is narrow. Will a machine fit?",
      a: "Usually yes. We have three excavators — large, medium and small — and a skid-steer. The small one and the skid-steer get into yards and gaps where nothing else fits. Measure the narrowest point the machine has to pass and we will tell you straight away.",
    },
    {
      q: "Do you build septic tanks? Do you empty them too?",
      a: "We build septic tanks, from the excavation to the cover. We do not empty them — that is a tanker job and a different trade. If you are looking for emptying or unblocking, we are not the people.",
    },
    {
      q: "Do you take the rubble and soil off the plot?",
      a: "Yes, we have our own trucks. We load and haul away soil, rubble and stone, and the plot is left clean. We also bring in garden topsoil or fill material if you need it the other way round.",
    },
    {
      q: "Which areas do you come to?",
      a: "We are based in Metamorfosi and the Daskalon settlement. We work in Nikiti, Vatopedi and Psakoudia, and further out in Ormylia, Polygyros, Metaggitsi, Gerakini and Agios Nikolaos — that is Sithonia and the municipality of Polygyros. If your plot is somewhere in between and you do not know which village it counts as, tell us where it is; we know the road.",
    },
    {
      q: "I do not know what the job is called. What do I say on the phone?",
      a: "Say it in your own words. “I want to build and it is all overgrown”, “rock has come up”, “I want to sort out the yard”, “I am pulling down an old shed”. That is enough. Since 1987 we have heard all of them and we will work out what it needs.",
    },
    {
      q: "Do you speak English?",
      a: "Enough for the job — the village, the size, what needs doing, and the price. If it is easier, send an email in English and we will answer. Plenty of our customers here are foreign owners and it has never been the problem people expect.",
    },
    {
      q: "What should I have ready before I call?",
      a: "Four things help: which village it is in, roughly how many square metres, what you want done, and whether a truck can reach it. If you do not know all of them, call anyway.",
    },
  ],

  about: {
    eyebrow: "ABOUT US",
    h1: "Two brothers, one village, since 1987",
    metaTitle: "About us — Earthworks Halkidiki | TSOPOUROGLOU",
    metaDescription:
      "Grigoris and Nikolaos Tsopouroglou have done earthworks in Metamorfosi, Halkidiki, since 1987. Licensed operator since 1990. Call 697 355 7903.",
    lede: "Two brothers with machines, in the same village, since 1987.",
    blocks: [
      {
        heading: "How it started",
        body: "In 1987 we started working in Metamorfosi and the Daskalon settlement. We have changed neither the village nor the trade since. The same ground, the same family.",
      },
      {
        heading: "Licensed operator",
        body: "Certified plant operator since 1990. Not many in this trade write it down, but it counts: learning the work is one thing, buying a machine is another.",
      },
      {
        heading: "Why people call us back",
        body: "Most of our work comes from people who have used us before, or who heard about us on the plot next door. Often they ask what we would do in their position — where the lawn should go, where the car should come in. We say what we think, because we have seen how both versions turn out.",
      },
      {
        heading: "The phone",
        body: "We answer around the clock. We do not write that to impress anyone — a burst pipe, or a job that has stalled, does not wait until Monday.",
      },
    ],
  },

  contact: {
    eyebrow: "CONTACT",
    h1: "Call us",
    metaTitle: "Contact — Earthworks Halkidiki | TSOPOUROGLOU",
    metaDescription:
      "Mobile 697 355 7903, landline 2375 061341, email. Earthworks in Metamorfosi, Halkidiki. Open around the clock.",
    lede: "The phone is open around the clock. If you would rather write, send an email and we will come back to you.",
    formHeading: "Ask for a price",
    formLede: "Call us or send an email. We answer as soon as we can.",
    askNote:
      "Tell us what the job is, which area it is in, and when you want it. With that we can give you a price.",
  },

  fleet: {
    eyebrow: "MACHINES",
    h1: "Our machines",
    metaTitle: "Machines & equipment | TSOPOUROGLOU",
    metaDescription:
      "Our machines: three excavators, a loader, trucks, a JCB, a skid-steer and a tractor.",
    lede: "Three excavators — large, medium and small — a loader, trucks, a JCB, a skid-steer and a tractor.",
    items: [
      "Large excavator",
      "Medium excavator",
      "Small excavator",
      "Loader",
      "Trucks",
      "JCB",
      "Skid-steer loader",
      "Tractor",
    ],
  },

  privacy: {
    eyebrow: "LEGAL",
    h1: "Privacy policy",
    metaTitle: "Privacy policy | TSOPOUROGLOU",
    metaDescription:
      "What we keep when you contact us, why, and for how long.",
    lede: "Short, because we collect very little.",
    updated: "PRIVACY",
    blocks: [
      { heading: "Who we are", body: [] },
      {
        heading: "What we collect",
        body: [
          "The website has no form and collects nothing by itself. We keep only what you send us when you call or email — your name, your phone number and the job you want doing. Nothing else.",
        ],
      },
      {
        heading: "Why",
        body: [
          "So we can answer you and give you a price. We do not send marketing messages and we do not pass your details to any third party for commercial use.",
        ],
      },
      {
        heading: "Where it goes",
        body: [
          "To our phone and our mailbox. The website is hosted by Vercel, which serves it on our behalf.",
        ],
      },
      {
        heading: "How long it is kept",
        body: [
          "The email stays in our mailbox for as long as the job and any follow-up need it. If you want it deleted, call or write and it is deleted.",
        ],
      },
      {
        heading: "Cookies and measurement",
        body: [
          "The website uses no tracking cookies and no advertising cookies. That is why you will not see a consent pop-up.",
          "We measure only how many times each page is opened, using Vercel Analytics. The measurement is done without cookies and without anything that identifies you — we do not learn who visited the page, only how many did.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          "You can ask for access to, correction of or deletion of your details, or withdraw your consent, with a phone call or an email. You also have the right to complain to the Hellenic Data Protection Authority.",
        ],
      },
    ],
  },

  notFound: {
    metaTitle: "Page not found | TSOPOUROGLOU",
    h1: "Page not found",
    lede: "We may have changed the address, or something was mistyped. Call us and we will tell you straight away what you need.",
    servicesHeading: "Were you looking for one of these?",
    areasHeading: "Or your area",
  },
};
