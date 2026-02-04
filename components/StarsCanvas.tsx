'use client';

import React, { useState, useRef, Suspense } from "react";

// Lazy load Three.js components to avoid SSR issues
let Canvas: any;
let useFrame: any;
let Points: any;
let PointMaterial: any;
let Preload: any;
let random: any;

if (typeof window !== 'undefined') {
  const fiber = require('@react-three/fiber');
  const drei = require('@react-three/drei');
  const maath = require('maath/random/dist/maath-random.esm');
  Canvas = fiber.Canvas;
  useFrame = fiber.useFrame;
  Points = drei.Points;
  PointMaterial = drei.PointMaterial;
  Preload = drei.Preload;
  random = maath;
}

const Stars = () => {
  const ref = useRef<any>(null);
  const [sphere] = useState(() => {
    if (random) {
      return random.inSphere(new Float32Array(5000), { radius: 1.2 });
    }
    return new Float32Array(5000);
  });

  if (typeof window !== 'undefined' && useFrame) {
    useFrame((state: any, delta: number) => {
      if (ref.current) {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
      }
    });
  }

  if (!Points || !PointMaterial) return null;

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color='#0EA5E9'
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  if (typeof window === 'undefined' || !Canvas) {
    return null;
  }

  return (
    <div className='w-full h-full absolute inset-0 z-0'>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
