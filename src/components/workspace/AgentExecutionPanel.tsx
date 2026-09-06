import React from 'react';
import { 
  CheckCircle2, 
  Loader2, 
  Terminal
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
  agentName = 'Inspection Agent',
  modelName = 'Qwen Vision 72B',
  knowledgeName = 'Maintenance SOP (v4.2)',
  toolName = 'OCR + Document Reader',
  deliverableFilename = 'Approval_Note.docx'
}) => {
  const getStepIcon = (id: string, status: string) => {
    if (status === 'completed') {
      return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-400 light:text-emerald-600" />;
    }
    if (status === 'running') {
      return <Loader2 className="w-3.5 h-3.5 text-[#F97316] animate-spin" />;
    }
    return <div className="w-1.5 h-1.5 rounded-full bg-[#525252]" />;
  };

  return (
    <div className="rounded-xl border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] bg-[#141414] dark:bg-[#141414] light:bg-[#FAFAFA] p-4 text-xs font-mono space-y-3 my-3 max-w-2xl shadow-sm">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-2.5 border-b border-[#262626] dark:border-[#262626] light:border-[#E5E5E5]">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-[#F97316]" />
          <span className="font-bold text-white dark:text-white light:text-[#171717] uppercase tracking-wider">
            {isComplete ? '// Execution Completed' : '// Sovereign Orchestrating'}
          </span>
        </div>
        <span className="text-[10px] text-emerald-400 dark:text-emerald-400 light:text-emerald-700 bg-emerald-950/60 dark:bg-emerald-950/60 light:bg-emerald-50 px-2 py-0.5 rounded border border-emerald-800/40 dark:border-emerald-800/40 light:border-emerald-200">
          LOCAL ENCLAVE
        </span>
      </div>

      {/* 7-Stage Execution Steps */}
      <div className="space-y-1.5 pt-1">
        {steps.map((step, idx) => (
          <div
            key={step.id}
            className="flex items-center justify-between py-1 px-2 rounded hover:bg-[#1C1C1C] dark:hover:bg-[#1C1C1C] light:hover:bg-[#F0F0F0] transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] text-[#737373]">0{idx + 1}</span>
              {getStepIcon(step.id, step.status)}
              <span className={`text-xs ${
                step.status === 'completed' 
                  ? 'text-white dark:text-white light:text-[#171717] font-medium' 
                  : step.status === 'running' 
                    ? 'text-[#F97316] font-semibold' 
                    : 'text-[#737373]'
              }`}>
                {step.title}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[10px]">
              {step.detail && (
                <span className="text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373] hidden sm:inline">
                  {step.detail}
                </span>
              )}
              {step.timestamp && (
                <span className="text-[#737373]">{step.timestamp}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
