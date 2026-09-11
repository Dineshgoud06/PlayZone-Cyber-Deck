import React, { useState, useEffect } from 'react';
import { LeaderboardUser } from '../types';
import {
  LEADERBOARD_TOP_THREE,
  LEADERBOARD_RUNNERS,
  CURRENT_USER_PROFILE
} from '../data/mockData';
import { playClickSound } from '../utils/audio';

export const RanksView: React.FC = () => {
  const [scope, setScope] = useState<'global' | 'regional' | 'friends'>('global');
  const [timeframe, setTimeframe] = useState<'all' | 'season' | 'weekly'>('season');
  const [timeLeft, setTimeLeft] = useState({ hours: 62, minutes: 14, seconds: 22 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [second, first, third] = LEADERBOARD_TOP_THREE;

  return (
    <div className="flex flex-col w-full pb-28 animate-fadeIn">
      <div className="flex flex-col px-3 sm:px-4 max-w-4xl mx-auto w-full gap-4">

        {/* Header & Championship Timer Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-[#1a1b21] p-4 border border-white/10 shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#6f00be]/30 via-[#00f0ff]/10 to-transparent blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#6f00be] text-[10px] font-bold text-[#ddb7ff] uppercase tracking-wider">
                  Live Stage 04
                </span>
                <span className="text-[11px] font-mono text-[#00f0ff] uppercase tracking-widest">
                  // GLOBAL ARENA
                </span>
              </div>
              <h1 className="font-headline-lg-mobile text-xl sm:text-2xl text-white uppercase tracking-tight mt-1">
                SEASON 04 LEADERBOARD
              </h1>
              <p className="text-xs text-[#b9cacb] mt-0.5">
                Top 100 players qualify for the $5,000 USD Vault Invitational
              </p>
            </div>

            {/* Countdown Badge */}
            <div className="flex items-center gap-2 bg-[#0d0e13]/80 px-3.5 py-2 rounded-xl border border-white/10 shrink-0">
              <span className="material-symbols-outlined text-[#00f0ff] text-lg animate-spin">
                timer
              </span>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase font-bold text-[#849495]">Ends in</span>
                <span className="font-mono text-xs font-bold text-white tracking-wider">
                  {Math.floor(timeLeft.hours / 24)}d {timeLeft.hours % 24}h {timeLeft.minutes}m {timeLeft.seconds}s
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scope Filters (Global / Regional / Friends) */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center bg-[#0d0e13] p-1 rounded-full border border-white/5">
            {(['global', 'regional', 'friends'] as const).map((s) => (
              <button
                key={s}
                onClick={() => {
                  playClickSound();
                  setScope(s);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-label-md uppercase tracking-wider transition-all ${
                  scope === s
                    ? 'bg-[#00f0ff] text-[#00363a] font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                    : 'text-[#849495] hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Timeframe Pills */}
          <div className="flex items-center gap-1">
            {(['all', 'season', 'weekly'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => {
                  playClickSound();
                  setTimeframe(tf);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-label-sm uppercase transition-all ${
                  timeframe === tf
                    ? 'bg-[#292a2f] text-[#00f0ff] border border-[#00f0ff]/40'
                    : 'text-[#849495] hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Podium: Top 3 Champions */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 items-end pt-3 pb-2">
          {/* 2nd Place (Silver) */}
          <div className="flex flex-col items-center bg-[#1a1b21] p-2.5 sm:p-3 rounded-2xl border border-slate-400/30 relative">
            <span className="absolute -top-3 w-6 h-6 rounded-full bg-slate-400 text-black font-bold text-xs flex items-center justify-center shadow-md">
              2
            </span>
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-1 ring-2 ring-slate-400/80 mt-1 mb-2">
              <img
                src={second.avatar}
                alt={second.username}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <span className="font-headline-sm text-xs sm:text-sm text-white font-bold truncate max-w-full">
              {second.username}
            </span>
            <span className="text-[10px] text-slate-300 font-mono font-bold mt-0.5">
              {second.points.toLocaleString()} PTS
            </span>
            <span className="text-[9px] text-[#849495] mt-0.5">
              {second.winRate}% WR • LVL {second.level}
            </span>
          </div>

          {/* 1st Place (Gold / Neon Cyan Champion) */}
          <div className="flex flex-col items-center bg-[#1a1b21] p-3 sm:p-4 rounded-2xl border border-[#00f0ff] shadow-[0_0_24px_rgba(0,240,255,0.25)] relative scale-105 z-10">
            <span className="absolute -top-4 w-8 h-8 rounded-full bg-[#00f0ff] text-[#00363a] font-bold text-sm flex items-center justify-center shadow-[0_0_12px_#00f0ff]">
              👑
            </span>
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 ring-4 ring-[#00f0ff] shadow-[0_0_16px_rgba(0,240,255,0.6)] mt-2 mb-2">
              <img
                src={first.avatar}
                alt={first.username}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <span className="font-headline-sm text-xs sm:text-base text-white font-bold tracking-wider truncate max-w-full">
              {first.username}
            </span>
            <span className="text-xs text-[#00f0ff] font-mono font-bold mt-0.5">
              {first.points.toLocaleString()} PTS
            </span>
            <span className="text-[10px] text-[#ddb7ff] font-bold mt-0.5">
              {first.winRate}% WR • LVL {first.level}
            </span>
            <span className="mt-1 px-2 py-0.2 rounded-full bg-[#6f00be]/60 text-[8px] font-bold text-white uppercase">
              Champion
            </span>
          </div>

          {/* 3rd Place (Bronze) */}
          <div className="flex flex-col items-center bg-[#1a1b21] p-2.5 sm:p-3 rounded-2xl border border-amber-600/30 relative">
            <span className="absolute -top-3 w-6 h-6 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center shadow-md">
              3
            </span>
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-1 ring-2 ring-amber-600/80 mt-1 mb-2">
              <img
                src={third.avatar}
                alt={third.username}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <span className="font-headline-sm text-xs sm:text-sm text-white font-bold truncate max-w-full">
              {third.username}
            </span>
            <span className="text-[10px] text-amber-300 font-mono font-bold mt-0.5">
              {third.points.toLocaleString()} PTS
            </span>
            <span className="text-[9px] text-[#849495] mt-0.5">
              {third.winRate}% WR • LVL {third.level}
            </span>
          </div>
        </div>

        {/* Runners Up Table (Ranks 4-8) */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-3 text-[11px] uppercase font-bold text-[#849495]">
            <div className="flex items-center gap-4">
              <span>Rank</span>
              <span>Player</span>
            </div>
            <div className="flex items-center gap-6">
              <span>Points</span>
              <span className="hidden sm:inline">Win Rate</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {LEADERBOARD_RUNNERS.map((user) => (
              <div
                key={user.rank}
                className="flex items-center justify-between p-3 rounded-2xl bg-[#1a1b21] border border-white/5 hover:border-white/20 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-7 text-center font-headline-sm text-sm font-bold text-[#b9cacb]">
                    #{user.rank}
                  </div>
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-white/10">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-headline-sm text-xs sm:text-sm font-bold text-white truncate">
                      {user.username}
                    </span>
                    <div className="flex items-center gap-2 text-[10px] text-[#849495]">
                      <span>LVL {user.level}</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-semibold">{user.trend}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                  <div className="flex flex-col items-end">
                    <span className="font-mono text-xs sm:text-sm font-bold text-[#7df4ff]">
                      {user.points.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-[#849495] uppercase sm:hidden">
                      {user.winRate}% WR
                    </span>
                  </div>
                  <div className="hidden sm:flex flex-col items-end w-14">
                    <span className="text-xs font-bold text-white">{user.winRate}%</span>
                    <span className="text-[9px] text-[#849495]">WR</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Sticky Bottom User Standing Bar */}
      <div className="fixed bottom-16 inset-x-0 z-40 bg-[#0d0e13]/95 backdrop-blur-xl border-t border-[#00f0ff]/30 p-3 shadow-2xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <span className="text-[9px] uppercase font-bold text-[#00f0ff]">YOU</span>
              <span className="font-headline-sm text-sm font-bold text-white">#42</span>
            </div>
            <div className="w-10 h-10 rounded-full p-0.5 ring-2 ring-[#00f0ff] overflow-hidden shrink-0">
              <img
                src={CURRENT_USER_PROFILE.avatar}
                alt="Phantom_Byte"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-xs sm:text-sm font-bold text-white">
                {CURRENT_USER_PROFILE.username}
              </span>
              <span className="text-[10px] text-[#b9cacb]">
                {CURRENT_USER_PROFILE.points.toLocaleString()} PTS • {CURRENT_USER_PROFILE.tier}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] text-[#849495]">Next Tier (Diamond)</span>
              <span className="text-xs font-bold text-emerald-400">+3,200 PTS</span>
            </div>
            <button
              onClick={() => playClickSound()}
              className="px-3.5 py-1.5 rounded-full bg-[#00f0ff] hover:bg-[#7df4ff] text-[#00363a] font-label-sm text-xs uppercase font-bold tracking-wider shadow-[0_0_12px_rgba(0,240,255,0.4)] active:scale-95"
            >
              Grind +XP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
