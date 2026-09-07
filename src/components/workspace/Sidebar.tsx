import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  MessageSquare,
  FolderKanban,
  FileText,
  Database,
  ShieldCheck,
  Activity,
  Settings,
  Bot,
  LogOut,
} from 'lucide-react';
import { INITIAL_CHAT_SESSIONS } from '../../data/mockData';
import { ChatSession, Agent } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onNewChat: () => void;
  onOpenSecurityModal: () => void;
  onSelectChatSession?: (session: ChatSession) => void;
  activeSessionId?: string;
  onSelectAgent?: (agent: Agent) => void;
  activeAgent?: Agent;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggleCollapse,
  onNewChat,
  onOpenSecurityModal,
  onSelectChatSession,
  activeSessionId,
  onSelectAgent,
  activeAgent,
}) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [sessions] = useState<ChatSession[]>(INITIAL_CHAT_SESSIONS);

  const filtered = sessions.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.agentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const today = filtered.slice(0, 3);
  const yesterday = filtered.slice(3, 6);
  const older = filtered.slice(6);

  const navLinks = [
    { name: 'Projects', path: '/projects', icon: FolderKanban, color: 'text-[#428DCC]' },
    { name: 'Documents', path: '/documents', icon: FileText, color: 'text-[#EE7027]' },
    { name: 'Knowledge', path: '/knowledge', icon: Database, color: 'text-[#1DB999]' },
    { name: 'AI Agents', path: '/agents', icon: Bot, color: 'text-[#C2579C]' },
    { name: 'Activity Log', path: '/activity', icon: Activity, color: 'text-blue-400' },
    { name: 'Security', path: '/security', icon: ShieldCheck, color: 'text-emerald-500' },
    { name: 'Admin Console', path: '/admin', icon: Settings, color: 'text-slate-400' },
  ];

  const SessionItem = ({ session }: { session: ChatSession }) => {
    const isActive = session.id === activeSessionId;
    return (
      <button
        onClick={() => onSelectChatSession && onSelectChatSession(session)}
        className={`w-full group flex items-center gap-2 px-2.5 py-2 rounded-lg text-left transition-colors text-xs ${
          isActive
            ? 'bg-white/10 text-white font-semibold'
            : 'text-white/40 hover:bg-white/5 hover:text-white/70'
        }`}
      >
        <MessageSquare className="w-3.5 h-3.5 flex-shrink-0 text-white/20 group-hover:text-white/40 transition-colors" />
        <span className="flex-1 truncate">{session.title}</span>
      </button>
    );
  };

  if (collapsed) {
    return (
      <aside className="fixed left-0 top-0 bottom-0 z-40 w-16 flex flex-col bg-[#111111] border-r border-white/5">
        {/* Logo */}
        <div className="p-3 border-b border-white/5 flex justify-center">
          <Link to="/" className="w-9 h-9 rounded-lg bg-[#1A1A1A] border border-white/10 flex items-center justify-center text-base">
            🏛️
          </Link>
        </div>
        {/* New Chat */}
        <div className="p-3 border-b border-white/5 flex justify-center">
          <button
            onClick={onNewChat}
            className="w-9 h-9 rounded-lg bg-[#EE7027]/10 border border-[#EE7027]/20 flex items-center justify-center hover:bg-[#EE7027]/20 transition-colors"
            title="New Chat"
          >
            <Plus className="w-4 h-4 text-[#EE7027]" />
          </button>
        </div>
        {/* Nav Icons */}
        <div className="flex-1 px-2 py-2 space-y-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                title={item.name}
                className={`flex items-center justify-center w-10 h-9 mx-auto rounded-lg transition-colors ${
                  isActive ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${item.color}`} />
              </Link>
            );
          })}
        </div>
        {/* User dot */}
        <div className="p-3 border-t border-white/5 flex justify-center">
          <div className="w-7 h-7 rounded-full bg-[#133863] text-white flex items-center justify-center text-[10px] font-bold">
            {user?.avatarInitials || 'U'}
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="fixed left-0 top-0 bottom-0 z-40 w-64 flex flex-col bg-[#111111] border-r border-white/5 font-sans">

      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-white/5 flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] border border-white/10 flex items-center justify-center text-sm">
            🏛️
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Sovereign AI</div>
            <div className="text-[10px] text-white/30 font-medium">Workspace</div>
          </div>
        </Link>
      </div>

      {/* New Chat */}
      <div className="px-3 pt-3 pb-2">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-[#1A1A1A] border border-white/10 text-white/70 hover:text-white hover:border-white/20 hover:bg-[#222] font-medium text-xs transition-all"
        >
          <Plus className="w-4 h-4 text-[#EE7027]" />
          <span>New Chat</span>
        </button>
      </div>

      {/* Search */}
      <div className="px-3 pb-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 rounded-lg bg-[#1A1A1A] border border-white/5 text-xs text-white/60 placeholder-white/20 focus:outline-none focus:border-white/20 transition-all"
          />
        </div>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-2 scrollbar-none">

        {today.length > 0 && (
          <div className="mb-3">
            <div className="px-2.5 py-1 text-[10px] font-semibold text-white/20 uppercase tracking-wider">Today</div>
            <div className="space-y-0.5">
              {today.map((s) => <SessionItem key={s.id} session={s} />)}
            </div>
          </div>
        )}

        {yesterday.length > 0 && (
          <div className="mb-3">
            <div className="px-2.5 py-1 text-[10px] font-semibold text-white/20 uppercase tracking-wider">Yesterday</div>
            <div className="space-y-0.5">
              {yesterday.map((s) => <SessionItem key={s.id} session={s} />)}
            </div>
          </div>
        )}

        {older.length > 0 && (
          <div className="mb-3">
            <div className="px-2.5 py-1 text-[10px] font-semibold text-white/20 uppercase tracking-wider">Previous 7 Days</div>
            <div className="space-y-0.5">
              {older.map((s) => <SessionItem key={s.id} session={s} />)}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="px-2.5 py-8 text-center text-xs text-white/20">No conversations yet</div>
        )}

        {/* Nav Links */}
        <div className="pt-2 pb-1 border-t border-white/5 mt-2">
          <div className="px-2.5 py-1 text-[10px] font-semibold text-white/20 uppercase tracking-wider">Menu</div>
          <div className="space-y-0.5 mt-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/40 hover:bg-white/5 hover:text-white/70'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#133863] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
            {user?.avatarInitials || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-white/70 truncate">{user?.name || 'Officer'}</div>
            <div className="text-[10px] text-white/30 truncate">{user?.department || 'My Department'}</div>
          </div>
          <button onClick={logout} title="Logout" className="text-white/20 hover:text-red-400 transition-colors">
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
