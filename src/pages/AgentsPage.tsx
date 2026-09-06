import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WorkspaceLayout } from '../components/workspace/WorkspaceLayout';
import { AGENTS } from '../data/agents';
import { Agent } from '../types';
import { 
  ArrowRight, 
  Terminal
} from 'lucide-react';

export const AgentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedAgent, setSelectedAgent] = useState<Agent>(AGENTS[0]);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Operations', 'Analytics', 'Engineering', 'Analysis', 'Finance', 'Governance', 'Executive'];

  const filteredAgents = activeCategory === 'All'
    ? AGENTS
    : AGENTS.filter((a) => a.category === activeCategory);

  const handleLaunchAgent = (agent: Agent) => {
    navigate('/workspace', { state: { selectedAgentId: agent.id } });
  };

  return (
    <WorkspaceLayout
      activeAgent={selectedAgent}
      onSelectAgent={(agent) => setSelectedAgent(agent)}
      currentTaskTitle="AI Workforce Management Directory"
    >
      <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 max-w-5xl mx-auto w-full font-mono text-xs">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#262626] dark:border-[#262626] light:border-[#E5E5E5]">
          <div>
            <div className="flex items-center gap-2 mb-1.5 text-xs text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373]">
              <Terminal className="w-3.5 h-3.5 text-[#F97316]" />
              <span>// 01 WORKFORCE DIRECTORY</span>
              <span>·</span>
              <span className="text-emerald-400 dark:text-emerald-400 light:text-emerald-700">8 SPECIALISTS ACTIVE</span>
            </div>
            <h1 className="text-2xl font-bold text-white dark:text-white light:text-black font-sans tracking-tight">
              AI Workforce & Domain Personas
            </h1>
            <p className="text-xs text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#525252] mt-1 font-sans">
              Autonomous agents tuned for specific enterprise file types, standard operating procedures, and air-gapped execution.
            </p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap border ${
                activeCategory === cat
                  ? 'bg-white dark:bg-white light:bg-[#171717] text-black dark:text-black light:text-white border-white dark:border-white light:border-[#171717] font-semibold'
                  : 'bg-[#141414] dark:bg-[#141414] light:bg-[#FAFAFA] text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#525252] border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] hover:border-[#525252]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAgents.map((agent, idx) => (
            <div
              key={agent.id}
              className="p-5 rounded-lg border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] bg-[#141414] dark:bg-[#141414] light:bg-[#FFFFFF] flex flex-col justify-between hover:border-[#404040] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373]">
                    <span className="text-[#F97316] font-bold">// 0{idx + 1}</span> {agent.category}
                  </span>
                  <span className="text-[10px] text-emerald-400 dark:text-emerald-400 light:text-emerald-700 bg-emerald-950/60 dark:bg-emerald-950/60 light:bg-emerald-50 px-2 py-0.5 rounded border border-emerald-800/40 dark:border-emerald-800/40 light:border-emerald-200">
                    ONLINE
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white dark:text-white light:text-black font-sans mb-1">
                  {agent.name}
                </h3>
                <span className="text-[11px] text-[#F97316] block mb-2">{agent.role}</span>

                <p className="text-xs text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#525252] font-sans leading-relaxed mb-4">
                  {agent.description}
                </p>

                {/* Capabilities */}
                <div className="space-y-1 mb-4">
                  <span className="text-[10px] text-[#737373] uppercase tracking-wider block">// Calibrated for:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {agent.capabilities.slice(0, 3).map((cap, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-[#1C1C1C] dark:bg-[#1C1C1C] light:bg-[#F5F5F5] border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] text-[10px] text-[#D4D4D4] dark:text-[#D4D4D4] light:text-[#525252]"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] flex items-center justify-between">
                <span className="text-[11px] text-[#737373]">{agent.defaultModel}</span>
                <button
                  onClick={() => handleLaunchAgent(agent)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white dark:bg-white light:bg-[#171717] text-black dark:text-black light:text-white font-medium text-xs hover:opacity-90 transition-opacity"
                >
                  <span>Engage in Chat</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </WorkspaceLayout>
  );
};
