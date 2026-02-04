'use client';

import React, { useState, useEffect, useMemo } from "react";

const StarsCanvas = () => {
  const [ThreeComponents, setThreeComponents] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    
    // Dynamically import Three.js libraries
    Promise.all([
      import('@react-three/fiber'),
      import('@react-three/drei'),
      import('maath/random/dist/maath-random.esm')
    ]).then(([fiber, drei, maath]) => {
      if (isMounted) {
        setThreeComponents({
          Canvas: fiber.Canvas,
          Points: drei.Points,
          PointMaterial: drei.PointMaterial,
          Preload: drei.Preload,
          random: maath
        });
      }
    }).catch(err => {
      console.error('Failed to load Three.js:', err);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const sphere = useMemo(() => {
    if (ThreeComponents?.random) {
      return ThreeComponents.random.inSphere(new Float32Array(3000), { radius: 1.2 });
    }
    return null;
  }, [ThreeComponents]);

  if (!ThreeComponents || !sphere) {
    return null;
  }

  const { Canvas, Points, PointMaterial, Preload } = ThreeComponents;

  return (
    <div className='w-full h-full absolute inset-0 z-0 pointer-events-none'>
      <Canvas camera={{ position: [0, 0, 1] }} style={{ background: 'transparent' }}>
        <React.Suspense fallback={null}>
          <group rotation={[0, 0, Math.PI / 4]}>
            <Points positions={sphere} stride={3} frustumCulled>
              <PointMaterial
                transparent
                color='#0EA5E9'
                size={0.003}
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
