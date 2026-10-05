'use client'

import { Component, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { usePerfMode, type PerfTier } from '@/components/providers/PerfProvider'

/**
 * Hero backdrop: a living network. Nodes sit on a noisy shell, linked to their
 * nearest neighbours; small light packets travel along random edges and nodes
 * swell toward the cursor. Everything is shader-driven (no per-frame JS per
 * node), additive-blended points + line segments — a handful of draw calls.
 *
 * Perf contract: lazy-loaded (see HeroBackdrop), not mounted at all under
 * reduced motion, lighter on weak/mobile tiers, and the render loop is
 * stopped whenever the hero is off-screen or the tab is hidden.
 */

const COMMON = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uAspect;
  uniform float uPx;
  float nearPointer(vec4 clip) {
    vec2 ndc = clip.xy / clip.w;
    vec2 d = (ndc - uPointer) * vec2(uAspect, 1.0);
    return smoothstep(0.62, 0.0, length(d));
  }
  float depthFade(float viewZ) { return 1.0 - smoothstep(5.2, 8.8, -viewZ); }
`

const NODE_VERT = /* glsl */ `
  ${COMMON}
  attribute float aSeed;
  varying float vA;
  varying float vN;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vec4 clip = projectionMatrix * mv;
    gl_Position = clip;
    float n = nearPointer(clip);
    float pulse = 0.6 + 0.4 * sin(uTime * 1.2 + aSeed * 6.2831);
    vA = (0.34 + 0.5 * depthFade(mv.z)) * (0.65 + 0.35 * pulse) + n * 0.6;
    vN = n;
    gl_PointSize = uPx * (2.8 + 2.4 * pulse + 6.0 * n) * (7.0 / -mv.z);
  }
`
const NODE_FRAG = /* glsl */ `
  varying float vA;
  varying float vN;
  void main() {
    float r = length(gl_PointCoord - 0.5);
    if (r > 0.5) discard;
    float a = smoothstep(0.5, 0.0, r);
    a = a * a * 1.5;
    vec3 c = mix(vec3(0.74, 0.74, 0.82), vec3(1.0, 1.0, 1.0), vN);
    gl_FragColor = vec4(c, a * vA);
  }
`

const LINE_VERT = /* glsl */ `
  ${COMMON}
  varying float vA;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vec4 clip = projectionMatrix * mv;
    gl_Position = clip;
    vA = 0.13 + 0.32 * depthFade(mv.z) + nearPointer(clip) * 0.55;
  }
`
const LINE_FRAG = /* glsl */ `
  varying float vA;
  void main() { gl_FragColor = vec4(0.6, 0.6, 0.8, vA); }
`

const PACKET_VERT = /* glsl */ `
  ${COMMON}
  attribute vec3 aA;
  attribute vec3 aB;
  attribute float aPhase;
  attribute float aSpeed;
  varying float vA;
  void main() {
    float t = fract(uTime * aSpeed + aPhase);
    vec3 p = mix(aA, aB, t);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float edge = sin(3.14159 * t);
    vA = edge * (0.5 + 0.4 * depthFade(mv.z));
    gl_PointSize = uPx * (3.2 + 2.4 * edge) * (7.0 / -mv.z);
  }
`
const PACKET_FRAG = /* glsl */ `
  varying float vA;
  void main() {
    float r = length(gl_PointCoord - 0.5);
    if (r > 0.5) discard;
    float a = smoothstep(0.5, 0.0, r);
    gl_FragColor = vec4(0.66, 0.5, 1.0, a * a * 1.7 * vA);
  }
`

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildGraph(n: number, packetCount: number) {
  const rnd = mulberry32(11)
  const golden = Math.PI * (3 - Math.sqrt(5))
  const nodes: THREE.Vector3[] = []
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const th = golden * i
    const R = 1.7 + (rnd() - 0.5) * 0.7
    nodes.push(new THREE.Vector3(Math.cos(th) * r * R, y * R, Math.sin(th) * r * R))
  }

  // each node links to its 3 nearest neighbours (skipping long chords)
  const MAX2 = 1.15 * 1.15
  const seen = new Set<string>()
  const edges: [number, number][] = []
  for (let i = 0; i < n; i++) {
    const near = nodes
      .map((p, j) => [p.distanceToSquared(nodes[i]), j] as const)
      .filter(([, j]) => j !== i)
      .sort((a, b) => a[0] - b[0])
      .slice(0, 3)
    for (const [d2, j] of near) {
      if (d2 > MAX2) continue
      const key = i < j ? `${i}-${j}` : `${j}-${i}`
      if (seen.has(key)) continue
      seen.add(key)
      edges.push([i, j])
    }
  }

  const nodeGeo = new THREE.BufferGeometry()
  const pos = new Float32Array(n * 3)
  const seeds = new Float32Array(n)
  nodes.forEach((p, i) => {
    pos.set([p.x, p.y, p.z], i * 3)
    seeds[i] = rnd()
  })
  nodeGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  nodeGeo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))

  const lineGeo = new THREE.BufferGeometry()
  const lp = new Float32Array(edges.length * 6)
  edges.forEach(([a, b], i) => {
    lp.set([nodes[a].x, nodes[a].y, nodes[a].z, nodes[b].x, nodes[b].y, nodes[b].z], i * 6)
  })
  lineGeo.setAttribute('position', new THREE.BufferAttribute(lp, 3))

  const packetGeo = new THREE.BufferGeometry()
  const pCount = Math.min(packetCount, edges.length)
  const aA = new Float32Array(pCount * 3)
  const aB = new Float32Array(pCount * 3)
  const aPhase = new Float32Array(pCount)
  const aSpeed = new Float32Array(pCount)
  for (let i = 0; i < pCount; i++) {
    const [a, b] = edges[Math.floor(rnd() * edges.length)]
    const flip = rnd() > 0.5
    const from = nodes[flip ? b : a]
    const to = nodes[flip ? a : b]
    aA.set([from.x, from.y, from.z], i * 3)
    aB.set([to.x, to.y, to.z], i * 3)
    aPhase[i] = rnd()
    aSpeed[i] = 0.12 + rnd() * 0.22
  }
  packetGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pCount * 3), 3))
  packetGeo.setAttribute('aA', new THREE.BufferAttribute(aA, 3))
  packetGeo.setAttribute('aB', new THREE.BufferAttribute(aB, 3))
  packetGeo.setAttribute('aPhase', new THREE.BufferAttribute(aPhase, 1))
  packetGeo.setAttribute('aSpeed', new THREE.BufferAttribute(aSpeed, 1))
  // positions are computed in the shader — skip CPU frustum culling
  nodeGeo.boundingSphere = lineGeo.boundingSphere = packetGeo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 4)

  return { nodeGeo, lineGeo, packetGeo }
}

function Network({ tier }: { tier: PerfTier }) {
  const group = useRef<THREE.Group>(null)
    const angle = useRef(0)
  const pointer = useRef({ x: 0, y: 0, sx: 9, sy: 9 })

  const full = tier === 'full'
  const { nodeGeo, lineGeo, packetGeo } = useMemo(() => buildGraph(full ? 260 : 130, full ? 70 : 28), [full])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(9, 9) },
      uAspect: { value: 1 },
      uPx: { value: 1 },
    }),
    [],
  )

  const mats = useMemo(() => {
    const base = { uniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }
    return {
      node: new THREE.ShaderMaterial({ ...base, vertexShader: NODE_VERT, fragmentShader: NODE_FRAG }),
      line: new THREE.ShaderMaterial({ ...base, vertexShader: LINE_VERT, fragmentShader: LINE_FRAG }),
      packet: new THREE.ShaderMaterial({ ...base, vertexShader: PACKET_VERT, fragmentShader: PACKET_FRAG }),
    }
  }, [uniforms])

  useEffect(
    () => () => {
      nodeGeo.dispose()
      lineGeo.dispose()
      packetGeo.dispose()
      mats.node.dispose()
      mats.line.dispose()
      mats.packet.dispose()
    },
    [nodeGeo, lineGeo, packetGeo, mats],
  )

  // Pointer is tracked on the window so the text laid over the canvas doesn't
  // swallow events; converted to the canvas' own NDC space.
  const gl = useThree((s) => s.gl)
  useEffect(() => {
    const el = gl.domElement
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const x = ((e.clientX - r.left) / r.width) * 2 - 1
      const y = -(((e.clientY - r.top) / r.height) * 2 - 1)
      const inside = Math.abs(x) <= 1.05 && Math.abs(y) <= 1.05
      pointer.current.x = inside ? x : 0
      pointer.current.y = inside ? y : 0
      pointer.current.sx = inside ? x : 9
      pointer.current.sy = inside ? y : 9
    }
    const leave = () => {
      pointer.current.x = pointer.current.y = 0
      pointer.current.sx = pointer.current.sy = 9
    }
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
    }
  }, [gl])

  useFrame((state, dt) => {
    const d = Math.min(dt, 0.05)
    uniforms.uTime.value += d
    uniforms.uAspect.value = state.size.width / state.size.height
    uniforms.uPx.value = state.gl.getPixelRatio()

    const p = pointer.current
    const k = 1 - Math.exp(-d * 6)
    uniforms.uPointer.value.x += (p.sx - uniforms.uPointer.value.x) * (p.sx === 9 ? 1 : k)
    uniforms.uPointer.value.y += (p.sy - uniforms.uPointer.value.y) * (p.sy === 9 ? 1 : k)

    const g = group.current
    if (!g) return
    angle.current += d * 0.07
    g.rotation.y += (angle.current + p.x * 0.45 - g.rotation.y) * k
    g.rotation.x += (0.28 - p.y * 0.22 - g.rotation.x) * k
    // smaller on phones so it frames the title instead of swamping it
    const sc = state.size.width < 640 ? 0.72 : 1
    g.scale.setScalar(g.scale.x + (sc - g.scale.x) * k)
  })

  return (
    <group ref={group}>
      <lineSegments geometry={lineGeo} material={mats.line} frustumCulled={false} />
      <points geometry={nodeGeo} material={mats.node} frustumCulled={false} />
      <points geometry={packetGeo} material={mats.packet} frustumCulled={false} />
    </group>
  )
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

export default function HeroScene() {
  const tier = usePerfMode()
  const hostRef = useRef<HTMLDivElement>(null)
  const [onScreen, setOnScreen] = useState(true)
  const [tabVisible, setTabVisible] = useState(true)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = hostRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { rootMargin: '80px' })
    io.observe(el)
    const vis = () => setTabVisible(!document.hidden)
    document.addEventListener('visibilitychange', vis)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', vis)
    }
  }, [])

  // Reduced motion → no scene at all (the static CSS glow remains).
  if (tier === 'off') return null

  const full = tier === 'full'
  return (
    <div
      ref={hostRef}
      aria-hidden
      className="hero-scene"
      style={{ opacity: ready ? 1 : 0 }}
    >
      <SceneBoundary>
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          camera={{ position: [0, 0, 6.4], fov: 45 }}
          frameloop={onScreen && tabVisible ? 'always' : 'never'}
          onCreated={() => setReady(true)}
        >
          <Network tier={tier} />
        </Canvas>
      </SceneBoundary>
    </div>
  )
}
