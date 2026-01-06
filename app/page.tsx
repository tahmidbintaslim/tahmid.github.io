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
        <section id="hero" aria-label="Hero Section">
          <Hero />
        </section>
        
        <section id="partners" aria-label="Partners Section">
          <PartnersScroll />
        </section>
        
        <section id="about" aria-label="About Section">
          <AboutEnhanced />
        </section>
        
        <section id="journey" aria-label="Journey Section">
          <JourneyHorizontal />
        </section>
        
        <section id="skills" aria-label="Skills Section">
          <Skills />
        </section>
        
        <section id="encryption" aria-label="Security Section">
          <Encryption />
        </section>
        
        <section id="projects" aria-label="Projects Section">
          <ProjectsEnhanced />
        </section>
        
        <section id="testimonials" aria-label="Testimonials Section">
          <TestimonialsSection />
        </section>
        
        <section id="blog" aria-label="Blog Section">
          <Blog />
        </section>
        
        <section id="contact" aria-label="Contact Section">
          <Contact />
        </section>
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
