"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const ROLES = [
  "Web Developer",
  "Android App Developer",
  "MERN Stack Developer",
];

export default function TypedRoles() {
  const shouldReduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const currentRole = ROLES[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (text.length < currentRole.length) {
        timeout = setTimeout(() => {
          setText(currentRole.slice(0, text.length + 1));
        }, 70);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1800);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(currentRole.slice(0, text.length - 1));
        }, 35);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
        timeout = setTimeout(() => {}, 300);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <div className="font-mono-label text-xs sm:text-sm text-[#A3E635] tracking-widest uppercase">
        Android &amp; Web App Developer
      </div>
    );
  }

  return (
    <div
      className="font-mono-label text-xs sm:text-sm text-[#A3E635] tracking-widest uppercase flex items-center min-h-[24px]"
      aria-label="Current role"
    >
      <span>{text}</span>
      <span
        className="inline-block w-2 h-3.5 bg-[#A3E635] ml-1.5 animate-pulse"
        aria-hidden="true"
      />
    </div>
  );
}
