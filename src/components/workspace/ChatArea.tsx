import React, { useRef, useEffect } from 'react';
import { 
  Bot, 
  User, 
  FileText, 
  Terminal
} from 'lucide-react';
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
  onRegenerateLast
}) => {
  const scrollEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isExecuting]);

  const examplePrompts = [
    { label: 'Analyse an inspection report', id: 'inspection-approval', tag: '01 Inspection' },
    { label: 'Compare vendor quotations & TCO', id: 'vendor-comparison', tag: '05 Finance' },
    { label: 'Audit code for socket leaks', id: 'code-debug', tag: '02 Software' },
    { label: 'Process sensor telemetry into Excel', id: 'telemetry-excel', tag: '03 Analytics' }
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#FFFFFF] relative transition-colors font-sans">
      {/* Messages Scroll View */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-6 relative z-10">
        {messages.length === 0 ? (
          /* Empty State - simple, human, high contrast */
          <div className="max-w-2xl mx-auto h-full flex flex-col justify-center items-center text-center py-10">
            {/* Center Header */}
            <div className="flex items-center gap-2 text-xs font-mono text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373] mb-3">
              <Terminal className="w-3.5 h-3.5 text-[#F97316]" />
              <span>// SOVEREIGN ON-PREMISE WORKFORCE</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white dark:text-white light:text-[#171717] mb-2 tracking-tight">
              What can I help you get done?
            </h2>
            <p className="text-sm text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#525252] max-w-md mx-auto mb-8 leading-relaxed">
              Air-gapped execution on local hardware. Zero external calls, zero telemetry, cited deliverables.
            </p>

            {/* Input Box */}
            <div className="w-full mb-3 text-left">
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

              {/* AI AGENTS RIBBON: Just downward to the chat bar */}
              <AgentBar
                activeAgent={activeAgent}
                onSelectAgent={onSelectAgent}
                onOpenAgentModal={onOpenAgentModal}
              />
            </div>

            {/* Example prompt pills underneath */}
            <div className="w-full space-y-2 mt-4 text-left">
              <span className="text-[11px] font-mono text-[#737373] block">
                // Quick start:
              </span>
              <div className="flex flex-wrap gap-2">
                {examplePrompts.map((example) => (
                  <button
                    key={example.id}
                    onClick={() => onSelectPrompt(example.label, example.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] bg-[#141414] dark:bg-[#141414] light:bg-[#FAFAFA] hover:border-[#525252] text-xs font-mono text-[#D4D4D4] dark:text-[#D4D4D4] light:text-[#525252] hover:text-white dark:hover:text-white light:hover:text-black transition-colors"
                  >
                    <span className="text-[#F97316] font-semibold">{example.tag}</span>
                    <span>·</span>
                    <span>{example.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Conversation Thread */
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded border border-[#333333] dark:border-[#333333] light:border-[#E5E5E5] bg-[#171717] dark:bg-[#171717] light:bg-[#F5F5F5] flex items-center justify-center text-white dark:text-white light:text-black flex-shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5 text-[#F97316]" />
                  </div>
                )}

                <div className={`space-y-2 max-w-2xl ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  {/* User message bubble */}
                  {msg.role === 'user' ? (
                    <div className="bg-[#1C1C1C] dark:bg-[#1C1C1C] light:bg-[#F5F5F5] border border-[#2B2B2B] dark:border-[#2B2B2B] light:border-[#E5E5E5] rounded-xl px-4 py-2.5 text-sm text-white dark:text-white light:text-[#171717] space-y-2">
                      <p>{msg.content}</p>
                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className="pt-2 border-t border-[#333333] dark:border-[#333333] light:border-[#E5E5E5] flex flex-wrap gap-2">
                          {msg.attachments.map((file, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#121212] dark:bg-[#121212] light:bg-white border border-[#2B2B2B] dark:border-[#2B2B2B] light:border-[#E5E5E5] text-xs font-mono text-[#D4D4D4] dark:text-[#D4D4D4] light:text-[#525252]"
                            >
                              <FileText className="w-3 h-3 text-[#F97316]" />
                              <span>{file.name}</span>
                              <span className="text-[#737373] text-[10px]">({file.size})</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Assistant Message */
                    <div className="space-y-4">
                      {/* Text response */}
                      <div className="text-sm text-[#D4D4D4] dark:text-[#D4D4D4] light:text-[#262626] leading-relaxed prose dark:prose-invert max-w-none">
                        <div className="whitespace-pre-wrap">{msg.content}</div>
                      </div>

                      {/* Execution Panel if attached */}
                      {msg.executionSteps && msg.executionSteps.length > 0 && (
                        <AgentExecutionPanel
                          steps={msg.executionSteps}
                          isComplete={!isExecuting}
                          agentName={activeAgent.name}
                          modelName={activeAgent.defaultModel}
                        />
                      )}

                      {/* Deliverable preview if produced */}
                      {msg.deliverable && (
                        <DeliverablePreview
                          deliverable={msg.deliverable}
                          onRegenerate={onRegenerateLast}
                        />
                      )}
                    </div>
                  )}
                </div>

                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded border border-[#333333] dark:border-[#333333] light:border-[#E5E5E5] bg-[#171717] dark:bg-[#171717] light:bg-[#F5F5F5] flex items-center justify-center text-[#A3A3A3] flex-shrink-0 mt-1">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
            <div ref={scrollEndRef} />
          </div>
        )}
      </div>

      {/* Persistent Bottom Chat Bar (when in active conversation) */}
      {messages.length > 0 && (
        <div className="p-4 border-t border-[#1F1F1F] dark:border-[#1F1F1F] light:border-[#E5E5E5] bg-[#0A0A0A]/95 dark:bg-[#0A0A0A]/95 light:bg-[#FFFFFF]/95 backdrop-blur-md">
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
            <AgentBar
              activeAgent={activeAgent}
              onSelectAgent={onSelectAgent}
              onOpenAgentModal={onOpenAgentModal}
              compact
            />
          </div>
        </div>
      )}
    </div>
  );
};
