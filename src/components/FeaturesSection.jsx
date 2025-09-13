'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function FeaturesSection() {
  const sectionRef = useRef();
  const timelineRef = useRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Timeline scroll animation
    gsap.from(timelineRef.current.children, {
      x: -100,
      opacity: 0,
      stagger: 0.3,
      duration: 1,
      scrollTrigger: {
        trigger: timelineRef.current,
        start: "top 80%",
        end: "top 30%",
        scrub: 1,
      }
    });

    return () => ScrollTrigger.getAll().forEach(st => st.kill());
  }, []);

  const timeline = [
    { year: "1886", event: "Born in Atlanta", description: "Dr. John S. Pemberton creates the original formula" },
    { year: "1892", event: "The Coca-Cola Company", description: "Asa Griggs Candler establishes the company" },
    { year: "1915", event: "Iconic Bottle", description: "The contour bottle design is introduced" },
    { year: "1955", event: "First Cans", description: "Coca-Cola begins selling in cans" },
    { year: "1985", event: "Space Pioneer", description: "First soft drink consumed in space" },
    { year: "TODAY", event: "Global Icon", description: "Enjoyed in over 200 countries worldwide" }
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full overflow-hidden">
      {/* Dynamic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent_50%)]" />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-800/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-8 py-20">
        {/* Title */}
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-8xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent">
              HISTORY IN EVERY SIP
            </span>
          </h2>
          <p className="text-xl text-gray-400 uppercase tracking-widest">
            A Journey Through Time
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="max-w-5xl mx-auto">
          {timeline.map((item, index) => (
            <div key={index} className="flex items-center mb-12 group">
              {/* Year bubble */}
              <div className="flex-shrink-0 w-32 text-right pr-8">
                <div className="text-3xl font-bold text-red-600 group-hover:text-red-400 transition-colors">
                  {item.year}
                </div>
              </div>

              {/* Timeline line and dot */}
              <div className="flex-shrink-0 w-12 flex flex-col items-center">
                <div className="w-4 h-4 bg-red-600 rounded-full ring-4 ring-red-600/30 group-hover:ring-8 transition-all" />
                {index < timeline.length - 1 && (
                  <div className="w-0.5 h-24 bg-red-600/30 mt-2" />
                )}
              </div>

              {/* Event card */}
              <div className="flex-grow pl-8">
                <div className="bg-black/50 backdrop-blur-sm border border-red-900/30 rounded-lg p-6 group-hover:border-red-600/50 transition-all">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {item.event}
                  </h3>
                  <p className="text-gray-400">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="mt-20 flex justify-center">
          <div className="flex gap-4">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>

      {/* Bottom wave transition */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full" height="100" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path
            d="M0,50 C360,100 720,0 1440,50 L1440,100 L0,100 Z"
            fill="rgba(0,0,0,0.5)"
          />
        </svg>
      </div>
    </section>
  );
}