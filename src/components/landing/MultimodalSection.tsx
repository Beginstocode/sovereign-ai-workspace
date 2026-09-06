import React, { useState } from 'react';

export const MultimodalSection: React.FC = () => {
  const [selectedFormat, setSelectedFormat] = useState<string>('drawing');

  const inputFormats = [
    { id: 'pdf', name: 'Scanned PDF', detail: 'Optical scans, low-DPI microfilm, multi-page regulatory filings', tag: 'Surya OCR' },
    { id: 'drawing', name: 'Engineering Drawing', detail: 'DWG schematics, CAD tolerance layers, architectural blueprints', tag: 'Vector Geometry' },
    { id: 'photo', name: 'Site Photograph', detail: 'Corrosion audits, pipeline cracks, weld inspections, drone surveys', tag: 'Dense Segmentation' },
    { id: 'handwritten', name: 'Handwritten Log', detail: 'Shift handovers, cursive boiler records, field engineer scribble', tag: 'Cursive Neural OCR' },
    { id: 'excel', name: 'Complex Excel', detail: 'Cross-sheet formulas, nested VLOOKUP, pivot matrices, financial models', tag: 'Cell AST Engine' },
    { id: 'code', name: 'Production Code', detail: 'C++, Rust, Python, Verilog, PLCs, hardware driver definitions', tag: 'AST Syntax Graph' }
  ];

  const capabilities = [
    { name: 'Understanding', desc: 'Preserves spatial layout and confidential headers instead of stripping them to plain text.' },
    { name: 'OCR & Parsing', desc: 'Sub-millimeter character extraction on faded ink and degraded physical microfilm scans.' },
    { name: 'Vision Inspection', desc: 'Pixel-level segmentation detecting hairline stress cracks and valve cavitation.' },
    { name: 'Deterministic Math', desc: 'Formulas parsed into abstract syntax trees and recomputed locally to prevent LLM hallucinations.' },
    { name: 'Multi-Page Synthesis', desc: 'Cross-references appendices, vendor riders, and past inspection memos in one unified matrix.' }
  ];

  return (
    <section id="multimodal" className="py-20 border-b border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] transition-colors">
      {/* Editorial Header */}
      <div className="mb-8">
        <div className="text-xs font-mono text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373] mb-2">
          <span className="text-[#F97316] font-semibold">// 04 INGESTION</span> — UNIVERSAL MULTIMODAL PARSING
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white dark:text-white light:text-[#171717] tracking-tight">
          Enterprise knowledge doesn’t live in tidy markdown files.
        </h2>
        <p className="text-sm sm:text-base text-[#D4D4D4] dark:text-[#D4D4D4] light:text-[#525252] leading-relaxed max-w-3xl mt-2">
          It lives in faded blueprints, grease-stained shift logs, 150-tab financial workbooks, and scanned legal addendums. 
          Sovereign ingests raw file formats natively without relying on cloud APIs or stripping metadata.
        </p>
      </div>

      {/* Two-Column Grid: Formats on left, capabilities on right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Input Formats List */}
        <div>
          <h3 className="font-mono text-xs font-bold text-white dark:text-white light:text-[#171717] uppercase tracking-wider mb-3">
            // Supported On-Device Formats
          </h3>
          <div className="space-y-2.5">
            {inputFormats.map((format, idx) => (
              <div
                key={format.id}
                onClick={() => setSelectedFormat(format.id)}
                className={`p-3.5 rounded-lg border transition-colors cursor-pointer flex items-center justify-between ${
                  selectedFormat === format.id
                    ? 'border-white dark:border-white light:border-[#171717] bg-[#1E1E1E] dark:bg-[#1E1E1E] light:bg-[#F5F5F5]'
                    : 'border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] bg-[#141414] dark:bg-[#141414] light:bg-[#FFFFFF] hover:border-[#404040]'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#F97316] font-semibold">0{idx + 1}</span>
                    <h4 className="text-xs font-bold text-white dark:text-white light:text-[#171717]">{format.name}</h4>
                  </div>
                  <p className="text-[11px] text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#525252] mt-0.5">{format.detail}</p>
                </div>
                <span className="text-[10px] font-mono text-[#D4D4D4] dark:text-[#D4D4D4] light:text-[#525252] bg-[#262626] dark:bg-[#262626] light:bg-[#F5F5F5] px-2 py-0.5 rounded border border-[#333333] dark:border-[#333333] light:border-[#E5E5E5]">
                  {format.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: How the Local Engine Handles It */}
        <div>
          <h3 className="font-mono text-xs font-bold text-white dark:text-white light:text-[#171717] uppercase tracking-wider mb-3">
            // What the Parser Does Differently
          </h3>
          <div className="border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] rounded-lg bg-[#141414] dark:bg-[#141414] light:bg-[#FFFFFF] divide-y divide-[#262626] dark:divide-[#262626] light:divide-[#E5E5E5]">
            {capabilities.map((cap, idx) => (
              <div key={cap.name} className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono text-[#F97316] font-bold">[{idx + 1}]</span>
                  <h4 className="text-xs font-bold text-white dark:text-white light:text-[#171717]">{cap.name}</h4>
                  <span className="ml-auto text-[10px] font-mono text-emerald-400 dark:text-emerald-400 light:text-emerald-700">100% LOCAL</span>
                </div>
                <p className="text-xs text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#525252] leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded-lg bg-[#141414] dark:bg-[#141414] light:bg-[#F5F5F5] border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] text-xs font-mono text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#525252]">
            <span className="text-[#F97316] font-bold">NOTE:</span> No documents are transmitted outside the firewall. OCR models run on local TensorRT cores.
          </div>
        </div>
      </div>
    </section>
  );
};
