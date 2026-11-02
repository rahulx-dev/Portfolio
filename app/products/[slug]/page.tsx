import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WordReveal } from "@/components/WordReveal";
import { ScrollReveal } from "@/components/ScrollReveal";
import PhoneShot from "@/components/PhoneShot";
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
    title: `${product.name} • Products`,
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

  const isGym = product.slug === "gym-management";
  const downloadUrl =
    product.downloadUrl ||
    "https://drive.google.com/uc?export=download&id=1lRyHWLtG1M3kGR4GZKCN2SIIfbIltXe6";

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
        <div className="flex items-center gap-3">
          <span className="font-mono-label text-xs text-[#737373]">
            {product.type}
          </span>
          <span className="font-mono-label text-xs px-2.5 py-0.5 bg-[#141414] border border-[#262626] text-[#A3E635]">
            {product.tag}
          </span>
        </div>
      </div>

      {/* Name & One Line Tagline */}
      <div className="mb-14 sm:mb-20">
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

      {/* Split layout: Phone large on left, Features + DOWNLOAD APK on right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16 items-center">
        {/* Left Column: Phone Shot */}
        <div className="md:col-span-6 flex items-center justify-center">
          <ScrollReveal delay={0.2} className="w-full">
            <div className="w-full bg-[#141414] bg-dots-texture border border-[#262626] flex items-center justify-center p-8 sm:p-12 overflow-hidden">
              {isGym ? (
                <PhoneShot
                  src="/shots/gym-1.jpg"
                  alt="Gym Management App Screenshot"
                  className="w-[230px] sm:w-[270px] md:w-[290px] h-[430px] sm:h-[490px] md:h-[530px]"
                  priority
                />
              ) : (
                <PhoneShot
                  teaserTitle="ARISE"
                  teaserSubtitle="IN DEVELOPMENT"
                  className="w-[230px] sm:w-[270px] md:w-[290px] h-[430px] sm:h-[490px] md:h-[530px]"
                />
              )}
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Features + DOWNLOAD APK */}
        <div className="md:col-span-6 flex flex-col justify-center">
          <ScrollReveal delay={0.25}>
            <p className="font-mono-label text-xs sm:text-sm text-[#A3E635] tracking-widest uppercase mb-4">
              FEATURES
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight uppercase mb-8">
              Key Capabilities
            </h2>

            <ul className="space-y-6 mb-12">
              {product.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 font-body text-base sm:text-lg text-[#D4D4D4] leading-relaxed"
                >
                  <span className="font-mono-label text-[#A3E635] text-base select-none pt-0.5">
                    ✦
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Action button: DOWNLOAD APK for gym management, disabled for Arise */}
            <div>
              {product.isDownloadDisabled ? (
                <button
                  disabled
                  className="inline-flex items-center justify-center min-h-[48px] px-10 py-3.5 bg-[#1a1a1a] text-[#737373] border border-[#262626] font-mono-label text-xs sm:text-sm font-bold tracking-widest rounded-full cursor-not-allowed select-none"
                >
                  {product.buttonText}
                </button>
              ) : (
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center min-h-[48px] px-10 py-3.5 bg-[#A3E635] text-[#0A0A0A] font-mono-label text-xs sm:text-sm font-bold tracking-widest hover:bg-white transition-colors focus-visible:outline-none rounded-full"
                >
                  DOWNLOAD APK ↗
                </a>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </article>
  );
}
