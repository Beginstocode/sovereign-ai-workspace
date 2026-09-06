import React from 'react';

interface GlowBadgeProps {
  variant?: 'green' | 'red' | 'cyan' | 'purple' | 'orange';
  text: string;
  subtext?: string;
  dotPulse?: boolean;
  className?: string;
  onClick?: () => void;
}

export const GlowBadge: React.FC<GlowBadgeProps> = ({
  variant = 'green',
  text,
  subtext,
  dotPulse = true,
  className = '',
  onClick
}) => {
  const colorMap = {
    green: {
      bg: 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400',
      dot: 'bg-emerald-400',
      glow: 'shadow-[0_0_12px_rgba(16,185,129,0.35)]'
    },
    red: {
      bg: 'bg-rose-950/40 border-rose-500/30 text-rose-400',
      dot: 'bg-rose-500',
      glow: 'shadow-[0_0_12px_rgba(244,63,94,0.35)]'
    },
    cyan: {
      bg: 'bg-cyan-950/40 border-cyan-500/30 text-cyan-400',
      dot: 'bg-cyan-400',
      glow: 'shadow-[0_0_12px_rgba(6,182,212,0.35)]'
    },
    purple: {
      bg: 'bg-purple-950/40 border-purple-500/30 text-purple-300',
      dot: 'bg-purple-400',
      glow: 'shadow-[0_0_12px_rgba(168,85,247,0.35)]'
    },
    orange: {
      bg: 'bg-amber-950/40 border-amber-500/30 text-amber-300',
      dot: 'bg-amber-400',
      glow: 'shadow-[0_0_12px_rgba(245,158,11,0.35)]'
    }
  };

  const current = colorMap[variant];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide border backdrop-blur-md transition-all duration-300 select-none ${current.bg} ${current.glow} ${onClick ? 'cursor-pointer hover:brightness-125' : ''} ${className}`}
    >
      <span className="relative flex h-2 w-2">
        {dotPulse && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${current.dot}`}
          />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${current.dot}`} />
      </span>
      <span>{text}</span>
      {subtext && (
        <span className="text-white/40 text-[10px] pl-1 border-l border-white/10 uppercase">
          {subtext}
        </span>
      )}
    </div>
  );
};
