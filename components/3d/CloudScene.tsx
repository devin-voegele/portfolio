'use client'

import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Clouds, Cloud } from '@react-three/drei'
import * as THREE from 'three'

interface CloudSceneInnerProps {
  progressRef: React.MutableRefObject<number>
  segments: number
}

function CloudSceneInner({ progressRef, segments }: CloudSceneInnerProps) {
  const { camera } = useThree()
  const targetZ = useRef(10)

  useFrame((_state, delta) => {
    // Map progress 0→1 to camera Z 10→-45 (fly through corridor)
    targetZ.current = 10 - progressRef.current * 55

    // Lerp toward target for smooth camera movement
    ;(camera as THREE.PerspectiveCamera).position.z = THREE.MathUtils.lerp(
      (camera as THREE.PerspectiveCamera).position.z,
      targetZ.current,
      1 - Math.exp(-8 * delta)
    )

    // Subtle drift
    camera.position.y = Math.sin(Date.now() * 0.0003) * 0.3
    camera.position.x = Math.cos(Date.now() * 0.0002) * 0.2
  })

  return (
    <>
      {/* Very low ambient — keeps shadow sides of clouds near-black */}
      <ambientLight color="#0C1120" intensity={0.15} />

      {/* Electric-blue rim light from upper-right — creates blue edges, not white fill */}
      <directionalLight
        color="#3E7BFF"
        intensity={1.5}
        position={[8, 6, -20]}
      />

      {/* Second subtle blue fill from opposite side for variety */}
      <directionalLight
        color="#2E6BFF"
        intensity={0.6}
        position={[-6, -3, -35]}
      />

      <Clouds material={THREE.MeshLambertMaterial}>
        {/* Cloud 1 — entry, left cluster */}
        <Cloud
          seed={42}
          position={[-4, 0, -8]}
          bounds={[6, 3, 4]}
          volume={8}
          segments={segments}
          color="#0A0F1E"
          opacity={0.65}
          growth={4}
          speed={0.1}
        />

        {/* Cloud 2 — mid, right cluster */}
        <Cloud
          seed={7}
          position={[5, 1, -22]}
          bounds={[7, 4, 5]}
          volume={10}
          segments={segments}
          color="#080D18"
          opacity={0.6}
          growth={5}
          speed={0.08}
        />

        {/* Cloud 3 — deep, center mass */}
        <Cloud
          seed={99}
          position={[0, -1, -35]}
          bounds={[8, 5, 6]}
          volume={12}
          segments={segments}
          color="#0C1120"
          opacity={0.7}
          growth={6}
          speed={0.12}
        />

        {/* Cloud 4 — exit, upper cluster */}
        <Cloud
          seed={23}
          position={[-3, 3, -45]}
          bounds={[5, 3, 3]}
          volume={7}
          segments={segments}
          color="#090E1C"
          opacity={0.55}
          growth={4}
          speed={0.09}
        />
      </Clouds>
    </>
  )
}

interface CloudSceneProps {
  progressRef: React.MutableRefObject<number>
  segments?: number
}

export default function CloudScene({ progressRef, segments = 35 }: CloudSceneProps) {
  return (
    <Canvas
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
      camera={{ fov: 60, position: [0, 0, 10], near: 0.1, far: 200 }}
      style={{ width: '100%', height: '100%' }}
    >
      <CloudSceneInner progressRef={progressRef} segments={segments} />
    </Canvas>
  )
}
