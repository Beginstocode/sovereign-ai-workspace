import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WorkspaceLayout } from '../components/workspace/WorkspaceLayout';
import { AGENTS } from '../data/agents';
import { 
  FileText, 
  Search, 
  Terminal,
  ArrowRight,
  ShieldCheck,
  Lock,
  CheckCircle2,
  FileSpreadsheet,
  Code2
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
      classification: 'RESTRICTED // LOCAL',
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
      preview: 'Bidding comparison for feedwater pumps: Sulzer Hydro (₹1.38 Cr), Flowserve (₹1.20 Cr), KSB Industrial (₹1.15 Cr). Includes 5-year lifecycle energy maintenance estimates.'
    },
    {
      id: 'doc-03',
      name: 'Turbine_Casing_Schematic_Rev4.dwg',
      type: 'CAD',
      size: '18.6 MB',
      date: '2026-08-29',
      pages: 4,
      ocrStatus: 'Vector Geometry Parsed',
      classification: 'RESTRICTED // LOCAL',
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
      ocrStatus: 'Syntax Validated',
      classification: 'INTERNAL',
      associatedAgent: 'Software Engineer',
      preview: 'High-throughput async TCP multiplexer for SCADA telemetry frame parsing with zero dynamic heap allocation.'
    }
  ];

  const filtered = documents.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase()) ||
    doc.preview.toLowerCase().includes(search.toLowerCase()) ||
    doc.associatedAgent.toLowerCase().includes(search.toLowerCase())
  );

  const getDocIcon = (type: string) => {
    switch (type) {
      case 'Excel': return <FileSpreadsheet className="w-4 h-4 text-emerald-600" />;
      case 'Code': return <Code2 className="w-4 h-4 text-indigo-600" />;
      default: return <FileText className="w-4 h-4 text-[#EE7027]" />;
    }
  };

  return (
    <WorkspaceLayout
      activeAgent={AGENTS[2]}
      onSelectAgent={() => {}}
      currentTaskTitle="Confidential Document Vault"
    >
      <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 max-w-6xl mx-auto w-full font-sans text-xs">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-semibold text-[#133863] dark:text-blue-400">OFFICIAL REPOSITORY</span>
              <span>•</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-medium">ENCRYPTED AT REST (AES-256)</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Confidential Documents & OCR Vault
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Local document repository parsed with on-premise neural OCR, formula extractors, and CAD vector geometry.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search confidential documents..."
              className="w-full bg-white dark:bg-[#12223D] border border-slate-300 dark:border-slate-700 rounded-lg pl-8 pr-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#133863]"
            />
          </div>
        </div>

        {/* Documents Table / List */}
        <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-[#12223D] shadow-sm divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
          {filtered.map((doc, idx) => (
            <div
              key={doc.id}
              onClick={() => setSelectedDoc(doc)}
              className="p-4 hover:bg-slate-50 dark:hover:bg-[#182C4C] cursor-pointer transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-[#1E3355] border border-slate-200 dark:border-slate-700 flex-shrink-0">
                  {getDocIcon(doc.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      {doc.name}
                    </span>
                    <span className="text-[10px] text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono border border-slate-200 dark:border-slate-700">
                      {doc.type}
                    </span>
                    <span className="text-[10px] text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded font-mono border border-blue-200 dark:border-blue-800">
                      {doc.classification}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
                    {doc.preview}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500 self-end sm:self-center flex-shrink-0">
                <span className="font-mono">{doc.size}</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">
                  {doc.ocrStatus}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/workspace', { state: { initialPrompt: `Analyse the confidential document: ${doc.name}` } });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#133863] text-white hover:bg-[#0B2545] font-semibold text-xs transition-colors shadow-sm"
                >
                  <span>Analyse</span>
                  <ArrowRight className="w-3 h-3 text-[#EE7027]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </WorkspaceLayout>
  );
};

export default DocumentsPage;
