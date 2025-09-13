'use client';

import { Canvas } from '@react-three/fiber';

export default function TestPage() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: 'black' }}>
      <Canvas>
        <ambientLight intensity={1} />
        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </Canvas>
    </div>
  );
}