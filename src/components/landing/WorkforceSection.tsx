import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Compass, 
  BarChart3, 
  Code2, 
  ShieldCheck, 
  Coins, 
  Users, 
  Presentation,
  ArrowRight,
  Cpu
} from 'lucide-react';

export const WorkforceSection: React.FC = () => {
  const navigate = useNavigate();

  const assistants = [
    {
      id: 'document-analyst',
      name: 'Document Assistant',
      role: 'Official Files & Reports',
      desc: 'Analyse PDFs, ministerial correspondence, policies, and multi-page government circulars with precise citations.',
      icon: <FileText className="w-5 h-5 text-[#0E2A5C]" />,
      tools: ['Surya OCR Engine', 'Vector Knowledge Store', 'Summary Generator']
    },
    {
      id: 'engineering-assistant',
      name: 'Engineering Assistant',
      role: 'PSU & Plant Engineering',
      desc: 'Verify technical drawings, AutoCAD schematics, equipment tolerance thresholds, and plant overhaul specifications.',
      icon: <Compass className="w-5 h-5 text-orange-600" />,
      tools: ['CAD Vector Parser', 'Formula Verifier', 'Technical Standards RAG']
    },
    {
      id: 'data-analyst',
      name: 'Data Analyst',
      role: 'Operational & Survey Analytics',
      desc: 'Ingest and compute statistical tables, national survey numbers, telemetry series, and generate dynamic Excel workbooks.',
      icon: <BarChart3 className="w-5 h-5 text-emerald-700" />,
      tools: ['Local Python Sandbox', 'CSV/Excel Parser', 'Chart Generator']
    },
    {
      id: 'software-engineer',
      name: 'Software Engineer',
      role: 'Code & Systems Architecture',
      desc: 'Write, audit, debug and test mission-critical code inside secure air-gapped sandboxes without internet connection.',
      icon: <Code2 className="w-5 h-5 text-blue-700" />,
      tools: ['Isolated WASM Sandbox', 'Security Scanner', 'Static Analysis Engine']
    },
    {
      id: 'inspection-agent',
      name: 'Inspection Assistant',
      role: 'Quality & Safety Compliance',
      desc: 'Evaluate ultrasonic thickness surveys, non-destructive testing audits, and compile formal ISO/BIS approval notes.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-700" />,
      tools: ['Visual Defect OCR', 'Rulebook Compliance Check', 'Approval .docx Generator']
    },
    {
      id: 'finance-assistant',
      name: 'Finance Assistant',
      role: 'Procurement & GeM Tender Scoring',
      desc: 'Normalize vendor quotations, compare life-cycle TCO bids, and verify invoice totals against sanctioned procurement limits.',
      icon: <Coins className="w-5 h-5 text-indigo-700" />,
      tools: ['Tender Evaluator', 'Spreadsheet Engine', 'Vendor Comparison Matrix']
    },
    {
      id: 'hr-assistant',
      name: 'HR Assistant',
      role: 'Establishment & Service Rules',
      desc: 'Draft service rules, seniority notifications, departmental inquiry notes, and verify compliance with Central Civil Services rules.',
      icon: <Users className="w-5 h-5 text-amber-700" />,
      tools: ['CCS Rules Index', 'Redaction Anonymizer', 'Circular Drafting Assistant']
    },
    {
      id: 'presentation-agent',
      name: 'Presentation Assistant',
      role: 'Cabinet & Parliamentary Briefings',
      desc: 'Transform voluminous operational and inspection records into concise executive slide presentations for leadership reviews.',
      icon: <Presentation className="w-5 h-5 text-purple-700" />,
      tools: ['Slide Storyboarder', 'Direct PPTX Builder', 'Executive Summary Formatter']
    }
  ];

  const handleSelectAssistant = (agentId: string) => {
    navigate('/workspace', { state: { selectedAgentId: agentId } });
  };

  return (
    <section id="workforce" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-blue-200 bg-blue-50 text-[#0E2A5C] text-xs font-semibold mb-3">
            <Cpu className="w-3.5 h-3.5 text-blue-700" />
            <span>Specialized Domain Software Modules</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1B3D] font-serif">
            One Platform. Multiple AI Assistants.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed font-sans">
            Rather than a single unverified chatbot, Sovereign deploys dedicated enterprise modules calibrated for specific administrative, engineering, and financial domains.
          </p>
        </div>

        {/* Professional Government Software Module Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {assistants.map((assistant) => (
            <div
              key={assistant.id}
              className="p-5 rounded-lg border border-slate-200 bg-white shadow-sm hover:border-[#0E2A5C] hover:shadow transition-all flex flex-col justify-between text-left"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded bg-slate-50 border border-slate-200">
                    {assistant.icon}
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                    {assistant.role}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 mb-1 font-serif">
                  {assistant.name}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {assistant.desc}
                </p>

                {/* Available Tools */}
                <div className="space-y-1 mb-4">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Available Tools:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {assistant.tools.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-slate-100 text-[10px] text-slate-700 border border-slate-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-medium text-emerald-700">Air-Gapped</span>
                <button
                  onClick={() => handleSelectAssistant(assistant.id)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#0E2A5C] hover:underline"
                >
                  <span>Open Agent</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
