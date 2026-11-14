import * as THREE from 'three'

export const pitchRadius = ({ teeth, module }) => (teeth * module) / 2

const polar = (radius, angle) => new THREE.Vector2(Math.cos(angle) * radius, Math.sin(angle) * radius)

/** Closed outline of a toothed rim. `internal` builds the inward-facing teeth of a ring gear. */
export function toothOutline(spec, internal = false) {
  const pitch = pitchRadius(spec)
  const tip = internal ? pitch - spec.module : pitch + spec.module
  const root = internal ? pitch + spec.module * 1.25 : pitch - spec.module * 1.25
  const step = (Math.PI * 2) / spec.teeth
  const tipHalf = step * 0.17
  const pitchHalf = step * 0.25
  const upperHalf = (pitchHalf + tipHalf) / 2 + step * 0.015
  const lowerHalf = step * 0.285
  const rootHalf = step * 0.31
  const upper = (pitch + tip) / 2
  const lower = (pitch + root) / 2
  const points = []

  for (let index = 0; index < spec.teeth; index += 1) {
    const centre = index * step
    points.push(
      polar(root, centre - step / 2),
      polar(root, centre - rootHalf),
      polar(lower, centre - lowerHalf),
      polar(pitch, centre - pitchHalf),
      polar(upper, centre - upperHalf),
      polar(tip, centre - tipHalf),
      polar(tip, centre + tipHalf),
      polar(upper, centre + upperHalf),
      polar(pitch, centre + pitchHalf),
      polar(lower, centre + lowerHalf),
      polar(root, centre + rootHalf),
    )
  }

  return points
}

const circlePath = (radius, x = 0, y = 0, clockwise = true) => {
  const path = new THREE.Path()
  path.absarc(x, y, radius, 0, Math.PI * 2, clockwise)
  return path
}

const circleShape = (radius) => {
  const shape = new THREE.Shape()
  shape.absarc(0, 0, radius, 0, Math.PI * 2, false)
  return shape
}

/** Extrudes a shape along Z and centres it, keeping the outline size after the chamfer. */
export function extrudeCentred(shape, depth, bevel = 0.01, curveSegments = 28) {
  const safeBevel = Math.min(bevel, depth / 3)
  const core = Math.max(0.001, depth - safeBevel * 2)
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: core,
    bevelEnabled: safeBevel > 0,
    bevelThickness: safeBevel,
    bevelSize: safeBevel,
    bevelOffset: -safeBevel,
    bevelSegments: 1,
    curveSegments,
    steps: 1,
  })
  geometry.translate(0, 0, -core / 2)
  return geometry
}

export function spurGearGeometry(spec, depth, bore, bevel = 0.01) {
  const shape = new THREE.Shape(toothOutline(spec))
  if (bore > 0) shape.holes.push(circlePath(bore))
  return extrudeCentred(shape, depth, bevel)
}

const reversedPath = (points) => new THREE.Path([...points].reverse())

export function ringGearGeometry(spec, depth, outer, bevel = 0.012) {
  const shape = circleShape(outer)
  shape.holes.push(reversedPath(toothOutline(spec, true)))
  return extrudeCentred(shape, depth, bevel, 64)
}

export function plateGeometry({ outer, inner, depth, outerTeeth, innerTeeth, holes, bevel = 0.006 }) {
  const shape = outerTeeth ? new THREE.Shape(toothOutline(outerTeeth)) : circleShape(outer)
  if (innerTeeth) shape.holes.push(reversedPath(toothOutline(innerTeeth, true)))
  else if (inner > 0) shape.holes.push(circlePath(inner))
  if (holes) {
    for (let index = 0; index < holes.count; index += 1) {
      const angle = (index / holes.count) * Math.PI * 2 + (holes.offset ?? 0)
      shape.holes.push(circlePath(holes.size, Math.cos(angle) * holes.radius, Math.sin(angle) * holes.radius))
    }
  }
  return extrudeCentred(shape, depth, bevel, 40)
}

/** Cutaway housing. Profile pairs are [axial position, radius]. Axis ends up along Z. */
export function housingGeometry(profile, phiStart, phiLength, segments = 80) {
  const polygon = [...profile.outer, ...profile.inner].map(([z, r]) => new THREE.Vector2(r, z))
  const closed = [...polygon, polygon[0].clone()]
  const shell = new THREE.LatheGeometry(closed, segments, phiStart, phiLength)
  shell.rotateX(Math.PI / 2)
  shell.computeVertexNormals()
  const caps = [phiStart, phiStart + phiLength].map((angle) => {
    const cap = new THREE.ShapeGeometry(new THREE.Shape(polygon))
    cap.rotateY(angle - Math.PI / 2)
    cap.rotateX(Math.PI / 2)
    return cap
  })
  return { shell, caps }
}

export function cutawayAngles(facing, opening) {
  const startPlane = facing + opening / 2
  return {
    phiStart: startPlane + Math.PI / 2,
    phiLength: Math.PI * 2 - opening,
  }
}
