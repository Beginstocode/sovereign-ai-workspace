import React from 'react';
import { 
  FileText, 
  Compass, 
  BarChart3, 
  FileCheck2,
  CheckCircle2,
  ShieldCheck,
  Building2,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const WhySovereignSection: React.FC = () => {
  const cards = [
    {
      title: 'Confidential Documents',
      desc: 'Internal reports, policies, ministry files and confidential correspondence processed locally without data leakage.',
      icon: <FileText className="w-5 h-5 text-[#0E2A5C]" />,
      tag: 'Policy & Notes',
      bg: 'bg-blue-50/50'
    },
    {
      title: 'Engineering Intelligence',
      desc: 'CAD drawings, plant schematics, ultrasonic NDT inspection reports and infrastructure project documents.',
      icon: <Compass className="w-5 h-5 text-orange-600" />,
      tag: 'PSU & Plant Engineering',
      bg: 'bg-orange-50/50'
    },
    {
      title: 'Secure Data Analysis',
      desc: 'Complex spreadsheets, operational logs, procurement tender comparisons, and multi-year financial datasets.',
      icon: <BarChart3 className="w-5 h-5 text-emerald-700" />,
      tag: 'Procurement & Finance',
      bg: 'bg-emerald-50/50'
    },
    {
      title: 'AI-Assisted Administration',
      desc: 'Official cabinet approval notes, committee summaries, inter-departmental minutes, and structured presentations.',
      icon: <FileCheck2 className="w-5 h-5 text-indigo-700" />,
      tag: 'Executive Documentation',
      bg: 'bg-indigo-50/50'
    }
  ];

  return (
    <section id="why-sovereign" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-blue-200 bg-white text-[#0E2A5C] text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
            <span>Built for Critical Infrastructure</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1B3D] font-serif">
            Built for Sensitive Government Work
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed font-sans">
            Engineered specifically to meet the security, auditability, and regulatory needs of Indian ministries, public sector undertakings, defense labs, and state administrative units.
          </p>
        </div>

        {/* 4 Government Enterprise Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg bg-white border border-slate-200 shadow-sm hover:border-[#0E2A5C] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-md ${card.bg} border border-slate-200`}>
                    {card.icon}
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                    {card.tag}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2 font-serif">
                  {card.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="text-[11px] font-medium text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  100% On-Premise
                </span>
                <Link to="/workspace" className="text-[#0E2A5C] font-semibold hover:underline">
                  Launch →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
