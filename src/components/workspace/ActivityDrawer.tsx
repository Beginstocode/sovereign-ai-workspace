import React from 'react';
import { 
  X, 
  Activity, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  FileText, 
  Cpu, 
  Database, 
  Wrench, 
  Lock,
  ExternalLink
} from 'lucide-react';
import { INITIAL_AUDIT_LOG } from '../../data/mockData';

interface ActivityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ActivityDrawer: React.FC<ActivityDrawerProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <aside className="fixed inset-y-0 right-0 z-40 w-80 sm:w-96 bg-[#080d1a] border-l border-white/10 shadow-2xl backdrop-blur-2xl flex flex-col animate-slideLeft select-none">
      {/* Drawer Header */}
      <div className="h-16 px-5 border-b border-white/[0.08] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-cyan-950/50 border border-cyan-500/40 text-cyan-300">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-display">
              Execution Activity
            </h3>
            <span className="text-[10px] font-mono text-emerald-400">
              TAMPER-PROOF AUDIT TRAIL
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Activity Timeline (Storyboard Panel 13) */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400">Session Security</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            AIR-GAP SIGNED
          </span>
        </div>

        <div className="relative pl-6 space-y-5">
          {/* Vertical timeline line */}
          <div className="absolute top-2 bottom-2 left-2.5 w-[1px] bg-gradient-to-b from-cyan-500 via-purple-500 to-emerald-500 opacity-30" />

          {INITIAL_AUDIT_LOG.map((event) => (
            <div key={event.id} className="relative group">
              {/* Dot */}
              <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-[#080d1a] border-2 border-cyan-400 shadow-[0_0_8px_#06b6d4]" />

              <div className="p-3 rounded-xl bg-[#0b1224]/80 border border-white/[0.06] group-hover:border-white/15 transition-all">
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className="text-cyan-400 font-bold">
                    {event.title}
                  </span>
                  <span className="text-slate-500">{event.timestamp}</span>
                </div>

                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {event.detail}
                </p>

                <div className="mt-2 pt-2 border-t border-white/[0.04] flex items-center justify-between text-[9px] font-mono text-slate-400">
                  <span>{event.agent}</span>
                  <span className="text-emerald-400">+{event.latencyMs}ms</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/[0.06] bg-black/20 text-center">
        <span className="text-[10px] font-mono text-slate-500">
          Cryptographically sealed to local HSM token #ENCLAVE-98
        </span>
      </div>
    </aside>
  );
};
