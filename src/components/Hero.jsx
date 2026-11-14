import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { credentials, heroSlides } from '../data/content'

export default function Hero() {
  const [index, setIndex] = useState(0)
  const reduce = useReducedMotion()
  const videoRefs = useRef([])
  const slide = heroSlides[index]

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return
      if (i === index) {
        const play = video.play()
        if (play) play.catch(() => {})
      } else {
        video.pause()
      }
    })
  }, [index])

  useEffect(() => {
    if (reduce) return undefined
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % heroSlides.length)
    }, 9000)
    return () => window.clearInterval(timer)
  }, [reduce])

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-ink">
      {heroSlides.map((item, i) => (
        <video
          key={item.id}
          ref={(node) => {
            videoRefs.current[i] = node
          }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
          src={item.video}
          poster={item.poster}
          muted
          playsInline
          loop
          preload={i === 0 ? 'metadata' : 'none'}
          aria-hidden={i !== index}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-4 pt-28 pb-6 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45 }}
          >
            <p className="mb-5 flex items-center gap-4 text-[11px] tracking-[0.32em] text-paper/80 uppercase">
              <span className="h-px w-12 bg-yellow" />
              Muscat, Sultanate of Oman
            </p>
            <h1 className="max-w-[12ch] font-display text-[clamp(4.2rem,11vw,8.6rem)] leading-[0.82] font-bold tracking-tight uppercase">
              Keeping
              <br />
              Industry
              <br />
              Moving<span className="text-yellow">.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/85 sm:text-lg">
              Specialist heavy equipment, engine, transmission and industrial servicing solutions across Oman.
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#capabilities"
            className="inline-flex items-center justify-center gap-3 bg-yellow px-6 py-4 font-display text-base tracking-[0.14em] text-ink uppercase hover:bg-paper"
          >
            Explore our capabilities
            <Arrow />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-3 border border-white/30 bg-white/5 px-6 py-4 font-display text-base tracking-[0.14em] uppercase backdrop-blur-sm hover:border-yellow hover:text-yellow"
          >
            Contact our team
            <Arrow />
          </a>
        </div>

        <div className="mt-10 grid border-t border-white/15 md:grid-cols-[1fr_1fr_1.2fr_auto]">
          {credentials.map((item) => (
            <div key={item.kicker} className="border-white/15 px-0 py-5 md:border-r md:px-5 md:first:pl-0">
              <p className="text-[11px] tracking-[0.22em] text-yellow uppercase">{item.kicker}</p>
              <p className="mt-2 max-w-xs text-sm leading-snug text-paper">{item.text}</p>
            </div>
          ))}
          <div className="flex items-end justify-between gap-4 py-5 md:justify-end md:px-5">
            <p className="text-xs tracking-[0.18em] text-mist uppercase md:sr-only">{slide.label}</p>
            <div className="flex items-center gap-3" role="tablist" aria-label="Hero footage">
              {heroSlides.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  className="group flex items-center gap-2"
                  onClick={() => setIndex(i)}
                >
                  <span className={`text-xs tracking-[0.18em] ${i === index ? 'text-paper' : 'text-mist'}`}>
                    {item.index}
                  </span>
                  <span className={`h-px transition-all ${i === index ? 'w-10 bg-yellow' : 'w-6 bg-white/30'}`} />
                  <span className="sr-only">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}
