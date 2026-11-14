import { lazy, Suspense } from 'react'
import About from '../components/About'
import Capabilities from '../components/Capabilities'
import Contact from '../components/Contact'
import Equipment from '../components/Equipment'
import Hero from '../components/Hero'
import Industries from '../components/Industries'
import Partners from '../components/Partners'
import { usePageMeta } from '../components/site/ui'
import Values from '../components/Values'
import Workshop from '../components/Workshop'

const Transmission = lazy(() => import('../components/Transmission'))

export default function Home() {
  usePageMeta(
    '',
    'Heavy equipment, engine and transmission servicing across Oman. Allison Transmission authorised dealer, Dana Spicer certified service centre and FPT Industrial engine dealer.',
    '/',
  )
  return (
    <>
      <Hero />
      <About />
      <Values />
      <Partners />
      <Equipment />
      <Capabilities />
      <Suspense fallback={<section className="bg-[#121210] px-8 py-24 text-mist">Loading 3D model</section>}>
        <Transmission />
      </Suspense>
      <Industries />
      <Workshop />
      <Contact />
    </>
  )
}
