import React from 'react';
import Hero from './Hero';
import Problem from './Problem';
import HowItWorks from './HowItWorks';
import Features from './Features';
import Pricing from './Pricing';
import Testimonials from './Testimonials';
import FAQ from './FAQ';

interface LandingPageProps {
  onOpenPricing: () => void;
}

export default function LandingPage({ onOpenPricing }: LandingPageProps) {
  return (
    <>
      <Hero onOpenPricing={onOpenPricing} />
      <Problem />
      <HowItWorks />
      <Features />
      <Pricing onOpenPricing={onOpenPricing} />
      <Testimonials />
      <FAQ />
    </>
  );
}
