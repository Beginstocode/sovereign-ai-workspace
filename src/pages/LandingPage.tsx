import React from 'react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { HeroSection } from '../components/landing/HeroSection';
import { SecuritySection } from '../components/landing/SecuritySection';
import { WorkforceSection } from '../components/landing/WorkforceSection';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';
import { MultimodalSection } from '../components/landing/MultimodalSection';
import { RealWorkSection } from '../components/landing/RealWorkSection';
import { BrainSection } from '../components/landing/BrainSection';
import { FinalCtaSection } from '../components/landing/FinalCtaSection';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#FFFFFF] text-[#EDEDED] dark:text-[#EDEDED] light:text-[#171717] font-sans selection:bg-[#262626] dark:selection:bg-[#262626] light:selection:bg-[#E5E5E5] selection:text-white dark:selection:text-white light:selection:text-black overflow-x-hidden antialiased transition-colors duration-200">
      <Navbar />
      <main className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <SecuritySection />
        <WorkforceSection />
        <HowItWorksSection />
        <MultimodalSection />
        <RealWorkSection />
        <BrainSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  );
};
