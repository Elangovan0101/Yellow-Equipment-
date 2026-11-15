import { useEffect, useRef } from 'react'
import { company, offerings } from '../data/content'
import Reveal from './Reveal'
import { TextLink } from './site/ui'

function LazyVideo(props) {
  const ref = useRef(null)
  useEffect(() => {
    const video = ref.current
    if (!video) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) video.src = video.dataset.src
          const play = video.play()
          if (play) play.catch(() => {})
        } else {
          video.pause()
        }
      },
      { rootMargin: '200px' },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])
  return <video ref={ref} preload="none" {...props} />
}

export default function About() {
  return (
    <section id="about" className="bg-ink px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <p className="flex items-center gap-3 text-[11px] tracking-[0.28em] text-yellow uppercase">
            <span>01</span>
            <span className="h-px w-8 bg-yellow/70" />
            About Yellow Equipment
          </p>
          <h2 className="mt-6 font-display text-[clamp(3.6rem,8vw,6.5rem)] leading-[0.86] font-bold tracking-tight text-transparent uppercase [-webkit-text-stroke:1.5px_#f3f0e8]">
            Performance
          </h2>
          <p className="mt-8 max-w-xl text-base leading-7 text-paper/90">
            <strong className="font-semibold text-paper">{company.name}</strong> is a trusted name in Oman&apos;s heavy
            equipment industry, serving construction, mining, agriculture, marine, power generation and material handling.
          </p>
          <p className="mt-4 max-w-xl leading-7 text-mist">
            Our team supplies engines, generators, genuine spare parts and service solutions, backed by strong technical
            expertise and a clear focus on our customers.
          </p>
          <blockquote className="mt-8 max-w-xl border-l-2 border-yellow pl-5">
            <p className="text-[11px] tracking-[0.22em] text-yellow uppercase">Our mission</p>
            <p className="mt-3 text-lg leading-snug text-paper">“{company.mission}”</p>
          </blockquote>
          <div className="mt-8">
            <TextLink to="/company">Company profile</TextLink>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <figure className="relative min-h-[520px] overflow-hidden">
            <LazyVideo
              className="absolute inset-0 h-full w-full object-cover"
              data-src="/media/about.mp4"
              poster="/media/about-poster.webp"
              muted
              playsInline
              loop
              aria-label="Yellow Equipment workshop and field operations"
            />
            <figcaption className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-ink via-ink/70 to-transparent p-6">
              <p className="font-display text-6xl leading-none text-yellow sm:text-7xl">10–25</p>
              <p className="mt-3 max-w-xs text-sm leading-5 text-paper">
                Years of premium-dealership experience across our field engineers, specialists and management.
              </p>
              <p className="mt-4 text-[10px] tracking-[0.2em] text-mist uppercase">Fig. 01 / Field operations</p>
            </figcaption>
          </figure>
        </Reveal>
      </div>

      <div id="offerings" className="mx-auto mt-20 max-w-[1440px]">
        <Reveal>
          <p className="text-[11px] tracking-[0.28em] text-yellow uppercase">Our offerings</p>
          <h3 className="mt-3 max-w-3xl font-display text-4xl leading-none uppercase md:text-5xl">
            Sourced from Germany, Belgium, UK, Italy, USA, India and China.
          </h3>
        </Reveal>
        <div className="mt-10 grid gap-px bg-line sm:grid-cols-2 xl:grid-cols-4">
          {offerings.map((item) => (
            <article key={item.n} className="bg-ink p-6">
              <p className="font-display text-2xl text-yellow">{item.n}</p>
              <h4 className="mt-6 font-display text-3xl leading-none uppercase">{item.title}</h4>
              <p className="mt-3 text-sm leading-relaxed text-mist">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
