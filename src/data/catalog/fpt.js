import { fptSeries } from './source'

export const fptBrand = {
  slug: 'fpt',
  name: 'FPT Industrial',
  role: 'Engine Dealer, Off-Highway, Marine & Power Generation',
  logo: '/brand/fpt-industrial.webp',
  image: '/media/catalog/products/commercial.webp',
  imageAlt: 'FPT Industrial marine diesel engine',
  intro:
    'For over a century, FPT has been a global leader in industrial powertrain solutions, designing and manufacturing engines, transmissions, axles and ePowertrain systems for on-road, off-road, marine and power generation applications.',
  body: [
    'The product range spans from 42 hp to over 1,000 hp, delivering reliability, performance and efficiency across every industry.',
    'FPT also offers the widest line-up of natural gas engines in the industrial sector, supporting cleaner and more sustainable mobility, and continues to drive the transition toward zero-emission solutions.',
  ],
  facts: [
    { label: 'Group', value: 'Iveco Group' },
    { label: 'Experts', value: '8,000+' },
    { label: 'Plants', value: '10' },
    { label: 'R&D centres', value: '10' },
    { label: 'Power range', value: '42 hp to 1,000+ hp' },
  ],
}

export const fptGroups = [
  { id: 'on-road', title: 'On-road engines' },
  { id: 'off-road', title: 'Off-road engines' },
  { id: 'marine', title: 'Marine' },
  { id: 'power-generation', title: 'Power generation' },
]

const onRoadRange =
  'FPT Industrial’s on-road range covers three engine families, F1, NEF and CURSOR, with displacements from 2.3 to 12.9 litres, rated power from 85 to 442 kW (116 to 600 hp) and maximum torque from 340 to 2,850 Nm.'
const naturalGas =
  'Every FPT Industrial engine family includes natural gas variants, from 3 to 12.9 litres, 100 to 382 kW (136 to 520 hp) and 350 to 2,500 Nm. Since 1997 FPT has sold more than 100,000 natural gas engines, with a European market share of over 60%.'
const marineHeritage =
  'Leveraging more than a century of experience in high-power diesel engines and marine operations, FPT Industrial offers fuel-efficient marine products with high performance, reliability and broad application versatility. The F1, NEF and CURSOR families deliver strong continuous specific power and torque at low speeds, for efficiency and durability under demanding cruising conditions.'
const offRoadLeader =
  'As a recognised leader in the European off-road engine market, FPT Industrial works with key OEMs and, through its global network, provides engine solutions to large and medium OEMs and regional customers.'

export const fptCategories = [
  {
    slug: 'lcv-minibuses',
    group: 'on-road',
    title: 'LCVs & Minibuses',
    headline: 'The light commercial vehicle engine family',
    summary: 'F1A 2.3 L and F1C 3 L engines, 85–152 kW.',
    image: '/media/catalog/products/lcv.webp',
    imageAlt: 'Commercial truck on a site road',
    intro: [
      'Light commercial vehicles must guarantee high performance and low emissions while being quiet, reliable and safe. FPT engines power vans, trucks and light vehicles of all kinds.',
      'FPT is the only company to offer two engines for light commercial vehicles and minibuses, the F1A 2.3 L and F1C 3 L (F1C also in natural gas), with 85 to 152 kW (116 to 207 hp) and 340 to 470 Nm.',
    ],
    facts: [
      { label: 'Engine life', value: 'Up to 400,000 km (B10)' },
      { label: 'Installed GVW', value: 'Up to 8.55 t' },
      { label: 'Oil change interval', value: 'Up to 50,000 km' },
      { label: 'Timing', value: 'Duplex chain, maintenance-free' },
      { label: 'After-treatment', value: 'Dual SCR' },
      { label: 'Emission standards', value: 'EuVI, GBVI, JP24, PROCONVE P8 (F1C)' },
    ],
    notes: [
      'Industrial derivation for long life and reliability, with a duplex timing chain that is cheaper and quieter than gear-driven timing.',
      'Optimised for transverse and longitudinal installation, with after-treatment tuned for urban missions with low load and exhaust temperatures, and for suburban use.',
    ],
    shared: [onRoadRange, naturalGas],
  },
  {
    slug: 'trucks',
    group: 'on-road',
    title: 'Trucks',
    headline: 'The family of truck engines',
    summary: 'NEF and CURSOR, 118–442 kW, diesel, natural gas and hydrogen.',
    image: '/media/catalog/products/truck.webp',
    imageAlt: 'Heavy truck on a site road',
    intro: [
      'NEF and Cursor truck engines provide robust, efficient power to medium- and heavy-duty commercial vehicles for urban, regional, long-haul and construction missions, as well as refuse collectors, municipal vehicles, sweepers and other specialised vehicles.',
      'The NEF family includes the N45 4.5 L and N67 6.7 L, also in natural gas. The Cursor family includes the C9 8.7 L (diesel and natural gas), CURSOR 11 11.1 L, CURSOR 13 12.9 L (diesel and natural gas) and the multi-fuel XCURSOR 13 12.9 L, in diesel, natural gas and a future hydrogen version.',
    ],
    facts: [
      { label: 'Power', value: '118–442 kW (160–600 hp)' },
      { label: 'Torque', value: '580–2,850 Nm' },
      { label: 'Architecture', value: 'EGR-free (NEF and Cursor diesel)' },
    ],
    shared: [onRoadRange, naturalGas],
  },
  {
    slug: 'buses',
    group: 'on-road',
    title: 'Buses',
    headline: 'The family of bus engines',
    summary: 'F1C for minibuses, NEF and CURSOR for city, intercity and coach.',
    image: '/media/catalog/products/buses.webp',
    imageAlt: 'Heavy vehicle on workshop stands for service',
    intro: [
      'Robust, reliable power for passenger transport, in diesel and natural gas. The F1C minibus engine delivers up to 152 kW (207 hp) and 470 Nm, with a lifespan of up to 400,000 km and oil change intervals of up to 50,000 km.',
      'NEF and CURSOR engines, from 4.5 to 12.9 litres and 118 to 442 kW (160 to 600 hp), serve urban, city, intercity and tourist buses. Diesel versions use an EGR-free design with passive DPF regeneration and the patented HI-eSCR after-treatment system.',
    ],
    facts: [
      { label: 'F1C power', value: 'Up to 152 kW (207 hp), 470 Nm' },
      { label: 'NEF / CURSOR power', value: '118–442 kW (160–600 hp)' },
      { label: 'F1C emission standards', value: 'EuVI, GBVI, JP24, PROCONVE P8' },
    ],
    shared: [onRoadRange, naturalGas],
  },
  {
    slug: 'agriculture',
    group: 'off-road',
    title: 'Agriculture',
    headline: 'Powering performance and sustainability',
    summary: 'From compact 2.8 L to 20 L engines for tractors and combines.',
    image: '/media/catalog/products/agriculture.webp',
    imageAlt: 'Off-highway drivetrain components',
    intro: [
      'An engineering tradition that has produced an increasingly wide range of engine families for agricultural machinery, maximising efficiency and productivity while reducing environmental impact.',
      'The portfolio runs from compact 2.8-litre engines to powerful 20-litre solutions, with natural gas engines that run on methane or bio-methane, for tractors, combines and other agricultural machinery.',
    ],
    shared: [offRoadLeader],
  },
  {
    slug: 'construction',
    group: 'off-road',
    title: 'Construction',
    headline: 'Driving performance and sustainability forward',
    summary: 'From 2.8 L to 20 L engines for excavators, loaders and dozers.',
    image: '/media/catalog/products/construction.webp',
    imageAlt: 'Mining shovel loading a haul truck',
    intro: [
      'Engine families known for superior performance and reliability, powering construction machinery with high operational efficiency and lower environmental impact.',
      'Solutions run from compact 2.8-litre engines to robust 20-litre powertrains, with natural gas options running on methane or bio-methane, for excavators, loaders, bulldozers and other construction equipment.',
    ],
    shared: [offRoadLeader],
  },
  {
    slug: 'power-units',
    group: 'off-road',
    title: 'Power Units',
    headline: 'Versatility meets performance',
    summary: 'Plug-and-play power units from 2.8 L to 12.9 L, 43–407 kW.',
    image: '/media/catalog/products/power.webp',
    imageAlt: 'Mobile crushing plant in a quarry',
    intro: [
      'A complete range of plug-and-play power units, from 2.8 to 12.9 litres and 43 to 407 kW. Unregulated or Stage V/Tier 4 Final compliant, they are compact, fully pre-assembled and easy to install, with off-the-shelf options for tailor-made products.',
      'Ideal for irrigation pumps, hydraulic power units, manure and dewatering pumps, concrete pumps, wood chippers and grinders, airline ground support equipment, screeners and crushers.',
    ],
    facts: [
      { label: 'Displacement', value: '2.8–12.9 L' },
      { label: 'Power', value: '43–407 kW' },
      { label: 'Oil change interval', value: '600 hours' },
      { label: 'After-treatment', value: 'Maintenance-free' },
      { label: 'Emissions', value: 'Unregulated or Stage V / Tier 4 Final' },
    ],
  },
  {
    slug: 'marine-commercial',
    group: 'marine',
    title: 'Commercial',
    headline: 'The professional marine solution',
    summary: 'F1, NEF and CURSOR marine engines for working vessels.',
    image: '/media/catalog/products/commercial.webp',
    imageAlt: 'FPT Industrial marine diesel engine',
    intro: [
      'Every FPT Industrial marine engine is a stand-alone project, built around the customer’s needs and equipped with specific components.',
      'Low-emission professional marine engines with reduced fuel consumption and industry-leading maintenance intervals lower total cost of ownership. Compatibility with renewable HVO and XTL drop-in fuels allows 90%+ reductions in CO₂ emissions without compromising performance.',
      'FPT marine long blocks are the same as those proven in on-road and off-road applications. Extended warranty options, proactive assistance and the MyFPT app help customers avoid unwanted downtime and costs.',
    ],
    shared: [marineHeritage],
  },
  {
    slug: 'marine-pleasure',
    group: 'marine',
    title: 'Pleasure',
    headline: 'The pleasure selection',
    summary: 'Lightweight, compact marine engines with top power density.',
    image: '/media/catalog/products/pleasure.webp',
    imageAlt: 'FPT Industrial marine diesel engine',
    intro: [
      'Marine engines for pleasure vessels with high power density and performance. Lightweight and compact, they save space without compromising power, while low noise and vibration give the best onboard comfort.',
      'Clean operation and fuel flexibility keep exhaust emissions low. Long blocks proven in on-road and off-road use give exceptional power-to-volume and power-to-weight ratios, with ease of maintenance.',
    ],
    shared: [marineHeritage],
  },
  {
    slug: 'g-drive-marine',
    group: 'marine',
    title: 'G-Drive Marine',
    headline: 'The G-Drive engine family',
    summary: 'Fixed-speed engines for on-board generators, 4.5 to 16 L.',
    image: '/media/catalog/products/drive.webp',
    imageAlt: 'FPT Industrial marine diesel engine',
    intro: [
      'Fixed-speed G-Drive engines power on-board generators for hotel loads on any type of vessel, developed to work in synergy with the FPT Industrial marine propulsion line-up.',
      'Options include fuel pump actuators (GAC) for mechanical engines and electronic speed controllers for mechanical and electronic engines.',
    ],
    facts: [
      { label: 'Displacement', value: '4.5–16 L' },
      { label: 'Frequency', value: '50 Hz and 60 Hz' },
      { label: 'Rating', value: 'Unrestricted use, 10% overload (ISO 8528 prime power)' },
    ],
    shared: [marineHeritage],
  },
  {
    slug: 'power-generation',
    group: 'power-generation',
    title: 'FPT-IVECO Generator Range',
    headline: 'FPT IVECO diesel generator sets',
    summary: 'Generator sets for harsh environments, with open and silent options.',
    image: '/media/catalog/banners/Iveco.webp',
    imageAlt: 'Heavy equipment working on site',
    intro: [
      'Yellow Equipment Services’ FPT IVECO diesel generator sets are designed to perform in the harsh environments of Africa and the Middle East and the freezing high mountains of Europe and Russia.',
      'They suit construction sites and shipyards, on-shore and off-shore oil and gas platforms, banks, hospitals, malls, shopping centres and residential buildings.',
      'Robust design, compact engine layout, long life, low fuel consumption, long service intervals, excellent transient load response, low emissions and easy parts and service availability set the range apart.',
    ],
    facts: [
      { label: 'Power range', value: '30–720 kVA' },
      { label: 'Frequency', value: '50 and 60 Hz' },
      { label: 'Built-in fuel tank', value: '8 hours' },
      { label: 'Cooling', value: 'Radiator-mounted, rated to 52 °C' },
      { label: 'Alternator', value: 'LINZ brushless synchronous' },
      { label: 'Control panel', value: 'Deepsea' },
      { label: 'Load test', value: '110% on resistive load bank' },
    ],
    genset: {
      testing:
        'Every generator is tested before delivery: load testing on a resistive load bank at 110%, leak tests, vibration and sound level tests. Factory assessment, witness and third-party testing are also available.',
      standard: [
        'Radiator-mounted cooling system designed for up to 52 °C',
        'Mechanical or electronic governor and fuel injection system',
        'LINZ brushless synchronous alternator',
        'Skid-mounted fuel tank for 8 hours',
        'Battery charger',
        'Adjustable fan belt tensioner',
        'High-profile anti-vibration dampers',
        'Deepsea control panel',
        '3-pole moulded case circuit breaker (MCCB)',
        'Engine oil extraction port',
        'Rain cover',
      ],
      silent:
        'Silent gen sets have powder-coated sound- and weatherproof canopies in heavy-duty galvanised MS sheet, a heavy-duty MS base frame with skid-mounted fuel tank, forklift pockets, single lifting point, lockable external fuel filler and an external emergency push button.',
      options: [
        'Customised fuel tanks',
        'Super soundproof enclosures',
        'Built-in synchronising / paralleling systems',
        'AMF and ATS panels',
        'Extra water separator pre-filters',
        'Customised canopy colour',
        '2-wheel or 4-wheel mobile trailers',
        'Zone II accessories for oil and gas: Chelwyn valve, spark arrestor, battery isolation',
      ],
      benefits: [
        'Compact and simple to operate',
        'Cost effective',
        'Broad range of optional equipment',
        'Low emission levels',
        'Low noise and vibration isolation',
        'Easier to maintain',
        'Low cost of operation',
        'Harsh environment operation',
      ],
      unique: [
        'Ideal for plants requiring a small footprint and easy operation',
        'Rapid deployment and installation',
        'Modular and scalable',
        'Containerised with full digital control',
        'Improved load acceptance',
        'Wide variety of fuels',
      ],
    },
  },
].map((category) => ({ ...category, series: fptSeries[category.slug] ?? [] }))

export const fptGenuineParts = {
  text: 'FPT Industrial genuine parts offer maximum efficiency and environmental sustainability, reducing fuel consumption and emissions. Engineered to the exact specifications of the original equipment and rigorously tested, they protect engine safety, longevity and reliability, with fast global delivery and technical support from FPT Authorised Workshops.',
  benefits: [
    'Designed and engineered by FPT Industrial',
    'Top engine performance',
    'Full respect of FPT technical specifications',
    'Maximum uptime through parts reliability',
    '12 months warranty coverage',
  ],
  items: [
    { name: 'After-treatment System', text: 'Converts pollutants in exhaust gases to reduce emissions and meet global environmental standards.' },
    { name: 'Alternator', text: 'Durable, low-maintenance alternators that deliver consistent, reliable power output.' },
    { name: 'Blow-by Filter', text: 'Captures oil mist and contaminants to reduce emissions, oil consumption and engine wear.' },
    { name: 'Fuel Filter', text: 'Superior filtration for a clean fuel flow that protects engine components.' },
    { name: 'Cylinder Head', text: 'Precise combustion, optimal airflow and superior heat management for longer component life.' },
    { name: 'High Pressure Pump', text: 'Generates the pressure required for precise fuel injection, improving performance and efficiency.' },
    { name: 'Injectors', text: 'Precise fuel delivery that optimises combustion and reduces emissions and fuel consumption.' },
    { name: 'Long Block', text: 'A quick, reliable repair or overhaul solution instead of replacing many individual components.' },
    { name: 'Maintenance Kit', text: 'Tailor-made kits of essential components such as filters and belts for each engine.' },
    { name: 'Oil Filter', text: 'Superior filtration that keeps oil clean and protects engine components from wear.' },
    { name: 'Overhaul Kit', text: 'A complete set of main seals and bearings, an alternative to replacing the engine after major failure.' },
    { name: 'Short Block', text: 'An economical repair that replaces key components such as crankshafts.' },
    { name: 'Starter', text: 'Quick, reliable ignition in any weather, reducing downtime and maintenance costs.' },
    { name: 'Turbocharger', text: 'Boosts performance and fuel efficiency and reduces emissions in demanding environments.' },
    { name: 'Water Pump', text: 'Keeps coolant moving to hold the correct engine temperature and prevent overheating.' },
  ],
}

export const fptFluids = {
  text: 'Genuine fluids are formulated, tested and approved by FPT Industrial engineers under severe laboratory conditions. Extreme load tests on bench and in the field show FPT oil retains its characteristics longer and better preserves the engine than standard oils, validating change intervals extended by up to 50%.',
  guarantees: ['Top performance', 'Engine durability', 'Protection from wear and tear', 'Operational cost reduction', 'Increased life of the investment'],
  regions: [
    {
      region: 'China',
      items: [
        { name: 'Premium Engine Oil', text: 'Low SAPS oil for recent medium-duty diesel and natural gas engines. High-temperature oxidation stability.' },
        { name: 'Premium Plus HD On-Road', text: 'Low SAPS oil for medium and heavy-duty GBVI and natural gas engines. Maintenance and fuel-efficiency benefits.' },
        { name: 'On-Road HD Engine Oil', text: 'High SAPS heavy-duty oil meeting up to Euro IV and V. Improved protection and durability.' },
        { name: 'Premium Off-Road', text: 'Low SAPS heavy-duty oil for modern low-emission engines meeting Tier 4.' },
        { name: 'Off-Road & Marine', text: 'High SAPS medium and heavy-duty oil for up to Tier 4A. Improved protection and durability.' },
        { name: 'All Climate Performance Genuine Coolant', text: 'For all diesel and natural gas applications. Organic additive technology protects the cooling system.' },
      ],
    },
    {
      region: 'Korea',
      items: [
        { name: 'Premium Engine Oil', text: 'Low SAPS oil for recent medium-duty diesel and natural gas engines. High-temperature oxidation stability.' },
        { name: 'Off-Road & Marine Engine Oil', text: 'High SAPS medium and heavy-duty oil for up to Tier 4A. Improved protection and durability.' },
      ],
    },
    {
      region: 'USA & Canada',
      items: [
        { name: 'Cold Climate Arctic Off-Road Engine Oil', text: 'Low-ash heavy-duty oil for modern low-emission engines operating in arctic climates.' },
        { name: 'Premium Off-Road & Marine Engine Oil', text: 'Low SAPS medium and heavy-duty oil with improved low-temperature and fuel-economy performance.' },
        { name: 'Off-Road & Marine Engine Oil', text: 'Low SAPS medium and heavy-duty oil for modern engines meeting Stage V / Tier 4B.' },
        { name: 'All Climate Performance Genuine Coolant', text: 'For all diesel and natural gas applications. Organic additive technology protects the cooling system.' },
      ],
    },
    {
      region: 'Europe, South America & Africa',
      items: [
        { name: 'Premium On-Road Engine Oil', text: 'Low SAPS fully synthetic oil for Euro V–VI diesel, CNG and LNG heavy-duty engines.' },
        { name: 'Off-Road & Marine Engine Oil', text: 'High SAPS oil for medium and heavy duty, up to Euro IV and V and Tier 4A.' },
        { name: 'Premium Off-Road & Marine Engine Oil', text: 'Low SAPS semi-synthetic oil for modern low-emission diesel and natural gas engines.' },
        { name: 'Urania Daily Tek Plus', text: 'PETRONAS Urania DAILY TEK PLUS 0W-30 synthetic oil for Euro 6 and Euro VI engines, with extended drain and fuel economy.' },
        { name: 'Urania Daily', text: 'High SAPS oil for light-duty natural gas engines. Fuel-efficiency benefits.' },
        { name: 'Urania Daily LS', text: 'Low SAPS oil for light-duty Euro V. Fuel-economy benefits.' },
        { name: 'Urania Daily Tek', text: 'Low SAPS oil for light- to medium-duty Euro 6 / VI and natural gas engines.' },
        { name: 'Urania Ecosynth', text: 'Low SAPS oil for medium-duty natural gas engines, with longer change intervals.' },
        { name: 'Urania FE LS', text: 'Low SAPS oil for medium and heavy-duty Euro VI and natural gas engines.' },
        { name: 'Urania Next', text: 'Low SAPS ultra-low-viscosity oil for heavy-duty Euro VI.' },
        { name: 'Paraflu 11', text: 'Coolant for all diesel and natural gas applications up to Euro V engines.' },
        { name: 'Paraflu Up', text: 'Coolant with organic additive technology for all diesel and natural gas applications.' },
      ],
    },
  ],
}

export const fptReman = {
  text: 'Original Reman is FPT Industrial’s remanufacturing programme, carried out with meticulous precision by experienced technicians with a goal of zero waste.',
  benefits: [
    'Cost efficiency with the same or better performance',
    'Low total cost of ownership',
    'Best-in-class 2-year warranty',
    'No compromise on quality',
    'A sustainable process for a circular economy',
  ],
  process:
    'Remanufacturing starts with complete analysis and disassembly of the engine. Each component is inspected and thoroughly cleaned by mechanical and chemical methods, then skilled technicians integrate new components so every customer gets the latest improvements and full certification of the original regeneration.',
  circular:
    'Following the circular flow of remanufacturing keeps used components out of landfill and offers cost-effective, environmentally sustainable parts.',
}

export const fptConnected = [
  {
    slug: 'myfpt-app',
    title: 'MyFPT App',
    text: 'Type the engine serial number and the app retrieves the main engine information: technical information, user manuals, spare parts availability and the nearest FPT dealer and workshop. With the Bluetooth FPT Dongle it shows engine performance and status in real time, retrieves fault information and shares data quickly with FPT assistance.',
    points: ['Engine technical information', 'User manual download', 'Spare parts availability', 'Dealer and workshop finder'],
    availability: 'Europe, North America and South America, on Android and iOS.',
  },
  {
    slug: 'remote-assistance',
    title: 'Remote Assistance',
    text: 'A dongle installed in the engine diagnostic port connects over Bluetooth to the user’s smartphone, which forwards engine information to the workshop web portal for real-time pre-diagnosis.',
    points: ['Easy to install and use', 'Maximise uptime, enhance assistance', 'Real-time pre-diagnosis via workshop portal', 'Resolve engine errors', 'Reduced environmental impact'],
    availability: 'Listed countries across Europe, plus Canada, Turkey, Russia and the United States.',
  },
  {
    slug: 'proactive-assistance',
    title: 'Proactive Assistance',
    text: 'Remote monitoring and real-time alerts keep the engine connected to the FPT Control Room, which continuously analyses engine data to detect anomalies and optimisation opportunities.',
    points: [
      'Service knows the issue before leaving the workshop',
      'Repair suggestions based on FPT know-how and field experience',
      'Reports tailored to your mission',
      'Unplanned stops become planned ones',
      'Total cost of ownership optimisation',
    ],
  },
  {
    slug: 'remote-master',
    title: 'Remote Master',
    text: 'A hands-free vision device and diagnostic tools let a remote expert follow the field technician step by step as if on site, with tool data streamed in real time to the back end.',
    points: ['Direct support by qualified experts', 'Automatic report generation', 'Time and cost optimisation', 'Reduced environmental impact'],
  },
]
