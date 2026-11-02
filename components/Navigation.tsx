"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

export default function Navigation() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Blur & border threshold
      if (currentScrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

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

  const isHome = pathname === "/";
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
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-[#0A0A0A]/85 backdrop-blur-md border-b border-[#262626]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Main Navigation"
        className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 h-20 flex items-center justify-between"
      >
        {/* Wordmark */}
        <Link
          href="/"
          className="font-heading text-lg sm:text-xl font-bold tracking-tight text-white hover:text-[#A3E635] transition-colors focus-visible:outline-none"
        >
          LUCKYXDEV
        </Link>

        {/* Right Links */}
        <div className="flex items-center gap-6 sm:gap-8 md:gap-10">
          {/* HOME (hidden on mobile, collapses to PRODUCTS + CONTACT) */}
          <Link
            href="/"
            className={`hidden sm:inline-block nav-link text-xs sm:text-sm tracking-widest ${
              isHome ? "active text-[#A3E635]" : "text-[#A3A3A3] hover:text-white"
            }`}
          >
            HOME
          </Link>

          {/* PROJECTS (hidden on mobile, collapses to PRODUCTS + CONTACT) */}
          <Link
            href="/projects"
            className={`hidden sm:inline-block nav-link text-xs sm:text-sm tracking-widest ${
              isProjects ? "active text-[#A3E635]" : "text-[#A3A3A3] hover:text-white"
            }`}
          >
            PROJECTS
          </Link>

          {/* PRODUCTS (visible on mobile and desktop) */}
          <Link
            href="/products"
            className={`nav-link text-xs sm:text-sm tracking-widest ${
              isProducts ? "active text-[#A3E635]" : "text-[#A3A3A3] hover:text-white"
            }`}
          >
            PRODUCTS
          </Link>

          {/* CONTACT (visible on mobile and desktop) */}
          <Link
            href="/#contact"
            onClick={handleContactClick}
            className="nav-link text-xs sm:text-sm tracking-widest text-[#A3A3A3] hover:text-white"
          >
            CONTACT
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
