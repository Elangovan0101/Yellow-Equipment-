import Reveal from '../components/Reveal'
import { ContactBand, FeatureList, LinkCard, PageHero, Section, usePageMeta } from '../components/site/ui'
import { allisonBrand, allisonFamilies, allisonGroups, allisonTechnology } from '../data/catalog/allison'
import { allisonFamilyImages, supportImages } from '../data/catalog/images'

const support = [
  {
    to: '/parts/genuine-parts#allison',
    n: '01',
    title: 'Genuine Parts',
    text: 'Built to original factory specifications and backed by an Allison factory warranty.',
    image: supportImages('allisonGenuine')?.hero,
    imageAlt: 'Allison Genuine Parts',
    contain: true,
  },
  {
    to: '/parts/remanufactured#allison',
    n: '02',
    title: 'Genuine ReMan™',
    text: 'Remanufactured with Allison Genuine Parts™ and 100% dynamometer tested.',
    image: supportImages('allisonReman')?.hero,
    imageAlt: 'Allison Genuine ReMan',
    contain: true,
  },
  {
    to: '/parts/oils-coolants#allison',
    n: '03',
    title: 'Approved Fluids',
    text: 'TES 668®, TES 295® and off-highway fluid specifications.',
    image: supportImages('allisonFluids')?.hero,
    imageAlt: 'Allison Approved Fluids',
    contain: true,
  },
  {
    to: '/parts/transmission-parts#coverage',
    n: '04',
    title: 'Extended Coverage',
    text: 'Coverage beyond the Standard Limited Warranty, with 100% parts and labour.',
    image: supportImages('allisonCoverage')?.hero,
    imageAlt: 'Allison Extended Coverage',
    contain: true,
  },
]

export default function AllisonIndex() {
  usePageMeta(
    'Allison Transmission',
    'Authorised Allison Transmission dealer in Oman. 1000/2000, 9-Speed, 3000, 4000, 6000, 8000 and 9000 Series, FracTran, X Models and eGen electric hybrid systems.',
  )
  return (
    <>
      <PageHero
        crumbs={[{ to: '/', label: 'Home' }, { to: '/products', label: 'Products' }, { label: 'Allison Transmission' }]}
        n="01"
        kicker={allisonBrand.role}
        title="Allison Transmission"
        intro={allisonBrand.intro}
        image={allisonBrand.image}
        imageAlt={allisonBrand.imageAlt}
        logo={allisonBrand.logo}
        facts={allisonBrand.facts}
      />

      <Section tone="light" kicker="About the brand" n="A" title="The world’s largest maker of fully automatic transmissions.">
        <div className="grid gap-10 lg:grid-cols-2">
          {allisonBrand.body.map((paragraph) => (
            <Reveal key={paragraph}>
              <p className="text-lg leading-8 text-ink/80">{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {allisonGroups.map((group, groupIndex) => {
        const families = allisonFamilies.filter((family) => family.group === group.id)
        return (
          <Section
            key={group.id}
            id={group.id}
            n={String(groupIndex + 1).padStart(2, '0')}
            kicker="Product families"
            title={group.title}
            tone={groupIndex % 2 ? 'panel' : 'dark'}
          >
            <div className="grid gap-x-4 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
              {families.map((family) => {
                const photo = allisonFamilyImages(family.slug)
                return (
                  <LinkCard
                    key={family.slug}
                    to={`/products/allison/${family.slug}`}
                    title={family.name}
                    text={family.summary}
                    meta={family.specs?.[0] ? `${family.specs[0].label}: ${family.specs[0].value}` : group.title}
                    image={photo?.hero}
                    imageAlt={`Allison ${family.short}`}
                  />
                )
              })}
            </div>
          </Section>
        )
      })}

      <Section n="B" kicker="Industry-leading propulsion technology" title="Built into every fully automatic Allison." intro="Allison fully automatic transmissions deliver premium performance, increase fuel economy and reduce total cost of ownership.">
        <FeatureList items={allisonTechnology} />
      </Section>

      <Section tone="light" n="C" kicker="Aftermarket support" title="Genuine parts, ReMan, fluids and coverage.">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {support.map((item) => (
            <LinkCard key={item.to} tone="light" {...item} />
          ))}
        </div>
      </Section>

      <ContactBand text="Allison transmissions, genuine spare parts and accessories at competitive prices, plus parts for Twin Disc and ZF transmissions." />
    </>
  )
}
