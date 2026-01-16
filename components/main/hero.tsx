import { HeroContent } from "@/components/sub/hero-content";

export const Hero = () => {
  return (
    <div className="relative flex flex-col h-full w-full">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="rotate-180 absolute top-[-340px] left-0 w-full h-full object-cover -z-20"
        aria-hidden="true"
      >
        <source src="/videos/blackhole.webm" type="video/webm" />
        {/* Fallback for browsers that don't support video */}
        Your browser does not support the video tag.
      </video>

      <HeroContent />
    </div>
  );
};
