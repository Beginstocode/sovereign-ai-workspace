import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight
} from 'lucide-react';

export const BrainSection: React.FC = () => {
  const navigate = useNavigate();
  const [activeDoc, setActiveDoc] = useState<string>('kb-01');

  const sources = [
    { id: 'kb-01', code: '01', title: 'Turbine Maintenance SOPs', desc: 'Overhaul tolerances, torque specs, and lubrication frequencies.' },
    { id: 'kb-02', code: '02', title: 'Engineering CAD Manuals', desc: 'Stress limits, material certifications, and thermal expansion limits.' },
    { id: 'kb-03', code: '03', title: 'OSHA & ISO Guidelines', desc: 'High-voltage lockout protocols, confined-space rules, worker safety rules.' },
    { id: 'kb-04', code: '04', title: 'Approved Supplier Contracts', desc: 'Rate cards, SLA penalty clauses, and delivery milestones.' },
    { id: 'kb-05', code: '05', title: '10-Year Historical Reports', desc: 'Past non-destructive testing findings and sensor maintenance logs.' },
    { id: 'kb-06', code: '06', title: 'Executive Committee Memos', desc: 'Capital expenditure authorizations, compliance waivers, and board votes.' }
  ];

  return (
    <section id="brain" className="py-20 border-b border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] transition-colors">
      {/* Editorial Header */}
      <div className="mb-8">
        <div className="text-xs font-mono text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373] mb-2">
          <span className="text-[#F97316] font-semibold">// 06 KNOWLEDGE</span> — ORGANIZATIONAL BRAIN
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white dark:text-white light:text-[#171717] tracking-tight">
          How does the agent know your company's actual rules?
        </h2>
        <p className="text-sm sm:text-base text-[#D4D4D4] dark:text-[#D4D4D4] light:text-[#525252] leading-relaxed max-w-3xl mt-2">
          Public AI models hallucinate because they have never seen your plant manuals or internal contracts. 
          Sovereign vectorizes your organization’s private corpus into a local, encrypted vector store. 
          Every claim the AI makes cites the exact paragraph in your files.
        </p>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 mb-8">
        {sources.map((item) => {
          const isSelected = activeDoc === item.id;
          return (
            <div
              key={item.id}
              onClick={() => setActiveDoc(item.id)}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                isSelected
                  ? 'border-white dark:border-white light:border-[#171717] bg-[#1E1E1E] dark:bg-[#1E1E1E] light:bg-[#F5F5F5]'
                  : 'border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] bg-[#141414] dark:bg-[#141414] light:bg-[#FFFFFF] hover:border-[#404040]'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5 font-mono text-xs text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373]">
                <span className="text-[#F97316] font-bold">// {item.code}</span>
                <span className="text-[10px] text-emerald-400 dark:text-emerald-400 light:text-emerald-700">VECTORIZED</span>
              </div>
              <h4 className="text-xs font-bold text-white dark:text-white light:text-[#171717] mb-1">{item.title}</h4>
              <p className="text-[11px] text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#525252] leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Trust Quote Ribbon */}
      <div className="p-4 rounded-lg border border-[#262626] dark:border-[#262626] light:border-[#D4D4D4] bg-[#141414] dark:bg-[#141414] light:bg-[#F9F9F9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono">
        <div className="text-[#D4D4D4] dark:text-[#D4D4D4] light:text-[#404040]">
          <span className="text-[#F97316] font-semibold">// GROUNDED RULE: </span>
          <span>If a question cannot be answered from your verified documents, the agent states it plainly instead of inventing an answer.</span>
        </div>
        <button
          onClick={() => navigate('/knowledge')}
          className="text-white dark:text-white light:text-[#171717] font-semibold hover:underline flex items-center gap-1 flex-shrink-0"
        >
          <span>Manage Knowledge Base</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </section>
  );
};
