import React, { useState } from 'react';
import { GameItem, ScreenTab } from '../types';
import {
  HERO_BANNER_BG,
  SPOTLIGHT_GAMES,
  TRENDING_GAMES,
  NEW_DROPS
} from '../data/mockData';
import { playClaimSound, playClickSound } from '../utils/audio';

interface HomeViewProps {
  onNavigate: (tab: ScreenTab) => void;
  onLaunchGame: (game: GameItem) => void;
  onOpenTopUp: () => void;
  coins: number;
  userLevel: number;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onLaunchGame,
  onOpenTopUp,
  coins,
  userLevel
}) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [streakClaimed, setStreakClaimed] = useState(false);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    'striker-quantum': true
  });
  const [registeredChampionship, setRegisteredChampionship] = useState(false);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClaimStreak = () => {
    if (streakClaimed) return;
    playClaimSound();
    setStreakClaimed(true);
  };

  const categories = [
    { id: 'all', label: 'All Ops', count: 142, icon: 'flash_on' },
    { id: 'action', label: 'Action', count: 48, icon: 'swords' },
    { id: 'racing', label: 'Racing', count: 29, icon: 'sports_motorsports' },
    { id: 'strategy', label: 'Strategy', count: 19, icon: 'hub' },
    { id: 'arcade', label: 'Arcade', count: 34, icon: 'sports_esports' },
    { id: 'pvp', label: 'PvP Net', count: 62, icon: 'group' },
  ];

  return (
    <div className="flex flex-col w-full pb-24 animate-fadeIn">
      <div className="flex flex-col px-3 sm:px-4 max-w-4xl mx-auto w-full gap-5">
        
        {/* Telemetry Status Bar */}
        <div className="flex items-center justify-between pt-1">
          {/* Server Node & Latency */}
          <div className="flex items-center gap-2 bg-[#1a1b21] px-3 py-1.5 rounded-full shadow-md border border-white/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_#10b981]" />
            </span>
            <span className="font-label-sm text-[11px] uppercase tracking-wider text-[#b9cacb]">
              EU-Central
            </span>
            <span className="font-headline-sm text-xs font-bold text-[#7df4ff]">
              18ms
            </span>
          </div>

          {/* User Currency & Level */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenTopUp}
              className="flex items-center gap-1.5 bg-[#1a1b21] hover:bg-[#292a2f] px-3 py-1.5 rounded-full shadow-md border border-white/5 transition-all group"
            >
              <span className="material-symbols-outlined text-[#ddb7ff] text-sm group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>
                monetization_on
              </span>
              <span className="font-headline-sm text-xs text-[#e3e1e9] tracking-wider font-bold">
                {coins.toLocaleString()}
              </span>
              <span className="font-label-sm text-[9px] uppercase text-[#ddb7ff]">
                PC
              </span>
            </button>

            <div className="flex items-center gap-1 bg-[#292a2f] px-2.5 py-1.5 rounded-full shadow-md border border-white/5">
              <span className="material-symbols-outlined text-[#00f0ff] text-xs">bolt</span>
              <span className="font-label-sm text-xs text-[#dbfcff] font-bold">
                LVL {userLevel}
              </span>
            </div>
          </div>
        </div>

        {/* Hero Cyber Stadium Banner */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-[#1a1b21] border border-white/10 shadow-2xl">
          {/* Background Image with Mesh Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-45 mix-blend-screen"
            style={{ backgroundImage: `url('${HERO_BANNER_BG}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e13] via-[#0d0e13]/70 to-transparent" />

          {/* Hero Content */}
          <div className="relative z-10 p-4 sm:p-6 flex flex-col gap-3 sm:gap-4">
            {/* Status tags */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#6f00be]/60 border border-[#6f00be] backdrop-blur-md shadow-[0_0_12px_rgba(111,0,190,0.5)]">
                <span className="material-symbols-outlined text-[#ddb7ff] text-xs animate-pulse">
                  local_fire_department
                </span>
                <span className="font-label-sm text-[10px] uppercase tracking-widest text-[#ddb7ff] font-bold">
                  Season 4 Live
                </span>
              </div>
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#34343a]/80 backdrop-blur-md border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] shadow-[0_0_6px_#00f0ff]" />
                <span className="font-label-sm text-[10px] uppercase tracking-wider text-[#b9cacb]">
                  2.4M Online
                </span>
              </div>
            </div>

            {/* Headline Title */}
            <div className="flex flex-col">
              <h2 className="font-headline-lg-mobile text-2xl sm:text-3xl uppercase tracking-tight text-white leading-none">
                Play. Compete.
              </h2>
              <span className="font-headline-lg-mobile text-2xl sm:text-3xl uppercase tracking-tight bg-gradient-to-r from-[#00f0ff] via-[#7df4ff] to-[#ddb7ff] bg-clip-text text-transparent drop-shadow-[0_0_16px_rgba(0,240,255,0.4)]">
                Win Legacy.
              </span>
              <p className="font-body-sm text-xs sm:text-sm text-[#b9cacb] mt-1.5 max-w-[340px] leading-relaxed">
                Dive into zero-install cloud battles. Rank up in weekly qualifiers for $15,000 seasonal rewards.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={() => onNavigate('arena')}
                className="flex-1 h-11 px-4 rounded-full bg-[#00f0ff] hover:bg-[#7df4ff] text-[#00363a] font-headline-sm text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)] active:scale-95 transition-all"
                type="button"
              >
                <span className="material-symbols-outlined text-base">play_arrow</span>
                <span>Play Now</span>
              </button>
              <button
                onClick={() => onNavigate('games')}
                className="flex-1 h-11 px-4 rounded-full bg-[#292a2f]/80 hover:bg-[#34343a] text-white font-headline-sm text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 border border-white/10 shadow-sm active:scale-95 transition-all"
                type="button"
              >
                <span className="material-symbols-outlined text-[#ddb7ff] text-base">explore</span>
                <span>Explore</span>
              </button>
            </div>
          </div>
        </div>

        {/* Daily Cyber Matrix Streak Card */}
        <div className="relative w-full rounded-2xl bg-[#1a1b21] p-4 shadow-lg border border-white/5 overflow-hidden">
          <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-[#6f00be]/20 blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#292a2f] flex items-center justify-center text-[#00f0ff]">
                <span className="material-symbols-outlined text-lg">calendar_month</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-headline-sm text-xs font-bold uppercase tracking-wider text-white">
                    Daily Cyber Matrix
                  </span>
                  <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-[#00f0ff]/20 text-[#00f0ff] uppercase">
                    5/7 Streak
                  </span>
                </div>
                <span className="font-body-sm text-[11px] text-[#b9cacb]">
                  2 daily matches completed to claim 500 XP
                </span>
              </div>
            </div>

            <button
              onClick={handleClaimStreak}
              disabled={streakClaimed}
              className={`px-3 py-1.5 rounded-full font-label-sm text-xs uppercase font-bold tracking-wider transition-all shadow-md active:scale-95 ${
                streakClaimed
                  ? 'bg-[#292a2f] text-emerald-400 border border-emerald-500/30'
                  : 'bg-[#6f00be] text-[#d6a9ff] hover:bg-[#8c0053] shadow-[0_0_12px_rgba(111,0,190,0.4)]'
              }`}
              type="button"
            >
              {streakClaimed ? 'Claimed ✓' : 'Claim'}
            </button>
          </div>

          {/* Day Matrix Icons */}
          <div className="grid grid-cols-7 gap-1.5 pt-1">
            {['D1', 'D2', 'D3', 'D4'].map((day) => (
              <div key={day} className="flex flex-col items-center gap-1">
                <div className="w-full h-8 rounded-lg bg-[#34343a] flex items-center justify-center text-[#00f0ff]">
                  <span className="material-symbols-outlined text-sm">check</span>
                </div>
                <span className="font-label-sm text-[9px] text-[#849495] uppercase">{day}</span>
              </div>
            ))}
            
            {/* Today */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-full h-8 rounded-lg bg-[#00f0ff]/20 border border-[#00f0ff]/40 flex items-center justify-center text-[#00f0ff]">
                <span className="material-symbols-outlined text-sm animate-bounce">stars</span>
              </div>
              <span className="font-label-sm text-[9px] text-[#00f0ff] font-bold uppercase">Today</span>
            </div>

            {/* D6 */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-full h-8 rounded-lg bg-[#1e1f25] flex items-center justify-center text-[#849495]">
                <span className="material-symbols-outlined text-xs">lock</span>
              </div>
              <span className="font-label-sm text-[9px] text-[#849495] uppercase">D6</span>
            </div>

            {/* Chest */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-full h-8 rounded-lg bg-[#1e1f25] border border-[#6f00be]/40 flex items-center justify-center text-[#ddb7ff]">
                <span className="material-symbols-outlined text-sm">redeem</span>
              </div>
              <span className="font-label-sm text-[9px] text-[#ddb7ff] font-bold uppercase">Chest</span>
            </div>
          </div>
        </div>

        {/* Categories Horizontal Tabs */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-headline-sm text-sm uppercase tracking-wider text-white">
              Categories
            </span>
            <button
              onClick={() => onNavigate('games')}
              className="font-label-sm text-xs uppercase tracking-wider text-[#00f0ff] hover:underline"
              type="button"
            >
              View All (18)
            </button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar -mx-3 px-3 sm:mx-0 sm:px-0">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-full transition-all active:scale-95 ${
                    isActive
                      ? 'bg-[#00f0ff] text-[#00363a] shadow-[0_0_14px_rgba(0,240,255,0.4)] font-bold'
                      : 'bg-[#1a1b21] text-[#e3e1e9] hover:text-[#00f0ff] border border-white/5'
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-sm">{cat.icon}</span>
                  <span className="font-label-sm text-xs uppercase">{cat.label}</span>
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-[#0d0e13] text-[#00f0ff]' : 'bg-[#292a2f] text-[#b9cacb]'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Spotlight Arena Horizontal Cards */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00f0ff] text-xl">auto_awesome</span>
              <span className="font-headline-sm text-sm uppercase tracking-wider text-white">
                Spotlight Arena
              </span>
            </div>
            <div className="flex items-center gap-1 text-[#849495] text-xs">
              <span>Swipe</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar -mx-3 px-3 sm:mx-0 sm:px-0 snap-x snap-mandatory">
            {SPOTLIGHT_GAMES.map((game) => (
              <div
                key={game.id}
                onClick={() => onLaunchGame(game)}
                className="flex-shrink-0 w-[270px] snap-center rounded-2xl bg-[#1a1b21] border border-white/10 overflow-hidden shadow-xl flex flex-col cursor-pointer group hover:border-[#00f0ff]/50 transition-all"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b21] via-transparent to-black/40" />
                  
                  {/* Live player badge */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#0d0e13]/85 backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
                    <span className="font-label-sm text-[10px] uppercase tracking-wider text-white font-bold">
                      {game.onlinePlayers}
                    </span>
                  </div>

                  {/* Favorite button */}
                  <button
                    onClick={(e) => toggleFavorite(game.id, e)}
                    aria-label="Add to favorites"
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-[#0d0e13]/80 backdrop-blur-md flex items-center justify-center text-[#e3e1e9] hover:text-[#ffb4ab] transition-colors"
                  >
                    <span
                      className={`material-symbols-outlined text-base ${
                        favorites[game.id] ? 'text-rose-400' : ''
                      }`}
                      style={{ fontVariationSettings: favorites[game.id] ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      favorite
                    </span>
                  </button>

                  {/* Category chip */}
                  <div className="absolute bottom-2 left-2.5">
                    <span className="px-2 py-0.5 rounded bg-[#34343a] text-[10px] font-bold text-[#7df4ff] tracking-wider uppercase">
                      {game.category}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 flex flex-col gap-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-headline-sm text-sm font-bold uppercase tracking-wider text-white truncate max-w-[170px]">
                        {game.title}
                      </h3>
                      <div className="flex items-center gap-1 text-[11px] text-[#b9cacb]">
                        <span className="material-symbols-outlined text-xs text-amber-400" style={{ fontVariationSettings: "'FILL' 1" }}>
                          star
                        </span>
                        <span className="font-bold text-white">{game.rating}</span>
                        <span>({game.reviewCount} reviews)</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[9px] uppercase font-bold text-[#ddb7ff] tracking-wider">
                        {game.specs?.loadType || 'Fast Load'}
                      </span>
                      <span className="text-[10px] text-[#849495]">
                        {game.specs?.fps || game.specs?.refreshRate || '60 FPS'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onLaunchGame(game);
                    }}
                    className="w-full h-9 rounded-full bg-[#00f0ff] hover:bg-[#7df4ff] text-[#00363a] font-label-sm text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(0,240,255,0.3)] active:scale-95 transition-transform"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-sm">play_arrow</span>
                    <span>Launch Sim</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Grid */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ddb7ff] text-xl">trending_up</span>
              <span className="font-headline-sm text-sm uppercase tracking-wider text-white">
                Trending Grid
              </span>
            </div>
            <span className="font-label-sm text-xs uppercase tracking-wider text-[#b9cacb]">
              Live Heat
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {TRENDING_GAMES.map((game) => (
              <div
                key={game.id}
                onClick={() => onLaunchGame(game)}
                className="rounded-2xl bg-[#1a1b21] border border-white/5 p-2.5 flex flex-col gap-2 shadow-md relative group cursor-pointer hover:border-[#00f0ff]/40 transition-all"
              >
                <div className="relative h-28 w-full rounded-xl overflow-hidden">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-[#0d0e13]/80 backdrop-blur-sm text-[9px] font-bold text-[#7df4ff] uppercase tracking-wider">
                    {game.category}
                  </div>
                  <button
                    onClick={(e) => toggleFavorite(game.id, e)}
                    className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-[#0d0e13]/70 backdrop-blur-sm flex items-center justify-center text-white hover:text-rose-400"
                  >
                    <span
                      className={`material-symbols-outlined text-xs ${
                        favorites[game.id] ? 'text-rose-400' : ''
                      }`}
                      style={{ fontVariationSettings: favorites[game.id] ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      favorite
                    </span>
                  </button>
                </div>

                <div className="flex flex-col">
                  <span className="font-headline-sm text-xs font-bold text-white truncate">
                    {game.title}
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-[#b9cacb] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {game.onlinePlayers}
                    </span>
                    <span className="text-[10px] font-bold text-amber-400 flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      {game.rating}
                    </span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLaunchGame(game);
                  }}
                  className="w-full py-1.5 rounded-lg bg-[#292a2f] hover:bg-[#00f0ff] hover:text-[#00363a] text-white font-label-sm text-[10px] uppercase font-bold tracking-wider transition-all"
                  type="button"
                >
                  Play
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* New Drops */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00dbe9] text-xl">new_releases</span>
              <span className="font-headline-sm text-sm uppercase tracking-wider text-white">
                New Drops
              </span>
            </div>
            <span className="font-label-sm text-xs uppercase tracking-wider text-[#ddb7ff]">
              Updated 2h ago
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            {NEW_DROPS.map((drop) => (
              <div
                key={drop.id}
                onClick={() => onLaunchGame(drop)}
                className="rounded-2xl bg-[#1a1b21] border border-white/5 p-3 flex items-center justify-between shadow-md cursor-pointer hover:border-[#00f0ff]/40 transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={drop.image}
                      alt={drop.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-1 left-1 px-1 rounded bg-[#ddb7ff] text-[8px] font-bold text-[#121318] uppercase">
                      New
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-headline-sm text-xs font-bold uppercase text-white truncate">
                      {drop.title}
                    </span>
                    <span className="font-body-sm text-[11px] text-[#b9cacb] truncate">
                      {drop.subtitle}
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-[#00f0ff] font-semibold">
                        {drop.onlinePlayers}
                      </span>
                      <span className="text-[10px] text-[#849495]">• Instant Play</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5 shrink-0 pl-2">
                  <span className="font-label-sm text-[9px] uppercase px-2 py-0.5 rounded bg-[#34343a] text-[#ddb7ff] font-bold">
                    {drop.highlightBadge}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onLaunchGame(drop);
                    }}
                    className="px-3.5 py-1.5 rounded-full bg-[#00f0ff] hover:bg-[#7df4ff] text-[#00363a] font-label-sm text-[11px] uppercase font-bold tracking-wider shadow-[0_0_8px_rgba(0,240,255,0.3)] active:scale-95 transition-transform"
                    type="button"
                  >
                    Try Demo
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PlayZone Championship Registration Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-[#6f00be]/30 via-[#1a1b21] to-[#1a1b21] border border-[#6f00be]/40 p-4 flex items-center justify-between shadow-lg relative overflow-hidden">
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-11 h-11 rounded-full bg-[#6f00be] flex items-center justify-center text-[#ddb7ff] shadow-[0_0_12px_rgba(111,0,190,0.6)] shrink-0">
              <span className="material-symbols-outlined text-2xl">military_tech</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-xs font-bold text-white uppercase tracking-wider">
                PlayZone Championship
              </span>
              <span className="font-body-sm text-[11px] text-[#b9cacb]">
                Quarterfinal qualifiers open now • $5,000 Pot
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              playClaimSound();
              setRegisteredChampionship(true);
            }}
            className={`relative z-10 px-4 py-2 rounded-full font-headline-sm text-xs uppercase font-bold tracking-wider active:scale-95 transition-all shadow-md shrink-0 ${
              registeredChampionship
                ? 'bg-emerald-500 text-[#00363a]'
                : 'bg-[#00f0ff] text-[#00363a] shadow-[0_0_12px_rgba(0,240,255,0.4)] hover:bg-[#7df4ff]'
            }`}
            type="button"
          >
            {registeredChampionship ? 'Registered ✓' : 'Register'}
          </button>
        </div>

      </div>
    </div>
  );
};
