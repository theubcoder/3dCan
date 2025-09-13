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
  const maskRef = useRef();
  const borderRef = useRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Text animations
    const textTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 2,
      }
    });

    textTimeline.from(textRef1.current, {
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

    // Animated border segments - small waves appear one by one
    if (borderRef.current) {
      const segments = borderRef.current.querySelectorAll('.wave-segment');

      gsap.set(segments, {
        scaleY: 0,
        transformOrigin: 'bottom'
      });

      gsap.to(segments, {
        scaleY: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        }
      });
    }

    return () => ScrollTrigger.getAll().forEach(st => st.kill());
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden -mt-1" style={{
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d0a0a 50%, #1a1a1a 100%)',
      zIndex: 1
    }}>
      {/* Professional vector wave border */}
      <div ref={borderRef} className="absolute -top-1 left-0 right-0 z-30">
        <svg className="w-full" height="80" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F40009" stopOpacity="1" />
              <stop offset="50%" stopColor="#ED1C24" stopOpacity="1" />
              <stop offset="100%" stopColor="#C8102E" stopOpacity="1" />
            </linearGradient>
            <filter id="shadow">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
            </filter>
          </defs>
          <path
            className="wave-segment"
            d="M0,40
               C240,40 240,80 480,80
               C720,80 720,40 960,40
               C1200,40 1200,80 1440,80
               L1440,120 L0,120 Z"
            fill="url(#waveGrad)"
            filter="url(#shadow)"
          />
          <path
            className="wave-segment"
            d="M0,40
               C240,40 240,80 480,80
               C720,80 720,40 960,40
               C1200,40 1200,80 1440,80"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* 3D Can moved right */}
      <div className="absolute inset-0 flex items-center justify-end pr-32">
        <div className="w-[300px] h-[300px]">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <Suspense fallback={null}>
              <StableCanComponent />
            </Suspense>
          </Canvas>
        </div>
      </div>

      {/* Cinematic text overlays */}
      <div className="absolute inset-0 flex flex-col justify-center items-start pl-40 z-20">
        <h2 ref={textRef1} className="text-6xl md:text-8xl font-bold text-white mb-4 drop-shadow-2xl">
          PURE
        </h2>
        <h2 ref={textRef2} className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent mb-4 drop-shadow-2xl">
          REFRESHMENT
        </h2>
        <p ref={textRef3} className="text-xl md:text-2xl text-white/90 max-w-md drop-shadow-xl">
          Experience the iconic taste that has defined generations
        </p>
      </div>

      {/* Frost/Ice particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
        <div className="snowflake animate-snow1">❄</div>
        <div className="snowflake animate-snow3">❆</div>
        <div className="snowflake animate-snow5">❅</div>
        <div className="snowflake animate-snow7">❄</div>
      </div>
    </section>
  );
}