import { HeroContent } from "@/components/sub/hero-content";

interface HeroProps {
  onLocationClick?: () => void;
  onNewsClick?: () => void;
  onFeedbackClick?: () => void;
}

export const Hero = ({ onLocationClick, onNewsClick, onFeedbackClick }: HeroProps) => {
  return (
    <div id="hero" className="relative flex flex-col h-full w-full">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Animated background video of a black hole"
        title="Black hole animation"
        className="rotate-180 absolute top-[-340px] left-0 w-full h-full object-cover -z-20"
      >
        <source src="/videos/blackhole.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      <HeroContent
        onLocationClick={onLocationClick}
        onNewsClick={onNewsClick}
        onFeedbackClick={onFeedbackClick}
      />
    </div>
  );
};
