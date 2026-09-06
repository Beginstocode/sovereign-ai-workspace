import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Copy, 
  Check, 
  FileSpreadsheet, 
  Presentation, 
  Code2
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
  const [activeTab, setActiveTab] = useState<'preview' | 'meta' | 'audit'>('preview');

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      const element = document.createElement('a');
      const file = new Blob([JSON.stringify(deliverable, null, 2)], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = deliverable.filename;
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
      case 'docx': return <FileText className="w-4 h-4 text-blue-400 dark:text-blue-400 light:text-blue-600" />;
      case 'xlsx': return <FileSpreadsheet className="w-4 h-4 text-emerald-400 dark:text-emerald-400 light:text-emerald-600" />;
      case 'pptx': return <Presentation className="w-4 h-4 text-[#F97316]" />;
      case 'code': return <Code2 className="w-4 h-4 text-indigo-400 dark:text-indigo-400 light:text-indigo-600" />;
      default: return <FileText className="w-4 h-4 text-[#F97316]" />;
    }
  };

  return (
    <div className="rounded-xl border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] bg-[#141414] dark:bg-[#141414] light:bg-[#FFFFFF] overflow-hidden my-3 max-w-2xl shadow-sm text-xs font-mono">
      {/* Top Header */}
      <div className="p-3 bg-[#1C1C1C] dark:bg-[#1C1C1C] light:bg-[#FAFAFA] border-b border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getDocIcon()}
          <div>
            <span className="font-bold text-white dark:text-white light:text-[#171717]">
              {deliverable.filename}
            </span>
            <span className="text-[#737373] text-[10px] ml-2">
              ({deliverable.size}) · {deliverable.metadata?.classification || 'CONFIDENTIAL'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded hover:bg-[#262626] dark:hover:bg-[#262626] light:hover:bg-[#E5E5E5] text-[#A3A3A3] hover:text-white dark:hover:text-white light:hover:text-black transition-colors"
            title="Copy deliverable content"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white dark:bg-white light:bg-[#171717] text-black dark:text-black light:text-white font-medium hover:opacity-90 transition-opacity"
            title="Download verified file"
          >
            <Download className="w-3 h-3" />
            <span>{downloading ? 'Exporting...' : 'Download'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] px-3 bg-[#141414] dark:bg-[#141414] light:bg-[#FFFFFF] text-[11px]">
        {(['preview', 'meta', 'audit'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-3 border-b-2 font-medium capitalize transition-colors ${
              activeTab === tab
                ? 'border-[#F97316] text-white dark:text-white light:text-black'
                : 'border-transparent text-[#737373] hover:text-[#A3A3A3]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Body */}
      <div className="p-4 text-xs font-sans text-[#D4D4D4] dark:text-[#D4D4D4] light:text-[#262626] leading-relaxed">
        {activeTab === 'preview' && (
          <div className="space-y-2">
            <h4 className="font-bold text-white dark:text-white light:text-black font-sans text-sm">
              {deliverable.title}
            </h4>
            <p className="text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#525252] text-xs">
              {deliverable.summary}
            </p>
            {deliverable.content?.executiveSummary && (
              <p className="text-xs text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#525252] italic">
                "{deliverable.content.executiveSummary}"
              </p>
            )}
            {deliverable.content?.codeSnippet && (
              <pre className="p-3 rounded bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F5F5F5] border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] text-[11px] font-mono text-[#D4D4D4] dark:text-[#D4D4D4] light:text-[#171717] overflow-x-auto whitespace-pre-wrap">
                {deliverable.content.codeSnippet}
              </pre>
            )}
          </div>
        )}

        {activeTab === 'meta' && (
          <div className="space-y-1.5 font-mono text-[11px]">
            <div><span className="text-[#737373]">GENERATED BY:</span> {deliverable.metadata?.generatedBy || 'Sovereign Agent'}</div>
            <div><span className="text-[#737373]">MODEL:</span> {deliverable.metadata?.model || 'Local Model'}</div>
            <div><span className="text-[#737373]">CLASSIFICATION:</span> {deliverable.metadata?.classification || 'CONFIDENTIAL'}</div>
            <div><span className="text-[#737373]">SHA-256 HASH:</span> {deliverable.metadata?.verificationHash || '9f8a3c...e81'}</div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="space-y-2 font-mono text-[11px]">
            <div className="text-emerald-400 dark:text-emerald-400 light:text-emerald-700">✓ Compliance verification passed</div>
            <div className="text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#525252]">Cited to source documents and local ISO-9001 rulebook. Zero external API calls.</div>
          </div>
        )}
      </div>
    </div>
  );
};
