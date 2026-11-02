"use client";

export default function MarqueeStrip() {
  const item = (
    <span className="inline-flex items-center gap-6 shrink-0">
      <span>ANDROID APPS</span>
      <span className="text-[#A3E635]">✦</span>
      <span>WEB APPS</span>
      <span className="text-[#A3E635]">✦</span>
      <span>REAL PRODUCTS</span>
      <span className="text-[#A3E635]">✦</span>
    </span>
  );

  return (
    <div
      className="w-full border-y border-[#262626] bg-[#0A0A0A] py-3.5 overflow-hidden select-none"
      aria-label="Capabilities ticker"
    >
      <div className="animate-marquee-strip font-mono-label text-xs sm:text-sm tracking-widest text-[#737373] uppercase whitespace-nowrap flex items-center gap-6">
        {item}
        {item}
        {item}
        {item}
        {item}
        {item}
        {item}
        {item}
        {item}
        {item}
      </div>
    </div>
  );
}
