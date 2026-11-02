import type { Metadata } from "next";
import Link from "next/link";
import { WordReveal } from "@/components/WordReveal";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PRODUCTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Products • Lucky (Rahul Mahato)",
  description:
    "Android mobile applications and software products built by Lucky. Available for use.",
  alternates: {
    canonical: "/products",
  },
};

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 py-16 sm:py-24">
      {/* Label & Massive Heading (No numbering) */}
      <div className="mb-6">
        <p className="font-mono-label text-xs sm:text-sm text-[#A3E635] tracking-widest mb-4">
          PRODUCTS
        </p>
        <WordReveal
          text="PRODUCTS"
          as="h1"
          className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-bold text-white tracking-tight leading-none uppercase"
        />
      </div>

      {/* Hairline divider */}
      <div className="w-full h-px bg-[#262626] mb-14 sm:mb-20" />

      {/* Shop-Style Tiles Grid (No ghost index numbers) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
        {PRODUCTS.map((product, index) => (
          <ScrollReveal key={product.id} delay={index * 0.15}>
            <div className="group relative bg-[#141414] border border-[#262626] hover:border-[#A3E635] transition-all duration-300 p-8 sm:p-10 flex flex-col justify-between min-h-[520px] overflow-hidden">
              {/* Top: Meta info */}
              <div className="flex items-start justify-between mb-8">
                <span className="font-mono-label text-xs text-[#737373] tracking-widest">
                  {product.type}
                </span>
                <span className="font-mono-label text-xs px-2.5 py-0.5 bg-[#0A0A0A] border border-[#262626] text-[#A3E635]">
                  {product.tag}
                </span>
              </div>

              {/* Big Visual Area with grid texture + hover scale */}
              <div className="w-full aspect-[4/3] bg-grid-texture border border-[#262626] flex items-center justify-center p-8 mb-8 overflow-hidden relative">
                <div className="text-center group-hover:scale-[1.04] transition-transform duration-500 ease-out">
                  <span className="font-mono-label text-xs sm:text-sm text-[#737373] tracking-widest uppercase block mb-1">
                    {product.name}
                  </span>
                  <span className="font-mono-label text-[11px] text-[#A3E635] opacity-75">
                    {product.metaStatus}
                  </span>
                </div>
              </div>

              {/* Product Info & Action */}
              <div>
                <p className="font-mono-label text-xs text-[#737373] tracking-wider mb-2">
                  {product.type} • {product.metaStatus}
                </p>

                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white group-hover:text-[#A3E635] group-hover:translate-x-2 transition-all duration-300 mb-2">
                  {product.name}
                </h2>

                <p className="font-body text-[#A3A3A3] text-sm sm:text-base mb-8">
                  {product.tagline}
                </p>

                {/* Accent Pill "GET" */}
                <div className="flex items-center gap-4">
                  {product.downloadUrl ? (
                    <a
                      href={product.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center min-h-[44px] px-8 py-3 bg-[#A3E635] text-[#0A0A0A] font-mono-label text-xs sm:text-sm font-bold tracking-wider hover:bg-white transition-colors focus-visible:outline-none rounded-full"
                    >
                      GET ↗
                    </a>
                  ) : (
                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-flex items-center justify-center min-h-[44px] px-8 py-3 bg-[#1a1a1a] text-[#A3E635] border border-[#262626] font-mono-label text-xs sm:text-sm font-bold tracking-wider hover:border-[#A3E635] transition-colors focus-visible:outline-none rounded-full"
                    >
                      VIEW PRODUCT →
                    </Link>
                  )}
                  <Link
                    href={`/products/${product.slug}`}
                    className="font-mono-label text-xs text-[#737373] hover:text-white transition-colors py-2"
                  >
                    DETAILS →
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
