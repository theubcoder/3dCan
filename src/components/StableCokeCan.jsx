'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Center } from '@react-three/drei';
import * as THREE from 'three';

function Model({ animate = true }) {
  const groupRef = useRef();
  const { scene } = useGLTF('/models/cocacola/scene.glb');
  
  useFrame(() => {
    // Rotation disabled - user will control manually
  });
  
  return (
    <group ref={groupRef} scale={10} position={[0, -1, 0]}>
      <primitive object={scene.clone()} />
    </group>
  );
}

export default function StableCokeCan({ animate = true, enableControls = true }) {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <directionalLight position={[-10, 10, -5]} intensity={0.8} />
      <pointLight position={[0, 10, 0]} intensity={0.5} />
      
      {/* Mouse controls - target set to origin where model is centered */}
      {enableControls && (
        <OrbitControls 
          target={[0, 0, 0]}
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      )}
      
      <Model animate={!enableControls && animate} />
    </>
  );
}

// Preload
useGLTF.preload('/models/cocacola/scene.glb');