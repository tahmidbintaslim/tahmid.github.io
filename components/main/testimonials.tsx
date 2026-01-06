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
  return (
    <section className="w-full py-20">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Client Testimonials
          </h2>
          <p className="text-gray-400 text-lg">
            What industry leaders say about working with me
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-fr">
          {/* First testimonial - Large (spans 2x2 on desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-7 md:row-span-2 rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 backdrop-blur-md border border-white/10 p-8 hover:border-purple-500/30 transition-all duration-300"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonials[0].rating)].map((_, i) => (
                  <IoStarSharp key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>
              <p className="text-white text-xl leading-relaxed mb-6 flex-1">
                &ldquo;{testimonials[0].content}&rdquo;
              </p>
              <div>
                <p className="font-semibold text-white text-lg">
                  {testimonials[0].name}
                </p>
                <p className="text-gray-400">
                  {testimonials[0].role} at {testimonials[0].company}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Second testimonial - Medium (top right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-5 md:row-span-1 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-md border border-white/10 p-6 hover:border-cyan-500/30 transition-all duration-300"
          >
            <div className="flex items-center gap-1 mb-3">
              {[...Array(testimonials[1].rating)].map((_, i) => (
                <IoStarSharp key={i} className="h-4 w-4 text-yellow-400" />
              ))}
            </div>
            <p className="text-white leading-relaxed mb-4">
              &ldquo;{testimonials[1].content}&rdquo;
            </p>
            <div>
              <p className="font-semibold text-white">{testimonials[1].name}</p>
              <p className="text-sm text-gray-400">
                {testimonials[1].role} at {testimonials[1].company}
              </p>
            </div>
          </motion.div>

          {/* Third testimonial - Medium (middle right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-5 md:row-span-1 rounded-2xl bg-gradient-to-br from-green-500/10 to-cyan-500/10 backdrop-blur-md border border-white/10 p-6 hover:border-green-500/30 transition-all duration-300"
          >
            <div className="flex items-center gap-1 mb-3">
              {[...Array(testimonials[2].rating)].map((_, i) => (
                <IoStarSharp key={i} className="h-4 w-4 text-yellow-400" />
              ))}
            </div>
            <p className="text-white leading-relaxed mb-4">
              &ldquo;{testimonials[2].content}&rdquo;
            </p>
            <div>
              <p className="font-semibold text-white">{testimonials[2].name}</p>
              <p className="text-sm text-gray-400">
                {testimonials[2].role} at {testimonials[2].company}
              </p>
            </div>
          </motion.div>

          {/* Fourth testimonial - Wide (bottom) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="md:col-span-12 md:row-span-1 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-md border border-white/10 p-6 hover:border-blue-500/30 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex items-center gap-1">
                {[...Array(testimonials[3].rating)].map((_, i) => (
                  <IoStarSharp key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>
              <p className="text-white text-lg leading-relaxed flex-1">
                &ldquo;{testimonials[3].content}&rdquo;
              </p>
              <div className="text-right">
                <p className="font-semibold text-white">{testimonials[3].name}</p>
                <p className="text-sm text-gray-400">
                  {testimonials[3].role} at {testimonials[3].company}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
