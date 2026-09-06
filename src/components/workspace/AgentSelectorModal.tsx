import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Sparkles, 
  Bot, 
  Check, 
  Cpu, 
  Wrench, 
  Layers, 
  ShieldCheck,
  BarChart3,
  Code2,
  FileText,
  Compass,
  Coins,
  Users,
  Presentation
} from 'lucide-react';
import { AGENTS, AUTO_AGENT } from '../../data/agents';
import { Agent } from '../../types';

interface AgentSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAgent: (agent: Agent) => void;
  selectedAgentId: string;
}

export const AgentSelectorModal: React.FC<AgentSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelectAgent,
  selectedAgentId
}) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const allAgents = [AUTO_AGENT, ...AGENTS];

  const filteredAgents = allAgents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.role.toLowerCase().includes(search.toLowerCase()) ||
      agent.description.toLowerCase().includes(search.toLowerCase())
  );

  const getAgentIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-purple-400" />;
      case 'BarChart3': return <BarChart3 className="w-5 h-5 text-cyan-400" />;
      case 'Code2': return <Code2 className="w-5 h-5 text-purple-400" />;
      case 'FileText': return <FileText className="w-5 h-5 text-amber-400" />;
      case 'Compass': return <Compass className="w-5 h-5 text-pink-400" />;
      case 'Coins': return <Coins className="w-5 h-5 text-indigo-400" />;
      case 'Users': return <Users className="w-5 h-5 text-orange-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'Presentation': return <Presentation className="w-5 h-5 text-teal-400" />;
      default: return <Bot className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-2xl rounded-2xl bg-[#090d1a] border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-300">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Select Sovereign Agent
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Choose a specialized persona or let the Autonomous Router dispatch
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

        {/* Search input */}
        <div className="p-4 border-b border-white/[0.06] bg-black/20">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search agents by role, capabilities, or tools..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
              autoFocus
            />
          </div>
        </div>

        {/* Agent Cards List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredAgents.map((agent) => {
            const isSelected = selectedAgentId === agent.id;
            return (
              <div
                key={agent.id}
                onClick={() => {
                  onSelectAgent(agent);
                  onClose();
                }}
                className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isSelected
                    ? 'bg-[#121a35] border-purple-500/60 shadow-[0_0_20px_rgba(147,51,234,0.2)]'
                    : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/15'
                }`}
              >
                <div className="flex items-start gap-3.5 flex-1">
                  <div
                    className="p-2.5 rounded-xl flex-shrink-0"
                    style={{
                      backgroundColor: `${agent.accentColor}18`,
                      border: `1px solid ${agent.accentColor}40`
                    }}
                  >
                    {getAgentIcon(agent.iconName)}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-white">
                        {agent.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.05] text-slate-400 border border-white/[0.06]">
                        {agent.category}
                      </span>
                      {agent.id === 'auto' && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950/60 text-purple-300 border border-purple-500/40 font-bold">
                          RECOMMENDED
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {agent.description}
                    </p>

                    {/* Capabilities Tags */}
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {agent.capabilities.slice(0, 3).map((cap, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-slate-400 border border-white/[0.04]"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Selection check */}
                <div className="flex sm:flex-col items-end justify-between self-stretch sm:self-center">
                  {isSelected ? (
                    <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-900/50">
                      <Check className="w-4 h-4" />
                    </div>
                  ) : (
                    <button className="px-3 py-1 rounded-lg bg-white/[0.05] text-xs text-slate-300 font-mono hover:bg-white/10">
                      Select
                    </button>
                  )}
                  <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1 mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    LOCAL GPU
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-white/[0.06] bg-black/30 flex items-center justify-between text-xs font-mono text-slate-500">
          <span>8 On-Premises Specialist Agents</span>
          <span className="text-emerald-400">Zero Cloud API Calls</span>
        </div>
      </div>
    </div>
  );
};
