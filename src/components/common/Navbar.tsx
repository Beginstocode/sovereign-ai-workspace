import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Lock, 
  Menu, 
  X, 
  Building2, 
  UserCheck, 
  ShieldAlert,
  ArrowRight,
  Globe,
  Search
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, openAuthModal } = useAuth();

  const navLinks = [
    { name: 'About Sovereign', href: '#about' },
    { name: 'Capabilities', href: '#why-sovereign' },
    { name: 'AI Workforce', href: '#workforce' },
    { name: 'Air-Gap Security', href: '#security' },
    { name: 'Workflow', href: '#how-it-works' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm font-sans">
      {/* 1. Indian Tricolor Accent Line */}
      <div className="h-1 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]"></div>

      {/* 2. Official Government-style Top Strip (MyGov Standard) */}
      <div className="bg-[#0B1B3D] text-slate-200 text-xs px-4 py-1.5 border-b border-blue-900/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 text-[11px] font-medium tracking-wide">
            <span className="font-semibold text-white">भारत सरकार</span>
            <span className="text-slate-500">|</span>
            <span className="font-semibold text-white">Government of India</span>
            <span className="text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-300">Digital India</span>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <span className="hidden md:inline text-slate-300">मेरी सरकार (MeriSarkar)</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            {/* Accessibility Font Sizing */}
            <div className="hidden sm:flex items-center gap-1 text-[10px] font-bold text-slate-300">
              <span className="hover:text-white cursor-pointer">A-</span>
              <span>|</span>
              <span className="text-orange-400 cursor-pointer">A</span>
              <span>|</span>
              <span className="hover:text-white cursor-pointer">A+</span>
            </div>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <button className="hover:text-white transition-colors flex items-center gap-1 font-medium">
              <Globe className="w-3 h-3 text-[#FF9933]" />
              <span>हिन्दी</span>
            </button>
            <span className="text-slate-500">|</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Air-Gapped Node #01
            </span>
          </div>
        </div>
      </div>

      {/* 3. Main Official Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Emblem & Brand Lockup */}
        <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
          {/* Official Emblem Symbol */}
          <div className="w-11 h-11 rounded-lg bg-[#133863] text-white flex flex-col items-center justify-center p-1 border border-blue-900 shadow-sm flex-shrink-0">
            <span className="text-lg">🏛️</span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-[#133863] font-serif">
                SOVEREIGN
              </span>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#EE7027]"></span>
                <span className="w-2 h-2 rounded-full bg-[#428DCC]"></span>
                <span className="w-2 h-2 rounded-full bg-[#1DB999]"></span>
              </div>
              <span className="text-xs font-bold text-[#EE7027] tracking-wider uppercase font-sans">
                AI WORKSPACE
              </span>
            </div>
            <span className="text-[11px] text-slate-600 font-medium tracking-tight -mt-0.5">
              मेरी सरकार • Secure • Private • On-Premise AI for Government & PSUs
            </span>
          </div>
        </Link>

        {/* Center Search Bar (MyGov Style) */}
        <div className="hidden xl:flex items-center relative flex-1 max-w-xs mx-4">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search circulars, SOPs, AI agents..."
            className="w-full bg-slate-50 border border-slate-200 rounded-full pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#133863]"
          />
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-semibold text-slate-700 hover:text-[#133863] transition-colors hover:underline underline-offset-4"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Actions: Employee Login & Admin Login */}
        <div className="hidden sm:flex items-center gap-2.5 flex-shrink-0">
          <Link
            to="/login/employee"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white text-[#133863] border border-[#133863] hover:bg-slate-50 text-xs font-bold transition-all shadow-sm"
          >
            <UserCheck className="w-3.5 h-3.5 text-[#133863]" />
            <span>Employee Login</span>
          </Link>

          <Link
            to="/login/admin"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#EE7027] hover:bg-[#D65F18] text-white text-xs font-bold transition-all shadow-sm"
          >
            <Lock className="w-3.5 h-3.5 text-white" />
            <span>Admin Login</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            to="/login"
            className="px-2.5 py-1 rounded bg-[#133863] text-white text-xs font-medium"
          >
            Login
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-slate-700 hover:text-black"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-5 bg-white border-t border-slate-200 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-2 py-1.5 text-xs font-semibold text-slate-700 hover:text-[#133863] hover:bg-slate-50 rounded"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-200 grid grid-cols-2 gap-2">
            <Link
              to="/login/employee"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2 text-center text-xs font-semibold rounded border border-[#133863] text-[#133863]"
            >
              Employee Login
            </Link>
            <Link
              to="/login/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2 text-center text-xs font-semibold rounded bg-[#EE7027] text-white"
            >
              Admin Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
