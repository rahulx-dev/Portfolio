"use client";

import { useState, useCallback, useRef, useEffect } from "react";

interface WaveHeadingProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "div";
}

export default function WaveHeading({
  children,
  className = "",
  as: Component = "h1",
}: WaveHeadingProps) {
  const [waveCount, setWaveCount] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const words = children.split(" ");
  const totalLetters = children.length;
  const totalDuration = totalLetters * 60 + 600;

  const triggerWave = useCallback(() => {
    setWaveCount((count) => count + 1);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setWaveCount(0);
    }, totalDuration);
  }, [totalDuration]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  let globalCharIndex = 0;

  return (
    <Component
      aria-label={children}
      onMouseEnter={triggerWave}
      className={`cursor-default ${className}`}
    >
      {words.map((word, wordIndex) => {
        const letters = Array.from(word);

        return (
          <span key={`w-${wordIndex}`} className="inline-block whitespace-nowrap">
            {letters.map((char) => {
              const charIndex = globalCharIndex++;
              return (
                <span
                  key={`${waveCount}-${charIndex}`}
                  className="wave-char"
                  style={
                    waveCount > 0
                      ? ({
                          animation: "textWaveRed 0.6s ease forwards",
                          animationDelay: `${charIndex * 60}ms`,
                        } as React.CSSProperties)
                      : undefined
                  }
                >
                  {char}
                </span>
              );
            })}
            {wordIndex < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        );
      })}
    </Component>
  );
}
