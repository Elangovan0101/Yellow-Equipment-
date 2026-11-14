import { danaMachines } from './source'

export const danaBrand = {
  slug: 'dana',
  name: 'Dana Spicer',
  role: 'Certified Service Centre, Middle East',
  logo: '/brand/dana-spicer.webp',
  image: '/media/catalog/products/construct.webp',
  imageAlt: 'Dana Spicer drivetrain components for construction equipment',
  intro:
    'For more than a century, Dana Spicer has been a trusted global leader in drivetrain solutions, delivering rugged performance, higher efficiency and long-lasting durability for vehicles operating in the toughest conditions.',
  body: [
    'From axles and driveshafts to advanced e-Propulsion technologies, Spicer products are engineered to reduce downtime, improve productivity and ensure reliable power delivery across every application.',
    'We supply a complete range of genuine Spicer drivetrain parts and components at competitive prices, backed by dependable global service and support, for light vehicles, commercial vehicles, off-highway machinery, construction equipment, agriculture machines and more.',
  ],
  facts: [
    { label: 'Engineering heritage', value: '120+ years' },
    { label: 'Markets', value: '100+ countries' },
    { label: 'Our status', value: 'Certified Service Centre, Middle East' },
  ],
  wideRanging:
    'Whether equipment is in constant motion or working hard in one spot, Dana’s integrated drivetrain and motion systems ensure peak efficiency.',
  industrial: {
    text: 'Global experience and local expertise converge with extensive knowledge in several industrial market sectors. Dana Industrial benefits from the experience of key brands fully integrated into Dana Incorporated, and brings that expertise to the local level through more than 100 strategically located facilities.',
    sectors: ['Bulk Materials', 'Environment, Energy & Recycling', 'Heavy Industrial', 'Marine', 'Plastic and Rubber', 'Stationary'],
    link: 'https://www.dana-industrial.com/',
  },
}

export const danaProductTypes = [
  { id: 'driveshafts', title: 'Driveshafts', test: /Driveshaft/ },
  { id: 'axles', title: 'Axles', test: /(?<!e-)Axle(?!.*e-Axle)/ },
  { id: 'transmissions', title: 'Transmissions', test: /^Spicer® (Hydrostatic|Powershift|Powersplit)/ },
  { id: 'torque-hubs', title: 'Torque hubs & wheel drives', test: /Torque-Hub™ (?!eS)|Wheel Drive/ },
  { id: 'gears', title: 'Gears & shifting', test: /Graziano/ },
  { id: 'electrified', title: 'Electrified drivetrain', test: /Electrified™|e-Axle|e-Hub|Electrodynamic|TM4/ },
  { id: 'power-electronics', title: 'Inverters & controllers', test: /Inverter|OpenECU/ },
  { id: 'motion', title: 'Motion, sensing & control', test: /Brevini|Pump Drive/ },
]

export function danaProductType(name) {
  const type = danaProductTypes.find((item) => item.test.test(name))
  return type ? type.id : 'motion'
}

const applicationMeta = [
  {
    slug: 'construction',
    title: 'Construction',
    summary: 'Telehandlers, loaders, excavators, graders, compactors, dumpers and cranes.',
    image: '/media/catalog/products/construct.webp',
    imageAlt: 'Heavy construction trucks on a site road',
  },
  {
    slug: 'agriculture',
    title: 'Agriculture',
    summary: 'Tractors, telehandlers, sprayers, windrowers, mixers, mowers and harvesters.',
    image: '/media/catalog/products/agricult.webp',
    imageAlt: 'Spicer drivetrain components',
  },
  {
    slug: 'material-handling',
    title: 'Material Handling',
    summary: 'Lift trucks, container handlers, reach stackers, tyre cranes and ground support.',
    image: '/media/catalog/products/material.webp',
    imageAlt: 'Heavy vehicle on workshop stands',
  },
  {
    slug: 'mining',
    title: 'Mining',
    summary: 'Drill rigs, load haul dumpers, sprayers and underground mining trucks.',
    image: '/media/catalog/products/mining.webp',
    imageAlt: 'Mining shovel loading a haul truck',
  },
  {
    slug: 'forestry',
    title: 'Forestry',
    summary: 'Driveshafts, torque hubs, transmissions, axles and gearing for forestry machines.',
    image: '/media/catalog/products/forestry.webp',
    imageAlt: 'Heavy machine working on a terraced site',
  },
  {
    slug: 'specialty-electric',
    title: 'Specialty Electric',
    summary: 'Electrified gearboxes, transaxles, inverters and controllers for utility vehicles.',
    image: '/media/catalog/products/electric.webp',
    imageAlt: 'Drivetrain assemblies in the workshop',
  },
]

export function danaProductName(product) {
  return typeof product === 'string' ? product : product.name
}

export const danaApplications = applicationMeta.map((item) => {
  const machines = danaMachines[item.slug]
  const products = [...new Set(machines.flatMap((machine) => machine.products.map(danaProductName)))]
  return { ...item, machines, products }
})
