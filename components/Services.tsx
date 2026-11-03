import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

const SERVICES = [
  {
    title: "Android Apps",
    desc: "Complete Android apps from idea to a ready-to-install APK. Clean UI, offline-first where it matters. React Native and Expo.",
    points: [
      "App UI + logic",
      "APK or Play Store delivery",
      "Source code included",
    ],
  },
  {
    title: "Web Apps",
    desc: "Dashboards, tools and full-stack web apps with React, Next.js and Node. Fast, responsive, deployed live.",
    points: [
      "React / Next.js frontend",
      "Node + database backend",
      "Deployed on your domain",
    ],
  },
  {
    title: "Business Websites",
    desc: "Sharp websites for local businesses that turn visitors into WhatsApp enquiries.",
    points: [
      "Mobile-first design",
      "WhatsApp + call buttons",
      "Google-ready SEO basics",
    ],
  },
];

export default function Services() {
  return (
    <section className="py-24 sm:py-32 border-t border-[#262626] px-6 sm:px-8 md:px-12 max-w-7xl mx-auto">
      <div className="mb-6">
        <p className="font-mono-label text-xs sm:text-sm text-[#A3E635] tracking-widest mb-3">
          WHAT I CAN BUILD FOR YOU
        </p>
        <h2 className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-white tracking-tight leading-none uppercase">
          SERVICES
        </h2>
      </div>

      <div className="w-full h-px bg-[#262626] mb-12 sm:mb-16" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SERVICES.map((service, index) => (
          <ScrollReveal key={service.title} delay={index * 0.1}>
            <div className="group h-full bg-[#141414] border border-[#262626] hover:border-[#A3E635] transition-colors p-8 flex flex-col justify-between">
              <div>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="font-body text-sm sm:text-base text-[#A3A3A3] mb-6 leading-relaxed">
                  {service.desc}
                </p>
                <ul className="space-y-2.5 mb-8">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="font-mono-label text-xs sm:text-[13px] text-[#D4D4D4] flex items-center gap-2.5"
                    >
                      <span className="text-[#A3E635]">✦</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/#contact"
                className="font-mono-label text-xs text-[#A3E635] hover:text-white transition-colors inline-flex items-center gap-2 pt-4 border-t border-[#262626]"
              >
                <span>Start a project</span>
                <span>→</span>
              </Link>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
