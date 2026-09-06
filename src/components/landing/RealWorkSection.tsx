import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight
} from 'lucide-react';

export const RealWorkSection: React.FC = () => {
  const navigate = useNavigate();

  const handleLaunchScenario = (scenarioId: string) => {
    navigate('/workspace', { state: { scenarioId } });
  };

  const deliverables = [
    {
      code: '01',
      domain: 'Operations & Safety',
      title: 'Scanned Inspection Report ➔ Signed Approval Note (.docx)',
      input: '8-page scanned ultrasonic wall thickness survey (PDF)',
      output: 'Formal ISO-9001 compliance approval memo with highlighted threshold breaches',
      proof: 'Cites ultrasonic probe #04, table 3, row 12 directly to standard ISO-9001:2015',
      scenarioId: 'inspection-approval',
      agent: 'Inspection Agent'
    },
    {
      code: '02',
      domain: 'Strategic Procurement',
      title: 'Vendor Quotations ➔ Executive Recommendation (.pptx)',
      input: '3 multi-page supplier bids with differing payment schedules and warranties',
      output: '8-slide executive presentation normalizing 5-year total cost of ownership (TCO)',
      proof: 'Recomputed kilowatt-hour energy efficiency curves cited to vendor spec sheets',
      scenarioId: 'vendor-comparison',
      agent: 'Finance + Presentation'
    },
    {
      code: '03',
      domain: 'Quantitative Analytics',
      title: 'Raw Sensor Telemetry ➔ Formula-Active Model (.xlsx)',
      input: '8.6 MB plant vibration and temperature telemetry CSV file',
      output: 'Multi-tab formatted Excel model with rolling standard deviation and automated forecasts',
      proof: 'Real Excel SUM/AVERAGE/VLOOKUP formulas, not static typed values',
      scenarioId: 'telemetry-excel',
      agent: 'Data Analyst'
    },
    {
      code: '04',
      domain: 'Systems Engineering',
      title: 'Buggy Socket Pool ➔ Verified Cargo Patch (Rust)',
      input: 'High-throughput async TCP listener suffering lock contention',
      output: 'Thread-safe non-blocking refactor with comprehensive unit test suite',
      proof: '17 tests executed and passed inside isolated WASM sandbox container',
      scenarioId: 'code-debug',
      agent: 'Software Engineer'
    }
  ];

  return (
    <section id="real-work" className="py-20 border-b border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] transition-colors">
      {/* Editorial Header */}
      <div className="mb-8">
        <div className="text-xs font-mono text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373] mb-2">
          <span className="text-[#F97316] font-semibold">// 05 EVIDENCE</span> — REAL WORK, NOT JUST REPLIES
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white dark:text-white light:text-[#171717] tracking-tight">
          What lands in your repo and on your desk?
        </h2>
        <p className="text-sm sm:text-base text-[#D4D4D4] dark:text-[#D4D4D4] light:text-[#525252] leading-relaxed max-w-3xl mt-2">
          Chatbots give you text you have to copy, paste, reformat, and pray is correct. 
          Sovereign produces production files: Word documents ready for executive signature, 
          formula-live spreadsheets with real math, and code verified against a test runner.
        </p>
      </div>

      {/* 4 Deliverable Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {deliverables.map((item) => (
          <div
            key={item.code}
            className="p-5 rounded-lg border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] bg-[#141414] dark:bg-[#141414] light:bg-[#FFFFFF] hover:border-[#404040] dark:hover:border-[#404040] light:hover:border-[#D4D4D4] transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373]">
                <span>
                  <span className="text-[#F97316] font-bold">// {item.code}</span> {item.domain}
                </span>
                <span className="text-[#D4D4D4] dark:text-[#D4D4D4] light:text-[#404040] font-medium">{item.agent}</span>
              </div>

              <h3 className="text-base font-bold text-white dark:text-white light:text-[#171717] mb-3 leading-snug">
                {item.title}
              </h3>

              <div className="space-y-2 mb-4 text-xs">
                <div className="p-2.5 rounded bg-[#1C1C1C] dark:bg-[#1C1C1C] light:bg-[#F9F9F9] border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5]">
                  <span className="font-mono text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373] block text-[10px] uppercase font-semibold">INPUT:</span>
                  <span className="text-[#D4D4D4] dark:text-[#D4D4D4] light:text-[#404040]">{item.input}</span>
                </div>
                <div className="p-2.5 rounded bg-[#141414] dark:bg-[#141414] light:bg-white border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5]">
                  <span className="font-mono text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373] block text-[10px] uppercase font-semibold">DELIVERABLE:</span>
                  <span className="text-white dark:text-white light:text-[#171717] font-medium">{item.output}</span>
                </div>
              </div>

              <p className="text-xs text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#525252] italic font-mono mb-4">
                <span className="text-emerald-400 dark:text-emerald-400 light:text-emerald-700 font-semibold">Evidence: </span>
                {item.proof}
              </p>
            </div>

            <div className="pt-3 border-t border-[#262626] dark:border-[#262626] light:border-[#F5F5F5] flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#737373]">1-CLICK INTERACTIVE DEMO</span>
              <button
                onClick={() => handleLaunchScenario(item.scenarioId)}
                className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#F97316] hover:underline"
              >
                <span>Run in Workspace</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
