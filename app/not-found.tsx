import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "Page Not Found | Lucky",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="font-heading text-8xl sm:text-9xl md:text-[12rem] font-bold text-white tracking-tighter leading-none mb-6">
        404
      </h1>
      <ScrollReveal delay={0.1}>
        <p className="text-xl sm:text-2xl text-[#A3A3A3] font-body mb-10">
          Page not found.
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <Link
          href="/"
          className="nav-link font-mono-label text-sm sm:text-base text-white hover:text-[#A3E635] transition-colors"
        >
          ← BACK HOME
        </Link>
      </ScrollReveal>
    </div>
  );
}
