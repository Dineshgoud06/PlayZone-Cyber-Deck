import React from 'react';
import { TrophyBadge } from '../types';
import { playClickSound } from '../utils/audio';

interface BadgeDetailModalProps {
  badge: TrophyBadge | null;
  isOpen: boolean;
  onClose: () => void;
  onTogglePin?: (badgeId: string) => void;
}

export const BadgeDetailModal: React.FC<BadgeDetailModalProps> = ({
  badge,
  isOpen,
  onClose,
  onTogglePin,
}) => {
  if (!isOpen || !badge) return null;

  const isUnlocked = badge.status === 'unlocked';
  const isInProgress = badge.status === 'in-progress';

  const tierColors = {
    diamond: {
      border: 'border-[#ddb7ff]/60',
      bg: 'from-[#6f00be]/30 via-[#2a134a]/60 to-[#121318]',
      text: 'text-[#ddb7ff]',
      badgeBg: 'bg-[#6f00be]/30 text-[#ddb7ff] border-[#6f00be]',
      glow: 'shadow-[0_0_30px_rgba(221,183,255,0.35)]',
      accent: '#ddb7ff',
    },
    platinum: {
      border: 'border-[#00f0ff]/60',
      bg: 'from-[#00f0ff]/20 via-[#00363a]/60 to-[#121318]',
      text: 'text-[#00f0ff]',
      badgeBg: 'bg-[#00f0ff]/20 text-[#00f0ff] border-[#00f0ff]',
      glow: 'shadow-[0_0_30px_rgba(0,240,255,0.35)]',
      accent: '#00f0ff',
    },
    gold: {
      border: 'border-amber-400/60',
      bg: 'from-amber-500/20 via-amber-950/60 to-[#121318]',
      text: 'text-amber-400',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500',
      glow: 'shadow-[0_0_30px_rgba(251,191,36,0.35)]',
      accent: '#fbbf24',
    },
    silver: {
      border: 'border-slate-300/50',
      bg: 'from-slate-400/20 via-slate-800/60 to-[#121318]',
      text: 'text-slate-200',
      badgeBg: 'bg-slate-400/20 text-slate-200 border-slate-400',
      glow: 'shadow-[0_0_20px_rgba(203,213,225,0.2)]',
      accent: '#cbd5e1',
    },
    bronze: {
      border: 'border-amber-700/50',
      bg: 'from-amber-800/20 via-amber-950/60 to-[#121318]',
      text: 'text-amber-600',
      badgeBg: 'bg-amber-800/20 text-amber-500 border-amber-700',
      glow: 'shadow-[0_0_20px_rgba(217,119,6,0.2)]',
      accent: '#d97706',
    },
  };

  const style = tierColors[badge.tier || 'gold'] || tierColors.gold;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-md rounded-3xl bg-gradient-to-b ${style.bg} border ${style.border} ${style.glow} p-6 overflow-hidden flex flex-col items-center text-center shadow-2xl animate-scaleUp`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Cyber Pattern & Ambient Background Light */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-b from-white/10 to-transparent rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          id="badge-modal-close-btn"
          onClick={() => {
            playClickSound();
            onClose();
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {/* Status Pill & Tier */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${style.badgeBg}`}>
            {badge.tier || 'Gold'} Tier
          </span>
          {badge.rarity && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white border border-white/20">
              {badge.rarity} {badge.rarityPercent ? `• Top ${badge.rarityPercent}%` : ''}
            </span>
          )}
        </div>

        {/* Large Central Holographic Badge Icon */}
        <div className="relative my-2">
          <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-[#0d0e13] border-2 ${style.border} flex items-center justify-center shadow-inner relative z-10`}>
            <span
              className={`material-symbols-outlined text-5xl sm:text-6xl ${style.text}`}
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {badge.icon}
            </span>
            {badge.isPinned && (
              <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-[#00f0ff] text-[#00363a] text-[9px] font-black uppercase tracking-wider shadow-lg flex items-center gap-0.5">
                <span className="material-symbols-outlined text-xs">push_pin</span>
                Pinned
              </span>
            )}
          </div>
          {/* Radial Pulse Glow Behind Icon */}
          <div
            className="absolute inset-0 rounded-3xl blur-xl opacity-60 pointer-events-none"
            style={{ backgroundColor: style.accent }}
          />
        </div>

        {/* Badge Title & Category */}
        <h3 className="font-headline-lg-mobile text-xl sm:text-2xl font-bold text-white uppercase tracking-wide mt-3">
          {badge.title}
        </h3>
        {badge.category && (
          <span className="text-[11px] font-mono text-[#849495] uppercase tracking-widest mt-0.5">
            Category // {badge.category}
          </span>
        )}

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#b9cacb] mt-3 max-w-xs leading-relaxed">
          {badge.description}
        </p>

        {/* Metric / Criteria / Progress */}
        <div className="w-full mt-5 p-3.5 rounded-2xl bg-[#0d0e13]/80 border border-white/10 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#849495] uppercase">Status</span>
            <span
              className={`font-bold uppercase ${
                isUnlocked
                  ? 'text-emerald-400'
                  : isInProgress
                  ? 'text-[#00f0ff]'
                  : 'text-zinc-500'
              }`}
            >
              {isUnlocked
                ? 'Earned & Verified'
                : isInProgress
                ? 'In Progress'
                : 'Locked'}
            </span>
          </div>

          {badge.progressPercent !== undefined && (
            <div className="flex flex-col gap-1.5 mt-1">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-white font-semibold">
                  {badge.progressText || `${badge.progressPercent}%`}
                </span>
                <span className="text-[#00f0ff] font-bold">
                  {badge.progressPercent}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#00f0ff] to-[#ddb7ff]"
                  style={{ width: `${badge.progressPercent}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between text-xs font-mono pt-1 border-t border-white/5">
            <span className="text-[#849495] uppercase">XP Reward</span>
            <span className="text-amber-400 font-bold font-headline-sm">
              {badge.xp || '+1,000 XP'}
            </span>
          </div>

          {badge.dateUnlocked && (
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#849495] uppercase">Unlocked</span>
              <span className="text-white">{badge.dateUnlocked}</span>
            </div>
          )}
        </div>

        {/* Action Buttons: Pin to Profile / Close */}
        <div className="flex items-center gap-3 w-full mt-5">
          {isUnlocked && onTogglePin && (
            <button
              id="badge-modal-toggle-pin-btn"
              onClick={() => {
                playClickSound();
                onTogglePin(badge.id);
              }}
              className={`flex-1 py-2.5 px-4 rounded-xl font-label-md text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                badge.isPinned
                  ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                  : 'bg-[#00f0ff] text-[#00363a] hover:bg-[#7df4ff] shadow-[0_0_15px_rgba(0,240,255,0.4)]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">
                {badge.isPinned ? 'bookmark_remove' : 'push_pin'}
              </span>
              <span>{badge.isPinned ? 'Unpin from Showcase' : 'Pin to Profile'}</span>
            </button>
          )}

          <button
            id="badge-modal-dismiss-btn"
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="flex-1 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-label-md text-xs font-bold uppercase tracking-wider transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
