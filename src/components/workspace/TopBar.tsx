import React from 'react';
import { 
  Menu, 
  Search, 
  Sun,
  Moon,
  Fingerprint
} from 'lucide-react';
import { Agent } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

interface TopBarProps {
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  activeAgent: Agent;
  onOpenAgentModal: () => void;
  onToggleModelRouter: () => void;
  isModelRouterOpen: boolean;
  onToggleActivityDrawer: () => void;
  isActivityDrawerOpen: boolean;
  onOpenSecurityModal: () => void;
  onOpenCommandPalette: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  sidebarCollapsed,
  onToggleSidebar,
  activeAgent,
  onOpenAgentModal,
  onToggleModelRouter,
  isModelRouterOpen,
  onToggleActivityDrawer,
  isActivityDrawerOpen,
  onOpenSecurityModal,
  onOpenCommandPalette
}) => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, openAuthModal } = useAuth();

  return (
    <header className="h-14 border-b border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#FFFFFF] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 transition-colors font-mono text-xs">
      {/* Left items: sidebar toggle + active agent pill */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] bg-[#141414] dark:bg-[#141414] light:bg-[#F5F5F5] text-[#A3A3A3] hover:text-white dark:hover:text-white light:hover:text-black transition-colors"
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Menu className="w-3.5 h-3.5" />
        </button>

        {/* Active Agent Selector Trigger */}
        <button
          onClick={onOpenAgentModal}
          className="flex items-center gap-2 px-2.5 py-1 rounded border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] bg-[#141414] dark:bg-[#141414] light:bg-[#FAFAFA] hover:border-[#525252] transition-colors"
        >
          <span className="text-[#F97316] font-semibold">//</span>
          <span className="font-medium text-white dark:text-white light:text-black">{activeAgent.name}</span>
          <span className="text-[#737373] text-[10px] hidden sm:inline">({activeAgent.defaultModel.split(' ')[0]})</span>
        </button>
      </div>

      {/* Right controls: Router, Security, Theme, Sign In */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleModelRouter}
          className={`px-2.5 py-1 rounded border transition-colors hidden sm:flex items-center gap-1.5 ${
            isModelRouterOpen
              ? 'border-white dark:border-white light:border-black bg-white dark:bg-white light:bg-black text-black dark:text-black light:text-white'
              : 'border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] bg-[#141414] dark:bg-[#141414] light:bg-[#FAFAFA] text-[#A3A3A3] hover:text-white dark:hover:text-white light:hover:text-black'
          }`}
        >
          <span>GPU VRAM</span>
        </button>

        <button
          onClick={onOpenSecurityModal}
          className="px-2.5 py-1 rounded border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] bg-[#141414] dark:bg-[#141414] light:bg-[#FAFAFA] text-emerald-400 dark:text-emerald-400 light:text-emerald-700 hidden md:flex items-center gap-1.5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>AIR-GAP</span>
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] bg-[#141414] dark:bg-[#141414] light:bg-[#FAFAFA] text-[#A3A3A3] hover:text-white dark:hover:text-white light:hover:text-black transition-colors"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <Sun className="w-3.5 h-3.5 text-amber-400" />
          ) : (
            <Moon className="w-3.5 h-3.5 text-slate-700" />
          )}
        </button>

        {/* Sign In / Profile */}
        <button
          onClick={openAuthModal}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] bg-[#141414] dark:bg-[#141414] light:bg-[#FAFAFA] text-[#D4D4D4] dark:text-[#D4D4D4] light:text-[#525252] hover:text-white dark:hover:text-white light:hover:text-black transition-colors"
        >
          <Fingerprint className="w-3.5 h-3.5 text-[#F97316]" />
          <span>{isAuthenticated && user ? user.name.split(' ')[0] : 'Sign In'}</span>
        </button>
      </div>
    </header>
  );
};
