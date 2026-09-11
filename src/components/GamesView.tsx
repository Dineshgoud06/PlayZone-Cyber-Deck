import React, { useState, useMemo } from 'react';
import { GameItem } from '../types';
import { CATALOG_GAMES, SPOTLIGHT_GAMES } from '../data/mockData';
import { playClickSound } from '../utils/audio';

interface GamesViewProps {
  onLaunchGame: (game: GameItem) => void;
}

export const GamesView: React.FC<GamesViewProps> = ({ onLaunchGame }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest' | 'players'>('popular');
  const [instantOnly, setInstantOnly] = useState(false);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    'cyber-drift-velocity': true
  });
  const [loadedCount, setLoadedCount] = useState(5);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const allAvailableGames = useMemo(() => {
    // Combine catalog and spotlight to allow full filtering
    const combined = [...CATALOG_GAMES];
    SPOTLIGHT_GAMES.forEach(sg => {
      if (!combined.some(c => c.id === sg.id)) {
        combined.push({
          ...sg,
          isInstant: true,
          tags: [...sg.tags, 'Cloud Ready']
        });
      }
    });
    return combined;
  }, []);

  const filteredGames = useMemo(() => {
    return allAvailableGames.filter((game) => {
      if (instantOnly && !game.isInstant) return false;
      if (selectedGenre !== 'all') {
        if (selectedGenre === 'action' && game.genre !== 'action') return false;
        if (selectedGenre === 'racing' && game.genre !== 'racing') return false;
        if (selectedGenre === 'strategy' && game.genre !== 'strategy') return false;
        if (selectedGenre === 'arcade' && game.genre !== 'arcade') return false;
        if (selectedGenre === 'multiplayer' && game.genre !== 'multiplayer') return false;
        if (selectedGenre === 'top' && game.rating < 4.8) return false;
        if (selectedGenre === 'instant' && !game.isInstant) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = game.title.toLowerCase().includes(q);
        const matchesSubtitle = game.subtitle.toLowerCase().includes(q);
        const matchesTags = game.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSubtitle && !matchesTags) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'players') return b.onlineCountNum - a.onlineCountNum;
      return 0; // Default popular
    });
  }, [allAvailableGames, selectedGenre, searchQuery, instantOnly, sortBy]);

  const displayedGames = filteredGames.slice(0, loadedCount);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setLoadedCount(prev => Math.min(filteredGames.length, prev + 3));
      setIsLoadingMore(false);
    }, 600);
  };

  const filterPills = [
    { id: 'all', label: 'All' },
    { id: 'action', label: 'Action' },
    { id: 'racing', label: 'Racing' },
    { id: 'strategy', label: 'RPG / Strategy' },
    { id: 'arcade', label: 'Arcade' },
    { id: 'multiplayer', label: 'Multiplayer' },
    { id: 'top', label: 'Top Rated' },
    { id: 'instant', label: 'Browser Instant' },
  ];

  return (
    <div className="flex flex-col w-full pb-24 animate-fadeIn">
      <div className="flex flex-col px-3 sm:px-4 max-w-4xl mx-auto w-full gap-4">

        {/* Telemetry & Active Status Bar */}
        <div className="flex items-center justify-between bg-[#1a1b21] rounded-2xl px-4 py-2.5 shadow-md border border-white/5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00f0ff]" />
            </span>
            <span className="font-label-sm text-xs uppercase tracking-wider text-[#b9cacb]">
              Cloud Node: Tokyo-04
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-[#00f0ff]">bolt</span>
              <span className="font-label-sm text-xs uppercase text-[#00f0ff] tracking-wider font-bold">
                18ms Ultra-Low
              </span>
            </div>
            <span className="text-[#849495] text-xs">•</span>
            <span className="font-label-sm text-xs uppercase text-[#f0dbff] tracking-wider">
              99.9% Online
            </span>
          </div>
        </div>

        {/* Search & Live Filters Shell */}
        <div className="relative flex items-center w-full">
          <span className="material-symbols-outlined absolute left-4 text-[#849495] pointer-events-none text-xl">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 2,500+ games, genres, developers..."
            className="w-full bg-[#0d0e13] text-white placeholder:text-[#849495]/70 font-body-md text-sm pl-12 pr-24 py-3 rounded-full outline-none border border-white/10 focus:border-[#00f0ff] shadow-sm transition-all"
          />
          <div className="absolute right-2 flex items-center gap-1">
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear Search"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#849495] hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
            <button
              onClick={() => {
                // Focus on search or toggle instant
                setInstantOnly(!instantOnly);
              }}
              title="Filter Instant Play"
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                instantOnly
                  ? 'bg-[#00f0ff] text-[#00363a]'
                  : 'bg-[#292a2f] text-[#00f0ff] hover:bg-[#34343a]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
            </button>
          </div>
        </div>

        {/* Horizontal Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar -mx-3 px-3 sm:mx-0 sm:px-0">
          {filterPills.map((pill) => {
            const isActive = selectedGenre === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => {
                  playClickSound();
                  setSelectedGenre(pill.id);
                }}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full font-label-md text-xs tracking-wider uppercase transition-all select-none ${
                  isActive
                    ? 'bg-[#00f0ff] text-[#00363a] font-bold shadow-[0_0_14px_rgba(0,240,255,0.4)]'
                    : 'bg-[#1e1f25] text-[#b9cacb] hover:text-white border border-white/5'
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>

        {/* Sort Controls & Instant Play Switch */}
        <div className="flex items-center justify-between bg-[#0d0e13] rounded-2xl px-4 py-2.5 shadow-md border border-white/5">
          <div className="flex items-center gap-2">
            <span className="font-label-sm text-xs uppercase text-[#849495] tracking-wider">
              Sort:
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-[#1e1f25] text-[#e3e1e9] font-label-md text-xs rounded-lg pl-3 pr-7 py-1.5 outline-none cursor-pointer border border-white/10 focus:border-[#00f0ff]"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rating</option>
                <option value="players">Active Players</option>
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-[#849495] text-[16px]">
                expand_more
              </span>
            </div>
          </div>

          {/* Instant Play Toggle Switch */}
          <div
            onClick={() => {
              playClickSound();
              setInstantOnly(!instantOnly);
            }}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <span className="font-label-sm text-xs uppercase tracking-wider text-[#b9cacb]">
              Instant Play
            </span>
            <div
              className={`w-10 h-6 rounded-full p-0.5 flex items-center transition-colors ${
                instantOnly ? 'bg-[#00f0ff]' : 'bg-[#292a2f]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  instantOnly ? 'translate-x-4 bg-[#00363a]' : 'translate-x-0'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Catalog Summary Bar */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-lg text-[#00f0ff]">filter_list</span>
            <span className="font-label-md text-xs text-white font-semibold">
              Showing {displayedGames.length} of {filteredGames.length} games
            </span>
            <span className="font-label-sm text-[10px] text-[#849495] uppercase tracking-wider hidden sm:inline">
              in {selectedGenre === 'all' ? 'All Genres' : selectedGenre.toUpperCase()}
            </span>
          </div>
          <span className="font-label-sm text-[10px] text-[#f0dbff] bg-[#6f00be]/30 px-2.5 py-0.5 rounded-full border border-[#6f00be]/50">
            Global Arena
          </span>
        </div>

        {/* Game Cards Feed (Single Column Bento Stack) */}
        <div className="flex flex-col gap-4 w-full">
          {displayedGames.map((game) => (
            <div
              key={game.id}
              onClick={() => onLaunchGame(game)}
              className="relative flex flex-col bg-[#1a1b21] border border-white/10 hover:border-[#00f0ff]/50 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 group cursor-pointer"
            >
              {/* Media Card Header */}
              <div className="relative w-full h-44 sm:h-52 overflow-hidden">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b21] via-[#1a1b21]/30 to-transparent" />

                {/* Badges in header */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  {game.isInstant && (
                    <span className="flex items-center gap-1.5 bg-[#0d0e13]/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow border border-white/5">
                      <span className="w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_6px_#00f0ff]" />
                      <span className="font-label-sm text-[10px] uppercase tracking-wider text-[#7df4ff]">
                        Instant Play
                      </span>
                    </span>
                  )}
                  {game.highlightBadge && (
                    <span className="bg-[#6f00be]/80 backdrop-blur-md text-[#d6a9ff] px-2.5 py-1 rounded-full font-label-sm text-[10px] uppercase tracking-wider">
                      {game.highlightBadge}
                    </span>
                  )}
                </div>

                {/* Favorite Button */}
                <button
                  onClick={(e) => toggleFavorite(game.id, e)}
                  aria-label="Favorite Game"
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#0d0e13]/80 backdrop-blur-md flex items-center justify-center text-[#e3e1e9] hover:text-[#ffb4ab] transition-colors"
                >
                  <span
                    className={`material-symbols-outlined text-lg ${
                      favorites[game.id] ? 'text-rose-400' : ''
                    }`}
                    style={{ fontVariationSettings: favorites[game.id] ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                </button>

                {/* Online Player Count Overlay */}
                <div className="absolute bottom-2 right-3 flex items-center gap-1 bg-[#0d0e13]/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/5">
                  <span className="material-symbols-outlined text-xs text-[#00f0ff]">sensors</span>
                  <span className="font-label-sm text-[11px] text-white font-semibold">
                    {game.onlinePlayers}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-headline-sm text-base sm:text-lg text-white truncate">
                      {game.title}
                    </h3>
                    <p className="font-body-sm text-xs text-[#b9cacb] truncate mt-0.5">
                      {game.subtitle}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-[#121318] px-2 py-1 rounded-lg border border-white/5 shrink-0">
                    <span className="material-symbols-outlined text-[#00f0ff] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="font-label-md text-xs font-bold text-white">
                      {game.rating}
                    </span>
                    <span className="font-label-sm text-[10px] text-[#849495]">
                      ({game.reviewCount})
                    </span>
                  </div>
                </div>

                {/* Metric Chips */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {game.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="bg-[#121318] px-2.5 py-1 rounded-full font-label-sm text-[10px] uppercase tracking-wider text-[#b9cacb] border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                  {game.bounty && (
                    <span className="bg-[#6f00be]/30 px-2.5 py-1 rounded-full font-label-sm text-[10px] uppercase tracking-wider text-[#ddb7ff] border border-[#6f00be]">
                      {game.bounty}
                    </span>
                  )}
                </div>

                {/* Action Row */}
                <div className="flex items-center justify-between pt-1 border-t border-white/5">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#ddb7ff] text-base">verified_user</span>
                    <span className="font-label-sm text-[10px] text-[#849495] uppercase">
                      Anti-Cheat Active
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onLaunchGame(game);
                    }}
                    className="px-5 py-2 rounded-full bg-[#00f0ff] hover:bg-[#7df4ff] text-[#00363a] font-label-md text-xs tracking-wider uppercase font-bold flex items-center gap-1.5 shadow-[0_0_16px_rgba(0,240,255,0.4)] active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">play_arrow</span>
                    <span>Play Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {loadedCount < filteredGames.length && (
          <div className="pt-2 pb-4 flex flex-col items-center justify-center gap-2">
            <button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#292a2f] hover:bg-[#34343a] text-[#7df4ff] font-label-lg text-xs tracking-wider uppercase font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.15)] border border-white/10 active:scale-98 transition-all"
            >
              <span className={`material-symbols-outlined text-lg text-[#00f0ff] ${isLoadingMore ? 'animate-spin' : ''}`}>
                sync
              </span>
              <span>{isLoadingMore ? 'Synchronizing Nodes...' : 'Load More Games'}</span>
              <span className="font-label-sm text-xs text-[#849495]">
                ({filteredGames.length - loadedCount} remaining)
              </span>
            </button>
            <p className="font-label-sm text-[11px] uppercase text-[#849495] tracking-wider text-center">
              Displaying {displayedGames.length} of {filteredGames.length} games • Zero downloads required
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
