'use client';

import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

export default function CanWithLoader() {
  const gltf = useGLTF('/models/cocacola/scene.glb');
  
  useEffect(() => {
    console.log('GLTF loaded:', gltf);
    if (gltf.scene) {
      console.log('Scene exists:', gltf.scene);
      console.log('Scene children:', gltf.scene.children);
    }
  }, [gltf]);
  
  if (!gltf.scene) {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="yellow" />
      </mesh>
    );
  }
  
  return (
    <>
      <ambientLight intensity={3} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <primitive
        object={gltf.scene}
        scale={15}
        position={[0, -2, 0]}
        rotation={[0, 0, 0]}
      />
    </>
  );
}

useGLTF.preload('/models/cocacola/scene.glb');