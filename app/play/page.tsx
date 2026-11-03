import type { Metadata } from "next";
import Link from "next/link";
import BugSquash from "@/components/BugSquash";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Play Bug Squash | Lucky",
  description:
    "Play Bug Squash — a fast-paced 30-second mini game. How many bugs can you fix in 30 seconds?",
  alternates: {
    canonical: "https://luckyxdev.me/play",
  },
  openGraph: {
    title: "Play Bug Squash | Lucky",
    description:
      "Play Bug Squash — a fast-paced 30-second mini game. How many bugs can you fix in 30 seconds?",
    url: "https://luckyxdev.me/play",
    siteName: "LUCKYXDEV",
    type: "website",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Play Bug Squash | Lucky",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Play Bug Squash | Lucky",
    description:
      "Play Bug Squash — a fast-paced 30-second mini game. How many bugs can you fix in 30 seconds?",
    images: ["/og.jpg"],
  },
};

export default function PlayPage() {
  return (
    <div className="min-h-screen py-12 sm:py-20 px-6 sm:px-8 md:px-12 max-w-5xl mx-auto flex flex-col justify-center">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono-label text-xs text-[#737373] hover:text-[#A3E635] transition-colors mb-6"
        >
          <span>←</span>
          <span>BACK TO HOME</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="font-mono-label text-xs sm:text-sm text-[#A3E635] tracking-widest mb-3">
              ARCADE // 30-SECOND CHALLENGE
            </p>
            <h1 className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-white tracking-tight leading-none uppercase">
              BUG SQUASH
            </h1>
          </div>

          <p className="font-body text-sm sm:text-base text-[#A3A3A3] max-w-sm">
            How many bugs can you fix in 30 seconds? Tap or click before they escape.
          </p>
        </div>
      </div>

      <div className="w-full h-px bg-[#262626] mb-10" />

      {/* Game Window */}
      <ScrollReveal>
        <BugSquash />
      </ScrollReveal>

      {/* Rule Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
        <div className="bg-[#141414] border border-[#262626] p-4 font-mono-label">
          <p className="text-[11px] text-[#737373] mb-1">DURATION</p>
          <p className="text-white font-bold text-sm">30 SECONDS</p>
        </div>

        <div className="bg-[#141414] border border-[#262626] p-4 font-mono-label">
          <p className="text-[11px] text-[#737373] mb-1">MAX ACTIVE</p>
          <p className="text-white font-bold text-sm">3 AT A TIME</p>
        </div>

        <div className="bg-[#141414] border border-[#262626] p-4 font-mono-label">
          <p className="text-[11px] text-[#737373] mb-1">COMBO</p>
          <p className="text-[#A3E635] font-bold text-sm">UP TO 5X</p>
        </div>

        <div className="bg-[#141414] border border-[#262626] p-4 font-mono-label">
          <p className="text-[11px] text-[#737373] mb-1">CONTROLS</p>
          <p className="text-white font-bold text-sm">TAP / SPACEBAR</p>
        </div>
      </div>
    </div>
  );
}
