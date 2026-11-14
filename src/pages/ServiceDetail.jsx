import { Link, useParams } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { Arrow, CheckList, ContactBand, PageHero, RelatedLinks, Section, usePageMeta } from '../components/site/ui'
import { principles } from '../data/content'
import { companyProfile, services } from '../data/catalog/site'
import NotFound from './NotFound'

export default function ServiceDetail() {
  const { slug } = useParams()
  const index = services.findIndex((item) => item.slug === slug)
  const service = services[index]
  usePageMeta(service ? service.title : 'Not found', service?.text)
  if (!service) return <NotFound />

  const practices = service.practices.map((n) => principles.find((item) => item.n === n))
  const prev = services[(index - 1 + services.length) % services.length]
  const next = services[(index + 1) % services.length]

  return (
    <>
      <PageHero
        crumbs={[{ to: '/', label: 'Home' }, { to: '/services', label: 'Services' }, { label: service.title }]}
        n={service.n}
        kicker="Service"
        title={service.title}
        intro={service.text}
        image={service.image}
        imageAlt={service.imageAlt}
        facts={service.points.map((point, pointIndex) => ({ label: String(pointIndex + 1).padStart(2, '0'), value: point }))}
      />

      <Section n="A" kicker="What it covers" title={service.points.join(' · ')}>
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="text-lg leading-8 text-paper/85">{service.text}</p>
            <p className="mt-6 text-base leading-7 text-mist">{companyProfile.expertise}</p>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.08}>
            <CheckList items={service.points} />
          </Reveal>
        </div>
      </Section>

      <Section tone="light" n="B" kicker="How we deliver it" title="Practices applied.">
        <ul className="grid gap-6 md:grid-cols-3">
          {practices.map((practice) => (
            <li key={practice.n} className="border border-ink/15 bg-white p-6">
              <p className="font-display text-xl text-yellow-2">{practice.n}</p>
              <h3 className="mt-5 font-display text-2xl leading-none uppercase">{practice.title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink/70">{practice.text}</p>
            </li>
          ))}
        </ul>
        <Link
          to="/company#why"
          className="group mt-10 inline-flex items-center gap-3 border-b border-ink/30 pb-1 font-display text-sm tracking-[0.16em] uppercase transition-colors hover:border-yellow-2 hover:text-yellow-2"
        >
          Why choose YES
          <Arrow className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </Section>

      <RelatedLinks title="Related" links={service.related} />

      <section className="border-t border-line bg-ink px-4 sm:px-6 lg:px-8">
        <nav aria-label="More services" className="mx-auto grid max-w-[1440px] sm:grid-cols-2">
          {[
            { item: prev, label: 'Previous service' },
            { item: next, label: 'Next service' },
          ].map(({ item, label }, sideIndex) => (
            <Link
              key={label}
              to={`/services/${item.slug}`}
              className={`group flex flex-col gap-2 py-8 transition-colors hover:text-yellow ${sideIndex ? 'sm:items-end sm:border-l sm:border-line sm:pl-8 sm:text-right' : 'sm:pr-8'}`}
            >
              <span className="text-[10px] tracking-[0.2em] text-mist uppercase">{label}</span>
              <span className="font-display text-3xl uppercase">
                {item.n} {item.title}
              </span>
            </Link>
          ))}
        </nav>
      </section>

      <ContactBand text={`Ask our team about ${service.title.toLowerCase()} for your machines.`} />
    </>
  )
}
