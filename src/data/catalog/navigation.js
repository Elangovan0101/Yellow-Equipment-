import { allisonFamilies, allisonGroups } from './allison'
import { danaApplications } from './dana'
import { fptCategories, fptGroups } from './fpt'
import { services } from './site'

export const productMenu = [
  {
    title: 'Allison Transmission',
    to: '/products/allison',
    groups: allisonGroups.map((group) => ({
      title: group.title,
      links: allisonFamilies
        .filter((family) => family.group === group.id)
        .map((family) => ({ to: `/products/allison/${family.slug}`, label: family.short })),
    })),
  },
  {
    title: 'Dana Spicer',
    to: '/products/dana',
    groups: [
      {
        title: 'Applications',
        links: danaApplications.map((item) => ({ to: `/products/dana/${item.slug}`, label: item.title })),
      },
    ],
  },
  {
    title: 'FPT Industrial',
    to: '/products/fpt',
    groups: fptGroups.map((group) => ({
      title: group.title,
      links: fptCategories
        .filter((category) => category.group === group.id)
        .map((category) => ({ to: `/products/fpt/${category.slug}`, label: category.title })),
    })),
  },
  {
    title: 'Other Equipment',
    to: '/products/other',
    groups: [
      {
        title: 'Equipment we support',
        links: [
          { to: '/products/other#caterpillar-cummins-komatsu', label: 'Caterpillar, Cummins & Komatsu' },
          { to: '/products/other#kenworth-trucks', label: 'Kenworth Trucks' },
          { to: '/products/other#mobile-crushers', label: 'Mobile Crushers' },
          { to: '/products/other#underground-machinery', label: 'Underground Machinery' },
          { to: '/products/other#brands', label: 'All supported brands' },
        ],
      },
    ],
  },
]

export const serviceMenu = services.map((item) => ({ to: `/services/${item.slug}`, label: item.title, n: item.n }))

export const partsMenu = [
  { to: '/parts#engine-sales', label: 'Engine sales' },
  { to: '/parts#parts-sales', label: 'Parts sales' },
  { to: '/parts#transmission-sales', label: 'Transmission sales' },
]

export const primaryNav = [
  { to: '/', label: 'Home', match: 'home' },
  { to: '/company', label: 'Company', match: '/company' },
  { label: 'Products', menu: 'products', match: '/products', to: '/products' },
  { label: 'Services', menu: 'services', match: '/services', to: '/services' },
  { to: '/parts', label: 'Parts', match: '/parts' },
  { to: '/#industries', label: 'Industries', match: '#industries' },
  { to: '/#contact', label: 'Contact', match: '#contact' },
]
