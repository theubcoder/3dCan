'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import HeroCanComponent from './HeroCanComponent';

export default function CanvasWrapper({ modelPath }) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <Suspense fallback={
        <mesh position={[0, -1, 0]} scale={10}>
          <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} />
          <meshStandardMaterial color="#cc0000" />
        </mesh>
      }>
        <HeroCanComponent modelPath={modelPath} />
      </Suspense>
    </Canvas>
  );
}