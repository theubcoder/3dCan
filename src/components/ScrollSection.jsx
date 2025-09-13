'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useRef } from 'react';
import StableCanComponent from './StableCanComponent';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function ScrollSection() {
  const sectionRef = useRef();
  const textRef1 = useRef();
  const textRef2 = useRef();
  const textRef3 = useRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Cinematic text animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 2,
      }
    });

    tl.from(textRef1.current, {
      x: -200,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    })
    .from(textRef2.current, {
      x: 200,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.5")
    .from(textRef3.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.5");

    return () => ScrollTrigger.getAll().forEach(st => st.kill());
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full bg-black overflow-hidden">
      {/* Cinematic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/20 to-black" />
      
      {/* Film grain effect */}
      <div className="absolute inset-0 opacity-30" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Cinematic letterbox bars */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-black z-30" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-black z-30" />
      
      {/* 3D Can in center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[400px] h-[400px]">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <Suspense fallback={null}>
              <StableCanComponent />
            </Suspense>
          </Canvas>
        </div>
      </div>
      
      {/* Cinematic text overlays */}
      <div className="absolute inset-0 flex flex-col justify-center items-start pl-20 z-20">
        <h2 ref={textRef1} className="text-6xl md:text-8xl font-bold text-white mb-4 drop-shadow-2xl">
          PURE
        </h2>
        <h2 ref={textRef2} className="text-5xl md:text-7xl font-bold text-red-600 mb-4 drop-shadow-2xl">
          REFRESHMENT
        </h2>
        <p ref={textRef3} className="text-xl md:text-2xl text-gray-300 max-w-md drop-shadow-xl">
          Experience the iconic taste that has defined generations
        </p>
      </div>
      
      {/* Lens flare effect */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-pulse" />
    </section>
  );
}