'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoStarSharp,
} from 'react-icons/io5';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'TechVentures Inc',
    content:
      'Exceptional developer with deep expertise in full-stack development. Delivered our e-commerce platform ahead of schedule with outstanding quality.',
    rating: 5,
  },
  {
    name: 'Michael Rodriguez',
    role: 'Product Manager',
    company: 'CloudScale Solutions',
    content:
      'Brilliant problem solver who transformed our infrastructure. His cloud architecture expertise saved us 40% in operational costs.',
    rating: 5,
  },
  {
    name: 'Emily Watson',
    role: 'Lead Designer',
    company: 'Creative Studios',
    content:
      'A rare combination of technical prowess and design sensibility. Our Shopify store conversion rates increased by 65%.',
    rating: 5,
  },
  {
    name: 'David Park',
    role: 'Founder',
    company: 'StartupHub',
    content:
      'Built our MVP in record time. His AI/ML integration expertise helped us secure Series A funding. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Lisa Thompson',
    role: 'VP of Engineering',
    company: 'DataFlow Systems',
    content:
      'Outstanding work on our data pipeline architecture. The TypeScript implementation was flawless and the performance improvements exceeded all expectations.',
    rating: 5,
  },
  {
    name: 'James Anderson',
    role: 'CEO',
    company: 'E-commerce Plus',
    content:
      'Transformed our Shopify Plus store with custom app development. Sales increased by 85% in the first quarter. Absolute professional!',
    rating: 5,
  },
  {
    name: 'Maria Garcia',
    role: 'Head of Product',
    company: 'Innovate Labs',
    content:
      'Incredible expertise in Next.js and React. Built our entire SaaS platform from scratch with clean, maintainable code. A true full-stack expert.',
    rating: 5,
  },
  {
    name: 'Robert Kim',
    role: 'CTO',
    company: 'FinTech Solutions',
    content:
      'His Node.js and AWS skills are top-notch. Migrated our entire infrastructure to cloud with zero downtime. Exceptional communication throughout.',
    rating: 5,
  },
  {
    name: 'Jennifer Lee',
    role: 'Director',
    company: 'MediaTech Group',
    content:
      'Delivered a complex WordPress headless CMS solution that exceeded requirements. The API integration was seamless and well-documented.',
    rating: 5,
  },
  {
    name: 'Alex Martinez',
    role: 'Founder',
    company: 'AI Innovations',
    content:
      'Expert in OpenAI integration and ML pipelines. Built our chatbot system with Python and FastAPI. Performance and reliability have been outstanding.',
    rating: 5,
  },
  {
    name: 'Sophia Williams',
    role: 'COO',
    company: 'Global Retail',
    content:
      'Exceptional work on our multi-tenant SaaS platform. His Vue.js and PostgreSQL expertise helped us scale to 10,000+ users effortlessly.',
    rating: 5,
  },
  {
    name: 'Daniel Brown',
    role: 'Tech Lead',
    company: 'CloudFirst Inc',
    content:
      'Masterful implementation of Docker and Kubernetes. Our DevOps pipeline is now robust, automated, and incredibly efficient. Highly skilled professional.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="w-full overflow-hidden py-12 md:py-20">
      <div className="w-full px-4 md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center md:mb-16"
        >
          <h2 className="mb-3 text-3xl font-bold md:mb-4 md:text-4xl lg:text-5xl">
            <span className="bg-linear-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Client Testimonials
            </span>
          </h2>
          <p className="text-base text-gray-400 md:text-lg">
            What industry leaders say about working with me
          </p>
        </motion.div>

        {/* Mobile: Single Card with Navigation */}
        <div className="relative mx-auto max-w-sm md:hidden">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-white/10 bg-linear-to-br from-purple-500/10 to-cyan-500/10 p-6 backdrop-blur-md"
          >
            <div className="mb-4 flex items-center gap-1">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <IoStarSharp key={i} className="h-5 w-5 text-yellow-400" />
              ))}
            </div>
            <p className="mb-6 text-left text-base leading-relaxed text-white">
              &ldquo;{testimonials[currentIndex].content}&rdquo;
            </p>
            <div className="text-left">
              <p className="text-lg font-semibold text-white">
                {testimonials[currentIndex].name}
              </p>
              <p className="text-sm text-gray-400">
                {testimonials[currentIndex].role} at{' '}
                {testimonials[currentIndex].company}
              </p>
            </div>
          </motion.div>

          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={prevSlide}
              className="touch-manipulation rounded-full border border-purple-500/30 bg-purple-500/20 p-3 text-white transition-colors hover:bg-purple-500/30"
              aria-label="Previous testimonial"
            >
              <IoChevronBackOutline className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2.5 w-2.5 touch-manipulation rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-6 bg-purple-500'
                      : 'bg-gray-500 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="touch-manipulation rounded-full border border-purple-500/30 bg-purple-500/20 p-3 text-white transition-colors hover:bg-purple-500/30"
              aria-label="Next testimonial"
            >
              <IoChevronForwardOutline className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Desktop: Full-width Infinite Scrolling */}
        <div className="relative hidden md:block">
          <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-32 bg-linear-to-r from-[#030014] to-transparent" />
          <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-32 bg-linear-to-l from-[#030014] to-transparent" />

          <div className="animate-scroll-slow flex hover:[animation-play-state:paused]">
            {[...Array(3)].map((_, setIndex) =>
              testimonials.map((testimonial, index) => (
                <div
                  key={`testimonial-${setIndex}-${index}`}
                  className="group mx-4 w-80 flex-shrink-0 rounded-2xl border border-white/10 bg-linear-to-br from-purple-500/10 to-cyan-500/10 p-6 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/30 hover:bg-white/5 hover:shadow-2xl"
                >
                  <div className="mb-4 flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <IoStarSharp
                        key={i}
                        className="h-5 w-5 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="mb-6 text-base leading-relaxed text-white">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <div>
                    <p className="text-lg font-semibold text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
