"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const RAMP = " .·:;+*x%#@";
const COLS = 88;
const CHAR_ASPECT = 1.55;
const INTERACTION_RADIUS = 95;
const RADIUS_SQ = INTERACTION_RADIUS * INTERACTION_RADIUS;

// Precomputed discrete color lookup table for green blend (0 string allocations per frame)
const LIME_LUT: string[] = Array.from({ length: 25 }, (_, i) => {
  const t = i / 24;
  const r = Math.round(110 * (1 - t) + 163 * t);
  const g = Math.round(110 * (1 - t) + 230 * t);
  const b = Math.round(110 * (1 - t) + 53 * t);
  return `rgb(${r},${g},${b})`;
});

interface Cell {
  col: number;
  row: number;
  char: string;
  isBlank: boolean;
  baseColor: string;
  homeX: number;
  homeY: number;
}

export default function AsciiPortrait({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const cellsRef = useRef<Cell[]>([]);
  const activeCellsRef = useRef<Cell[]>([]); // Non-blank cells for fast iteration
  const pointerRef = useRef({ x: -1000, y: -1000, active: false });
  const rafIdRef = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);
  const isVisibleRef = useRef(true);
  const dimsRef = useRef({ width: 420, height: 420, dpr: 1 });

  // Update cell positioning when container resizes
  const updateLayout = useCallback((width: number, height: number, dpr: number) => {
    const canvas = canvasRef.current;
    if (!canvas || width === 0 || height === 0) return;

    dimsRef.current = { width, height, dpr };

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    const cells = cellsRef.current;
    if (cells.length === 0) return;

    const maxRow = cells[cells.length - 1].row + 1;
    const cellWidth = width / COLS;
    const cellHeight = height / maxRow;

    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      cell.homeX = (cell.col + 0.5) * cellWidth;
      cell.homeY = (cell.row + 0.5) * cellHeight;
    }
  }, []);

  // Single static frame render
  const drawStatic = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height, dpr } = dimsRef.current;
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.fillStyle = "#0A0A0A";
    ctx.fillRect(0, 0, width, height);

    const cells = activeCellsRef.current;
    if (cells.length === 0) {
      ctx.restore();
      return;
    }

    const totalRows = cellsRef.current[cellsRef.current.length - 1]?.row + 1 || 100;
    const cellHeight = height / totalRows;
    const fontSize = Math.max(5, Math.round(cellHeight * 1.15));

    ctx.font = `bold ${fontSize}px "JetBrains Mono", monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const len = cells.length;
    for (let i = 0; i < len; i++) {
      const cell = cells[i];
      ctx.fillStyle = cell.baseColor;
      ctx.fillText(cell.char, cell.homeX, cell.homeY);
    }
    ctx.restore();
  }, []);

  // Animation frame loop with smart idle sleeping
  const startAnimationLoop = useCallback(() => {
    if (isAnimatingRef.current || !isVisibleRef.current) return;
    isAnimatingRef.current = true;

    const loop = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        isAnimatingRef.current = false;
        return;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        isAnimatingRef.current = false;
        return;
      }

      const { width, height, dpr } = dimsRef.current;
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.fillStyle = "#0A0A0A";
      ctx.fillRect(0, 0, width, height);

      const totalRows = cellsRef.current[cellsRef.current.length - 1]?.row + 1 || 100;
      const cellHeight = height / totalRows;
      const fontSize = Math.max(5, Math.round(cellHeight * 1.15));

      ctx.font = `bold ${fontSize}px "JetBrains Mono", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const pointer = pointerRef.current;
      const pointerActive = pointer.active;
      const px = pointer.x;
      const py = pointer.y;

      const cells = activeCellsRef.current;
      const len = cells.length;

      for (let i = 0; i < len; i++) {
        const cell = cells[i];
        let isPerturbed = false;
        let lutIdx = 0;

        if (pointerActive) {
          const dx = cell.homeX - px;
          if (dx > -INTERACTION_RADIUS && dx < INTERACTION_RADIUS) {
            const dy = cell.homeY - py;
            if (dy > -INTERACTION_RADIUS && dy < INTERACTION_RADIUS) {
              const distSq = dx * dx + dy * dy;
              if (distSq < RADIUS_SQ) {
                const dist = Math.sqrt(distSq);
                const factor = 1 - dist / INTERACTION_RADIUS;
                lutIdx = Math.min(24, Math.floor(factor * 24));
                isPerturbed = true;
              }
            }
          }
        }

        ctx.fillStyle = isPerturbed ? LIME_LUT[lutIdx] : cell.baseColor;
        ctx.fillText(cell.char, cell.homeX, cell.homeY);
      }

      ctx.restore();

      // If pointer is inactive, stop the loop and preserve the static frame
      if (!pointerActive) {
        isAnimatingRef.current = false;
        drawStatic();
        return;
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);
  }, [drawStatic]);

  // Load image hidden & precompute grid once with background suppression & contrast stretch
  useEffect(() => {
    let isMounted = true;
    const img = new Image();

    const handleLoad = () => {
      if (!isMounted) return;

      try {
        const aspect = img.naturalWidth / img.naturalHeight || 1;
        const rows = Math.round(COLS / (aspect * CHAR_ASPECT));

        const offscreen = document.createElement("canvas");
        offscreen.width = COLS;
        offscreen.height = rows;
        const offCtx = offscreen.getContext("2d", { willReadFrequently: true });

        if (!offCtx) {
          setHasError(true);
          return;
        }

        offCtx.drawImage(img, 0, 0, COLS, rows);
        const imgData = offCtx.getImageData(0, 0, COLS, rows).data;

        const newCells: Cell[] = [];
        const newActiveCells: Cell[] = [];

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < COLS; c++) {
            const idx = (r * COLS + c) * 4;
            const red = imgData[idx];
            const green = imgData[idx + 1];
            const blue = imgData[idx + 2];

            // Raw luminance
            const rawLuma = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

            // Background suppression: cells below 0.16 luminance render blank
            if (rawLuma < 0.16) {
              const cell: Cell = {
                col: c,
                row: r,
                char: " ",
                isBlank: true,
                baseColor: "#000000",
                homeX: 0,
                homeY: 0,
              };
              newCells.push(cell);
            } else {
              // Contrast stretch: darkest 10% -> 0, brightest 10% -> 1
              const clamped = Math.max(0, Math.min(1, (rawLuma - 0.10) / (0.90 - 0.10)));
              // Gamma 1.15
              const stretchedLuma = Math.pow(clamped, 1.15);

              const rampIndex = Math.min(
                RAMP.length - 1,
                Math.max(0, Math.floor((1 - stretchedLuma) * RAMP.length))
              );
              const char = RAMP[rampIndex];

              // Character color rgb(45) -> rgb(235) by luminance
              const colorVal = Math.round(45 + stretchedLuma * (235 - 45));
              const baseColor = `rgb(${colorVal},${colorVal},${colorVal})`;

              const cell: Cell = {
                col: c,
                row: r,
                char,
                isBlank: false,
                baseColor,
                homeX: 0,
                homeY: 0,
              };
              newCells.push(cell);
              newActiveCells.push(cell);
            }
          }
        }

        cellsRef.current = newCells;
        activeCellsRef.current = newActiveCells;
        setIsLoaded(true);
      } catch {
        setHasError(true);
      }
    };

    img.onload = handleLoad;
    img.onerror = () => {
      if (isMounted) {
        setHasError(true);
      }
    };

    img.src = "/portrait.jpg";
    if (img.complete && img.naturalWidth > 0) {
      handleLoad();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // Setup observers and drawing
  useEffect(() => {
    if (!isLoaded || cellsRef.current.length === 0) return;

    const container = containerRef.current;
    if (!container) return;

    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 1.5);
    const rect = container.getBoundingClientRect();
    const w = rect.width || 420;
    const h = rect.height || 420;

    updateLayout(w, h, dpr);
    drawStatic();

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
          updateLayout(entry.contentRect.width, entry.contentRect.height, dpr);
          if (!isAnimatingRef.current) {
            drawStatic();
          }
        }
      }
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isVisibleRef.current = entry.isIntersecting;
          if (!entry.isIntersecting && isAnimatingRef.current) {
            if (rafIdRef.current !== null) {
              cancelAnimationFrame(rafIdRef.current);
            }
            isAnimatingRef.current = false;
          }
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      isAnimatingRef.current = false;
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [isLoaded, updateLayout, drawStatic]);

  // Pointer event handlers (mouse and touch)
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    pointerRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
    startAnimationLoop();
  };

  const handlePointerLeave = () => {
    pointerRef.current.active = false;
    startAnimationLoop();
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full bg-[#0A0A0A] overflow-hidden flex items-center justify-center select-none ${className}`}
      aria-label="ASCII Portrait"
    >
      {hasError ? (
        <div className="font-mono-label text-xs sm:text-sm text-[#737373] tracking-widest">
          ASCII PORTRAIT
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onPointerCancel={handlePointerLeave}
          className="block w-full h-full cursor-default select-none"
        />
      )}
    </div>
  );
}
