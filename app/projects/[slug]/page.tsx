import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WordReveal } from "@/components/WordReveal";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PROJECTS } from "@/lib/data";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.name} • Projects | luckyxdev`,
    description: `${project.name}: ${project.tagline}. Designed and built by Lucky.`,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12 py-16 sm:py-24">
      {/* Back link & Meta header */}
      <div className="flex items-center justify-between mb-12 sm:mb-16">
        <Link
          href="/projects"
          className="nav-link font-mono-label text-xs sm:text-sm text-[#A3A3A3] hover:text-[#A3E635] transition-colors"
        >
          ← ALL PROJECTS
        </Link>
        <span className="font-mono-label text-xs text-[#737373]">
          {project.year} • {project.type}
        </span>
      </div>

      {/* Massive Name & One Tagline */}
      <div className="mb-14 sm:mb-20">
        <WordReveal
          text={project.name}
          as="h1"
          className="font-heading text-6xl sm:text-8xl md:text-9xl font-bold text-white tracking-tighter uppercase mb-6"
        />
        <ScrollReveal delay={0.15}>
          <p className="font-body text-xl sm:text-2xl md:text-3xl text-[#A3A3A3] max-w-2xl font-light">
            {project.tagline}
          </p>
        </ScrollReveal>
      </div>

      {/* Full-width hairline divider */}
      <div className="w-full h-px bg-[#262626] mb-12 sm:mb-16" />

      {/* Big Screenshot Placeholder */}
      <ScrollReveal delay={0.2} className="mb-20 sm:mb-28">
        <div
          className="w-full aspect-[16/9] bg-[#141414] border border-[#262626] flex flex-col select-none overflow-hidden"
          aria-label="Screenshot placeholder"
        >
          {/* Header bar */}
          <div className="px-6 py-3.5 border-b border-[#262626] flex items-center justify-between font-mono-label text-xs text-[#737373] bg-[#0A0A0A]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#262626]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#262626]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#262626]" />
            </div>
            <span>{project.slug}.app</span>
            <span className="text-[#A3E635]">{project.metaStatus}</span>
          </div>

          {/* Body */}
          <div className="flex-1 bg-grid-texture flex items-center justify-center p-8">
            <div className="text-center">
              <p className="font-mono-label text-xs sm:text-sm text-[#737373] tracking-widest uppercase mb-2">
                SCREENSHOT PLACEHOLDER
              </p>
              <p className="font-mono-label text-[11px] text-[#404040]">
                {project.name} • {project.year}
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Only Three Blocks: WHAT IT IS, BUILT WITH, STATUS */}
      <div className="border-t border-[#262626] pt-16 grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16">
        {/* Block 1: WHAT IT IS (max 2 lines) */}
        <ScrollReveal delay={0.1} className="md:col-span-1">
          <h2 className="font-mono-label text-xs text-[#A3E635] tracking-widest uppercase mb-4">
            WHAT IT IS
          </h2>
          <div className="font-body text-base sm:text-lg text-[#D4D4D4] leading-relaxed space-y-2 font-normal">
            {project.whatItIs.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </ScrollReveal>

        {/* Block 2: BUILT WITH (mono list) */}
        <ScrollReveal delay={0.2} className="md:col-span-1">
          <h2 className="font-mono-label text-xs text-[#A3E635] tracking-widest uppercase mb-4">
            BUILT WITH
          </h2>
          <ul className="font-mono-label text-sm text-[#D4D4D4] space-y-3">
            {project.builtWith.map((tech) => (
              <li key={tech} className="flex items-center gap-3">
                <span className="text-[#A3E635] text-sm">•</span>
                <span>{tech}</span>
              </li>
            ))}
          </ul>
        </ScrollReveal>

        {/* Block 3: STATUS (one line) */}
        <ScrollReveal delay={0.3} className="md:col-span-1">
          <h2 className="font-mono-label text-xs text-[#A3E635] tracking-widest uppercase mb-4">
            STATUS
          </h2>
          <p className="font-body text-base sm:text-lg text-[#D4D4D4] font-normal">
            {project.status}
          </p>
        </ScrollReveal>
      </div>
    </article>
  );
}
