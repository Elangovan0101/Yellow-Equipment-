import Reveal from '../components/Reveal'
import { ContactBand, PageHero, Section, TextLink, usePageMeta } from '../components/site/ui'
import { partsBrands, partsIntro, partsWarranty } from '../data/catalog/site'

const sales = [
  {
    id: 'engine-sales',
    title: 'Engine sales',
    text: 'FPT Industrial engines for off-highway, marine and power generation, as the FPT engine dealer.',
    to: '/products/fpt',
    linkLabel: 'FPT Industrial engines',
    items: [
      { name: 'Industrial diesel engines', image: '/media/catalog/engine-sales/en_img1.webp' },
      { name: 'Heavy-duty diesel engines', image: '/media/catalog/engine-sales/en_img2.webp' },
      { name: 'Caterpillar diesel engines', image: '/media/catalog/engine-sales/en_img3.webp' },
      { name: 'Industrial engines with cooling fan', image: '/media/catalog/engine-sales/en_img4.webp' },
    ],
  },
  {
    id: 'parts-sales',
    title: 'Parts sales',
    text: 'Genuine parts, kits and components for diesel engines, transmissions and equipment from leading brands.',
    to: '/parts/genuine-parts',
    linkLabel: 'More about genuine parts',
    items: [
      { name: 'Ground engaging tools', image: '/media/catalog/parts-sales/pA_iM1.webp' },
      { name: 'Excavator buckets & rippers', image: '/media/catalog/parts-sales/pA_iM2.webp' },
      { name: 'Grader blades', image: '/media/catalog/parts-sales/pA_iM3.webp' },
      { name: 'Undercarriage tracks & rollers', image: '/media/catalog/parts-sales/pA_iM4.webp' },
      { name: 'Multi-shank rippers', image: '/media/catalog/parts-sales/pA_iM5.webp' },
      { name: 'Wear plates & cutting edges', image: '/media/catalog/parts-sales/pA_iM6.webp' },
      { name: 'Transmission filters & kits', image: '/media/catalog/parts-sales/pA_iM7.webp' },
      { name: 'Engine parts, filters & fluids', image: '/media/catalog/parts-sales/pA_iM8.webp' },
      { name: 'Hydraulic & drivetrain parts', image: '/media/catalog/parts-sales/pA_iM9.webp' },
      { name: 'GET adapters & retainers', image: '/media/catalog/parts-sales/pA_iM10.webp' },
      { name: 'Undercarriage components', image: '/media/catalog/parts-sales/pA_iM11.webp' },
      { name: 'Service kits & consumables', image: '/media/catalog/parts-sales/pA_iM12.webp' },
      { name: 'Authorised spare parts', image: '/media/catalog/parts-sales/pA_iM13.webp' },
    ],
  },
  {
    id: 'transmission-sales',
    title: 'Transmission sales',
    text: 'Allison fully automatic transmissions as the authorised dealer in Oman, with parts for Twin Disc and ZF.',
    to: '/products/allison',
    linkLabel: 'Allison Transmission',
    items: [
      { name: 'Industrial transmission assemblies', image: '/media/catalog/transmission-sales/tr_im1.webp' },
      { name: 'Allison automatic transmissions', image: '/media/catalog/transmission-sales/tr_im2.webp' },
      { name: 'Heavy-duty transmission units', image: '/media/catalog/transmission-sales/tr_im3.webp' },
      { name: 'Powershift transmissions', image: '/media/catalog/transmission-sales/tr_im4.webp' },
      { name: 'Allison transmission range', image: '/media/catalog/transmission-sales/tr_im5.webp' },
    ],
  },
]

export default function PartsIndex() {
  usePageMeta('Parts', 'Genuine parts, kits and components for diesel engines, transmissions and equipment, with warranty. Engine, transmission, oils and coolants, and remanufactured parts in Oman.')
  return (
    <>
      <PageHero
        crumbs={[{ to: '/', label: 'Home' }, { label: 'Parts' }]}
        kicker="Genuine & authorised parts"
        title="Parts"
        intro={partsIntro[0]}
        image="/media/catalog/banners/parts-up.webp"
        imageAlt="Genuine parts, kits and components"
        facts={[
          { label: 'Brands covered', value: `${partsBrands.length}+` },
          { label: 'Warranty', value: 'On all parts supplied' },
          { label: 'Supply', value: 'Authorised parts only' },
        ]}
      />

      <Section id="brands" tone="light" n="A" kicker="Brands" title="Popular brands we cover." intro="Our range covers, but is not limited to, these brands.">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
          {partsBrands.map((brand) => (
            <li key={brand} className="flex min-h-24 items-end border border-ink/15 bg-white p-4 font-display text-xl leading-none uppercase">
              {brand}
            </li>
          ))}
        </ul>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <p className="text-lg leading-8 text-ink/80">{partsIntro[1]}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="border-l-2 border-yellow-2 pl-5 text-lg leading-8 text-ink/80">{partsWarranty}</p>
          </Reveal>
        </div>
      </Section>

      <Section id="sales" n="B" kicker="What we supply" title="Engines, parts and transmissions.">
        <div className="space-y-20">
          {sales.map((item, index) => (
            <article key={item.id} id={item.id} className="scroll-mt-28">
              <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-8">
                  <p className="font-display text-xl text-yellow">{String(index + 1).padStart(2, '0')}</p>
                  <h3 className="mt-3 font-display text-[clamp(2.4rem,4.5vw,3.8rem)] leading-none uppercase">{item.title}</h3>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-paper/80">{item.text}</p>
                </div>
                <div className="lg:col-span-4 lg:justify-self-end">
                  <TextLink to={item.to}>{item.linkLabel}</TextLink>
                </div>
              </div>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {item.items.map((product) => (
                  <li key={product.image} className="overflow-hidden border border-line bg-ink-2">
                    <div className="aspect-[4/3] bg-white">
                      <img src={product.image} alt={product.name} className="h-full w-full object-contain" loading="lazy" />
                    </div>
                    <div className="border-t border-line px-4 py-3">
                      <p className="text-[9px] tracking-[0.2em] text-yellow uppercase">{item.title}</p>
                      <p className="mt-1 text-sm leading-snug text-paper/90">{product.name}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <ContactBand text="Send us the part number, serial number or machine model and our team will confirm availability and pricing." />
    </>
  )
}
