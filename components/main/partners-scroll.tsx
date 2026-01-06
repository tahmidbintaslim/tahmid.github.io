"use client";

import { motion } from "framer-motion";
import { SiGooglecloud, SiOpenai, SiKaggle, SiDevdotto } from "react-icons/si";
import { FaBrain } from "react-icons/fa";

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
  return (
    <section className="w-full py-16 overflow-hidden bg-gradient-to-b from-transparent via-[#030014] to-transparent">
      <div className="w-full px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">
            Partnered With
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            Trusted Collaborations
          </h3>
        </motion.div>

        {/* Infinite Scroll Container */}
        <div className="relative">
          {/* Improved Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-[#030014] via-[#030014]/90 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-[#030014] via-[#030014]/90 to-transparent z-10 pointer-events-none" />

          {/* Scrolling Partner Cards */}
          <div className="flex animate-scroll-infinite">
            {partners.concat(partners).map((partner, index) => {
              const Icon = partner.icon;
              return (
                <div
                  key={`partner-${index}`}
                  className="flex-shrink-0 mx-6 flex items-center justify-center"
                  style={{ width: "280px" }}
                >
                  <div className={`rounded-2xl bg-gradient-to-br ${partner.bgGradient} backdrop-blur-xl border border-white/10 p-6 hover:border-white/30 hover:bg-white/5 transition-all duration-300 hover:scale-105 hover:shadow-2xl w-full h-36 flex flex-col items-center justify-center gap-3 group`}>
                    {/* Icon */}
                    <Icon className={`text-5xl ${partner.color} group-hover:scale-110 transition-transform duration-300`} />
                    
                    {/* Partner Name */}
                    <h4 className="text-white font-bold text-lg text-center">
                      {partner.name}
                    </h4>
                    
                    {/* Label */}
                    <p className="text-gray-400 text-xs text-center leading-tight group-hover:text-gray-300 transition-colors duration-300">
                      {partner.label}
                    </p>
                  </div>
                </div>
              );
            })}
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
          animation: scroll-infinite 40s linear infinite;
          width: max-content;
        }

        .animate-scroll-infinite:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
