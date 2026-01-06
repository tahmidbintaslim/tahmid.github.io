"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const partners = [
  { name: "Google Cloud Certified", logo: "/partners/google-cloud.png" },
  { name: "IBM Watson", logo: "/partners/ibm-watson.png" },
  { name: "OpenAI Research", logo: "/partners/openai.png" },
  { name: "Kaggle Compete", logo: "/partners/kaggle.png" },
  { name: "Dev.to Judge", logo: "/partners/devto.png" },
];

export default function PartnersScroll() {
  return (
    <section className="w-full py-12 overflow-hidden bg-gradient-to-b from-transparent via-[#030014] to-transparent">
      <div className="w-full px-6">
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
          {/* Improved Gradient Overlays with full width */}
          <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-[#030014] via-[#030014]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-[#030014] via-[#030014]/80 to-transparent z-10 pointer-events-none" />

          {/* Scrolling Logos */}
          <div className="flex animate-scroll-infinite">
            {/* First set of logos */}
            {partners.concat(partners).map((partner, index) => (
              <div
                key={`logo-${index}`}
                className="flex-shrink-0 mx-8 flex items-center justify-center"
                style={{ width: "250px" }}
              >
                <div className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-6 hover:border-white/20 hover:bg-white/10 transition-all duration-300 hover:scale-105 w-full h-24 flex items-center justify-center">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={180}
                    height={60}
                    className="object-contain"
                  />
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
