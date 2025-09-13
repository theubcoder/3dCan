'use client';

import HeroSection from '@/components/HeroSection';
import ScrollSection from '@/components/ScrollSection';
import AboutSection from '@/components/AboutSection';
import FeaturesSection from '@/components/FeaturesSection';
import OutroSection from '@/components/OutroSection';

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <ScrollSection />
      <AboutSection />
      <FeaturesSection />
      <OutroSection />
    </main>
  );
}