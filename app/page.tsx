import type { Metadata } from "next";
import Link from "next/link";
import AsciiPortrait from "@/components/AsciiPortrait";
import MarqueeStrip from "@/components/MarqueeStrip";
import PhoneShot from "@/components/PhoneShot";
import { WordReveal } from "@/components/WordReveal";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PROJECTS, PRODUCTS, ABOUT_COPY } from "@/lib/data";

export const metadata: Metadata = {
  title: "Lucky — Android & Web App Developer",
  description:
    "Android and web app developer based in Bokaro, India. I design and build complete digital products end to end — clean interfaces, solid engineering, and software that ships. Available for freelance projects and collaborations.",
  alternates: {
    canonical: "https://luckyxdev.me",
  },
  openGraph: {
    title: "Lucky — Android & Web App Developer",
    description:
      "Android and web app developer based in Bokaro, India. I design and build complete digital products end to end — clean interfaces, solid engineering, and software that ships. Available for freelance projects and collaborations.",
    url: "https://luckyxdev.me",
    siteName: "LUCKYXDEV",
    type: "website",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Lucky — Android & Web App Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucky — Android & Web App Developer",
    description:
      "Android and web app developer based in Bokaro, India. I design and build complete digital products end to end — clean interfaces, solid engineering, and software that ships. Available for freelance projects and collaborations.",
    images: ["/og.jpg"],
  },
};

export default function HomePage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Lucky",
    jobTitle: "Android & Web App Developer",
    url: "https://luckyxdev.me",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bokaro",
      addressCountry: "India",
    },
    sameAs: [
      "https://github.com/rahulx-dev",
      "https://www.linkedin.com/in/rahul-mahato-46111234a/",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "LUCKYXDEV",
    url: "https://luckyxdev.me",
    description:
      "Android and web app developer based in Bokaro, India. I design and build complete digital products end to end — clean interfaces, solid engineering, and software that ships. Available for freelance projects and collaborations.",
  };

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      {/* 1. HERO SECTION: Exactly 100vh on desktop, stacks on mobile */}
      <section className="relative h-[calc(100vh-72px)] min-h-[580px] max-w-7xl mx-auto px-6 sm:px-8 md:px-12 flex flex-col justify-between overflow-hidden">
        {/* Main Hero Content: stacks on mobile (<768px: portrait ~45vh on top, name below) */}
        <div className="flex-1 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 my-auto w-full">
          {/* Mobile Top (~45vh) / Desktop Right (~55%): AsciiPortrait */}
          <div className="order-1 md:order-2 w-full md:w-[55%] h-[42vh] sm:h-[48vh] md:h-full flex items-center justify-center md:justify-end relative">
            <AsciiPortrait className="w-full max-w-[360px] sm:max-w-[440px] md:max-w-[520px] lg:max-w-[580px] h-auto max-h-[calc(100vh-140px)] aspect-square" />
          </div>

          {/* Mobile Bottom / Desktop Left (~45%): Massive LUCKY + 1-Line Tagline */}
          <div className="order-2 md:order-1 w-full md:w-[45%] flex flex-col justify-center relative z-10 md:-mr-12 lg:-mr-16">
            <h1 className="font-heading text-[clamp(4.5rem,14vw,12.5rem)] font-bold text-white tracking-tighter leading-[0.82] uppercase select-none">
              <WordReveal text="LUCKY" as="span" className="block" delay={0.05} />
            </h1>

            <div className="mt-4 sm:mt-6">
              <ScrollReveal delay={0.15}>
                <p className="font-body text-xl sm:text-2xl text-[#D4D4D4] font-normal tracking-tight">
                  I build apps people actually use.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* Bottom Hero Bar: "SCROLL ↓" only (NO address in hero per spec) */}
        <div className="border-t border-[#262626] py-4 font-mono-label text-xs sm:text-sm text-[#737373]">
          <span className="tracking-widest">SCROLL ↓</span>
        </div>
      </section>

      {/* Marquee Strip between Hero and SELECTED WORK */}
      <MarqueeStrip />

      {/* 2. SELECTED WORK PREVIEW */}
      <section className="py-24 sm:py-32 border-t border-[#262626] px-6 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="font-mono-label text-xs sm:text-sm text-[#A3E635] tracking-widest mb-3">
                SELECTED WORK
              </p>
              <h2 className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-white tracking-tight leading-none uppercase">
                SELECTED WORK
              </h2>
            </div>
            <Link
              href="/projects"
              className="nav-link font-mono-label text-xs sm:text-sm text-[#A3A3A3] hover:text-[#A3E635] transition-colors self-start sm:self-auto mb-1"
            >
              VIEW ALL PROJECTS →
            </Link>
          </div>
        </div>

        {/* Hairline Divider */}
        <div className="w-full h-px bg-[#262626] mb-12 sm:mb-16" />

        {/* Project Cards (No ghost index numbers) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          {PROJECTS.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.15}>
              <Link
                href={`/projects/${project.slug}`}
                className="group relative block bg-[#141414] border border-[#262626] hover:border-[#A3E635] transition-all duration-300 p-8 sm:p-10 flex flex-col justify-between min-h-[500px] sm:min-h-[540px] overflow-hidden"
              >
                {/* Card Top Meta */}
                <div className="flex items-start justify-between mb-8">
                  <span className="font-mono-label text-xs text-[#737373] tracking-widest">
                    {project.year} • {project.type}
                  </span>
                  <span className="font-mono-label text-xs px-2.5 py-1 bg-[#0A0A0A] border border-[#262626] text-[#A3E635]">
                    {project.metaStatus}
                  </span>
                </div>

                {/* Card Center Visual Area with PhoneShot on .bg-dots-texture */}
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

                {/* Card Bottom: Title with sliding → arrow & Tagline */}
                <div>
                  <h3 className="font-heading text-3xl sm:text-4xl font-bold text-white group-hover:text-[#A3E635] transition-colors mb-2 flex items-center justify-between">
                    <span>{project.name}</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-[6px] text-2xl sm:text-3xl">
                      →
                    </span>
                  </h3>
                  <p className="font-body text-[#A3A3A3] text-sm sm:text-base">
                    {project.tagline}
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 3. PRODUCTS STRIP */}
      <section className="py-24 sm:py-32 border-t border-[#262626] px-6 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="font-mono-label text-xs sm:text-sm text-[#A3E635] tracking-widest mb-3">
                PRODUCTS
              </p>
              <h2 className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-white tracking-tight leading-none uppercase">
                PRODUCTS
              </h2>
            </div>
            <Link
              href="/products"
              className="nav-link font-mono-label text-xs sm:text-sm text-[#A3A3A3] hover:text-[#A3E635] transition-colors self-start sm:self-auto mb-1"
            >
              VIEW PRODUCTS →
            </Link>
          </div>
        </div>

        {/* Hairline Divider */}
        <div className="w-full h-px bg-[#262626] mb-8 sm:mb-12" />

        {/* Product Items List (No ghost index numbers) */}
        <div className="divide-y divide-[#262626]">
          {PRODUCTS.map((product) => (
            <ScrollReveal key={product.id}>
              <div className="group py-8 sm:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all hover:bg-[#141414] px-6 -mx-6 border-l-2 border-transparent hover:border-[#A3E635]">
                <Link
                  href={`/products/${product.slug}`}
                  className="flex-1 focus-visible:outline-none"
                >
                  <div className="flex items-center gap-4 mb-1">
                    <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white group-hover:text-[#A3E635] group-hover:translate-x-2 transition-all duration-300">
                      {product.name}
                    </h3>
                    <span className="font-mono-label text-xs px-2.5 py-0.5 bg-[#0A0A0A] border border-[#262626] text-[#A3E635]">
                      {product.tag}
                    </span>
                  </div>
                  <p className="font-body text-sm text-[#737373]">
                    {product.tagline}
                  </p>
                </Link>

                <div className="flex items-center gap-6 self-start md:self-auto">
                  <span className="font-mono-label text-xs text-[#737373] hidden sm:block">
                    {product.type}
                  </span>
                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex items-center justify-center min-h-[44px] px-6 py-2 bg-[#A3E635] hover:bg-white text-[#0A0A0A] font-mono-label text-xs font-bold tracking-wider transition-colors rounded-full"
                  >
                    GET ↗
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 4. ABOUT SECTION (Max 3 lines, no invented marketing lines) */}
      <section className="py-24 sm:py-36 border-t border-[#262626] px-6 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <div className="mb-6">
          <p className="font-mono-label text-xs sm:text-sm text-[#A3E635] tracking-widest mb-3">
            ABOUT
          </p>
          <h2 className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-white tracking-tight leading-none uppercase">
            ABOUT
          </h2>
        </div>

        {/* Hairline Divider */}
        <div className="w-full h-px bg-[#262626] mb-12 sm:mb-16" />

        <div className="max-w-4xl">
          <ScrollReveal>
            <p className="font-body text-2xl sm:text-3xl md:text-4xl text-white font-normal leading-[1.35]">
              {ABOUT_COPY}
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
