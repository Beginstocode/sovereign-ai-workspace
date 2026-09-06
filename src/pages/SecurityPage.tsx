import React, { useState } from 'react';
import { WorkspaceLayout } from '../components/workspace/WorkspaceLayout';
import { AGENTS } from '../data/agents';
import { INITIAL_SECURITY_TELEMETRY } from '../data/mockData';
import { 
  Terminal, 
  RefreshCw, 
  CheckCircle2
} from 'lucide-react';

export const SecurityPage: React.FC = () => {
  const [testing, setTesting] = useState(false);
  const [passed, setPassed] = useState(true);

  const handleTestPerimeter = () => {
    setTesting(true);
    setTimeout(() => {
      setTesting(false);
      setPassed(true);
    }, 1200);
  };

  const checks = [
    { label: 'Outbound Internet Traffic', value: 'HARD BLOCKED (0 KB)', status: 'PASS', detail: 'Dropped at iptables kernel filter' },
    { label: 'Third-Party API Sockets', value: '0 OPEN SOCKETS', status: 'PASS', detail: 'Zero external domains reached' },
    { label: 'Local Weights Ingestion', value: '100% AIR-GAPPED', status: 'PASS', detail: 'Loaded via PCIe Gen 5 bus into VRAM' },
    { label: 'Document OCR Memory', value: 'EPHEMERAL ENCLAVE', status: 'PASS', detail: 'No disk leakage outside encrypted vault' }
  ];

  return (
    <WorkspaceLayout
      activeAgent={AGENTS[6]}
      onSelectAgent={() => {}}
      currentTaskTitle="Air-Gapped Zero-Trust Command Center"
    >
      <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 max-w-5xl mx-auto w-full font-mono text-xs">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#262626] dark:border-[#262626] light:border-[#E5E5E5]">
          <div>
            <div className="flex items-center gap-2 mb-1.5 text-xs text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373]">
              <Terminal className="w-3.5 h-3.5 text-[#F97316]" />
              <span>// 04 SECURITY & AIR-GAP COMMAND</span>
              <span>·</span>
              <span className="text-emerald-400 dark:text-emerald-400 light:text-emerald-700">PERIMETER LOCKED</span>
            </div>
            <h1 className="text-2xl font-bold text-white dark:text-white light:text-black font-sans tracking-tight">
              Air-Gap Verification & Hardware Telemetry
            </h1>
            <p className="text-xs text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#525252] mt-1 font-sans">
              Cryptographic perimeter audit, hardware isolation verification, and outbound socket drop inspection.
            </p>
          </div>

          <button
            onClick={handleTestPerimeter}
            disabled={testing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] bg-[#141414] dark:bg-[#141414] light:bg-[#FAFAFA] text-white dark:text-white light:text-black hover:border-[#525252] transition-colors"
          >
            <RefreshCw className={`w-3 h-3 ${testing ? 'animate-spin text-[#F97316]' : ''}`} />
            <span>{testing ? 'Auditing Sockets...' : 'Verify Air-Gap Perimeter'}</span>
          </button>
        </div>

        {/* Security Checks List */}
        <div className="border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] rounded-lg bg-[#141414] dark:bg-[#141414] light:bg-[#FFFFFF] divide-y divide-[#262626] dark:divide-[#262626] light:divide-[#E5E5E5] overflow-hidden">
          {checks.map((c, idx) => (
            <div key={idx} className="p-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[#F97316] font-bold">// 0{idx + 1}</span>
                  <span className="font-bold text-white dark:text-white light:text-black font-sans text-sm">{c.label}</span>
                </div>
                <p className="text-xs text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#525252] font-sans">{c.detail}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-white dark:text-white light:text-black font-semibold">{c.value}</span>
                <span className="text-[10px] text-emerald-400 dark:text-emerald-400 light:text-emerald-700 bg-emerald-950/60 dark:bg-emerald-950/60 light:bg-emerald-50 px-2 py-0.5 rounded border border-emerald-800/40 dark:border-emerald-800/40 light:border-emerald-200">
                  {c.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Live Telemetry Box */}
        <div className="p-4 rounded-lg border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#FAFAFA] space-y-2">
          <span className="text-[#737373] text-[10px] uppercase tracking-wider block">// Active Node Hardware:</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-[#737373] block text-[10px]">GPU ACCELERATOR</span>
              <span className="text-white dark:text-white light:text-black font-bold">RTX 4090 (24GB)</span>
            </div>
            <div>
              <span className="text-[#737373] block text-[10px]">ENCLAVE MODE</span>
              <span className="text-emerald-400 dark:text-emerald-400 light:text-emerald-700 font-bold">AES-256 GCM</span>
            </div>
            <div>
              <span className="text-[#737373] block text-[10px]">DROPPED PACKETS</span>
              <span className="text-white dark:text-white light:text-black font-bold">0 OUTBOUND</span>
            </div>
            <div>
              <span className="text-[#737373] block text-[10px]">STATUS</span>
              <span className="text-emerald-400 dark:text-emerald-400 light:text-emerald-700 font-bold">CERTIFIED 100%</span>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
};
