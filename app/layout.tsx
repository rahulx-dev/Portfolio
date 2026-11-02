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
    default: "Lucky — App Developer | luckyxdev",
    template: "%s | luckyxdev",
  },
  description:
    "Lucky builds Android & web apps end-to-end. Creator of ARISE and Royal Gym Manager. Web developer from Jharkhand, India.",
  openGraph: {
    title: "Lucky — App Developer | luckyxdev",
    description:
      "Lucky builds Android & web apps end-to-end. Creator of ARISE and Royal Gym Manager. Web developer from Jharkhand, India.",
    url: "https://luckyxdev.me",
    siteName: "luckyxdev",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "luckyxdev — App Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucky — App Developer | luckyxdev",
    description:
      "Lucky builds Android & web apps end-to-end. Creator of ARISE and Royal Gym Manager. Web developer from Jharkhand, India.",
    images: ["/og.jpg"],
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
      <body className="min-h-full flex flex-col bg-[#0A0A0A] text-[#F5F5F5] antialiased selection:bg-[#A3E635] selection:text-[#0A0A0A]">
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
