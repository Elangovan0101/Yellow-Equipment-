import { allisonSupport } from './allison'
import { fptFluids, fptGenuineParts, fptReman } from './fpt'

export const partsBrands = [
  'Allison Transmission',
  'Dana Spicer',
  'FPT Engine Parts',
  'Iveco and Astra',
  'JCB',
  'Renault',
  'Detroit Diesel',
  'Caterpillar',
  'Komatsu',
  'Cummins',
  'Kenworth',
  'Weichai',
  'Volvo',
  'Volvo Penta',
]

export const partsIntro = [
  'Yellow Equipment provides the most comprehensive range of genuine parts, kits and components for diesel engines, transmissions and equipment in the industry.',
  'Through years of learning and working experience, we source the best brands and products from around the globe to meet customer needs at a very competitive price without compromising on quality. We also carry stock of genuine parts from leading brands.',
]

export const partsWarranty =
  'All parts supplied by Yellow Equipment carry a period of warranty. We supply only authorised parts.'

export const otherEquipment = {
  intro: 'Beyond our dealerships, we support and supply parts for the following equipment and vehicle brands.',
  brands: [
    'Caterpillar',
    'Cummins',
    'Komatsu',
    'Volvo',
    'JCB',
    'Port Equipment',
    'Kenworth Trucks',
    'Oshkosh Trucks',
    'Astra Trucks',
    'Iveco Trucks',
    'Volvo Trucks',
    'Manitou',
  ],
  beneparts: 'GETs and undercarriage parts for all brands are supplied through BeneParts Machinery Co. Ltd.',
}

export const services = [
  {
    slug: 'fleet-management',
    n: '01',
    title: 'Fleet Management Consultation',
    original: 'Fleet management consultation',
    text: 'Practical guidance on keeping mixed heavy fleets productive, from maintenance planning to repair-or-replace decisions.',
    points: ['Maintenance planning', 'Repair or replace advice', 'Uptime focus'],
    image: '/media/services/fleet-management.webp',
    imageAlt: 'Technicians reviewing diagnostics on a laptop beside excavator',
    practices: ['01', '06', '08'],
    related: [
      { to: '/services/annual-maintenance-contracts', label: 'Annual maintenance contracts' },
      { to: '/services/oil-sampling', label: 'Oil sampling & condition monitoring' },
      { to: '/products/other', label: 'Equipment we support' },
    ],
  },
  {
    slug: 'annual-maintenance-contracts',
    n: '02',
    title: 'Annual Maintenance Contracts',
    original: 'Annual maintenance contract',
    text: 'Scheduled servicing under one annual agreement, so every machine is maintained on time by technicians who know it.',
    points: ['Scheduled servicing', 'One point of contact', 'Predictable costs'],
    image: '/media/services/annual-maintenance-contracts.webp',
    imageAlt: 'Technician checking oil on a yellow truck during scheduled service',
    practices: ['01', '03', '04'],
    related: [
      { to: '/parts/oils-coolants', label: 'Oils & coolants' },
      { to: '/parts/genuine-parts', label: 'Genuine parts' },
      { to: '/services/fleet-management', label: 'Fleet management consultation' },
    ],
  },
  {
    slug: 'component-rebuilds',
    n: '03',
    title: 'Major Component Rebuilds',
    original: 'Major component rebuilds',
    text: 'Engines, transmissions, axles and drivetrain assemblies stripped, inspected and rebuilt to manufacturer procedures, with reusability guidelines applied to control cost without compromising quality.',
    points: ['Manufacturer procedures', 'Reusability guidelines', 'Warranty on repairs'],
    image: '/media/services/component-rebuilds.webp',
    imageAlt: 'Technicians rebuilding an engine in the workshop rebuild bay',
    practices: ['01', '02', '04', '05'],
    related: [
      { to: '/parts/remanufactured', label: 'Remanufactured components' },
      { to: '/products/allison', label: 'Allison Transmission' },
      { to: '/products/dana', label: 'Dana Spicer' },
    ],
  },
  {
    slug: 'field-repairs',
    n: '04',
    title: 'Field Repairs',
    original: 'All types of field minor & major repairs',
    text: 'All types of minor and major repairs carried out on site, with quick service around the clock to get machines working again.',
    points: ['Minor & major repairs', '24/7 quick service', 'On-site diagnostics'],
    image: '/media/services/field-repairs.webp',
    imageAlt: 'Field technician working from a service van beside excavator on site',
    practices: ['03', '07', '04'],
    related: [
      { to: '/products/other', label: 'Equipment we support' },
      { to: '/parts/genuine-parts', label: 'Genuine parts' },
      { to: '/services/engine-servicing', label: 'Engine servicing' },
    ],
  },
  {
    slug: 'oil-sampling',
    n: '05',
    title: 'Oil Sampling & Condition Monitoring',
    original: 'Oil sampling and condition monitoring programs',
    text: 'Oil sampling and condition monitoring programmes that reveal wear and contamination early, so maintenance is planned rather than paid for in downtime.',
    points: ['Oil sampling programmes', 'Condition monitoring', 'Approved fluids'],
    image: '/media/services/oil-sampling.webp',
    imageAlt: 'Technician taking a fluid sample from heavy equipment',
    practices: ['03', '06', '08'],
    related: [
      { to: '/parts/oils-coolants', label: 'Oils & coolants' },
      { to: '/products/fpt#connected', label: 'FPT connected services' },
      { to: '/services/annual-maintenance-contracts', label: 'Annual maintenance contracts' },
    ],
  },
  {
    slug: 'authorised-parts',
    n: '06',
    title: 'Authorised Spare Parts',
    original: 'Supply authorised parts with warranty',
    text: 'Genuine parts, kits and components for diesel engines, transmissions and equipment, held in stock and sourced worldwide, all supplied with warranty.',
    points: ['Genuine & authorised', 'Global sourcing', 'Warranty included'],
    image: '/media/services/authorised-parts.webp',
    imageAlt: 'Warehouse racks stocked with heavy equipment spare parts',
    practices: ['05', '04', '06'],
    related: [
      { to: '/parts', label: 'All parts' },
      { to: '/parts/engine-parts', label: 'Engine parts' },
      { to: '/parts/transmission-parts', label: 'Transmission parts' },
    ],
  },
  {
    slug: 'engine-servicing',
    n: '07',
    title: 'Engine Servicing',
    original: 'Engine servicing',
    text: 'Diagnostics, servicing and overhauls for on-road, off-road, marine and industrial diesel engines, using up-to-date diagnostic tools and software.',
    points: ['FPT engine dealer', 'Marine & industrial', 'Systematic troubleshooting'],
    image: '/media/services/engine-servicing.webp',
    imageAlt: 'Technician inspecting a heavy vehicle engine in the workshop',
    practices: ['01', '03', '05'],
    related: [
      { to: '/products/fpt', label: 'FPT Industrial engines' },
      { to: '/parts/engine-parts', label: 'Engine parts' },
      { to: '/parts/oils-coolants', label: 'Oils & coolants' },
    ],
  },
  {
    slug: 'transmission-drivetrain',
    n: '08',
    title: 'Transmission & Drivetrain Solutions',
    original: 'Transmission & drivetrain',
    text: 'Allison automatic transmissions and Dana Spicer driveshafts and axles, supplied, serviced and rebuilt with authorised dealer and certified service centre support.',
    points: ['Allison authorised dealer', 'Dana Spicer certified', 'Genuine Reman options'],
    image: '/media/services/transmission-drivetrain.webp',
    imageAlt: 'Automatic transmission opened for rebuild on the workshop bench',
    practices: ['01', '02', '05'],
    related: [
      { to: '/products/allison', label: 'Allison Transmission' },
      { to: '/products/dana', label: 'Dana Spicer' },
      { to: '/parts/transmission-parts', label: 'Transmission parts' },
    ],
  },
]

export const partsCategories = [
  {
    slug: 'genuine-parts',
    title: 'Genuine Parts',
    summary: 'Genuine parts, kits and components from leading brands, all with warranty.',
    image: '/media/catalog/services/parts.webp',
    imageAlt: 'Genuine parts for heavy equipment',
  },
  {
    slug: 'engine-parts',
    title: 'Engine Parts',
    summary: 'FPT Industrial genuine engine parts, from filters and injectors to long blocks.',
    image: '/media/catalog/services/fpt-parts.webp',
    imageAlt: 'FPT Industrial genuine engine parts',
  },
  {
    slug: 'transmission-parts',
    title: 'Transmission Parts',
    summary: 'Allison, Twin Disc, ZF and Dana Spicer transmission and driveline parts.',
    image: '/media/catalog/products/allison-transmission.webp',
    imageAlt: 'Allison transmission and driveline parts',
  },
  {
    slug: 'oils-coolants',
    title: 'Oils & Coolants',
    summary: 'Allison Approved transmission fluids and FPT genuine oils and coolants.',
    image: '/media/catalog/services/approved.webp',
    imageAlt: 'Approved transmission fluids and coolants',
  },
  {
    slug: 'remanufactured',
    title: 'Remanufactured Parts',
    summary: 'Allison Genuine ReMan™ and FPT Original Reman, with factory warranty.',
    image: '/media/catalog/services/reman.webp',
    imageAlt: 'Remanufactured transmission and engine components',
  },
]

export const partsContent = {
  allisonGenuine: allisonSupport.genuine,
  allisonReman: allisonSupport.reman,
  allisonFluids: allisonSupport.fluids,
  allisonFluidsWhy: allisonSupport.fluidsWhy,
  fptGenuineParts,
  fptFluids,
  fptReman,
}

export const companyProfile = {
  intro: [
    'Yellow Equipment Services LLC is a trusted name in Oman’s heavy equipment industry, serving construction, mining, agriculture, marine, power generation and material handling.',
    'With a dedicated team of experienced professionals, we provide engines, generators, spare parts and service solutions backed by strong technical expertise and customer focus.',
    'Supported by a global sourcing network across Germany, Belgium, the UK, Italy, the USA, India and China, we deliver reliable, high-performance solutions built on quality, innovation and long-term customer trust.',
  ],
  vision:
    'To ensure the company’s continued leadership through increased diversification and growth while accelerating improvement in customer care and workforce competence level.',
  values: [
    {
      title: 'Integrity',
      text: 'We say what we mean, deliver what we promise, fulfil our commitments and stand for what is right. We are truthful in all our endeavours, honest and forthright with one another and with our customers, business partners and suppliers.',
    },
    { title: 'Professionalism', text: 'We act in a manner that is aligned to the highest standards.' },
    { title: 'Competence', text: 'We are punctual, effective and decisive in undertaking our responsibilities.' },
    {
      title: 'Respect & Tolerance',
      text: 'We treat one another with dignity and fairness, appreciating the diversity of our workforce and the uniqueness of each individual.',
    },
    { title: 'Trust', text: 'We build confidence through teamwork and open, candid communication.' },
    {
      title: 'Excellence',
      text: 'We always strive for perfection and do our part to make the communities in which we live and work better.',
    },
  ],
  why: [
    'We strictly follow all repair procedures according to the manufacturer’s guidelines.',
    'We follow manufacturers’ reusability guidelines to reduce parts usage without compromising quality.',
    'We follow a systematic approach and update diagnostic tools and software during troubleshooting for faster solutions.',
    'We provide warranty on all repairs and parts supplies.',
    'We use only authorised parts supply.',
    'We provide economical service solutions.',
    '24/7 quick service.',
    'A customer-centric approach is our strategy.',
  ],
  expertise:
    'Our field service engineers, specialists and management each have 10 to 25 years of experience in premium dealerships.',
}
