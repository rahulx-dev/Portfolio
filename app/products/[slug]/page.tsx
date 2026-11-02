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
    title: `${product.name} • Products | luckyxdev`,
    description: `${product.name}: ${product.tagline}`,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <article className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12 py-16 sm:py-24">
      {/* Back link & Meta */}
      <div className="flex items-center justify-between mb-12 sm:mb-16">
        <Link
          href="/products"
          className="nav-link font-mono-label text-xs sm:text-sm text-[#A3A3A3] hover:text-[#A3E635] transition-colors"
        >
          ← ALL PRODUCTS
        </Link>
        <span className="font-mono-label text-xs text-[#737373]">
          {product.type}
        </span>
      </div>

      {/* Name & One Line */}
      <div className="mb-14 sm:mb-20">
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono-label text-xs px-3 py-1 bg-[#141414] border border-[#262626] text-[#A3E635]">
            {product.tag}
          </span>
          <span className="font-mono-label text-xs text-[#737373]">
            {product.metaStatus}
          </span>
        </div>
        <WordReveal
          text={product.name}
          as="h1"
          className="font-heading text-6xl sm:text-8xl md:text-9xl font-bold text-white tracking-tighter uppercase mb-6"
        />
        <ScrollReveal delay={0.15}>
          <p className="font-body text-xl sm:text-2xl md:text-3xl text-[#A3A3A3] max-w-2xl font-light">
            {product.tagline}
          </p>
        </ScrollReveal>
      </div>

      {/* Full-width hairline divider */}
      <div className="w-full h-px bg-[#262626] mb-12 sm:mb-16" />

      {/* Big Visual Placeholder with Mockup Frame */}
      <ScrollReveal delay={0.2} className="mb-16 sm:mb-24">
        <div
          className="w-full aspect-[16/9] bg-[#141414] border border-[#262626] flex flex-col select-none overflow-hidden"
          aria-label="Product visual placeholder"
        >
          <div className="px-6 py-3.5 border-b border-[#262626] flex items-center justify-between font-mono-label text-xs text-[#737373] bg-[#0A0A0A]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#262626]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#262626]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#262626]" />
            </div>
            <span>{product.slug}.apk</span>
            <span className="text-[#A3E635]">{product.tag}</span>
          </div>

          <div className="flex-1 bg-grid-texture flex items-center justify-center p-8">
            <div className="text-center">
              <p className="font-mono-label text-xs sm:text-sm text-[#737373] tracking-widest uppercase mb-2">
                VISUAL PLACEHOLDER
              </p>
              <p className="font-mono-label text-[11px] text-[#404040]">
                {product.name}
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Action & Max 3 Feature Bullets */}
      <div className="border-t border-[#262626] pt-14 flex flex-col md:flex-row md:items-start justify-between gap-12 sm:gap-16">
        {/* Action Button: DOWNLOAD APK (Active) or APK COMING SOON (Disabled) */}
        <ScrollReveal delay={0.25}>
          {product.isDownloadDisabled ? (
            <button
              disabled
              className="inline-flex items-center justify-center min-h-[48px] px-10 py-4 bg-[#1a1a1a] text-[#737373] border border-[#262626] font-mono-label text-sm font-bold tracking-widest rounded-full cursor-not-allowed select-none"
            >
              {product.buttonText}
            </button>
          ) : (
            <a
              href={product.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-h-[48px] px-12 py-4 bg-[#A3E635] text-[#0A0A0A] font-mono-label text-sm font-bold tracking-widest hover:bg-white transition-colors focus-visible:outline-none rounded-full"
            >
              {product.buttonText} →
            </a>
          )}
        </ScrollReveal>

        {/* Max 3 Feature Bullets */}
        <ScrollReveal delay={0.3} className="max-w-xl">
          <ul className="space-y-6">
            {product.features.slice(0, 3).map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-4 font-body text-lg sm:text-xl text-[#D4D4D4] leading-relaxed"
              >
                <span className="font-mono-label text-[#A3E635] text-base select-none pt-0.5">
                  •
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
