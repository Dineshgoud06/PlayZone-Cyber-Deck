import React from 'react';
import { ScreenTab } from '../types';
import { PLAYZONE_LOGO, USER_AVATAR } from '../data/mockData';

interface HeaderProps {
  currentTab: ScreenTab;
  onTabChange: (tab: ScreenTab) => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  onOpenSearch,
  onOpenNotifications,
  unreadCount = 1
}) => {
  const getTabTitle = (tab: ScreenTab) => {
    switch (tab) {
      case 'home': return 'Home';
      case 'games': return 'Games';
      case 'arena': return 'Arena';
      case 'ranks': return 'Leaderboard';
      case 'profile': return 'Profile';
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#0d0e13]/85 backdrop-blur-xl border-b border-white/[0.06] pt-safe">
      <div className="h-16 px-3 sm:px-4 max-w-5xl mx-auto flex items-center justify-between gap-2">
        {/* Brand Identity */}
        <button
          onClick={() => onTabChange('home')}
          className="flex items-center gap-2 group text-left transition-transform active:scale-95"
          aria-label="Go to Home"
        >
          <div className="relative flex items-center justify-center">
            <img
              src={PLAYZONE_LOGO}
              alt="PlayZone Logo"
              className="h-8 w-auto object-contain drop-shadow-[0_0_10px_rgba(0,240,255,0.4)]"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-lg sm:text-xl tracking-wider uppercase text-[#7df4ff] drop-shadow-[0_0_12px_rgba(0,240,255,0.5)]">
              PLAYZONE
            </span>
            <span className="text-[10px] text-[#849495] tracking-widest uppercase font-mono -mt-1 hidden sm:block">
              {getTabTitle(currentTab)}
            </span>
          </div>
        </button>

        {/* Global Action Tools */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            aria-label="Search Games"
            className="w-10 h-10 flex items-center justify-center rounded-full text-[#b9cacb] hover:text-[#00f0ff] hover:bg-white/5 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          {/* Notifications */}
          <button
            onClick={onOpenNotifications}
            aria-label="Notifications"
            className="w-10 h-10 flex items-center justify-center rounded-full relative text-[#b9cacb] hover:text-[#00f0ff] hover:bg-white/5 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff] ring-2 ring-[#0d0e13]" />
            )}
          </button>

          {/* Profile Preview Avatar */}
          <button
            onClick={() => onTabChange('profile')}
            aria-label="View Profile"
            className="relative flex items-center justify-center pl-1 group active:scale-95 transition-transform"
          >
            <div className={`w-9 h-9 rounded-full p-0.5 transition-all ${
              currentTab === 'profile'
                ? 'ring-2 ring-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.6)]'
                : 'ring-1 ring-white/20 group-hover:ring-[#00f0ff]/50'
            }`}>
              <img
                src={USER_AVATAR}
                alt="Player Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#121318] shadow-[0_0_6px_#10b981]" />
          </button>
        </div>
      </div>
    </header>
  );
};
