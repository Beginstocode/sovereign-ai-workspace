import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WorkspaceLayout } from '../components/workspace/WorkspaceLayout';
import { AGENTS } from '../data/agents';
import { INITIAL_PROJECTS } from '../data/mockData';
import { 
  FolderKanban, 
  ArrowRight, 
  Bot, 
  FileText, 
  CheckCircle2, 
  Plus, 
  Clock, 
  Layers 
} from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleOpenProject = (proj: any) => {
    navigate('/workspace', {
      state: {
        initialPrompt: `Open project ${proj.title} (${proj.code}) and review active operational deliverables.`,
        scenarioId: proj.id === 'proj-01' ? 'inspection-approval' : 'vendor-comparison'
      }
    });
  };

  return (
    <WorkspaceLayout
      activeAgent={AGENTS[0]}
      onSelectAgent={() => {}}
      currentTaskTitle="Enterprise Projects Workspace"
    >
      <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-[10px] font-mono text-purple-300">
                ACTIVE WORKSPACES
              </span>
              <span className="text-[10px] font-mono text-emerald-400">
                4 CONCURRENT
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Enterprise Projects
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Cross-functional enterprise initiatives grouping documents, agent workflows, and verified deliverables.
            </p>
          </div>

          <button
            onClick={() => handleOpenProject(INITIAL_PROJECTS[0])}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-semibold transition-all shadow-lg shadow-purple-900/40"
          >
            <Plus className="w-4 h-4" />
            <span>New Enterprise Project</span>
          </button>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INITIAL_PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="p-6 rounded-2xl bg-[#090e1c]/80 border border-white/[0.08] backdrop-blur-xl hover:border-white/20 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-cyan-400">
                    {proj.code}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      proj.status === 'In Progress'
                        ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/30'
                        : proj.status === 'Completed'
                        ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                        : 'bg-purple-950/60 text-purple-300 border border-purple-500/30'
                    }`}
                  >
                    {proj.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                  {proj.title}
                </h3>
                <span className="text-xs font-mono text-slate-400 block mb-4">
                  Department: {proj.department}
                </span>

                {/* Assigned Agents */}
                <div className="space-y-2 mb-4">
                  <span className="text-[10px] font-mono uppercase text-slate-500">
                    Assigned Autonomous Crew:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.assignedAgents.map((agent, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/[0.06] text-xs font-mono text-slate-300 flex items-center gap-1.5"
                      >
                        <Bot className="w-3.5 h-3.5 text-purple-400" />
                        <span>{agent}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/[0.04] flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Deliverables Generated:</span>
                  <span className="text-white font-bold">{proj.deliverables} files</span>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Active {proj.lastActive}
                </span>

                <button
                  onClick={() => handleOpenProject(proj)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono text-slate-200 border border-white/10 transition-colors"
                >
                  <span>Open Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </WorkspaceLayout>
  );
};
