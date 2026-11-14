import { Link } from 'react-router-dom'
import { industries } from '../data/content'
import { Arrow } from './site/ui'

export default function Industries() {
  return (
    <section id="industries" className="bg-ink px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1440px]">
        <p className="text-xs tracking-[0.28em] text-yellow uppercase">05 — Industries we support</p>
        <h2 className="mt-4 max-w-4xl font-display text-[clamp(3rem,6vw,5.4rem)] leading-[0.88] font-bold uppercase">
          Supporting the sectors that keep Oman moving.
        </h2>
        <p className="mt-5 max-w-2xl text-lg text-mist">
          Wherever heavy equipment works, our engineers keep its engines, transmissions and drivelines productive.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {industries.map((item) => (
            <article key={item.n} className="relative min-h-[320px] overflow-hidden border border-line bg-ink-2">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  loading="lazy"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/25" />
              <Link to={item.to} className="group relative flex h-full min-h-[320px] flex-col justify-end p-6">
                <p className="text-xs tracking-[0.2em] text-yellow uppercase">
                  {item.n} · {item.kicker}
                </p>
                <h3 className="mt-3 font-display text-4xl uppercase transition-colors group-hover:text-yellow">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/85">{item.text}</p>
                {item.note ? <p className="mt-3 text-xs tracking-[0.16em] text-mist uppercase">{item.note}</p> : null}
                <span className="mt-4 inline-flex items-center gap-2 text-[11px] tracking-[0.2em] text-paper uppercase">
                  Explore
                  <Arrow className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </article>
          ))}

          <article className="relative min-h-[320px] overflow-hidden bg-yellow text-ink md:col-span-2 xl:col-span-2">
            <img
              src="/media/industries/cta-technician.webp"
              alt="Yellow Equipment technician servicing machinery"
              className="absolute inset-y-0 right-0 hidden h-full w-[48%] object-cover object-center md:block"
              loading="lazy"
            />
            <div className="absolute inset-y-0 right-0 hidden w-[48%] bg-gradient-to-r from-yellow via-yellow/70 to-transparent md:block" />
            <div className="relative flex h-full min-h-[320px] max-w-xl flex-col justify-between p-6 sm:p-8">
              <p className="text-xs tracking-[0.2em] uppercase">Your sector</p>
              <div>
                <h3 className="font-display text-4xl leading-none uppercase sm:text-5xl">Your equipment, our expertise.</h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/80">
                  Tell us what you run and where it works. We will match the right engineers and parts to it.
                </p>
                <a
                  href="#contact"
                  className="mt-6 inline-flex bg-ink px-4 py-3 font-display tracking-[0.14em] text-paper uppercase transition-colors hover:bg-ink-2"
                >
                  Talk to our team
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
