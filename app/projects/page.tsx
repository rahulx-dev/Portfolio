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
      <div className="mb-16 sm:mb-24">
        <p className="font-mono-label text-xs sm:text-sm text-[#A3E635] tracking-widest mb-6">
          ALL WORK
        </p>
        <WordReveal
          text="PROJECTS"
          as="h1"
          className="font-heading text-6xl sm:text-8xl md:text-9xl font-bold text-white tracking-tighter uppercase"
        />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project, index) => {
          const hasLink = project.slug !== null;

          if (hasLink) {
            return (
              <ScrollReveal key={project.id} delay={index * 0.1}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group flex flex-col justify-between bg-[#141414] border border-[#262626] hover:border-[#A3E635] transition-colors duration-300 p-8 sm:p-10 min-h-[420px]"
                >
                  <div className="flex items-center justify-between font-mono-label text-xs text-[#737373] mb-12">
                    <span>{project.year}</span>
                    <span className="text-[#A3E635] opacity-0 group-hover:opacity-100 transition-opacity">
                      EXPLORE ↗
                    </span>
                  </div>

                  {/* Screenshot / visual placeholder */}
                  <div className="w-full flex-1 bg-[#0A0A0A] border border-[#262626] flex items-center justify-center p-6 mb-8">
                    <span className="font-mono-label text-xs text-[#525252] tracking-widest uppercase">
                      {project.name}
                    </span>
                  </div>

                  <div>
                    <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white group-hover:text-[#A3E635] transition-colors mb-2">
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
              <div className="flex flex-col justify-between bg-[#141414]/50 border border-[#262626] p-8 sm:p-10 min-h-[420px] select-none">
                <div className="flex items-center justify-between font-mono-label text-xs text-[#525252] mb-12">
                  <span>{project.year}</span>
                  <span>UNRELEASED</span>
                </div>

                <div className="w-full flex-1 bg-[#0A0A0A]/60 border border-[#1f1f1f] flex items-center justify-center p-6 mb-8">
                  <span className="font-mono-label text-xs text-[#404040] tracking-widest uppercase">
                    IN CONCEPT
                  </span>
                </div>

                <div>
                  <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#737373] mb-2">
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
