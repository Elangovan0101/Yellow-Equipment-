import { Link, useParams } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { Arrow, ContactBand, PageHero, Section, usePageMeta } from '../components/site/ui'
import { danaApplications, danaProductName, danaProductType, danaProductTypes } from '../data/catalog/dana'
import { danaApplicationImages } from '../data/catalog/images'
import NotFound from './NotFound'

const BRANDS = ['Spicer', 'Graziano', 'Brevini', 'Dana TM4', 'OpenECU']

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function DanaApplication() {
  const { slug } = useParams()
  const index = danaApplications.findIndex((item) => item.slug === slug)
  const app = danaApplications[index]
  usePageMeta(app ? `Dana Spicer ${app.title}` : 'Not found', app ? `Dana Spicer drivetrain products for ${app.title.toLowerCase()}: ${app.summary}` : undefined)
  if (!app) return <NotFound />

  const brands = BRANDS.filter((brand) => app.products.some((name) => name.includes(brand)))
  const types = danaProductTypes
    .map((type) => ({ ...type, products: app.products.filter((name) => danaProductType(name) === type.id) }))
    .filter((type) => type.products.length)
  const photos = danaApplicationImages(app.slug)
  const hero = photos?.hero ?? app.image

  return (
    <>
      <PageHero
        crumbs={[
          { to: '/', label: 'Home' },
          { to: '/products', label: 'Products' },
          { to: '/products/dana', label: 'Dana Spicer' },
          { label: app.title },
        ]}
        n={String(index + 1).padStart(2, '0')}
        kicker="Dana Spicer application"
        title={app.title}
        intro={app.summary}
        image={hero}
        imageAlt={app.imageAlt}
        facts={[
          { label: 'Machine types', value: String(app.machines.length) },
          { label: 'Products listed', value: String(app.products.length) },
          { label: 'Product types', value: String(types.length) },
          { label: 'Brands', value: brands.join(' · ') },
        ]}
      />

      <Section n="A" kicker="Machines & drivetrain products" title={app.machines.length > 1 ? 'Products by machine.' : 'Products for this application.'}>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.28fr)_minmax(0,1fr)]">
          {app.machines.length > 1 ? (
            <nav aria-label="Machines" className="lg:sticky lg:top-28 lg:self-start">
              <ol className="border-t border-line">
                {app.machines.map((machine, machineIndex) => (
                  <li key={machine.machine} className="border-b border-line">
                    <a href={`#${slugify(machine.machine)}`} className="group flex items-baseline gap-4 py-3 transition-colors hover:text-yellow">
                      <span className="font-display text-base text-yellow">{String(machineIndex + 1).padStart(2, '0')}</span>
                      <span className="font-display text-xl uppercase">{machine.machine}</span>
                      <span className="ml-auto text-[10px] tracking-[0.18em] text-mist">{machine.products.length}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
          <div className={`space-y-16 ${app.machines.length > 1 ? '' : 'lg:col-span-2'}`}>
            {app.machines.map((machine, machineIndex) => (
              <Reveal key={machine.machine}>
                <article id={slugify(machine.machine)} className="scroll-mt-28">
                  <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line pb-4">
                    <h3 className="font-display text-4xl leading-none uppercase">
                      <span className="mr-4 text-yellow">{String(machineIndex + 1).padStart(2, '0')}</span>
                      {machine.machine}
                    </h3>
                    <p className="text-[10px] tracking-[0.2em] text-mist uppercase">{machine.products.length} products</p>
                  </div>
                  <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {machine.products.map((product) => {
                      const name = danaProductName(product)
                      const image = typeof product === 'string' ? null : product.image
                      const type = danaProductTypes.find((item) => item.id === danaProductType(name))
                      return (
                        <li key={`${machine.machine}-${name}`} className="overflow-hidden border border-line bg-ink-2">
                          <div className="aspect-[4/3] bg-white">
                            {image ? (
                              <img src={image} alt={name} className="h-full w-full object-contain" loading="lazy" />
                            ) : null}
                          </div>
                          <div className="border-t border-line px-4 py-3">
                            <p className="text-[9px] tracking-[0.2em] text-yellow uppercase">{type?.title}</p>
                            <p className="mt-1 text-sm leading-snug text-paper/90">{name}</p>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="light" n="B" kicker="By product type" title={`The ${app.title.toLowerCase()} drivetrain range.`}>
        <ul className="grid gap-8 border-t border-ink/15 md:grid-cols-2 md:gap-x-10 xl:grid-cols-4">
          {types.map((type) => (
            <li key={type.id} className="border-t border-ink/15 pt-6 md:border-t-0 md:pt-8">
              <p className="font-display text-xl text-yellow-2">{String(type.products.length).padStart(2, '0')}</p>
              <h3 className="mt-4 font-display text-2xl leading-none uppercase">{type.title}</h3>
              <ul className="mt-4 space-y-1.5 text-sm text-ink/75">
                {type.products.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="panel" kicker="Other applications" n="C">
        <ul className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-5">
          {danaApplications
            .filter((item) => item.slug !== app.slug)
            .map((item) => (
              <li key={item.slug} className="bg-ink-2">
                <Link to={`/products/dana/${item.slug}`} className="group flex items-center justify-between gap-3 p-6 font-display text-2xl uppercase transition-colors hover:text-yellow">
                  {item.title}
                  <Arrow className="h-4 w-4 shrink-0" />
                </Link>
              </li>
            ))}
        </ul>
      </Section>

      <ContactBand text={`Ask our team about Spicer drivetrain parts and service for ${app.title.toLowerCase()} machines.`} />
    </>
  )
}
