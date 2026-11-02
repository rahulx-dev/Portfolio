"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const RAMP = " .·:;+*x%#@";
const COLS = 110;
const CHAR_ASPECT = 1.55;
const INTERACTION_RADIUS = 95;
const DAMPING = 0.82;
const SPRING_K = 0.14;

interface Cell {
  col: number;
  row: number;
  char: string;
  baseRgb: number;
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function AsciiPortrait() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const cellsRef = useRef<Cell[]>([]);
  const pointerRef = useRef({ x: -1000, y: -1000, active: false });
  const rafIdRef = useRef<number | null>(null);

  // Resize and position cells based on container dimensions
  const updateLayout = useCallback((width: number, height: number, dpr: number) => {
    const canvas = canvasRef.current;
    if (!canvas || width === 0 || height === 0) return;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    const rows = Math.round(COLS / CHAR_ASPECT);
    const cellWidth = width / COLS;
    const cellHeight = height / rows;

    for (const cell of cellsRef.current) {
      cell.homeX = (cell.col + 0.5) * cellWidth;
      cell.homeY = (cell.row + 0.5) * cellHeight;
      // If position has not been displaced significantly, update current x,y
      if (Math.abs(cell.x - cell.homeX) < 1 && Math.abs(cell.y - cell.homeY) < 1) {
        cell.x = cell.homeX;
        cell.y = cell.homeY;
        cell.vx = 0;
        cell.vy = 0;
      }
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const img = new Image();
    img.src = "/portrait.jpg";

    img.onload = () => {
      if (!isMounted) return;

      try {
        const aspect = img.naturalWidth / img.naturalHeight || 1;
        const rows = Math.round(COLS / (aspect * CHAR_ASPECT));

        // Offscreen sampling canvas
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

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < COLS; c++) {
            const idx = (r * COLS + c) * 4;
            const red = imgData[idx];
            const green = imgData[idx + 1];
            const blue = imgData[idx + 2];

            // Luminance formula
            const luma = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

            // Character ramp: light cell -> thin char, dark cell -> dense char
            const rampIndex = Math.min(
              RAMP.length - 1,
              Math.max(0, Math.floor((1 - luma) * RAMP.length))
            );
            const char = RAMP[rampIndex];

            // Base color: grayscale from cell brightness (30 up to ~170 by luminance)
            const baseRgb = Math.round(30 + luma * (170 - 30));

            newCells.push({
              col: c,
              row: r,
              char,
              baseRgb,
              homeX: 0,
              homeY: 0,
              x: 0,
              y: 0,
              vx: 0,
              vy: 0,
            });
          }
        }

        cellsRef.current = newCells;
        setIsLoaded(true);
      } catch {
        setHasError(true);
      }
    };

    img.onerror = () => {
      if (isMounted) {
        setHasError(true);
      }
    };

    return () => {
      isMounted = false;
    };
  }, []);

  // Main rendering and animation effect
  useEffect(() => {
    if (!isLoaded || cellsRef.current.length === 0) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
    const rect = container.getBoundingClientRect();
    let currentWidth = rect.width || 420;
    let currentHeight = rect.height || 420;

    updateLayout(currentWidth, currentHeight, dpr);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
          currentWidth = entry.contentRect.width;
          currentHeight = entry.contentRect.height;
          updateLayout(currentWidth, currentHeight, dpr);
        }
      }
    });

    resizeObserver.observe(container);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Single static frame render function (for reduced motion or initial paint)
    const drawStatic = () => {
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.fillStyle = "#0A0A0A";
      ctx.fillRect(0, 0, currentWidth, currentHeight);

      const rows = Math.round(COLS / CHAR_ASPECT);
      const cellHeight = currentHeight / rows;
      const fontSize = Math.max(5, Math.round(cellHeight * 1.15));

      ctx.font = `bold ${fontSize}px "JetBrains Mono", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (const cell of cellsRef.current) {
        ctx.fillStyle = `rgb(${cell.baseRgb},${cell.baseRgb},${cell.baseRgb})`;
        ctx.fillText(cell.char, cell.homeX, cell.homeY);
      }
      ctx.restore();
    };

    if (prefersReducedMotion) {
      drawStatic();
      return () => {
        resizeObserver.disconnect();
      };
    }

    // Animation Loop
    const rows = Math.round(COLS / CHAR_ASPECT);
    let lastTime = 0;

    const animate = (time: number) => {
      lastTime = time;
      void lastTime;

      ctx.save();
      ctx.scale(dpr, dpr);

      // Background #0A0A0A
      ctx.fillStyle = "#0A0A0A";
      ctx.fillRect(0, 0, currentWidth, currentHeight);

      const cellHeight = currentHeight / rows;
      const fontSize = Math.max(5, Math.round(cellHeight * 1.15));

      ctx.font = `bold ${fontSize}px "JetBrains Mono", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const pointer = pointerRef.current;
      const pointerActive = pointer.active;
      const px = pointer.x;
      const py = pointer.y;

      const cells = cellsRef.current;
      const len = cells.length;

      for (let i = 0; i < len; i++) {
        const cell = cells[i];

        let scale = 1;
        let r = cell.baseRgb;
        let g = cell.baseRgb;
        let b = cell.baseRgb;

        // Mouse/touch interaction within ~95px radius
        if (pointerActive) {
          const dx = cell.x - px;
          const dy = cell.y - py;
          const dist = Math.hypot(dx, dy);

          if (dist < INTERACTION_RADIUS) {
            const factor = 1 - dist / INTERACTION_RADIUS; // 0 to 1
            const push = factor * factor * 13;
            const safeDist = dist < 0.1 ? 0.1 : dist;
            const nx = dx / safeDist;
            const ny = dy / safeDist;

            cell.vx += nx * push;
            cell.vy += ny * push;

            // Scale up slightly (up to 1.7x)
            scale = 1 + factor * 0.7;

            // Blend toward lime green #A3E635 (163, 230, 53)
            const greenBlend = Math.min(1, factor * 1.25);
            r = Math.round(cell.baseRgb * (1 - greenBlend) + 163 * greenBlend);
            g = Math.round(cell.baseRgb * (1 - greenBlend) + 230 * greenBlend);
            b = Math.round(cell.baseRgb * (1 - greenBlend) + 53 * greenBlend);
          }
        }

        // Spring back to home position
        const ax = (cell.homeX - cell.x) * SPRING_K;
        const ay = (cell.homeY - cell.y) * SPRING_K;
        cell.vx = (cell.vx + ax) * DAMPING;
        cell.vy = (cell.vy + ay) * DAMPING;
        cell.x += cell.vx;
        cell.y += cell.vy;

        // Prevent permanent drift or endless subpixel jitter
        if (
          !pointerActive &&
          Math.abs(cell.x - cell.homeX) < 0.05 &&
          Math.abs(cell.y - cell.homeY) < 0.05 &&
          Math.abs(cell.vx) < 0.05 &&
          Math.abs(cell.vy) < 0.05
        ) {
          cell.x = cell.homeX;
          cell.y = cell.homeY;
          cell.vx = 0;
          cell.vy = 0;
        }

        // Render character
        if (scale > 1.02) {
          ctx.save();
          ctx.translate(cell.x, cell.y);
          ctx.scale(scale, scale);
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fillText(cell.char, 0, 0);
          ctx.restore();
        } else {
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fillText(cell.char, cell.x, cell.y);
        }
      }

      ctx.restore();

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [isLoaded, updateLayout]);

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
  };

  const handlePointerLeave = () => {
    pointerRef.current.active = false;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square max-w-[420px] bg-[#0A0A0A] border border-[#262626] overflow-hidden flex items-center justify-center select-none"
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
          className="block w-full h-full cursor-crosshair touch-none"
        />
      )}
    </div>
  );
}
