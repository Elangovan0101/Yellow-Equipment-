import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { Chips, ContactBand, LinkCard, PageHero, Section, usePageMeta } from '../components/site/ui'
import { danaApplications, danaBrand, danaProductType, danaProductTypes } from '../data/catalog/dana'

export default function DanaIndex() {
  usePageMeta(
    'Dana Spicer',
    'Dana Spicer Certified Service Centre for the Middle East. Spicer driveshafts, axles, transmissions, torque hubs and electrified drivetrains for construction, agriculture, material handling, mining, forestry and specialty electric.',
  )
  const products = [...new Set(danaApplications.flatMap((app) => app.products))]
  const byType = danaProductTypes
    .map((type) => ({ ...type, products: products.filter((name) => danaProductType(name) === type.id) }))
    .filter((type) => type.products.length)

  return (
    <>
      <PageHero
        crumbs={[{ to: '/', label: 'Home' }, { to: '/products', label: 'Products' }, { label: 'Dana Spicer' }]}
        n="02"
        kicker={danaBrand.role}
        title="Dana Spicer"
        intro={danaBrand.intro}
        image={danaBrand.image}
        imageAlt={danaBrand.imageAlt}
        logo={danaBrand.logo}
        facts={[
          ...danaBrand.facts,
          { label: 'Applications', value: String(danaApplications.length) },
          { label: 'Machine types', value: String(danaApplications.reduce((sum, app) => sum + app.machines.length, 0)) },
          { label: 'Products listed', value: String(products.length) },
        ]}
      />

      <Section tone="light" n="A" kicker="Drivetrain leadership" title="Rugged performance in the toughest conditions.">
        <div className="grid gap-10 lg:grid-cols-2">
          {danaBrand.body.map((paragraph) => (
            <Reveal key={paragraph}>
              <p className="text-lg leading-8 text-ink/80">{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section n="B" kicker="Wide-ranging applications" title="Choose your application." intro={danaBrand.wideRanging}>
        <div className="grid gap-x-4 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
          {danaApplications.map((app, index) => (
            <LinkCard
              key={app.slug}
              to={`/products/dana/${app.slug}`}
              n={String(index + 1).padStart(2, '0')}
              title={app.title}
              text={app.summary}
              meta={`${app.machines.length} machine ${app.machines.length === 1 ? 'type' : 'types'} · ${app.products.length} products`}
              image={app.image}
              imageAlt={app.imageAlt}
            />
          ))}
        </div>
      </Section>

      <Section
        tone="panel"
        n="C"
        kicker="Product × application"
        title="Where each product is used."
        intro="Every product listed across the six Dana Spicer applications, grouped by type. A mark shows the applications where the product is listed."
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] border-collapse text-left">
            <caption className="sr-only">Dana Spicer products by application</caption>
            <thead>
              <tr className="border-b border-line text-[10px] tracking-[0.18em] text-mist uppercase">
                <th scope="col" className="py-4 pr-4 font-normal">
                  Product
                </th>
                {danaApplications.map((app) => (
                  <th key={app.slug} scope="col" className="w-[11%] px-2 py-4 text-center font-normal">
                    <Link to={`/products/dana/${app.slug}`} className="hover:text-yellow">
                      {app.title}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            {byType.map((type) => (
              <tbody key={type.id}>
                <tr>
                  <th colSpan={danaApplications.length + 1} scope="colgroup" className="pt-8 pb-3 text-left font-display text-2xl font-normal text-yellow uppercase">
                    {type.title}
                  </th>
                </tr>
                {type.products.map((name) => (
                  <tr key={name} className="border-b border-line/70">
                    <th scope="row" className="py-3 pr-4 text-sm font-normal text-paper/90">
                      {name}
                    </th>
                    {danaApplications.map((app) => {
                      const listed = app.products.includes(name)
                      return (
                        <td key={app.slug} className="px-2 py-3 text-center">
                          {listed ? (
                            <span className="inline-block h-2 w-2 bg-yellow" role="img" aria-label={`Listed for ${app.title}`} />
                          ) : (
                            <span className="text-line" aria-hidden="true">
                              ·
                            </span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </Section>

      <Section tone="light" n="D" kicker="Dana Industrial" title="Industrial market sectors." intro={danaBrand.industrial.text}>
        <Chips tone="light" items={danaBrand.industrial.sectors} />
        <a
          href={danaBrand.industrial.link}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-3 border-b border-ink/30 pb-1 font-display text-sm tracking-[0.16em] uppercase hover:border-yellow-2 hover:text-yellow-2"
        >
          Visit Dana Industrial
          <span aria-hidden="true">↗</span>
        </a>
      </Section>

      <ContactBand text="Genuine Spicer drivetrain parts and components at competitive prices, backed by our Certified Service Centre status for the Middle East." />
    </>
  )
}
