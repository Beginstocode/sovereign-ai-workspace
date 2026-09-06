import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Terminal, 
  CornerDownLeft
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [heroPrompt, setHeroPrompt] = useState('');

  const examplePrompts = [
    { label: 'Analyse ultrasonic inspection report', id: 'inspection-approval', skill: '01 Inspection' },
    { label: 'Compare vendor bids & calculate 5y TCO', id: 'vendor-comparison', skill: '05 Finance' },
    { label: 'Audit Rust socket pool for concurrency leaks', id: 'code-debug', skill: '02 Software' },
    { label: 'Compile plant telemetry into formula-live Excel', id: 'telemetry-excel', skill: '03 Analytics' }
  ];

  const handleLaunchWithPrompt = (promptText?: string, scenarioId?: string) => {
    navigate('/workspace', {
      state: {
        initialPrompt: promptText || heroPrompt,
        scenarioId: scenarioId || 'inspection-approval'
      }
    });
  };

  return (
    <section className="pt-16 pb-20 border-b border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] transition-colors">
      {/* Editorial Micro Header */}
      <div className="flex items-center gap-2 text-xs font-mono text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373] mb-6">
        <span className="text-[#F97316] font-semibold">// SOVEREIGN</span>
        <span>—</span>
        <span>ON-PREMISE AI WORKFORCE FOR CONFIDENTIAL WORK</span>
      </div>

      {/* Main Punchy Editorial Headline */}
      <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-bold text-white dark:text-white light:text-[#171717] tracking-tight leading-[1.12] mb-6 max-w-4xl">
        AI builds things fast. Sovereign tells you what it won’t:
        <span className="block text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373] font-normal mt-2">
          Did a key just ship? Does this calculation pass ISO? Can your board audit every line?
        </span>
      </h1>

      {/* Direct Human Value Paragraph like Snitch */}
      <p className="text-base sm:text-lg text-[#D4D4D4] dark:text-[#D4D4D4] light:text-[#525252] leading-relaxed max-w-3xl mb-8">
        Eight specialized enterprise agents answer the questions you didn’t know to ask — about compliance, 
        financial modeling, code audits, safety regulations, and procurement. Running inside your own data center, 
        on local GPUs, with zero outbound tokens. Every output cited to document, table, and formula. 
        <span className="font-semibold text-white dark:text-white light:text-[#171717]"> No proof, no deliverable.</span>
      </p>

      {/* Terminal Command Bar / Quick Action Input */}
      <div className="mb-10 max-w-3xl">
        <div className="rounded-lg border border-[#333333] dark:border-[#333333] light:border-[#D4D4D4] bg-[#141414] dark:bg-[#141414] light:bg-[#FFFFFF] p-2 sm:p-2.5 shadow-sm transition-all focus-within:border-[#F97316] focus-within:ring-1 focus-within:ring-[#F97316]">
          <div className="flex items-center gap-2 px-2 py-1 text-xs font-mono text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373] border-b border-[#262626] dark:border-[#262626] light:border-[#F5F5F5] pb-2 mb-2">
            <Terminal className="w-3.5 h-3.5 text-[#F97316]" />
            <span className="text-white dark:text-white light:text-[#171717] font-semibold">sovereign&gt;</span>
            <span>dispatch task or describe scenario</span>
            <span className="ml-auto text-[10px] text-[#737373] hidden sm:inline">AIR-GAP ACTIVE</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={heroPrompt}
              onChange={(e) => setHeroPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleLaunchWithPrompt();
                }
              }}
              placeholder="e.g. Audit ultrasonic NDT report against ISO-9001 and output approval note..."
              className="w-full bg-transparent text-sm text-white dark:text-white light:text-[#171717] placeholder-[#737373] focus:outline-none px-2 py-1 font-sans"
            />
            <button
              onClick={() => handleLaunchWithPrompt()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-white dark:bg-white light:bg-[#171717] text-black dark:text-black light:text-white hover:bg-[#EDEDED] dark:hover:bg-[#EDEDED] light:hover:bg-[#262626] text-xs font-mono font-medium flex-shrink-0 transition-colors"
            >
              <span>Run</span>
              <CornerDownLeft className="w-3 h-3 text-[#737373]" />
            </button>
          </div>
        </div>

        {/* Quick prompt citations */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="text-[#737373] text-[11px]">Direct prompts:</span>
          {examplePrompts.map((item) => (
            <button
              key={item.id}
              onClick={() => handleLaunchWithPrompt(item.label, item.id)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] bg-[#141414] dark:bg-[#141414] light:bg-[#F5F5F5] hover:border-[#404040] text-[#D4D4D4] dark:text-[#D4D4D4] light:text-[#525252] hover:text-white dark:hover:text-white light:hover:text-[#171717] transition-colors text-[11px]"
            >
              <span className="text-[#F97316] font-semibold">{item.skill}</span>
              <span>·</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3 Step "How You Use It" Micro Flow — exact Snitch structure */}
      <div className="pt-6 border-t border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        <div className="space-y-1.5">
          <div className="font-mono text-xs font-bold text-[#F97316]">01</div>
          <h3 className="font-bold text-white dark:text-white light:text-[#171717]">Air-gap once</h3>
          <p className="text-xs text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#525252] leading-relaxed">
            Deploy on your local workstation or on-premise server. Zero external network calls, zero SaaS telemetry. Runs on your own hardware.
          </p>
        </div>

        <div className="space-y-1.5">
          <div className="font-mono text-xs font-bold text-[#F97316]">02</div>
          <h3 className="font-bold text-white dark:text-white light:text-[#171717]">Dispatch your task</h3>
          <p className="text-xs text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#525252] leading-relaxed">
            Describe what you need in plain words. The orchestrator routes to the specialist agent with exact context files and isolated tools.
          </p>
        </div>

        <div className="space-y-1.5">
          <div className="font-mono text-xs font-bold text-[#F97316]">03</div>
          <h3 className="font-bold text-white dark:text-white light:text-[#171717]">Read cited deliverables</h3>
          <p className="text-xs text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#525252] leading-relaxed">
            Real production deliverables: .docx approval notes, formula-active .xlsx models, and executive slides. Every finding cited to source.
          </p>
        </div>
      </div>
    </section>
  );
};
