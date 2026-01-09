"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaBrain } from "react-icons/fa";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import {
    SiAmazonwebservices,
    SiDevdotto,
    SiDocker,
    SiGithub,
    SiGooglecloud,
    SiKaggle,
    SiKubernetes,
    SiMongodb,
    SiNetlify,
    SiOpenai,
    SiPostgresql,
    SiShopify,
    SiTailwindcss,
    SiVercel,
    SiWordpress
} from "react-icons/si";

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
        name: "AWS",
        label: "Cloud Solutions Architect",
        icon: SiAmazonwebservices,
        color: "text-orange-400",
        bgGradient: "from-orange-500/10 to-yellow-500/10"
    },
    {
        name: "Shopify Plus",
        label: "E-commerce Expert",
        icon: SiShopify,
        color: "text-green-500",
        bgGradient: "from-green-600/10 to-lime-500/10"
    },
    {
        name: "MongoDB",
        label: "Database Specialist",
        icon: SiMongodb,
        color: "text-emerald-400",
        bgGradient: "from-emerald-500/10 to-green-500/10"
    },
    {
        name: "PostgreSQL",
        label: "Database Expert",
        icon: SiPostgresql,
        color: "text-blue-300",
        bgGradient: "from-blue-400/10 to-sky-400/10"
    },
    {
        name: "Docker",
        label: "Container Specialist",
        icon: SiDocker,
        color: "text-blue-500",
        bgGradient: "from-blue-500/10 to-cyan-600/10"
    },
    {
        name: "Kubernetes",
        label: "Orchestration Expert",
        icon: SiKubernetes,
        color: "text-blue-600",
        bgGradient: "from-blue-600/10 to-indigo-600/10"
    },
    {
        name: "WordPress",
        label: "CMS Development",
        icon: SiWordpress,
        color: "text-blue-400",
        bgGradient: "from-blue-500/10 to-indigo-400/10"
    },
    {
        name: "Vercel",
        label: "Deployment Partner",
        icon: SiVercel,
        color: "text-white",
        bgGradient: "from-gray-500/10 to-gray-400/10"
    },
    {
        name: "Netlify",
        label: "Hosting Partner",
        icon: SiNetlify,
        color: "text-teal-400",
        bgGradient: "from-teal-500/10 to-cyan-400/10"
    },
    {
        name: "GitHub",
        label: "Version Control Expert",
        icon: SiGithub,
        color: "text-white",
        bgGradient: "from-purple-500/10 to-gray-500/10"
    },
    {
        name: "Kaggle",
        label: "Data Science Competitor",
        icon: SiKaggle,
        color: "text-cyan-400",
        bgGradient: "from-cyan-500/10 to-blue-400/10"
    },
    {
        name: "Tailwind CSS",
        label: "UI Framework Expert",
        icon: SiTailwindcss,
        color: "text-cyan-400",
        bgGradient: "from-cyan-400/10 to-blue-500/10"
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

    return (
        <section className="w-full py-12 md:py-16 bg-gradient-to-b from-transparent via-[#030014] to-transparent overflow-hidden">
            <div className="w-full px-4 md:px-0">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8 md:mb-12"
                >
                    <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">
                        Partnered With
                    </p>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                        Trusted Collaborations
                    </h2>
                </motion.div>

                {/* Mobile: Single Card with Navigation */}
                <div className="md:hidden max-w-sm mx-auto">
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

                    <div className="flex items-center justify-between mt-6">
                        <button
                            onClick={prevSlide}
                            className="p-3 rounded-full bg-purple-500/20 border border-purple-500/30 text-white hover:bg-purple-500/30 transition-colors touch-manipulation"
                            aria-label="Previous partner"
                        >
                            <IoChevronBackOutline className="w-5 h-5" />
                        </button>

                        {/* Slide Counter instead of dots */}
                        <div className="flex items-center gap-2 text-gray-400">
                            <span className="text-purple-400 font-semibold">{currentIndex + 1}</span>
                            <span>/</span>
                            <span>{partners.length}</span>
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

                {/* Desktop: Full-width Infinite Scrolling */}
                <div className="hidden md:block relative">
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#030014] to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#030014] to-transparent z-10 pointer-events-none" />

                    <div className="flex animate-scroll hover:[animation-play-state:paused]">
                        {[...Array(3)].map((_, setIndex) =>
                            partners.map((partner, index) => {
                                const Icon = partner.icon;
                                return (
                                    <div
                                        key={`partner-${setIndex}-${index}`}
                                        className={`flex-shrink-0 mx-4 rounded-2xl bg-gradient-to-br ${partner.bgGradient} backdrop-blur-xl border border-white/10 p-6 hover:border-white/30 hover:bg-white/5 transition-all duration-300 hover:scale-105 hover:shadow-2xl h-36 w-48 flex flex-col items-center justify-center gap-3 group`}
                                    >
                                        <Icon className={`text-4xl lg:text-5xl ${partner.color} group-hover:scale-110 transition-transform duration-300`} />
                                        <h4 className="text-white font-bold text-sm lg:text-base text-center">
                                            {partner.name}
                                        </h4>
                                        <p className="text-gray-400 text-xs text-center leading-tight group-hover:text-gray-300 transition-colors duration-300">
                                            {partner.label}
                                        </p>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
