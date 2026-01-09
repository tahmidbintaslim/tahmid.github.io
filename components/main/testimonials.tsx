"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline, IoStarSharp } from "react-icons/io5";

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
    {
        name: "Lisa Thompson",
        role: "VP of Engineering",
        company: "DataFlow Systems",
        content:
            "Outstanding work on our data pipeline architecture. The TypeScript implementation was flawless and the performance improvements exceeded all expectations.",
        rating: 5,
    },
    {
        name: "James Anderson",
        role: "CEO",
        company: "E-commerce Plus",
        content:
            "Transformed our Shopify Plus store with custom app development. Sales increased by 85% in the first quarter. Absolute professional!",
        rating: 5,
    },
    {
        name: "Maria Garcia",
        role: "Head of Product",
        company: "Innovate Labs",
        content:
            "Incredible expertise in Next.js and React. Built our entire SaaS platform from scratch with clean, maintainable code. A true full-stack expert.",
        rating: 5,
    },
    {
        name: "Robert Kim",
        role: "CTO",
        company: "FinTech Solutions",
        content:
            "His Node.js and AWS skills are top-notch. Migrated our entire infrastructure to cloud with zero downtime. Exceptional communication throughout.",
        rating: 5,
    },
    {
        name: "Jennifer Lee",
        role: "Director",
        company: "MediaTech Group",
        content:
            "Delivered a complex WordPress headless CMS solution that exceeded requirements. The API integration was seamless and well-documented.",
        rating: 5,
    },
    {
        name: "Alex Martinez",
        role: "Founder",
        company: "AI Innovations",
        content:
            "Expert in OpenAI integration and ML pipelines. Built our chatbot system with Python and FastAPI. Performance and reliability have been outstanding.",
        rating: 5,
    },
    {
        name: "Sophia Williams",
        role: "COO",
        company: "Global Retail",
        content:
            "Exceptional work on our multi-tenant SaaS platform. His Vue.js and PostgreSQL expertise helped us scale to 10,000+ users effortlessly.",
        rating: 5,
    },
    {
        name: "Daniel Brown",
        role: "Tech Lead",
        company: "CloudFirst Inc",
        content:
            "Masterful implementation of Docker and Kubernetes. Our DevOps pipeline is now robust, automated, and incredibly efficient. Highly skilled professional.",
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
            <div className="w-full px-4 md:px-0">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8 md:mb-16"
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
                <div className="md:hidden relative max-w-sm mx-auto">
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

                    <div className="flex items-center justify-between mt-6">
                        <button
                            onClick={prevSlide}
                            className="p-3 rounded-full bg-purple-500/20 border border-purple-500/30 text-white hover:bg-purple-500/30 transition-colors touch-manipulation"
                            aria-label="Previous testimonial"
                        >
                            <IoChevronBackOutline className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 touch-manipulation ${index === currentIndex
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

                {/* Desktop: Full-width Infinite Scrolling */}
                <div className="hidden md:block relative">
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#030014] to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#030014] to-transparent z-10 pointer-events-none" />

                    <div className="flex animate-scroll-slow hover:[animation-play-state:paused]">
                        {[...Array(3)].map((_, setIndex) =>
                            testimonials.map((testimonial, index) => (
                                <div
                                    key={`testimonial-${setIndex}-${index}`}
                                    className="flex-shrink-0 mx-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 backdrop-blur-md border border-white/10 p-6 hover:border-white/30 hover:bg-white/5 transition-all duration-300 hover:scale-105 hover:shadow-2xl w-80 group"
                                >
                                    <div className="flex items-center gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <IoStarSharp key={i} className="h-5 w-5 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-white text-base leading-relaxed mb-6">
                                        &ldquo;{testimonial.content}&rdquo;
                                    </p>
                                    <div>
                                        <p className="font-semibold text-white text-lg">
                                            {testimonial.name}
                                        </p>
                                        <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
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
