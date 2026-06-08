'use client'

import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import type { Group } from 'three'

// ── Crystal mesh (rim-lit dark faceted icosahedron) ───────────────────────────
function Crystal() {
  const groupRef = useRef<Group>(null)
  const { pointer } = useThree()

  useFrame((_state, delta) => {
    if (!groupRef.current) return
    // slow auto-rotation
    groupRef.current.rotation.y += delta * 0.18
    groupRef.current.rotation.x += delta * 0.07
    // subtle cursor parallax — small magnitude
    groupRef.current.rotation.x +=
      (pointer.y * 0.12 - groupRef.current.rotation.x) * 0.03
    groupRef.current.rotation.y +=
      (pointer.x * 0.12 - groupRef.current.rotation.y) * 0.03
  })

  return (
    <group ref={groupRef}>
      {/* Core icosahedron — dark with metallic flatShading */}
      <mesh>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshStandardMaterial
          color="#0b1020"
          metalness={0.6}
          roughness={0.25}
          flatShading
        />
      </mesh>

      {/* Wireframe overlay — electric-blue edges */}
      <mesh scale={1.02}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshBasicMaterial
          wireframe
          transparent
          opacity={0.25}
          color="#3E7BFF"
        />
      </mesh>
    </group>
  )
}

// ── Scene (lights + Float wrapper) ───────────────────────────────────────────
function Scene() {
  return (
    <>
      {/* Very low ambient so the crystal body stays dark */}
      <ambientLight intensity={0.2} />

      {/* Key: blue point from upper-right — creates glowing blue edge */}
      <pointLight position={[4, 4, 4]} color="#2E6BFF" intensity={3} />

      {/* Fill: purple from lower-left — purple rim opposite side */}
      <pointLight position={[-4, -2, 3]} color="#8b5cf6" intensity={2.5} />

      {/* Subtle green accent rim — very low so it doesn't dominate */}
      <pointLight position={[0, -4, -2]} color="#10b981" intensity={1.2} />

      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={0.8}>
        <Crystal />
      </Float>
    </>
  )
}

// ── Exported canvas component ─────────────────────────────────────────────────
export default function HeroObject() {
  return (
    <Canvas
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      <Scene />
    </Canvas>
  )
}
