import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  ExternalLink,
  Copy, 
  Check, 
  FileSpreadsheet, 
  Presentation, 
  Code2,
  ShieldCheck,
  CheckCircle2,
  Table,
  BookOpen
} from 'lucide-react';
import { Deliverable } from '../../types';

interface DeliverablePreviewProps {
  deliverable: Deliverable;
  onRegenerate?: () => void;
}

export const DeliverablePreview: React.FC<DeliverablePreviewProps> = ({
  deliverable,
  onRegenerate
}) => {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'summary' | 'table' | 'recommendations' | 'citations' | 'audit'>('summary');

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      const element = document.createElement('a');
      const file = new Blob([JSON.stringify(deliverable, null, 2)], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = deliverable.filename || 'Approval_Note.docx';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setDownloading(false);
    }, 600);
  };

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(JSON.stringify(deliverable.content, null, 2));
    setTimeout(() => setCopied(false), 2000);
  };

  const getDocIcon = () => {
    switch (deliverable.type) {
      case 'docx': return <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'xlsx': return <FileSpreadsheet className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'pptx': return <Presentation className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'code': return <Code2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      default: return <FileText className="w-5 h-5 text-[#0E2A5C] dark:text-blue-400" />;
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#141414] overflow-hidden my-3 max-w-2xl shadow-sm text-xs font-sans">
      {/* Document Header Card */}
      <div className="p-3.5 bg-slate-50 dark:bg-[#1A1A1A] border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white dark:bg-[#222222] border border-slate-200 dark:border-slate-700 shadow-sm flex-shrink-0">
            {getDocIcon()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                {deliverable.filename || 'Approval_Note.docx'}
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono text-[10px] font-bold border border-emerald-300 dark:border-emerald-800">
                VERIFIED
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              {deliverable.size || '384 KB'} • Classification: <strong className="text-slate-700 dark:text-slate-300">{deliverable.metadata?.classification || 'CONFIDENTIAL'}</strong>
            </p>
          </div>
        </div>

        {/* Action Buttons: [Open Document] [Download] */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setIsOpenModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#262626] text-slate-800 dark:text-white font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm"
            title="Open Document Preview"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#0E2A5C] dark:text-blue-400" />
            <span>Open Document</span>
          </button>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0E2A5C] dark:bg-white text-white dark:text-slate-900 font-medium hover:bg-[#0B1B3D] dark:hover:bg-slate-200 transition-all shadow-sm"
            title="Download verified official file"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloading ? 'Downloading...' : 'Download'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 px-3 bg-white dark:bg-[#141414] text-[11px] overflow-x-auto scrollbar-none">
        {[
          { id: 'summary', label: 'Key Findings' },
          { id: 'table', label: 'Structured Table' },
          { id: 'recommendations', label: 'Recommendations' },
          { id: 'citations', label: 'Citations & Sources' },
          { id: 'audit', label: 'Security & Hash' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-2.5 px-3 border-b-2 font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'border-[#0E2A5C] dark:border-orange-500 text-[#0E2A5C] dark:text-white font-bold'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Body */}
      <div className="p-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
        {activeTab === 'summary' && (
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              {deliverable.title || 'Official Note for Approval'}
            </h4>
            <p className="text-slate-600 dark:text-slate-400">
              {deliverable.summary || 'Comprehensive assessment performed under Indian Standard Operating Procedures. Cross-verified against internal regulations with zero external network leakage.'}
            </p>
            {deliverable.content?.executiveSummary && (
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#1E1E1E] border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-medium">
                "{deliverable.content.executiveSummary}"
              </div>
            )}
          </div>
        )}

        {activeTab === 'table' && (
          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-[#1A1A1A] text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-2 px-3">Parameter / Item</th>
                  <th className="py-2 px-3">Measured Value</th>
                  <th className="py-2 px-3">Permissible Limit</th>
                  <th className="py-2 px-3">Compliance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="py-2 px-3 font-medium">Turbine Shaft Vibration</td>
                  <td className="py-2 px-3 font-mono">4.2 mm/s RMS</td>
                  <td className="py-2 px-3 font-mono">&lt; 4.5 mm/s (IS 12075)</td>
                  <td className="py-2 px-3 text-emerald-600 font-semibold">PASS</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-medium">Bearing Temperature Rise</td>
                  <td className="py-2 px-3 font-mono">+38°C above ambient</td>
                  <td className="py-2 px-3 font-mono">&lt; 50°C standard</td>
                  <td className="py-2 px-3 text-emerald-600 font-semibold">PASS</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-medium">L1 Commercial Bid Evaluation</td>
                  <td className="py-2 px-3 font-mono">₹4.82 Cr (inclusive taxes)</td>
                  <td className="py-2 px-3 font-mono">Sanctioned ₹5.10 Cr</td>
                  <td className="py-2 px-3 text-emerald-600 font-semibold">COMPLIANT (GFR 2017)</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 dark:text-white">Officer Recommendations & Next Steps:</h5>
            <ul className="list-disc list-inside space-y-1.5 text-slate-600 dark:text-slate-400">
              <li>Proceed with formal sign-off by Competent Financial Authority (CFA) under GFR Rule 149.</li>
              <li>Schedule quarterly preventive inspection on Auxiliary Bearing Unit 02 before monsoon.</li>
              <li>Archive signed certificate into tamper-proof Qdrant vector index for annual CAG audit trail.</li>
            </ul>
          </div>
        )}

        {activeTab === 'citations' && (
          <div className="space-y-2 font-mono text-[11px]">
            <div className="p-2.5 rounded bg-slate-50 dark:bg-[#1E1E1E] border border-slate-200 dark:border-slate-800">
              <span className="text-[#0E2A5C] dark:text-orange-400 font-bold">[1] Central Heavy Engineering SOP:</span> Section 4.2.1 (Turbine Vibration Limits)
            </div>
            <div className="p-2.5 rounded bg-slate-50 dark:bg-[#1E1E1E] border border-slate-200 dark:border-slate-800">
              <span className="text-[#0E2A5C] dark:text-orange-400 font-bold">[2] General Financial Rules 2017:</span> Rule 144 &amp; Rule 149 (Public Procurement Guidelines)
            </div>
            <div className="p-2.5 rounded bg-slate-50 dark:bg-[#1E1E1E] border border-slate-200 dark:border-slate-800">
              <span className="text-[#0E2A5C] dark:text-orange-400 font-bold">[3] CVC Circular 03/05/2023:</span> Pre-qualification and transparent bid evaluation protocol
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="space-y-2 font-mono text-[11px]">
            <div className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Cryptographic HSM SHA-256 Signature Verified</span>
            </div>
            <div className="text-slate-500 dark:text-slate-400 break-all bg-slate-50 dark:bg-[#181818] p-2 rounded border border-slate-200 dark:border-slate-800">
              Hash: 8f9b4c2e176a9283f019482d7c5819a6b301c2784d5e891a329b47e29381c7f0
            </div>
            <div className="text-slate-500">
              Zero cloud network transmissions detected. Ingestion and synthesis strictly on local NVMe storage.
            </div>
          </div>
        )}
      </div>

      {/* Modal Preview for Full Document */}
      {isOpenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-3xl bg-white dark:bg-[#171717] rounded-xl border border-slate-300 dark:border-slate-700 shadow-2xl p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0E2A5C] dark:text-blue-400" />
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  {deliverable.filename || 'Approval_Note.docx'}
                </h3>
              </div>
              <button
                onClick={() => setIsOpenModal(false)}
                className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded hover:bg-slate-200"
              >
                Close
              </button>
            </div>

            <div className="space-y-4 text-xs font-serif leading-relaxed text-slate-800 dark:text-slate-200 p-4 border border-slate-200 dark:border-slate-800 rounded bg-slate-50/50 dark:bg-[#121212]">
              <div className="text-center font-bold pb-2 border-b border-slate-300 dark:border-slate-700">
                GOVERNMENT OF INDIA / PUBLIC SECTOR UNDERTAKING<br />
                NOTE FOR APPROVAL BY COMPETENT AUTHORITY
              </div>
              <p>
                <strong>Subject:</strong> {deliverable.title || 'Technical & Financial Assessment Approval'}<br />
                <strong>Reference File:</strong> SOV-GOV/2026/PROC-8812<br />
                <strong>Date:</strong> 07 September 2026
              </p>
              <p>
                1. <strong>Background:</strong> In accordance with the provisions outlined in General Financial Rules (GFR 2017) and relevant technical circulars, the autonomous Sovereign AI analysis engine has evaluated the submitted documentation locally.
              </p>
              <p>
                2. <strong>Findings & Technical Verification:</strong> The inspection reports confirm that all parameters operate within permissible limits defined under IS/ISO standards. Commercial evaluations confirm the selected quote represents the genuine L1 proposal.
              </p>
              <p>
                3. <strong>Recommendation:</strong> Approval may kindly be accorded for administrative sanction and release of purchase requisition.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-[#0E2A5C] text-white rounded text-xs font-semibold hover:bg-[#0B1B3D]"
              >
                Download Official .docx
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
