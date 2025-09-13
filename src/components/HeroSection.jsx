'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import StableCanComponent from './StableCanComponent';
import { Fog } from 'three';

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden" style={{
      background: 'linear-gradient(90deg, #0ac5b2 0%, #46a758 100%)'
    }}>
      {/* Cool weather mist effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/20" />

      {/* Animated fog particles */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-white/50 to-transparent" />
      </div>

      {/* Full screen 3D Can with fog */}
      <div className="absolute inset-0 w-full h-full">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          onCreated={({ scene }) => {
            scene.fog = new Fog('#87CEEB', 1, 15);
          }}
        >
          <Suspense fallback={
            <mesh position={[0, -1, 0]} scale={15}>
              <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} />
              <meshStandardMaterial color="#cc0000" />
            </mesh>
          }>
            <StableCanComponent />
          </Suspense>
        </Canvas>
      </div>

      {/* Floating mist effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-white/30 rounded-full blur-3xl animate-float" />
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-white/30 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute w-64 h-64 top-1/2 left-1/3 bg-sky-100/40 rounded-full blur-2xl animate-float-slow" />
      </div>

      {/* Left side text */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-10">
        <div className="text-6xl md:text-8xl font-black text-white drop-shadow-2xl transform -rotate-90 origin-center">
          <span className="bg-gradient-to-b from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            FRESH
          </span>
        </div>
      </div>

      {/* Right side text */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10">
        <div className="text-6xl md:text-8xl font-black text-white drop-shadow-2xl transform rotate-90 origin-center">
          <span className="bg-gradient-to-b from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            COLD
          </span>
        </div>
      </div>

      {/* Snowfall effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="snowflake animate-snow1">❄</div>
        <div className="snowflake animate-snow2">❅</div>
        <div className="snowflake animate-snow3">❆</div>
        <div className="snowflake animate-snow4">❄</div>
        <div className="snowflake animate-snow5">❅</div>
        <div className="snowflake animate-snow6">❆</div>
        <div className="snowflake animate-snow7">❄</div>
        <div className="snowflake animate-snow8">❅</div>
        <div className="snowflake animate-snow9">❆</div>
        <div className="snowflake animate-snow10">❄</div>
        <div className="snowflake animate-snow11">❅</div>
        <div className="snowflake animate-snow12">❆</div>
        <div className="snowflake animate-snow13">❄</div>
        <div className="snowflake animate-snow14">❅</div>
        <div className="snowflake animate-snow15">❆</div>
      </div>
    </section>
  );
}