import React from 'react';
import { 
  X, 
  Cpu, 
  Bot, 
  Database, 
  Wrench, 
  Zap, 
  Activity, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  HardDrive
} from 'lucide-react';
import { Agent } from '../../types';

interface ModelRouterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeAgent: Agent;
  onChangeAgent: () => void;
  currentTaskTitle?: string;
  selectedModel?: string;
  activeKnowledge?: string;
  activeTools?: string[];
}

export const ModelRouterDrawer: React.FC<ModelRouterDrawerProps> = ({
  isOpen,
  onClose,
  activeAgent,
  onChangeAgent,
  currentTaskTitle = 'Analyse inspection report and prepare approval note',
  selectedModel = 'Qwen Vision 72B (AWQ Quantized)',
  activeKnowledge = 'Plant Maintenance SOP (v4.2) + ISO-9001 Specs',
  activeTools = ['Air-Gapped OCR Engine', 'Vector Knowledge Search', 'Approval Docx Compiler']
}) => {
  if (!isOpen) return null;

  return (
    <aside className="fixed inset-y-0 right-0 z-40 w-80 sm:w-96 bg-[#080d1a] border-l border-white/10 shadow-2xl backdrop-blur-2xl flex flex-col animate-slideLeft select-none">
      {/* Drawer Header */}
      <div className="h-16 px-5 border-b border-white/[0.08] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-purple-950/50 border border-purple-500/40 text-purple-300">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-display">
              Model Router
            </h3>
            <span className="text-[10px] font-mono text-cyan-400">
              LOCAL ORCHESTRATION ENGINE
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

      {/* Drawer Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Active Task */}
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
            Current Task
          </div>
          <p className="text-xs text-white font-medium leading-snug">
            {currentTaskTitle}
          </p>
        </div>

        {/* Selected Agent - Storyboard Panel 12 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-purple-400" />
              Selected Agent
            </span>
            <button
              onClick={onChangeAgent}
              className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
            >
              Change
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0e162c] border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{
                  backgroundColor: `${activeAgent.accentColor}20`,
                  color: activeAgent.accentColor,
                  border: `1px solid ${activeAgent.accentColor}40`
                }}
              >
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">{activeAgent.name}</h4>
                <p className="text-[10px] text-slate-400 font-mono">{activeAgent.role}</p>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>

        {/* Selected Model - Storyboard Panel 12 */}
        <div className="space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            Selected Model
          </div>

          <div className="p-3.5 rounded-xl bg-[#0e162c] border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">{selectedModel}</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-[9px] font-mono text-emerald-300">
                ACTIVE
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Optimized for documents, technical drawings, and table structure recognition.
            </p>
            <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>Latency: 14ms/token</span>
              <span className="text-cyan-400">68 tok/s</span>
            </div>
          </div>
        </div>

        {/* Knowledge - Storyboard Panel 12 */}
        <div className="space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            Knowledge Context
          </div>

          <div className="p-3.5 rounded-xl bg-[#0e162c] border border-white/10 space-y-1.5">
            <div className="text-xs font-semibold text-white">
              {activeKnowledge}
            </div>
            <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between">
              <span>HNSW Vector Index</span>
              <span className="text-emerald-400">Cosine 0.94 Sim</span>
            </div>
          </div>
        </div>

        {/* Tools - Storyboard Panel 12 */}
        <div className="space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Wrench className="w-3.5 h-3.5 text-amber-400" />
            Active Tools
          </div>

          <div className="space-y-1.5">
            {activeTools.map((tool, i) => (
              <div
                key={i}
                className="p-2.5 rounded-lg bg-[#0a1020] border border-white/[0.06] flex items-center justify-between text-xs"
              >
                <span className="text-slate-200 text-xs">{tool}</span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] text-slate-400">
                  Sandboxed
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Execution Hardware - Storyboard Panel 12 */}
        <div className="space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-purple-400" />
            Execution Enclave
          </div>

          <div className="p-3.5 rounded-xl bg-gradient-to-br from-purple-950/30 to-[#0e162c] border border-purple-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-cyan-400" />
                Local GPU (RTX 4090 / L40S)
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">
                100% LOCAL
              </span>
            </div>

            {/* VRAM Bar */}
            <div>
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                <span>VRAM Usage</span>
                <span className="text-white">44.8 GB / 48.0 GB (93%)</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full w-[93%]" />
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.06] flex justify-between text-[10px] font-mono text-slate-400">
              <span>WAN Traffic: 0 KB</span>
              <span className="text-emerald-300">Air-Gap Locked</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
