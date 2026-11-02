import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WordReveal } from "@/components/WordReveal";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PRODUCTS } from "@/lib/data";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} — Products`,
    description: `${product.name}: ${product.tagline}. Download and use today.`,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <article className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 py-16 sm:py-24">
      {/* Back link */}
      <div className="mb-12">
        <Link
          href="/products"
          className="nav-link font-mono-label text-xs sm:text-sm text-[#A3A3A3] hover:text-[#A3E635] transition-colors"
        >
          ← ALL PRODUCTS
        </Link>
      </div>

      {/* Name & One Line */}
      <div className="mb-14 sm:mb-20">
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono-label text-xs px-3 py-1 bg-[#141414] border border-[#262626] text-[#A3E635]">
            {product.tag}
          </span>
        </div>
        <WordReveal
          text={product.name}
          as="h1"
          className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter uppercase mb-4"
        />
        <ScrollReveal delay={0.15}>
          <p className="font-body text-xl sm:text-2xl text-[#A3A3A3]">
            {product.tagline}
          </p>
        </ScrollReveal>
      </div>

      {/* Big Visual Placeholder */}
      <ScrollReveal delay={0.2} className="mb-16 sm:mb-20">
        <div
          className="w-full aspect-[16/9] bg-[#141414] border border-[#262626] flex items-center justify-center p-8 select-none"
          aria-label="Product visual placeholder"
        >
          <div className="text-center">
            <p className="font-mono-label text-xs sm:text-sm text-[#737373] tracking-widest uppercase mb-2">
              VISUAL PLACEHOLDER
            </p>
            <p className="font-mono-label text-[11px] text-[#404040]">
              {product.name}
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Action & Max 3 Feature Bullets */}
      <div className="border-t border-[#262626] pt-14 flex flex-col md:flex-row md:items-start justify-between gap-12">
        {/* GET Button (href="#") */}
        <ScrollReveal delay={0.25}>
          <a
            href="#"
            className="inline-flex items-center justify-center px-10 py-4 bg-[#A3E635] text-[#0A0A0A] font-mono-label text-sm font-bold tracking-widest hover:bg-white transition-colors focus-visible:outline-none"
          >
            GET
          </a>
        </ScrollReveal>

        {/* Max 3 Feature Bullets */}
        <ScrollReveal delay={0.3} className="max-w-xl">
          <ul className="space-y-4">
            {product.features.slice(0, 3).map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-4 font-body text-base sm:text-lg text-[#D4D4D4]"
              >
                <span className="font-mono-label text-[#A3E635] text-sm select-none pt-1">
                  —
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </article>
  );
}
