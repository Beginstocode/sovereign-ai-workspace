import React, { useState } from 'react';
import { WorkspaceLayout } from '../components/workspace/WorkspaceLayout';
import { AGENTS } from '../data/agents';
import { LOCAL_MODELS } from '../data/mockData';
import { 
  Cpu, 
  Zap, 
  HardDrive, 
  Gauge, 
  CheckCircle2, 
  Activity, 
  RefreshCw, 
  Sparkles,
  Layers
} from 'lucide-react';

export const ModelsPage: React.FC = () => {
  const [models, setModels] = useState(LOCAL_MODELS);
  const [optimizing, setOptimizing] = useState(false);

  const handleOptimizeVram = () => {
    setOptimizing(true);
    setTimeout(() => setOptimizing(false), 1200);
  };

  return (
    <WorkspaceLayout
      activeAgent={AGENTS[1]} // Software Engineer
      onSelectAgent={() => {}}
      currentTaskTitle="Local Model Router & Hardware Allocator"
    >
      <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-[10px] font-mono text-purple-300">
                LOCAL GPU RUNTIME
              </span>
              <span className="text-[10px] font-mono text-emerald-400">
                TENSORRT-LLM ENCLAVE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Local Model Router
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Frontier vision, code, and reasoning models running directly on internal NVIDIA hardware without token fees or external cloud dependencies.
            </p>
          </div>

          <button
            onClick={handleOptimizeVram}
            disabled={optimizing}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 text-xs font-mono font-semibold transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${optimizing ? 'animate-spin' : ''}`} />
            <span>{optimizing ? 'Rebalancing VRAM...' : 'Rebalance VRAM Cache'}</span>
          </button>
        </div>

        {/* GPU Hardware Cluster VRAM Bar */}
        <div className="rounded-2xl bg-[#090e1c]/90 border border-purple-500/30 p-6 backdrop-blur-xl shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-500/40 text-cyan-400">
                <HardDrive className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Primary Compute Cluster: 4x NVIDIA L40S 48GB</h3>
                <span className="text-xs font-mono text-slate-400">Total VRAM: 192.0 GB GDDR6 • ECC Hardware Enforced</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono text-purple-300 font-bold block">
                142.4 GB / 192.0 GB (74.1% Allocated)
              </span>
              <span className="text-[10px] font-mono text-emerald-400">49.6 GB Headroom Available</span>
            </div>
          </div>

          <div className="w-full h-3 rounded-full bg-black/40 overflow-hidden p-0.5 border border-white/10">
            <div className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 rounded-full w-[74%]" />
          </div>
        </div>

        {/* Model Cards */}
        <div className="space-y-4">
          <h3 className="text-sm font-mono text-slate-400 uppercase tracking-wider">
            Quantized Model Weights in Memory
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {models.map((model) => (
              <div
                key={model.id}
                className="p-6 rounded-2xl bg-[#090e1c]/80 border border-white/[0.08] backdrop-blur-xl hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded bg-white/[0.04] text-[10px] font-mono text-slate-400 uppercase border border-white/[0.06]">
                      {model.parameterCount} Params
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {model.status.toUpperCase()}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-1">{model.name}</h4>
                  <span className="text-xs font-mono text-cyan-400 block mb-3">{model.role}</span>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {model.bestFor}
                  </p>

                  <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-black/40 border border-white/[0.04] text-[11px] font-mono text-slate-400 mb-4">
                    <div>
                      <span className="text-slate-500 block">Quantization:</span>
                      <span className="text-white">{model.quantization}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">VRAM Footprint:</span>
                      <span className="text-purple-300">{model.vramRequirement}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Context Window:</span>
                      <span className="text-white">{model.contextWindow}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Inference Rate:</span>
                      <span className="text-cyan-400">{model.tps} tok/sec</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">Latency: 12ms/first-token</span>
                  <span className="text-emerald-300">0ms WAN</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
};
