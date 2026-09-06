import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: 'none' | 'violet' | 'cyan' | 'emerald' | 'orange';
  hoverEffect?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  glow = 'none',
  hoverEffect = true,
  onClick
}) => {
  const glowStyles = {
    none: '',
    violet: 'hover:border-purple-500/40 hover:shadow-[0_0_30px_-5px_rgba(147,51,234,0.3)]',
    cyan: 'hover:border-cyan-500/40 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)]',
    emerald: 'hover:border-emerald-500/40 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]',
    orange: 'hover:border-orange-500/40 hover:shadow-[0_0_30px_-5px_rgba(249,115,22,0.3)]'
  };

  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl bg-[#0d1322]/60 backdrop-blur-xl border border-white/[0.08] transition-all duration-300 ${
        hoverEffect ? 'hover:bg-[#131b31]/75 hover:-translate-y-1 hover:border-white/20' : ''
      } ${glowStyles[glow]} ${className}`}
    >
      {children}
    </div>
  );
};
