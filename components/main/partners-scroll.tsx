"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { SiGooglecloud, SiOpenai, SiKaggle, SiDevdotto } from "react-icons/si";
import { FaBrain } from "react-icons/fa";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

const partners = [
  { 
    name: "Google Cloud", 
    label: "Certified Associate Developer",
    icon: SiGooglecloud,
    color: "text-blue-400",
    bgGradient: "from-blue-500/10 to-cyan-500/10"
  },
  { 
    name: "IBM Watson", 
    label: "AI Solutions Partner",
    icon: FaBrain,
    color: "text-blue-500",
    bgGradient: "from-blue-600/10 to-indigo-500/10"
  },
  { 
    name: "OpenAI", 
    label: "Integration Expert",
    icon: SiOpenai,
    color: "text-green-400",
    bgGradient: "from-green-500/10 to-emerald-500/10"
  },
  { 
    name: "Kaggle", 
    label: "Data Science Competitor",
    icon: SiKaggle,
    color: "text-cyan-400",
    bgGradient: "from-cyan-500/10 to-blue-400/10"
  },
  { 
    name: "Dev.to", 
    label: "Technical Writer",
    icon: SiDevdotto,
    color: "text-purple-400",
    bgGradient: "from-purple-500/10 to-pink-500/10"
  },
];

export default function PartnersScroll() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % partners.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + partners.length) % partners.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="w-full py-12 md:py-16 bg-gradient-to-b from-transparent via-[#030014] to-transparent">
      <div className="w-full px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">
            Partnered With
          </p>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            Trusted Collaborations
          </h3>
        </motion.div>

        {/* Mobile: Single Card with Navigation */}
        <div className="md:hidden max-w-sm mx-auto">
          {/* Single Partner Card */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className={`rounded-2xl bg-gradient-to-br ${partners[currentIndex].bgGradient} backdrop-blur-xl border border-white/10 p-6 h-36 flex flex-col items-center justify-center gap-3`}
          >
            {(() => {
              const Icon = partners[currentIndex].icon;
              return (
                <>
                  <Icon className={`text-5xl ${partners[currentIndex].color}`} />
                  <h4 className="text-white font-bold text-lg text-center">
                    {partners[currentIndex].name}
                  </h4>
                  <p className="text-gray-400 text-xs text-center leading-tight">
                    {partners[currentIndex].label}
                  </p>
                </>
              );
            })()}
          </motion.div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-purple-500/20 border border-purple-500/30 text-white hover:bg-purple-500/30 transition-colors touch-manipulation"
              aria-label="Previous partner"
            >
              <IoChevronBackOutline className="w-5 h-5" />
            </button>

            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {partners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 touch-manipulation ${
                    index === currentIndex
                      ? "bg-purple-500 w-6"
                      : "bg-gray-500 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to partner ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-purple-500/20 border border-purple-500/30 text-white hover:bg-purple-500/30 transition-colors touch-manipulation"
              aria-label="Next partner"
            >
              <IoChevronForwardOutline className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden md:flex justify-center">
          <div className="grid grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl">
            {partners.map((partner, index) => {
              const Icon = partner.icon;
              return (
                <motion.div
                  key={`partner-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className={`rounded-2xl bg-gradient-to-br ${partner.bgGradient} backdrop-blur-xl border border-white/10 p-6 hover:border-white/30 hover:bg-white/5 transition-all duration-300 hover:scale-105 hover:shadow-2xl h-36 flex flex-col items-center justify-center gap-3 group`}
                >
                  <Icon className={`text-4xl lg:text-5xl ${partner.color} group-hover:scale-110 transition-transform duration-300`} />
                  <h4 className="text-white font-bold text-sm lg:text-base text-center">
                    {partner.name}
                  </h4>
                  <p className="text-gray-400 text-xs text-center leading-tight group-hover:text-gray-300 transition-colors duration-300">
                    {partner.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
