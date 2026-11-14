import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { Arrow, ContactBand, PageHero, Section, usePageMeta } from '../components/site/ui'
import { allisonBrand, allisonFamilies } from '../data/catalog/allison'
import { danaApplications, danaBrand } from '../data/catalog/dana'
import { fptBrand, fptCategories } from '../data/catalog/fpt'
import { productMenu } from '../data/catalog/navigation'
import { otherEquipment } from '../data/catalog/site'

const brands = [
  { ...allisonBrand, to: '/products/allison', count: `${allisonFamilies.length} product families` },
  { ...danaBrand, to: '/products/dana', count: `${danaApplications.length} applications` },
  { ...fptBrand, to: '/products/fpt', count: `${fptCategories.length} engine & generator ranges` },
]

export default function ProductsIndex() {
  usePageMeta(
    'Products',
    'Allison Transmission, Dana Spicer and FPT Industrial products, plus parts and support for Caterpillar, Cummins, Komatsu, Kenworth, mobile crushers and underground machinery.',
  )
  return (
    <>
      <PageHero
        crumbs={[{ to: '/', label: 'Home' }, { label: 'Products' }]}
        kicker="Dealerships & certifications"
        title="Products"
        intro="Authorised dealer for Allison Transmission in Oman, Dana Spicer Certified Service Centre for the Middle East and FPT Industrial engine dealer for off-highway, marine and power generation."
        image="/media/heavy-equipment.webp"
        imageAlt="Mining shovel loading a haul truck"
        facts={[
          { label: 'Allison Transmission', value: allisonBrand.role },
          { label: 'Dana Spicer', value: danaBrand.role },
          { label: 'FPT Industrial', value: 'Engine Dealer' },
        ]}
      />

      {brands.map((brand, index) => {
        const menu = productMenu[index]
        return (
          <Section key={brand.slug} id={brand.slug} tone={index % 2 ? 'light' : 'dark'}>
            <div className="grid gap-10 lg:grid-cols-12">
              <Reveal className="lg:col-span-5">
                <Link to={brand.to} className="group block">
                  <span className={`relative block aspect-[4/3] overflow-hidden ${brand.contain ? 'bg-white' : 'bg-ink-2'}`}>
                    <img
                      src={brand.image}
                      alt={brand.imageAlt}
                      loading="lazy"
                      className={`h-full w-full transition-transform duration-700 group-hover:scale-[1.04] ${brand.contain ? 'object-contain p-8' : 'object-cover'}`}
                    />
                  </span>
                </Link>
              </Reveal>
              <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.06}>
                <p className={`text-[11px] tracking-[0.28em] uppercase ${index % 2 ? 'text-yellow-2' : 'text-yellow'}`}>
                  {String(index + 1).padStart(2, '0')} · {brand.role}
                </p>
                <h2 className="mt-4 font-display text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.9] font-bold uppercase">
                  <Link to={brand.to} className={index % 2 ? 'hover:text-yellow-2' : 'hover:text-yellow'}>
                    {brand.name}
                  </Link>
                </h2>
                <p className={`mt-5 text-base leading-7 ${index % 2 ? 'text-ink/75' : 'text-paper/80'}`}>{brand.intro}</p>
                <p className={`mt-6 text-[10px] tracking-[0.2em] uppercase ${index % 2 ? 'text-ink/50' : 'text-mist'}`}>{brand.count}</p>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {menu.groups.map((group) => (
                    <div key={group.title}>
                      <p className={`mb-2 text-[10px] tracking-[0.2em] uppercase ${index % 2 ? 'text-ink/50' : 'text-mist'}`}>{group.title}</p>
                      <ul className="space-y-1">
                        {group.links.map((link) => (
                          <li key={link.to}>
                            <Link
                              to={link.to}
                              className={`group inline-flex items-center gap-2 font-display text-lg uppercase transition-colors ${index % 2 ? 'hover:text-yellow-2' : 'hover:text-yellow'}`}
                            >
                              {link.label}
                              <Arrow className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </Section>
        )
      })}

      <Section n="04" kicker="Other equipment" title="Equipment we support." intro={otherEquipment.intro}>
        <ul className="grid grid-cols-2 gap-px bg-line sm:grid-cols-3 lg:grid-cols-6">
          {otherEquipment.brands.map((brand) => (
            <li key={brand} className="flex min-h-20 items-end bg-ink p-4 font-display text-lg leading-none uppercase">
              {brand}
            </li>
          ))}
        </ul>
        <Link
          to="/products/other"
          className="group mt-10 inline-flex items-center gap-3 border-b border-paper/30 pb-1 font-display text-sm tracking-[0.16em] uppercase transition-colors hover:border-yellow hover:text-yellow"
        >
          Other equipment
          <Arrow className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </Section>

      <ContactBand />
    </>
  )
}
