"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

export default function Navigation() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > 90 && currentScrollY > lastScrollY.current + 4) {
        setVisible(false);
      } else if (currentScrollY < lastScrollY.current - 4 || currentScrollY <= 90) {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById("contact");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }
    }
  };

  const isProjects = pathname.startsWith("/projects");
  const isProducts = pathname.startsWith("/products");

  return (
    <motion.header
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { y: -50, opacity: 0 }}
      animate={{
        y: visible ? 0 : -90,
        opacity: visible ? 1 : 0,
      }}
      transition={{
        duration: shouldReduceMotion ? 0.01 : 0.35,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-[#0A0A0A]/85 backdrop-blur-md border-b border-[#262626]"
    >
      <nav
        aria-label="Main Navigation"
        className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 h-full flex items-center justify-between"
      >
        {/* Wordmark in Space Grotesk 700, 20px, DEV in accent */}
        <Link
          href="/"
          className="font-heading text-[20px] font-bold tracking-tight text-white hover:opacity-90 transition-opacity focus-visible:outline-none"
        >
          LUCKYX<span className="text-[#A3E635]">DEV</span>
        </Link>

        {/* Right Links & Action Pill */}
        <div className="flex items-center gap-6 sm:gap-8">
          {/* 01 PROJECTS (hidden on mobile, collapses to PRODUCTS + CONTACT) */}
          <Link
            href="/projects"
            className={`hidden sm:inline-flex items-center nav-link text-[13px] tracking-widest ${
              isProjects ? "active text-[#A3E635]" : "text-[#A3A3A3] hover:text-white"
            }`}
          >
            <span className="text-[#A3E635] mr-1.5 font-bold">01</span> PROJECTS
          </Link>

          {/* 02 PRODUCTS (visible on mobile and desktop) */}
          <Link
            href="/products"
            className={`inline-flex items-center nav-link text-[13px] tracking-widest ${
              isProducts ? "active text-[#A3E635]" : "text-[#A3A3A3] hover:text-white"
            }`}
          >
            <span className="text-[#A3E635] mr-1.5 font-bold">02</span> PRODUCTS
          </Link>

          {/* 03 CONTACT (visible on mobile and desktop) */}
          <Link
            href="/#contact"
            onClick={handleContactClick}
            className="inline-flex items-center nav-link text-[13px] tracking-widest text-[#A3A3A3] hover:text-white"
          >
            <span className="text-[#A3E635] mr-1.5 font-bold">03</span> CONTACT
          </Link>

          {/* Solid Accent Pill Button: LET'S TALK */}
          <Link
            href="/#contact"
            onClick={handleContactClick}
            className="hidden sm:inline-flex items-center justify-center px-4 sm:px-5 py-2 bg-[#A3E635] hover:bg-white text-[#0A0A0A] font-mono-label text-xs sm:text-[13px] font-bold rounded-full tracking-wider transition-colors duration-200 focus-visible:outline-none ml-2"
          >
            LET&apos;S TALK
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
