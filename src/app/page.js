'use client';

import HeroSection from '@/components/HeroSection';
import ScrollSection from '@/components/ScrollSection';
import NewsSlider from '@/components/newsSlider';
import AboutSection from '@/components/AboutSection';
import FeaturesSection from '@/components/FeaturesSection';
import OutroSection from '@/components/OutroSection';

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-black">
      <HeroSection />
      <ScrollSection />
      <NewsSlider />
      <AboutSection />
      <FeaturesSection />
      <OutroSection />
    </main>
  );
}