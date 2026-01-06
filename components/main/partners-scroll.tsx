"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const partners = [
  { name: "Google Cloud Certified", logo: "/partners/google-cloud.svg" },
  { name: "IBM Watson", logo: "/partners/ibm-watson.svg" },
  { name: "OpenAI Research", logo: "/partners/openai.svg" },
  { name: "Kaggle Compete", logo: "/partners/kaggle.svg" },
  { name: "Dev.to Judge", logo: "/partners/devto.svg" },
];

export default function PartnersScroll() {
  return (
    <section className="w-full py-12 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">
            Partnered With
          </p>
        </motion.div>

        {/* Infinite Scroll Container */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#030014] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#030014] to-transparent z-10" />

          {/* Scrolling Logos */}
          <div className="flex animate-scroll-infinite">
            {/* First set of logos */}
            {partners.map((partner, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 mx-8 flex items-center justify-center"
                style={{ width: "200px" }}
              >
                <div className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-6 hover:border-white/20 transition-all duration-300 hover:scale-105 w-full">
                  <p className="text-white font-semibold text-center text-sm">
                    {partner.name}
                  </p>
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {partners.map((partner, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 mx-8 flex items-center justify-center"
                style={{ width: "200px" }}
              >
                <div className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-6 hover:border-white/20 transition-all duration-300 hover:scale-105 w-full">
                  <p className="text-white font-semibold text-center text-sm">
                    {partner.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-infinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-infinite {
          animation: scroll-infinite 30s linear infinite;
          width: max-content;
        }

        .animate-scroll-infinite:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
