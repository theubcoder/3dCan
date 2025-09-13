'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function OutroSection() {
  const sectionRef = useRef();
  const bottleRef = useRef();
  const textRef = useRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Bottle animation
    gsap.from(bottleRef.current, {
      rotation: -180,
      scale: 0,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "center center",
        scrub: 1,
      }
    });

    // Text animation
    gsap.from(textRef.current?.children || [], {
      y: 100,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "center center",
        scrub: 1,
      }
    });

    return () => ScrollTrigger.getAll().forEach(st => st.kill());
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      {/* Dark red gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950 to-black" />

      {/* Radial glow effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/20 rounded-full blur-3xl" />
      </div>

      {/* Central content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center">
          {/* Coca-Cola Head Image */}
          <div ref={bottleRef} className="mb-12 flex justify-center">
            <img
              src="/images/Coca-Cola-Head.png"
              alt="Coca-Cola"
              className="w-[200px] h-[400px] object-contain drop-shadow-2xl"
            />
          </div>

          {/* Text content */}
          <div ref={textRef}>
            <h1 className="text-7xl md:text-9xl font-black mb-6">
              <span className="text-white">OPEN</span>
            </h1>
            <h1 className="text-6xl md:text-8xl font-black mb-8">
              <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
                HAPPINESS
              </span>
            </h1>

            <p className="text-2xl text-gray-400 mb-12 font-light tracking-widest uppercase">
              Est. 1886 • Forever Classic
            </p>

            {/* Simple CTA */}
            <button className="px-20 py-6 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-bold rounded-full hover:from-red-700 hover:to-red-800 transform hover:scale-110 transition-all duration-300 shadow-[0_20px_60px_-15px_rgba(220,38,38,0.5)] border-2 border-red-500/30 uppercase tracking-wider">
              Experience Now
            </button>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}