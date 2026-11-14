export const company = {
  name: 'Yellow Equipment Services LLC',
  short: 'Yellow Equipment',
  place: 'Muscat, Sultanate of Oman',
  address: [
    'Building 160, Way 4902',
    'Rusayl Industrial Area, Muscat',
    'Sultanate of Oman, Postal Code 124',
  ],
  phones: ['+968 9561 9537', '+968 9921 8481'],
  email: 'chandrasekar@yellowequipmentoman.com',
  tagline: 'We start with integrity & end with excellence.',
  mission:
    'To provide excellence in customer solutions through a highly motivated workforce in partnership with leading global quality suppliers.',
}

export const nav = [
  { href: '#top', label: 'Home' },
  { href: '#about', label: 'About Us' },
  { href: '#capabilities', label: 'Services' },
  { href: '#industries', label: 'Industries' },
  { href: '#partners', label: 'Our Partners' },
  { href: '#contact', label: 'Contact' },
]

export const heroSlides = [
  {
    id: 'port',
    index: '01',
    label: 'Port & material handling',
    video: '/media/hero.mp4',
    poster: '/media/haul-truck.png',
  },
  {
    id: 'workshop',
    index: '02',
    label: 'Workshop servicing',
    video: '/media/field.mp4',
    poster: '/media/workshop-truck.png',
  },
]

export const credentials = [
  { kicker: 'Authorised Dealer', text: 'Allison Transmission, Oman' },
  { kicker: 'Certified Service Centre', text: 'Dana Spicer, Middle East' },
  {
    kicker: 'Engine Dealer',
    text: 'FPT Industrial, Off-Highway, Marine & Power Generation',
  },
]

export const offerings = [
  { n: '01', title: 'Diesel generators', text: 'From 20 to 700 kVA' },
  {
    n: '02',
    title: 'Marine & industrial engines',
    text: 'Off-highway, marine and power generation',
  },
  {
    n: '03',
    title: 'Genuine spare parts & motion systems',
    text: 'Engines, transmissions, axles and drivelines',
  },
  {
    n: '04',
    title: 'GETs & undercarriage parts',
    text: 'For all brands, through BeneParts Machinery Co. Ltd.',
  },
]

export const values = [
  'Integrity',
  'Professionalism',
  'Competence',
  'Respect & Tolerance',
  'Trust',
  'Excellence',
]

export const partners = [
  {
    n: '01',
    name: 'Allison Transmission',
    to: '/products/allison',
    logo: '/brand/allison-transmission.webp',
    role: 'Authorised Dealer',
    region: 'Oman',
    body: 'The world\'s largest manufacturer of fully automatic transmissions for medium- and heavy-duty commercial vehicles. We supply genuine Allison spare parts and accessories at competitive prices, together with parts for Twin Disc and ZF.',
    facts: ['Founded 1915, Indianapolis', 'Present in 100+ countries', 'About 1,400 distributor and dealer locations'],
    points: ['Genuine Parts', 'Genuine Reman', 'Extended Coverage', 'Approved Fluids'],
  },
  {
    n: '02',
    name: 'Dana Spicer',
    to: '/products/dana',
    logo: '/brand/dana-spicer.webp',
    role: 'Certified Service Centre',
    region: 'Middle East',
    body: 'A drivetrain leader for more than a century across axles, driveshafts and e-Propulsion. We supply genuine Spicer parts for light and commercial vehicles, off-highway, construction and agriculture machinery.',
    facts: ['120+ years of engineering', 'Present in 100+ countries'],
    points: ['Construction', 'Agriculture', 'Material Handling', 'Mining', 'Forestry'],
  },
  {
    n: '03',
    name: 'FPT Industrial',
    to: '/products/fpt',
    logo: '/brand/fpt-industrial.webp',
    role: 'Engine Dealer',
    region: 'Off-Highway, Marine & Power Generation',
    body: 'Part of Iveco Group, FPT Industrial builds engines, transmissions, axles and ePowertrain systems for on-road, off-road, marine and power generation, from 42 hp to over 1,000 hp.',
    facts: ['8,000+ experts', '10 plants and 10 R&D centres', '42 to 1,000+ hp'],
    points: ['Genuine Parts', 'Oils & Coolants', 'Original Reman', 'Connected Solutions'],
  },
]

export const alsoBrands = [
  'Caterpillar',
  'Cummins',
  'Komatsu',
  'Volvo',
  'Volvo Penta',
  'JCB',
  'Detroit Diesel',
  'Kenworth',
  'Iveco',
  'Astra',
  'Renault',
  'Weichai',
  'Manitou',
  'Oshkosh',
  'Twin Disc',
  'ZF',
]

export const equipment = [
  {
    n: '01',
    title: 'Allison Transmission, Caterpillar, Cummins & Komatsu',
    to: '/products/other#caterpillar-cummins-komatsu',
    text: 'Transmissions, engines and components for the heavy equipment and commercial vehicles that run on these leading names.',
    image: '/media/heavy-equipment.jpg',
    imageAlt: 'Caterpillar haul truck being loaded by a mining shovel',
  },
  {
    n: '02',
    title: 'Kenworth Trucks',
    to: '/products/other#kenworth-trucks',
    text: 'Parts and servicing support for heavy-haul and vocational trucks working on site roads and highways.',
    image: '/media/kenworth-trucks.jpg',
    imageAlt: 'Blue Kenworth dump truck parked on a site road',
  },
  {
    n: '03',
    title: 'Mobile Crushers',
    to: '/products/other#mobile-crushers',
    text: 'Support for tracked crushing plants and the drivetrains that keep quarry production moving.',
    image: '/media/mobile-crusher.jpg',
    imageAlt: 'Tracked mobile crusher discharging rock in a quarry',
  },
  {
    n: '04',
    title: 'Dana Spicer Transmissions, Drive Shafts & Axles',
    to: '/products/dana',
    text: 'Genuine Spicer driveline components, backed by our Certified Service Centre status for the Middle East.',
    image: '/media/drivetrain-components.png',
    imageAlt: 'Dana Spicer transmission, driveshaft and axle',
    fit: 'contain',
  },
  {
    n: '05',
    title: 'Underground Machinery',
    to: '/products/other#underground-machinery',
    text: 'Loaders, haulers and the powertrains behind them, serviced for demanding mining duty cycles.',
    image: '/media/underground-machine.jpg',
    imageAlt: 'Underground mining machine',
  },
  {
    n: '06',
    title: 'FPT Marine Engines & Generators',
    to: '/products/fpt#marine',
    text: 'Marine engines and power generation units from FPT Industrial, where we are the engine dealer.',
    image: '/media/fpt.jpg',
    imageAlt: 'FPT Industrial marine diesel engine',
    fit: 'contain',
    frame: 'light',
  },
]

export const capabilities = [
  {
    n: '01',
    title: 'Fleet Management Consultation',
    to: '/services/fleet-management',
    text: 'Practical guidance on keeping mixed heavy fleets productive, from maintenance planning to repair-or-replace decisions.',
    points: ['Maintenance planning', 'Repair or replace advice', 'Uptime focus'],
    image: '/media/services/fleet-management.webp',
    imageAlt: 'Technicians reviewing diagnostics on a laptop beside excavator',
  },
  {
    n: '02',
    title: 'Annual Maintenance Contracts',
    to: '/services/annual-maintenance-contracts',
    text: 'Scheduled servicing under one annual agreement, so every machine is maintained on time by technicians who know it.',
    points: ['Scheduled servicing', 'One point of contact', 'Predictable costs'],
    image: '/media/services/annual-maintenance-contracts.webp',
    imageAlt: 'Technician checking oil on a yellow truck during scheduled service',
  },
  {
    n: '03',
    title: 'Major Component Rebuilds',
    to: '/services/component-rebuilds',
    text: 'Engines, transmissions, axles and drivetrain assemblies stripped, inspected and rebuilt to manufacturer procedures, with reusability guidelines applied to control cost without compromising quality.',
    points: ['Manufacturer procedures', 'Reusability guidelines', 'Warranty on repairs'],
    image: '/media/services/component-rebuilds.webp',
    imageAlt: 'Technicians rebuilding an engine in the workshop rebuild bay',
  },
  {
    n: '04',
    title: 'Field Repairs',
    to: '/services/field-repairs',
    text: 'All types of minor and major repairs carried out on site, with quick service around the clock to get machines working again.',
    points: ['Minor & major repairs', '24/7 quick service', 'On-site diagnostics'],
    image: '/media/services/field-repairs.webp',
    imageAlt: 'Field technician working from a service van beside excavator on site',
  },
  {
    n: '05',
    title: 'Oil Sampling & Condition Monitoring',
    to: '/services/oil-sampling',
    text: 'Oil sampling and condition monitoring programmes that reveal wear and contamination early, so maintenance is planned rather than paid for in downtime.',
    points: ['Oil sampling programmes', 'Condition monitoring', 'Approved fluids'],
    image: '/media/services/oil-sampling.webp',
    imageAlt: 'Technician taking a fluid sample from heavy equipment',
  },
  {
    n: '06',
    title: 'Authorised Spare Parts',
    to: '/services/authorised-parts',
    text: 'Genuine parts, kits and components for diesel engines, transmissions and equipment, held in stock and sourced worldwide, all supplied with warranty.',
    points: ['Genuine & authorised', 'Global sourcing', 'Warranty included'],
    image: '/media/services/authorised-parts.webp',
    imageAlt: 'Warehouse racks stocked with heavy equipment spare parts',
  },
  {
    n: '07',
    title: 'Engine Servicing',
    to: '/services/engine-servicing',
    text: 'Diagnostics, servicing and overhauls for on-road, off-road, marine and industrial diesel engines, using up-to-date diagnostic tools and software.',
    points: ['FPT engine dealer', 'Marine & industrial', 'Systematic troubleshooting'],
    image: '/media/services/engine-servicing.webp',
    imageAlt: 'Technician inspecting a heavy vehicle engine in the workshop',
  },
  {
    n: '08',
    title: 'Transmission & Drivetrain Solutions',
    to: '/services/transmission-drivetrain',
    text: 'Allison automatic transmissions and Dana Spicer driveshafts and axles, supplied, serviced and rebuilt with authorised dealer and certified service centre support.',
    points: ['Allison authorised dealer', 'Dana Spicer certified', 'Genuine Reman options'],
    image: '/media/services/transmission-drivetrain.webp',
    imageAlt: 'Automatic transmission opened for rebuild on the workshop bench',
  },
]

export const transmissionModes = [
  {
    id: 'assembled',
    label: 'Assembled',
    title: 'The heart of an automatic transmission',
    text: 'Planetary gearsets and multi-plate clutch packs sit at the core of fully automatic transmissions like the Allison units we support. Drag the model to turn it.',
  },
  {
    id: 'exploded',
    label: 'Exploded',
    title: 'Stripped to every component',
    text: 'In a major rebuild the unit comes apart down to individual parts, and each one is inspected against manufacturer procedures and reusability guidelines.',
  },
  {
    id: 'rebuilt',
    label: 'Rebuilt',
    title: 'Back together, back to work',
    text: 'Worn components are replaced with genuine, authorised parts, and the rebuilt assembly returns to service covered by warranty.',
  },
]

export const transmissionParts = [
  {
    id: 'clutch',
    n: '01',
    title: 'Clutch pack',
    text: 'Friction and steel plates engage to hold or drive each gear range.',
  },
  {
    id: 'planets',
    n: '02',
    title: 'Sun & planet gears',
    text: 'Planetary gearing multiplies torque in a compact, balanced package.',
  },
  {
    id: 'ring',
    n: '03',
    title: 'Ring gear',
    text: 'Internal teeth mesh with the planets. Holding it changes the ratio.',
  },
  {
    id: 'flange',
    n: '04',
    title: 'Output flange',
    text: 'Transfers drive to the propeller shaft and the axles.',
  },
]

export const industries = [
  {
    n: '01',
    title: 'Construction',
    to: '/products/dana/construction',
    kicker: 'Allison · Dana Spicer · FPT',
    text: 'Excavators, loaders and haul trucks, and the engines, transmissions and axles that drive them.',
    image: '/media/haul-truck.webp',
    imageAlt: 'Dump truck on a construction site road',
  },
  {
    n: '02',
    title: 'Mining',
    to: '/products/dana/mining',
    kicker: 'Dana Spicer · Underground machinery',
    text: 'Haul trucks, underground machinery and mobile crushers working the toughest duty cycles.',
    image: '/media/quarry.webp',
    imageAlt: 'Rigid haul equipment in a rock quarry',
  },
  {
    n: '03',
    title: 'Material Handling',
    to: '/products/dana/material-handling',
    kicker: 'Dana Spicer · Port equipment',
    text: 'Reach stackers, terminal tractors and port equipment that keep cargo moving.',
    image: '/media/workshop-truck.webp',
    imageAlt: 'Heavy truck prepared for material-handling service',
  },
  {
    n: '04',
    title: 'Marine',
    to: '/products/fpt#marine',
    kicker: 'FPT marine engines',
    text: 'Engines for commercial and pleasure craft, supported with genuine parts and servicing.',
    image: '/media/industries/marine.webp',
    imageAlt: 'Offshore supply vessel at sea',
  },
  {
    n: '05',
    title: 'Power Generation',
    to: '/products/fpt/power-generation',
    kicker: 'FPT power generation',
    text: 'Diesel generators from 20 to 700 kVA, plus power generation engines and their servicing.',
    image: '/media/industries/power-generation.webp',
    imageAlt: 'Row of industrial diesel generators in a power plant',
  },
  {
    n: '06',
    title: 'Agriculture',
    to: '/products/fpt/agriculture',
    kicker: 'FPT · Dana Spicer',
    text: 'Engines and drivelines for agricultural machinery, from FPT and Dana Spicer.',
    image: '/media/industries/agriculture.webp',
    imageAlt: 'Combine harvester working a wheat field',
  },
  {
    n: '07',
    title: 'Industrial Equipment',
    to: '/products/other#mobile-crushers',
    kicker: 'Mobile crushing plant',
    text: 'Mobile crushers, underground machinery and industrial engines across quarrying and processing.',
    note: 'Caterpillar · Cummins · Komatsu',
    image: '/media/industries/industrial.webp',
    imageAlt: 'Yellow mobile crusher and excavator working a quarry',
  },
]

export const principles = [
  { n: '01', title: 'Manufacturer procedures', text: 'Every repair follows the manufacturer\'s procedures.' },
  { n: '02', title: 'Reusability guidelines', text: 'Manufacturer reusability guidelines cut parts usage without losing quality.' },
  { n: '03', title: 'Systematic troubleshooting', text: 'Updated diagnostic tools and software, applied methodically.' },
  { n: '04', title: 'Warranty on all work', text: 'Every repair and every part we supply carries a warranty.' },
  { n: '05', title: 'Authorised parts only', text: 'Genuine, authorised components and nothing else.' },
  { n: '06', title: 'Economical solutions', text: 'The right fix for the machine and for the budget.' },
  { n: '07', title: '24/7 quick service', text: 'Fast response, around the clock.' },
  { n: '08', title: 'Customer-centric', text: 'A strategy built around your operation and its uptime.' },
]

export const gallery = [
  {
    src: '/media/transmission-bay.png',
    alt: 'Technician rebuilding a transmission beside a heavy truck',
    caption: 'Workshop servicing',
  },
  {
    src: '/media/workshop-truck.png',
    alt: 'Heavy truck raised on workshop stands',
    caption: 'Heavy truck on stands for inspection',
  },
  {
    src: '/media/haul-truck.png',
    alt: 'Haul truck on a dusty site road',
    caption: 'Haul trucks on a site road',
  },
  {
    src: '/media/quarry.png',
    alt: 'Excavator at work in an open-pit mine',
    caption: 'Excavator in an open-pit mine',
  },
  {
    src: '/media/hero.mp4',
    alt: 'Heavy equipment operating on site',
    caption: 'Site operations',
    video: true,
    poster: '/media/haul-truck.png',
  },
  {
    src: '/media/field.mp4',
    alt: 'Field service footage',
    caption: 'Field service',
    video: true,
    poster: '/media/workshop-truck.png',
  },
]

export const serviceOptions = [
  'Fleet management consultation',
  'Annual maintenance contract',
  'Major component rebuild',
  'Field repair',
  'Oil sampling & condition monitoring',
  'Spare parts',
  'Engine servicing',
  'Transmission & drivetrain',
  'Diesel generators',
  'Other',
]

export const footerServices = [
  'Fleet Management Consultation',
  'Annual Maintenance Contracts',
  'Major Component Rebuilds',
  'Field Repairs',
  'Oil Sampling & Condition Monitoring',
  'Authorised Spare Parts',
  'Engine Servicing',
  'Transmission & Drivetrain Solutions',
]
