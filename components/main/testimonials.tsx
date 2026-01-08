"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { IoStarSharp, IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "CTO",
    company: "TechVentures Inc",
    content:
      "Exceptional developer with deep expertise in full-stack development. Delivered our e-commerce platform ahead of schedule with outstanding quality.",
    rating: 5,
  },
  {
    name: "Michael Rodriguez",
    role: "Product Manager",
    company: "CloudScale Solutions",
    content:
      "Brilliant problem solver who transformed our infrastructure. His cloud architecture expertise saved us 40% in operational costs.",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "Lead Designer",
    company: "Creative Studios",
    content:
      "A rare combination of technical prowess and design sensibility. Our Shopify store conversion rates increased by 65%.",
    rating: 5,
  },
  {
    name: "David Park",
    role: "Founder",
    company: "StartupHub",
    content:
      "Built our MVP in record time. His AI/ML integration expertise helped us secure Series A funding. Highly recommended!",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="w-full py-12 md:py-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center md:text-center mb-8 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              Client Testimonials
            </span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg">
            What industry leaders say about working with me
          </p>
        </motion.div>

        {/* Mobile: Single Card with Navigation */}
        <div className="md:hidden relative">
          {/* Single Testimonial Card */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 backdrop-blur-md border border-white/10 p-6"
          >
            <div className="flex items-center gap-1 mb-4">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <IoStarSharp key={i} className="h-5 w-5 text-yellow-400" />
              ))}
            </div>
            <p className="text-white text-base leading-relaxed mb-6 text-left">
              &ldquo;{testimonials[currentIndex].content}&rdquo;
            </p>
            <div className="text-left">
              <p className="font-semibold text-white text-lg">
                {testimonials[currentIndex].name}
              </p>
              <p className="text-gray-400 text-sm">
                {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
              </p>
            </div>
          </motion.div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-purple-500/20 border border-purple-500/30 text-white hover:bg-purple-500/30 transition-colors touch-manipulation"
              aria-label="Previous testimonial"
            >
              <IoChevronBackOutline className="w-5 h-5" />
            </button>

            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 touch-manipulation ${
                    index === currentIndex
                      ? "bg-purple-500 w-6"
                      : "bg-gray-500 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-purple-500/20 border border-purple-500/30 text-white hover:bg-purple-500/30 transition-colors touch-manipulation"
              aria-label="Next testimonial"
            >
              <IoChevronForwardOutline className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className="rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 backdrop-blur-md border border-white/10 p-6 hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <IoStarSharp key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>
              <p className="text-white text-base lg:text-lg leading-relaxed mb-6">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div>
                <p className="font-semibold text-white text-lg">
                  {testimonial.name}
                </p>
                <p className="text-gray-400">
                  {testimonial.role} at {testimonial.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
