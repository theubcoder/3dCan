'use client';

import { useGLTF } from '@react-three/drei';

export default function SimpleCan() {
  const { scene } = useGLTF('/models/cocacola/scene.glb');
  
  return (
    <>
      <ambientLight intensity={2} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <primitive object={scene} scale={15} position={[0, -1, 0]} />
    </>
  );
}

useGLTF.preload('/models/cocacola/scene.glb');