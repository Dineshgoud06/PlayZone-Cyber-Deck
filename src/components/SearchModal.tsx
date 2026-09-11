import React, { useState, useMemo } from 'react';
import { GameItem } from '../types';
import { CATALOG_GAMES, SPOTLIGHT_GAMES, TRENDING_GAMES } from '../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectGame: (game: GameItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectGame
}) => {
  const [query, setQuery] = useState('');
  const allGames = useMemo(() => {
    const map = new Map<string, GameItem>();
    [...CATALOG_GAMES, ...SPOTLIGHT_GAMES, ...TRENDING_GAMES].forEach(g => map.set(g.id, g));
    return Array.from(map.values());
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return allGames.slice(0, 6);
    const q = query.toLowerCase();
    return allGames.filter(
      g =>
        g.title.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q) ||
        g.subtitle.toLowerCase().includes(q) ||
        g.tags.some(t => t.toLowerCase().includes(q))
    );
  }, [query, allGames]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 pt-16 sm:pt-20 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#1a1b21] border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-3 border-b border-white/10 flex items-center gap-2 bg-[#0d0e13]">
          <span className="material-symbols-outlined text-[#00f0ff] text-xl pl-1">search</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 2,500+ games, cyber simulators, genres..."
            autoFocus
            className="flex-1 bg-transparent text-sm text-white placeholder-[#849495] outline-none font-body-md"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="w-7 h-7 rounded-full bg-white/10 text-[#b9cacb] hover:text-white flex items-center justify-center text-xs"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-full bg-[#292a2f] text-xs text-[#e3e1e9] font-label-sm uppercase hover:bg-white/10"
          >
            Esc
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 overflow-y-auto flex flex-col gap-2 divide-y divide-white/5 no-scrollbar">
          <span className="text-[11px] font-bold text-[#849495] uppercase tracking-wider px-1">
            {query.trim() ? `Found ${results.length} results` : 'Popular & Trending Now'}
          </span>

          {results.length === 0 ? (
            <div className="py-8 text-center text-sm text-[#849495]">
              No simulations found matching &quot;{query}&quot;
            </div>
          ) : (
            results.map((game) => (
              <div
                key={game.id}
                onClick={() => {
                  onSelectGame(game);
                  onClose();
                }}
                className="pt-2 flex items-center justify-between p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-12 h-12 rounded-lg object-cover shrink-0 border border-white/10 group-hover:border-[#00f0ff]"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-bold text-[#e3e1e9] group-hover:text-[#00f0ff] truncate font-headline-sm">
                      {game.title}
                    </span>
                    <span className="text-xs text-[#849495] truncate">{game.subtitle}</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-[#00f0ff] font-semibold">{game.onlinePlayers}</span>
                      <span className="text-[10px] text-amber-400 font-bold flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        {game.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="px-3 py-1.5 rounded-full bg-[#00f0ff]/10 group-hover:bg-[#00f0ff] text-[#00f0ff] group-hover:text-[#00363a] font-label-sm text-[11px] uppercase font-bold tracking-wider shrink-0 transition-all">
                  Launch
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
