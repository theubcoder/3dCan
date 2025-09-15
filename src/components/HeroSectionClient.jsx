'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useEffect, useRef } from 'react';
import HeroCanComponent from './HeroCanComponent';

export default function HeroSectionClient() {
  const [showCocaCola, setShowCocaCola] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(5);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(0);

  useEffect(() => {
    // Function to reset and switch models
    const switchModel = () => {
      setIsTransitioning(true);
      setRotationSpeed(50); // Very fast rotation during transition

      setTimeout(() => {
        setShowCocaCola(prev => !prev);
        setRotationSpeed(0);
        setIsTransitioning(false);
        setTimeRemaining(5);
      }, 500); // Fast transition duration
    };

    // Initial timer
    const timer = setTimeout(() => {
      switchModel();
    }, 5000);

    // Countdown timer
    const countdown = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Loop timer - switches every 5.5 seconds (5s display + 0.5s transition)
    const loopTimer = setInterval(() => {
      switchModel();
    }, 5500);

    return () => {
      clearTimeout(timer);
      clearInterval(countdown);
      clearInterval(loopTimer);
    };
  }, []);

  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 50% 50%, #2a0707 0%, #000000 100%)'
      }}
    >

      {/* Full screen 3D Can */}
      <div className="absolute inset-0 w-full h-full">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <Suspense fallback={
            <mesh position={[0, -1, 0]} scale={10}>
              <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} />
              <meshStandardMaterial color="#cc0000" />
            </mesh>
          }>
            <HeroCanComponent
              modelPath={showCocaCola ? '/models/cocacola/scene2.glb' : '/models/cocacola/scene.glb'}
              customRotationSpeed={rotationSpeed}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Left side text */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-10">
        <div className="text-6xl md:text-8xl font-black drop-shadow-2xl transform -rotate-90 origin-center">
          <span className="bg-gradient-to-b from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            FRESH
          </span>
        </div>
      </div>

      {/* Right side text */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10">
        <div className="text-6xl md:text-8xl font-black drop-shadow-2xl transform rotate-90 origin-center">
          <span className="bg-gradient-to-b from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            COLD
          </span>
        </div>
      </div>

      {/* Snowfall effect */}
      {!isTransitioning && (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-1000 ${showCocaCola ? 'opacity-0' : 'opacity-100'}`}>
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
      )}
    </section>
  );
}