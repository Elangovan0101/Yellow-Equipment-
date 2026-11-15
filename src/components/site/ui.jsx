import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { company } from '../../data/content'
import Reveal from '../Reveal'

const SITE = 'Yellow Equipment Services'
const ORIGIN = 'https://yellowequipmentoman.com'

export const lightGrid = {
  backgroundImage:
    'linear-gradient(to right, rgba(14,14,12,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(14,14,12,0.06) 1px, transparent 1px)',
  backgroundSize: '48px 48px',
}

function setMeta(selector, attribute, value) {
  let node = document.head.querySelector(selector)
  if (!node) {
    node = document.createElement(selector.startsWith('link') ? 'link' : 'meta')
    const [, key, name] = selector.match(/\[(\w+)="([^"]+)"\]/)
    node.setAttribute(key, name)
    document.head.appendChild(node)
  }
  node.setAttribute(attribute, value)
}

export function usePageMeta(title, description, path) {
  useEffect(() => {
    const full = title ? `${title} | ${SITE}` : SITE
    document.title = full
    if (description) {
      setMeta('meta[name="description"]', 'content', description)
      setMeta('meta[property="og:description"]', 'content', description)
    }
    setMeta('meta[property="og:title"]', 'content', full)
    setMeta('link[rel="canonical"]', 'href', `${ORIGIN}${path ?? window.location.pathname}`)
    setMeta('meta[property="og:url"]', 'content', `${ORIGIN}${path ?? window.location.pathname}`)
  }, [title, description, path])
}

export function Container({ children, className = '' }) {
  return <div className={`mx-auto max-w-[1440px] ${className}`}>{children}</div>
}

export function Kicker({ n, children, tone = 'dark' }) {
  const accent = tone === 'light' ? 'text-yellow-2' : 'text-yellow'
  const rule = tone === 'light' ? 'bg-ink/30' : 'bg-yellow/70'
  return (
    <p className={`flex items-center gap-3 text-[11px] tracking-[0.28em] uppercase ${tone === 'light' ? 'text-ink' : accent}`}>
      {n ? <span className={accent}>{n}</span> : null}
      {n ? <span className={`h-px w-8 ${rule}`} /> : null}
      {children}
    </p>
  )
}

export function Breadcrumbs({ items, tone = 'dark' }) {
  const muted = tone === 'light' ? 'text-ink/55' : 'text-paper/60'
  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] tracking-[0.2em] uppercase ${muted}`}>
        {items.map((item, index) => {
          const last = index === items.length - 1
          return (
            <li key={item.label} className="flex items-center gap-2">
              {last || !item.to ? (
                <span aria-current={last ? 'page' : undefined} className={last ? 'text-yellow' : ''}>
                  {item.label}
                </span>
              ) : (
                <Link to={item.to} className="transition-colors hover:text-yellow">
                  {item.label}
                </Link>
              )}
              {!last ? <span aria-hidden="true">/</span> : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export function PageHero({ crumbs, kicker, n, title, intro, image, imageAlt, contain = false, facts, logo, children }) {
  if (contain) {
    return (
      <section className="relative overflow-hidden bg-ink px-4 pt-32 pb-16 sm:px-6 lg:px-8 lg:pt-36">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Breadcrumbs items={crumbs} />
            <HeroText kicker={kicker} n={n} title={title} intro={intro} logo={logo} />
            {children}
          </div>
          <Reveal delay={0.08}>
            <figure className="relative aspect-[5/4] bg-white">
              <img src={image} alt={imageAlt} className="h-full w-full object-contain p-8" />
              <span className="absolute bottom-3 left-4 text-[10px] tracking-[0.18em] text-ink/45 uppercase">{imageAlt}</span>
            </figure>
          </Reveal>
        </Container>
        {facts ? <FactsRow facts={facts} /> : null}
      </section>
    )
  }
  return (
    <section className="relative flex min-h-[86svh] flex-col justify-end overflow-hidden bg-ink">
      {image ? (
        <img src={image} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/35" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/30 to-transparent" />
      <div className="relative px-4 pt-36 pb-14 sm:px-6 lg:px-8">
        <Container>
          <Breadcrumbs items={crumbs} />
          <HeroText kicker={kicker} n={n} title={title} intro={intro} logo={logo} />
          {children}
        </Container>
      </div>
      {facts ? <FactsRow facts={facts} /> : null}
    </section>
  )
}

function HeroText({ kicker, n, title, intro, logo }) {
  return (
    <Reveal>
      <div className="mt-10">
        {logo ? <img src={logo} alt="" className="mb-8 h-12 w-auto max-w-[220px] object-contain object-left brightness-0 invert" /> : null}
        <Kicker n={n}>{kicker}</Kicker>
        <h1 className="mt-5 max-w-5xl font-display text-[clamp(3.2rem,7.4vw,7rem)] leading-[0.86] font-bold uppercase">
          {title}
        </h1>
        {intro ? <p className="mt-6 max-w-2xl text-base leading-7 text-paper/85 sm:text-lg">{intro}</p> : null}
      </div>
    </Reveal>
  )
}

function FactsRow({ facts }) {
  return (
    <div className="relative border-t border-line bg-ink/70 px-4 backdrop-blur sm:px-6 lg:px-8">
      <Container className="overflow-hidden">
        <dl
          className={`-mt-px -ml-[21px] grid w-[calc(100%+21px)] ${facts.length > 4 ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-6' : facts.length === 4 ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-3'}`}
        >
          {facts.map((fact) => (
            <div key={fact.label} className="border-t border-l border-line py-5 pr-4 pl-5">
              <dt className="text-[10px] tracking-[0.2em] text-mist uppercase">{fact.label}</dt>
              <dd className="mt-2 font-display text-xl leading-tight text-paper uppercase">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </div>
  )
}

export function Section({ id, n, kicker, title, intro, tone = 'dark', children, className = '', aside }) {
  const light = tone === 'light'
  return (
    <section
      id={id}
      className={`px-4 py-20 sm:px-6 lg:px-8 lg:py-24 ${light ? 'bg-[#f3f0e8] text-ink' : tone === 'panel' ? 'bg-ink-2' : 'bg-ink'} ${className}`}
      style={light ? lightGrid : undefined}
    >
      <Container>
        {title || kicker ? (
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              {kicker ? (
                <Kicker n={n} tone={light ? 'light' : 'dark'}>
                  {kicker}
                </Kicker>
              ) : null}
              {title ? (
                <h2 className="mt-5 font-display text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.9] font-bold uppercase">{title}</h2>
              ) : null}
            </Reveal>
            {intro || aside ? (
              <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.08}>
                {intro ? <p className={`text-sm leading-6 ${light ? 'text-ink/70' : 'text-mist'}`}>{intro}</p> : null}
                {aside}
              </Reveal>
            ) : null}
          </div>
        ) : null}
        <div className={title || kicker ? 'mt-12' : ''}>{children}</div>
      </Container>
    </section>
  )
}

export function SpecTable({ rows, tone = 'dark', caption }) {
  const light = tone === 'light'
  return (
    <div>
      {caption ? (
        <p className={`mb-4 text-[11px] tracking-[0.22em] uppercase ${light ? 'text-yellow-2' : 'text-yellow'}`}>{caption}</p>
      ) : null}
      <dl className={`border-t ${light ? 'border-ink/15' : 'border-line'}`}>
        {rows.map((row) => (
          <div
            key={row.label}
            className={`grid gap-2 border-b py-4 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] sm:gap-6 ${light ? 'border-ink/15' : 'border-line'}`}
          >
            <dt className={`text-[11px] tracking-[0.18em] uppercase ${light ? 'text-ink/55' : 'text-mist'}`}>{row.label}</dt>
            <dd className="font-display text-xl leading-tight tracking-wide uppercase">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export function Chips({ items, tone = 'dark' }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className={`border px-2.5 py-1 text-[10px] tracking-[0.14em] uppercase ${tone === 'light' ? 'border-ink/15 text-ink/75' : 'border-line text-mist'}`}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

export function Arrow({ className = 'h-3.5 w-3.5' }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

export function TextLink({ to, children, tone = 'dark' }) {
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-3 border-b pb-1 font-display text-sm tracking-[0.16em] uppercase transition-colors ${
        tone === 'light' ? 'border-ink/30 hover:border-yellow-2 hover:text-yellow-2' : 'border-paper/30 hover:border-yellow hover:text-yellow'
      }`}
    >
      {children}
      <Arrow className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
    </Link>
  )
}

export function LinkCard({ to, n, title, text, image, imageAlt, contain = false, meta, tone = 'dark' }) {
  const light = tone === 'light'
  return (
    <Link to={to} className="group flex h-full flex-col">
      {image ? (
        <span className={`relative block overflow-hidden ${contain ? 'aspect-[16/10] bg-white' : 'aspect-[4/3] bg-ink-2'}`}>
          <img
            src={image}
            alt={imageAlt ?? ''}
            className={`h-full w-full transition-transform duration-700 group-hover:scale-[1.04] ${contain ? 'object-contain p-3 sm:p-4' : 'object-cover'}`}
            loading="lazy"
          />
          {n ? (
            <span className={`absolute right-4 bottom-3 text-[10px] tracking-[0.18em] ${contain ? 'text-ink/45' : 'text-paper/80'}`}>{n}</span>
          ) : null}
        </span>
      ) : null}
      <span className={`flex flex-1 flex-col ${image ? 'pt-5' : `border p-6 ${light ? 'border-ink/15 bg-paper/60' : 'border-line bg-ink-2'}`}`}>
        {!image && n ? <span className={`font-display text-xl ${light ? 'text-yellow-2' : 'text-yellow'}`}>{n}</span> : null}
        {meta ? <span className={`text-[10px] tracking-[0.2em] uppercase ${light ? 'text-ink/50' : 'text-mist'} ${!image && n ? 'mt-4' : ''}`}>{meta}</span> : null}
        <span className={`mt-2 block font-display text-2xl leading-none uppercase transition-colors ${light ? 'group-hover:text-yellow-2' : 'group-hover:text-yellow'}`}>
          {title}
        </span>
        {text ? <span className={`mt-3 block text-sm leading-6 ${light ? 'text-ink/70' : 'text-mist'}`}>{text}</span> : null}
        <span className={`mt-auto inline-flex items-center gap-2 pt-5 text-[11px] tracking-[0.2em] uppercase ${light ? 'text-ink' : 'text-paper'}`}>
          Explore
          <Arrow className="h-3 w-3 transition-transform group-hover:translate-x-1" />
        </span>
      </span>
    </Link>
  )
}

export function FeatureList({ items, tone = 'dark', columns = 3 }) {
  const light = tone === 'light'
  const soloWithImage = items.length === 1 && items[0]?.image

  if (soloWithImage) {
    const item = items[0]
    return (
      <div className={`grid overflow-hidden md:grid-cols-2 ${light ? 'gap-6' : 'gap-px bg-line'}`}>
        <div className={`flex flex-col justify-center p-6 sm:p-8 ${light ? 'border border-ink/15 bg-white' : 'bg-ink'}`}>
          <p className={`font-display text-xl ${light ? 'text-yellow-2' : 'text-yellow'}`}>01</p>
          <h3 className="mt-5 font-display text-2xl leading-none uppercase sm:text-3xl">{item.title}</h3>
          <p className={`mt-3 text-sm leading-6 ${light ? 'text-ink/70' : 'text-mist'}`}>{item.text}</p>
        </div>
        <div className={`overflow-hidden ${light ? 'border border-ink/15 bg-white' : 'bg-ink-2'}`}>
          <img
            src={item.image}
            alt={item.imageAlt ?? item.title}
            className="h-full min-h-[240px] w-full object-cover md:min-h-[320px]"
            loading="lazy"
          />
        </div>
      </div>
    )
  }

  const cols =
    columns === 2
      ? 'md:grid-cols-2'
      : columns === 4
        ? 'sm:grid-cols-2 xl:grid-cols-4'
        : items.length === 1
          ? ''
          : 'md:grid-cols-3'
  return (
    <ul className={`grid ${light ? 'gap-6' : 'gap-px bg-line'} ${cols}`}>
      {items.map((item, index) => (
        <li key={item.title} className={`p-6 ${light ? 'border border-ink/15 bg-white' : 'bg-ink'}`}>
          <p className={`font-display text-xl ${light ? 'text-yellow-2' : 'text-yellow'}`}>{String(index + 1).padStart(2, '0')}</p>
          <h3 className="mt-5 font-display text-2xl leading-none uppercase">{item.title}</h3>
          <p className={`mt-3 text-sm leading-6 ${light ? 'text-ink/70' : 'text-mist'}`}>{item.text}</p>
        </li>
      ))}
    </ul>
  )
}

export function CheckList({ items, tone = 'dark' }) {
  const light = tone === 'light'
  return (
    <ul className={`border-t ${light ? 'border-ink/15' : 'border-line'}`}>
      {items.map((item) => (
        <li key={item} className={`flex gap-4 border-b py-4 text-sm leading-6 ${light ? 'border-ink/15 text-ink/80' : 'border-line text-paper/85'}`}>
          <span className={`mt-2 h-1.5 w-1.5 shrink-0 ${light ? 'bg-yellow-2' : 'bg-yellow'}`} aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export function ContactBand({ title = 'Reach us for more details', text }) {
  return (
    <section className="bg-yellow px-4 py-16 text-ink sm:px-6 lg:px-8">
      <Container className="grid items-end gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="text-[11px] tracking-[0.28em] uppercase">Talk to our team</p>
          <h2 className="mt-4 font-display text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.9] font-bold uppercase">{title}</h2>
          {text ? <p className="mt-4 max-w-xl text-sm leading-6 text-ink/75">{text}</p> : null}
        </div>
        <div className="lg:col-span-5">
          <ul className="space-y-1 font-display text-2xl tracking-wide">
            {company.phones.map((phone) => (
              <li key={phone}>
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:underline">
                  {phone}
                </a>
              </li>
            ))}
          </ul>
          <a href={`mailto:${company.email}`} className="mt-2 block text-sm break-all hover:underline">
            {company.email}
          </a>
          <Link
            to="/#contact"
            className="mt-6 inline-flex items-center gap-3 bg-ink px-5 py-3 font-display text-sm tracking-[0.16em] text-paper uppercase transition-colors hover:bg-ink-2"
          >
            Send an inquiry//

          
            <Arrow />
          </Link>
        </div>
      </Container>
    </section>
  )
}

export function ImageGallery({ images = [], alt = 'Product photo', columns = 3, contain = false }) {
  if (!images.length) return null
  const cols = columns === 4 ? 'sm:grid-cols-2 xl:grid-cols-4' : columns === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 xl:grid-cols-3'
  const items = images.map((item, index) =>
    typeof item === 'string' ? { src: item, label: null, alt: `${alt} ${index + 1}` } : { src: item.src ?? item.image, label: item.label ?? item.name ?? null, alt: item.alt ?? item.label ?? item.name ?? `${alt} ${index + 1}` },
  )
  return (
    <ul className={`grid gap-3 ${cols}`}>
      {items.map((item) => (
        <li key={`${item.src}-${item.label ?? ''}`} className={`overflow-hidden ${contain ? 'bg-white' : 'bg-ink-2'}`}>
          <img
            src={item.src}
            alt={item.alt}
            className={`aspect-[4/3] h-full w-full ${contain ? 'object-contain' : 'object-cover'}`}
            loading="lazy"
          />
          {item.label ? (
            <p className={`border-t px-3 py-2 text-sm leading-snug ${contain ? 'border-ink/10 text-ink/80' : 'border-line text-paper/85'}`}>
              {item.label}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  )
}

export function RelatedLinks({ title = 'Related', links }) {
  return (
    <Section kicker={title} tone="panel">
      <ul className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <li key={link.to} className="bg-ink-2">
            <Link to={link.to} className="group flex items-center justify-between gap-4 p-6 font-display text-2xl uppercase transition-colors hover:text-yellow">
              {link.label}
              <Arrow className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}
