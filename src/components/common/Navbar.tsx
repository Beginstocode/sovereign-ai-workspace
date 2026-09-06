import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Menu, 
  X, 
  Sun,
  Moon,
  Fingerprint
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Workforce', href: '#workforce' },
    { name: 'Security', href: '#security' },
    { name: 'Pipeline', href: '#how-it-works' },
    { name: 'Multimodal', href: '#multimodal' },
    { name: 'Evidence', href: '#real-work' },
    { name: 'Knowledge', href: '#brain' }
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        scrolled
          ? 'bg-[#0A0A0A]/95 dark:bg-[#0A0A0A]/95 light:bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#262626] dark:border-[#262626] light:border-[#E5E5E5]'
          : 'bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#FFFFFF] border-b border-[#1F1F1F] dark:border-[#1F1F1F] light:border-[#E5E5E5]'
      }`}
    >
      {/* Top micro-bar: Snitch style command notice */}
      <div className="border-b border-[#1F1F1F] dark:border-[#1F1F1F] light:border-[#E5E5E5] px-4 py-1.5 text-[11px] font-mono text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373] flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-[1180px] mx-auto w-full">
          <span className="text-[#F97316] font-semibold">// 08 AGENTS · STRICTLY AIR-GAPPED</span>
          <span className="hidden md:inline text-[#525252]">·</span>
          <span className="hidden md:inline text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373]">100% on-premise · zero telemetry · verified cited outputs</span>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-[10px] hidden sm:inline text-[#737373]">PRESS</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] bg-[#171717] dark:bg-[#171717] light:bg-[#F5F5F5] text-[10px] text-[#D4D4D4] dark:text-[#D4D4D4] light:text-[#525252]">⌘K</kbd>
            <span className="text-[#EDEDED] dark:text-[#EDEDED] light:text-[#171717] font-medium hidden sm:inline">PALETTE</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Brand Logo - clean editorial typographic lockup */}
        <Link to="/" className="flex items-baseline gap-2.5 group">
          <span className="text-sm font-mono font-bold tracking-tight text-white dark:text-white light:text-[#171717] uppercase">
            SOVEREIGN
          </span>
          <span className="text-[11px] font-mono text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373]">
            <span className="text-[#F97316]">//</span> enterprise ai os
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-mono text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#525252] hover:text-white dark:hover:text-white light:hover:text-[#171717] transition-colors flex items-center gap-1.5"
            >
              <span className="text-[#525252] text-[10px]">0{idx + 1}</span>
              <span>{link.name}</span>
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] bg-[#171717] dark:bg-[#171717] light:bg-[#F5F5F5] text-[#D4D4D4] dark:text-[#D4D4D4] light:text-[#525252] hover:text-white dark:hover:text-white light:hover:text-[#171717] transition-colors"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-slate-700" />
            )}
          </button>

          <button
            onClick={openAuthModal}
            className="text-xs font-mono text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#525252] hover:text-white dark:hover:text-white light:hover:text-[#171717] px-2.5 py-1.5 rounded hover:bg-[#1A1A1A] dark:hover:bg-[#1A1A1A] light:hover:bg-[#F5F5F5] transition-colors flex items-center gap-1.5"
          >
            <Fingerprint className="w-3.5 h-3.5 text-[#F97316]" />
            <span>{isAuthenticated && user ? user.name.split(' ')[0] : 'Sign In'}</span>
          </button>

          <button
            onClick={() => navigate('/workspace')}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded border border-white dark:border-white light:border-[#171717] bg-white dark:bg-white light:bg-[#171717] text-black dark:text-black light:text-white hover:bg-[#EDEDED] dark:hover:bg-[#EDEDED] light:hover:bg-[#262626] text-xs font-mono font-medium transition-colors"
          >
            <span>Launch Workspace</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-1 rounded border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] text-[#A3A3A3] light:text-[#525252]"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-700" />}
          </button>
          <button
            onClick={() => navigate('/workspace')}
            className="px-2.5 py-1 rounded bg-white dark:bg-white light:bg-[#171717] text-black dark:text-black light:text-white text-xs font-mono"
          >
            Launch →
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#525252] hover:text-white dark:hover:text-white light:hover:text-[#171717]"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-5 bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#FFFFFF] border-b border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] space-y-2">
          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-2 py-1.5 text-xs font-mono text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#525252] hover:text-white dark:hover:text-white light:hover:text-[#171717] hover:bg-[#1A1A1A] dark:hover:bg-[#1A1A1A] light:hover:bg-[#F5F5F5] rounded"
            >
              <span className="text-[#F97316] mr-2">0{idx + 1}</span>
              {link.name}
            </a>
          ))}
          <div className="pt-2 border-t border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAuthModal();
              }}
              className="flex items-center gap-2 text-xs font-mono text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#525252] px-2 py-1.5 rounded hover:bg-[#1A1A1A] dark:hover:bg-[#1A1A1A] light:hover:bg-[#F5F5F5]"
            >
              <Fingerprint className="w-3.5 h-3.5 text-[#F97316]" />
              <span>{isAuthenticated && user ? user.name : 'Sign In'}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/workspace');
              }}
              className="w-full py-2 bg-white dark:bg-white light:bg-[#171717] text-black dark:text-black light:text-white text-xs font-mono font-medium rounded text-center"
            >
              Launch Workspace →
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
