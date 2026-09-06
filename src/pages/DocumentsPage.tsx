import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WorkspaceLayout } from '../components/workspace/WorkspaceLayout';
import { AGENTS } from '../data/agents';
import { 
  FileText, 
  Search, 
  Terminal,
  ArrowRight
} from 'lucide-react';

export const DocumentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [search, setSearch] = useState('');

  const documents = [
    {
      id: 'doc-01',
      name: 'Inspection_report.pdf',
      type: 'PDF',
      size: '2.4 MB',
      date: '2026-09-04',
      pages: 14,
      ocrStatus: 'OCR Completed (Surya)',
      classification: 'TOP SECRET // LOCAL',
      associatedAgent: 'Inspection Agent',
      preview: 'Ultrasonic thickness survey for Main Steam Turbine Valve Unit 4. Nominal gauge 25.0mm. Minimum measured 24.2mm along casing seam. No fatigue cracking detected.'
    },
    {
      id: 'doc-02',
      name: 'Vendor_Quotations_Batch_Q3.xlsx',
      type: 'Excel',
      size: '4.1 MB',
      date: '2026-09-02',
      pages: 8,
      ocrStatus: 'Formulas Extracted',
      classification: 'CONFIDENTIAL',
      associatedAgent: 'Finance Assistant',
      preview: 'Bidding comparison for feedwater pumps: Sulzer Hydro ($138k), Flowserve ($120k), KSB Industrial ($115k). Includes 5-year lifecycle energy maintenance estimates.'
    },
    {
      id: 'doc-03',
      name: 'Turbine_Casing_Schematic_Rev4.dwg',
      type: 'CAD',
      size: '18.6 MB',
      date: '2026-08-29',
      pages: 4,
      ocrStatus: 'Vector Geometry Parsed',
      classification: 'TOP SECRET // LOCAL',
      associatedAgent: 'Engineering Assistant',
      preview: 'Shaft tolerance cross-sections and bolt torque specifications. Tolerances within +0.02mm to -0.01mm across all bearing housings.'
    },
    {
      id: 'doc-04',
      name: 'Async_Socket_Listener_Pool.rs',
      type: 'Code',
      size: '142 KB',
      date: '2026-08-25',
      pages: 1,
      ocrStatus: 'AST Syntax Verified',
      classification: 'INTERNAL ONLY',
      associatedAgent: 'Software Engineer',
      preview: 'Rust socket pool handler. High-throughput non-blocking epoll thread loops with mutex concurrency.'
    }
  ];

  const filtered = documents.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase()) ||
    doc.associatedAgent.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <WorkspaceLayout
      activeAgent={AGENTS[2]}
      onSelectAgent={() => {}}
      currentTaskTitle="Confidential Document Vault"
    >
      <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 max-w-5xl mx-auto w-full font-mono text-xs">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#262626] dark:border-[#262626] light:border-[#E5E5E5]">
          <div>
            <div className="flex items-center gap-2 mb-1.5 text-xs text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373]">
              <Terminal className="w-3.5 h-3.5 text-[#F97316]" />
              <span>// 02 DOCUMENT VAULT</span>
              <span>·</span>
              <span className="text-emerald-400 dark:text-emerald-400 light:text-emerald-700">ENCRYPTED AT REST</span>
            </div>
            <h1 className="text-2xl font-bold text-white dark:text-white light:text-black font-sans tracking-tight">
              Confidential Documents & OCR Ingestion
            </h1>
            <p className="text-xs text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#525252] mt-1 font-sans">
              Local document repository parsed with neural OCR, formula AST extractors, and CAD vector geometry.
            </p>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#737373] absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search documents..."
              className="bg-[#141414] dark:bg-[#141414] light:bg-[#FAFAFA] border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] rounded pl-8 pr-3 py-1.5 text-xs text-white dark:text-white light:text-black placeholder-[#737373] focus:outline-none focus:border-[#525252]"
            />
          </div>
        </div>

        {/* Documents Table / List */}
        <div className="border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] rounded-lg bg-[#141414] dark:bg-[#141414] light:bg-[#FFFFFF] divide-y divide-[#262626] dark:divide-[#262626] light:divide-[#E5E5E5] overflow-hidden">
          {filtered.map((doc, idx) => (
            <div
              key={doc.id}
              onClick={() => setSelectedDoc(doc)}
              className="p-4 hover:bg-[#1A1A1A] dark:hover:bg-[#1A1A1A] light:hover:bg-[#F9F9F9] cursor-pointer transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <span className="text-[10px] text-[#737373] mt-0.5">0{idx + 1}</span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-white dark:text-white light:text-black font-sans text-sm">
                      {doc.name}
                    </span>
                    <span className="text-[10px] text-[#737373] bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F5F5F5] border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] px-1.5 py-0.5 rounded">
                      {doc.type}
                    </span>
                  </div>
                  <p className="text-xs text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#525252] line-clamp-1 font-sans">
                    {doc.preview}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[11px] text-[#737373] pl-6 sm:pl-0">
                <span>{doc.size}</span>
                <span className="text-emerald-400 dark:text-emerald-400 light:text-emerald-700">{doc.ocrStatus}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/workspace', { state: { initialPrompt: `Analyse the document: ${doc.name}` } });
                  }}
                  className="px-2.5 py-1 rounded bg-white dark:bg-white light:bg-[#171717] text-black dark:text-black light:text-white font-medium hover:opacity-90 transition-opacity"
                >
                  Analyse →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </WorkspaceLayout>
  );
};
