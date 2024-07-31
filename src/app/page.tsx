import React from 'react';
import Header from '@/components/topview/Header';
import HeroSection from '@/components/topview/HeroSection';
import ServiceOverview from '@/components/topview/ServiceOverview';
import Footer from '@/components/topview/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <ServiceOverview />
      <Footer />
    </main>
  );
}