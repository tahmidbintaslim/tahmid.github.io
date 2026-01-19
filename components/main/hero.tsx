import { HeroContent } from '@/components/sub/hero-content';

interface HeroProps {
  onLocationClick?: () => void;
  onNewsClick?: () => void;
  onFeedbackClick?: () => void;
}

export const Hero = ({
  onLocationClick,
  onNewsClick,
  onFeedbackClick,
}: HeroProps) => {
  return (
    <div id="hero" className="relative flex h-full w-full flex-col">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Animated background video of a black hole"
        title="Black hole animation"
        className="absolute top-[-340px] left-0 -z-20 h-full w-full rotate-180 object-cover"
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
