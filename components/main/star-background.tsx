"use client";

import { PointMaterial, Points } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import * as random from "maath/random";
import { Suspense, useRef, useState } from "react";
import type { Points as PointsType } from "three";

export const StarBackground = () => {
  const ref = useRef<PointsType | null>(null);
  const [sphere] = useState<Float32Array>(() => {
    const arr = random.inSphere(new Float32Array(5000 * 3), { radius: 1.2 }) as Float32Array;
    const hasNaN = arr.some((v) => isNaN(v));
    if (hasNaN) console.warn("Generated sphere has NaN values");
    return arr;
  });

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        stride={3}
        positions={sphere}
        frustumCulled
      >
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
  <div className="w-full h-full fixed inset-0 -z-10 opacity-40">
    <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
      <Suspense fallback={null}>
        <StarBackground />
        <EffectComposer>
          <Bloom
            intensity={0.3}
            luminanceThreshold={0.9}
            luminanceSmoothing={0.9}
          />
          <Vignette
            offset={0.3}
            darkness={0.6}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  </div>
);
