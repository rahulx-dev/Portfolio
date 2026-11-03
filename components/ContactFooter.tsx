import LiveClock from "./LiveClock";
import ContactForm from "./ContactForm";
import ScrollReveal from "./ScrollReveal";
import { SITE_METADATA } from "@/lib/data";

export default function ContactFooter() {
  return (
    <footer id="contact" className="border-t border-[#262626] pt-24 sm:pt-28 pb-16 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 mb-20 sm:mb-24 items-start">
            <div className="lg:col-span-7">
              <p className="font-mono-label text-xs sm:text-sm text-[#A3E635] tracking-widest mb-4">
                CONTACT
              </p>
              <h2 className="font-heading text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] text-white font-bold tracking-tight uppercase mb-8">
                LET&apos;S BUILD
              </h2>
              <p className="font-body text-base sm:text-lg text-[#A3A3A3] mb-8 max-w-md">
                Have an app idea or need a project built? Send a message or write to me directly.
              </p>
              <a
                href={`mailto:${SITE_METADATA.email}`}
                className="inline-block font-heading text-xl sm:text-2xl md:text-3xl text-white hover:text-[#A3E635] transition-colors border-b-2 border-white hover:border-[#A3E635] pb-1 break-all"
              >
                {SITE_METADATA.email}
              </a>
            </div>

            <div className="lg:col-span-5 bg-[#141414] border border-[#262626] p-6 sm:p-8">
              <ContactForm />
            </div>
          </div>
        </ScrollReveal>

        <div className="pt-8 border-t border-[#262626] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 font-mono-label text-xs sm:text-[13px] text-[#A3A3A3]">
          <div>© 2026 LUCKYXDEV</div>

          <div className="flex items-center gap-2">
            <span>BOKARO, INDIA •</span>
            <LiveClock />
          </div>

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
