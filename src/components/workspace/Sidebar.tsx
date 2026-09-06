import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Pin, 
  Trash2, 
  ArrowLeft
} from 'lucide-react';
import { INITIAL_CHAT_SESSIONS } from '../../data/mockData';
import { ChatSession } from '../../types';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onNewChat: () => void;
  onOpenSecurityModal: () => void;
  onSelectChatSession?: (session: ChatSession) => void;
  activeSessionId?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggleCollapse,
  onNewChat,
  onOpenSecurityModal,
  onSelectChatSession,
  activeSessionId
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sessions, setSessions] = useState<ChatSession[]>(INITIAL_CHAT_SESSIONS);

  // Filter sessions by search query
  const filteredSessions = sessions.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.agentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedSessions = filteredSessions.filter((s) => s.isPinned);
  const todaySessions = filteredSessions.filter((s) => !s.isPinned && s.dateGroup === 'Today');
  const yesterdaySessions = filteredSessions.filter((s) => !s.isPinned && s.dateGroup === 'Yesterday');
  const olderSessions = filteredSessions.filter((s) => !s.isPinned && s.dateGroup === 'Previous 7 Days');

  const handleTogglePin = (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    setSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, isPinned: !s.isPinned } : s))
    );
  };

  const handleDeleteSession = (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
  };

  const navItems = [
    { name: 'Agents', path: '/agents', label: '// 01 Agents' },
    { name: 'Documents', path: '/documents', label: '// 02 Docs' },
    { name: 'Knowledge', path: '/knowledge', label: '// 03 Brain' },
    { name: 'Security', path: '/security', label: '// 04 Security' }
  ];

  const renderSessionItem = (session: ChatSession) => {
    const isActive = activeSessionId === session.id;
    return (
      <div
        key={session.id}
        onClick={() => onSelectChatSession && onSelectChatSession(session)}
        className={`group relative flex items-center justify-between px-2.5 py-1.5 rounded cursor-pointer transition-colors text-xs font-mono ${
          isActive
            ? 'bg-[#1E1E1E] dark:bg-[#1E1E1E] light:bg-[#F0F0F0] text-white dark:text-white light:text-black font-medium border border-[#333333] dark:border-[#333333] light:border-[#D4D4D4]'
            : 'text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#525252] hover:bg-[#141414] dark:hover:bg-[#141414] light:hover:bg-[#F9F9F9] hover:text-white dark:hover:text-white light:hover:text-black'
        }`}
      >
        <div className="truncate flex-1 mr-2">
          <span className="truncate block">{session.title}</span>
          <span className="text-[10px] text-[#737373] block truncate">
            {session.agentName.split(' ')[0]} · {session.timestamp}
          </span>
        </div>

        {/* Action icons on hover */}
        <div className="hidden group-hover:flex items-center gap-1 flex-shrink-0">
          <button
            onClick={(e) => handleTogglePin(e, session.id)}
            className="p-1 rounded text-[#737373] hover:text-white dark:hover:text-white light:hover:text-black"
            title={session.isPinned ? 'Unpin' : 'Pin'}
          >
            <Pin className="w-2.5 h-2.5" />
          </button>
          <button
            onClick={(e) => handleDeleteSession(e, session.id)}
            className="p-1 rounded text-[#737373] hover:text-red-400"
            title="Delete session"
          >
            <Trash2 className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 z-40 flex flex-col bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#FFFFFF] border-r border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] transition-all duration-300 font-mono ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="p-3.5 border-b border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] flex items-center justify-between">
        {!collapsed ? (
          <Link to="/" className="flex items-baseline gap-2">
            <span className="font-bold text-white dark:text-white light:text-black text-sm tracking-tight">SOVEREIGN</span>
            <span className="text-[10px] text-[#F97316]">// OS</span>
          </Link>
        ) : (
          <Link to="/" className="mx-auto font-bold text-white text-xs">SV</Link>
        )}
      </div>

      {/* New Chat Button */}
      <div className="p-3">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] bg-[#141414] dark:bg-[#141414] light:bg-[#FAFAFA] hover:border-[#525252] text-white dark:text-white light:text-black text-xs font-mono transition-colors"
        >
          <Plus className="w-3.5 h-3.5 text-[#F97316]" />
          {!collapsed && <span>New Session</span>}
        </button>
      </div>

      {/* Search Bar */}
      {!collapsed && (
        <div className="px-3 mb-2">
          <div className="relative">
            <Search className="w-3 h-3 text-[#737373] absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sessions..."
              className="w-full bg-[#141414] dark:bg-[#141414] light:bg-[#F9F9F9] border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] rounded pl-7 pr-3 py-1 text-xs text-white dark:text-white light:text-black placeholder-[#737373] focus:outline-none focus:border-[#525252]"
            />
          </div>
        </div>
      )}

      {/* Chat History List */}
      <div className="flex-1 overflow-y-auto px-3 space-y-4 text-xs">
        {!collapsed ? (
          <>
            {pinnedSessions.length > 0 && (
              <div>
                <span className="text-[10px] text-[#737373] uppercase tracking-wider block mb-1">
                  // Pinned
                </span>
                <div className="space-y-1">
                  {pinnedSessions.map(renderSessionItem)}
                </div>
              </div>
            )}

            {todaySessions.length > 0 && (
              <div>
                <span className="text-[10px] text-[#737373] uppercase tracking-wider block mb-1">
                  // Today
                </span>
                <div className="space-y-1">
                  {todaySessions.map(renderSessionItem)}
                </div>
              </div>
            )}

            {yesterdaySessions.length > 0 && (
              <div>
                <span className="text-[10px] text-[#737373] uppercase tracking-wider block mb-1">
                  // Yesterday
                </span>
                <div className="space-y-1">
                  {yesterdaySessions.map(renderSessionItem)}
                </div>
              </div>
            )}

            {olderSessions.length > 0 && (
              <div>
                <span className="text-[10px] text-[#737373] uppercase tracking-wider block mb-1">
                  // Previous 7 Days
                </span>
                <div className="space-y-1">
                  {olderSessions.map(renderSessionItem)}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-[#737373] text-[10px] pt-4">
            ...
          </div>
        )}
      </div>

      {/* Bottom Nav Links */}
      <div className="p-3 border-t border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] space-y-1">
        {!collapsed ? (
          navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-2.5 py-1 rounded text-xs transition-colors ${
                location.pathname === item.path
                  ? 'text-white dark:text-white light:text-black font-semibold bg-[#1E1E1E] dark:bg-[#1E1E1E] light:bg-[#F0F0F0]'
                  : 'text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#525252] hover:text-white dark:hover:text-white light:hover:text-black hover:bg-[#141414] dark:hover:bg-[#141414] light:hover:bg-[#F9F9F9]'
              }`}
            >
              {item.label}
            </Link>
          ))
        ) : null}

        <Link
          to="/"
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-[#737373] hover:text-white dark:hover:text-white light:hover:text-black transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          {!collapsed && <span>Landing Page</span>}
        </Link>
      </div>
    </aside>
  );
};
