import React, { useState, useMemo } from 'react';
import {
  CURRENT_USER_PROFILE,
  TROPHY_BADGES,
  MATCH_HISTORY
} from '../data/mockData';
import { TrophyBadge } from '../types';
import { BadgeDetailModal } from './BadgeDetailModal';
import { playClaimSound, playClickSound } from '../utils/audio';

interface ProfileViewProps {
  coins: number;
  onOpenTopUp: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ coins, onOpenTopUp }) => {
  const [profile, setProfile] = useState(CURRENT_USER_PROFILE);
  const [badges, setBadges] = useState<TrophyBadge[]>(TROPHY_BADGES);
  const [selectedBadge, setSelectedBadge] = useState<TrophyBadge | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'badges' | 'history'>('overview');
  const [earnedFilter, setEarnedFilter] = useState<'all' | 'high-tier' | 'recent' | 'in-progress'>('all');
  const [trophyStatusFilter, setTrophyStatusFilter] = useState<'all' | 'unlocked' | 'in-progress' | 'locked'>('all');
  const [trophyTierFilter, setTrophyTierFilter] = useState<string>('all');
  const [trophySearch, setTrophySearch] = useState('');
  const [lowLatency, setLowLatency] = useState(true);
  const [streamQuality, setStreamQuality] = useState<'ultra' | 'high' | 'auto'>('ultra');
  const [battlePassClaimed, setBattlePassClaimed] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [customBio, setCustomBio] = useState(profile.bio);

  const handleSaveBio = () => {
    playClickSound();
    setProfile(prev => ({ ...prev, bio: customBio }));
    setIsEditingBio(false);
  };

  const handleClaimPass = () => {
    if (battlePassClaimed) return;
    playClaimSound();
    setBattlePassClaimed(true);
  };

  const handleTogglePin = (badgeId: string) => {
    setBadges(prev =>
      prev.map(b => {
        if (b.id === badgeId) {
          return { ...b, isPinned: !b.isPinned };
        }
        return b;
      })
    );
    if (selectedBadge && selectedBadge.id === badgeId) {
      setSelectedBadge(prev => prev ? { ...prev, isPinned: !prev.isPinned } : null);
    }
  };

  // Metrics calculations
  const unlockedBadges = useMemo(() => badges.filter(b => b.status === 'unlocked'), [badges]);
  const inProgressBadges = useMemo(() => badges.filter(b => b.status === 'in-progress'), [badges]);
  const pinnedBadges = useMemo(() => badges.filter(b => b.isPinned), [badges]);
  const totalBadgesCount = badges.length;
  const completionPercentage = Math.round((unlockedBadges.length / totalBadgesCount) * 100);

  // Filtered badges for the Earned Badges showcase area
  const showcaseBadges = useMemo(() => {
    if (earnedFilter === 'high-tier') {
      return unlockedBadges.filter(b => b.tier === 'diamond' || b.tier === 'platinum' || b.tier === 'gold');
    }
    if (earnedFilter === 'recent') {
      return [...unlockedBadges].reverse().slice(0, 4);
    }
    if (earnedFilter === 'in-progress') {
      return inProgressBadges;
    }
    return unlockedBadges;
  }, [unlockedBadges, inProgressBadges, earnedFilter]);

  // Filtered badges for the full Trophy Room tab
  const filteredTrophyRoom = useMemo(() => {
    return badges.filter(b => {
      if (trophyStatusFilter !== 'all' && b.status !== trophyStatusFilter) return false;
      if (trophyTierFilter !== 'all' && b.tier !== trophyTierFilter) return false;
      if (trophySearch.trim()) {
        const query = trophySearch.toLowerCase();
        return (
          b.title.toLowerCase().includes(query) ||
          b.description.toLowerCase().includes(query) ||
          (b.category && b.category.toLowerCase().includes(query))
        );
      }
      return true;
    });
  }, [badges, trophyStatusFilter, trophyTierFilter, trophySearch]);

  const getTierStyles = (tier?: string) => {
    switch (tier) {
      case 'diamond':
        return {
          border: 'border-[#ddb7ff]/50 hover:border-[#ddb7ff]',
          bg: 'bg-[#6f00be]/15',
          text: 'text-[#ddb7ff]',
          pill: 'bg-[#6f00be]/30 text-[#ddb7ff] border-[#6f00be]/60',
          glow: 'shadow-[0_0_15px_rgba(221,183,255,0.25)]',
        };
      case 'platinum':
        return {
          border: 'border-[#00f0ff]/50 hover:border-[#00f0ff]',
          bg: 'bg-[#00f0ff]/10',
          text: 'text-[#00f0ff]',
          pill: 'bg-[#00f0ff]/20 text-[#00f0ff] border-[#00f0ff]/60',
          glow: 'shadow-[0_0_15px_rgba(0,240,255,0.25)]',
        };
      case 'gold':
        return {
          border: 'border-amber-400/40 hover:border-amber-400',
          bg: 'bg-amber-500/10',
          text: 'text-amber-400',
          pill: 'bg-amber-500/20 text-amber-300 border-amber-500/60',
          glow: 'shadow-[0_0_15px_rgba(251,191,36,0.2)]',
        };
      case 'silver':
        return {
          border: 'border-slate-400/40 hover:border-slate-300',
          bg: 'bg-slate-400/10',
          text: 'text-slate-200',
          pill: 'bg-slate-400/20 text-slate-200 border-slate-400/60',
          glow: 'shadow-[0_0_10px_rgba(203,213,225,0.15)]',
        };
      case 'bronze':
      default:
        return {
          border: 'border-amber-700/40 hover:border-amber-600',
          bg: 'bg-amber-800/10',
          text: 'text-amber-500',
          pill: 'bg-amber-800/20 text-amber-400 border-amber-700/60',
          glow: 'shadow-[0_0_10px_rgba(217,119,6,0.15)]',
        };
    }
  };

  return (
    <div className="flex flex-col w-full pb-24 animate-fadeIn">
      <div className="flex flex-col px-3 sm:px-4 max-w-4xl mx-auto w-full gap-4">

        {/* Identity & Avatar Card */}
        <div className="relative overflow-hidden rounded-2xl bg-[#1a1b21] p-4 sm:p-5 border border-white/10 shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#00f0ff]/10 via-[#6f00be]/15 to-transparent blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 relative z-10">
            {/* Avatar with Glow Ring */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl p-1 bg-gradient-to-br from-[#00f0ff] to-[#6f00be] shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                <img
                  src={profile.avatar}
                  alt={profile.username}
                  className="w-full h-full rounded-xl object-cover"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-emerald-500 text-black text-[10px] font-bold uppercase tracking-wider shadow-md">
                ONLINE
              </span>
            </div>

            {/* Profile Info */}
            <div className="flex flex-col items-center sm:items-start flex-1 text-center sm:text-left min-w-0">
              <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
                <h1 className="font-headline-lg-mobile text-xl sm:text-2xl text-white uppercase tracking-tight">
                  {profile.username}
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-[#00f0ff]/20 text-[#00f0ff] text-[10px] font-bold uppercase tracking-wider border border-[#00f0ff]/40">
                  {profile.rankTitle}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#6f00be]/30 text-[#ddb7ff] text-[10px] font-bold uppercase tracking-wider border border-[#6f00be]/50">
                  {profile.tier}
                </span>
              </div>

              {/* Bio / Tagline */}
              {isEditingBio ? (
                <div className="flex items-center gap-2 mt-2 w-full max-w-sm">
                  <input
                    type="text"
                    value={customBio}
                    onChange={(e) => setCustomBio(e.target.value)}
                    className="flex-1 px-2.5 py-1 rounded bg-[#0d0e13] text-xs text-white border border-[#00f0ff] outline-none"
                    placeholder="Enter motto..."
                  />
                  <button
                    onClick={handleSaveBio}
                    className="px-3 py-1 rounded bg-[#00f0ff] text-[#00363a] text-xs font-bold uppercase"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <p
                  onClick={() => setIsEditingBio(true)}
                  className="text-xs text-[#b9cacb] mt-1 cursor-pointer hover:text-[#00f0ff] transition-colors flex items-center gap-1"
                  title="Click to edit bio"
                >
                  <span>&quot;{profile.bio}&quot;</span>
                  <span className="material-symbols-outlined text-xs">edit</span>
                </p>
              )}

              {/* XP Progress Bar */}
              <div className="w-full max-w-md mt-3 flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-white font-bold">LEVEL {profile.level}</span>
                  <span className="text-[#00f0ff] font-bold">
                    {profile.xp.toLocaleString()} / {profile.nextLevelXp.toLocaleString()} XP
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[#0d0e13] p-0.5 border border-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#00f0ff] to-[#ddb7ff] shadow-[0_0_8px_#00f0ff]"
                    style={{ width: `${(profile.xp / profile.nextLevelXp) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex sm:flex-col gap-2 shrink-0">
              <button
                onClick={onOpenTopUp}
                className="px-4 py-2 rounded-full bg-[#00f0ff] hover:bg-[#7df4ff] text-[#00363a] font-label-md text-xs uppercase font-bold tracking-wider shadow-[0_0_12px_rgba(0,240,255,0.4)] active:scale-95 transition-all flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">add_circle</span>
                <span>Top-Up</span>
              </button>
              <button
                onClick={() => {
                  playClickSound();
                  alert('Cyber Card Copied to Clipboard!');
                }}
                className="px-4 py-2 rounded-full bg-[#292a2f] hover:bg-[#34343a] text-white font-label-sm text-xs uppercase font-semibold tracking-wider active:scale-95 transition-all flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">share</span>
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Currency & Battle Pass Multi-Vault */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* PlayCoins Vault */}
          <div className="p-3.5 rounded-2xl bg-[#1a1b21] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#292a2f] flex items-center justify-center text-amber-400">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  monetization_on
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-[#849495]">PlayCoins</span>
                <span className="font-headline-sm text-base font-bold text-white">
                  {coins.toLocaleString()} PC
                </span>
              </div>
            </div>
            <button
              onClick={onOpenTopUp}
              className="text-xs font-bold text-[#00f0ff] hover:underline uppercase"
            >
              + Add
            </button>
          </div>

          {/* Cyber Shards */}
          <div className="p-3.5 rounded-2xl bg-[#1a1b21] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#292a2f] flex items-center justify-center text-[#ddb7ff]">
                <span className="material-symbols-outlined text-xl">diamond</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-[#849495]">Cyber Shards</span>
                <span className="font-headline-sm text-base font-bold text-white">
                  {profile.shards.toLocaleString()} CS
                </span>
              </div>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold uppercase bg-emerald-950/40 px-2 py-0.5 rounded">
              Rare
            </span>
          </div>

          {/* Season 4 Battle Pass */}
          <div className="p-3.5 rounded-2xl bg-[#1a1b21] border border-[#6f00be]/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#6f00be] flex items-center justify-center text-white shadow-[0_0_10px_rgba(111,0,190,0.5)]">
                <span className="material-symbols-outlined text-xl">military_tech</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-[#ddb7ff]">Battle Pass S4</span>
                <span className="font-headline-sm text-xs font-bold text-white">
                  Tier 38 / 50
                </span>
              </div>
            </div>
            <button
              onClick={handleClaimPass}
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${
                battlePassClaimed
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-[#6f00be] text-white hover:bg-[#8c0053]'
              }`}
            >
              {battlePassClaimed ? 'Claimed ✓' : 'Claim'}
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DEDICATED DISPLAY AREA: EARNED BADGES & ACHIEVEMENTS SHOWCASE            */}
        {/* ========================================================================= */}
        <div id="earned-badges-showcase-section" className="relative overflow-hidden rounded-3xl bg-[#1a1b21] p-4 sm:p-5 border border-[#00f0ff]/30 shadow-[0_0_30px_rgba(0,240,255,0.1)] flex flex-col gap-4">
          {/* Cyber Accent Lines & Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-32 bg-gradient-to-l from-[#00f0ff]/15 via-[#6f00be]/10 to-transparent blur-2xl pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-50" />

          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00f0ff] to-[#6f00be] p-0.5 shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                <div className="w-full h-full rounded-[10px] bg-[#0d0e13] flex items-center justify-center text-[#00f0ff]">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    military_tech
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h2 className="font-headline-lg-mobile text-base sm:text-lg font-bold text-white uppercase tracking-wider">
                    Earned Badges
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/40">
                    {unlockedBadges.length} / {totalBadgesCount} Unlocked ({completionPercentage}%)
                  </span>
                </div>
                <span className="text-[11px] text-[#849495] font-mono">
                  Verified combat &amp; arcade achievements • Top 2.4% Global Collector
                </span>
              </div>
            </div>

            {/* Quick Link to Full Trophy Room */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#0d0e13] border border-white/5 text-[11px] font-mono">
                <span className="text-[#849495]">BADGE SCORE:</span>
                <span className="text-amber-400 font-bold font-headline-sm">+22,700 XP</span>
              </div>
              <button
                id="trophy-room-quick-btn"
                onClick={() => {
                  playClickSound();
                  setActiveTab('badges');
                }}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#00f0ff]/20 hover:text-[#00f0ff] border border-white/10 hover:border-[#00f0ff]/50 text-xs font-mono text-[#b9cacb] transition-all flex items-center gap-1"
              >
                <span>Trophy Room</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Pinned Showcase Badges (Top Bragging Rights) */}
          {pinnedBadges.length > 0 && (
            <div className="flex flex-col gap-2 p-3 rounded-2xl bg-[#0d0e13]/70 border border-white/5">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#849495] uppercase tracking-wider">
                <span className="flex items-center gap-1 text-[#00f0ff] font-bold">
                  <span className="material-symbols-outlined text-xs">push_pin</span>
                  Pinned Profile Showcase
                </span>
                <span>Click badge to inspect</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {pinnedBadges.map((badge) => {
                  const style = getTierStyles(badge.tier);
                  return (
                    <div
                      key={badge.id}
                      id={`pinned-badge-${badge.id}`}
                      onClick={() => {
                        playClickSound();
                        setSelectedBadge(badge);
                      }}
                      className={`p-3 rounded-xl bg-[#121318] border ${style.border} ${style.glow} hover:scale-[1.02] active:scale-95 cursor-pointer transition-all flex items-center gap-3 relative group overflow-hidden`}
                    >
                      <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-bl-full pointer-events-none" />
                      <div className={`w-11 h-11 rounded-xl bg-[#1a1b21] border border-white/10 flex items-center justify-center shrink-0 ${style.text}`}>
                        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                          {badge.icon}
                        </span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-headline-sm text-xs font-bold text-white truncate">
                            {badge.title}
                          </h4>
                          <span className={`px-1.5 py-0.2 rounded text-[8px] font-bold uppercase tracking-wider border shrink-0 ${style.pill}`}>
                            {badge.tier}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#849495] truncate mt-0.5">
                          {badge.description}
                        </span>
                        <div className="flex items-center justify-between mt-1 text-[9px] font-mono">
                          <span className="text-amber-400 font-bold">{badge.xp}</span>
                          <span className="text-[#849495]">{badge.unlockedAt}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Earned Badges Showcase Filter Chips */}
          <div className="flex items-center justify-between gap-2 flex-wrap pt-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-mono text-[#849495] uppercase mr-1">Filter:</span>
              <button
                id="filter-earned-all-btn"
                onClick={() => {
                  playClickSound();
                  setEarnedFilter('all');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  earnedFilter === 'all'
                    ? 'bg-[#00f0ff] text-[#00363a] font-bold shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                    : 'bg-[#0d0e13] text-[#849495] hover:text-white border border-white/5'
                }`}
              >
                All Earned ({unlockedBadges.length})
              </button>
              <button
                id="filter-earned-high-tier-btn"
                onClick={() => {
                  playClickSound();
                  setEarnedFilter('high-tier');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  earnedFilter === 'high-tier'
                    ? 'bg-amber-400 text-black font-bold shadow-[0_0_10px_rgba(251,191,36,0.3)]'
                    : 'bg-[#0d0e13] text-[#849495] hover:text-white border border-white/5'
                }`}
              >
                Gold &amp; Diamond
              </button>
              <button
                id="filter-earned-recent-btn"
                onClick={() => {
                  playClickSound();
                  setEarnedFilter('recent');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  earnedFilter === 'recent'
                    ? 'bg-[#ddb7ff] text-[#2a0b4d] font-bold'
                    : 'bg-[#0d0e13] text-[#849495] hover:text-white border border-white/5'
                }`}
              >
                Recent
              </button>
              <button
                id="filter-earned-in-progress-btn"
                onClick={() => {
                  playClickSound();
                  setEarnedFilter('in-progress');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  earnedFilter === 'in-progress'
                    ? 'bg-[#6f00be] text-white font-bold'
                    : 'bg-[#0d0e13] text-[#849495] hover:text-white border border-white/5'
                }`}
              >
                In Progress ({inProgressBadges.length})
              </button>
            </div>

            <span className="text-[11px] font-mono text-[#849495]">
              Showing {showcaseBadges.length} achievements
            </span>
          </div>

          {/* Earned Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {showcaseBadges.map((badge) => {
              const style = getTierStyles(badge.tier);
              const isUnlocked = badge.status === 'unlocked';

              return (
                <div
                  key={badge.id}
                  onClick={() => {
                    playClickSound();
                    setSelectedBadge(badge);
                  }}
                  className={`p-3 rounded-2xl bg-[#121318] border ${style.border} hover:scale-[1.02] active:scale-95 cursor-pointer transition-all flex flex-col justify-between gap-2.5 group relative overflow-hidden`}
                >
                  {/* Top Row: Icon & Tier Tag */}
                  <div className="flex items-start justify-between gap-1.5">
                    <div className={`w-10 h-10 rounded-xl bg-[#1a1b21] border border-white/10 flex items-center justify-center shrink-0 ${style.text} group-hover:scale-110 transition-transform`}>
                      <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {badge.icon}
                      </span>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border ${style.pill}`}>
                        {badge.tier}
                      </span>
                      {badge.isPinned && (
                        <span className="text-[9px] text-[#00f0ff] flex items-center" title="Pinned in showcase">
                          <span className="material-symbols-outlined text-xs">push_pin</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="font-headline-sm text-xs font-bold text-white group-hover:text-[#00f0ff] transition-colors line-clamp-1">
                      {badge.title}
                    </h3>
                    <p className="text-[10px] text-[#849495] line-clamp-2 mt-0.5 leading-tight">
                      {badge.description}
                    </p>
                  </div>

                  {/* Progress or Unlock Timestamp */}
                  <div className="pt-2 border-t border-white/5 flex flex-col gap-1 mt-auto">
                    {isUnlocked ? (
                      <div className="flex items-center justify-between text-[9px] font-mono">
                        <span className="text-amber-400 font-bold">{badge.xp}</span>
                        <span className="text-emerald-400 font-semibold">{badge.unlockedAt || 'Earned'}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-[9px] font-mono">
                          <span className="text-white">{badge.progressPercent}%</span>
                          <span className="text-[#00f0ff]">{badge.xp}</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#00f0ff] to-[#ddb7ff]"
                            style={{ width: `${badge.progressPercent}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Profile Section Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-2 mt-2">
          <button
            id="nav-tab-combat-matrix"
            onClick={() => {
              playClickSound();
              setActiveTab('overview');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-label-md uppercase tracking-wider transition-all ${
              activeTab === 'overview'
                ? 'bg-[#00f0ff] text-[#00363a] font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                : 'text-[#849495] hover:text-white'
            }`}
          >
            Combat Matrix
          </button>
          <button
            id="nav-tab-trophy-room"
            onClick={() => {
              playClickSound();
              setActiveTab('badges');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-label-md uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === 'badges'
                ? 'bg-[#00f0ff] text-[#00363a] font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                : 'text-[#849495] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">military_tech</span>
            <span>Trophy Room ({totalBadgesCount})</span>
          </button>
          <button
            id="nav-tab-match-logs"
            onClick={() => {
              playClickSound();
              setActiveTab('history');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-label-md uppercase tracking-wider transition-all ${
              activeTab === 'history'
                ? 'bg-[#00f0ff] text-[#00363a] font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                : 'text-[#849495] hover:text-white'
            }`}
          >
            Match Logs
          </button>
        </div>

        {/* TAB 1: Combat Performance Matrix */}
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3.5 rounded-2xl bg-[#1a1b21] border border-white/5 flex flex-col">
                <span className="text-[10px] text-[#849495] uppercase font-bold">Matches Played</span>
                <span className="font-headline-sm text-lg font-bold text-white mt-1">
                  {profile.stats.matchesPlayed.toLocaleString()}
                </span>
                <span className="text-[9px] text-emerald-400 font-mono mt-0.5">Top 5% Global</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#1a1b21] border border-white/5 flex flex-col">
                <span className="text-[10px] text-[#849495] uppercase font-bold">Win Rate</span>
                <span className="font-headline-sm text-lg font-bold text-[#7df4ff] mt-1">
                  {profile.stats.winRate}%
                </span>
                <span className="text-[9px] text-[#849495] font-mono mt-0.5">+2.4% this week</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#1a1b21] border border-white/5 flex flex-col">
                <span className="text-[10px] text-[#849495] uppercase font-bold">K/D Accuracy</span>
                <span className="font-headline-sm text-lg font-bold text-[#ddb7ff] mt-1">
                  {profile.stats.kdRatio} K/D
                </span>
                <span className="text-[9px] text-[#849495] font-mono mt-0.5">94.1% Precision</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#1a1b21] border border-white/5 flex flex-col">
                <span className="text-[10px] text-[#849495] uppercase font-bold">MVP Ribbons</span>
                <span className="font-headline-sm text-lg font-bold text-amber-400 mt-1">
                  {profile.stats.mvpAwards}
                </span>
                <span className="text-[9px] text-[#849495] font-mono mt-0.5">{profile.stats.hoursPlayed}h Cloud Time</span>
              </div>
            </div>

            {/* Cloud Stream Telemetry Preferences */}
            <div className="p-4 rounded-2xl bg-[#1a1b21] border border-white/5 flex flex-col gap-3">
              <h3 className="font-headline-sm text-sm font-bold text-white uppercase tracking-wider">
                Cloud Rig &amp; Streaming Engine
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#121318] border border-white/5">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">Low Latency Mode</span>
                    <span className="text-[10px] text-[#849495]">Direct WebRTC packet buffering</span>
                  </div>
                  <button
                    onClick={() => setLowLatency(!lowLatency)}
                    className={`w-10 h-6 rounded-full p-0.5 flex items-center transition-colors ${
                      lowLatency ? 'bg-[#00f0ff]' : 'bg-[#292a2f]'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        lowLatency ? 'translate-x-4 bg-[#00363a]' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-[#121318] border border-white/5">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">Stream Quality</span>
                    <span className="text-[10px] text-[#849495]">GPU Hardware decode target</span>
                  </div>
                  <div className="flex gap-1">
                    {(['ultra', 'high', 'auto'] as const).map((q) => (
                      <button
                        key={q}
                        onClick={() => setStreamQuality(q)}
                        className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                          streamQuality === q ? 'bg-[#00f0ff] text-[#00363a]' : 'bg-[#292a2f] text-[#849495]'
                        }`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Full Trophy Room & Achievement Archive */}
        {activeTab === 'badges' && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between p-3.5 rounded-2xl bg-[#1a1b21] border border-white/5">
              {/* Search Bar */}
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#849495]">
                  search
                </span>
                <input
                  type="text"
                  value={trophySearch}
                  onChange={(e) => setTrophySearch(e.target.value)}
                  placeholder="Search badges by name or criteria..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0d0e13] text-xs text-white placeholder-[#849495] border border-white/10 focus:border-[#00f0ff] outline-none"
                />
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                {(['all', 'unlocked', 'in-progress', 'locked'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      playClickSound();
                      setTrophyStatusFilter(status);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase whitespace-nowrap transition-all ${
                      trophyStatusFilter === status
                        ? 'bg-[#00f0ff] text-[#00363a] font-bold'
                        : 'bg-[#0d0e13] text-[#849495] hover:text-white border border-white/5'
                    }`}
                  >
                    {status === 'all'
                      ? `All (${badges.length})`
                      : status === 'unlocked'
                      ? `Earned (${unlockedBadges.length})`
                      : status === 'in-progress'
                      ? `In Progress (${inProgressBadges.length})`
                      : 'Locked'}
                  </button>
                ))}
              </div>
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredTrophyRoom.map((badge) => {
                const style = getTierStyles(badge.tier);
                const isUnlocked = badge.status === 'unlocked';
                const isInProgress = badge.status === 'in-progress';

                return (
                  <div
                    key={badge.id}
                    onClick={() => {
                      playClickSound();
                      setSelectedBadge(badge);
                    }}
                    className={`p-4 rounded-2xl bg-[#1a1b21] border ${style.border} hover:scale-[1.01] active:scale-98 cursor-pointer transition-all flex flex-col justify-between gap-3 group relative overflow-hidden shadow-lg`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl bg-[#0d0e13] border border-white/10 flex items-center justify-center shrink-0 ${style.text} group-hover:scale-110 transition-transform`}>
                          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                            {badge.icon}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <h4 className="font-headline-sm text-sm font-bold text-white group-hover:text-[#00f0ff] transition-colors">
                            {badge.title}
                          </h4>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border ${style.pill}`}>
                              {badge.tier}
                            </span>
                            {badge.rarity && (
                              <span className="text-[9px] font-mono text-[#849495]">
                                {badge.rarity}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Pin Toggle Button */}
                      {isUnlocked && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            playClickSound();
                            handleTogglePin(badge.id);
                          }}
                          className={`p-1.5 rounded-lg border transition-all ${
                            badge.isPinned
                              ? 'bg-[#00f0ff]/20 text-[#00f0ff] border-[#00f0ff]'
                              : 'bg-white/5 text-[#849495] hover:text-white border-white/10'
                          }`}
                          title={badge.isPinned ? 'Unpin from showcase' : 'Pin to showcase'}
                        >
                          <span className="material-symbols-outlined text-sm">
                            {badge.isPinned ? 'push_pin' : 'bookmark_add'}
                          </span>
                        </button>
                      )}
                    </div>

                    <p className="text-xs text-[#b9cacb] leading-relaxed">
                      {badge.description}
                    </p>

                    {/* Progress or Unlock Info */}
                    <div className="pt-2 border-t border-white/5 flex flex-col gap-1.5">
                      {isUnlocked ? (
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className="text-amber-400 font-bold">{badge.xp}</span>
                          <span className="text-[#849495]">{badge.dateUnlocked || badge.unlockedAt}</span>
                        </div>
                      ) : isInProgress ? (
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between text-[10px] font-mono">
                            <span className="text-white font-semibold">{badge.progressText || `${badge.progressPercent}%`}</span>
                            <span className="text-[#00f0ff] font-bold">{badge.xp}</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-[#00f0ff] to-[#ddb7ff]"
                              style={{ width: `${badge.progressPercent}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">lock</span>
                            Locked
                          </span>
                          <span>{badge.xp}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredTrophyRoom.length === 0 && (
              <div className="p-12 text-center text-[#849495] font-mono text-xs">
                No achievements match your search or filter.
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Match History Feed */}
        {activeTab === 'history' && (
          <div className="flex flex-col gap-2.5 animate-fadeIn">
            {MATCH_HISTORY.map((match) => (
              <div
                key={match.id}
                className="p-3 rounded-2xl bg-[#1a1b21] border border-white/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                    match.result === 'Victory'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : 'bg-rose-950 text-rose-400 border border-rose-800'
                  }`}>
                    <span className="material-symbols-outlined text-xl">
                      {match.result === 'Victory' ? 'check_circle' : 'cancel'}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-xs sm:text-sm font-bold text-white">
                      {match.gameName}
                    </span>
                    <span className="text-[10px] text-[#849495]">
                      {match.mode} • {match.timestamp}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <span className={`font-mono text-xs font-bold ${
                    match.scoreDelta.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {match.scoreDelta}
                  </span>
                  <span className="text-[10px] text-[#b9cacb]">Score: {match.score.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Badge Detail Holographic Inspector Modal */}
      <BadgeDetailModal
        badge={selectedBadge}
        isOpen={Boolean(selectedBadge)}
        onClose={() => setSelectedBadge(null)}
        onTogglePin={handleTogglePin}
      />
    </div>
  );
};

