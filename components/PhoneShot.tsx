interface PhoneShotProps {
  src?: string;
  alt?: string;
  teaserTitle?: string;
  teaserSubtitle?: string;
  className?: string;
  priority?: boolean;
}

export default function PhoneShot({
  src,
  alt = "App Screenshot",
  teaserTitle,
  teaserSubtitle,
  className = "",
  priority = false,
}: PhoneShotProps) {
  return (
    <div
      className={`relative rounded-[2.2rem] p-2 bg-[#000000] border border-[#2A2A2A] shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)_inset] transition-all duration-500 ease-out ${className}`}
    >
      {/* Notch Pill */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-[#050505] rounded-full z-20 flex items-center justify-end pr-2.5 border border-[#222222]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#151515] border border-[#333333]" />
      </div>

      {/* Screen Area */}
      <div className="relative w-full h-full rounded-[1.75rem] overflow-hidden bg-[#000000] flex items-center justify-center">
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover object-top select-none pointer-events-none"
            loading={priority ? "eager" : "lazy"}
          />
        ) : (
          <div className="w-full h-full bg-[#000000] flex flex-col items-center justify-center p-6 text-center select-none">
            <span className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight uppercase mb-2">
              {teaserTitle || "ARISE"}
            </span>
            <span className="font-mono-label text-xs sm:text-sm text-[#A3E635] tracking-widest uppercase">
              {teaserSubtitle || "IN DEVELOPMENT"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
