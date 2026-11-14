import { principles } from '../data/content'
import { TextLink } from './site/ui'

export default function Workshop() {
  return (
    <section id="workshop" className="bg-paper px-4 py-24 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-xs tracking-[0.28em] text-yellow-2 uppercase">06 — Workshop & field service</p>
          <h2 className="mt-4 font-display text-[clamp(3rem,5vw,4.6rem)] leading-[0.9] font-bold uppercase">
            Expertise that works behind the machines.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink/75">
            From the workshop floor to remote sites, our field service engineers and specialists bring 10 to 25 years of
            premium-dealership experience to every job.
          </p>
          <p className="mt-4 font-medium">Every repair follows the manufacturer&apos;s procedures.</p>
          <div className="mt-8">
            <TextLink tone="light" to="/company#why">
              Why choose YES
            </TextLink>
          </div>
        </div>
        <ul className="grid gap-px bg-ink/10 sm:grid-cols-2">
          {principles.map((item) => (
            <li key={item.n} className="bg-paper p-5">
              <p className="font-display text-xl text-yellow-2">{item.n}</p>
              <h3 className="mt-2 font-display text-2xl uppercase">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
