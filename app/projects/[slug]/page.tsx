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
  return PROJECTS.filter((p) => p.slug !== null).map((p) => ({
    slug: p.slug as string,
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
    title: `${project.name} — Projects`,
    description: `${project.name}: ${project.tagline}. Designed and built by Lucky.`,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project || !project.whatItIs || !project.builtWith || !project.status) {
    notFound();
  }

  return (
    <article className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 py-16 sm:py-24">
      {/* Back link */}
      <div className="mb-12">
        <Link
          href="/projects"
          className="nav-link font-mono-label text-xs sm:text-sm text-[#A3A3A3] hover:text-[#A3E635] transition-colors"
        >
          ← ALL PROJECTS
        </Link>
      </div>

      {/* Massive Name & One Tagline */}
      <div className="mb-14 sm:mb-20">
        <WordReveal
          text={project.name}
          as="h1"
          className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter uppercase mb-4"
        />
        <ScrollReveal delay={0.15}>
          <p className="font-body text-xl sm:text-2xl text-[#A3A3A3]">
            {project.tagline}
          </p>
        </ScrollReveal>
      </div>

      {/* Big Screenshot Placeholder */}
      <ScrollReveal delay={0.2} className="mb-20 sm:mb-28">
        <div
          className="w-full aspect-[16/9] bg-[#141414] border border-[#262626] flex items-center justify-center p-8 select-none"
          aria-label="Screenshot placeholder"
        >
          <div className="text-center">
            <p className="font-mono-label text-xs sm:text-sm text-[#737373] tracking-widest uppercase mb-2">
              SCREENSHOT PLACEHOLDER
            </p>
            <p className="font-mono-label text-[11px] text-[#404040]">
              {project.name} • {project.year}
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Only Three Blocks: WHAT IT IS, BUILT WITH, STATUS */}
      <div className="border-t border-[#262626] pt-16 grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16">
        {/* Block 1: WHAT IT IS (2 lines) */}
        <ScrollReveal delay={0.1} className="md:col-span-1">
          <h2 className="font-mono-label text-xs text-[#A3E635] tracking-widest uppercase mb-4">
            WHAT IT IS
          </h2>
          <div className="font-body text-sm sm:text-base text-[#D4D4D4] leading-relaxed space-y-2">
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
          <ul className="font-mono-label text-xs sm:text-sm text-[#D4D4D4] space-y-2.5">
            {project.builtWith.map((tech) => (
              <li key={tech} className="flex items-center gap-2">
                <span className="text-[#A3E635] text-xs">―</span>
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
          <p className="font-body text-sm sm:text-base text-[#D4D4D4]">
            {project.status}
          </p>
        </ScrollReveal>
      </div>
    </article>
  );
}
