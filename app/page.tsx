import { AboutEnhanced } from "@/components/main/about-enhanced";
import Blog from "@/components/main/blog";
import { Contact } from "@/components/main/contact";
import { Encryption } from "@/components/main/encryption";
import { Hero } from "@/components/main/hero";
import { JourneyHorizontal } from "@/components/main/journey-horizontal";
import ProjectsEnhanced from "@/components/main/projects-enhanced";
import { Skills } from "@/components/main/skills";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <AboutEnhanced />
        <JourneyHorizontal />
        <Skills />
        <Encryption />
        <ProjectsEnhanced />
        <Blog />
        <Contact />
      </div>
    </main>
  );
}
