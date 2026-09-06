import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight
} from 'lucide-react';
import { AGENTS } from '../../data/agents';

export const WorkforceSection: React.FC = () => {
  const navigate = useNavigate();

  const getAgentTagline = (id: string) => {
    switch (id) {
      case 'inspection-agent': return 'your compliance & NDT back';
      case 'data-analyst': return 'your numbers & models';
      case 'software-engineer': return 'your code & sandbox';
      case 'presentation-agent': return 'your executive story';
      case 'legal-compliance': return 'your policy & clauses';
      case 'operations-manager': return 'your shop floor rhythm';
      case 'finance-analyst': return 'your margin & spend';
      case 'hr-partner': return 'your team & talent';
      default: return 'your specialist';
    }
  };

  const getAgentQuestion = (id: string) => {
    switch (id) {
      case 'inspection-agent': return 'Can this asset survive the next overhaul without structural fatigue?';
      case 'data-analyst': return 'What do 4 million telemetry rows say that your dashboard missed?';
      case 'software-engineer': return 'Did the AI write code that leaks sockets or deadlocks in production?';
      case 'presentation-agent': return 'How do you turn 50 pages of raw technical audits into 8 boardroom slides?';
      case 'legal-compliance': return 'Does this supplier contract violate section 14 of your corporate charter?';
      case 'operations-manager': return 'Where is the maintenance backlog bleeding shift productivity?';
      case 'finance-analyst': return 'Which vendor quotation actually costs less once payment schedules normalize?';
      case 'hr-partner': return 'Is the internal promotion rubric compliant with national labor standards?';
      default: return 'How do we solve this?';
    }
  };

  const handleSelectAgent = (agentId: string) => {
    navigate('/workspace', { state: { selectedAgentId: agentId } });
  };

  return (
    <section id="workforce" className="py-20 border-b border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] transition-colors">
      {/* Editorial Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs font-mono text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373] mb-2">
            <span className="text-[#F97316] font-semibold">// 02 WORKFORCE</span> — EIGHT DOMAIN SPECIALISTS
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white dark:text-white light:text-[#171717] tracking-tight">
            A specialist for every role. Each with its own evidence standard.
          </h2>
        </div>
      </div>

      <p className="text-sm sm:text-base text-[#D4D4D4] dark:text-[#D4D4D4] light:text-[#525252] leading-relaxed max-w-3xl mb-10">
        General chatbots pretend to know everything and cite nothing. Sovereign routes your task to a 
        dedicated domain specialist tuned for specific document structures, standard operating procedures, 
        and deterministic tools.
      </p>

      {/* Snitch-style Skills List / Index */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {AGENTS.map((agent, idx) => (
          <div
            key={agent.id}
            onClick={() => handleSelectAgent(agent.id)}
            className="group cursor-pointer p-5 rounded-lg border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] bg-[#141414] dark:bg-[#141414] light:bg-[#FFFFFF] hover:border-[#404040] dark:hover:border-[#404040] light:hover:border-[#D4D4D4] hover:bg-[#1A1A1A] dark:hover:bg-[#1A1A1A] light:hover:bg-[#F9F9F9] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2 font-mono text-xs text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373]">
                <span>
                  <span className="text-[#F97316] font-bold">// 0{idx + 1}</span> {agent.name}
                </span>
                <span className="text-[#D4D4D4] dark:text-[#D4D4D4] light:text-[#525252] group-hover:text-white dark:group-hover:text-white light:group-hover:text-[#171717] transition-colors">
                  {getAgentTagline(agent.id)} →
                </span>
              </div>

              <h3 className="text-sm font-bold text-white dark:text-white light:text-[#171717] mb-2 leading-snug">
                "{getAgentQuestion(agent.id)}"
              </h3>

              <p className="text-xs text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#525252] leading-relaxed mb-4">
                {agent.description}
              </p>
            </div>

            <div className="pt-3 border-t border-[#262626] dark:border-[#262626] light:border-[#F5F5F5] flex items-center justify-between text-[11px] font-mono text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373]">
              <span className="text-[#D4D4D4] dark:text-[#D4D4D4] light:text-[#404040]">{agent.defaultModel}</span>
              <span className="text-emerald-400 dark:text-emerald-400 light:text-emerald-700 bg-emerald-950/60 dark:bg-emerald-950/60 light:bg-emerald-50 px-2 py-0.5 rounded border border-emerald-800/40 dark:border-emerald-800/40 light:border-emerald-200">
                LOCAL ENCLAVE
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Router Recommendation Box */}
      <div className="p-4 rounded-lg border border-[#333333] dark:border-[#333333] light:border-[#D4D4D4] bg-[#141414] dark:bg-[#141414] light:bg-[#F5F5F5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
        <div>
          <span className="text-[#F97316] font-bold">// 00 AUTO ROUTER:</span>
          <span className="text-[#D4D4D4] dark:text-[#D4D4D4] light:text-[#404040] ml-2">Not sure which agent fits? Just describe your task — the router picks the right one.</span>
        </div>
        <button
          onClick={() => navigate('/workspace')}
          className="text-white dark:text-white light:text-[#171717] font-semibold hover:underline flex-shrink-0 flex items-center gap-1"
        >
          <span>Open Workspace Router</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </section>
  );
};
