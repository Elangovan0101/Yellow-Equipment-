import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { Link } from 'react-router-dom'
import { capabilities } from '../data/content'
import { Arrow } from './site/ui'

export default function Capabilities() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(0)
  const [desktop, setDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches,
  )
  const reduce = useReducedMotion()
  const current = capabilities[active]
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)')
    const apply = () => setDesktop(media.matches)
    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [])

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (!desktop) return
    const next = Math.min(capabilities.length - 1, Math.floor(value * capabilities.length))
    setActive((previous) => (previous === next ? previous : next))
  })

  const focus = (index) => {
    setActive(index)
    const section = sectionRef.current
    if (!desktop || !section) return
    const top = section.getBoundingClientRect().top + window.scrollY
    const scrollable = section.offsetHeight - window.innerHeight
    const target = top + (scrollable * (index + 0.5)) / capabilities.length
    window.scrollTo({ top: target, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <section id="capabilities" className="bg-ink">
      <div className="mx-auto max-w-[1440px] px-4 pt-28 pb-10 sm:px-8 lg:px-12 lg:pt-32">
        <p className="text-xs tracking-[0.28em] text-yellow uppercase">03 — Capabilities</p>
        <h2 className="mt-4 max-w-3xl font-display text-[clamp(3rem,5vw,4.8rem)] leading-[0.9] font-bold uppercase">
          From field repairs to full rebuilds.
        </h2>
        <p className="mt-5 max-w-xl text-mist">
          Eight capabilities, one accountable team. Scroll through them. Every repair follows manufacturer
          procedures, and every part we fit is authorised and covered by warranty.
        </p>
      </div>

      <div
        ref={sectionRef}
        className="relative"
        style={desktop ? { height: `${capabilities.length * 70}vh` } : undefined}
      >
        <div className={desktop ? 'sticky top-0 h-screen overflow-hidden' : ''}>
          <div className="mx-auto grid h-full max-w-[1440px] lg:grid-cols-2">
            <div className="relative hidden h-full items-center justify-center bg-ink px-6 py-10 lg:flex">
              <div className="relative w-full max-h-[min(78vh,820px)] overflow-hidden bg-ink-2 aspect-[4/3]">
                <AnimatePresence mode="sync">
                  <motion.img
                    key={current.image + current.n}
                    src={current.image}
                    alt={current.imageAlt}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  />
                </AnimatePresence>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <p className="absolute bottom-6 left-6 z-10 font-display text-6xl leading-none text-paper xl:text-7xl">
                  {current.n}
                  <span className="text-2xl text-mist"> / 08</span>
                </p>
              </div>
            </div>

            <div className="flex h-full flex-col justify-center px-4 py-8 sm:px-8 lg:px-12 lg:py-6">
              <div
                className="mb-6 h-0.5 bg-yellow lg:mb-8"
                style={{ width: `${((active + 1) / capabilities.length) * 100}%` }}
                aria-hidden="true"
              />
              <div>
                {capabilities.map((item, index) => {
                  const selected = index === active
                  return (
                    <article key={item.n} className="border-t border-line">
                      <button
                        type="button"
                        className="flex w-full items-start gap-4 py-3.5 text-left"
                        aria-expanded={selected}
                        onClick={() => focus(index)}
                      >
                        <span
                          className={`mt-1 h-5 w-0.5 shrink-0 ${selected ? 'bg-yellow' : 'bg-transparent'}`}
                          aria-hidden="true"
                        />
                        <span className="font-display text-lg text-yellow">{item.n}</span>
                        <span className="min-w-0 flex-1">
                          <span
                            className={`block font-display text-[1.65rem] leading-none uppercase ${
                              selected ? 'text-paper' : 'text-paper/45'
                            }`}
                          >
                            {item.title}
                          </span>
                          {selected ? (
                            <span className="mt-3 block">
                              <span className="block max-w-xl text-sm leading-relaxed text-paper/80">{item.text}</span>
                              <span className="mt-3 flex flex-wrap gap-2">
                                {item.points.map((point) => (
                                  <span
                                    key={point}
                                    className="border border-line px-2 py-1 text-[10px] tracking-wide text-mist uppercase"
                                  >
                                    {point}
                                  </span>
                                ))}
                              </span>
                              <span className="mt-4 block h-px bg-yellow/80" />
                            </span>
                          ) : null}
                        </span>
                      </button>
                      {selected ? (
                        <Link
                          to={item.to}
                          className="group mb-4 ml-[3.25rem] inline-flex items-center gap-2 text-[11px] tracking-[0.2em] text-paper uppercase transition-colors hover:text-yellow"
                        >
                          Service details
                          <Arrow className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                        </Link>
                      ) : null}
                      <img
                        src={item.image}
                        alt={item.imageAlt}
                        className="mb-4 aspect-[4/3] w-full object-cover object-center lg:hidden"
                        loading="lazy"
                      />
                    </article>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
