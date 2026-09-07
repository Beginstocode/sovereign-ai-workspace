import React from 'react';
import { 
  Bot, 
  ArrowRight
} from 'lucide-react';
import { AGENTS, AUTO_AGENT } from '../../data/agents';
import { Agent } from '../../types';

interface AgentBarProps {
  activeAgent: Agent;
  onSelectAgent: (agent: Agent) => void;
  onOpenAgentModal?: () => void;
  compact?: boolean;
}

export const AgentBar: React.FC<AgentBarProps> = ({
  activeAgent,
  onSelectAgent,
  onOpenAgentModal,
  compact = false
}) => {
  const allAgents = [AUTO_AGENT, ...AGENTS];

  return (
    <div className="w-full pt-1 pb-1 select-none font-sans">
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[11px] font-bold text-slate-400 flex-shrink-0 mr-1 uppercase">
          Specialists:
        </span>
        {allAgents.map((agent) => {
          const isSelected = activeAgent.id === agent.id;
          return (
            <button
              key={agent.id}
              onClick={() => onSelectAgent(agent)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap border ${
                isSelected
                  ? 'bg-[#133863] text-white border-[#133863] shadow-sm font-bold'
                  : 'bg-white dark:bg-[#12223D] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#EE7027]' : 'bg-slate-300 dark:bg-slate-600'}`}></span>
              <span>{agent.name}</span>
            </button>
          );
        })}

        {onOpenAgentModal && (
          <button
            onClick={onOpenAgentModal}
            className="text-[11px] font-semibold text-[#133863] dark:text-blue-400 hover:underline px-2 py-1 flex items-center gap-1 whitespace-nowrap ml-auto"
          >
            <span>All ({allAgents.length}) →</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default AgentBar;
