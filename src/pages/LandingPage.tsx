import React from 'react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { HeroSection } from '../components/landing/HeroSection';
import { WhySovereignSection } from '../components/landing/WhySovereignSection';
import { WorkforceSection } from '../components/landing/WorkforceSection';
import { SecuritySection } from '../components/landing/SecuritySection';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 antialiased">
      <Navbar />
      <main>
        <HeroSection />
        <WhySovereignSection />
        <WorkforceSection />
        <SecuritySection />
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  );
};
