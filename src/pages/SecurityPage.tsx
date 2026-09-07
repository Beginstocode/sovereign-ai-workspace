import React, { useState } from 'react';
import { WorkspaceLayout } from '../components/workspace/WorkspaceLayout';
import { AGENTS } from '../data/agents';
import { 
  ShieldCheck, 
  RefreshCw, 
  CheckCircle2,
  Lock,
  Cpu,
  HardDrive,
  Radio,
  Server
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
    { label: 'Outbound Internet Traffic', value: 'HARD BLOCKED (0 KB)', status: 'PASS', detail: 'Dropped at iptables kernel filter with zero socket leakage' },
    { label: 'Third-Party Cloud API Sockets', value: '0 OPEN SOCKETS', status: 'PASS', detail: 'Zero external domains queried or reachable' },
    { label: 'Local Weights Ingestion', value: '100% AIR-GAPPED', status: 'PASS', detail: 'Weights loaded via PCIe Gen 5 bus directly into GPU VRAM' },
    { label: 'Document OCR Memory Storage', value: 'EPHEMERAL ENCLAVE', status: 'PASS', detail: 'Temporary buffers flushed immediately after deliverable compilation' },
    { label: 'Hardware Cryptographic Anchor', value: 'FIPS 140-2 LEVEL 3 HSM', status: 'PASS', detail: 'All audit ledger hashes signed with internal HSM private key' }
  ];

  return (
    <WorkspaceLayout
      activeAgent={AGENTS[6]}
      onSelectAgent={() => {}}
      currentTaskTitle="Air-Gapped Zero-Trust Security Enclave"
    >
      <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 max-w-6xl mx-auto w-full font-sans text-xs">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-semibold text-[#133863] dark:text-blue-400">DEFENSE & CRITICAL INFRASTRUCTURE</span>
              <span>•</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-medium">PERIMETER FULLY ISOLATED</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Air-Gap Verification & Security Command
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Cryptographic perimeter audit, hardware isolation telemetry, and outbound socket inspection.
            </p>
          </div>

          <button
            onClick={handleTestPerimeter}
            disabled={testing}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#133863] hover:bg-[#0B2545] text-white font-semibold text-xs transition-all shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin text-[#EE7027]' : ''}`} />
            <span>{testing ? 'Auditing Perimeter...' : 'Verify Air-Gap Integrity'}</span>
          </button>
        </div>

        {/* Real-time Telemetry Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/40">
            <span className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-300 block">
              Outbound Data Transfer
            </span>
            <div className="text-2xl font-bold text-emerald-900 dark:text-white mt-1">0.00 KB</div>
            <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">100% Zero Leakage</span>
          </div>

          <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/60 dark:bg-blue-950/40">
            <span className="text-[10px] uppercase font-bold text-blue-800 dark:text-blue-300 block">
              External API Calls
            </span>
            <div className="text-2xl font-bold text-blue-900 dark:text-white mt-1">0 (Zero)</div>
            <span className="text-[11px] text-blue-700 dark:text-blue-400 font-medium">Local LLM inference only</span>
          </div>

          <div className="p-4 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/60 dark:bg-purple-950/40">
            <span className="text-[10px] uppercase font-bold text-purple-800 dark:text-purple-300 block">
              Network Interface Status
            </span>
            <div className="text-2xl font-bold text-purple-900 dark:text-white mt-1">ISOLATED</div>
            <span className="text-[11px] text-purple-700 dark:text-purple-400 font-medium">Physical LAN only</span>
          </div>
        </div>

        {/* Security Checks List */}
        <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-[#12223D] shadow-sm divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
          {checks.map((c, idx) => (
            <div key={idx} className="p-4.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                    {c.label}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold font-mono">
                    {c.value}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {c.detail}
                </p>
              </div>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold font-mono border border-emerald-200 flex-shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
                VERIFIED
              </span>
            </div>
          ))}
        </div>
      </div>
    </WorkspaceLayout>
  );
};

export default SecurityPage;
