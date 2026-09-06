import React from 'react';
import { WorkspaceLayout } from '../components/workspace/WorkspaceLayout';
import { AGENTS } from '../data/agents';
import { LOCAL_TOOLS } from '../data/mockData';
import { 
  Wrench, 
  ShieldCheck, 
  Lock, 
  Cpu, 
  Terminal, 
  FileCode, 
  CheckCircle2, 
  HardDrive 
} from 'lucide-react';

export const ToolsPage: React.FC = () => {
  return (
    <WorkspaceLayout
      activeAgent={AGENTS[1]} // Software Engineer
      onSelectAgent={() => {}}
      currentTaskTitle="Air-Gapped Secure Tools Registry"
    >
      <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-950/60 border border-amber-500/30 text-[10px] font-mono text-amber-300">
                SANDBOXED RUNTIMES
              </span>
              <span className="text-[10px] font-mono text-emerald-400">
                ZERO OUTBOUND SOCKETS
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Secure Local Tools
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Every tool runs within hardened, stateless WASM or Docker enclaves with memory isolation and file access limits.
            </p>
          </div>
        </div>

        {/* Tools Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LOCAL_TOOLS.map((tool) => (
            <div
              key={tool.id}
              className="p-6 rounded-2xl bg-[#090e1c]/80 border border-white/[0.08] backdrop-blur-xl hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950/50 border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
                    {tool.safetyRating}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2">{tool.name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {tool.description}
                </p>

                <div className="p-3 rounded-xl bg-black/40 border border-white/[0.04] space-y-1.5 text-[11px] font-mono text-slate-400">
                  <div className="flex justify-between">
                    <span>Isolation Enclave:</span>
                    <span className="text-cyan-400">{tool.sandbox}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Invocations:</span>
                    <span className="text-white">{tool.invocations.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/[0.04] flex items-center justify-between text-xs font-mono text-slate-500">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Hardened WASM
                </span>
                <span>ID: {tool.id}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </WorkspaceLayout>
  );
};
