import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ScrollReveal from "@/components/ScrollReveal";
import WaveHeading from "@/components/WaveHeading";
import PhoneShot from "@/components/PhoneShot";
import { PRODUCTS } from "@/lib/data";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const PRODUCT_META: Record<string, { title: string; description: string }> = {
  arise: {
    title: "ARISE — Coming Soon | Lucky",
    description:
      "ARISE — the gamified fitness app by Lucky. Android APK coming soon.",
  },
  "gym-management": {
    title: "Download Gym Management APK | Lucky",
    description:
      "Gym Management replaces the gym owner's notebook — member records, automatic fee dues, payment receipts and one-tap WhatsApp reminders. Free Android APK download.",
  },
};

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
  const meta = PRODUCT_META[slug];

  if (!product || !meta) {
    return {
      title: "Product Not Found | Lucky",
    };
  }

  const url = `https://luckyxdev.me/products/${product.slug}`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      siteName: "LUCKYXDEV",
      type: "website",
      images: [
        {
          url: "/og.jpg",
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/og.jpg"],
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
    "https://www.mediafire.com/file/m137vkcq51ti6w8/Royal_Gym_v1.0.0.apk/file";

  return (
    <article className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12 py-16 sm:py-24">
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

      <div className="mb-14 sm:mb-20">
        <WaveHeading className="font-heading text-6xl sm:text-8xl md:text-9xl font-bold text-white tracking-tighter uppercase mb-6">
          {product.name}
        </WaveHeading>
        <p className="font-body text-xl sm:text-2xl md:text-3xl text-[#A3A3A3] max-w-2xl font-light">
          {product.tagline}
        </p>
      </div>

      <div className="w-full h-px bg-[#262626] mb-12 sm:mb-16" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16 items-center">
        <div className="md:col-span-6 flex items-center justify-center">
          <ScrollReveal className="w-full">
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

        <div className="md:col-span-6 flex flex-col justify-center">
          <ScrollReveal delay={0.1}>
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
