'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 600
const SPEED = 6

function Particles() {
  const meshRef = useRef<THREE.Points>(null)
  const { pointer } = useThree()

  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 16   // x: [-8, 8]
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10   // y: [-5, 5]
      arr[i * 3 + 2] = Math.random() * 14 - 12       // z: [-12, 2]
    }
    return arr
  }, [])

  useFrame((_state, delta) => {
    const mesh = meshRef.current
    if (!mesh) return

    // Stream particles toward camera
    const posAttr = mesh.geometry.attributes.position as THREE.BufferAttribute
    const arr = posAttr.array as Float32Array
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3 + 2] += SPEED * delta
      if (arr[i * 3 + 2] > 1) {
        arr[i * 3 + 2] -= 15
      }
    }
    posAttr.needsUpdate = true

    // Cursor parallax on the group
    mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, pointer.x * 0.15, 0.05)
    mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, -pointer.y * 0.1, 0.05)
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#5B9DFF"
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  )
}

export default function VelocityField() {
  return (
    <Canvas
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 6], fov: 60 }}
      dpr={[1, 2]}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: 'transparent',
      }}
    >
      <Particles />
    </Canvas>
  )
}
