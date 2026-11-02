import Link from "next/link";
import AsciiPortrait from "@/components/AsciiPortrait";
import { WordReveal } from "@/components/WordReveal";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PROJECTS, PRODUCTS, ABOUT_COPY, SITE_METADATA } from "@/lib/data";

export default function HomePage() {
  const selectedProjects = PROJECTS.filter((p) => p.slug !== null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_METADATA.author,
    alternateName: SITE_METADATA.handle,
    url: SITE_METADATA.url,
    jobTitle: "App Developer",
    description: SITE_METADATA.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bokaro",
      addressRegion: "Jharkhand",
      addressCountry: "India",
    },
    sameAs: SITE_METADATA.socials.map((s) => s.href),
  };

  return (
    <>
      {/* JSON-LD Person Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO SECTION — COMPLETE REDESIGN */}
      <section className="min-h-[calc(100svh-72px)] flex flex-col justify-between px-6 sm:px-8 md:px-12 max-w-7xl mx-auto py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center my-auto py-4 sm:py-6">
          {/* Left Column (~45% on desktop): Label, Massive LUCKY, Tagline */}
          <div className="lg:col-span-5 flex flex-col justify-center relative z-20">
            {/* Small mono label */}
            <p className="font-mono-label text-xs sm:text-sm text-[#A3E635] tracking-widest mb-6 sm:mb-8">
              PORTFOLIO — 2026
            </p>

            {/* Name in largest display type, overlapping portrait edge slightly */}
            <div className="-mr-0 lg:-mr-14 xl:-mr-20">
              <h1 className="font-heading text-[clamp(5rem,14vw,13rem)] font-bold text-white tracking-tighter leading-[0.82] select-none uppercase">
                <WordReveal text="LUCKY" as="span" className="block" delay={0.05} />
              </h1>
            </div>

            {/* Exactly one line tagline */}
            <div className="mt-6 sm:mt-8 max-w-md">
              <ScrollReveal delay={0.2}>
                <p className="font-body text-lg sm:text-xl md:text-2xl text-[#A3A3A3] font-normal tracking-tight">
                  I build apps people actually use.
                </p>
              </ScrollReveal>
            </div>
          </div>

          {/* Right Column (~55% on desktop): Large AsciiPortrait */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end items-center relative z-10 w-full">
            <ScrollReveal delay={0.15} className="w-full flex justify-center lg:justify-end">
              <AsciiPortrait className="w-full max-w-[500px] sm:max-w-[560px] lg:max-w-[620px] xl:max-w-[680px] h-auto aspect-square border border-[#262626]" />
            </ScrollReveal>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex items-center justify-between border-t border-[#262626] pt-5 sm:pt-6 font-mono-label text-xs sm:text-sm text-[#737373]">
          <span className="tracking-widest">SCROLL ↓</span>
          <span className="tracking-widest">BOKARO, INDIA</span>
        </div>
      </section>

      {/* 2. SELECTED WORK PREVIEW */}
      <section className="py-28 sm:py-36 border-t border-[#262626] px-6 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <div className="mb-6">
          <p className="font-mono-label text-xs sm:text-sm text-[#A3E635] tracking-widest mb-3">
            SELECTED WORK
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-bold text-white tracking-tight leading-none uppercase">
              FEATURED WORK
            </h2>
            <Link
              href="/projects"
              className="nav-link font-mono-label text-xs sm:text-sm text-[#A3A3A3] hover:text-[#A3E635] transition-colors self-start sm:self-auto mb-1"
            >
              VIEW ALL PROJECTS →
            </Link>
          </div>
        </div>

        {/* Full-width hairline divider */}
        <div className="w-full h-px bg-[#262626] mb-14 sm:mb-20" />

        {/* Large Cards Grid with Object Feel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {selectedProjects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.15}>
              <Link
                href={`/projects/${project.slug}`}
                className="group relative block bg-[#141414] border border-[#262626] hover:border-[#A3E635] transition-all duration-300 p-8 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[500px] sm:min-h-[560px] overflow-hidden"
              >
                {/* Large outlined/ghost index number at top-right */}
                <div className="flex items-start justify-between mb-8">
                  <div className="font-mono-label text-xs text-[#737373] tracking-widest">
                    <span>{project.year} • {project.type}</span>
                  </div>
                  <span className="font-heading text-5xl sm:text-6xl font-bold text-[#262626] group-hover:text-[#333333] transition-colors select-none leading-none">
                    {project.index}
                  </span>
                </div>

                {/* Card Visual Area with subtle grid texture + hover scale */}
                <div className="w-full flex-1 bg-grid-texture border border-[#262626] flex items-center justify-center p-8 mb-8 overflow-hidden relative">
                  <div className="text-center group-hover:scale-[1.04] transition-transform duration-500 ease-out">
                    <span className="font-mono-label text-xs sm:text-sm text-[#737373] tracking-widest uppercase block mb-1">
                      {project.name}
                    </span>
                    <span className="font-mono-label text-[11px] text-[#A3E635] opacity-75">
                      {project.metaStatus}
                    </span>
                  </div>
                </div>

                {/* Card Bottom: Meta row & sliding title */}
                <div>
                  <p className="font-mono-label text-xs text-[#737373] tracking-wider mb-2">
                    {project.year} • {project.type} • {project.metaStatus}
                  </p>
                  <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white group-hover:text-[#A3E635] group-hover:translate-x-2 transition-all duration-300 mb-2">
                    {project.name}
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

      {/* 3. PRODUCTS PREVIEW STRIP */}
      <section className="py-24 sm:py-32 border-t border-[#262626] px-6 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <div className="mb-6">
          <p className="font-mono-label text-xs sm:text-sm text-[#A3E635] tracking-widest mb-3">
            MY PRODUCTS
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-bold text-white tracking-tight leading-none uppercase">
              APPS YOU CAN USE
            </h2>
            <Link
              href="/products"
              className="nav-link font-mono-label text-xs sm:text-sm text-[#A3A3A3] hover:text-[#A3E635] transition-colors self-start sm:self-auto mb-1"
            >
              VIEW PRODUCTS →
            </Link>
          </div>
        </div>

        {/* Full-width hairline divider */}
        <div className="w-full h-px bg-[#262626] mb-8 sm:mb-12" />

        <div className="divide-y divide-[#262626]">
          {PRODUCTS.map((product) => (
            <ScrollReveal key={product.id}>
              <Link
                href={`/products/${product.slug}`}
                className="group py-8 sm:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all hover:bg-[#141414] px-6 -mx-6 border-l-2 border-transparent hover:border-[#A3E635]"
              >
                <div className="flex items-baseline gap-6">
                  <span className="font-heading text-3xl sm:text-4xl font-bold text-[#262626] group-hover:text-[#383838] transition-colors select-none">
                    {product.index}
                  </span>
                  <div>
                    <div className="flex items-center gap-4 mb-1">
                      <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white group-hover:text-[#A3E635] group-hover:translate-x-2 transition-all duration-300">
                        {product.name}
                      </h3>
                      <span className="font-mono-label text-xs px-2.5 py-0.5 bg-[#0A0A0A] border border-[#262626] text-[#A3A3A3]">
                        {product.tag}
                      </span>
                    </div>
                    <p className="font-body text-sm text-[#737373]">
                      {product.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 self-start md:self-auto">
                  <span className="font-mono-label text-xs text-[#737373] hidden sm:block">
                    {product.type}
                  </span>
                  <span className="inline-flex items-center justify-center px-4 py-1.5 bg-[#0A0A0A] border border-[#262626] group-hover:border-[#A3E635] text-[#A3E635] font-mono-label text-xs font-bold tracking-wider transition-colors">
                    GET ↗
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 4. ABOUT SECTION */}
      <section className="py-28 sm:py-40 border-t border-[#262626] px-6 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <div className="mb-6">
          <p className="font-mono-label text-xs sm:text-sm text-[#A3E635] tracking-widest mb-3">
            ABOUT
          </p>
          <h2 className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-bold text-white tracking-tight leading-none uppercase">
            THE DEVELOPER
          </h2>
        </div>

        {/* Full-width hairline divider */}
        <div className="w-full h-px bg-[#262626] mb-14 sm:mb-20" />

        <div className="max-w-5xl">
          <ScrollReveal>
            <p className="font-body text-2xl sm:text-4xl lg:text-5xl text-white font-normal leading-[1.3] mb-10">
              {ABOUT_COPY}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="flex flex-wrap items-center gap-6 sm:gap-10 pt-8 border-t border-[#262626] font-mono-label text-xs sm:text-sm text-[#737373]">
              <div>
                <span className="text-[#A3E635] mr-2">LOCATION:</span>
                <span>BOKARO, JHARKHAND, INDIA</span>
              </div>
              <span className="text-[#333333] hidden sm:inline">•</span>
              <div>
                <span className="text-[#A3E635] mr-2">FOCUS:</span>
                <span>ANDROID &amp; WEB APPS</span>
              </div>
              <span className="text-[#333333] hidden sm:inline">•</span>
              <div>
                <span className="text-[#A3E635] mr-2">AVAILABILITY:</span>
                <span className="text-[#D4D4D4]">OPEN FOR CONTRACT</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
