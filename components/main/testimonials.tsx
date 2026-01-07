"use client";

import { motion } from "framer-motion";
import { IoStarSharp } from "react-icons/io5";

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
  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="w-full py-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              Client Testimonials
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            What industry leaders say about working with me
          </p>
        </motion.div>

        {/* Horizontal Scrolling Container */}
        <div className="relative">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#030014] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#030014] to-transparent z-10 pointer-events-none" />
          
          {/* Animated scrolling wrapper */}
          <div className="flex gap-6 animate-scroll">
            {duplicatedTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * (index % testimonials.length) }}
                className="flex-shrink-0 w-[380px] rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 backdrop-blur-md border border-white/10 p-6 hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <IoStarSharp key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
                <p className="text-white text-lg leading-relaxed mb-6">
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
      </div>
    </section>
  );
}
