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
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#0E2A5C] dark:text-orange-400" />;
      case 'BarChart3': return <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'Code2': return <Code2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'FileText': return <FileText className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'Compass': return <Compass className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
      case 'Coins': return <Coins className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'Users': return <Users className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-teal-600 dark:text-teal-400" />;
      case 'Presentation': return <Presentation className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      default: return <Bot className="w-5 h-5 text-[#0E2A5C] dark:text-blue-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-2xl rounded-xl bg-white dark:bg-[#171717] border border-slate-300 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#1C1C1C] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#0E2A5C] text-white flex items-center justify-center shadow-sm">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Select Sovereign Specialist Agent
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose a domain specialist or allow the Autonomous Orchestrator to auto-route
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input */}
        <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#171717]">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search specialists by name, capabilities, or file type..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-50 dark:bg-[#202020] border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#0E2A5C]"
              autoFocus
            />
          </div>
        </div>

        {/* Agent Cards List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {filteredAgents.map((agent) => {
            const isSelected = selectedAgentId === agent.id;
            return (
              <div
                key={agent.id}
                onClick={() => {
                  onSelectAgent(agent);
                  onClose();
                }}
                className={`cursor-pointer p-3.5 rounded-xl border transition-all duration-150 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-blue-50/60 dark:bg-blue-950/40 border-[#0E2A5C] dark:border-blue-500 shadow-sm'
                    : 'bg-white dark:bg-[#1A1A1A] border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-[#222222] hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex-shrink-0">
                    {getAgentIcon(agent.iconName)}
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {agent.name}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                        ({agent.role})
                      </span>
                      <span className="px-2 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[9px] font-mono border border-slate-200 dark:border-slate-700">
                        {agent.defaultModel}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
                      {agent.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  {isSelected && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Active
                    </span>
                  )}
                  <span className="text-[11px] font-semibold text-[#0E2A5C] dark:text-blue-400 hover:underline">
                    Select
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 dark:bg-[#1C1C1C] border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>Air-Gapped Local Model Execution</span>
          <span>Zero External API Calls</span>
        </div>
      </div>
    </div>
  );
};
