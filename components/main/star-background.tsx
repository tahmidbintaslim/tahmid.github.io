'use client';

import { PointMaterial, Points } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';

import { Suspense, useRef, useState } from 'react';
import type { Points as PointsType } from 'three';

// Generate random sphere coordinates using native Math functions
const generateSphere = (count: number, radius: number): Float32Array => {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 3) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const r = radius * Math.random();
    arr[i] = r * Math.sin(phi) * Math.cos(theta);
    arr[i + 1] = r * Math.sin(phi) * Math.sin(theta);
    arr[i + 2] = r * Math.cos(phi);
  }
  return arr;
};

export const StarBackground = () => {
  const ref = useRef<PointsType | null>(null);
  const [sphere] = useState<Float32Array>(() => generateSphere(5000, 1.2));

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} stride={3} positions={sphere} frustumCulled>
        <PointMaterial
          transparent
          color="#fff"
          size={0.0015}
          sizeAttenuation
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
};

export const StarsCanvas = () => (
  <div className="fixed inset-0 -z-10 h-full w-full opacity-40">
    <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
      <Suspense fallback={null}>
        <StarBackground />
        <EffectComposer>
          <Bloom
            intensity={0.3}
            luminanceThreshold={0.9}
            luminanceSmoothing={0.9}
          />
          <Vignette offset={0.3} darkness={0.6} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  </div>
);
