import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ScrollReveal from "@/components/ScrollReveal";
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
    title: "Download Royal Gym APK | Lucky",
    description:
      "An offline-first Android app built to replace manual gym registers — member dues, payment settlement, digital receipts, and WhatsApp reminders with zero cloud fees.",
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
    "https://www.mediafire.com/file/n3v0zmv8v9tutx8/Royal-Gym-Release.apk/file";

  if (isGym && product.detailedFeatures && product.screenshots) {
    return (
      <article className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12 py-16 sm:py-24">
        {/* Navigation Breadcrumb */}
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

        {/* 1. Hero Section */}
        <section className="mb-20 sm:mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
            <div className="lg:col-span-7 flex flex-col justify-center">
              <p className="font-mono-label text-xs sm:text-sm text-[#A3E635] tracking-widest mb-4">
                ANDROID APK — 100% OFFLINE
              </p>

              <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl font-bold text-white tracking-tighter uppercase mb-4 leading-none">
                {product.name}
              </h1>

              <p className="font-heading text-xl sm:text-2xl text-white font-medium mb-6">
                {product.tagline}
              </p>

              <p className="font-body text-base sm:text-lg text-[#A3A3A3] leading-relaxed mb-8">
                {product.intro}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center min-h-[48px] px-8 sm:px-10 py-3.5 bg-[#A3E635] text-[#0A0A0A] font-mono-label text-xs sm:text-sm font-bold tracking-widest hover:bg-white transition-colors focus-visible:outline-none rounded-full"
                >
                  DOWNLOAD APK ↗
                </a>

                <a
                  href="#screenshots"
                  className="inline-flex items-center justify-center min-h-[48px] px-7 sm:px-8 py-3.5 bg-[#141414] hover:bg-[#1f1f1f] border border-[#262626] hover:border-[#A3E635] text-white font-mono-label text-xs sm:text-sm font-bold tracking-wider transition-colors rounded-full focus-visible:outline-none"
                >
                  SEE IT IN ACTION ↓
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 flex items-center justify-center">
              <ScrollReveal className="w-full">
                <div className="w-full bg-[#141414] bg-dots-texture border border-[#262626] flex items-center justify-center p-8 sm:p-12 overflow-hidden">
                  <PhoneShot
                    src="/gym/01-home-overview.jpg"
                    alt="Royal Gym app home screen showing collected and pending fees"
                    className="w-[230px] sm:w-[260px] md:w-[280px] h-[430px] sm:h-[480px] md:h-[510px]"
                    priority
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* 2. Highlights Strip */}
        {product.highlights && (
          <ScrollReveal className="mb-20 sm:mb-28">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {product.highlights.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#141414] border border-[#262626] p-6 flex flex-col justify-between"
                >
                  <p className="font-heading text-3xl sm:text-4xl font-bold text-white mb-2">
                    {item.stat}
                  </p>
                  <p className="font-mono-label text-xs text-[#A3A3A3] tracking-widest">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        )}

        <div className="w-full h-px bg-[#262626] mb-16 sm:mb-24" />

        {/* 3. Features Section */}
        <section className="mb-20 sm:mb-28">
          <div className="mb-12">
            <p className="font-mono-label text-xs sm:text-sm text-[#A3E635] tracking-widest mb-3">
              FEATURES
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight uppercase">
              Everything a gym desk does. In one app.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {product.detailedFeatures.map((feature, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <div className="h-full bg-[#141414] border border-[#262626] hover:border-[#A3E635] transition-colors p-7 flex flex-col justify-between">
                  <div>
                    <div className="font-mono-label text-xs text-[#A3E635] font-bold mb-4">
                      0{index + 1}
                    </div>
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="font-body text-sm sm:text-base text-[#A3A3A3] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <div className="w-full h-px bg-[#262626] mb-16 sm:mb-24" />

        {/* 4. Screenshots Section */}
        <section id="screenshots" className="mb-20 sm:mb-28 scroll-mt-24">
          <div className="mb-12">
            <p className="font-mono-label text-xs sm:text-sm text-[#A3E635] tracking-widest mb-3">
              INSIDE THE APP
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight uppercase mb-3">
              Inside the app
            </h2>
            <p className="font-body text-sm sm:text-base text-[#A3A3A3]">
              Swipe horizontally on mobile or browse below to explore Royal Gym workflows.
            </p>
          </div>

          {/* Responsive gallery: horizontal scroll on mobile, responsive grid on desktop */}
          <div className="flex overflow-x-auto pb-6 gap-6 snap-x snap-mandatory scrollbar-thin md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8">
            {product.screenshots.map((shot, index) => (
              <div
                key={index}
                className="min-w-[260px] sm:min-w-[290px] md:min-w-0 snap-center flex-shrink-0 flex flex-col"
              >
                <div className="w-full bg-[#141414] bg-dots-texture border border-[#262626] flex items-center justify-center p-6 sm:p-8 overflow-hidden">
                  <PhoneShot
                    src={shot.src}
                    alt={shot.alt}
                    className="w-[190px] sm:w-[210px] h-[360px] sm:h-[400px]"
                  />
                </div>
                <p className="font-mono-label text-[11px] sm:text-xs text-[#A3A3A3] text-center mt-3 tracking-wider px-2">
                  {shot.caption}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="w-full h-px bg-[#262626] mb-16 sm:mb-24" />

        {/* 5. How It Works Section */}
        {product.steps && (
          <section className="mb-20 sm:mb-28">
            <div className="mb-12">
              <p className="font-mono-label text-xs sm:text-sm text-[#A3E635] tracking-widest mb-3">
                SETUP
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight uppercase">
                From notebook to app in one afternoon
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {product.steps.map((step, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="h-full bg-[#141414] border border-[#262626] p-7 sm:p-8 flex flex-col justify-between">
                    <div>
                      <span className="font-mono-label text-xs text-[#A3E635] tracking-widest mb-4 block">
                        STEP 0{index + 1}
                      </span>
                      <h3 className="font-heading text-2xl font-bold text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="font-body text-sm sm:text-base text-[#A3A3A3] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        )}

        {/* 6. Download Block */}
        <section className="my-12">
          <ScrollReveal>
            <div className="bg-[#141414] border border-[#262626] p-8 sm:p-14 text-center">
              <span className="font-mono-label text-xs text-[#A3E635] tracking-widest mb-3 block">
                GET STARTED
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight uppercase mb-4">
                Run your gym from your phone.
              </h2>
              <p className="font-body text-base sm:text-lg text-[#A3A3A3] max-w-xl mx-auto mb-8 leading-relaxed">
                Royal Gym is an Android app. Download the APK, activate it once, and it works forever — with or without internet.
              </p>
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-h-[48px] px-10 py-3.5 bg-[#A3E635] text-[#0A0A0A] font-mono-label text-xs sm:text-sm font-bold tracking-widest hover:bg-white transition-colors focus-visible:outline-none rounded-full"
              >
                DOWNLOAD APK ↗
              </a>
            </div>
          </ScrollReveal>
        </section>
      </article>
    );
  }

  // Classic fallback layout for other products (e.g. ARISE)
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
        <h1 className="font-heading text-6xl sm:text-8xl md:text-9xl font-bold text-white tracking-tighter uppercase mb-6">
          {product.name}
        </h1>
        <p className="font-body text-xl sm:text-2xl md:text-3xl text-[#A3A3A3] max-w-2xl font-light">
          {product.tagline}
        </p>
      </div>

      <div className="w-full h-px bg-[#262626] mb-12 sm:mb-16" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16 items-center">
        <div className="md:col-span-6 flex items-center justify-center">
          <ScrollReveal className="w-full">
            <div className="w-full bg-[#141414] bg-dots-texture border border-[#262626] flex items-center justify-center p-8 sm:p-12 overflow-hidden">
              <PhoneShot
                teaserTitle="ARISE"
                teaserSubtitle="IN DEVELOPMENT"
                className="w-[230px] sm:w-[270px] md:w-[290px] h-[430px] sm:h-[490px] md:h-[530px]"
              />
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
