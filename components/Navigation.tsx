"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Hide on scroll down, show on scroll up
          if (currentScrollY > 90 && currentScrollY > lastScrollY.current + 4) {
            setVisible(false);
            setMobileMenuOpen(false);
          } else if (currentScrollY < lastScrollY.current - 4 || currentScrollY <= 90) {
            setVisible(true);
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setMobileMenuOpen(false);
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
    <>
      <motion.header
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { y: -20, opacity: 0.85 }}
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
          {/* Wordmark in Space Grotesk 700, DEV in accent */}
          <Link
            href="/"
            className="font-heading text-[20px] font-bold tracking-tight text-white hover:opacity-90 transition-opacity focus-visible:outline-none"
          >
            LUCKYX<span className="text-[#A3E635]">DEV</span>
          </Link>

          {/* Desktop Right Links & Action Pill */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/projects"
              className={`nav-link text-[13px] tracking-widest ${
                isProjects ? "active text-[#A3E635]" : "text-[#A3A3A3] hover:text-white"
              }`}
            >
              PROJECTS
            </Link>

            <Link
              href="/products"
              className={`nav-link text-[13px] tracking-widest ${
                isProducts ? "active text-[#A3E635]" : "text-[#A3A3A3] hover:text-white"
              }`}
            >
              PRODUCTS
            </Link>

            <Link
              href="/#contact"
              onClick={handleContactClick}
              className="nav-link text-[13px] tracking-widest text-[#A3A3A3] hover:text-white"
            >
              CONTACT
            </Link>

            {/* Accent Pill Button: LET'S TALK */}
            <a
              href="mailto:code.rahulx@gmail.com"
              className="inline-flex items-center justify-center min-h-[44px] px-5 py-2 bg-[#A3E635] hover:bg-white text-[#0A0A0A] font-mono-label text-xs sm:text-[13px] font-bold rounded-full tracking-wider transition-colors duration-200 focus-visible:outline-none"
            >
              LET&apos;S TALK
            </a>
          </div>

          {/* Mobile Right Controls: LET'S TALK + Hamburger (<768px) */}
          <div className="flex md:hidden items-center gap-3">
            <a
              href="mailto:code.rahulx@gmail.com"
              className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 bg-[#A3E635] text-[#0A0A0A] font-mono-label text-xs font-bold rounded-full tracking-wider hover:bg-white transition-colors"
            >
              LET&apos;S TALK
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-h-[44px] min-w-[44px] flex flex-col items-center justify-center gap-1.5 p-2 text-white border border-[#262626] bg-[#141414] focus-visible:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <span
                className={`w-5 h-0.5 bg-white transition-transform duration-200 ${
                  mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-white transition-opacity duration-200 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-white transition-transform duration-200 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Dropdown Menu (<768px) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#262626] p-6 md:hidden flex flex-col gap-6 font-mono-label text-sm tracking-widest"
          >
            <Link
              href="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className={`min-h-[44px] flex items-center ${
                isProjects ? "text-[#A3E635]" : "text-[#A3A3A3] hover:text-white"
              }`}
            >
              PROJECTS
            </Link>

            <Link
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
              className={`min-h-[44px] flex items-center ${
                isProducts ? "text-[#A3E635]" : "text-[#A3A3A3] hover:text-white"
              }`}
            >
              PRODUCTS
            </Link>

            <Link
              href="/#contact"
              onClick={handleContactClick}
              className="min-h-[44px] flex items-center text-[#A3A3A3] hover:text-white"
            >
              CONTACT
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
