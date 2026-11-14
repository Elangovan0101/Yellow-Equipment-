import { useEffect, useRef, useState } from 'react'
import { useInView, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import TransmissionCanvas from './three/transmission-canvas'
import { TextLink } from './site/ui'

const STAGES = [
  {
    label: 'Assembled',
    title: 'The heart of an automatic transmission',
    body: 'Planetary gearsets and multi-plate clutch packs sit at the core of fully automatic transmissions like the Allison units we support. Drag the model to turn it.',
  },
  {
    label: 'Exploded',
    title: 'Stripped to every component',
    body: 'In a major rebuild the unit comes apart down to individual parts, and each one is inspected against manufacturer procedures and reusability guidelines.',
  },
  {
    label: 'Rebuilt',
    title: 'Back together, back to work',
    body: 'Worn components are replaced with genuine, authorised parts, and the rebuilt assembly returns to service covered by warranty.',
  },
]

const HOTSPOTS = [
  { name: 'Clutch pack', detail: 'Friction and steel plates engage to hold or drive each gear range.' },
  { name: 'Sun & planet gears', detail: 'Planetary gearing multiplies torque in a compact, balanced package.' },
  { name: 'Ring gear', detail: 'Internal teeth mesh with the planets. Holding it changes the ratio.' },
  { name: 'Output flange', detail: 'Transfers drive to the propeller shaft and the axles.' },
]

const STAGE_PROGRESS = [0.08, 0.5, 0.98]

export default function Transmission() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const pointer = useRef({ x: 0, y: 0, id: -1 })
  const interaction = useRef({ yaw: 0, pitch: 0, dragging: false })
  const hotspots = useRef([])
  const [stage, setStage] = useState(0)
  const [supported, setSupported] = useState(true)
  const [ready, setReady] = useState(false)
  const [compact, setCompact] = useState(false)
  const reduced = useReducedMotion() ?? false
  const near = useInView(stageRef, { margin: '700px 0px 700px 0px', once: true })
  const visible = useInView(stageRef, { amount: 0.05 })
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = value < 0.33 ? 0 : value < 0.64 ? 1 : 2
    setStage((previous) => (previous === next ? previous : next))
  })

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      setSupported(Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl')))
    } catch {
      setSupported(false)
    }
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)')
    const apply = () => setCompact(media.matches)
    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [])

  const onPointerDown = (event) => {
    pointer.current = { x: event.clientX, y: event.clientY, id: event.pointerId }
    interaction.current.dragging = true
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event) => {
    if (!interaction.current.dragging || event.pointerId !== pointer.current.id) return
    const dx = event.clientX - pointer.current.x
    const dy = event.clientY - pointer.current.y
    pointer.current.x = event.clientX
    pointer.current.y = event.clientY
    interaction.current.yaw += dx * 0.009
    interaction.current.pitch = Math.max(-0.45, Math.min(0.45, interaction.current.pitch + dy * 0.005))
  }

  const onPointerEnd = (event) => {
    interaction.current.dragging = false
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  const jumpToStage = (index) => {
    const section = sectionRef.current
    if (!section) return
    const start = section.offsetTop
    const span = section.offsetHeight - window.innerHeight
    window.scrollTo({ top: start + span * STAGE_PROGRESS[index], behavior: 'smooth' })
  }

  const current = STAGES[stage]

  return (
    <section id="transmission" ref={sectionRef} className="relative h-[280vh] bg-[#0b0c0e] text-paper">
      <div ref={stageRef} className="sticky top-0 h-[100svh] overflow-hidden">
        <div
          className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerEnd}
          onPointerCancel={onPointerEnd}
        >
          {supported && near ? (
            <TransmissionCanvas
              progress={scrollYProgress}
              interaction={interaction}
              hotspots={hotspots}
              active={visible}
              reducedMotion={reduced}
              compact={compact}
              onReady={() => setReady(true)}
            />
          ) : null}
          {supported && !ready ? (
            <p className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.22em] text-mist uppercase">
              Building the drivetrain
            </p>
          ) : null}
          {!supported ? (
            <div className="flex h-full items-center justify-center px-8 text-center text-mist">
              This browser cannot show the 3D model. The three stages are still described beside it.
            </div>
          ) : null}
        </div>

        <div className="pointer-events-none absolute inset-0 z-10">
          {HOTSPOTS.map((hotspot, index) => (
            <div
              key={hotspot.name}
              ref={(node) => {
                hotspots.current[index] = node
              }}
              className={`absolute top-0 left-0 ${stage === 1 ? '' : 'invisible'}`}
              style={{ opacity: 0 }}
            >
              <span className="flex items-center gap-2 whitespace-nowrap">
                <span className="size-1.5 shrink-0 rounded-full bg-yellow" />
                <span className="bg-[#0b0c0e]/80 px-2 py-1 text-[10px] tracking-[0.16em] text-paper uppercase">
                  0{index + 1} {hotspot.name}
                </span>
              </span>
            </div>
          ))}
        </div>

        <div className="pointer-events-none relative z-20 flex h-full flex-col justify-between px-5 pt-24 pb-8 md:px-10 md:pt-28 lg:px-16">
          <div className="w-full max-w-[480px]">
            <p className="flex items-center gap-3 text-[11px] tracking-[0.28em] text-yellow uppercase">
              <span>04</span>
              <span className="h-px w-8 bg-yellow/80" />
              Inside the drivetrain
            </p>
            <h2 className="mt-5 max-w-[11ch] font-display text-5xl leading-[0.88] tracking-tight uppercase md:text-7xl">
              Inside the machines we rebuild
            </h2>
            <div className="mt-8 grid max-w-md grid-cols-3" role="tablist" aria-label="Transmission stages">
              {STAGES.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  role="tab"
                  aria-selected={stage === index}
                  className={`pointer-events-auto border-b pb-2 text-left text-[11px] tracking-[0.16em] uppercase ${
                    stage === index ? 'border-yellow text-paper' : 'border-white/15 text-white/35'
                  }`}
                  onClick={() => jumpToStage(index)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <h3 className="mt-7 text-sm font-semibold tracking-[0.12em] uppercase">{current.title}</h3>
            <p className="mt-3 max-w-sm text-sm leading-6 text-mist">{current.body}</p>
            <div className="pointer-events-auto mt-6 flex flex-wrap gap-6">
              <TextLink to="/products/allison">Allison families</TextLink>
              <TextLink to="/services/component-rebuilds">Rebuild service</TextLink>
            </div>
          </div>

          <div className="flex items-end justify-between gap-8">
            <p className="text-[11px] tracking-[0.18em] text-mist uppercase">
              Drag to rotate / illustrative model, rendered live
            </p>
            {stage === 1 ? (
              <dl className="hidden max-w-[34rem] shrink-0 grid-cols-2 gap-x-8 gap-y-4 lg:grid">
                {HOTSPOTS.map((hotspot, index) => (
                  <div key={hotspot.name} className="max-w-[16rem]">
                    <dt className="text-[11px] tracking-[0.16em] text-yellow uppercase">
                      0{index + 1} {hotspot.name}
                    </dt>
                    <dd className="mt-1 text-xs leading-5 text-mist">{hotspot.detail}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
