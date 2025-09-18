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
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden" style={{
      zIndex: 1
    }}>
     

      {/* Professional vector wave border */}
      <div ref={borderRef} className="absolute top-0 left-0 right-0 z-30">
        <svg className="w-full" height="120" viewBox="0 0 1440 120" preserveAspectRatio="none">
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
            d="M0,0 L0,40
               C240,40 240,80 480,80
               C720,80 720,40 960,40
               C1200,40 1200,80 1440,80
               L1440,120 L1440,0 Z"
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

      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-red-800/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-700/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Center content with better layout */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center max-w-4xl px-8">
          <h2 ref={textRef1} className="text-7xl md:text-9xl font-black mb-6">
            <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
              TASTE
            </span>
          </h2>
          <h2 ref={textRef2} className="text-6xl md:text-8xl font-bold text-white mb-8">
            THE LEGEND
          </h2>
          <p ref={textRef3} className="text-2xl md:text-3xl text-gray-300 font-light">
            Since 1886
          </p>

          {/* Animated line decoration */}
          <div className="mt-12 flex justify-center gap-2">
            <div className="w-20 h-1 bg-red-600 animate-pulse" />
            <div className="w-20 h-1 bg-red-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="w-20 h-1 bg-red-400 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>

      {/* Floating brand elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 text-red-600/20 text-9xl font-black transform rotate-12 animate-float">
          ®
        </div>
        <div className="absolute bottom-20 right-20 text-red-600/20 text-9xl font-black transform -rotate-12 animate-float" style={{ animationDelay: '2s' }}>
          ™
        </div>
      </div>
    </section>
  );
}