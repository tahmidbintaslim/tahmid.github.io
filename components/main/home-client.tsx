'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import { ErrorBoundary } from '@/components/error-boundary';
import GSAPRegister from '@/components/sub/gsap-register';
import LoadingBanner from '@/components/sub/loading-banner';
import { Hero } from '@/components/main/hero';
import { SectionReveal } from '@/components/sub/section-reveal';
import SmoothScroll from '@/components/main/smooth-scroll';
import MotionTuner from '@/components/main/motion-tuner';
import type { LocationData, WeatherData } from '@/lib/location';
import type { VisitorStatsSummary } from '@/app/actions/visitors';
import type { NewsArticle } from '@/lib/server-data'; // Corrected import path for NewsArticle
import type { BlogPost } from '@/components/main/blog'; // Import BlogPost type
import type { LocationWidgetProps } from '@/components/widgets/location-widget'; // Import LocationWidgetProps
import type { NewsWidgetProps } from '@/components/widgets/news-widget'; // Import NewsWidgetProps

interface HomeClientProps {
  news: NewsArticle[];
  blogPosts: BlogPost[];
  blogLastUpdated?: string;
  location: LocationData | null;
  weather: WeatherData | null;
  visitorStats: VisitorStatsSummary | null;
}

// Lazy load all below-the-fold components for better initial load
const DynamicAboutEnhanced = dynamic(
  () =>
    import('@/components/main/about-enhanced').then((mod) => ({
      default: mod.AboutEnhanced,
    })),
  {
    loading: () => <div className="min-h-half-screen" />,
  }
);

const DynamicBlog = dynamic(() => import('@/components/main/blog'), {
  loading: () => <div className="min-h-half-screen" />,
});

const DynamicContact = dynamic(
  () =>
    import('@/components/main/contact').then((mod) => ({
      default: mod.Contact,
    })),
  {
    loading: () => <div className="min-h-half-screen" />,
  }
);

const DynamicFAQ = dynamic(
  () => import('@/components/main/faq').then((mod) => ({ default: mod.FAQ })),
  {
    loading: () => <div className="min-h-half-screen" />,
  }
);

const DynamicJourneyHorizontal = dynamic(
  () =>
    import('@/components/main/journey-horizontal').then((mod) => ({
      default: mod.JourneyHorizontal,
    })),
  {
    loading: () => <div className="min-h-half-screen" />,
  }
);

const DynamicMobileBottomNav = dynamic(
  () => import('@/components/main/mobile-bottom-nav'),
  {
    ssr: false,
  }
);

const DynamicPartnersScroll = dynamic(
  () => import('@/components/main/partners-scroll'),
  {
    loading: () => <div className="min-h-50" />,
  }
);

const DynamicSkills = dynamic(
  () =>
    import('@/components/main/skills').then((mod) => ({ default: mod.Skills })),
  {
    loading: () => <div className="min-h-half-screen" />,
  }
);

const DynamicServices = dynamic(
  () =>
    import('@/components/main/services').then((mod) => ({
      default: mod.Services,
    })),
  {
    loading: () => <div className="min-h-half-screen" />,
  }
);

const DynamicLocationWidgetModal = dynamic<LocationWidgetProps>( // Explicitly type
  () =>
    import('@/components/widgets/location-widget').then((mod) => mod.default),
  {
    ssr: false,
  }
);

const DynamicNewsWidgetModal = dynamic<NewsWidgetProps>( // Explicitly type
  () => import('@/components/widgets/news-widget').then((mod) => mod.default),
  {
    ssr: false,
  }
);

const DynamicFeedbackWidget = dynamic(
  () => import('@/components/widgets/feedback-widget'),
  {
    ssr: false,
  }
);

const DynamicEncryption = dynamic(
  () =>
    import('@/components/main/encryption').then((mod) => ({
      default: mod.Encryption,
    })),
  {
    loading: () => <div className="min-h-screen" />,
    ssr: false,
  }
);

const DynamicProjectsEnhanced = dynamic(
  () => import('@/components/main/projects-enhanced'),
  {
    loading: () => <div className="min-h-screen" />,
  }
);

const DynamicTestimonials = dynamic(
  () => import('@/components/main/testimonials'),
  {
    loading: () => <div className="min-h-screen" />,
  }
);

export default function HomeClient({
  news,
  blogPosts,
  blogLastUpdated,
  location,
  weather,
  visitorStats,
}: HomeClientProps) {
  const [feedbackWidgetOpen, setFeedbackWidgetOpen] = useState(false);
  const [locationWidgetOpen, setLocationWidgetOpen] = useState(false);
  const [newsWidgetOpen, setNewsWidgetOpen] = useState(false);
  // Loading banner state: mounted for render, visible for animation control
  const [bannerMounted, setBannerMounted] = useState(true);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Simulate loading progress - faster on mobile
  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const interval = setInterval(
      () => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          // Faster progress on mobile, more reliable completion
          const increment = isMobile
            ? Math.random() * 25 + 10
            : Math.random() * 15 + 5;
          return Math.min(100, prev + increment);
        });
      },
      isMobile ? 150 : 200
    );

    // Fallback: force completion after 8 seconds on mobile, 10 seconds on desktop
    const fallbackTimeout = setTimeout(
      () => {
        setLoadingProgress(100);
      },
      isMobile ? 8000 : 10000
    );

    return () => {
      clearInterval(interval);
      clearTimeout(fallbackTimeout);
    };
  }, []);

  // Hide banner when progress completes (fallback for mobile or when video doesn't load)
  useEffect(() => {
    if (loadingProgress >= 100 && bannerVisible) {
      setBannerVisible(false);
    }
  }, [loadingProgress, bannerVisible]);

  return (
    <main
      id="main-content"
      className="h-full w-full pb-24 md:pb-0"
      tabIndex={-1}
    >
      <GSAPRegister />
      {/* Global initial loading banner - covers initial page until hero signals ready */}
      {bannerMounted && (
        <LoadingBanner
          visible={bannerVisible}
          progress={loadingProgress}
          label={bannerVisible ? 'Bienvenue' : 'Ready'}
          onHiddenAction={() => setBannerMounted(false)}
        />
      )}
      <MotionTuner />
      <SmoothScroll />
      <ErrorBoundary>
        <div className="flex flex-col gap-20">
          <Hero
            onFeedbackClick={() => setFeedbackWidgetOpen(true)}
            onLocationClick={() => setLocationWidgetOpen(true)}
            onNewsClick={() => setNewsWidgetOpen(true)}
            onVideoReady={() => {
              // when hero signals video ready, set progress to 100 and hide banner
              setLoadingProgress(100);
              setBannerVisible(false);
            }}
          />
          <SectionReveal>
            <DynamicPartnersScroll />
          </SectionReveal>
          <SectionReveal>
            <DynamicAboutEnhanced />
          </SectionReveal>
          <SectionReveal>
            <DynamicJourneyHorizontal />
          </SectionReveal>
          <SectionReveal>
            <DynamicSkills />
          </SectionReveal>
          <SectionReveal>
            <DynamicServices />
          </SectionReveal>
          <SectionReveal>
            <DynamicEncryption />
          </SectionReveal>
          <SectionReveal>
            <DynamicProjectsEnhanced />
          </SectionReveal>
          <SectionReveal>
            <DynamicTestimonials />
          </SectionReveal>
          <SectionReveal>
            <DynamicBlog
              initialPosts={blogPosts}
              lastUpdated={blogLastUpdated}
            />
          </SectionReveal>
          <SectionReveal>
            <DynamicFAQ />
          </SectionReveal>
          <SectionReveal>
            <DynamicContact />
          </SectionReveal>
        </div>

        {/* Widget Modals - Available on both desktop and mobile */}
        <aside aria-label="Feedback Widget">
          <DynamicFeedbackWidget
            isOpen={feedbackWidgetOpen}
            setIsOpen={setFeedbackWidgetOpen}
          />
        </aside>

        <aside aria-label="Location Widget Modal">
          <DynamicLocationWidgetModal
            isOpen={locationWidgetOpen}
            setIsOpen={setLocationWidgetOpen}
            initialLocation={location}
            initialWeather={weather}
            visitorStats={visitorStats}
            initialError={null} // Assuming no initial error when fetched from server
          />
        </aside>
        <aside aria-label="News Widget Modal">
          <DynamicNewsWidgetModal
            isOpen={newsWidgetOpen}
            setIsOpen={setNewsWidgetOpen}
            initialNews={news}
            initialError={null} // Assuming no initial error when fetched from server
          />
        </aside>

        {/* Mobile Bottom Navigation with Liquid Glass Effect */}
        <DynamicMobileBottomNav />
      </ErrorBoundary>
    </main>
  );
}
