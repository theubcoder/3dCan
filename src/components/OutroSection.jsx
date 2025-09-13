'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function OutroSection() {
  const sectionRef = useRef();
  const titleRef = useRef();
  const ctaRef = useRef();
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Generate particles on client side only
    const particleArray = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2
    }));
    setParticles(particleArray);

    // Epic entrance animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "center center",
        scrub: 1,
      }
    });

    tl.from(titleRef.current, {
      scale: 0.5,
      opacity: 0,
      duration: 2,
      ease: "power4.out"
    })
    .from(ctaRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=1");

    return () => ScrollTrigger.getAll().forEach(st => st.kill());
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full bg-black overflow-hidden">
      {/* Epic background with animated gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-black to-red-900 animate-gradient" />
        
        {/* Explosive particles effect - only render on client */}
        <div className="absolute inset-0">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-2 h-2 bg-red-500 rounded-full"
              style={{
                left: '50%',
                top: '50%',
                animation: `explode ${particle.duration}s ease-out infinite`,
                animationDelay: `${particle.delay}s`,
                '--x': `${particle.x}px`,
                '--y': `${particle.y}px`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Epic title and CTA */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 
          ref={titleRef}
          className="text-8xl md:text-[12rem] font-bold text-white mb-12"
          style={{
            textShadow: '0 0 50px rgba(239, 68, 68, 0.8)',
            letterSpacing: '0.1em'
          }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-red-500 to-white animate-pulse">
            OPEN
          </span>
          <br />
          <span className="text-red-600">
            HAPPINESS
          </span>
        </h1>
        
        <div ref={ctaRef} className="space-y-6">
          <button className="px-16 py-6 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full text-2xl font-bold hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-110 shadow-[0_0_50px_rgba(239,68,68,0.5)]">
            TASTE THE LEGEND
          </button>
          
          <p className="text-gray-400 text-lg tracking-wider">
            Available Everywhere • Forever Iconic
          </p>
        </div>
      </div>

      {/* Cinematic overlay effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Scan lines effect */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
          }}
        />
        
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70" />
      </div>

      {/* Credits style bottom text */}
      <div className="absolute bottom-10 left-0 right-0 text-center text-gray-500 text-sm tracking-[0.3em] uppercase">
        A Coca-Cola Experience • Est. 1886
      </div>
    </section>
  );
}