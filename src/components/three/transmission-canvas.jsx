import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import * as THREE from 'three'
import {
  cutawayAngles,
  housingGeometry,
  pitchRadius,
  plateGeometry,
  ringGearGeometry,
  spurGearGeometry,
} from './gear-geometry'

const SUN = { teeth: 18, module: 0.075 }
const PLANET = { teeth: 12, module: 0.075 }
const RING = { teeth: 42, module: 0.075 }
const ORBIT = pitchRadius(SUN) + pitchRadius(PLANET)
const PLANET_COUNT = 3
const PLANET_PHASE = Math.PI - Math.PI / PLANET.teeth
const RING_PHASE = -((Math.PI * 2) / RING.teeth) * (-PLANET_PHASE / ((Math.PI * 2) / PLANET.teeth) + 0.5)
const CARRIER_RATIO = SUN.teeth / (SUN.teeth + RING.teeth)
const CLUTCH_PLATES = 9
const CAMERA_DIRECTION = new THREE.Vector3(0.55, 0.3, 1).normalize()
const FACING = Math.atan2(CAMERA_DIRECTION.y, -CAMERA_DIRECTION.z)

const smoothstep = (edge0, edge1, value) => {
  const t = THREE.MathUtils.clamp((value - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

const lerp = (from, to, t) => THREE.MathUtils.lerp(from, to, t)

const createGlowTexture = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const context = canvas.getContext('2d')
  const gradient = context.createRadialGradient(128, 128, 8, 128, 128, 128)
  gradient.addColorStop(0, 'rgba(255, 196, 20, 0.55)')
  gradient.addColorStop(0.45, 'rgba(255, 196, 20, 0.12)')
  gradient.addColorStop(1, 'rgba(255, 196, 20, 0)')
  context.fillStyle = gradient
  context.fillRect(0, 0, 256, 256)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

const bearingGeometries = (bore) => {
  const innerOuter = bore + 0.12
  const outerInner = innerOuter + 0.18
  const ballRadius = 0.075
  return {
    inner: plateGeometry({ outer: innerOuter, inner: bore, depth: 0.2 }),
    outer: plateGeometry({ outer: outerInner + 0.14, inner: outerInner, depth: 0.22 }),
    ball: new THREE.SphereGeometry(ballRadius, 16, 12),
    ballOrbit: (innerOuter + outerInner) / 2,
  }
}

const buildGeometries = () => {
  const opening = Math.PI * 0.64
  const { phiStart, phiLength } = cutawayAngles(FACING, opening)
  const housing = housingGeometry(
    {
      outer: [
        [-2.95, 2.45],
        [-2.78, 2.25],
        [0.55, 2.25],
        [1.05, 1.55],
        [1.45, 1.3],
        [1.62, 1.3],
      ],
      inner: [
        [1.62, 1.18],
        [1.45, 1.18],
        [1.05, 1.43],
        [0.55, 2.13],
        [-2.95, 2.13],
      ],
    },
    phiStart,
    phiLength,
  )
  const solidStart = FACING + opening / 2
  const solidSpan = Math.PI * 2 - opening

  return {
    housingShell: housing.shell,
    housingCaps: housing.caps,
    ribAngles: Array.from({ length: 5 }, (_, index) => solidStart + ((index + 0.5) / 5) * solidSpan),
    boltAngles: Array.from({ length: 14 }, (_, index) => solidStart + ((index + 0.5) / 14) * solidSpan),
    rib: new THREE.BoxGeometry(0.16, 0.16, 0.07),
    housingBolt: new THREE.CylinderGeometry(0.075, 0.075, 0.1, 6).rotateX(Math.PI / 2),
    sun: spurGearGeometry(SUN, 0.52, 0.205),
    planet: spurGearGeometry(PLANET, 0.46, 0.118),
    ring: ringGearGeometry(RING, 0.5, 1.95),
    pin: new THREE.CylinderGeometry(0.11, 0.11, 0.86, 28).rotateX(Math.PI / 2),
    carrierPlate: plateGeometry({
      outer: 1.42,
      inner: 0.3,
      depth: 0.12,
      holes: { radius: 0.78, size: 0.2, count: 3, offset: Math.PI / 3 },
      bevel: 0.014,
    }),
    shaft: new THREE.CylinderGeometry(0.2, 0.2, 3.95, 32).rotateX(Math.PI / 2),
    spline: spurGearGeometry({ teeth: 14, module: 0.032 }, 0.62, 0, 0.004),
    piston: plateGeometry({ outer: 1.5, inner: 0.22, depth: 0.16, bevel: 0.016 }),
    steelPlate: plateGeometry({
      outer: 0,
      inner: 0.95,
      depth: 0.035,
      outerTeeth: { teeth: 40, module: 0.072 },
      bevel: 0.004,
    }),
    frictionPlate: plateGeometry({
      outer: 1.36,
      inner: 0,
      depth: 0.05,
      innerTeeth: { teeth: 44, module: 0.044 },
      bevel: 0.006,
    }),
    inputFlange: plateGeometry({
      outer: 1.72,
      inner: 0.26,
      depth: 0.16,
      holes: { radius: 1.42, size: 0.07, count: 10 },
      bevel: 0.022,
    }),
    flangeBolt: new THREE.CylinderGeometry(0.085, 0.085, 0.12, 6).rotateX(Math.PI / 2),
    inputBearing: bearingGeometries(0.2),
    outputBearing: bearingGeometries(0.3),
    outputShaft: new THREE.CylinderGeometry(0.3, 0.3, 2.1, 32).rotateX(Math.PI / 2),
    outputHub: new THREE.CylinderGeometry(0.44, 0.5, 0.32, 40).rotateX(Math.PI / 2),
    outputFlange: plateGeometry({
      outer: 0.98,
      inner: 0.16,
      depth: 0.16,
      holes: { radius: 0.72, size: 0.075, count: 6 },
      bevel: 0.02,
    }),
    glow: new THREE.PlaneGeometry(18, 10),
  }
}

const buildMaterials = () => ({
  steel: new THREE.MeshStandardMaterial({ color: '#cfd3d8', metalness: 1, roughness: 0.22 }),
  gear: new THREE.MeshStandardMaterial({ color: '#aeb4b8', metalness: 1, roughness: 0.3 }),
  darkSteel: new THREE.MeshStandardMaterial({ color: '#70767e', metalness: 1, roughness: 0.38 }),
  housing: new THREE.MeshStandardMaterial({
    color: '#2d3035',
    metalness: 0.88,
    roughness: 0.5,
    side: THREE.DoubleSide,
    transparent: true,
  }),
  housingBolt: new THREE.MeshStandardMaterial({
    color: '#9a6067',
    metalness: 1,
    roughness: 0.32,
    transparent: true,
  }),
  cut: new THREE.MeshStandardMaterial({
    color: '#ffc414',
    metalness: 0.2,
    roughness: 0.42,
    emissive: new THREE.Color('#ffc414'),
    emissiveIntensity: 0.14,
    side: THREE.DoubleSide,
    transparent: true,
  }),
  yellow: new THREE.MeshStandardMaterial({ color: '#ffc414', metalness: 0.32, roughness: 0.36 }),
  friction: new THREE.MeshStandardMaterial({ color: '#313127', metalness: 0.15, roughness: 0.88 }),
  bolt: new THREE.MeshStandardMaterial({ color: '#4d5259', metalness: 1, roughness: 0.3 }),
  glow: new THREE.MeshBasicMaterial({
    map: createGlowTexture(),
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    opacity: 0.6,
  }),
})

function disposeList(items) {
  items.forEach((item) => {
    if (item?.isBufferGeometry || item?.isMaterial || item?.isTexture) item.dispose()
    if (item?.inner) disposeList([item.inner, item.outer, item.ball])
  })
}

function SceneEnvironment() {
  const { gl, scene } = useThree()
  useEffect(() => {
    const generator = new THREE.PMREMGenerator(gl)
    const room = new RoomEnvironment()
    const texture = generator.fromScene(room, 0.04).texture
    scene.environment = texture
    scene.environmentIntensity = 0.55
    return () => {
      scene.environment = null
      texture.dispose()
      generator.dispose()
    }
  }, [gl, scene])
  return null
}

function Bearing({ set, materials }) {
  return (
    <group>
      <mesh geometry={set.inner} material={materials.steel} />
      <mesh geometry={set.outer} material={materials.darkSteel} />
      {Array.from({ length: 12 }, (_, index) => {
        const angle = (index / 12) * Math.PI * 2
        return (
          <mesh
            key={index}
            geometry={set.ball}
            material={materials.steel}
            position={[Math.cos(angle) * set.ballOrbit, Math.sin(angle) * set.ballOrbit, 0]}
          />
        )
      })}
    </group>
  )
}

function Drivetrain({ progress, interaction, hotspots, reducedMotion, compact }) {
  const pitchGroup = useRef(null)
  const yawGroup = useRef(null)
  const axial = useRef(null)
  const housingGroup = useRef(null)
  const inputFlange = useRef(null)
  const inputBearing = useRef(null)
  const inputSpin = useRef(null)
  const piston = useRef(null)
  const plates = useRef([])
  const carrier = useRef(null)
  const planets = useRef([])
  const ring = useRef(null)
  const outputGroup = useRef(null)
  const outputBearing = useRef(null)
  const outputFlange = useRef(null)
  const spin = useRef(0)
  const yaw = useRef(0)
  const pitch = useRef(0)
  const anchor = useMemo(() => new THREE.Vector3(), [])
  const view = useRef('')
  const { camera } = useThree()

  const geometries = useMemo(buildGeometries, [])
  const materials = useMemo(buildMaterials, [])

  useEffect(() => {
    return () => {
      disposeList(Object.values(geometries))
      disposeList(Object.values(materials))
      camera.clearViewOffset()
    }
  }, [camera, geometries, materials])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const value = progress.get()
    const assembleCycle = smoothstep(0.08, 0.42, value) - smoothstep(0.66, 0.94, value)
    const explode = assembleCycle * (compact ? 0.62 : 1)
    const hotspotAlpha = smoothstep(0.34, 0.42, value) * (1 - smoothstep(0.62, 0.68, value))
    const speed = reducedMotion ? 0 : 0.8 + smoothstep(0.7, 1, value) * 1.6
    spin.current += dt * speed

    const sway = reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.22) * 0.3
    const targetYaw = (value - 0.5) * 0.6 + sway + interaction.current.yaw
    yaw.current = THREE.MathUtils.damp(yaw.current, targetYaw, 4, dt)
    pitch.current = THREE.MathUtils.damp(pitch.current, interaction.current.pitch, 4, dt)
    if (yawGroup.current) yawGroup.current.rotation.y = yaw.current
    if (pitchGroup.current) pitchGroup.current.rotation.x = pitch.current

    const sunAngle = spin.current
    const carrierAngle = sunAngle * CARRIER_RATIO
    const orbit = ORBIT * (1 + 0.3 * explode)

    if (inputSpin.current) inputSpin.current.rotation.z = sunAngle
    if (carrier.current) {
      carrier.current.rotation.z = carrierAngle
      carrier.current.position.z = lerp(0, -0.95, explode)
    }
    if (outputGroup.current) outputGroup.current.rotation.z = carrierAngle

    planets.current.forEach((planet, index) => {
      if (!planet) return
      const angle = carrierAngle + (index / PLANET_COUNT) * Math.PI * 2
      planet.position.set(Math.cos(angle) * orbit, Math.sin(angle) * orbit, 0)
      planet.rotation.z = angle + PLANET_PHASE + (SUN.teeth / PLANET.teeth) * (angle - sunAngle)
    })

    if (ring.current) ring.current.position.z = lerp(0, 0.95, explode)
    if (inputFlange.current) inputFlange.current.position.z = lerp(-3.12, -5, explode)
    if (inputBearing.current) inputBearing.current.position.z = lerp(-2.72, -4.3, explode)
    if (piston.current) piston.current.position.z = lerp(-2.42, -3.85, explode)
    plates.current.forEach((plate, index) => {
      if (plate) plate.position.z = lerp(-2.27 + index * 0.075, -3.5 + index * 0.16, explode)
    })
    if (outputGroup.current) outputGroup.current.position.z = lerp(0, 1.75, explode)
    if (outputFlange.current) outputFlange.current.position.z = lerp(2.56, 3, explode)
    if (outputBearing.current) outputBearing.current.position.z = lerp(1.62, 1.9, explode)

    const housingFade = 1 - 0.92 * assembleCycle
    if (housingGroup.current) housingGroup.current.position.y = lerp(0, 2.7, assembleCycle)
    materials.housing.opacity = housingFade
    materials.cut.opacity = housingFade
    materials.housingBolt.opacity = housingFade
    materials.housing.depthWrite = housingFade > 0.95
    materials.cut.depthWrite = housingFade > 0.95

    const { width, height } = state.size
    const aspect = width / Math.max(height, 1)
    const fit = THREE.MathUtils.clamp(1.05 / aspect, 1, 2.3)
    const wide = width >= 1024
    const distance = lerp(15.4, 21.5, assembleCycle) * fit
    state.camera.position.copy(CAMERA_DIRECTION).multiplyScalar(distance)
    state.camera.lookAt(0, 0.15, 0)
    const offsetX = wide ? -width * 0.16 : width >= 768 ? -width * 0.08 : 0
    const offsetY = wide ? height * 0.02 : -height * 0.12
    const key = `${width}:${height}:${offsetX}:${offsetY}`
    if (view.current !== key) {
      state.camera.setViewOffset(width, height, offsetX, offsetY, width, height)
      view.current = key
    }

    if (axial.current) {
      axial.current.updateWorldMatrix(true, false)
      const anchors = [
        [0, 1.62, lerp(-1.97, -2.91, explode)],
        [0, orbit + 0.6, 0],
        [0, 2.02, lerp(0, 0.95, explode)],
        [0, 1.04, lerp(0, 1.75, explode) + lerp(2.56, 3, explode)],
      ]
      hotspots.current.forEach((node, index) => {
        if (!node) return
        anchor.fromArray(anchors[index])
        anchor.applyMatrix4(axial.current.matrixWorld)
        anchor.project(state.camera)
        const x = (anchor.x * 0.5 + 0.5) * width
        const y = (-anchor.y * 0.5 + 0.5) * height
        const nudge = [
          [-20, 0],
          [-90, -6],
          [70, -6],
          [24, 8],
        ][index]
        node.style.transform = `translate(${x + nudge[0]}px, ${y + nudge[1]}px) translate(-50%, -130%)`
        node.style.opacity = String(hotspotAlpha)
      })
    }
  })

  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[6, 9, 8]} intensity={2.4} color="#fff4e0" />
      <directionalLight position={[-8, 3, -6]} intensity={1.8} color="#ffc414" />
      <directionalLight position={[0, -6, 5]} intensity={0.5} color="#8fa3b8" />
      <gridHelper args={[44, 44, '#5c4a14', '#1c1f24']} position={[0, -2.9, 0]} />
      <mesh
        geometry={geometries.glow}
        material={materials.glow}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0.6, -2.88, 0]}
      />
      <group ref={pitchGroup}>
        <group ref={yawGroup}>
          <group ref={axial} rotation={[0, Math.PI / 2, 0]} position={[0.35, 0, 0]}>
            <group ref={housingGroup}>
              <mesh geometry={geometries.housingShell} material={materials.housing} />
              {geometries.housingCaps.map((cap, index) => (
                <mesh key={index} geometry={cap} material={materials.cut} />
              ))}
              {geometries.ribAngles.map((angle) => (
                <mesh
                  key={angle}
                  geometry={geometries.rib}
                  material={materials.housing}
                  position={[Math.cos(angle) * 2.31, Math.sin(angle) * 2.31, -1.1]}
                  rotation={[0, 0, angle]}
                />
              ))}
              {geometries.boltAngles.map((angle) => (
                <mesh
                  key={angle}
                  geometry={geometries.housingBolt}
                  material={materials.housingBolt}
                  position={[Math.cos(angle) * 2.3, Math.sin(angle) * 2.3, -3]}
                />
              ))}
            </group>

            <group ref={inputFlange} position={[0, 0, -3.12]}>
              <mesh geometry={geometries.inputFlange} material={materials.darkSteel} />
              {Array.from({ length: 10 }, (_, index) => {
                const angle = (index / 10) * Math.PI * 2
                return (
                  <mesh
                    key={index}
                    geometry={geometries.flangeBolt}
                    material={materials.bolt}
                    position={[Math.cos(angle) * 1.42, Math.sin(angle) * 1.42, -0.12]}
                  />
                )
              })}
            </group>

            <group ref={inputBearing} position={[0, 0, -2.72]}>
              <Bearing set={geometries.inputBearing} materials={materials} />
            </group>

            <group ref={inputSpin}>
              <mesh geometry={geometries.shaft} material={materials.steel} position={[0, 0, -1.68]} />
              <mesh geometry={geometries.spline} material={materials.steel} position={[0, 0, -3.35]} />
              <mesh ref={piston} geometry={geometries.piston} material={materials.steel} position={[0, 0, -2.42]} />
              {Array.from({ length: CLUTCH_PLATES }, (_, index) => (
                <mesh
                  key={index}
                  ref={(node) => {
                    plates.current[index] = node
                  }}
                  geometry={index % 2 === 0 ? geometries.steelPlate : geometries.frictionPlate}
                  material={index % 2 === 0 ? materials.gear : materials.friction}
                  position={[0, 0, -2.27 + index * 0.075]}
                />
              ))}
              <mesh geometry={geometries.sun} material={materials.gear} />
            </group>

            <group ref={carrier}>
              <mesh geometry={geometries.carrierPlate} material={materials.yellow} position={[0, 0, -0.42]} />
              {Array.from({ length: PLANET_COUNT }, (_, index) => {
                const angle = (index / PLANET_COUNT) * Math.PI * 2
                return (
                  <mesh
                    key={index}
                    geometry={geometries.pin}
                    material={materials.steel}
                    position={[Math.cos(angle) * ORBIT, Math.sin(angle) * ORBIT, -0.01]}
                  />
                )
              })}
            </group>

            {Array.from({ length: PLANET_COUNT }, (_, index) => (
              <mesh
                key={index}
                ref={(node) => {
                  planets.current[index] = node
                }}
                geometry={geometries.planet}
                material={materials.gear}
              />
            ))}

            <mesh
              ref={ring}
              geometry={geometries.ring}
              material={materials.gear}
              rotation={[0, 0, RING_PHASE]}
            />

            <group ref={outputGroup}>
              <mesh geometry={geometries.outputShaft} material={materials.steel} position={[0, 0, 1.5]} />
              <mesh geometry={geometries.outputHub} material={materials.darkSteel} position={[0, 0, 0.82]} />
              <group ref={outputBearing} position={[0, 0, 1.62]}>
                <Bearing set={geometries.outputBearing} materials={materials} />
              </group>
              <group ref={outputFlange} position={[0, 0, 2.56]}>
                <mesh geometry={geometries.outputFlange} material={materials.yellow} />
                {Array.from({ length: 6 }, (_, index) => {
                  const angle = (index / 6) * Math.PI * 2
                  return (
                    <mesh
                      key={index}
                      geometry={geometries.flangeBolt}
                      material={materials.bolt}
                      position={[Math.cos(angle) * 0.72, Math.sin(angle) * 0.72, 0.12]}
                    />
                  )
                })}
              </group>
            </group>
          </group>
        </group>
      </group>
    </>
  )
}

export default function TransmissionCanvas({
  progress,
  interaction,
  hotspots,
  active,
  reducedMotion,
  compact,
  onReady,
}) {
  return (
    <Canvas
      camera={{ position: [6, 3.4, 11], fov: 32, near: 0.1, far: 80 }}
      dpr={compact ? [1, 1.5] : [1, 1.75]}
      frameloop={active ? 'always' : 'demand'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 1.05
        onReady?.()
      }}
    >
      <color attach="background" args={['#0b0c0e']} />
      <fog attach="fog" args={['#0b0c0e', 18, 44]} />
      <SceneEnvironment />
      <Drivetrain
        progress={progress}
        interaction={interaction}
        hotspots={hotspots}
        reducedMotion={reducedMotion}
        compact={compact}
      />
    </Canvas>
  )
}
