import type { Metadata } from "next";
import Link from "next/link";
import { WordReveal } from "@/components/WordReveal";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PROJECTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects — Lucky (Rahul Mahato)",
  description:
    "All work and applications built by Lucky, including ARISE and Gym Management.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 py-16 sm:py-24">
      {/* Label & Massive Heading (No numbering) */}
      <div className="mb-6">
        <p className="font-mono-label text-xs sm:text-sm text-[#A3E635] tracking-widest mb-4">
          SELECTED WORK
        </p>
        <WordReveal
          text="PROJECTS"
          as="h1"
          className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-bold text-white tracking-tight leading-none uppercase"
        />
      </div>

      {/* Hairline divider */}
      <div className="w-full h-px bg-[#262626] mb-14 sm:mb-20" />

      {/* Projects Grid (No ghost index numbers) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 mb-10">
        {PROJECTS.map((project, index) => (
          <ScrollReveal key={project.id} delay={index * 0.1}>
            <Link
              href={`/projects/${project.slug}`}
              className="group relative flex flex-col justify-between bg-[#141414] border border-[#262626] hover:border-[#A3E635] transition-all duration-300 p-8 sm:p-10 min-h-[460px] overflow-hidden"
            >
              {/* Top: Meta info */}
              <div className="flex items-start justify-between mb-8">
                <span className="font-mono-label text-xs text-[#737373] tracking-widest">
                  {project.year} • {project.type}
                </span>
                <span className="font-mono-label text-xs px-2.5 py-0.5 bg-[#0A0A0A] border border-[#262626] text-[#A3E635]">
                  {project.metaStatus}
                </span>
              </div>

              {/* Visual area with grid texture + hover scale */}
              <div className="w-full flex-1 bg-grid-texture border border-[#262626] flex items-center justify-center p-6 mb-8 overflow-hidden relative">
                <div className="text-center group-hover:scale-[1.04] transition-transform duration-500 ease-out">
                  <span className="font-mono-label text-xs sm:text-sm text-[#737373] tracking-widest uppercase block mb-1">
                    {project.name}
                  </span>
                  <span className="font-mono-label text-[11px] text-[#A3E635] opacity-75">
                    {project.type}
                  </span>
                </div>
              </div>

              {/* Bottom: Meta row & Title with slide */}
              <div>
                <p className="font-mono-label text-[11px] text-[#737373] tracking-wider mb-2">
                  {project.year} • {project.metaStatus}
                </p>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white group-hover:text-[#A3E635] group-hover:translate-x-2 transition-all duration-300 mb-2">
                  {project.name}
                </h2>
                <p className="font-body text-[#A3A3A3] text-sm">
                  {project.tagline}
                </p>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>

      {/* Plus wide card: "More projects on GitHub →" */}
      <ScrollReveal delay={0.2}>
        <a
          href="https://github.com/rahulx-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="group block bg-[#141414] border border-[#262626] hover:border-[#A3E635] transition-all duration-300 p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
        >
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white group-hover:text-[#A3E635] transition-colors mb-2">
              More projects on GitHub →
            </h2>
            <p className="font-body text-[#737373] text-sm sm:text-base">
              Explore open-source repositories, experiments, and ongoing work on GitHub.
            </p>
          </div>
          <span className="inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 bg-[#0A0A0A] border border-[#262626] group-hover:border-[#A3E635] text-[#A3E635] font-mono-label text-xs font-bold tracking-wider rounded-full transition-colors self-start sm:self-auto">
            OPEN GITHUB ↗
          </span>
        </a>
      </ScrollReveal>
    </div>
  );
}
