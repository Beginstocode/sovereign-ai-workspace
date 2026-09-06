import React from 'react';
import { 
  ArrowRight
} from 'lucide-react';

export const SecuritySection: React.FC = () => {
  const audits = [
    {
      code: '01',
      title: 'Physical Cutout',
      headline: 'The WAN wire is unplugged.',
      desc: 'All outbound ports (80, 443, 53, 8080) are dropped at the packet filter. No OpenAI keys, no Anthropic telemetry, no cloud logging.',
      status: 'VERIFIED OFFLINE',
      statusColor: 'text-emerald-400 dark:text-emerald-400 light:text-emerald-700 bg-emerald-950/60 dark:bg-emerald-950/60 light:bg-emerald-50 border-emerald-800/40 dark:border-emerald-800/40 light:border-emerald-200'
    },
    {
      code: '02',
      title: 'Zero Token Leakage',
      headline: '0 bytes leave the machine.',
      desc: 'Local tensor execution on NVIDIA RTX/H100 PCIe bus. Prompts, documents, embeddings, and context matrices never touch an outside wire.',
      status: '0 KB OUTBOUND',
      statusColor: 'text-blue-400 dark:text-blue-400 light:text-blue-700 bg-blue-950/60 dark:bg-blue-950/60 light:bg-blue-50 border-blue-800/40 dark:border-blue-800/40 light:border-blue-200'
    },
    {
      code: '03',
      title: 'Local Weights Only',
      headline: 'Your models, on your silicone.',
      desc: 'Quantized GGUF and AWQ weights loaded directly into local VRAM. Model router switches between Llama 3, Qwen Vision, and DeepSeek locally.',
      status: '100% ON-PREM',
      statusColor: 'text-amber-400 dark:text-amber-400 light:text-amber-700 bg-amber-950/60 dark:bg-amber-950/60 light:bg-amber-50 border-amber-800/40 dark:border-amber-800/40 light:border-amber-200'
    },
    {
      code: '04',
      title: 'Deterministic Verification',
      headline: 'Every finding mapped to standard.',
      desc: 'Calculations verified by local Python WASM sandbox. Compliance checked line-by-line against ISO-9001 and corporate SOPs.',
      status: 'AUDIT READY',
      statusColor: 'text-slate-300 dark:text-slate-300 light:text-slate-700 bg-slate-800/60 dark:bg-slate-800/60 light:bg-slate-100 border-slate-700 dark:border-slate-700 light:border-slate-300'
    }
  ];

  return (
    <section id="security" className="py-20 border-b border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] transition-colors">
      {/* Editorial Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="text-xs font-mono text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373] mb-2">
            <span className="text-[#F97316] font-semibold">// 01 SECURITY</span> — YOUR BACK
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white dark:text-white light:text-[#171717] tracking-tight">
            What did the cloud leave exposed? Everything an auditor checks first.
          </h2>
        </div>
      </div>

      <p className="text-sm sm:text-base text-[#D4D4D4] dark:text-[#D4D4D4] light:text-[#525252] leading-relaxed max-w-3xl mb-10">
        Did the AI send your PII to an external API? Is the prompt stored in a vendor's training corpus? 
        Will your intellectual property survive a third-party subpoena? Sovereign answers those questions 
        with architectural proof: physical air-gap, isolated memory enclaves, and cryptographic verification.
      </p>

      {/* Audit Checklist Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {audits.map((item) => (
          <div
            key={item.code}
            className="p-5 rounded-lg border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] bg-[#141414] dark:bg-[#141414] light:bg-[#FFFFFF] hover:border-[#404040] dark:hover:border-[#404040] light:hover:border-[#D4D4D4] transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373]">
                <span className="text-[#F97316] font-bold">// {item.code}</span> · {item.title}
              </span>
              <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${item.statusColor}`}>
                {item.status}
              </span>
            </div>
            <h3 className="text-base font-bold text-white dark:text-white light:text-[#171717] mb-1.5">
              {item.headline}
            </h3>
            <p className="text-xs text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#525252] leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Terminal Proof Row */}
      <div className="p-4 rounded-lg border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] bg-[#141414] dark:bg-[#141414] light:bg-[#F5F5F5] text-xs font-mono text-[#D4D4D4] dark:text-[#D4D4D4] light:text-[#404040] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 dark:text-emerald-400 light:text-emerald-700 font-bold">✓ VERIFIED:</span>
          <span>iptables DROP all outbound WAN · Socket count: 0 · Hardware Enclave: ACTIVE</span>
        </div>
        <a
          href="/security"
          className="text-[#F97316] hover:underline flex items-center gap-1 font-semibold flex-shrink-0"
        >
          <span>Open Security Audit</span>
          <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </section>
  );
};
