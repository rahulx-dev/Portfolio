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

      {/* 1. HERO SECTION */}
      <section className="min-h-[calc(100vh-5rem)] flex flex-col justify-between px-6 sm:px-8 md:px-12 max-w-7xl mx-auto py-12 sm:py-16">
        {/* Top Label */}
        <div className="pt-2 sm:pt-4">
          <p className="font-mono-label text-xs sm:text-sm text-[#A3E635] tracking-widest">
            PORTFOLIO — 2026
          </p>
        </div>

        {/* Main Massive Editorial Title & Single Line */}
        <div className="my-auto py-12 sm:py-16">
          <h1 className="font-heading text-[15vw] sm:text-[14vw] md:text-[13vw] lg:text-[9.5rem] font-bold tracking-tighter leading-[0.88] text-white uppercase select-none">
            <WordReveal text="LUCKY" as="span" className="block" delay={0.05} />
            <WordReveal
              text="BUILDS APPS."
              accentWords={["APPS."]}
              as="span"
              className="block"
              delay={0.15}
            />
          </h1>

          <div className="mt-8 sm:mt-12 max-w-2xl">
            <ScrollReveal delay={0.3}>
              <p className="font-body text-lg sm:text-xl md:text-2xl text-[#A3A3A3] font-normal tracking-tight">
                I build apps people actually use.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex items-center justify-between border-t border-[#262626] pt-6 sm:pt-8 font-mono-label text-xs sm:text-sm text-[#737373]">
          <span className="tracking-widest">SCROLL ↓</span>
          <span className="tracking-widest">BOKARO, INDIA</span>
        </div>
      </section>

      {/* 2. SELECTED WORK PREVIEW */}
      <section className="py-24 sm:py-32 border-t border-[#262626] px-6 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-baseline justify-between mb-16 sm:mb-20">
          <p className="font-mono-label text-xs sm:text-sm text-[#737373] tracking-widest">
            SELECTED WORK
          </p>
          <Link
            href="/projects"
            className="nav-link font-mono-label text-xs sm:text-sm text-[#A3A3A3] hover:text-[#A3E635] transition-colors"
          >
            VIEW ALL PROJECTS →
          </Link>
        </div>

        {/* Large Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {selectedProjects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.15}>
              <Link
                href={`/projects/${project.slug}`}
                className="group block bg-[#141414] border border-[#262626] hover:border-[#A3E635] transition-colors duration-300 p-8 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[460px] sm:min-h-[520px]"
              >
                {/* Card Top: Year & Label */}
                <div className="flex items-center justify-between font-mono-label text-xs text-[#737373] mb-8">
                  <span>{project.year}</span>
                  <span className="text-[#A3E635] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    EXPLORE ↗
                  </span>
                </div>

                {/* Card Visual Placeholder Area */}
                <div className="w-full flex-1 bg-[#0A0A0A] border border-[#262626] flex items-center justify-center mb-8 p-6">
                  <span className="font-mono-label text-xs text-[#525252] tracking-widest uppercase">
                    {project.name} PREVIEW
                  </span>
                </div>

                {/* Card Bottom: Name & Tagline */}
                <div>
                  <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white group-hover:text-[#A3E635] transition-colors mb-2">
                    {project.name}
                  </h2>
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
      <section className="py-20 sm:py-28 border-t border-[#262626] px-6 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-12 border-b border-[#262626]">
          <p className="font-mono-label text-xs sm:text-sm text-[#737373] tracking-widest">
            MY PRODUCTS
          </p>
          <Link
            href="/products"
            className="nav-link font-mono-label text-xs sm:text-sm text-[#A3A3A3] hover:text-[#A3E635] transition-colors self-start md:self-auto"
          >
            VIEW PRODUCTS →
          </Link>
        </div>

        <div className="divide-y divide-[#262626]">
          {PRODUCTS.map((product) => (
            <ScrollReveal key={product.id}>
              <Link
                href={`/products/${product.slug}`}
                className="group py-8 sm:py-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:bg-[#141414] px-4 -mx-4"
              >
                <div className="flex items-baseline gap-6">
                  <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white group-hover:text-[#A3E635] transition-colors">
                    {product.name}
                  </h3>
                  <span className="font-mono-label text-xs px-2.5 py-1 bg-[#0A0A0A] border border-[#262626] text-[#A3A3A3]">
                    {product.tag}
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <p className="font-body text-sm text-[#737373] hidden md:block">
                    {product.tagline}
                  </p>
                  <span className="font-mono-label text-xs text-[#A3E635] tracking-wider">
                    GET ↗
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 4. ABOUT SECTION */}
      <section className="py-24 sm:py-36 border-t border-[#262626] px-6 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: About Copy (Max 3 lines) */}
          <div className="lg:col-span-7">
            <p className="font-mono-label text-xs sm:text-sm text-[#737373] tracking-widest mb-8">
              ABOUT
            </p>
            <ScrollReveal>
              <h2 className="font-body text-2xl sm:text-3xl md:text-4xl text-white font-normal leading-relaxed md:leading-[1.4] max-w-2xl">
                {ABOUT_COPY}
              </h2>
            </ScrollReveal>
          </div>

          {/* Right: AsciiPortrait placeholder */}
          <div className="lg:col-span-5 flex justify-start lg:justify-end">
            <ScrollReveal delay={0.2}>
              <AsciiPortrait />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
