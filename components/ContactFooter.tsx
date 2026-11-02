import LiveClock from "./LiveClock";
import { SITE_METADATA } from "@/lib/data";
import { WordReveal } from "./WordReveal";
import { ScrollReveal } from "./ScrollReveal";

export default function ContactFooter() {
  return (
    <footer id="contact" className="border-t border-[#262626] pt-28 pb-16 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        {/* Massive LET'S BUILD Heading */}
        <div className="mb-10 sm:mb-14">
          <WordReveal
            text="LET'S BUILD"
            as="h2"
            className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white font-bold tracking-tight uppercase"
          />
        </div>

        {/* Big Underlined Email */}
        <ScrollReveal delay={0.1} className="mb-24 sm:mb-32">
          <a
            href={`mailto:${SITE_METADATA.email}`}
            className="group inline-block font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white hover:text-[#A3E635] transition-colors tracking-tight border-b-2 sm:border-b-4 border-white hover:border-[#A3E635] pb-2 sm:pb-3 break-all focus-visible:outline-none"
          >
            {SITE_METADATA.email}
          </a>
        </ScrollReveal>

        {/* Footer Row */}
        <div className="pt-8 border-t border-[#262626] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 font-mono-label text-xs sm:text-[13px] text-[#A3A3A3]">
          {/* Left: Copyright */}
          <div>© {SITE_METADATA.copyrightYear} {SITE_METADATA.handle.toUpperCase()}</div>

          {/* Center: Location + Live IST Clock */}
          <div className="flex items-center gap-2">
            <span>BOKARO, INDIA —</span>
            <LiveClock />
          </div>

          {/* Right: Social Links */}
          <div className="flex items-center gap-3">
            {SITE_METADATA.socials.map((social, index) => (
              <span key={social.label} className="inline-flex items-center gap-3">
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#A3E635] transition-colors"
                >
                  {social.label}
                </a>
                {index < SITE_METADATA.socials.length - 1 && (
                  <span className="text-[#404040]">/</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
