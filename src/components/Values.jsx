import { values } from '../data/content'

export default function Values() {
  const row = [...values, ...values]
  return (
    <section aria-label="Our core values" className="overflow-hidden border-y border-white/10 bg-ink text-transparent [-webkit-text-stroke:1px_rgba(243,240,232,0.55)]">
      <h2 className="sr-only">Our core values</h2>
      <div className="flex">
        <div className="marquee-track flex min-w-max py-6">
          {row.map((value, index) => (
            <span key={`${value}-${index}`} className="flex items-center">
              <span className="px-6 font-display text-4xl tracking-wide uppercase sm:text-6xl">{value}</span>
              <span className="h-2 w-2 bg-yellow" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
