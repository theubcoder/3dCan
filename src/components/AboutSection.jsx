'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useRef } from 'react';
import StableCanComponent from './StableCanComponent';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function AboutSection() {
  const sectionRef = useRef();
  const titleRef = useRef();
  const storyRef = useRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Parallax effect
    gsap.to(titleRef.current, {
      y: -100,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });

    return () => ScrollTrigger.getAll().forEach(st => st.kill());
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full bg-black overflow-hidden">
      {/* Dramatic background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-red-900/30 to-black" />
        <video 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://cdn.pixabay.com/vimeo/328940142/cola-22141.mp4?width=640&hash=8e7c0e9e8e9e8e9e8e9e8e9e8e9e8e9e" type="video/mp4" />
        </video>
      </div>
      
      {/* Smoke effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto items-center">
          
          {/* Text Content - Cinematic style */}
          <div className="text-white space-y-8">
            <h2 ref={titleRef} className="text-7xl md:text-9xl font-bold leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-red-600">
                LEGACY
              </span>
              <br />
              <span className="text-red-600">SINCE</span>
              <br />
              <span className="text-white text-8xl md:text-[10rem]">1886</span>
            </h2>
            
            <div ref={storyRef} className="space-y-4 text-gray-300">
              <p className="text-xl leading-relaxed">
                From a small pharmacy in Atlanta to every corner of the globe, 
                Coca-Cola has been bringing people together for over a century.
              </p>
              <p className="text-lg opacity-80">
                More than a drink. It's a moment. It's a memory. It's magic in a bottle.
              </p>
            </div>
            
            {/* Stats with cinematic styling */}
            <div className="flex gap-8 pt-8 border-t border-red-900/50">
              <div>
                <p className="text-5xl font-bold text-red-600">1.9B</p>
                <p className="text-sm text-gray-400 uppercase tracking-wider">Served Daily</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-red-600">200+</p>
                <p className="text-sm text-gray-400 uppercase tracking-wider">Countries</p>
              </div>
            </div>
          </div>
          
          {/* 3D Can with dramatic lighting */}
          <div className="h-[600px] relative">
            <div className="absolute inset-0 bg-red-600/10 rounded-full blur-3xl" />
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <Suspense fallback={null}>
                <StableCanComponent />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </div>
      
      {/* Cinematic bars */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-20" />
    </section>
  );
}