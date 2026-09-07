import React from 'react';
import { Menu, Sun, Moon, ShieldCheck, Cpu } from 'lucide-react';
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
  onOpenSecurityModal,
}) => {
  const { theme, toggleTheme } = useTheme();
  const { user, openAuthModal } = useAuth();

  return (
    <header className="h-12 border-b border-white/5 bg-[#111111] px-4 flex items-center justify-between font-sans z-30 sticky top-0">

      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/5 transition-colors"
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Menu className="w-4 h-4" />
        </button>

        <button
          onClick={onOpenAgentModal}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1A1A1A] border border-white/10 hover:border-white/20 transition-all text-xs"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#EE7027] animate-pulse" />
          <span className="text-white/40 font-medium">Agent:</span>
          <span className="font-semibold text-white/80">{activeAgent.name}</span>
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Air-gap badge */}
        <button
          onClick={onOpenSecurityModal}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold hover:bg-emerald-500/15 transition-colors"
        >
          <ShieldCheck className="w-3 h-3" />
          <span>Local</span>
        </button>

        {/* GPU */}
        <button
          onClick={onToggleModelRouter}
          className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-all ${
            isModelRouterOpen
              ? 'border-[#EE7027]/40 bg-[#EE7027]/10 text-[#EE7027]'
              : 'border-white/10 bg-[#1A1A1A] text-white/40 hover:text-white/70 hover:border-white/20'
          }`}
        >
          <Cpu className="w-3 h-3" />
          <span>GPU 28%</span>
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <Sun className="w-3.5 h-3.5 text-amber-400" />
          ) : (
            <Moon className="w-3.5 h-3.5" />
          )}
        </button>

        {/* Profile */}
        <button
          onClick={openAuthModal}
          className="flex items-center gap-2 pl-2 border-l border-white/5"
        >
          <div className="w-7 h-7 rounded-full bg-[#133863] text-white flex items-center justify-center font-bold text-[10px]">
            {user?.avatarInitials || 'U'}
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-[11px] font-semibold text-white/70 leading-tight">{user?.name || 'Officer'}</span>
            <span className="text-[9px] text-[#EE7027]">{user?.clearanceLevel?.split('//')[0].trim() || 'LEVEL 3'}</span>
          </div>
        </button>
      </div>
    </header>
  );
};

export default TopBar;
