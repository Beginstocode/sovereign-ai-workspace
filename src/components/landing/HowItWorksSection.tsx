import React from 'react';
import { 
  FileText, 
  UserCheck, 
  Cpu, 
  Database, 
  Wrench, 
  ShieldCheck, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Employee Ingests Task',
      desc: 'Government officer or engineer submits a prompt with confidential file attachments (PDFs, drawings, sheets).'
    },
    {
      num: '02',
      title: 'Autonomous Assistant Routing',
      desc: 'The platform identifies the task nature and invokes the exact specialized module (e.g. Engineering Assistant).'
    },
    {
      num: '03',
      title: 'Local On-Premise Reasoning',
      desc: 'Prompt is executed on air-gapped local GPUs (RTX/L40S) without transmitting a single byte outside the building.'
    },
    {
      num: '04',
      title: 'Internal Knowledge Grounding',
      desc: 'Local vector store cross-references organizational circulars, BIS manuals, and internal SOPs to avoid hallucination.'
    },
    {
      num: '05',
      title: 'Verified Official Deliverable',
      desc: 'System produces formal deliverables: official approval notes (.docx), normalized sheets (.xlsx), or test-cleared patches.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-blue-200 bg-blue-50 text-[#0E2A5C] text-xs font-semibold mb-3">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
            <span>Deterministic Workflow</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1B3D] font-serif">
            How Sovereign Operates Inside Your Network
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed font-sans">
            From official employee instruction to signed, auditable document output. Completely air-gapped at every step.
          </p>
        </div>

        {/* 5-Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#0E2A5C] hover:shadow-sm transition-all text-left flex flex-col justify-between relative"
            >
              <div>
                <span className="text-xs font-bold text-orange-600 font-mono block mb-2">
                  {step.num}
                </span>
                <h3 className="text-sm font-bold text-slate-900 mb-2 font-serif">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {step.desc}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10">
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Launch CTA */}
        <div className="text-center">
          <Link
            to="/login/employee"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded bg-[#0E2A5C] hover:bg-[#13397B] text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <span>Access Employee Workspace</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </Link>
        </div>
      </div>
    </section>
  );
};
