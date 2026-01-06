"use client";

import { useState } from "react";
import { AboutEnhanced } from "@/components/main/about-enhanced";
import Blog from "@/components/main/blog";
import { Contact } from "@/components/main/contact";
import { Encryption } from "@/components/main/encryption";
import { Hero } from "@/components/main/hero";
import { JourneyHorizontal } from "@/components/main/journey-horizontal";
import PartnersScroll from "@/components/main/partners-scroll";
import ProjectsEnhanced from "@/components/main/projects-enhanced";
import { Skills } from "@/components/main/skills";
import TestimonialsSection from "@/components/main/testimonials";
import LocationWidget from "@/components/widgets/location-widget";
import NewsWidget from "@/components/widgets/news-widget";
import MobileBottomNav from "@/components/main/mobile-bottom-nav";

export default function Home() {
  const [locationWidgetOpen, setLocationWidgetOpen] = useState(false);
  const [newsWidgetOpen, setNewsWidgetOpen] = useState(false);

  return (
    <main className="h-full w-full pb-24 md:pb-0" role="main">
      <div className="flex flex-col gap-20">
        <Hero />
        <PartnersScroll />
        <AboutEnhanced />
        <JourneyHorizontal />
        <Skills />
        <Encryption />
        <ProjectsEnhanced />
        <TestimonialsSection />
        <Blog />
        <Contact />
      </div>

      {/* Floating Widgets */}
      <aside aria-label="Location Widget">
        <LocationWidget isOpen={locationWidgetOpen} setIsOpen={setLocationWidgetOpen} />
      </aside>
      <aside aria-label="News Widget">
        <NewsWidget isOpen={newsWidgetOpen} setIsOpen={setNewsWidgetOpen} />
      </aside>

      {/* Mobile Bottom Navigation with Liquid Glass Effect */}
      <MobileBottomNav 
        onLocationClick={() => setLocationWidgetOpen(true)}
        onNewsClick={() => setNewsWidgetOpen(true)}
      />
    </main>
  );
}
