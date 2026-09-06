import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#FAFAFA] pt-16 pb-12 text-xs font-mono text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373] transition-colors">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#262626] dark:border-[#262626] light:border-[#E5E5E5]">
          {/* Brand & Manifesto */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-white dark:text-white light:text-[#171717] uppercase text-sm tracking-tight">SOVEREIGN</span>
              <span className="text-[#F97316]">// OS</span>
            </div>
            <p className="text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#525252] text-xs leading-relaxed font-sans">
              The air-gapped operating system for confidential enterprise intelligence. 
              Running entirely on your organization’s infrastructure.
            </p>
            <div className="pt-2">
              <span className="text-[10px] text-emerald-400 dark:text-emerald-400 light:text-emerald-700 bg-emerald-950/60 dark:bg-emerald-950/60 light:bg-emerald-50 px-2 py-0.5 rounded border border-emerald-800/40 dark:border-emerald-800/40 light:border-emerald-200">
                0 OUTBOUND TOKENS
              </span>
            </div>
          </div>

          {/* Column 1: Skills */}
          <div>
            <h4 className="font-bold text-white dark:text-white light:text-[#171717] uppercase tracking-wider mb-3">
              // Agents
            </h4>
            <ul className="space-y-2 text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#525252]">
              <li><Link to="/workspace" className="hover:text-white dark:hover:text-white light:hover:text-[#171717] hover:underline">// 00 Auto Router</Link></li>
              <li><Link to="/workspace" className="hover:text-white dark:hover:text-white light:hover:text-[#171717] hover:underline">// 01 Inspection Agent</Link></li>
              <li><Link to="/workspace" className="hover:text-white dark:hover:text-white light:hover:text-[#171717] hover:underline">// 02 Software Engineer</Link></li>
              <li><Link to="/workspace" className="hover:text-white dark:hover:text-white light:hover:text-[#171717] hover:underline">// 03 Data Analyst</Link></li>
              <li><Link to="/workspace" className="hover:text-white dark:hover:text-white light:hover:text-[#171717] hover:underline">// 04 Presentation</Link></li>
              <li><Link to="/workspace" className="hover:text-white dark:hover:text-white light:hover:text-[#171717] hover:underline">// 05 Finance & TCO</Link></li>
            </ul>
          </div>

          {/* Column 2: Evidence */}
          <div>
            <h4 className="font-bold text-white dark:text-white light:text-[#171717] uppercase tracking-wider mb-3">
              // Evidence
            </h4>
            <ul className="space-y-2 text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#525252]">
              <li><Link to="/security" className="hover:text-white dark:hover:text-white light:hover:text-[#171717] hover:underline">Air-Gap Topology</Link></li>
              <li><Link to="/documents" className="hover:text-white dark:hover:text-white light:hover:text-[#171717] hover:underline">Document OCR Vault</Link></li>
              <li><Link to="/knowledge" className="hover:text-white dark:hover:text-white light:hover:text-[#171717] hover:underline">Organizational Brain</Link></li>
              <li><Link to="/activity" className="hover:text-white dark:hover:text-white light:hover:text-[#171717] hover:underline">Audit Logs</Link></li>
              <li><Link to="/models" className="hover:text-white dark:hover:text-white light:hover:text-[#171717] hover:underline">Local GPU Memory</Link></li>
              <li><Link to="/tools" className="hover:text-white dark:hover:text-white light:hover:text-[#171717] hover:underline">WASM Sandboxes</Link></li>
            </ul>
          </div>

          {/* Column 3: Status */}
          <div>
            <h4 className="font-bold text-white dark:text-white light:text-[#171717] uppercase tracking-wider mb-3">
              // Architecture
            </h4>
            <ul className="space-y-2 text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#525252]">
              <li>On-Premises Hardware Enclave</li>
              <li>NVIDIA TensorRT-LLM (Local)</li>
              <li>Vector Qdrant HNSW</li>
              <li>Surya Neural OCR Engine</li>
              <li>Zero External API Dependencies</li>
            </ul>
          </div>
        </div>

        {/* Base line like Snitch */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © 2026 Sovereign AI Workspace · strictly on-premises & confidential
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-400 dark:text-emerald-400 light:text-emerald-700">● AIR-GAP ENFORCED</span>
            <span>no server · no telemetry · your own hardware</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
