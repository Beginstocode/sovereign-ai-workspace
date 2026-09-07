import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Loader2, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Cpu, 
  Database, 
  FileSearch,
  Bot
} from 'lucide-react';
import { ExecutionStep } from '../../types';

interface AgentExecutionPanelProps {
  steps: ExecutionStep[];
  isComplete: boolean;
  agentName?: string;
  modelName?: string;
  knowledgeName?: string;
  toolName?: string;
  deliverableFilename?: string;
}

export const AgentExecutionPanel: React.FC<AgentExecutionPanelProps> = ({
  steps,
  isComplete,
  agentName = 'Engineering Assistant',
  modelName = 'DeepSeek R1 / Llama 3.3 70B',
  knowledgeName = 'Turbine Maintenance SOP (v4.2)',
  toolName = 'OCR + PDF Parser',
  deliverableFilename = 'Approval_Note.docx'
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  // If steps passed from scenario exist, map them or provide the standard government checklist
  const displaySteps = steps && steps.length > 0 ? steps : [
    { id: '1', title: 'Understanding task', status: 'completed' as const, detail: 'Intent parsed & classified' },
    { id: '2', title: `Selecting ${agentName}`, status: 'completed' as const, detail: 'Domain persona bound' },
    { id: '3', title: `Selecting local model (${modelName})`, status: 'completed' as const, detail: 'Physical weights verified' },
    { id: '4', title: `Searching authorized knowledge (${knowledgeName})`, status: 'completed' as const, detail: 'Qdrant vector query' },
    { id: '5', title: 'Analysing document', status: isComplete ? ('completed' as const) : ('running' as const), detail: 'Parsing telemetry & specs' },
    { id: '6', title: 'Preparing result & signed citations', status: isComplete ? ('completed' as const) : ('pending' as const), detail: deliverableFilename },
  ];

  const getStepIcon = (status: string) => {
    if (status === 'completed') {
      return <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />;
    }
    if (status === 'running') {
      return <Loader2 className="w-4 h-4 text-[#0E2A5C] dark:text-orange-400 animate-spin flex-shrink-0" />;
    }
    return <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-300 dark:border-slate-700 flex-shrink-0" />;
  };

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#121212] overflow-hidden my-3 max-w-2xl shadow-sm text-xs font-sans">
      {/* Expandable Header Bar */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-2.5 flex items-center justify-between bg-white dark:bg-[#171717] border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50/80 transition-colors text-left"
      >
        <div className="flex items-center gap-2.5">
          {isComplete ? (
            <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
            </div>
          ) : (
            <Loader2 className="w-4 h-4 text-[#0E2A5C] dark:text-orange-400 animate-spin" />
          )}

          <div>
            <span className="font-bold text-slate-900 dark:text-white">
              {isComplete ? 'Task completed by Sovereign' : 'Preparing your request...'}
            </span>
            <span className="text-slate-500 dark:text-slate-400 text-[11px] ml-2 hidden sm:inline">
              (6 verification stages executed locally)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
            AIR-GAPPED
          </span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </div>
      </button>

      {/* Expandable Checklist Steps */}
      {isExpanded && (
        <div className="p-3.5 space-y-2 bg-slate-50/50 dark:bg-[#121212]">
          {displaySteps.map((step, idx) => (
            <div
              key={step.id || idx}
              className="flex items-center justify-between py-1 px-2 rounded hover:bg-white dark:hover:bg-[#1A1A1A] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                {getStepIcon(step.status)}
                <span className={`text-xs ${
                  step.status === 'completed'
                    ? 'text-slate-800 dark:text-slate-200 font-medium'
                    : step.status === 'running'
                      ? 'text-[#0E2A5C] dark:text-orange-400 font-bold'
                      : 'text-slate-400 dark:text-slate-600'
                }`}>
                  {step.title}
                </span>
              </div>

              {step.detail && (
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono hidden sm:inline">
                  {step.detail}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
