import { Link, useParams } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { Arrow, CheckList, ContactBand, PageHero, Section, SpecTable, TextLink, usePageMeta } from '../components/site/ui'
import { allisonBrand, allisonSupport } from '../data/catalog/allison'
import { danaBrand } from '../data/catalog/dana'
import { fptFluids, fptGenuineParts, fptReman } from '../data/catalog/fpt'
import { partsBrands, partsCategories, partsIntro, partsWarranty } from '../data/catalog/site'
import NotFound from './NotFound'

function Lead({ children, tone = 'dark' }) {
  return (
    <Reveal>
      <p className={`max-w-3xl text-lg leading-8 ${tone === 'light' ? 'text-ink/80' : 'text-paper/85'}`}>{children}</p>
    </Reveal>
  )
}

function SubHeading({ children, tone = 'dark' }) {
  return <p className={`mb-4 text-[11px] tracking-[0.22em] uppercase ${tone === 'light' ? 'text-yellow-2' : 'text-yellow'}`}>{children}</p>
}

function ItemGrid({ items, tone = 'dark' }) {
  const light = tone === 'light'
  return (
    <ul className={`grid sm:grid-cols-2 xl:grid-cols-3 ${light ? 'gap-6' : 'gap-px bg-line'}`}>
      {items.map((item, index) => (
        <li key={item.name} className={`p-6 ${light ? 'border border-ink/15 bg-white' : 'bg-ink'}`}>
          <p className={`font-display text-lg ${light ? 'text-yellow-2' : 'text-yellow'}`}>{String(index + 1).padStart(2, '0')}</p>
          <h3 className="mt-3 font-display text-2xl leading-none uppercase">{item.name}</h3>
          <p className={`mt-3 text-sm leading-6 ${light ? 'text-ink/70' : 'text-mist'}`}>{item.text}</p>
        </li>
      ))}
    </ul>
  )
}

function AllisonComparison() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] border-collapse text-left">
        <caption className="sr-only">Allison Genuine Parts compared with non-genuine parts</caption>
        <thead>
          <tr className="border-b border-ink/25 text-[10px] tracking-[0.2em] text-ink/55 uppercase">
            <th scope="col" className="py-4 pr-4 font-normal">
              Category
            </th>
            <th scope="col" className="w-36 py-4 text-center font-normal">
              Allison Genuine
            </th>
            <th scope="col" className="w-36 py-4 text-center font-normal">
              Non-genuine
            </th>
          </tr>
        </thead>
        <tbody>
          {allisonSupport.genuine.comparison.map((row) => (
            <tr key={row} className="border-b border-ink/10">
              <th scope="row" className="py-4 pr-4 text-sm font-normal text-ink/85">
                {row}
              </th>
              <td className="py-4 text-center font-display text-xl text-yellow-2">
                <span aria-label="Yes">✓</span>
              </td>
              <td className="py-4 text-center font-display text-xl text-ink/35">
                <span aria-label="No">✕</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function BrandGrid() {
  return (
    <ul className="grid grid-cols-2 gap-px bg-line sm:grid-cols-3 lg:grid-cols-7">
      {partsBrands.map((brand) => (
        <li key={brand} className="flex min-h-20 items-end bg-ink p-4 font-display text-lg leading-none uppercase">
          {brand}
        </li>
      ))}
    </ul>
  )
}

function GenuineParts() {
  return (
    <>
      <Section n="A" kicker="Genuine parts, kits & components" title="Sourced worldwide, held in stock.">
        <div className="grid gap-10 lg:grid-cols-2">
          {partsIntro.map((paragraph) => (
            <Lead key={paragraph}>{paragraph}</Lead>
          ))}
        </div>
        <div className="mt-12">
          <BrandGrid />
        </div>
      </Section>
      <Section id="allison" tone="light" n="B" kicker="Allison Transmission" title={allisonSupport.genuine.title}>
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <Lead tone="light">{allisonSupport.genuine.text}</Lead>
            <div>
              <SubHeading tone="light">One stop shop</SubHeading>
              <p className="text-sm leading-6 text-ink/75">{allisonSupport.genuine.oneStop}</p>
            </div>
          </div>
          <AllisonComparison />
        </div>
      </Section>
      <Section id="fpt" n="C" kicker="FPT Industrial" title="FPT genuine parts.">
        <div className="grid gap-12 lg:grid-cols-2">
          <Lead>{fptGenuineParts.text}</Lead>
          <div>
            <CheckList items={fptGenuineParts.benefits} />
            <div className="mt-8">
              <TextLink to="/parts/engine-parts#fpt">All {fptGenuineParts.items.length} FPT part types</TextLink>
            </div>
          </div>
        </div>
      </Section>
      <Section id="dana" tone="panel" n="D" kicker="Dana Spicer" title="Genuine Spicer drivetrain parts.">
        <div className="grid gap-12 lg:grid-cols-2">
          <Lead>{danaBrand.body[1]}</Lead>
          <div>
            <TextLink to="/products/dana">Dana Spicer applications</TextLink>
          </div>
        </div>
      </Section>
    </>
  )
}

function EngineParts() {
  return (
    <>
      <Section id="fpt" n="A" kicker="FPT Industrial genuine parts" title={`${fptGenuineParts.items.length} genuine part types.`} intro={fptGenuineParts.text}>
        <ItemGrid items={fptGenuineParts.items} />
      </Section>
      <Section tone="light" n="B" kicker="Why genuine" title="Engineered by FPT Industrial.">
        <div className="grid gap-12 lg:grid-cols-2">
          <CheckList tone="light" items={fptGenuineParts.benefits} />
          <div className="space-y-6">
            <p className="text-lg leading-8 text-ink/80">
              As the FPT Industrial engine dealer for off-highway, marine and power generation, we supply FPT engines alongside their genuine parts, fluids and Original Reman
              components.
            </p>
            <TextLink tone="light" to="/products/fpt">
              FPT engine ranges
            </TextLink>
          </div>
        </div>
      </Section>
      <Section n="C" kicker="Other engine brands" title="Parts across leading brands." intro="Our parts range covers, but is not limited to, these brands.">
        <BrandGrid />
      </Section>
    </>
  )
}

function TransmissionParts() {
  const { coverage } = allisonSupport
  return (
    <>
      <Section id="allison" n="A" kicker="Allison Transmission · Authorised Dealer, Oman" title="Allison spare parts & accessories.">
        <div className="grid gap-12 lg:grid-cols-2">
          <Lead>{allisonBrand.body[1]}</Lead>
          <div className="space-y-6">
            <p className="text-sm leading-6 text-mist">{allisonSupport.genuine.oneStop}</p>
            <div className="flex flex-wrap gap-6">
              <TextLink to="/parts/genuine-parts#allison">Genuine vs non-genuine</TextLink>
              <TextLink to="/products/allison">Allison families</TextLink>
            </div>
          </div>
        </div>
      </Section>
      <Section id="dana" tone="panel" n="B" kicker="Dana Spicer · Certified Service Centre" title="Driveshafts, axles & transmissions.">
        <div className="grid gap-12 lg:grid-cols-2">
          <Lead>{danaBrand.body[1]}</Lead>
          <div>
            <TextLink to="/products/dana">Products by application</TextLink>
          </div>
        </div>
      </Section>
      <Section id="coverage" tone="light" n="C" kicker="Allison warranty" title="Standard & extended coverage.">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div>
              <SubHeading tone="light">Standard Limited Warranty</SubHeading>
              <p className="text-base leading-7 text-ink/80">{coverage.standard}</p>
            </div>
            <div>
              <SubHeading tone="light">Extended Coverage</SubHeading>
              <p className="text-base leading-7 text-ink/80">{coverage.extended}</p>
            </div>
            <p className="border-l-2 border-yellow-2 pl-5 text-sm leading-6 text-ink/75">
              <strong className="font-semibold text-ink">Requirement. </strong>
              {coverage.requirement}
            </p>
          </div>
          <div className="space-y-10">
            <div>
              <SubHeading tone="light">Series eligible for Extended Coverage</SubHeading>
              <CheckList tone="light" items={coverage.series} />
            </div>
            <SpecTable tone="light" caption="Additional series" rows={coverage.additional.map((item) => ({ label: item.name, value: item.text }))} />
          </div>
        </div>
      </Section>
    </>
  )
}

function OilsCoolants() {
  return (
    <>
      <Section id="allison" n="A" kicker="Allison Approved Fluids" title="Transmission fluid specifications." intro={allisonSupport.fluidsWhy}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <caption className="sr-only">Allison Approved Fluids list</caption>
            <thead>
              <tr className="border-b border-line text-[10px] tracking-[0.2em] text-mist uppercase">
                <th scope="col" className="w-1/4 py-4 pr-4 font-normal">
                  Specification
                </th>
                <th scope="col" className="w-36 py-4 pr-4 font-normal">
                  Use
                </th>
                <th scope="col" className="py-4 font-normal">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {allisonSupport.fluids.map((fluid) => (
                <tr key={fluid.spec} className="border-b border-line/70">
                  <th scope="row" className="py-5 pr-4 font-display text-2xl font-normal text-yellow uppercase">
                    {fluid.spec}
                  </th>
                  <td className="py-5 pr-4 text-[11px] tracking-[0.18em] text-paper/80 uppercase">{fluid.use}</td>
                  <td className="py-5 text-sm leading-6 text-paper/80">{fluid.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Section id="fpt" tone="light" n="B" kicker="FPT Industrial genuine fluids" title="Oils & coolants by region." intro={fptFluids.text}>
        <div className="mb-12">
          <SubHeading tone="light">FPT genuine fluids guarantee</SubHeading>
          <ul className="flex flex-wrap gap-2">
            {fptFluids.guarantees.map((item) => (
              <li key={item} className="border border-ink/15 px-3 py-1.5 text-[11px] tracking-[0.14em] text-ink/80 uppercase">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-14">
          {fptFluids.regions.map((region) => (
            <div key={region.region}>
              <h3 className="mb-5 font-display text-3xl uppercase">{region.region}</h3>
              <ItemGrid tone="light" items={region.items} />
            </div>
          ))}
        </div>
        <p className="mt-10 text-sm text-ink/60">Regional availability is as listed by FPT Industrial. Ask our team which fluids are supplied in Oman.</p>
      </Section>
    </>
  )
}

function Remanufactured() {
  const { reman } = allisonSupport
  return (
    <>
      <Section id="allison" n="A" kicker="Allison Transmission" title={reman.title}>
        <div className="grid gap-12 lg:grid-cols-2">
          <Lead>{reman.text}</Lead>
          <div className="space-y-8">
            <div>
              <SubHeading>DPIM2 ReFlex™ for Allison electric hybrids</SubHeading>
              <p className="text-sm leading-6 text-paper/80">{reman.dpim}</p>
            </div>
            <div>
              <SubHeading>Warranty & support</SubHeading>
              <p className="text-sm leading-6 text-paper/80">{reman.warranty}</p>
            </div>
          </div>
        </div>
      </Section>
      <Section id="fpt" tone="light" n="B" kicker="FPT Industrial" title="Original Reman.">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <Lead tone="light">{fptReman.text}</Lead>
            <p className="text-base leading-7 text-ink/75">{fptReman.process}</p>
            <p className="text-base leading-7 text-ink/75">{fptReman.circular}</p>
          </div>
          <div>
            <SubHeading tone="light">Benefits</SubHeading>
            <CheckList tone="light" items={fptReman.benefits} />
          </div>
        </div>
      </Section>
      <Section n="C" kicker="Rebuild or remanufacture" title="Talk to us about the best option.">
        <div className="grid gap-12 lg:grid-cols-2">
          <Lead>Alongside remanufactured units, our workshop rebuilds engines, transmissions and drivetrain assemblies to manufacturer procedures.</Lead>
          <div>
            <TextLink to="/services/component-rebuilds">Major component rebuilds</TextLink>
          </div>
        </div>
      </Section>
    </>
  )
}

const bodies = {
  'genuine-parts': GenuineParts,
  'engine-parts': EngineParts,
  'transmission-parts': TransmissionParts,
  'oils-coolants': OilsCoolants,
  remanufactured: Remanufactured,
}

export default function PartsDetail() {
  const { slug } = useParams()
  const index = partsCategories.findIndex((item) => item.slug === slug)
  const category = partsCategories[index]
  usePageMeta(category ? category.title : 'Not found', category?.summary)
  if (!category) return <NotFound />
  const Body = bodies[category.slug]

  return (
    <>
      <PageHero
        crumbs={[{ to: '/', label: 'Home' }, { to: '/parts', label: 'Parts' }, { label: category.title }]}
        n={String(index + 1).padStart(2, '0')}
        kicker="Parts"
        title={category.title}
        intro={category.summary}
        image={category.image}
        imageAlt={category.imageAlt}
        contain={category.contain}
        facts={[{ label: 'Warranty', value: 'On all parts supplied' }, { label: 'Supply', value: 'Authorised parts only' }]}
      />
      <Body />
      <Section tone="panel" kicker="More parts" n="—">
        <p className="mb-8 max-w-2xl text-sm leading-6 text-mist">{partsWarranty}</p>
        <ul className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {partsCategories
            .filter((item) => item.slug !== category.slug)
            .map((item) => (
              <li key={item.slug} className="bg-ink-2">
                <Link to={`/parts/${item.slug}`} className="group flex items-center justify-between gap-3 p-6 font-display text-2xl uppercase transition-colors hover:text-yellow">
                  {item.title}
                  <Arrow className="h-4 w-4 shrink-0" />
                </Link>
              </li>
            ))}
        </ul>
      </Section>
      <ContactBand text="Send us the part number, serial number or machine model and our team will confirm availability and pricing." />
    </>
  )
}
