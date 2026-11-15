import { useState } from 'react'
import { alsoBrands, partners } from '../data/content'
import Reveal from './Reveal'
import { TextLink } from './site/ui'

const grid = {
  backgroundImage:
    'linear-gradient(to right, rgba(14,14,12,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(14,14,12,0.06) 1px, transparent 1px)',
  backgroundSize: '48px 48px',
}

function PartnerLogo({ partner }) {
  const [failed, setFailed] = useState(false)
  if (failed || !partner.logo) {
    return <p className="font-display text-3xl leading-none tracking-wide uppercase">{partner.name}</p>
  }
  return (
    <img loading="lazy" decoding="async"
      src={partner.logo}
      alt=""
      className="max-h-16 w-auto max-w-[240px] object-contain"
      onError={() => setFailed(true)}
    />
  )
}

export default function Partners() {
  return (
    <section id="partners" className="bg-[#f3f0e8] px-4 py-20 text-ink sm:px-6 lg:px-8" style={grid}>
      <div className="mx-auto max-w-[1440px]">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="flex items-center gap-3 text-[11px] tracking-[0.28em] uppercase">
              <span className="text-yellow-2">02</span>
              <span className="h-px w-8 bg-ink/30" />
              Authorised partnerships
            </p>
            <h2 className="mt-5 font-display text-[clamp(3.4rem,7vw,6.4rem)] leading-[0.86] font-bold uppercase">
              Partnered
              <br />
              with
              <br />
              leaders.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.08}>
            <p className="text-sm leading-6 text-ink/70">
              Our dealership and service centre status gives customers in Oman direct access to genuine parts, approved
              procedures and manufacturer-backed support for the drivetrains their machines depend on.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid border-t border-ink/15 lg:grid-cols-3">
          {partners.map((partner) => (
            <article key={partner.name} className="flex flex-col border-ink/15 px-0 py-8 lg:border-r lg:px-8 lg:last:border-r-0">
              <div className="flex h-24 items-center">
                <PartnerLogo partner={partner} />
              </div>
              <p className="mt-6 text-[11px] tracking-[0.16em] uppercase">
                <span className="mr-2 text-yellow-2">●</span>
                {partner.role}
                <span className="ml-3 text-ink/45">{partner.region}</span>
              </p>
              <p className="mt-4 text-sm leading-6 text-ink/80">{partner.body}</p>
              <ul className="mt-6 space-y-1 text-[11px] tracking-[0.14em] text-ink/55 uppercase">
                {partner.facts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
              <ul className="mt-6 flex flex-wrap gap-2">
                {partner.points.map((point) => (
                  <li key={point} className="border border-ink/15 px-2.5 py-1 text-[10px] tracking-[0.12em] uppercase">
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <TextLink tone="light" to={partner.to}>
                  Explore {partner.name}
                </TextLink>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 border-t border-ink/15 pt-8">
          <p className="text-[11px] tracking-[0.22em] text-ink/50 uppercase">Genuine parts and support also for</p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {alsoBrands.map((brand) => (
              <li key={brand} className="text-sm font-semibold tracking-wide uppercase">
                {brand}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-ink/55">
            GETs and undercarriage parts for all brands are supplied through BeneParts Machinery Co. Ltd.
          </p>
        </div>
      </div>
    </section>
  )
}
