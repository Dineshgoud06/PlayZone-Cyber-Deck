import React from 'react';
import { GameItem } from '../types';

interface GameLauncherModalProps {
  game: GameItem | null;
  onClose: () => void;
  onLaunchArena: (gameId?: string) => void;
}

export const GameLauncherModal: React.FC<GameLauncherModalProps> = ({
  game,
  onClose,
  onLaunchArena
}) => {
  if (!game) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-md bg-[#1a1b21] border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Banner with close button */}
        <div className="relative w-full h-44 sm:h-52 bg-cover bg-center overflow-hidden">
          <img
            src={game.image}
            alt={game.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b21] via-[#1a1b21]/40 to-black/60" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0d0e13]/90 text-[#7df4ff] text-[11px] font-bold uppercase tracking-wider backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
              {game.onlinePlayers}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#6f00be]/80 text-[#d6a9ff] text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
              {game.category}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-white/20 text-[#e3e1e9] flex items-center justify-center backdrop-blur-md transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>

          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
            <div>
              <h2 className="font-headline-sm text-xl sm:text-2xl text-white drop-shadow-md">
                {game.title}
              </h2>
              <p className="text-xs text-[#b9cacb] mt-0.5">{game.subtitle}</p>
            </div>
            <div className="flex items-center gap-1 bg-[#121318]/90 px-2.5 py-1 rounded-lg border border-white/10 shrink-0">
              <span className="material-symbols-outlined text-[#00f0ff] text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              <span className="text-sm font-bold text-white">{game.rating}</span>
              <span className="text-[10px] text-[#849495]">({game.reviewCount})</span>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-5 flex flex-col gap-4">
          {/* Cloud Rig Telemetry */}
          <div className="grid grid-cols-3 gap-2 bg-[#121318] p-2.5 rounded-xl border border-white/5 text-center">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#849495] uppercase font-bold">Latency</span>
              <span className="text-xs font-bold text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                16ms (Direct)
              </span>
            </div>
            <div className="flex flex-col border-x border-white/10">
              <span className="text-[10px] text-[#849495] uppercase font-bold">Node</span>
              <span className="text-xs font-bold text-[#7df4ff] mt-0.5">Tokyo-Edge 04</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-[#849495] uppercase font-bold">Framerate</span>
              <span className="text-xs font-bold text-[#ddb7ff] mt-0.5">120 FPS Max</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {game.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-full bg-[#292a2f] text-[11px] font-medium text-[#b9cacb]"
              >
                {tag}
              </span>
            ))}
            {game.bounty && (
              <span className="px-2.5 py-1 rounded-full bg-[#6f00be]/40 text-[11px] font-bold text-[#f0dbff] border border-[#6f00be]">
                {game.bounty}
              </span>
            )}
          </div>

          <p className="text-xs text-[#b9cacb] leading-relaxed">
            Zero install required. Game assets stream instantly via WebGL 2.0 / WebGPU container protocols with synchronized cloud save and low-latency input buffers.
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => {
                onClose();
                onLaunchArena(game.id);
              }}
              className="flex-1 py-3 px-4 rounded-full bg-[#00f0ff] hover:bg-[#7df4ff] text-[#00363a] font-headline-sm text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_18px_rgba(0,240,255,0.4)] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-lg">sports_esports</span>
              <span>Launch in Arena</span>
            </button>
            <button
              onClick={onClose}
              className="py-3 px-4 rounded-full bg-[#292a2f] hover:bg-[#34343a] text-[#e3e1e9] font-label-sm text-xs font-semibold uppercase tracking-wider active:scale-95 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
