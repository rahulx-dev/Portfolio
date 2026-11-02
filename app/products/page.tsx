import type { Metadata } from "next";
import Link from "next/link";
import { WordReveal } from "@/components/WordReveal";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PRODUCTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Software products and mobile applications built by Lucky. Available for public use.",
};

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 py-16 sm:py-24">
      {/* Label & Massive Heading */}
      <div className="mb-16 sm:mb-24">
        <p className="font-mono-label text-xs sm:text-sm text-[#A3E635] tracking-widest mb-6">
          APPS YOU CAN USE
        </p>
        <WordReveal
          text="PRODUCTS"
          as="h1"
          className="font-heading text-6xl sm:text-8xl md:text-9xl font-bold text-white tracking-tighter uppercase"
        />
      </div>

      {/* Shop-Style Tiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
        {PRODUCTS.map((product, index) => (
          <ScrollReveal key={product.id} delay={index * 0.15}>
            <div className="group bg-[#141414] border border-[#262626] hover:border-[#A3E635] transition-colors duration-300 p-8 sm:p-10 flex flex-col justify-between min-h-[500px]">
              {/* Big Visual Placeholder */}
              <div className="w-full aspect-[4/3] bg-[#0A0A0A] border border-[#262626] flex items-center justify-center p-8 mb-8">
                <span className="font-mono-label text-xs sm:text-sm text-[#525252] tracking-widest uppercase">
                  {product.name}
                </span>
              </div>

              {/* Product Info & Action */}
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white group-hover:text-[#A3E635] transition-colors">
                    {product.name}
                  </h2>
                  <span className="font-mono-label text-xs px-3 py-1 bg-[#0A0A0A] border border-[#262626] text-[#A3A3A3]">
                    {product.tag}
                  </span>
                </div>

                <p className="font-body text-[#A3A3A3] text-sm sm:text-base mb-8">
                  {product.tagline}
                </p>

                {/* Accent Pill "GET" → Product Page */}
                <div>
                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex items-center justify-center px-6 py-2.5 bg-[#A3E635] text-[#0A0A0A] font-mono-label text-xs sm:text-sm font-bold tracking-wider hover:bg-white transition-colors focus-visible:outline-none"
                  >
                    GET
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
