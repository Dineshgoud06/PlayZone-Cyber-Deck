import React from 'react';
import { ScreenTab } from '../types';

interface BottomNavProps {
  activeTab: ScreenTab;
  onTabChange: (tab: ScreenTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const navItems: { id: ScreenTab; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: 'sports_esports' },
    { id: 'games', label: 'Games', icon: 'grid_view' },
    { id: 'arena', label: 'Arena', icon: 'local_fire_department' },
    { id: 'ranks', label: 'Ranks', icon: 'military_tech' },
    { id: 'profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-[#0d0e13]/92 backdrop-blur-2xl border-t border-white/[0.08] shadow-[0_-4px_24px_rgba(0,0,0,0.6)]"
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="flex justify-around items-center h-16 max-w-xl mx-auto px-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`relative flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[44px] py-1 px-2 rounded-xl transition-all duration-200 select-none ${
                isActive
                  ? 'text-[#00f0ff] drop-shadow-[0_0_10px_rgba(0,240,255,0.7)] font-semibold scale-105'
                  : 'text-[#849495] hover:text-[#e3e1e9] hover:bg-white/[0.03]'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className={`material-symbols-outlined text-[23px] transition-transform ${
                isActive ? 'scale-110' : ''
              }`}>
                {item.icon}
              </span>
              <span className="font-label-sm text-[10px] tracking-wider uppercase">
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
