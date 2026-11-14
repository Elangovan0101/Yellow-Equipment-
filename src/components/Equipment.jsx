import { useState } from 'react'
import { Link } from 'react-router-dom'
import { equipment } from '../data/content'
import Reveal from './Reveal'
import { Arrow } from './site/ui'

const productGrid = {
  backgroundColor: '#f7f4ee',
  backgroundImage:
    'linear-gradient(to right, rgba(14,14,12,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(14,14,12,0.07) 1px, transparent 1px)',
  backgroundSize: '28px 28px',
}

function CardMedia({ item }) {
  const [failed, setFailed] = useState(false)
  if (item.product) {
    return (
      <div className="relative aspect-[4/3]" style={productGrid}>
        {!failed ? (
          <img
            src={item.image}
            alt={item.imageAlt}
            className="h-full w-full object-contain p-6"
            onError={() => setFailed(true)}
          />
        ) : null}
        <span className="absolute bottom-3 left-4 text-[10px] tracking-[0.18em] text-ink/45 uppercase">{item.caption}</span>
        <span className="absolute right-4 bottom-3 text-[10px] tracking-[0.18em] text-ink/45">{item.n}</span>
      </div>
    )
  }
  const contained = item.fit === 'contain'
  return (
    <div className={`relative aspect-[4/3] overflow-hidden ${item.frame === 'light' ? 'bg-white' : 'bg-[#0b0c0e]'}`}>
      {!failed ? (
        <img
          src={item.image}
          alt={item.imageAlt}
          className={`h-full w-full ${contained ? 'object-contain' : 'object-cover'}`}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : null}
      <span className={`absolute right-4 bottom-3 text-[10px] tracking-[0.18em] ${item.frame === 'light' ? 'text-ink/45' : 'text-paper/80'}`}>{item.n}</span>
    </div>
  )
}

export default function Equipment() {
  return (
    <section id="equipment" className="bg-ink px-4 py-20 text-paper sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="flex items-center gap-3 text-[11px] tracking-[0.28em] text-yellow uppercase">
              <span>02 / B</span>
              <span className="h-px w-8 bg-yellow/70" />
              Equipment we support
            </p>
            <h2 className="mt-5 font-display text-[clamp(4rem,8vw,7rem)] leading-[0.84] font-bold uppercase">
              We support<span className="text-yellow">.</span>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.08}>
            <p className="text-sm leading-6 text-mist">
              From heavy-duty transmissions and commercial trucks to mobile crushing, underground machinery and marine
              power solutions.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {equipment.map((item) => (
            <article key={item.n}>
              <Link to={item.to} className="group block">
                <CardMedia item={item} />
                <h3 className="mt-4 font-display text-2xl leading-none uppercase transition-colors group-hover:text-yellow">{item.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-mist">{item.text}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-[11px] tracking-[0.2em] text-paper uppercase">
                  Explore
                  <Arrow className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
