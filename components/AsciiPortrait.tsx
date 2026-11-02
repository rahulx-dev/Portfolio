"use client";

import { useEffect, useRef, useState } from "react";

type Cell = { ox: number; oy: number; dx: number; dy: number; lum: number; ch: string };

const RAMP = " .·:;+*x%#@";
const ACCENT: [number, number, number] = [163, 230, 53];
const BG = "#0A0A0A";

export default function AsciiPortrait({
  src = "/portrait.jpg",
  cols = 100,
  className,
}: {
  src?: string;
  cols?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let cells: Cell[] = [];
    let mouseX = -9999;
    let mouseY = -9999;
    let cancelled = false;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      const cellW = 8;
      const cellH = 14;
      const rows = Math.max(1, Math.round(cols * (img.height / img.width) * (cellW / cellH)));
      canvas.width = cols * cellW;
      canvas.height = rows * cellH;

      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return;
      octx.drawImage(img, 0, 0, cols, rows);
      const data = octx.getImageData(0, 0, cols, rows).data;

      cells = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const lum = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
          const ox = x * cellW + cellW / 2;
          const oy = y * cellH + cellH / 2;
          cells.push({ ox, oy, dx: 0, dy: 0, lum, ch: RAMP[Math.min(RAMP.length - 1, Math.floor(lum * RAMP.length))] });
        }
      }

      ctx.font = "12px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const draw = () => {
        ctx.fillStyle = BG;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const R = 90;
        for (const p of cells) {
          const ddx = p.ox - mouseX;
          const ddy = p.oy - mouseY;
          const d2 = ddx * ddx + ddy * ddy;
          let glow = 0;
          if (d2 < R * R) {
            const d = Math.sqrt(d2) || 1;
            const f = 1 - d / R;
            glow = f;
            p.dx += (ddx / d) * f * 3.2;
            p.dy += (ddy / d) * f * 3.2;
          }
          p.dx *= 0.82;
          p.dy *= 0.82;
          const base = 30 + p.lum * 140;
          const r = Math.round(base + (ACCENT[0] - base) * glow);
          const g = Math.round(base + (ACCENT[1] - base) * glow);
          const b = Math.round(base + (ACCENT[2] - base) * glow);
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          const s = 1 + glow * 0.7;
          ctx.save();
          ctx.translate(p.ox + p.dx, p.oy + p.dy);
          ctx.scale(s, s);
          ctx.fillText(p.ch, 0, 0);
          ctx.restore();
        }
      };

      if (reducedMotion) { draw(); return; }
      const frame = () => { draw(); raf = requestAnimationFrame(frame); };
      frame();
    };
    img.onerror = () => setFailed(true);
    img.src = src;

    const updatePointer = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = ((clientX - rect.left) * canvas.width) / rect.width;
      mouseY = ((clientY - rect.top) * canvas.height) / rect.height;
    };
    const onMouseMove = (e: MouseEvent) => updatePointer(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) updatePointer(e.touches[0].clientX, e.touches[0].clientY);
      e.preventDefault();
    };
    const onLeave = () => { mouseX = -9999; mouseY = -9999; };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [src, cols]);

  if (failed) {
    return (
      <div className={className} style={{ background: BG, color: "#A3E635", fontFamily: "monospace", padding: "2rem", textAlign: "center" }}>
        ASCII PORTRAIT — add the photo at public/portrait.jpg
      </div>
    );
  }

  return (
    <canvas ref={canvasRef} role="img" aria-label="Portrait of Lucky rendered in ASCII characters" className={className} style={{ display: "block", width: "100%", height: "auto" }} />
  );
}
