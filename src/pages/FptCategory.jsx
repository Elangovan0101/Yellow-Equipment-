import { Fragment } from 'react'
import { Link, useParams } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { Arrow, CheckList, ContactBand, PageHero, Section, SpecTable, usePageMeta } from '../components/site/ui'
import { fptCategories, fptGroups } from '../data/catalog/fpt'
import { fptCategoryImages } from '../data/catalog/images'
import NotFound from './NotFound'

export default function FptCategory() {
  const { slug } = useParams()
  const category = fptCategories.find((item) => item.slug === slug)
  const group = category ? fptGroups.find((item) => item.id === category.group) : null
  usePageMeta(
    category ? `FPT ${group.title.replace(' engines', '')}: ${category.title}` : 'Not found',
    category ? `${category.headline}. ${category.summary}` : undefined,
  )
  if (!category) return <NotFound />

  const photos = fptCategoryImages(category.slug)
  const hero = photos?.hero ?? category.image
  const siblings = fptCategories.filter((item) => item.group === category.group && item.slug !== category.slug)
  const modelCount = category.series.reduce((sum, family) => sum + family.models.length, 0)
  const powerUnit = category.series.some((family) => family.models.some((model) => model.power.includes('kWm'))) ? 'kWm' : 'kW'
  const pictured = category.series.flatMap((family) =>
    family.models.map((model) => ({ family: family.family, ...model })),
  )

  return (
    <>
      <PageHero
        crumbs={[
          { to: '/', label: 'Home' },
          { to: '/products', label: 'Products' },
          { to: '/products/fpt', label: 'FPT Industrial' },
          { to: `/products/fpt#${group.id}`, label: group.title },
          { label: category.title },
        ]}
        kicker={`FPT Industrial · ${group.title}`}
        title={category.title}
        intro={category.headline}
        image={hero}
        imageAlt={category.imageAlt}
        facts={category.facts}
      />

      <Section n="A" kicker="Overview" title={category.headline}>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-7">
            {category.intro.map((paragraph) => (
              <Reveal key={paragraph}>
                <p className="text-lg leading-8 text-paper/85">{paragraph}</p>
              </Reveal>
            ))}
          </div>
          {category.notes || category.shared ? (
            <Reveal className="space-y-5 lg:col-span-4 lg:col-start-9" delay={0.08}>
              {category.notes?.map((note) => (
                <p key={note} className="border-l-2 border-yellow pl-5 text-sm leading-6 text-paper/80">
                  {note}
                </p>
              ))}
              {category.shared?.map((note) => (
                <p key={note} className="text-sm leading-6 text-mist">
                  {note}
                </p>
              ))}
            </Reveal>
          ) : null}
        </div>
      </Section>

      {pictured.length ? (
        <Section tone="panel" n="A2" kicker="Engine series" title="Every engine in this range.">
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {pictured.map((item, index) => (
              <li key={`${item.family}-${item.model}-${item.power}-${index}`} className="overflow-hidden border border-line bg-ink-2">
                <div className="aspect-[4/3] bg-white">
                  {item.image ? (
                    <img src={item.image} alt={`FPT ${item.model}`} className="h-full w-full object-contain" loading="lazy" />
                  ) : null}
                </div>
                <div className="border-t border-line p-5">
                  <p className="text-[10px] tracking-[0.2em] text-yellow uppercase">{item.family}</p>
                  <h3 className="mt-2 font-display text-3xl leading-none uppercase">{item.model}</h3>
                  {item.power ? <p className="mt-2 text-sm text-mist">{item.power}</p> : null}
                </div>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {category.series.length ? (
        <Section
          tone="light"
          n="B"
          kicker="Engine series"
          title={`${modelCount} engine ${modelCount === 1 ? 'model' : 'models'} across ${category.series.length} ${category.series.length === 1 ? 'family' : 'families'}.`}
          intro={`Power output as listed for ${category.title.toLowerCase()} applications, in ${powerUnit === 'kWm' ? 'mechanical kilowatts (kWm)' : 'kilowatts (kW)'}.`}
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <caption className="sr-only">{`FPT ${category.title} engine series`}</caption>
              <thead>
                <tr className="border-b border-ink/25 text-[10px] tracking-[0.2em] text-ink/55 uppercase">
                  <th scope="col" className="w-1/4 py-4 pr-4 font-normal">
                    Family
                  </th>
                  <th scope="col" className="py-4 pr-4 font-normal">
                    Engine
                  </th>
                  <th scope="col" className="py-4 text-right font-normal">
                    Power output
                  </th>
                </tr>
              </thead>
              <tbody>
                {category.series.map((family) => (
                  <Fragment key={family.family}>
                    {family.models.map((model, modelIndex) => (
                      <tr key={`${family.family}-${model.model}-${model.power}-${modelIndex}`} className="border-b border-ink/10">
                        {modelIndex === 0 ? (
                          <th scope="rowgroup" rowSpan={family.models.length} className="py-4 pr-4 align-top font-display text-3xl font-normal text-yellow-2 uppercase">
                            {family.family}
                          </th>
                        ) : null}
                        <th scope="row" className="py-4 pr-4 font-display text-2xl font-normal uppercase">
                          {model.model}
                        </th>
                        <td className="py-4 text-right font-display text-2xl tracking-wide">{model.power || '—'}</td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      ) : null}

      {category.genset ? (
        <>
          <Section tone="light" n="B" kicker="Main features" title="Tested before every delivery.">
            <div className="grid gap-12 lg:grid-cols-2">
              <Reveal>
                <p className="text-lg leading-8 text-ink/80">{category.genset.testing}</p>
                <p className="mt-6 text-sm leading-6 text-ink/70">{category.genset.silent}</p>
              </Reveal>
              <Reveal delay={0.08}>
                <SpecTable tone="light" caption="At a glance" rows={category.facts} />
              </Reveal>
            </div>
          </Section>
          <Section n="C" kicker="Standard equipment" title="Supplied complete.">
            <div className="grid gap-12 lg:grid-cols-2">
              <CheckList items={category.genset.standard} />
              <div>
                <p className="mb-4 text-[11px] tracking-[0.22em] text-yellow uppercase">Options</p>
                <CheckList items={category.genset.options} />
              </div>
            </div>
          </Section>
          <Section tone="panel" n="D" kicker="Why FPT IVECO generators" title="Benefits and unique features.">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <p className="mb-4 text-[11px] tracking-[0.22em] text-yellow uppercase">Benefits</p>
                <CheckList items={category.genset.benefits} />
              </div>
              <div>
                <p className="mb-4 text-[11px] tracking-[0.22em] text-yellow uppercase">Unique features</p>
                <CheckList items={category.genset.unique} />
              </div>
            </div>
          </Section>
        </>
      ) : null}

      {siblings.length ? (
        <Section tone="panel" kicker="Related" n="E">
          <ul className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {siblings.map((item) => (
              <li key={item.slug} className="bg-ink-2">
                <Link to={`/products/fpt/${item.slug}`} className="group flex items-center justify-between gap-3 p-6 font-display text-2xl uppercase transition-colors hover:text-yellow">
                  {item.title}
                  <Arrow className="h-4 w-4 shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <ContactBand text={`Ask our team about FPT ${category.title.toLowerCase()} engines, parts and service support in Oman.`} />
    </>
  )
}
