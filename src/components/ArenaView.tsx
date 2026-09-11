import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ARENA_MINI_GAMES } from '../data/mockData';
import {
  playLaserSound,
  playShieldSound,
  playExplosionSound,
  playClickSound
} from '../utils/audio';

export const ArenaView: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Active game mode: 'cyber-runner' | 'snake' | 'tictactoe'
  const [activeGameId, setActiveGameId] = useState<string>('cyber-runner');

  // Game state
  const [score, setScore] = useState(14850);
  const [bestScore, setBestScore] = useState(32400);
  const [streak, setStreak] = useState(3);
  const [shields, setShields] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const [fps, setFps] = useState(60);

  // Snake game states (when activeGameId === 'snake-cyber')
  const [snakeScore, setSnakeScore] = useState(0);
  const [snakeGameOver, setSnakeGameOver] = useState(false);

  // Tic-Tac-Toe states (when activeGameId === 'neon-matrix-3x')
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  // Game Engine Reference Object for 60fps loop
  const engineRef = useRef({
    width: 480,
    height: 360,
    ship: { x: 240, y: 280, vx: 0, vy: 0, size: 14, shieldActive: false, shieldTimer: 0 },
    lasers: [] as { x: number; y: number; vy: number; color: string }[],
    stars: [] as { x: number; y: number; speed: number; size: number }[],
    enemies: [
      { x: 120, y: 60, vx: 1.5, size: 12, hp: 2, color: '#ddb7ff' },
      { x: 330, y: 90, vx: -1.2, size: 14, hp: 3, color: '#00f0ff' },
      { x: 240, y: 40, vx: 0.8, size: 10, hp: 1, color: '#ffb4ab' },
      { x: 180, y: 110, vx: -1.0, size: 11, hp: 2, color: '#7df4ff' }
    ],
    particles: [] as { x: number; y: number; vx: number; vy: number; life: number; color: string }[],
    gridOffset: 0,
    animFrameId: 0,
    lastTime: performance.now(),
    frameCount: 0
  });

  // Firing action
  const handleFire = useCallback(() => {
    if (isPaused) return;
    const engine = engineRef.current;
    if (!audioMuted) playLaserSound();

    engine.lasers.push({
      x: engine.ship.x,
      y: engine.ship.y - 12,
      vy: -7.5,
      color: '#00f0ff'
    });

    if (streak >= 3) {
      engine.lasers.push({ x: engine.ship.x - 7, y: engine.ship.y - 8, vy: -7, color: '#dbfcff' });
      engine.lasers.push({ x: engine.ship.x + 7, y: engine.ship.y - 8, vy: -7, color: '#dbfcff' });
    }
  }, [isPaused, audioMuted, streak]);

  // Shield action
  const handleShield = useCallback(() => {
    if (isPaused) return;
    const engine = engineRef.current;
    if (shields <= 0 && !engine.ship.shieldActive) return;

    if (!audioMuted) playShieldSound();
    engine.ship.shieldActive = true;
    engine.ship.shieldTimer = 180;
  }, [isPaused, audioMuted, shields]);

  // D-Pad motion
  const handleMove = useCallback((dx: number, dy: number) => {
    if (isPaused) return;
    const engine = engineRef.current;
    engine.ship.vx += dx * 4.2;
    engine.ship.vy += dy * 4.2;
  }, [isPaused]);

  // Canvas loop
  useEffect(() => {
    if (activeGameId !== 'cyber-runner') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      engineRef.current.width = rect.width;
      engineRef.current.height = rect.height;
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    // Initialize stars
    if (engineRef.current.stars.length === 0) {
      engineRef.current.stars = Array.from({ length: 45 }, () => ({
        x: Math.random() * engineRef.current.width,
        y: Math.random() * engineRef.current.height,
        speed: 0.8 + Math.random() * 2.5,
        size: 1 + Math.random() * 1.5
      }));
    }

    let lastFpsCheck = performance.now();
    let framesThisSec = 0;

    const render = (time: number) => {
      framesThisSec++;
      if (time - lastFpsCheck >= 1000) {
        setFps(framesThisSec);
        framesThisSec = 0;
        lastFpsCheck = time;
      }

      const engine = engineRef.current;
      const { width, height, ship, lasers, stars, enemies, particles } = engine;

      if (!isPaused) {
        // Deep obsidian background
        ctx.fillStyle = '#0d0e13';
        ctx.fillRect(0, 0, width, height);

        // Neon cyber grid
        engine.gridOffset = (engine.gridOffset + 1.2) % 24;
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
        ctx.lineWidth = 1;
        for (let x = 0; x < width; x += 32) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = engine.gridOffset; y < height; y += 24) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Stars
        ctx.fillStyle = 'rgba(219, 252, 255, 0.6)';
        for (const star of stars) {
          star.y += star.speed;
          if (star.y > height) {
            star.y = 0;
            star.x = Math.random() * width;
          }
          ctx.fillRect(star.x, star.y, star.size, star.size);
        }

        // Lasers
        for (let i = lasers.length - 1; i >= 0; i--) {
          const l = lasers[i];
          l.y += l.vy;
          ctx.fillStyle = l.color;
          ctx.shadowColor = '#00f0ff';
          ctx.shadowBlur = 8;
          ctx.fillRect(l.x - 1.5, l.y, 3, 10);
          ctx.shadowBlur = 0;

          if (l.y < -15) lasers.splice(i, 1);
        }

        // Enemies
        for (const e of enemies) {
          e.x += e.vx;
          if (e.x < e.size || e.x > width - e.size) e.vx *= -1;

          ctx.fillStyle = e.color;
          ctx.shadowColor = e.color;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.moveTo(e.x, e.y + e.size);
          ctx.lineTo(e.x - e.size, e.y - e.size);
          ctx.lineTo(e.x + e.size, e.y - e.size);
          ctx.closePath();
          ctx.fill();
          ctx.shadowBlur = 0;

          // Laser collisions
          for (let li = lasers.length - 1; li >= 0; li--) {
            const l = lasers[li];
            const dist = Math.hypot(l.x - e.x, l.y - e.y);
            if (dist < e.size + 4) {
              lasers.splice(li, 1);
              if (!audioMuted) playExplosionSound();

              // Spawn particles
              for (let p = 0; p < 12; p++) {
                const angle = Math.random() * Math.PI * 2;
                const spd = 1 + Math.random() * 3.5;
                particles.push({
                  x: e.x,
                  y: e.y,
                  vx: Math.cos(angle) * spd,
                  vy: Math.sin(angle) * spd,
                  life: 22,
                  color: e.color
                });
              }

              // Update Score
              setScore(prev => {
                const updated = prev + 150 * streak;
                if (updated > bestScore) setBestScore(updated);
                return updated;
              });

              // Reposition enemy
              e.y = 15;
              e.x = 20 + Math.random() * (width - 40);
              break;
            }
          }
        }

        // Ship movement physics
        ship.x += ship.vx;
        ship.y += ship.vy;
        ship.vx *= 0.88;
        ship.vy *= 0.88;

        ship.x = Math.max(ship.size, Math.min(width - ship.size, ship.x));
        ship.y = Math.max(ship.size, Math.min(height - ship.size, ship.y));

        // Draw Player Ship
        ctx.save();
        ctx.translate(ship.x, ship.y);

        // Jet engine plasma flame
        ctx.fillStyle = '#00f0ff';
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.moveTo(-4, ship.size);
        ctx.lineTo(4, ship.size);
        ctx.lineTo(0, ship.size + 7 + Math.random() * 6);
        ctx.closePath();
        ctx.fill();

        // Ship Hull
        ctx.fillStyle = '#dbfcff';
        ctx.beginPath();
        ctx.moveTo(0, -ship.size);
        ctx.lineTo(-ship.size, ship.size);
        ctx.lineTo(0, ship.size * 0.6);
        ctx.lineTo(ship.size, ship.size);
        ctx.closePath();
        ctx.fill();

        // Cockpit Core
        ctx.fillStyle = '#6f00be';
        ctx.beginPath();
        ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Shield Energy Ring
        if (ship.shieldActive) {
          ctx.strokeStyle = 'rgba(0, 240, 255, 0.8)';
          ctx.lineWidth = 2.5;
          ctx.shadowColor = '#00f0ff';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(0, 0, ship.size + 8, 0, Math.PI * 2);
          ctx.stroke();
          ship.shieldTimer--;
          if (ship.shieldTimer <= 0) {
            ship.shieldActive = false;
          }
        }

        ctx.restore();
        ctx.shadowBlur = 0;

        // Particle updates
        for (let pIdx = particles.length - 1; pIdx >= 0; pIdx--) {
          const pt = particles[pIdx];
          pt.x += pt.vx;
          pt.y += pt.vy;
          pt.life--;
          ctx.fillStyle = pt.color;
          ctx.fillRect(pt.x, pt.y, 2, 2);
          if (pt.life <= 0) particles.splice(pIdx, 1);
        }
      }

      engine.animFrameId = requestAnimationFrame(render);
    };

    engineRef.current.animFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(engineRef.current.animFrameId);
    };
  }, [activeGameId, isPaused, streak, audioMuted, bestScore]);

  // Keyboard support
  useEffect(() => {
    if (activeGameId !== 'cyber-runner') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (e.code === 'KeyW' || e.code === 'ArrowUp') handleMove(0, -1);
      if (e.code === 'KeyS' || e.code === 'ArrowDown') handleMove(0, 1);
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') handleMove(-1, 0);
      if (e.code === 'KeyD' || e.code === 'ArrowRight') handleMove(1, 0);
      if (e.code === 'Space') {
        e.preventDefault();
        handleFire();
      }
      if (e.code === 'KeyB') {
        handleShield();
      }
      if (e.code === 'KeyP') {
        setIsPaused(p => !p);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeGameId, handleMove, handleFire, handleShield]);

  const toggleFullscreen = () => {
    playClickSound();
    const elem = containerRef.current;
    if (!elem) return;
    if (!document.fullscreenElement) {
      elem.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const handleRestart = () => {
    playClickSound();
    setScore(0);
    setShields(3);
    setStreak(1);
    const engine = engineRef.current;
    engine.ship.x = engine.width * 0.5;
    engine.ship.y = engine.height * 0.8;
    engine.ship.vx = 0;
    engine.ship.vy = 0;
    engine.lasers = [];
    setIsPaused(false);
  };

  // Tic Tac Toe Helper
  const handleCellClick = (index: number) => {
    if (board[index] || winner) return;
    playClickSound();
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    // Check winner
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (const [a, b, c] of lines) {
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        setWinner(newBoard[a]);
        return;
      }
    }
    if (!newBoard.includes(null)) {
      setWinner('Tie');
    }
  };

  const resetTicTacToe = () => {
    playClickSound();
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="flex flex-col w-full pb-24 animate-fadeIn" ref={containerRef}>
      <div className="flex flex-col gap-4 px-3 sm:px-4 max-w-2xl mx-auto w-full">

        {/* Game Header Bar */}
        <div className="relative overflow-hidden rounded-2xl bg-[#1a1b21] p-3 shadow-md border border-white/5">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff] animate-pulse" />
              <h1 className="font-headline-sm text-sm sm:text-base text-white tracking-wider uppercase truncate">
                {activeGameId === 'cyber-runner' ? 'CYBER RUNNER' : activeGameId === 'snake-cyber' ? 'SNAKE CYBER' : 'NEON MATRIX 3X'}
              </h1>
              <span className="rounded-full bg-[#6f00be]/60 px-2 py-0.5 text-[#ddb7ff] font-label-sm text-[10px] uppercase tracking-wider">
                v2.4 ARCADE
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => {
                  playClickSound();
                  setIsPaused(!isPaused);
                }}
                aria-label="Pause Game"
                className="w-8 h-8 rounded-full bg-[#292a2f] hover:bg-[#34343a] flex items-center justify-center text-white hover:text-[#00f0ff] active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-base">
                  {isPaused ? 'play_arrow' : 'pause'}
                </span>
              </button>
              <button
                onClick={handleRestart}
                aria-label="Restart Game"
                className="w-8 h-8 rounded-full bg-[#292a2f] hover:bg-[#34343a] flex items-center justify-center text-white hover:text-[#00f0ff] active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-base">refresh</span>
              </button>
              <button
                onClick={() => {
                  playClickSound();
                  setAudioMuted(!audioMuted);
                }}
                aria-label="Toggle Audio"
                className="w-8 h-8 rounded-full bg-[#292a2f] hover:bg-[#34343a] flex items-center justify-center text-white hover:text-[#00f0ff] active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-base">
                  {audioMuted ? 'volume_off' : 'volume_up'}
                </span>
              </button>
              <button
                onClick={toggleFullscreen}
                aria-label="Fullscreen"
                className="w-8 h-8 rounded-full bg-[#292a2f] hover:bg-[#34343a] flex items-center justify-center text-white hover:text-[#00f0ff] active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-base">fullscreen</span>
              </button>
            </div>
          </div>

          {/* Real-time HUD Grid */}
          <div className="grid grid-cols-4 gap-2 bg-[#0d0e13]/80 rounded-xl p-2.5 border border-white/5">
            <div className="flex flex-col">
              <span className="font-label-sm text-[10px] text-[#849495] uppercase">SCORE</span>
              <span className="font-headline-sm text-sm sm:text-base text-[#7df4ff] drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]">
                {score.toLocaleString()}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-[10px] text-[#849495] uppercase">BEST</span>
              <span className="font-headline-sm text-sm sm:text-base text-[#ddb7ff]">
                {bestScore.toLocaleString()}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-[10px] text-[#849495] uppercase">STREAK</span>
              <span className="font-headline-sm text-xs sm:text-sm text-[#00f0ff] drop-shadow-[0_0_6px_rgba(0,240,255,0.5)]">
                x{streak} COMBO
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-label-sm text-[10px] text-[#849495] uppercase">SHIELDS</span>
              <div className="flex items-center gap-1 mt-0.5">
                {Array.from({ length: 3 }).map((_, sIdx) => (
                  <span
                    key={sIdx}
                    className={`material-symbols-outlined text-base ${
                      sIdx < shields ? 'text-[#00f0ff] drop-shadow-[0_0_6px_#00f0ff]' : 'text-[#34343a]'
                    }`}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    shield
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Game Canvas / Screen Area */}
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#0d0e13] border border-white/10 shadow-2xl touch-none select-none">
          {activeGameId === 'cyber-runner' ? (
            <>
              <canvas ref={canvasRef} className="w-full h-full block" />

              {/* Pause Overlay */}
              {isPaused && (
                <div className="absolute inset-0 bg-[#0d0e13]/85 backdrop-blur-md flex flex-col items-center justify-center p-4 z-20 animate-fadeIn">
                  <span className="material-symbols-outlined text-5xl text-[#00f0ff] mb-2 drop-shadow-[0_0_12px_rgba(0,240,255,0.6)]">
                    pause_circle
                  </span>
                  <h2 className="font-headline-lg-mobile text-xl text-white uppercase mb-1">
                    CYBER SIMULATION PAUSED
                  </h2>
                  <p className="font-body-sm text-xs text-[#b9cacb] text-center mb-4 max-w-xs">
                    Neural sync frozen. Take a breath and dive back into hyperspace.
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPaused(false)}
                      className="rounded-full bg-[#00f0ff] text-[#00363a] font-headline-sm text-xs px-6 py-2.5 shadow-[0_0_20px_rgba(0,240,255,0.5)] active:scale-95 transition-transform uppercase font-bold"
                    >
                      RESUME
                    </button>
                    <button
                      onClick={handleRestart}
                      className="rounded-full bg-[#292a2f] text-white font-label-lg text-xs px-5 py-2.5 active:scale-95 transition-transform uppercase"
                    >
                      RESTART
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : activeGameId === 'neon-matrix-3x' ? (
            /* Neon Matrix 3X (Cyber Tic-Tac-Toe) */
            <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-[#0d0e13]">
              <div className="flex items-center justify-between w-full max-w-xs mb-3">
                <span className="text-xs font-bold text-[#00f0ff] uppercase tracking-wider">
                  {winner ? (winner === 'Tie' ? 'MATCH TIED' : `WINNER: ${winner}`) : `TURN: ${isXNext ? 'CYBER X' : 'MATRIX O'}`}
                </span>
                <button
                  onClick={resetTicTacToe}
                  className="px-3 py-1 rounded-full bg-[#292a2f] text-xs text-white font-label-sm uppercase"
                >
                  Reset
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 w-64 h-64">
                {board.map((cell, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCellClick(idx)}
                    className="w-full h-full rounded-xl bg-[#1a1b21] border border-white/10 hover:border-[#00f0ff] flex items-center justify-center text-3xl font-headline-sm transition-all active:scale-95"
                  >
                    {cell === 'X' && (
                      <span className="text-[#00f0ff] drop-shadow-[0_0_10px_#00f0ff]">X</span>
                    )}
                    {cell === 'O' && (
                      <span className="text-[#ddb7ff] drop-shadow-[0_0_10px_#ddb7ff]">O</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Alternate Game Placeholder Demo */
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
              <span className="material-symbols-outlined text-4xl text-[#00f0ff] mb-2 animate-bounce">
                sports_esports
              </span>
              <h3 className="font-headline-sm text-lg text-white uppercase">Simulation Active</h3>
              <p className="text-xs text-[#b9cacb] max-w-xs mt-1">
                Touch D-Pad or arrows to move across the quantum grid.
              </p>
              <button
                onClick={() => setActiveGameId('cyber-runner')}
                className="mt-4 px-4 py-2 rounded-full bg-[#00f0ff] text-[#00363a] font-bold text-xs uppercase"
              >
                Back to Cyber Runner
              </button>
            </div>
          )}

          {/* Telemetry watermark badge */}
          <div className="absolute top-2 right-2 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0d0e13]/80 backdrop-blur-sm shadow-sm border border-white/5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
            <span className="font-label-sm text-[10px] text-white font-bold">{fps} FPS</span>
            <span className="font-label-sm text-[10px] text-[#849495]">|</span>
            <span className="font-label-sm text-[10px] text-[#7df4ff]">18ms</span>
          </div>

          <div className="absolute bottom-2 left-2 z-10 px-2.5 py-0.5 rounded-full bg-[#0d0e13]/60 backdrop-blur-sm border border-white/5">
            <span className="font-label-sm text-[9px] text-[#b9cacb] uppercase tracking-wider">
              SYSTEM ACTIVE // SECTOR 07
            </span>
          </div>
        </div>

        {/* Onscreen Tactile Controls (Cyber D-Pad + Action Buttons) */}
        <div className="grid grid-cols-2 gap-4 w-full py-1">
          {/* Circular Cyber D-Pad */}
          <div className="relative w-full aspect-square max-w-[170px] mx-auto bg-[#1a1b21]/80 rounded-full p-2.5 backdrop-blur-md shadow-lg border border-white/10 flex items-center justify-center select-none">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-8 h-8 rounded-full bg-[#292a2f]/60 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#849495] text-base">navigation</span>
              </div>
            </div>
            <button
              onPointerDown={() => handleMove(0, -1)}
              aria-label="Up"
              className="absolute top-2 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#292a2f] active:bg-[#00f0ff] active:text-[#00363a] text-white flex items-center justify-center transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-xl">keyboard_arrow_up</span>
            </button>
            <button
              onPointerDown={() => handleMove(0, 1)}
              aria-label="Down"
              className="absolute bottom-2 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#292a2f] active:bg-[#00f0ff] active:text-[#00363a] text-white flex items-center justify-center transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-xl">keyboard_arrow_down</span>
            </button>
            <button
              onPointerDown={() => handleMove(-1, 0)}
              aria-label="Left"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#292a2f] active:bg-[#00f0ff] active:text-[#00363a] text-white flex items-center justify-center transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-xl">keyboard_arrow_left</span>
            </button>
            <button
              onPointerDown={() => handleMove(1, 0)}
              aria-label="Right"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#292a2f] active:bg-[#00f0ff] active:text-[#00363a] text-white flex items-center justify-center transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-xl">keyboard_arrow_right</span>
            </button>
          </div>

          {/* Action Trigger Cluster */}
          <div className="flex items-center justify-around gap-2 max-w-[190px] mx-auto w-full select-none">
            {/* Shield Button */}
            <div className="flex flex-col items-center gap-1.5">
              <button
                onPointerDown={handleShield}
                aria-label="Shield"
                className="w-16 h-16 rounded-full bg-[#6f00be]/80 active:bg-[#f0dbff] active:text-[#2c0051] text-[#ddb7ff] border border-[#6f00be] flex flex-col items-center justify-center shadow-[0_0_18px_rgba(111,0,190,0.5)] transition-all active:scale-90"
              >
                <span className="material-symbols-outlined text-2xl">shield_with_heart</span>
                <span className="font-label-sm text-[9px] tracking-wider uppercase">SHIELD</span>
              </button>
              <span className="font-label-sm text-[10px] text-[#849495]">[B] KEY</span>
            </div>

            {/* Fire Button */}
            <div className="flex flex-col items-center gap-1.5">
              <button
                onPointerDown={handleFire}
                aria-label="Fire Blast"
                className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#00f0ff] active:bg-[#7df4ff] text-[#00363a] flex flex-col items-center justify-center shadow-[0_0_24px_rgba(0,240,255,0.6)] transition-all active:scale-90"
              >
                <span className="material-symbols-outlined text-2xl">flash_on</span>
                <span className="font-label-sm text-[10px] tracking-widest font-bold uppercase">FIRE</span>
              </button>
              <span className="font-label-sm text-[10px] text-[#849495]">[SPACE]</span>
            </div>
          </div>
        </div>

        {/* Switch Mini-Game Carousel */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#00f0ff] text-lg">swap_horiz</span>
              <h2 className="font-label-lg text-xs uppercase text-white font-bold">
                SWITCH MINI-GAME
              </h2>
            </div>
            <span className="font-label-sm text-xs text-[#00f0ff]">
              VIEW ALL (18)
            </span>
          </div>

          <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar -mx-3 px-3 sm:mx-0 sm:px-0">
            {ARENA_MINI_GAMES.map((mg) => {
              const isCurrent = activeGameId === mg.id;
              return (
                <button
                  key={mg.id}
                  onClick={() => {
                    playClickSound();
                    setActiveGameId(mg.id);
                  }}
                  className={`flex flex-col items-start gap-1 p-2 rounded-2xl bg-[#1a1b21] hover:bg-[#292a2f] active:scale-95 transition-all shrink-0 w-32 text-left border ${
                    isCurrent ? 'border-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.3)]' : 'border-white/5'
                  }`}
                >
                  <div className="w-full h-16 rounded-xl bg-[#0d0e13] relative overflow-hidden flex items-center justify-center">
                    <img
                      src={mg.image}
                      alt={mg.name}
                      className="w-full h-full object-cover"
                    />
                    <span className={`absolute top-1 right-1 px-1.5 py-0.2 rounded font-label-sm text-[8px] font-bold uppercase ${mg.tagColor}`}>
                      {mg.tag}
                    </span>
                  </div>
                  <span className="font-label-md text-xs text-white truncate w-full font-bold">
                    {mg.name}
                  </span>
                  <span className="font-label-sm text-[10px] text-[#849495]">
                    {mg.category}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Game Intel & Field Manual Section */}
        <div className="rounded-2xl bg-[#1a1b21] border border-white/5 p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ddb7ff] text-xl">videogame_asset</span>
              <h3 className="font-headline-sm text-sm font-bold text-white">
                Game Intel &amp; Field Manual
              </h3>
            </div>
            <div className="flex items-center gap-1 bg-[#292a2f] px-2 py-0.5 rounded-full">
              <span className="material-symbols-outlined text-[#00f0ff] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              <span className="font-label-md text-xs text-white font-bold">4.9 / 5.0</span>
            </div>
          </div>

          <p className="font-body-sm text-xs text-[#b9cacb] leading-relaxed">
            Pilot your Cyber Striker across the quantum grid. Destroy corrupted data nodes, dodge energy barriers, and stack consecutive target destructions to multiply your score multiplier up to 10x.
          </p>

          <div className="grid grid-cols-2 gap-2 mt-1">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#121318] border border-white/5">
              <span className="material-symbols-outlined text-[#00f0ff] text-xl">touch_app</span>
              <div className="flex flex-col min-w-0">
                <span className="font-label-sm text-[10px] text-white uppercase">TOUCH CONTROL</span>
                <span className="font-body-sm text-[11px] text-[#b9cacb] truncate">Left D-Pad + Action Buttons</span>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#121318] border border-white/5">
              <span className="material-symbols-outlined text-[#ddb7ff] text-xl">keyboard</span>
              <div className="flex flex-col min-w-0">
                <span className="font-label-sm text-[10px] text-white uppercase">HOTKEYS</span>
                <span className="font-body-sm text-[11px] text-[#b9cacb] truncate">W/A/S/D / Space Fire</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 text-[10px] text-[#849495] font-mono">
            <span>DEPLOYED BY: PLAYZONE CYBER LABS</span>
            <span>LATENCY: WEBGPU/60</span>
          </div>
        </div>

      </div>
    </div>
  );
};
