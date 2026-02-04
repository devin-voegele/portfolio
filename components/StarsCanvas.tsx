'use client';

import React, { useState, useEffect } from "react";

const StarsCanvas = () => {
  const [mounted, setMounted] = useState(false);
  const [ThreeComponents, setThreeComponents] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    
    // Dynamically import Three.js libraries
    Promise.all([
      import('@react-three/fiber'),
      import('@react-three/drei'),
      import('maath/random/dist/maath-random.esm')
    ]).then(([fiber, drei, maath]) => {
      setThreeComponents({
        Canvas: fiber.Canvas,
        useFrame: fiber.useFrame,
        Points: drei.Points,
        PointMaterial: drei.PointMaterial,
        Preload: drei.Preload,
        random: maath
      });
    });
  }, []);

  if (!mounted || !ThreeComponents) {
    return <div className='w-full h-full absolute inset-0 z-0 bg-black' />;
  }

  const { Canvas, Points, PointMaterial, Preload, random } = ThreeComponents;

  const sphere = random.inSphere(new Float32Array(3000), { radius: 1.2 });

  return (
    <div className='w-full h-full absolute inset-0 z-0'>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <React.Suspense fallback={null}>
          <group rotation={[0, 0, Math.PI / 4]}>
            <Points positions={sphere} stride={3} frustumCulled>
              <PointMaterial
                transparent
                color='#0EA5E9'
                size={0.002}
                sizeAttenuation={true}
                depthWrite={false}
              />
            </Points>
          </group>
        </React.Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
