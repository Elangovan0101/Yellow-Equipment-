import Reveal from '../components/Reveal'
import { CheckList, ContactBand, FeatureList, PageHero, RelatedLinks, Section, SpecTable, usePageMeta } from '../components/site/ui'
import { company, credentials, offerings, principles } from '../data/content'
import { allisonSupport } from '../data/catalog/allison'
import { companyProfile, partsWarranty } from '../data/catalog/site'

export default function Company() {
  usePageMeta(
    'Company',
    'Yellow Equipment Services LLC: company profile, mission, vision, core values, technical expertise and why customers in Oman choose YES for heavy equipment engines, transmissions, parts and service.',
  )
  return (
    <>
      <PageHero
        crumbs={[{ to: '/', label: 'Home' }, { label: 'Company' }]}
        kicker="Company profile"
        title={company.name}
        intro={company.tagline}
        image="/media/catalog/banners/comapany-up.webp"
        imageAlt="Yellow Equipment Services company workshop"
        facts={credentials.map((item) => ({ label: item.kicker, value: item.text }))}
      />

      <Section n="01" kicker="Who we are" title="Heavy equipment, Oman-wide.">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            {companyProfile.intro.map((paragraph) => (
              <Reveal key={paragraph}>
                <p className="text-lg leading-8 text-paper/85">{paragraph}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.08}>
            <SpecTable caption="Our offerings" rows={offerings.map((item) => ({ label: item.title, value: item.text }))} />
          </Reveal>
        </div>
      </Section>

      <Section tone="light" n="02" kicker="Mission & vision" title="What drives us.">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { label: 'Mission', text: company.mission },
            { label: 'Vision', text: companyProfile.vision },
          ].map((item) => (
            <Reveal key={item.label} className="border border-ink/15 bg-white p-8 lg:p-10">
              <p className="text-[11px] tracking-[0.28em] text-yellow-2 uppercase">{item.label}</p>
              <p className="mt-6 font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.02] uppercase">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="values" n="03" kicker="Core values" title="We start with integrity and end with excellence.">
        <FeatureList columns={3} items={companyProfile.values} />
      </Section>

      <Section id="why" tone="panel" n="04" kicker="Why choose YES" title="Eight reasons customers choose us.">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <CheckList items={companyProfile.why} />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.08}>
            <p className="text-[11px] tracking-[0.22em] text-yellow uppercase">Technical expertise</p>
            <p className="mt-4 font-display text-3xl leading-[1.02] uppercase">{companyProfile.expertise}</p>
          </Reveal>
        </div>
      </Section>

      <Section id="procedures" tone="light" n="05" kicker="Manufacturer procedures" title="How every job is done.">
        <FeatureList tone="light" columns={4} items={principles} />
      </Section>

      <Section id="warranty" n="06" kicker="Warranty & support" title="Covered on every job.">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="text-lg leading-8 text-paper/85">{partsWarranty}</p>
            <p className="mt-6 text-base leading-7 text-mist">We provide warranty on all repairs and parts supplies, with 24/7 quick service.</p>
          </Reveal>
          <Reveal delay={0.08}>
            <SpecTable
              caption="Manufacturer coverage we support"
              rows={[
                { label: 'Allison transmissions', value: 'Standard Limited Warranty & Extended Coverage' },
                { label: 'Allison Genuine ReMan', value: allisonSupport.reman.warranty.replace(/^ReTran™ units carry /, '').replace(/\.$/, '') },
                { label: 'FPT genuine parts', value: '12 months warranty coverage' },
                { label: 'FPT Original Reman', value: '2-year warranty' },
              ]}
            />
          </Reveal>
        </div>
      </Section>

      <RelatedLinks
        title="Explore"
        links={[
          { to: '/products', label: 'Products' },
          { to: '/services', label: 'Services' },
          { to: '/parts', label: 'Parts' },
        ]}
      />

      <ContactBand />
    </>
  )
}
