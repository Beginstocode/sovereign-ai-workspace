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
      <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 max-w-6xl mx-auto w-full font-sans text-xs">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-semibold text-[#133863] dark:text-blue-400">ORGANIZATIONAL INITIATIVES</span>
              <span>•</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-medium">4 CONCURRENT PSU PROJECTS</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Enterprise Projects & Workspaces
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Cross-functional initiatives grouping engineering drawings, tender documents, specialist agent workflows, and verified deliverables.
            </p>
          </div>

          <button
            onClick={() => handleOpenProject(INITIAL_PROJECTS[0])}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#133863] hover:bg-[#0B2545] text-white text-xs font-bold transition-all shadow-sm"
          >
            <Plus className="w-4 h-4 text-[#EE7027]" />
            <span>+ New PSU Project</span>
          </button>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {INITIAL_PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#12223D] shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-[#133863] dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                    {proj.code}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      proj.status === 'In Progress'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {proj.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    Department: <strong className="text-slate-800 dark:text-slate-200">{proj.department}</strong>
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5 text-[#EE7027]" />
                    <span className="font-medium text-slate-700 dark:text-slate-300">{proj.assignedAgents.join(', ')}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[11px]">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{proj.lastActive}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">
                  {proj.deliverables} Verified Deliverables
                </span>

                <button
                  onClick={() => handleOpenProject(proj)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#133863] dark:text-blue-400 hover:text-[#EE7027] transition-colors"
                >
                  <span>Open Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </WorkspaceLayout>
  );
};

export default ProjectsPage;
