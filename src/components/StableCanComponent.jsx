'use client';

import { useGLTF, OrbitControls } from '@react-three/drei';
import { useEffect, useState } from 'react';

export default function StableCanComponent() {
  const [isLoaded, setIsLoaded] = useState(false);
  const gltf = useGLTF('/models/cocacola/scene.glb');

  useEffect(() => {
    if (gltf.scene) {
      setIsLoaded(true);
    }
  }, [gltf]);
  
  if (!isLoaded) {
    return (
      <mesh position={[0, -2, 0]} scale={10}>
        <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} />
        <meshStandardMaterial color="#cc0000" metalness={0.8} roughness={0.2} />
      </mesh>
    );
  }
  
  return (
    <>
      <ambientLight intensity={3} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <directionalLight position={[-5, 5, -5]} intensity={1} />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        autoRotate={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={-Infinity}
        maxAzimuthAngle={Infinity}
      />
      
      <primitive
        object={gltf.scene.clone()}
        scale={10}
        position={[0, -1, 0]}
        rotation={[0, 0, 0]}
      />
    </>
  );
}

useGLTF.preload('/models/cocacola/scene.glb');