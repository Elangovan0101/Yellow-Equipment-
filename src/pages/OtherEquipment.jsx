import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { Arrow, ContactBand, PageHero, Section, TextLink, usePageMeta } from '../components/site/ui'
import { equipment } from '../data/content'
import { otherEquipment, services } from '../data/catalog/site'

const details = {
  '01': { id: 'caterpillar-cummins-komatsu', links: [{ to: '/products/allison', label: 'Allison Transmission' }, { to: '/parts/genuine-parts', label: 'Genuine parts' }] },
  '02': { id: 'kenworth-trucks', links: [{ to: '/parts/genuine-parts', label: 'Genuine parts' }, { to: '/services/field-repairs', label: 'Field repairs' }] },
  '03': { id: 'mobile-crushers', links: [{ to: '/products/fpt/power-units', label: 'FPT power units' }, { to: '/services/component-rebuilds', label: 'Component rebuilds' }] },
  '04': { id: 'dana-spicer', links: [{ to: '/products/dana', label: 'Dana Spicer' }, { to: '/parts/transmission-parts#dana', label: 'Drivetrain parts' }] },
  '05': { id: 'underground-machinery', links: [{ to: '/products/dana/mining', label: 'Dana Spicer mining' }, { to: '/services/component-rebuilds', label: 'Component rebuilds' }] },
  '06': { id: 'fpt-marine-generators', links: [{ to: '/products/fpt#marine', label: 'FPT marine' }, { to: '/products/fpt/power-generation', label: 'Generator range' }] },
}

const WEBP = ['heavy-equipment', 'kenworth-trucks', 'mobile-crusher', 'drivetrain-components', 'underground-machine']

function webp(src) {
  return WEBP.some((name) => src.includes(`/${name}.`)) ? src.replace(/\.(png|jpg)$/, '.webp') : src
}

export default function OtherEquipment() {
  usePageMeta(
    'Other Equipment',
    'Parts and service support for Caterpillar, Cummins, Komatsu, Volvo, JCB, port equipment, Kenworth, Oshkosh, Astra, Iveco and Volvo trucks, Manitou, mobile crushers and underground machinery.',
  )
  return (
    <>
      <PageHero
        crumbs={[{ to: '/', label: 'Home' }, { to: '/products', label: 'Products' }, { label: 'Other Equipment' }]}
        n="04"
        kicker="We are specialised in"
        title="Other Equipment"
        intro={otherEquipment.intro}
        image="/media/catalog/banners/other.webp"
        imageAlt="Other equipment and vehicle brands we support"
        facts={[
          { label: 'Brands supported', value: String(otherEquipment.brands.length) },
          { label: 'Product categories', value: String(equipment.length) },
          { label: 'GETs & undercarriage', value: 'Through BeneParts' },
        ]}
      />

      <Section n="A" kicker="Products we specialise in" title="Six product categories.">
        <div className="space-y-px bg-line">
          {equipment.map((item, index) => {
            const detail = details[item.n]
            const contain = item.fit === 'contain'
            return (
              <article key={item.n} id={detail.id} className="grid scroll-mt-24 gap-8 bg-ink py-10 lg:grid-cols-12 lg:items-center">
                <Reveal className={`lg:col-span-5 ${index % 2 ? 'lg:order-2 lg:col-start-8' : ''}`}>
                  <div className={`aspect-[4/3] overflow-hidden ${contain ? 'bg-white' : 'bg-ink-2'}`}>
                    <img src={webp(item.image)} alt={item.imageAlt} loading="lazy" className={`h-full w-full ${contain ? 'object-contain p-8' : 'object-cover'}`} />
                  </div>
                </Reveal>
                <Reveal className={`lg:col-span-6 ${index % 2 ? 'lg:order-1' : 'lg:col-start-7'}`} delay={0.06}>
                  <p className="font-display text-2xl text-yellow">{item.n}</p>
                  <h2 className="mt-3 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[0.92] font-bold uppercase">{item.title}</h2>
                  <p className="mt-5 max-w-xl text-base leading-7 text-paper/80">{item.text}</p>
                  <div className="mt-7 flex flex-wrap gap-6">
                    {detail.links.map((link) => (
                      <TextLink key={link.to} to={link.to}>
                        {link.label}
                      </TextLink>
                    ))}
                  </div>
                </Reveal>
              </article>
            )
          })}
        </div>
      </Section>

      <Section id="brands" tone="light" n="B" kicker="Brands" title="Equipment & vehicle brands we support.">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {otherEquipment.brands.map((brand) => (
            <li key={brand} className="flex min-h-24 items-end border border-ink/15 bg-white p-4 font-display text-xl leading-none uppercase">
              {brand}
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-2xl border-l-2 border-yellow-2 pl-5 text-lg leading-8 text-ink/80">{otherEquipment.beneparts}</p>
      </Section>

      <Section n="C" kicker="Our services include" title="Supported end to end.">
        <ul className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((service) => (
            <li key={service.slug} className="bg-ink">
              <Link to={`/services/${service.slug}`} className="group flex h-full items-center justify-between gap-4 p-6 transition-colors hover:text-yellow">
                <span className="flex items-baseline gap-4">
                  <span className="font-display text-lg text-yellow">{service.n}</span>
                  <span className="font-display text-2xl leading-none uppercase">{service.title}</span>
                </span>
                <Arrow className="h-4 w-4 shrink-0" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <ContactBand />
    </>
  )
}
