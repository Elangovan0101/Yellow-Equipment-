import { ContactBand, FeatureList, LinkCard, PageHero, Section, usePageMeta } from '../components/site/ui'
import { principles } from '../data/content'
import { services } from '../data/catalog/site'

export default function ServicesIndex() {
  usePageMeta(
    'Services',
    'Fleet management consultation, annual maintenance contracts, major component rebuilds, field repairs, oil sampling and condition monitoring, and authorised parts with warranty, in Muscat, Oman.',
  )
  return (
    <>
      <PageHero
        crumbs={[{ to: '/', label: 'Home' }, { label: 'Services' }]}
        kicker="What we do"
        title="Services"
        intro="Field service engineers and specialists with 10 to 25 years of premium dealership experience, working to manufacturer procedures on every job."
        image="/media/services/component-rebuilds.webp"
        imageAlt="Technicians rebuilding an engine in the workshop rebuild bay"
        facts={[
          { label: 'Services', value: String(services.length) },
          { label: 'Response', value: '24/7 quick service' },
          { label: 'Warranty', value: 'On all repairs & parts' },
          { label: 'Location', value: 'Rusayl Industrial Area, Muscat' },
        ]}
      />

      <Section n="A" kicker="Our services" title="From planning to rebuild.">
        <div className="grid gap-x-4 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <LinkCard
              key={service.slug}
              to={`/services/${service.slug}`}
              n={service.n}
              title={service.title}
              text={service.text}
              image={service.image}
              imageAlt={service.imageAlt}
            />
          ))}
        </div>
      </Section>

      <Section tone="light" n="B" kicker="How we work" title="Eight practices behind every job.">
        <FeatureList tone="light" columns={4} items={principles} />
      </Section>

      <ContactBand text="Tell us about the machine, the fault or the fleet, and our team will come back with the right service plan." />
    </>
  )
}
