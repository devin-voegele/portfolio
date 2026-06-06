'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import type { Points as ThreePoints } from 'three'

function ParticleCloud() {
  const ref = useRef<ThreePoints>(null)

  const positions = useMemo(() => {
    const count = 500
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 12  // x: -6 to 6
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8   // y: -4 to 4
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4   // z: -2 to 2
    }
    return arr
  }, [])

  useFrame((_state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.02
    ref.current.rotation.x += delta * 0.005
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

export default function ParticleField() {
  return (
    <Canvas
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 5], fov: 60 }}
      dpr={[1, 2]}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      <ParticleCloud />
    </Canvas>
  )
}
