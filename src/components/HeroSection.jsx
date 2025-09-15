'use client';

import dynamic from 'next/dynamic';

// Dynamically import the client component with no SSR
const HeroSectionClient = dynamic(
  () => import('./HeroSectionClient'),
  {
    ssr: false,
    loading: () => (
      <section className="relative h-screen w-full overflow-hidden" style={{
        background: 'radial-gradient(circle at 50% 50%, #2a0707 0%, #000000 100%)'
      }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </section>
    )
  }
);

export default function HeroSection() {
  return <HeroSectionClient />;
}