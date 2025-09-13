'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function FeaturesSection() {
  const sectionRef = useRef();
  const cardsRef = useRef([]);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Generate particles on client side only
    const particleArray = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10
    }));
    setParticles(particleArray);

    // Stagger card animations
    cardsRef.current.forEach((card, index) => {
      gsap.from(card, {
        y: 100,
        opacity: 0,
        rotation: 5,
        duration: 1,
        delay: index * 0.2,
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        }
      });
    });

    return () => ScrollTrigger.getAll().forEach(st => st.kill());
  }, []);

  const features = [
    {
      title: "THE FORMULA",
      subtitle: "Secret Recipe",
      description: "A closely guarded secret known by fewer than 10 people worldwide",
      visual: "🧪",
      color: "from-red-900 to-red-600"
    },
    {
      title: "THE TASTE",
      subtitle: "Unmistakable",
      description: "The perfect balance of sweetness and fizz that defines refreshment",
      visual: "✨",
      color: "from-red-600 to-orange-600"
    },
    {
      title: "THE MOMENT",
      subtitle: "Timeless",
      description: "Every sip creates a memory that lasts a lifetime",
      visual: "🎬",
      color: "from-orange-600 to-red-900"
    }
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full bg-black overflow-hidden py-20">
      {/* Cinematic background with moving particles */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950/10 to-black" />
        
        {/* Animated particles - only render on client */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-red-500 rounded-full animate-float"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-8">
        {/* Epic title */}
        <div className="text-center mb-20">
          <h2 className="text-7xl md:text-9xl font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-white to-red-600">
              EXPERIENCE
            </span>
          </h2>
          <p className="text-2xl text-gray-400 uppercase tracking-[0.5em]">
            The Elements of Perfection
          </p>
        </div>

        {/* Feature cards - Movie poster style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="relative group cursor-pointer"
            >
              {/* Card with dramatic lighting */}
              <div className={`relative h-[500px] rounded-lg overflow-hidden bg-gradient-to-b ${feature.color} p-1`}>
                <div className="absolute inset-0 bg-black/80 group-hover:bg-black/60 transition-all duration-500" />
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between p-8 text-white">
                  {/* Visual element */}
                  <div className="text-8xl mb-4 transform group-hover:scale-110 transition-transform duration-500">
                    {feature.visual}
                  </div>
                  
                  {/* Text content */}
                  <div>
                    <h3 className="text-4xl font-bold mb-2 tracking-wider">
                      {feature.title}
                    </h3>
                    <p className="text-xl text-red-400 mb-4">
                      {feature.subtitle}
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Dramatic line */}
                  <div className="h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
                </div>
                
                {/* Hover effect - glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-t from-red-600/30 to-transparent" />
                </div>
              </div>
              
              {/* Shadow effect */}
              <div className="absolute -bottom-4 left-4 right-4 h-20 bg-red-900/20 blur-2xl rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Cinematic vignette */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-50" />
      </div>
    </section>
  );
}