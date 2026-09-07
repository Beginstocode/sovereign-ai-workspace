import React, { useRef, useEffect } from 'react';
import { Bot, User, FileText, Copy, ThumbsUp, ThumbsDown, RotateCcw, Zap } from 'lucide-react';
import { ChatMessage, Agent } from '../../types';
import { AgentExecutionPanel } from './AgentExecutionPanel';
import { DeliverablePreview } from './DeliverablePreview';
import { ChatInput } from './ChatInput';
import { AgentBar } from './AgentBar';

interface ChatAreaProps {
  messages: ChatMessage[];
  isExecuting: boolean;
  activeAgent: Agent;
  onSelectAgent: (agent: Agent) => void;
  onSendMessage: (text: string, files: any[]) => void;
  onSelectPrompt: (promptText: string, scenarioId: string) => void;
  onOpenAgentModal: () => void;
  onOpenToolsModal: () => void;
  attachedFiles: any[];
  onAddFile: (file: any) => void;
  onRemoveFile: (index: number) => void;
  onRegenerateLast?: () => void;
}

const suggestions = [
  { label: 'Analyse an inspection report', id: 'inspection-approval' },
  { label: 'Compare vendor quotations', id: 'vendor-comparison' },
  { label: 'Summarise a policy document', id: 'policy-summary' },
  { label: 'Draft an approval note', id: 'approval-note' },
  { label: 'Analyse Excel / CSV data', id: 'telemetry-excel' },
  { label: 'Review or debug code', id: 'code-debug' },
];

export const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  isExecuting,
  activeAgent,
  onSelectAgent,
  onSendMessage,
  onSelectPrompt,
  onOpenAgentModal,
  onOpenToolsModal,
  attachedFiles,
  onAddFile,
  onRemoveFile,
  onRegenerateLast,
}) => {
  const scrollEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isExecuting]);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#0D0D0D] font-sans">

      {/* Messages scroll area */}
      <div className="flex-1 overflow-y-auto scrollbar-none">
        {messages.length === 0 ? (

          /* ── Empty State ── */
          <div className="h-full flex flex-col items-center justify-center px-6 pb-8">

            {/* Icon mark */}
            <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] border border-white/10 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-[#EE7027]" />
            </div>

            <h2 className="text-2xl font-semibold text-white mb-1.5 text-center">
              What do you need done?
            </h2>
            <p className="text-sm text-white/40 mb-10 text-center max-w-xs leading-relaxed">
              Your private AI — runs entirely on your local network.
            </p>

            {/* Input */}
            <div className="w-full max-w-2xl mb-6">
              <ChatInput
                onSendMessage={onSendMessage}
                disabled={isExecuting}
                activeAgent={activeAgent}
                onOpenAgentModal={onOpenAgentModal}
                onOpenToolsModal={onOpenToolsModal}
                attachedFiles={attachedFiles}
                onAddFile={onAddFile}
                onRemoveFile={onRemoveFile}
              />
              <div className="mt-2">
                <AgentBar
                  activeAgent={activeAgent}
                  onSelectAgent={onSelectAgent}
                  onOpenAgentModal={onOpenAgentModal}
                />
              </div>
            </div>

            {/* Suggestion chips */}
            <div className="w-full max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => onSelectPrompt(s.label, s.id)}
                    className="text-left px-4 py-3 rounded-xl border border-white/10 bg-[#1A1A1A] hover:bg-[#222] hover:border-white/20 text-sm text-white/70 hover:text-white transition-all"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

        ) : (

          /* ── Conversation Thread ── */
          <div className="py-8 space-y-2">
            {messages.map((msg) => (
              <div key={msg.id}>
                {msg.role === 'user' ? (

                  /* User message — right aligned bubble */
                  <div className="flex justify-end px-4 sm:px-10">
                    <div className="max-w-[70%] bg-[#1E1E1E] border border-white/10 rounded-2xl rounded-tr-sm px-4 py-3 text-sm text-white/90 leading-relaxed shadow-sm">
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-white/10 flex flex-wrap gap-2">
                          {msg.attachments.map((file, i) => (
                            <div key={i} className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 text-xs text-white/60">
                              <FileText className="w-3 h-3 text-[#EE7027]" />
                              <span>{file.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                ) : (

                  /* Assistant message — full width left */
                  <div className="px-4 sm:px-10">
                    <div className="max-w-3xl">
                      {/* Agent label */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-lg bg-[#EE7027]/10 border border-[#EE7027]/30 flex items-center justify-center">
                          <Bot className="w-3.5 h-3.5 text-[#EE7027]" />
                        </div>
                        <span className="text-xs font-semibold text-white/50 tracking-wide">
                          {activeAgent.name}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="text-sm text-white/80 leading-7 whitespace-pre-wrap pl-8">
                        {msg.content}
                      </div>

                      {/* Execution steps */}
                      {msg.executionSteps && msg.executionSteps.length > 0 && (
                        <div className="pl-8 mt-3">
                          <AgentExecutionPanel
                            steps={msg.executionSteps}
                            isComplete={!isExecuting}
                            agentName={activeAgent.name}
                            modelName={activeAgent.defaultModel}
                          />
                        </div>
                      )}

                      {/* Deliverable */}
                      {msg.deliverable && (
                        <div className="pl-8 mt-3">
                          <DeliverablePreview
                            deliverable={msg.deliverable}
                            onRegenerate={onRegenerateLast}
                          />
                        </div>
                      )}

                      {/* Action row */}
                      <div className="flex items-center gap-0.5 mt-3 pl-8">
                        <button className="p-1.5 rounded-lg text-white/20 hover:text-white/60 hover:bg-white/5 transition-colors" title="Copy">
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg text-white/20 hover:text-white/60 hover:bg-white/5 transition-colors" title="Good">
                          <ThumbsUp className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg text-white/20 hover:text-white/60 hover:bg-white/5 transition-colors" title="Bad">
                          <ThumbsDown className="w-3.5 h-3.5" />
                        </button>
                        {onRegenerateLast && (
                          <button onClick={onRegenerateLast} className="p-1.5 rounded-lg text-white/20 hover:text-white/60 hover:bg-white/5 transition-colors" title="Regenerate">
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Typing dots */}
            {isExecuting && (
              <div className="px-4 sm:px-10">
                <div className="max-w-3xl pl-8 flex items-center gap-1.5 pt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce [animation-delay:120ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce [animation-delay:240ms]" />
                </div>
              </div>
            )}

            <div ref={scrollEndRef} />
          </div>
        )}
      </div>

      {/* Persistent input bar */}
      {messages.length > 0 && (
        <div className="border-t border-white/5 bg-[#0D0D0D] px-4 sm:px-10 py-4">
          <div className="max-w-3xl mx-auto">
            <ChatInput
              onSendMessage={onSendMessage}
              disabled={isExecuting}
              activeAgent={activeAgent}
              onOpenAgentModal={onOpenAgentModal}
              onOpenToolsModal={onOpenToolsModal}
              attachedFiles={attachedFiles}
              onAddFile={onAddFile}
              onRemoveFile={onRemoveFile}
            />
            <div className="mt-2">
              <AgentBar
                activeAgent={activeAgent}
                onSelectAgent={onSelectAgent}
                onOpenAgentModal={onOpenAgentModal}
                compact
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatArea;
