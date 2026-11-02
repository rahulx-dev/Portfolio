"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";

interface WordRevealProps {
  text: string;
  className?: string;
  accentWords?: string[];
  as?: "h1" | "h2" | "h3" | "span" | "div";
  delay?: number;
}

export function WordReveal({
  text,
  className = "",
  accentWords = [],
  as: Component = "h1",
  delay = 0,
}: WordRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (shouldReduceMotion) {
    return (
      <Component className={className}>
        {words.map((word, i) => {
          const isAccent = accentWords.includes(word);
          return (
            <span
              key={i}
              className={`inline-block mr-[0.25em] ${isAccent ? "text-[#A3E635]" : ""}`}
            >
              {word}
            </span>
          );
        })}
      </Component>
    );
  }

  const container: Variants = {
    hidden: { opacity: 0.45 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: delay,
      },
    },
  };

  const child: Variants = {
    hidden: {
      opacity: 0.45,
      y: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="inline-block"
    >
      <Component className={className}>
        {words.map((word, i) => {
          const isAccent = accentWords.includes(word);
          return (
            <span key={i} className="inline-block overflow-hidden mr-[0.22em] pb-[0.05em] align-top">
              <motion.span
                variants={child}
                className={`inline-block ${isAccent ? "text-[#A3E635]" : ""}`}
              >
                {word}
              </motion.span>
            </span>
          );
        })}
      </Component>
    </motion.div>
  );
}
