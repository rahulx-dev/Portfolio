import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import ContactFooter from "@/components/ContactFooter";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";
import ScrollProgressBar from "@/components/ScrollProgressBar";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://luckyxdev.me"),
  title: {
    default: "Lucky (Rahul Mahato) • App & Web Developer",
    template: "%s | luckyxdev",
  },
  description:
    "Lucky builds Android & web apps end to end, creator of ARISE and Gym Management. Web developer from Bokaro, Jharkhand, India.",
  openGraph: {
    title: "Lucky (Rahul Mahato) • App & Web Developer",
    description:
      "Lucky builds Android & web apps end to end, creator of ARISE and Gym Management. Web developer from Bokaro, Jharkhand, India.",
    url: "https://luckyxdev.me",
    siteName: "luckyxdev",
    images: [
      {
        url: "/portrait.jpg",
        width: 1024,
        height: 1024,
        alt: "Lucky (Rahul Mahato) • luckyxdev",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucky (Rahul Mahato) • App & Web Developer",
    description:
      "Lucky builds Android & web apps end to end, creator of ARISE and Gym Management. Web developer from Bokaro, Jharkhand, India.",
    images: ["/portrait.jpg"],
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full dark`}
    >
      <head>
        <link rel="preload" href="/portrait.jpg" as="image" />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[#0A0A0A] text-[#F5F5F5] antialiased selection:bg-[#A3E635] selection:text-[#0A0A0A] overflow-x-hidden"
      >
        {/* Film grain noise overlay (opacity <= 0.04) */}
        <div className="film-grain" aria-hidden="true" />
        <ScrollProgressBar />

        <SmoothScroll>
          <Navigation />
          <main className="flex-1 pt-[72px]">
            <PageTransition>{children}</PageTransition>
          </main>
          <ContactFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
