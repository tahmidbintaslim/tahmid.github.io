'use client';

import { Hero } from '@/components/main/hero';
import { ErrorBoundary } from '@/components/error-boundary';
import dynamic from 'next/dynamic';
import { useState } from 'react';

// Lazy load all below-the-fold components for better initial load
const DynamicAboutEnhanced = dynamic(
  () =>
    import('@/components/main/about-enhanced').then((mod) => ({
      default: mod.AboutEnhanced,
    })),
  {
    loading: () => <div className="min-h-[50vh]" />,
  }
);

const DynamicBlog = dynamic(() => import('@/components/main/blog'), {
  loading: () => <div className="min-h-[50vh]" />,
});

const DynamicContact = dynamic(
  () =>
    import('@/components/main/contact').then((mod) => ({
      default: mod.Contact,
    })),
  {
    loading: () => <div className="min-h-[50vh]" />,
  }
);

const DynamicJourneyHorizontal = dynamic(
  () =>
    import('@/components/main/journey-horizontal').then((mod) => ({
      default: mod.JourneyHorizontal,
    })),
  {
    loading: () => <div className="min-h-[50vh]" />,
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
    loading: () => <div className="min-h-[200px]" />,
  }
);

const DynamicSkills = dynamic(
  () =>
    import('@/components/main/skills').then((mod) => ({ default: mod.Skills })),
  {
    loading: () => <div className="min-h-[50vh]" />,
  }
);

const DynamicLocationWidget = dynamic(
  () => import('@/components/widgets/location-widget'),
  {
    ssr: false,
  }
);

const DynamicNewsWidget = dynamic(
  () => import('@/components/widgets/news-widget'),
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

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

export default function Home() {
  const [locationWidgetOpen, setLocationWidgetOpen] = useState(false);
  const [newsWidgetOpen, setNewsWidgetOpen] = useState(false);
  const [feedbackWidgetOpen, setFeedbackWidgetOpen] = useState(false);
  const [locationData, setLocationData] = useState<{
    latitude: number;
    longitude: number;
    city: string;
    weather: WeatherData | null;
  } | null>(null);

  const handleLocationUpdate = (
    lat: number,
    lon: number,
    city: string,
    weather: WeatherData | null
  ) => {
    setLocationData({ latitude: lat, longitude: lon, city, weather });
  };

  return (
    <main
      id="main-content"
      className="h-full w-full pb-24 md:pb-0"
      tabIndex={-1}
    >
      <ErrorBoundary>
        <div className="flex flex-col gap-20">
          <Hero
            onLocationClick={() => setLocationWidgetOpen(true)}
            onNewsClick={() => setNewsWidgetOpen(true)}
            onFeedbackClick={() => setFeedbackWidgetOpen(true)}
          />
          <DynamicPartnersScroll />
          <DynamicAboutEnhanced />
          <DynamicJourneyHorizontal />
          <DynamicSkills />
          <DynamicEncryption />
          <DynamicProjectsEnhanced />
          <DynamicTestimonials />
          <DynamicBlog />
          <DynamicContact />
        </div>

        {/* Floating Widgets */}
        <aside aria-label="Location Widget">
          <DynamicLocationWidget
            isOpen={locationWidgetOpen}
            setIsOpen={setLocationWidgetOpen}
            onLocationUpdate={handleLocationUpdate}
          />
        </aside>
        <aside aria-label="News Widget">
          <DynamicNewsWidget
            isOpen={newsWidgetOpen}
            setIsOpen={setNewsWidgetOpen}
            latitude={locationData?.latitude}
            longitude={locationData?.longitude}
            city={locationData?.city}
            weather={locationData?.weather}
          />
        </aside>
        <aside aria-label="Feedback Widget">
          <DynamicFeedbackWidget
            isOpen={feedbackWidgetOpen}
            setIsOpen={setFeedbackWidgetOpen}
          />
        </aside>

        {/* Mobile Bottom Navigation with Liquid Glass Effect */}
        <DynamicMobileBottomNav
          onLocationClick={() => setLocationWidgetOpen(true)}
          onNewsClick={() => setNewsWidgetOpen(true)}
        />
      </ErrorBoundary>
    </main>
  );
}
