import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { Arrow, ContactBand, FeatureList, PageHero, Section, SpecTable, usePageMeta } from '../components/site/ui'
import { allisonApplications, allisonFamilies, allisonGroups, allisonTechFeatures, allisonTechnology } from '../data/catalog/allison'
import familyApps from '../data/catalog/allison-family-apps.json'
import familyShowcases from '../data/catalog/allison-showcases.json'
import { allisonFamilyImages } from '../data/catalog/images'
import NotFound from './NotFound'

function LabeledCard({ title, text, image }) {
  return (
    <li className="overflow-hidden border border-line bg-ink-2">
      {image ? (
        <div className="aspect-[16/10] bg-ink">
          <img src={image} alt={title} className="h-full w-full object-cover" loading="lazy" />
        </div>
      ) : null}
      <div className={`p-5 ${image ? 'border-t border-line' : ''}`}>
        <h3 className="font-display text-2xl leading-none uppercase">{title}</h3>
        {text ? <p className="mt-3 text-sm leading-6 text-mist">{text}</p> : null}
      </div>
    </li>
  )
}

function YouTubeEmbed({ id, title, autoplay = false, poster }) {
  const [playing, setPlaying] = useState(autoplay)
  const src = `https://www.youtube.com/embed/${id}?${new URLSearchParams({
    autoplay: playing ? '1' : '0',
    mute: autoplay ? '1' : '0',
    playsinline: '1',
    rel: '0',
    modestbranding: '1',
    ...(autoplay ? { loop: '1', playlist: id } : {}),
  }).toString()}`

  if (!playing && poster) {
    return (
      <button
        type="button"
        onClick={() => setPlaying(true)}
        className="group relative block aspect-video w-full overflow-hidden bg-ink text-left"
        aria-label={`Play ${title}`}
      >
        <img src={poster} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        <span className="absolute inset-0 bg-ink/35" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-16 w-16 items-center justify-center border border-paper/40 bg-ink/70 text-paper transition-colors group-hover:border-yellow group-hover:text-yellow">
            <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-current" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
      </button>
    )
  }

  return (
    <div className="aspect-video w-full overflow-hidden bg-ink">
      <iframe
        src={src}
        title={title}
        className="h-full w-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  )
}

function FeatureMedia({ feature }) {
  if (feature.youtube && feature.autoplay) {
    return <YouTubeEmbed id={feature.youtube} title={feature.title} autoplay poster={feature.image} />
  }
  if (feature.youtube) {
    return <YouTubeEmbed id={feature.youtube} title={feature.title} poster={feature.image} />
  }
  if (feature.image) {
    return (
      <div className="relative overflow-hidden bg-ink">
        <img
          src={feature.image}
          alt={feature.imageAlt ?? feature.title}
          className="aspect-video h-full w-full object-cover"
          loading="lazy"
        />
        {feature.note ? (
          <p className="absolute right-4 bottom-4 left-4 border-l-2 border-yellow bg-ink/80 px-3 py-2 text-[11px] tracking-[0.16em] text-paper uppercase">
            {feature.note}
          </p>
        ) : null}
      </div>
    )
  }
  return null
}

export default function AllisonFamily() {
  const { slug } = useParams()
  const index = allisonFamilies.findIndex((item) => item.slug === slug)
  const family = allisonFamilies[index]
  usePageMeta(family ? `Allison ${family.name.replace(/™|®/g, '')}` : 'Not found', family?.intro)
  if (!family) return <NotFound />

  const group = allisonGroups.find((item) => item.id === family.group)
  const photos = allisonFamilyImages(family.slug)
  const hero = photos?.hero ?? '/media/transmission-bay.webp'
  const previous = allisonFamilies[(index - 1 + allisonFamilies.length) % allisonFamilies.length]
  const next = allisonFamilies[(index + 1) % allisonFamilies.length]

  const applications =
    familyApps[family.slug]?.map((item) => {
      const catalog = item.key ? allisonApplications[item.key] : null
      return {
        title: catalog?.title ?? item.title,
        text: catalog?.text ?? item.text,
        image: item.image || catalog?.image,
      }
    }) ??
    family.applications
      .map((key) => {
        const item = allisonApplications[key]
        return item ? { title: item.title, text: item.text, image: item.image } : null
      })
      .filter(Boolean)

  const showcase = familyShowcases[family.slug] ?? []
  const showTechCards = family.technology && allisonTechFeatures.length > 0
  const stories = [family.story, ...(family.stories ?? [])].filter(Boolean)

  return (
    <>
      <PageHero
        crumbs={[
          { to: '/', label: 'Home' },
          { to: '/products', label: 'Products' },
          { to: '/products/allison', label: 'Allison Transmission' },
          { label: family.short },
        ]}
        n={String(index + 1).padStart(2, '0')}
        kicker={`Allison Transmission · ${group.title}`}
        title={family.name}
        intro={family.headline}
        image={hero}
        imageAlt={`Allison ${family.short}`}
        facts={family.specs}
      />

      <Section n="A" kicker="Overview" title={family.headline}>
        {family.overviewImage ? (
          <div className="grid gap-px bg-line lg:grid-cols-2">
            <Reveal className="overflow-hidden bg-ink">
              <img
                src={family.overviewImage}
                alt={family.overviewImageAlt ?? family.name}
                className="aspect-[4/3] h-full w-full object-cover"
                loading="lazy"
              />
            </Reveal>
            <Reveal className="flex flex-col justify-center bg-ink-2 p-8 sm:p-10" delay={0.06}>
              <p className="text-[10px] tracking-[0.22em] text-yellow uppercase">Reliability redefined</p>
              <p className="mt-5 text-lg leading-8 text-paper/85">{family.intro}</p>
              {family.body?.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="mt-4 text-sm leading-7 text-mist">
                  {paragraph}
                </p>
              ))}
              {family.specs ? (
                <div className="mt-8">
                  <SpecTable caption="Technical specification" rows={family.specs} />
                </div>
              ) : null}
            </Reveal>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-6">
              <p className="text-lg leading-8 text-paper/85">{family.intro}</p>
              {family.body?.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="mt-4 text-sm leading-7 text-mist">
                  {paragraph}
                </p>
              ))}
            </Reveal>
            {family.specs ? (
              <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.08}>
                <SpecTable caption="Technical specification" rows={family.specs} />
              </Reveal>
            ) : null}
          </div>
        )}
      </Section>

      {showTechCards ? (
        <Section tone="panel" n="A2" kicker="Technology" title="Industry-leading propulsion technology.">
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {allisonTechFeatures.map((item) => (
              <LabeledCard key={item.title} {...item} />
            ))}
          </ul>
        </Section>
      ) : null}

      {showcase.length ? (
        <Section tone="panel" n="A2" kicker="Product details" title={`${family.short} systems and benefits.`}>
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {showcase.map((item) => (
              <LabeledCard key={item.title} {...item} />
            ))}
          </ul>
        </Section>
      ) : null}

      {family.models ? (
        <Section tone="light" n="B" kicker="Models" title={`The ${family.short} line-up`}>
          <div className="grid gap-6 lg:grid-cols-3">
            {family.models.map((model) => (
              <article key={model.name} className="flex flex-col border border-ink/15 bg-white p-7">
                <p className="text-[10px] tracking-[0.22em] text-yellow-2 uppercase">{model.title}</p>
                <h3 className="mt-3 font-display text-4xl leading-none uppercase">{model.name}</h3>
                <p className="mt-4 text-sm leading-6 text-ink/75">{model.text}</p>
                <div className="mt-6">
                  <SpecTable rows={model.specs} tone="light" />
                </div>
              </article>
            ))}
          </div>
        </Section>
      ) : null}

      {family.components && !showcase.length ? (
        <Section tone="light" n="B" kicker={`Inside ${family.name}`} title="Three systems working together.">
          <FeatureList items={family.components} tone="light" />
        </Section>
      ) : null}

      {family.features?.length ? (
        <Section n="C" kicker="In depth" title="Engineered for the job." tone="panel">
          <div className="space-y-px bg-line">
            {family.features.map((feature, index) => {
              const mediaLeft = feature.mediaSide === 'left'
              return (
                <Reveal key={feature.title} delay={index * 0.04} className="grid gap-px bg-line lg:grid-cols-2">
                  <div className={`flex flex-col justify-center bg-ink-2 p-8 sm:p-10 ${mediaLeft ? 'lg:order-2' : ''}`}>
                    <p className="font-display text-xl text-yellow">{String(index + 1).padStart(2, '0')}</p>
                    <h3 className="mt-5 font-display text-3xl leading-none uppercase sm:text-4xl">{feature.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-paper/80">{feature.text}</p>
                  </div>
                  <div className={`bg-ink ${mediaLeft ? 'lg:order-1' : ''}`}>
                    <FeatureMedia feature={feature} />
                  </div>
                </Reveal>
              )
            })}
          </div>
        </Section>
      ) : family.highlights?.length && !showcase.length ? (
        <Section n="C" kicker="Highlights" title="Engineered for the job." tone="panel">
          <FeatureList items={family.highlights} columns={family.highlights.length === 2 || family.highlights.length === 4 ? 2 : 3} />
        </Section>
      ) : null}

      {family.technology && !showTechCards ? (
        <Section n="D" kicker="Industry-leading propulsion technology" title="Premium performance, lower cost of ownership.">
          <FeatureList items={allisonTechnology} />
        </Section>
      ) : null}

      {stories.length ? (
        <Section n="E" kicker="In the field" tone="panel">
          <div className={`grid gap-px bg-line ${stories.length > 1 && !stories.some((s) => s.image || s.youtube) ? 'lg:grid-cols-2' : ''}`}>
            {stories.map((story, index) => {
              const hasMedia = Boolean(story.image || story.youtube)
              const mediaLeft = story.mediaSide === 'left' || (!story.mediaSide && index % 2 === 1)
              if (!hasMedia) {
                return (
                  <Reveal
                    key={story.title}
                    className={`bg-ink-2 p-8 ${stories.length % 2 === 1 && index === stories.length - 1 ? 'lg:col-span-2' : ''}`}
                  >
                    <p className="text-[10px] tracking-[0.22em] text-yellow uppercase">Customer story</p>
                    <h3 className="mt-4 font-display text-3xl leading-none uppercase">{story.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-paper/80">{story.text}</p>
                  </Reveal>
                )
              }
              return (
                <Reveal key={story.title} className="grid gap-px bg-line lg:grid-cols-2 lg:col-span-full">
                  <div className={`flex flex-col justify-center bg-ink-2 p-8 sm:p-10 ${mediaLeft ? 'lg:order-2' : ''}`}>
                    <p className="text-[10px] tracking-[0.22em] text-yellow uppercase">
                      {story.youtube ? 'Video' : 'Customer story'}
                    </p>
                    <h3 className="mt-4 font-display text-3xl leading-none uppercase">{story.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-paper/80">{story.text}</p>
                  </div>
                  <div className={`overflow-hidden bg-ink ${mediaLeft ? 'lg:order-1' : ''}`}>
                    <FeatureMedia feature={story} />
                  </div>
                </Reveal>
              )
            })}
          </div>
        </Section>
      ) : null}

      {applications.length ? (
        <Section
          n="F"
          kicker={`${family.short} applications`}
          title={`${family.short} applications.`}
          intro="Allison transmissions can be seen in a variety of vocations across the world."
        >
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {applications.map((item) => (
              <LabeledCard key={item.title} title={item.title} text={item.text} image={item.image} />
            ))}
          </ul>
        </Section>
      ) : null}

      <Section tone="light" kicker="Explore the range" n="G">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { label: 'Previous', item: previous },
            { label: 'Next', item: next },
          ].map(({ label, item }) => (
            <Link key={label} to={`/products/allison/${item.slug}`} className="group border border-ink/15 bg-white p-7">
              <span className="text-[10px] tracking-[0.22em] text-ink/50 uppercase">{label} family</span>
              <span className="mt-3 flex items-center justify-between gap-4 font-display text-4xl uppercase transition-colors group-hover:text-yellow-2">
                {item.name}
                <Arrow className="h-5 w-5" />
              </span>
            </Link>
          ))}
        </div>
        <ul className="mt-8 flex flex-wrap gap-2">
          {allisonFamilies.map((item) => (
            <li key={item.slug}>
              <Link
                to={`/products/allison/${item.slug}`}
                aria-current={item.slug === family.slug ? 'page' : undefined}
                className={`block border px-3 py-1.5 text-[10px] tracking-[0.14em] uppercase transition-colors ${
                  item.slug === family.slug ? 'border-ink bg-ink text-paper' : 'border-ink/15 text-ink/75 hover:border-yellow-2'
                }`}
              >
                {item.short}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <ContactBand text={`Ask our team about the Allison ${family.short}, genuine parts, ReMan units and Extended Coverage.`} />
    </>
  )
}
