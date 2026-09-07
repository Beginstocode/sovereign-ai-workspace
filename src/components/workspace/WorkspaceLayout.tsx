import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { AgentSelectorModal } from './AgentSelectorModal';
import { ModelRouterDrawer } from './ModelRouterDrawer';
import { ActivityDrawer } from './ActivityDrawer';
import { SecurityModal } from './SecurityModal';
import { Agent, ChatSession } from '../../types';

interface WorkspaceLayoutProps {
  children: React.ReactNode;
  activeAgent: Agent;
  onSelectAgent: (agent: Agent) => void;
  onNewChat?: () => void;
  currentTaskTitle?: string;
  onSelectChatSession?: (session: ChatSession) => void;
  activeSessionId?: string;
}

export const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({
  children,
  activeAgent,
  onSelectAgent,
  onNewChat = () => {},
  currentTaskTitle,
  onSelectChatSession,
  activeSessionId
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);
  const [isModelRouterOpen, setIsModelRouterOpen] = useState(false);
  const [isActivityDrawerOpen, setIsActivityDrawerOpen] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0D0D0D] text-white overflow-hidden font-sans">
      {/* Left Sidebar - MyGov Themed */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onNewChat={onNewChat}
        onOpenSecurityModal={() => setIsSecurityModalOpen(true)}
        onSelectChatSession={onSelectChatSession}
        activeSessionId={activeSessionId}
        onSelectAgent={onSelectAgent}
        activeAgent={activeAgent}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col h-full overflow-hidden transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        {/* Top bar with Indian Tricolor Accent & MyGov Controls */}
        <TopBar
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          activeAgent={activeAgent}
          onOpenAgentModal={() => setIsAgentModalOpen(true)}
          onToggleModelRouter={() => setIsModelRouterOpen(!isModelRouterOpen)}
          isModelRouterOpen={isModelRouterOpen}
          onToggleActivityDrawer={() => setIsActivityDrawerOpen(!isActivityDrawerOpen)}
          isActivityDrawerOpen={isActivityDrawerOpen}
          onOpenSecurityModal={() => setIsSecurityModalOpen(true)}
          onOpenCommandPalette={() => setIsAgentModalOpen(true)}
        />

        {/* Dynamic Page or Chat Content */}
        <main className="flex-1 overflow-hidden relative flex flex-col bg-[#0D0D0D]">
          {children}
        </main>
      </div>

      {/* Modals and Slide-Out Drawers */}
      <AgentSelectorModal
        isOpen={isAgentModalOpen}
        onClose={() => setIsAgentModalOpen(false)}
        selectedAgentId={activeAgent.id}
        onSelectAgent={onSelectAgent}
      />

      <ModelRouterDrawer
        isOpen={isModelRouterOpen}
        onClose={() => setIsModelRouterOpen(false)}
        activeAgent={activeAgent}
        onChangeAgent={() => {
          setIsModelRouterOpen(false);
          setIsAgentModalOpen(true);
        }}
      />

      <ActivityDrawer
        isOpen={isActivityDrawerOpen}
        onClose={() => setIsActivityDrawerOpen(false)}
      />

      <SecurityModal
        isOpen={isSecurityModalOpen}
        onClose={() => setIsSecurityModalOpen(false)}
      />
    </div>
  );
};

export default WorkspaceLayout;
