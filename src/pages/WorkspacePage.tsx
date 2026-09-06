import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { WorkspaceLayout } from '../components/workspace/WorkspaceLayout';
import { ChatArea } from '../components/workspace/ChatArea';
import { ChatMessage, Agent, ExecutionStep, Deliverable, ChatSession } from '../types';
import { AGENTS, AUTO_AGENT } from '../data/agents';
import { SAMPLE_SCENARIOS, Scenario } from '../data/sampleScenarios';

export const WorkspacePage: React.FC = () => {
  const location = useLocation();
  const [activeAgent, setActiveAgent] = useState<Agent>(AGENTS[0]); // Default Inspection Agent
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<any[]>([]);
  const [currentTaskTitle, setCurrentTaskTitle] = useState<string>('Ready for enterprise instructions');
  const [activeSessionId, setActiveSessionId] = useState<string | undefined>('session-01');

  // Handle navigation from landing page with preset prompts or scenario
  useEffect(() => {
    if (location.state?.selectedAgentId) {
      const found = AGENTS.find((a) => a.id === location.state.selectedAgentId);
      if (found) setActiveAgent(found);
    }

    if (location.state?.scenarioId || location.state?.initialPrompt) {
      const scenario =
        SAMPLE_SCENARIOS.find((s) => s.id === location.state.scenarioId) || SAMPLE_SCENARIOS[0];

      const promptText = location.state.initialPrompt || scenario.prompt;
      
      // Auto-populate file if from scenario
      const initialFile = {
        name: scenario.attachmentName,
        size: scenario.attachmentSize,
        type: scenario.attachmentType
      };

      // Automatically execute the scenario demo
      triggerSimulatedTask(promptText, [initialFile], scenario);
    }
  }, [location.state]);

  const triggerSimulatedTask = (promptText: string, files: any[], targetScenario?: Scenario) => {
    const scenario = targetScenario || 
      SAMPLE_SCENARIOS.find((s) => promptText.toLowerCase().includes(s.title.toLowerCase())) ||
      SAMPLE_SCENARIOS[0];

    // Select the appropriate agent
    const matchingAgent = AGENTS.find((a) => a.id === scenario.agentId) || activeAgent;
    setActiveAgent(matchingAgent);
    setCurrentTaskTitle(promptText);

    // 1. Add User Message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachments: files.length > 0 ? files : [{
        name: scenario.attachmentName,
        size: scenario.attachmentSize,
        type: scenario.attachmentType
      }]
    };

    // 2. Initial Assistant Message with 7 Execution Steps (Storyboard Panel 11)
    const initialSteps: ExecutionStep[] = [
      { id: 'step-1', title: 'Understanding task', detail: 'Parsing instructions & metadata', status: 'running' },
      { id: 'step-2', title: 'Selecting agent', detail: scenario.agentName, status: 'pending' },
      { id: 'step-3', title: 'Selecting model', detail: scenario.model.split(' ')[0], status: 'pending' },
      { id: 'step-4', title: 'Searching knowledge', detail: scenario.knowledge.split('(')[0], status: 'pending' },
      { id: 'step-5', title: 'Using tools', detail: scenario.tools, status: 'pending' },
      { id: 'step-6', title: 'Verifying', detail: 'Running checks...', status: 'pending' },
      { id: 'step-7', title: 'Generating deliverable', detail: scenario.deliverableFile, status: 'pending' }
    ];

    const assistantMsgId = `asst-${Date.now()}`;
    const initialAssistantMsg: ChatMessage = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      agent: matchingAgent,
      model: scenario.model,
      executionSteps: initialSteps
    };

    setMessages([userMsg, initialAssistantMsg]);
    setIsExecuting(true);
    setAttachedFiles([]);

    // Progressive step simulation
    const stepDelays = [400, 800, 1200, 1700, 2200, 2700, 3200];

    stepDelays.forEach((delay, index) => {
      setTimeout(() => {
        setMessages((prev) => {
          return prev.map((m) => {
            if (m.id !== assistantMsgId) return m;

            const updatedSteps = [...(m.executionSteps || [])];
            if (index > 0) {
              updatedSteps[index - 1] = {
                ...updatedSteps[index - 1],
                status: 'completed',
                detail: index === 1 ? '✓' : updatedSteps[index - 1].detail
              };
            }
            if (index < updatedSteps.length) {
              updatedSteps[index] = {
                ...updatedSteps[index],
                status: index === updatedSteps.length - 1 ? 'completed' : 'running'
              };
            }

            if (index === updatedSteps.length - 1) {
              return {
                ...m,
                executionSteps: updatedSteps.map((s) => ({ ...s, status: 'completed' })),
                deliverable: scenario.deliverable,
                content: `### Completed\n\nGenerated verified deliverable **${scenario.deliverableFile}** in compliance with organizational guidelines. All data processed on local hardware with zero external API calls.`
              };
            }

            return {
              ...m,
              executionSteps: updatedSteps
            };
          });
        });

        if (index === stepDelays.length - 1) {
          setIsExecuting(false);
        }
      }, delay);
    });
  };

  const handleSendMessage = (text: string, files: any[]) => {
    const promptText = text || (files.length > 0 ? `Please analyse attached file ${files[0].name} and generate production report.` : 'Execute enterprise inspection analysis.');
    
    const scenario = SAMPLE_SCENARIOS.find((s) => 
      text.toLowerCase().includes(s.title.toLowerCase()) || 
      (files.length > 0 && files[0].name.toLowerCase().includes(s.attachmentName.toLowerCase()))
    ) || SAMPLE_SCENARIOS[0];

    triggerSimulatedTask(promptText, files, scenario);
  };

  const handleSelectPrompt = (_promptLabel: string, scenarioId: string) => {
    const scenario = SAMPLE_SCENARIOS.find((s) => s.id === scenarioId) || SAMPLE_SCENARIOS[0];
    const mockFile = {
      name: scenario.attachmentName,
      size: scenario.attachmentSize,
      type: scenario.attachmentType
    };
    triggerSimulatedTask(scenario.prompt, [mockFile], scenario);
  };

  const handleNewChat = () => {
    setMessages([]);
    setAttachedFiles([]);
    setIsExecuting(false);
    setCurrentTaskTitle('Ready for enterprise instructions');
    setActiveSessionId(undefined);
  };

  const handleSelectChatSession = (session: ChatSession) => {
    setActiveSessionId(session.id);
    const matchingAgent = AGENTS.find((a) => a.id === session.agentId) || AGENTS[0];
    setActiveAgent(matchingAgent);

    if (session.scenarioId) {
      const scenario = SAMPLE_SCENARIOS.find((s) => s.id === session.scenarioId);
      if (scenario) {
        triggerSimulatedTask(scenario.prompt, [], scenario);
        return;
      }
    }

    // Default load session message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: session.title,
      timestamp: session.timestamp,
    };
    const asstMsg: ChatMessage = {
      id: `asst-${Date.now()}`,
      role: 'assistant',
      content: `### Session Loaded: ${session.title}\n\n${session.preview}\n\nLocal sovereign enclave session re-established with ${matchingAgent.name}.`,
      timestamp: session.timestamp,
      agent: matchingAgent,
      model: matchingAgent.defaultModel
    };
    setMessages([userMsg, asstMsg]);
    setCurrentTaskTitle(session.title);
  };

  const handleAddFile = (file: any) => {
    setAttachedFiles((prev) => [...prev, file]);
  };

  const handleRemoveFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <WorkspaceLayout
      activeAgent={activeAgent}
      onSelectAgent={(agent) => setActiveAgent(agent)}
      onNewChat={handleNewChat}
      currentTaskTitle={currentTaskTitle}
      onSelectChatSession={handleSelectChatSession}
      activeSessionId={activeSessionId}
    >
      <ChatArea
        messages={messages}
        isExecuting={isExecuting}
        activeAgent={activeAgent}
        onSelectAgent={(agent) => setActiveAgent(agent)}
        onSendMessage={handleSendMessage}
        onSelectPrompt={handleSelectPrompt}
        onOpenAgentModal={() => {}}
        onOpenToolsModal={() => {}}
        attachedFiles={attachedFiles}
        onAddFile={handleAddFile}
        onRemoveFile={handleRemoveFile}
        onRegenerateLast={() => {
          if (messages.length > 0) {
            const lastUserMsg = messages.find((m) => m.role === 'user');
            if (lastUserMsg) {
              triggerSimulatedTask(lastUserMsg.content, lastUserMsg.attachments || []);
            }
          }
        }}
      />
    </WorkspaceLayout>
  );
};
