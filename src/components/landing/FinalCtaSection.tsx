import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const FinalCtaSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 text-center">
      {/* Micro header */}
      <div className="text-xs font-mono text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373] mb-4">
        <span className="text-[#F97316] font-semibold">// DEPLOY LOCAL</span> — WHO HAS YOUR BACK?
      </div>

      {/* Direct, human headline */}
      <h2 className="text-3xl sm:text-5xl font-bold text-white dark:text-white light:text-[#171717] tracking-tight max-w-2xl mx-auto leading-tight mb-6">
        What don't you know about what your AI is shipping?
      </h2>

      {/* Candid explanation */}
      <p className="text-base sm:text-lg text-[#D4D4D4] dark:text-[#D4D4D4] light:text-[#525252] max-w-2xl mx-auto leading-relaxed mb-8">
        One workspace brings eight domain specialists directly to your infrastructure. 
        No cloud accounts. No external telemetry. Running entirely on your organization’s hardware.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
        <button
          onClick={() => navigate('/workspace')}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded border border-white dark:border-white light:border-[#171717] bg-white dark:bg-white light:bg-[#171717] text-black dark:text-black light:text-white hover:bg-[#EDEDED] dark:hover:bg-[#EDEDED] light:hover:bg-[#262626] text-sm font-mono font-medium transition-colors"
        >
          <span>Launch Sovereign Workspace</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => navigate('/login')}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded border border-[#333333] dark:border-[#333333] light:border-[#D4D4D4] bg-[#141414] dark:bg-[#141414] light:bg-[#FFFFFF] hover:bg-[#1E1E1E] dark:hover:bg-[#1E1E1E] light:hover:bg-[#F5F5F5] text-white dark:text-white light:text-[#171717] text-sm font-mono transition-colors"
        >
          <span>Operator Sign In</span>
        </button>
      </div>

      {/* Snitch-style footer guarantee */}
      <div className="text-xs font-mono text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373]">
        <span>Air-gapped · 0 outbound tokens · your models · your hardware</span>
        <div className="mt-1 text-[#F97316] font-semibold">
          We have your back. And your front.
        </div>
      </div>
    </section>
  );
};
