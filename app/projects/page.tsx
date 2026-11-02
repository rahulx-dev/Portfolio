import type { Metadata } from "next";
import Link from "next/link";
import { WordReveal } from "@/components/WordReveal";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PROJECTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "All work and client projects built by Lucky. Featuring ARISE and Royal Gym Manager.",
};

export default function ProjectsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 py-16 sm:py-24">
      {/* Label & Massive Heading */}
      <div className="mb-6">
        <p className="font-mono-label text-xs sm:text-sm text-[#A3E635] tracking-widest mb-4">
          ALL WORK
        </p>
        <WordReveal
          text="PROJECTS"
          as="h1"
          className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-bold text-white tracking-tight leading-none uppercase"
        />
      </div>

      {/* Full-width hairline divider */}
      <div className="w-full h-px bg-[#262626] mb-14 sm:mb-20" />

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {PROJECTS.map((project, index) => {
          const hasLink = project.slug !== null;

          if (hasLink) {
            return (
              <ScrollReveal key={project.id} delay={index * 0.1}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group relative flex flex-col justify-between bg-[#141414] border border-[#262626] hover:border-[#A3E635] transition-all duration-300 p-8 sm:p-10 min-h-[480px] overflow-hidden"
                >
                  {/* Top: Meta info & Ghost Index */}
                  <div className="flex items-start justify-between mb-8">
                    <span className="font-mono-label text-xs text-[#737373] tracking-widest">
                      {project.year} • {project.type}
                    </span>
                    <span className="font-heading text-5xl font-bold text-[#262626] group-hover:text-[#333333] transition-colors select-none leading-none">
                      {project.index}
                    </span>
                  </div>

                  {/* Visual area with grid texture + hover scale */}
                  <div className="w-full flex-1 bg-grid-texture border border-[#262626] flex items-center justify-center p-6 mb-8 overflow-hidden relative">
                    <div className="text-center group-hover:scale-[1.04] transition-transform duration-500 ease-out">
                      <span className="font-mono-label text-xs text-[#737373] tracking-widest uppercase block mb-1">
                        {project.name}
                      </span>
                      <span className="font-mono-label text-[11px] text-[#A3E635] opacity-75">
                        {project.metaStatus}
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
            );
          }

          // Project Three (Coming soon, no link)
          return (
            <ScrollReveal key={project.id} delay={index * 0.1}>
              <div className="relative flex flex-col justify-between bg-[#141414]/60 border border-[#262626] p-8 sm:p-10 min-h-[480px] select-none overflow-hidden">
                <div className="flex items-start justify-between mb-8">
                  <span className="font-mono-label text-xs text-[#525252] tracking-widest">
                    {project.year} • {project.type}
                  </span>
                  <span className="font-heading text-5xl font-bold text-[#1f1f1f] select-none leading-none">
                    {project.index}
                  </span>
                </div>

                <div className="w-full flex-1 bg-diagonal-texture border border-[#1f1f1f] flex items-center justify-center p-6 mb-8">
                  <span className="font-mono-label text-xs text-[#404040] tracking-widest uppercase">
                    IN CONCEPT
                  </span>
                </div>

                <div>
                  <p className="font-mono-label text-[11px] text-[#525252] tracking-wider mb-2">
                    {project.year} • {project.metaStatus}
                  </p>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#737373] mb-2">
                    {project.name}
                  </h2>
                  <p className="font-body text-[#525252] text-sm">
                    {project.tagline}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}
