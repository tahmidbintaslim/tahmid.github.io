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

export default function Home() {
  return (
    <main className="h-full w-full" role="main">
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
        <LocationWidget />
      </aside>
      <aside aria-label="News Widget">
        <NewsWidget />
      </aside>
    </main>
  );
}
