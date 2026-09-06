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
    <div className="w-full pt-2 pb-1 select-none font-mono">
      {/* Horizontal Agent Selector Ribbon (Claude / Snitch style) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[11px] text-[#737373] flex-shrink-0 mr-1">
          // agent:
        </span>
        {allAgents.map((agent, idx) => {
          const isSelected = activeAgent.id === agent.id;
          return (
            <button
              key={agent.id}
              onClick={() => onSelectAgent(agent)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-all whitespace-nowrap border ${
                isSelected
                  ? 'bg-white dark:bg-white light:bg-[#171717] text-black dark:text-black light:text-white border-white dark:border-white light:border-[#171717] font-semibold shadow-sm'
                  : 'bg-[#141414] dark:bg-[#141414] light:bg-[#FFFFFF] text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#525252] border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] hover:border-[#525252] hover:text-white dark:hover:text-white light:hover:text-[#171717]'
              }`}
            >
              <span className={`text-[10px] ${isSelected ? 'text-[#F97316]' : 'text-[#737373]'}`}>
                0{idx}
              </span>
              <span>{agent.name.split(' ')[0]}</span>
            </button>
          );
        })}

        {onOpenAgentModal && (
          <button
            onClick={onOpenAgentModal}
            className="text-[11px] text-[#A3A3A3] hover:text-white dark:hover:text-white light:hover:text-[#171717] px-2 py-1 flex items-center gap-1 whitespace-nowrap ml-auto"
          >
            <span>all ({allAgents.length}) →</span>
          </button>
        )}
      </div>
    </div>
  );
};
