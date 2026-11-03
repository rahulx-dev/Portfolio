import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ScrollReveal from "@/components/ScrollReveal";
import WaveHeading from "@/components/WaveHeading";
import PhoneShot from "@/components/PhoneShot";
import { PROJECTS } from "@/lib/data";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const PROJECT_META: Record<string, { title: string; description: string }> = {
  arise: {
    title: "ARISE — Gamified Fitness App | Lucky",
    description:
      "ARISE turns workouts into a game — pose-detected reps, XP, quests and streaks, with app-blocking that keeps you focused. Designed and built by Lucky.",
  },
  "gym-management": {
    title: "Gym Management — Member & Fee App for Gyms | Lucky",
    description:
      "Gym Management replaces the gym owner's notebook — member records, automatic fee dues, payment receipts and one-tap WhatsApp reminders. Free Android APK download.",
  },
};

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
  const meta = PROJECT_META[slug];

  if (!project || !meta) {
    return {
      title: "Project Not Found | Lucky",
    };
  }

  const url = `https://luckyxdev.me/projects/${project.slug}`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      siteName: "LUCKYXDEV",
      type: "article",
      images: [
        {
          url: "/og.jpg",
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/og.jpg"],
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

      <div className="mb-14 sm:mb-20">
        <WaveHeading className="font-heading text-6xl sm:text-8xl md:text-9xl font-bold text-white tracking-tighter uppercase mb-6">
          {project.name}
        </WaveHeading>
        <p className="font-body text-xl sm:text-2xl md:text-3xl text-[#A3A3A3] max-w-2xl font-light">
          {project.tagline}
        </p>

        {project.slug === "gym-management" && (
          <div className="mt-8">
            <a
              href="https://drive.google.com/uc?export=download&id=15aGFKoh2WYepD09UvrapRpkoFETsOIP3"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-h-[48px] px-10 py-3.5 bg-[#A3E635] text-[#0A0A0A] font-mono-label text-sm font-bold tracking-widest hover:bg-white transition-colors focus-visible:outline-none rounded-full"
            >
              DOWNLOAD APK ↗
            </a>
          </div>
        )}
      </div>

      <div className="w-full h-px bg-[#262626] mb-12 sm:mb-16" />

      <ScrollReveal className="mb-20 sm:mb-28">
        <div
          className="w-full bg-[#141414] bg-dots-texture border border-[#262626] flex items-center justify-center p-8 sm:p-14 overflow-hidden"
          aria-label={`${project.name} preview`}
        >
          {project.slug === "gym-management" ? (
            <PhoneShot
              src="/shots/gym-1.jpg"
              alt="Gym Management app screen"
              className="w-[220px] sm:w-[260px] md:w-[290px] h-[400px] sm:h-[480px] md:h-[530px]"
              priority
            />
          ) : (
            <PhoneShot
              teaserTitle="ARISE"
              teaserSubtitle="IN DEVELOPMENT"
              className="w-[220px] sm:w-[260px] md:w-[290px] h-[400px] sm:h-[480px] md:h-[530px]"
            />
          )}
        </div>
      </ScrollReveal>

      <div className="border-t border-[#262626] pt-16 grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16">
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

        <ScrollReveal delay={0.3} className="md:col-span-1">
          <h2 className="font-mono-label text-xs text-[#A3E635] tracking-widest uppercase mb-4">
            STATUS
          </h2>
          <p className="font-body text-base sm:text-lg text-[#D4D4D4] font-normal mb-6">
            {project.status}
          </p>
          {project.slug === "gym-management" && (
            <a
              href="https://drive.google.com/uc?export=download&id=15aGFKoh2WYepD09UvrapRpkoFETsOIP3"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-h-[44px] px-8 py-2.5 bg-[#A3E635] text-[#0A0A0A] font-mono-label text-xs font-bold tracking-wider hover:bg-white transition-colors rounded-full"
            >
              DOWNLOAD APK ↗
            </a>
          )}
        </ScrollReveal>
      </div>
    </article>
  );
}
