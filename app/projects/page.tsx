import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import WaveHeading from "@/components/WaveHeading";
import PhoneShot from "@/components/PhoneShot";
import { PROJECTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects | Lucky",
  description:
    "Selected work by Lucky — production Android and web applications, designed and built end to end.",
  alternates: {
    canonical: "https://luckyxdev.me/projects",
  },
  openGraph: {
    title: "Projects | Lucky",
    description:
      "Selected work by Lucky — production Android and web applications, designed and built end to end.",
    url: "https://luckyxdev.me/projects",
    siteName: "LUCKYXDEV",
    type: "website",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Projects | Lucky",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Lucky",
    description:
      "Selected work by Lucky — production Android and web applications, designed and built end to end.",
    images: ["/og.jpg"],
  },
};

export default function ProjectsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 py-16 sm:py-24">
      <div className="mb-6">
        <p className="font-mono-label text-xs sm:text-sm text-[#A3E635] tracking-widest mb-4">
          SELECTED WORK
        </p>
        <WaveHeading className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-bold text-white tracking-tight leading-none uppercase">
          PROJECTS
        </WaveHeading>
      </div>

      <div className="w-full h-px bg-[#262626] mb-14 sm:mb-20" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 mb-10">
        {PROJECTS.map((project, index) => (
          <ScrollReveal key={project.id} delay={index * 0.1}>
            <Link
              href={`/projects/${project.slug}`}
              className="group relative flex flex-col justify-between bg-[#141414] border border-[#262626] hover:border-[#A3E635] transition-all duration-300 p-8 sm:p-10 min-h-[500px] sm:min-h-[540px] overflow-hidden"
            >
              <div className="flex items-start justify-between mb-8">
                <span className="font-mono-label text-xs text-[#737373] tracking-widest">
                  {project.year} • {project.type}
                </span>
                <span className="font-mono-label text-xs px-2.5 py-0.5 bg-[#0A0A0A] border border-[#262626] text-[#A3E635]">
                  {project.metaStatus}
                </span>
              </div>

              <div className="w-full flex-1 bg-[#141414] bg-dots-texture border border-[#262626] flex items-center justify-center p-6 sm:p-8 mb-8 overflow-hidden relative min-h-[320px] sm:min-h-[360px]">
                {project.slug === "gym-management" ? (
                  <PhoneShot
                    src="/shots/gym-1.jpg"
                    alt="Gym Management App Screenshot"
                    className="w-[170px] sm:w-[190px] h-[300px] sm:h-[335px] group-hover:scale-[1.03] group-hover:rotate-1"
                  />
                ) : (
                  <PhoneShot
                    teaserTitle="ARISE"
                    teaserSubtitle="IN DEVELOPMENT"
                    className="w-[170px] sm:w-[190px] h-[300px] sm:h-[335px] group-hover:scale-[1.03] group-hover:rotate-1"
                  />
                )}
              </div>

              <div>
                <p className="font-mono-label text-[11px] text-[#737373] tracking-wider mb-2">
                  {project.year} • {project.metaStatus}
                </p>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white group-hover:text-[#A3E635] transition-colors mb-2 flex items-center justify-between">
                  <span>{project.name}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-[6px] text-2xl sm:text-3xl">
                    →
                  </span>
                </h2>
                <p className="font-body text-[#A3A3A3] text-sm sm:text-base">
                  {project.tagline}
                </p>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.2}>
        <a
          href="https://github.com/rahulx-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="group block bg-[#141414] border border-[#262626] hover:border-[#A3E635] transition-all duration-300 p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
        >
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white group-hover:text-[#A3E635] transition-colors mb-2 flex items-center gap-3">
              <span>More projects on GitHub</span>
              <span className="transition-transform duration-300 group-hover:translate-x-[6px]">
                →
              </span>
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
