import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WorkspaceLayout } from '../components/workspace/WorkspaceLayout';
import { AGENTS } from '../data/agents';
import { Agent } from '../types';
import { 
  ArrowRight, 
  Bot, 
  CheckCircle2, 
  Wrench, 
  Cpu, 
  Clock, 
  MessageSquare,
  Search,
  FileCheck
} from 'lucide-react';

export const AgentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedAgent, setSelectedAgent] = useState<Agent>(AGENTS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Operations', 'Engineering', 'Analytics', 'Finance', 'Governance', 'Executive'];

  const filteredAgents = AGENTS.filter((agent) => {
    const matchesCategory = activeCategory === 'All' || agent.category === activeCategory;
    const matchesSearch = 
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleStartConversation = (agent: Agent) => {
    navigate('/workspace', { state: { selectedAgentId: agent.id } });
  };

  // Mock recent tasks per agent
  const agentRecentTasks: Record<string, string[]> = {
    'doc-assistant': ['Summarized CVC Vigilance Circular 03/2024', 'Prepared draft compliance note for MoEFCC', 'Cross-referenced ISO 9001:2015 clauses'],
    'engineer': ['Turbine Shaft Vibration FFT Spectrum verification', 'Piping Wall Thickness Ultrasonic inspection scan', 'Reviewed Boiler Safety SOP v4.2'],
    'data-analyst': ['Extracted telemetry anomalies from 48-hr CSV logs', 'Aggregated monthly generation metrics for 6 units', 'Automated outage trend charts'],
    'coder': ['Audited internal portal backend for memory leak', 'Refactored SCADA telemetry ingestion script in Python', 'Optimized local SQL query for sensor database'],
    'inspection': ['Weld seam radiographic film crack detection', 'Non-Destructive Testing (NDT) report synthesis', 'Prepared structural clearance note'],
    'finance': ['Evaluated L1 bidder comparative statement under GFR 2017', 'Total Cost of Ownership (TCO) 5-year calculation', 'Reconciled GST vendor invoice deductions'],
    'hr': ['Drafted promotion review board agenda under CCS Rules', 'Verified LTC entitlement for group A officers', 'Drafted office order for departmental committee'],
    'presentation': ['Compiled Parliamentary Standing Committee briefing slides', 'Created Quarterly Board of Directors progress deck', 'Structured PSU Annual Plan summary'],
  };

  return (
    <WorkspaceLayout
      activeAgent={selectedAgent}
      onSelectAgent={(agent) => setSelectedAgent(agent)}
      currentTaskTitle="Enterprise AI Workforce Directory"
    >
      <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 max-w-6xl mx-auto w-full font-sans text-xs">
        {/* Government Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-semibold text-[#0E2A5C] dark:text-blue-400">OFFICIAL DIRECTORY</span>
              <span>•</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-medium">8 SPECIALISTS VERIFIED FOR AIR-GAPPED WORK</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Sovereign AI Specialists & Personas
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Pre-configured domain assistants operating strictly on internal GPU clusters. Each specialist is bound to specific authorized knowledge bases and tools.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search specialists or tools..."
              className="w-full bg-white dark:bg-[#1A1A1A] border border-slate-300 dark:border-slate-700 rounded-lg pl-8 pr-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#0E2A5C]"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                activeCategory === cat
                  ? 'bg-[#0E2A5C] text-white border-[#0E2A5C] shadow-sm font-semibold'
                  : 'bg-white dark:bg-[#1A1A1A] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Specialists Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredAgents.map((agent) => {
            const recentTasks = agentRecentTasks[agent.id] || [
              'Parsed internal standard circular',
              'Compiled verification certificate',
              'Validated against authorized SOP'
            ];

            return (
              <div
                key={agent.id}
                className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#141414] shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Top Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                          {agent.name}
                        </h3>
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold border border-emerald-200 dark:border-emerald-800">
                          Active
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-[#0E2A5C] dark:text-blue-400 mt-0.5">
                        {agent.role}
                      </div>
                    </div>

                    <span className="text-[10px] font-mono text-slate-500 bg-slate-100 dark:bg-[#202020] px-2 py-1 rounded border border-slate-200 dark:border-slate-700">
                      {agent.defaultModel}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {agent.description}
                  </p>

                  {/* Capabilities */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block">
                      Core Capabilities
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {agent.capabilities.map((cap, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md bg-slate-50 dark:bg-[#1E1E1E] border border-slate-200 dark:border-slate-800 text-[11px] font-medium text-slate-700 dark:text-slate-300"
                        >
                          ✓ {cap}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tools Available */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1">
                      <Wrench className="w-3 h-3 text-[#0E2A5C] dark:text-blue-400" />
                      <span>Authorized Tools</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600 dark:text-slate-400 font-mono">
                      <span className="bg-slate-100 dark:bg-[#202020] px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">Local OCR</span>
                      <span className="bg-slate-100 dark:bg-[#202020] px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">Qdrant Vector Store</span>
                      <span className="bg-slate-100 dark:bg-[#202020] px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">Python Code Sandbox</span>
                      <span className="bg-slate-100 dark:bg-[#202020] px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">DOCX/PDF Compiler</span>
                    </div>
                  </div>

                  {/* Recent Tasks */}
                  <div className="p-2.5 rounded-lg bg-slate-50/70 dark:bg-[#1A1A1A] border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>Recent Operations</span>
                    </span>
                    <ul className="space-y-0.5 text-[11px] text-slate-600 dark:text-slate-400">
                      {recentTasks.slice(0, 2).map((t, idx) => (
                        <li key={idx} className="truncate">• {t}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer: Start Conversation Button */}
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Air-Gapped Local Ingestion
                  </span>

                  <button
                    onClick={() => handleStartConversation(agent)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0E2A5C] dark:bg-white text-white dark:text-slate-900 font-semibold text-xs hover:bg-[#0B1B3D] dark:hover:bg-slate-200 transition-all shadow-sm"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Start Conversation</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </WorkspaceLayout>
  );
};

export default AgentsPage;
