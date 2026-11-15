import Reveal from '../components/Reveal'
import { CheckList, ContactBand, LinkCard, PageHero, Section, usePageMeta } from '../components/site/ui'
import { fptBrand, fptCategories, fptConnected, fptGroups } from '../data/catalog/fpt'
import { supportImages } from '../data/catalog/images'

const aftermarket = [
  {
    to: '/parts/engine-parts#fpt',
    n: '01',
    title: 'Genuine Parts',
    text: '15 genuine part types, engineered to original specification, with 12 months warranty.',
    image: supportImages('fptGenuine')?.hero,
    imageAlt: 'FPT Industrial genuine parts',
    contain: true,
  },
  {
    to: '/parts/oils-coolants#fpt',
    n: '02',
    title: 'Oils & Coolants',
    text: 'Genuine fluids validated for change intervals extended by up to 50%.',
    image: supportImages('fptFluids')?.hero,
    imageAlt: 'FPT Industrial oils and coolants',
    contain: true,
  },
  {
    to: '/parts/remanufactured#fpt',
    n: '03',
    title: 'Original Reman',
    text: 'Remanufactured engines and components with a best-in-class 2-year warranty.',
    image: supportImages('fptReman')?.hero,
    imageAlt: 'FPT Industrial Original Reman',
    contain: true,
  },
]

const connectedImages = {
  'myfpt-app': supportImages('fptApp')?.hero,
  'remote-assistance': supportImages('fptRemote')?.hero,
  'proactive-assistance': supportImages('fptProactive')?.hero,
  'remote-master': supportImages('fptMaster')?.hero,
}

export default function FptIndex() {
  usePageMeta(
    'FPT Industrial',
    'FPT Industrial engine dealer for off-highway, marine and power generation. On-road, off-road, marine and FPT-IVECO generator ranges, genuine parts, oils and Original Reman.',
  )
  return (
    <>
      <PageHero
        crumbs={[{ to: '/', label: 'Home' }, { to: '/products', label: 'Products' }, { label: 'FPT Industrial' }]}
        n="03"
        kicker={fptBrand.role}
        title="FPT Industrial"
        intro={fptBrand.intro}
        image={fptBrand.image}
        imageAlt={fptBrand.imageAlt}
        logo={fptBrand.logo}
        facts={fptBrand.facts}
      />

      <Section tone="light" n="A" kicker="Powertrain technologies" title="From 42 hp to over 1,000 hp.">
        <div className="grid gap-10 lg:grid-cols-2">
          {fptBrand.body.map((paragraph) => (
            <Reveal key={paragraph}>
              <p className="text-lg leading-8 text-ink/80">{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {fptGroups.map((group, groupIndex) => {
        const categories = fptCategories.filter((item) => item.group === group.id)
        return (
          <Section
            key={group.id}
            id={group.id}
            n={String(groupIndex + 1).padStart(2, '0')}
            kicker="Engine ranges"
            title={group.title}
            tone={groupIndex % 2 ? 'panel' : 'dark'}
          >
            <div className="grid gap-x-4 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
              {categories.map((category) => {
                const models = category.series.reduce((sum, family) => sum + family.models.length, 0)
                return (
                  <LinkCard
                    key={category.slug}
                    to={`/products/fpt/${category.slug}`}
                    title={category.title}
                    text={category.summary}
                    meta={models ? `${category.series.length} families · ${models} engine models` : 'Diesel generator sets'}
                    image={category.image}
                    imageAlt={category.imageAlt}
                    contain={category.contain}
                  />
                )
              })}
            </div>
          </Section>
        )
      })}

      <Section tone="light" n="B" kicker="Aftermarket" title="Genuine parts, fluids and Original Reman.">
        <div className="grid gap-6 md:grid-cols-3">
          {aftermarket.map((item) => (
            <LinkCard key={item.to} tone="light" {...item} />
          ))}
        </div>
      </Section>

      <Section id="connected" n="C" kicker="Connected services" title="Digital support from FPT Industrial." intro="FPT Industrial’s connected services, as described by FPT. Availability is set by FPT per country.">
        <div className="grid gap-px bg-line md:grid-cols-2">
          {fptConnected.map((service, index) => (
            <article key={service.slug} id={service.slug} className="scroll-mt-28 overflow-hidden bg-ink">
              {connectedImages[service.slug] ? (
                <img src={connectedImages[service.slug]} alt={service.title} className="aspect-[16/9] w-full object-cover" loading="lazy" />
              ) : null}
              <div className="p-7">
                <p className="font-display text-xl text-yellow">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="mt-4 font-display text-3xl leading-none uppercase">{service.title}</h3>
                <p className="mt-4 text-sm leading-6 text-paper/80">{service.text}</p>
                <div className="mt-6">
                  <CheckList items={service.points} />
                </div>
                {service.availability ? (
                  <p className="mt-4 text-[11px] tracking-[0.14em] text-mist uppercase">Available in: {service.availability}</p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <ContactBand text="FPT engines for off-highway, marine and power generation, with genuine parts, fluids and service support in Oman." />
    </>
  )
}
