"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface BugSlot {
  active: boolean;
  spawnTime: number;
  x: number;
  y: number;
}

const STORAGE_KEY = "bug-squash-best";
const DURATION_MS = 30000;

function BugIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="28"
      height="28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 2l2 3M16 2l-2 3" />
      <path d="M9 8a3 3 0 0 1 6 0v2a5 5 0 0 1-6 0z" fill="currentColor" fillOpacity="0.25" />
      <path d="M8 12a4 4 0 0 0 8 0v4a4 4 0 0 1-8 0z" fill="currentColor" fillOpacity="0.35" />
      <line x1="12" y1="10" x2="12" y2="19" />
      <path d="M4 8l4 2M20 8l-4 2" />
      <path d="M3 14h5M21 14h-5" />
      <path d="M4 20l4-2M20 20l-4-2" />
    </svg>
  );
}

export default function BugSquash({ className = "" }: { className?: string }) {
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [bestScore, setBestScore] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);

  // Round statistics
  const [stats, setStats] = useState({
    squashed: 0,
    escaped: 0,
    maxCombo: 1,
  });
  const [copied, setCopied] = useState(false);

  const playAreaRef = useRef<HTMLDivElement>(null);
  const timeBarRef = useRef<HTMLDivElement>(null);
  const boundsRef = useRef({ width: 0, height: 0 });

  const bug0 = useRef<HTMLButtonElement>(null);
  const bug1 = useRef<HTMLButtonElement>(null);
  const bug2 = useRef<HTMLButtonElement>(null);
  const bugRefs = [bug0, bug1, bug2];

  const float0 = useRef<HTMLDivElement>(null);
  const float1 = useRef<HTMLDivElement>(null);
  const float2 = useRef<HTMLDivElement>(null);
  const floatRefs = [float0, float1, float2];

  const slotsRef = useRef<BugSlot[]>([
    { active: false, spawnTime: 0, x: 0, y: 0 },
    { active: false, spawnTime: 0, x: 0, y: 0 },
    { active: false, spawnTime: 0, x: 0, y: 0 },
  ]);

  const scoreRef = useRef(0);
  const comboRef = useRef(1);
  const maxComboRef = useRef(1);
  const squashedRef = useRef(0);
  const escapedRef = useRef(0);
  const bestScoreRef = useRef(0);
  const startTimeRef = useRef(0);
  const lastSpawnRef = useRef(0);
  const lastSecondRef = useRef(30);
  const isPausedRef = useRef(false);
  const pauseStartRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed > 0) {
          setBestScore(parsed);
          bestScoreRef.current = parsed;
        }
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  const updateBounds = useCallback(() => {
    if (playAreaRef.current) {
      const rect = playAreaRef.current.getBoundingClientRect();
      boundsRef.current = { width: rect.width, height: rect.height };
    }
  }, []);

  useEffect(() => {
    updateBounds();
    window.addEventListener("resize", updateBounds, { passive: true });
    return () => window.removeEventListener("resize", updateBounds);
  }, [updateBounds]);

  const stopGame = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    slotsRef.current.forEach((slot, i) => {
      slot.active = false;
      const el = bugRefs[i].current;
      if (el) {
        el.style.opacity = "0";
        el.style.pointerEvents = "none";
      }
    });

    if (timeBarRef.current) {
      timeBarRef.current.style.transform = "scaleX(0)";
    }

    const finalScore = scoreRef.current;
    const prevBest = bestScoreRef.current;

    if (finalScore > prevBest) {
      setIsNewBest(true);
      setBestScore(finalScore);
      bestScoreRef.current = finalScore;
      try {
        localStorage.setItem(STORAGE_KEY, String(finalScore));
      } catch {
        // localStorage write error
      }
    } else {
      setIsNewBest(false);
    }

    setStats({
      squashed: squashedRef.current,
      escaped: escapedRef.current,
      maxCombo: maxComboRef.current,
    });

    setGameState("gameover");
  }, []);

  const startGame = useCallback(() => {
    updateBounds();

    scoreRef.current = 0;
    comboRef.current = 1;
    maxComboRef.current = 1;
    squashedRef.current = 0;
    escapedRef.current = 0;
    lastSecondRef.current = 30;
    isPausedRef.current = false;
    pauseStartRef.current = 0;

    setScore(0);
    setCombo(1);
    setTimeLeft(30);
    setIsNewBest(false);
    setCopied(false);
    setGameState("playing");

    slotsRef.current.forEach((slot, i) => {
      slot.active = false;
      slot.spawnTime = 0;
      const el = bugRefs[i].current;
      if (el) {
        el.style.opacity = "0";
        el.style.pointerEvents = "none";
        el.style.transform = "translate3d(-100px, -100px, 0)";
      }
      const fl = floatRefs[i].current;
      if (fl) {
        fl.style.opacity = "0";
      }
    });

    if (timeBarRef.current) {
      timeBarRef.current.style.transform = "scaleX(1)";
    }

    const now = performance.now();
    startTimeRef.current = now;
    lastSpawnRef.current = now - 400;

    const tick = (time: number) => {
      if (isPausedRef.current) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const elapsed = time - startTimeRef.current;
      const remainingMs = Math.max(0, DURATION_MS - elapsed);

      if (timeBarRef.current) {
        const ratio = remainingMs / DURATION_MS;
        timeBarRef.current.style.transform = `scaleX(${ratio})`;
      }

      const currentSec = Math.ceil(remainingMs / 1000);
      if (currentSec !== lastSecondRef.current) {
        lastSecondRef.current = currentSec;
        setTimeLeft(currentSec);
      }

      const slots = slotsRef.current;
      for (let i = 0; i < 3; i++) {
        const s = slots[i];
        if (s.active && time - s.spawnTime >= 900) {
          s.active = false;
          escapedRef.current += 1;
          const el = bugRefs[i].current;
          if (el) {
            el.style.opacity = "0";
            el.style.pointerEvents = "none";
          }
          if (comboRef.current > 1) {
            comboRef.current = 1;
            setCombo(1);
          }
        }
      }

      const activeCount = slots.filter((s) => s.active).length;
      const spawnInterval = remainingMs <= 10000 ? 450 : 800;

      if (activeCount < 3 && time - lastSpawnRef.current >= spawnInterval) {
        const slotIndex = slots.findIndex((s) => !s.active);
        if (slotIndex !== -1) {
          const { width, height } = boundsRef.current;
          const pad = 24;
          const bugSize = 52;
          const maxX = Math.max(pad, width - bugSize - pad);
          const maxY = Math.max(pad, height - bugSize - pad);
          const x = pad + Math.random() * (maxX - pad);
          const y = pad + Math.random() * (maxY - pad);

          slots[slotIndex].active = true;
          slots[slotIndex].spawnTime = time;
          slots[slotIndex].x = x;
          slots[slotIndex].y = y;
          lastSpawnRef.current = time;

          const el = bugRefs[slotIndex].current;
          if (el) {
            el.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
            el.style.opacity = "1";
            el.style.pointerEvents = "auto";
          }
        }
      }

      if (remainingMs <= 0) {
        stopGame();
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [stopGame, updateBounds]);

  const handleSquash = useCallback((index: number) => {
    const slot = slotsRef.current[index];
    if (!slot.active) return;
    slot.active = false;
    squashedRef.current += 1;

    try {
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(15);
      }
    } catch {
      // vibration unavailable
    }

    const bugEl = bugRefs[index].current;
    if (bugEl) {
      bugEl.style.opacity = "0";
      bugEl.style.pointerEvents = "none";
    }

    const currentMultiplier = comboRef.current;
    const points = 10 * currentMultiplier;

    scoreRef.current += points;
    setScore(scoreRef.current);

    const nextCombo = Math.min(5, currentMultiplier + 1);
    comboRef.current = nextCombo;
    if (nextCombo > maxComboRef.current) {
      maxComboRef.current = nextCombo;
    }
    setCombo(nextCombo);

    const floatEl = floatRefs[index].current;
    if (floatEl) {
      const reducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      floatEl.textContent = `+${points}`;
      floatEl.style.transition = "none";
      floatEl.style.transform = `translate3d(${Math.round(slot.x + 12)}px, ${Math.round(slot.y)}px, 0)`;
      floatEl.style.opacity = "1";

      requestAnimationFrame(() => {
        if (reducedMotion) {
          floatEl.style.transition = "opacity 0.25s ease-out";
          floatEl.style.opacity = "0";
        } else {
          floatEl.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-out";
          floatEl.style.transform = `translate3d(${Math.round(slot.x + 12)}px, ${Math.round(slot.y - 28)}px, 0) scale(1.15)`;
          floatEl.style.opacity = "0";
        }
      });
    }
  }, []);

  // Keyboard shortcut: Spacebar or Enter to start/restart
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.code === "Space" || e.code === "Enter") {
        if (gameState === "idle" || gameState === "gameover") {
          e.preventDefault();
          startGame();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState, startGame]);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (gameState !== "playing") return;
      if (document.hidden) {
        isPausedRef.current = true;
        pauseStartRef.current = performance.now();
      } else {
        if (pauseStartRef.current > 0) {
          const pauseDuration = performance.now() - pauseStartRef.current;
          startTimeRef.current += pauseDuration;
          lastSpawnRef.current += pauseDuration;
          slotsRef.current.forEach((slot) => {
            if (slot.active) slot.spawnTime += pauseDuration;
          });
          pauseStartRef.current = 0;
        }
        isPausedRef.current = false;
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [gameState]);

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const handleShare = () => {
    const text = `I squashed ${stats.squashed} bugs and scored ${score} pts (Max Combo x${stats.maxCombo}) in Bug Squash on luckyxdev.me/play! 🐛`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  let verdict = "Solid debugging.";
  if (score < 100) {
    verdict = "The bugs won this round.";
  } else if (score >= 300) {
    verdict = "Senior debugger energy.";
  }

  const totalAttempts = stats.squashed + stats.escaped;
  const accuracy = totalAttempts > 0 ? Math.round((stats.squashed / totalAttempts) * 100) : 0;

  return (
    <div className={`w-full bg-[#141414] border border-[#262626] flex flex-col overflow-hidden shadow-2xl ${className}`}>
      {/* Editor Header Bar */}
      <div className="px-5 py-3.5 border-b border-[#262626] bg-[#0A0A0A] flex items-center justify-between font-mono-label text-xs">
        <div className="flex items-center gap-3 text-[#A3A3A3]">
          <span className="text-[#A3E635]">✦</span>
          <span>bugs.tsx</span>
          {gameState === "playing" && timeLeft <= 10 && (
            <span className="px-2 py-0.5 bg-[#A3E635]/15 text-[#A3E635] text-[10px] tracking-wider rounded font-bold uppercase animate-pulse">
              RUSH HOUR
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 sm:gap-6 text-[#A3A3A3]">
          <div className="flex items-center gap-1.5">
            <span>SCORE</span>
            <span className="text-white font-bold tabular-nums">
              {String(score).padStart(3, "0")}
            </span>
            {combo > 1 && (
              <span className="text-[#A3E635] font-bold">x{combo}</span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <span>TIME</span>
            <span className={`font-bold tabular-nums ${timeLeft <= 10 ? "text-[#A3E635]" : "text-white"}`}>
              {String(timeLeft).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* Main Play Area */}
      <div
        ref={playAreaRef}
        className="relative w-full min-h-[380px] sm:min-h-[480px] bg-[#0A0A0A] flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden"
        style={{ touchAction: gameState === "playing" ? "none" : "auto" }}
      >
        {gameState === "idle" && (
          <div className="flex flex-col items-center max-w-md px-4">
            <button
              type="button"
              onClick={startGame}
              aria-label="Play Bug Squash"
              className="min-h-[52px] px-12 py-3.5 bg-[#A3E635] hover:bg-white text-[#0A0A0A] font-mono-label text-sm font-bold tracking-widest rounded-full transition-colors active:scale-95 touch-manipulation cursor-pointer"
            >
              PLAY
            </button>
            <p className="font-body text-base text-[#A3A3A3] mt-5">
              30 seconds. Tap every bug you see before it escapes.
            </p>
            <p className="font-mono-label text-xs text-[#737373] mt-3">
              Press <kbd className="px-2 py-0.5 bg-[#141414] border border-[#262626] text-[#A3A3A3] rounded">SPACE</kbd> to start
            </p>
            {bestScore > 0 && (
              <div className="font-mono-label text-xs text-[#A3E635] mt-4 px-3 py-1 bg-[#141414] border border-[#262626] rounded-full">
                BEST SCORE: {bestScore}
              </div>
            )}
          </div>
        )}

        {gameState === "gameover" && (
          <div className="flex flex-col items-center max-w-md w-full px-4 py-4">
            <h3 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight uppercase mb-2">
              TIME UP
            </h3>

            {isNewBest && (
              <span className="inline-block px-3.5 py-1 bg-[#A3E635] text-[#0A0A0A] font-mono-label text-xs font-bold rounded-full mb-3">
                ★ NEW HIGH SCORE ★
              </span>
            )}

            <div className="font-mono-label text-base sm:text-lg text-[#F5F5F5] mb-2 tabular-nums">
              SCORE: <span className="text-[#A3E635] font-bold">{score}</span>
              <span className="mx-2 text-[#404040]">•</span>
              BEST: {bestScore}
            </div>

            <p className="font-body text-sm sm:text-base text-[#A3A3A3] mb-5">
              {verdict}
            </p>

            {/* Detailed Round Stats */}
            <div className="grid grid-cols-3 gap-3 w-full bg-[#141414] border border-[#262626] p-3 mb-6 font-mono-label text-xs">
              <div className="flex flex-col items-center">
                <span className="text-[#737373]">SQUASHED</span>
                <span className="text-white font-bold text-sm mt-0.5">{stats.squashed}</span>
              </div>
              <div className="flex flex-col items-center border-x border-[#262626]">
                <span className="text-[#737373]">MAX COMBO</span>
                <span className="text-[#A3E635] font-bold text-sm mt-0.5">x{stats.maxCombo}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[#737373]">ACCURACY</span>
                <span className="text-white font-bold text-sm mt-0.5">{accuracy}%</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 w-full">
              <button
                type="button"
                onClick={startGame}
                aria-label="Play again"
                className="min-h-[48px] px-8 py-3 bg-[#A3E635] hover:bg-white text-[#0A0A0A] font-mono-label text-xs sm:text-sm font-bold tracking-widest rounded-full transition-colors active:scale-95 touch-manipulation cursor-pointer"
              >
                PLAY AGAIN
              </button>

              <button
                type="button"
                onClick={handleShare}
                aria-label="Share score"
                className="min-h-[48px] px-6 py-3 bg-[#141414] hover:bg-[#1f1f1f] border border-[#262626] hover:border-[#A3E635] text-white font-mono-label text-xs sm:text-sm font-bold tracking-wider rounded-full transition-colors cursor-pointer"
              >
                {copied ? "COPIED!" : "SHARE SCORE"}
              </button>
            </div>

            <p className="font-mono-label text-[11px] text-[#737373] mt-4">
              Press <kbd className="px-1.5 py-0.5 bg-[#141414] border border-[#262626] text-[#A3A3A3] rounded">SPACE</kbd> to play again
            </p>
          </div>
        )}

        {/* Fixed pool of 3 bug buttons */}
        {[0, 1, 2].map((i) => (
          <button
            key={`bug-${i}`}
            ref={bugRefs[i]}
            type="button"
            aria-label="bug"
            onClick={() => handleSquash(i)}
            className="absolute top-0 left-0 w-14 h-14 flex items-center justify-center text-[#E5E5E5] hover:text-[#A3E635] active:scale-90 transition-transform duration-100 touch-manipulation cursor-pointer select-none"
            style={{
              opacity: 0,
              pointerEvents: "none",
              transform: "translate3d(-100px, -100px, 0)",
              willChange: "transform, opacity",
            }}
          >
            <BugIcon />
          </button>
        ))}

        {/* Fixed pool of 3 floating score labels */}
        {[0, 1, 2].map((i) => (
          <div
            key={`float-${i}`}
            ref={floatRefs[i]}
            className="absolute top-0 left-0 pointer-events-none font-mono-label text-sm font-bold text-[#A3E635] select-none"
            style={{
              opacity: 0,
              transform: "translate3d(-100px, -100px, 0)",
            }}
          />
        ))}
      </div>

      {/* Draining Time Bar */}
      <div className="w-full h-1.5 bg-[#262626] overflow-hidden">
        <div
          ref={timeBarRef}
          className="w-full h-full bg-[#A3E635] origin-left"
          style={{ transform: "scaleX(1)" }}
        />
      </div>
    </div>
  );
}
