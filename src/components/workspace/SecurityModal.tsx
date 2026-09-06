import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  WifiOff, 
  CloudOff, 
  Cpu, 
  Server, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw,
  HardDrive,
  Radio
} from 'lucide-react';
import { INITIAL_SECURITY_TELEMETRY } from '../../data/mockData';

interface SecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecurityModal: React.FC<SecurityModalProps> = ({
  isOpen,
  onClose
}) => {
  const [runningDiagnostic, setRunningDiagnostic] = useState(false);
  const [diagnosticPassed, setDiagnosticPassed] = useState(true);

  if (!isOpen) return null;

  const handleRunDiagnostic = () => {
    setRunningDiagnostic(true);
    setTimeout(() => {
      setRunningDiagnostic(false);
      setDiagnosticPassed(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-2xl rounded-2xl bg-[#090d1a] border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.2)] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-white/[0.08] bg-emerald-950/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-display">
                  Sovereign Air-Gap Command Center
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[10px] font-mono text-emerald-300 font-bold">
                  ACTIVE
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Hardware Enclave #ENCLAVE-HSM-902 • Zero Cloud Exposure Guarantee
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* 4 Metric Badges (Storyboard Panel 13) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-[#0a1020] border border-white/[0.06] text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Internet</span>
              <div className="text-xl font-bold font-mono text-rose-400 mt-0.5">OFF</div>
              <span className="text-[9px] font-mono text-slate-500">NIC Cutout</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0a1020] border border-white/[0.06] text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase">External Calls</span>
              <div className="text-xl font-bold font-mono text-cyan-400 mt-0.5">0</div>
              <span className="text-[9px] font-mono text-slate-500">Zero Tokens</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0a1020] border border-white/[0.06] text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Data Outbound</span>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">0 KB</div>
              <span className="text-[9px] font-mono text-slate-500">DLP Sealed</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0a1020] border border-white/[0.06] text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Processing</span>
              <div className="text-xl font-bold font-mono text-purple-300 mt-0.5">100%</div>
              <span className="text-[9px] font-mono text-slate-500">Local Hardware</span>
            </div>
          </div>

          {/* Network Schematic Bar (Storyboard Panel 13) */}
          <div className="p-4 rounded-xl bg-black/40 border border-white/[0.08] space-y-3">
            <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
              <span>PHYSICAL CONNECTION TOPOLOGY</span>
              <span className="text-emerald-400 font-bold">ALL FIREWALL RULES PASSED</span>
            </div>

            <div className="flex items-center justify-between text-center gap-2">
              <div className="flex-1 p-3 rounded-lg bg-[#0e162b] border border-white/10 flex flex-col items-center">
                <Server className="w-5 h-5 text-cyan-400 mb-1" />
                <span className="text-xs font-bold text-white">Local Server</span>
                <span className="text-[9px] font-mono text-slate-400">10.0.4.12</span>
              </div>

              <div className="w-12 h-0.5 bg-emerald-500 relative">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>

              <div className="flex-1 p-3 rounded-lg bg-[#0e162b] border border-white/10 flex flex-col items-center">
                <Cpu className="w-5 h-5 text-purple-400 mb-1" />
                <span className="text-xs font-bold text-white">AI Agents</span>
                <span className="text-[9px] font-mono text-slate-400">Isolated Enclave</span>
              </div>

              <div className="w-12 h-0.5 bg-rose-500 relative">
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-xs font-bold text-rose-500">✕</span>
              </div>

              <div className="flex-1 p-3 rounded-lg bg-rose-950/20 border border-rose-500/40 flex flex-col items-center">
                <CloudOff className="w-5 h-5 text-rose-400 mb-1" />
                <span className="text-xs font-bold text-rose-300">Public Cloud</span>
                <span className="text-[9px] font-mono text-rose-400">BLOCKED</span>
              </div>
            </div>
          </div>

          {/* Hardware & Enclave Telemetry */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2 text-xs font-mono">
            <div className="flex justify-between py-1 border-b border-white/[0.04]">
              <span className="text-slate-400">GPU Cluster:</span>
              <span className="text-white font-medium">{INITIAL_SECURITY_TELEMETRY.activeGpu}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/[0.04]">
              <span className="text-slate-400">VRAM Allocation:</span>
              <span className="text-white font-medium">{INITIAL_SECURITY_TELEMETRY.vramUsed} / {INITIAL_SECURITY_TELEMETRY.vramTotal}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/[0.04]">
              <span className="text-slate-400">Local Encryption:</span>
              <span className="text-white font-medium">{INITIAL_SECURITY_TELEMETRY.encryptionMode}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Zero-Trust Firewall:</span>
              <span className="text-emerald-400 font-bold">{INITIAL_SECURITY_TELEMETRY.zeroTrustFirewall}</span>
            </div>
          </div>

          {/* Self-Test Diagnostic Button */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Last perimeter audit: 12 seconds ago</span>
            </div>

            <button
              onClick={handleRunDiagnostic}
              disabled={runningDiagnostic}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/40 border border-emerald-500/40 text-emerald-200 text-xs font-mono transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${runningDiagnostic ? 'animate-spin' : ''}`} />
              <span>{runningDiagnostic ? 'Verifying Air-Gap...' : 'Run Air-Gap Audit'}</span>
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 border-t border-white/[0.08] bg-black/40 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Compliant with NIST SP 800-171 & ISO/IEC 27001</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/10 text-white font-sans text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
