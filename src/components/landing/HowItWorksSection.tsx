import React, { useState } from 'react';

export const HowItWorksSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      number: 1,
      name: 'Your Task',
      desc: 'Describe your objective in natural language with confidential attachments.',
      detail: 'The task is ingested directly into air-gapped memory. Zero telemetry or external prompt logging.',
      tag: 'Zero Logging',
      candid: 'You drop your problem. Nothing leaves the room.'
    },
    {
      number: 2,
      name: 'Agent Match',
      desc: 'Selects or routes to the domain specialist calibrated for your document type.',
      detail: '8 distinct specialist personas with verified domain constraints and safety boundaries.',
      tag: 'Autonomous',
      candid: 'The right specialist takes the wheel, not a generic autocomplete bot.'
    },
    {
      number: 3,
      name: 'Model Router',
      desc: 'Chooses the optimal local quantized model for vision, code, or mathematics.',
      detail: 'Allocates GPU VRAM to Qwen Vision, DeepSeek Coder, or Llama 3 without WAN latency.',
      tag: 'Local VRAM',
      candid: 'Vision models for scans, math models for tables. Local silicone.'
    },
    {
      number: 4,
      name: 'Private Knowledge',
      desc: 'Retrieves relevant sections from your organization’s encrypted on-premise manuals.',
      detail: 'Local Qdrant vector database with cosine embeddings. Sub-second semantic indexing.',
      tag: '100% On-Prem',
      candid: 'Answers grounded in your actual SOPs, blueprints, and past reports.'
    },
    {
      number: 5,
      name: 'Sandboxed Tools',
      desc: 'Executes isolated local utilities: OCR parsers, Python engines, spreadsheet compilers.',
      detail: 'WASM containers with dropped network sockets. Cannot contact an outside server even if asked.',
      tag: 'Air-Gapped',
      candid: 'Runs code and parses files inside a cage that has no internet.'
    },
    {
      number: 6,
      name: 'Verification',
      desc: 'Executes rule checks against ISO, OSHA, and company compliance rules.',
      detail: 'Formulas recomputed, citations cross-referenced, and deviations flagged before export.',
      tag: 'Citations Verified',
      candid: 'Every number tested. If it can\'t be proven, it doesn\'t ship.'
    },
    {
      number: 7,
      name: 'Real Deliverable',
      desc: 'Produces production files: .docx memos, .xlsx spreadsheets, PPTX decks, or code.',
      detail: 'Cryptographically hashed output ready for executive review or engineering deployment.',
      tag: 'Ready to Sign',
      candid: 'Not a chat reply. A file you can send to your director.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 border-b border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] transition-colors">
      {/* Editorial Header */}
      <div className="mb-8">
        <div className="text-xs font-mono text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373] mb-2">
          <span className="text-[#F97316] font-semibold">// 03 PIPELINE</span> — SEVEN VERIFICATION STAGES
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white dark:text-white light:text-[#171717] tracking-tight">
          From confidential prompt to signed deliverable.
        </h2>
        <p className="text-sm sm:text-base text-[#D4D4D4] dark:text-[#D4D4D4] light:text-[#525252] leading-relaxed max-w-3xl mt-2">
          Most AI tools give you a paragraph and hope you don’t check the math. Sovereign passes your work 
          through seven isolated stages of context retrieval, sandboxed execution, and compliance auditing.
        </p>
      </div>

      {/* Step by Step Editorial Table */}
      <div className="border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] rounded-lg bg-[#141414] dark:bg-[#141414] light:bg-[#FFFFFF] overflow-hidden mb-6">
        <div className="divide-y divide-[#262626] dark:divide-[#262626] light:divide-[#E5E5E5]">
          {steps.map((step, idx) => {
            const isCurrent = activeStep === idx;
            return (
              <div
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`p-4 sm:p-5 cursor-pointer transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                  isCurrent 
                    ? 'bg-[#1E1E1E] dark:bg-[#1E1E1E] light:bg-[#F5F5F5] border-l-4 border-l-[#F97316]' 
                    : 'hover:bg-[#1A1A1A] dark:hover:bg-[#1A1A1A] light:hover:bg-[#FAFAFA]'
                }`}
              >
                <div className="flex items-start gap-3 max-w-xl">
                  <span className="font-mono text-xs font-bold text-[#F97316] mt-0.5">
                    0{step.number}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold text-white dark:text-white light:text-[#171717]">{step.name}</h3>
                      <span className="text-[10px] font-mono text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373] bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-white border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] px-1.5 py-0.5 rounded">
                        {step.tag}
                      </span>
                    </div>
                    <p className="text-xs text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#525252] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                <div className="md:text-right font-mono text-xs text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373] pl-7 md:pl-0">
                  <span className="italic text-[#EDEDED] dark:text-[#EDEDED] light:text-[#171717]">{step.candid}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deep-dive Callout */}
      <div className="p-4 rounded-lg border border-[#262626] dark:border-[#262626] light:border-[#D4D4D4] bg-[#141414] dark:bg-[#141414] light:bg-[#FFFFFF] text-xs font-mono text-[#D4D4D4] dark:text-[#D4D4D4] light:text-[#525252] flex items-center justify-between">
        <div>
          <span className="text-[#F97316] font-semibold">STAGE 0{steps[activeStep].number} DETAIL:</span>
          <span className="ml-2 text-white dark:text-white light:text-[#171717]">{steps[activeStep].detail}</span>
        </div>
        <span className="text-[11px] text-[#737373] hidden sm:inline">CLICK ANY STAGE ABOVE</span>
      </div>
    </section>
  );
};
