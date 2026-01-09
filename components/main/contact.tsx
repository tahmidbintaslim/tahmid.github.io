"use client";

import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/lib/motion";
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormState({ name: "", email: "", subject: "", message: "" });

      timeoutRef.current = setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } catch (error) {
      console.error('Failed to send email:', error);
      setIsSubmitting(false);
      setSubmitStatus("error");

      timeoutRef.current = setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    }
  };

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      label: "Email",
      value: "tahmidbintaslimrafi@gmail.com",
      link: "mailto:tahmidbintaslimrafi@gmail.com",
    },
    {
      icon: MapPinIcon,
      label: "Location",
      value: "Bangkok, Thailand",
      link: null,
    },
    {
      icon: PhoneIcon,
      label: "Available",
      value: "Mon - Fri, 9AM - 6PM",
      link: null,
    },
  ];

  return (
    <section
      id="contact"
      className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-20"
    >
      <motion.div
        variants={slideInFromTop}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
      >
        <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
        <h2 className="Welcome-text text-[12px] sm:text-[13px]">Let&apos;s work together</h2>
      </motion.div>

      <motion.h2
        variants={slideInFromLeft(0.5)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-[28px] sm:text-[36px] md:text-[40px] lg:text-[50px] text-white font-bold mt-[16px] sm:mt-[20px] text-center mb-[12px] sm:mb-[15px]"
      >
        Get In{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
          Touch
        </span>
      </motion.h2>

      <motion.p
        variants={slideInFromRight(0.5)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-gray-300 text-center max-w-2xl mb-8 sm:mb-12 text-sm sm:text-base px-2"
      >
        Have a project in mind or want to collaborate? Feel free to reach out!
        I&apos;m always open to discussing new opportunities and interesting ideas.
      </motion.p>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
        {/* Contact Info */}
        <motion.div
          variants={slideInFromLeft(0.5)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col gap-6"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Contact Information</h3>

          {contactInfo.map((info, index) => (
            <motion.div
              key={info.label}
              variants={slideInFromLeft(0.5)}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/20 backdrop-blur-sm hover:scale-105 transition-transform duration-300"
            >
              <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500">
                <info.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">{info.label}</p>
                {info.link ? (
                  <a
                    href={info.link}
                    className="text-white font-semibold hover:text-purple-400 transition-colors"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-white font-semibold">{info.value}</p>
                )}
              </div>
            </motion.div>
          ))}

          <div className="mt-6">
            <h4 className="text-xl font-bold text-white mb-4">Follow Me</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com/tahmidbintaslim"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 hover:scale-110 transition-transform duration-300"
              >
                <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/tahmid-bin-taslim/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 hover:scale-110 transition-transform duration-300"
              >
                <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/RAFI_it100"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter Profile"
                className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 hover:scale-110 transition-transform duration-300"
              >
                <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          variants={slideInFromRight(0.5)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-300 mb-2 text-sm sm:text-base">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 sm:py-3.5 rounded-lg bg-[#1a1a2e] border border-purple-500/30 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-base min-h-[48px] touch-manipulation"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-300 mb-2 text-sm sm:text-base">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 sm:py-3.5 rounded-lg bg-[#1a1a2e] border border-purple-500/30 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-base min-h-[48px] touch-manipulation"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-gray-300 mb-2 text-sm sm:text-base">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 sm:py-3.5 rounded-lg bg-[#1a1a2e] border border-purple-500/30 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-base min-h-[48px] touch-manipulation"
                placeholder="Project Inquiry"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-300 mb-2 text-sm sm:text-base">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 sm:py-3.5 rounded-lg bg-[#1a1a2e] border border-purple-500/30 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none text-base touch-manipulation"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 sm:py-4 px-6 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-h-[52px] text-base active:scale-[0.98] touch-manipulation"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 text-center"
              >
                <p className="font-semibold">Message sent successfully!</p>
                <p className="text-sm mt-1 text-green-300">
                  Thank you for reaching out! I&apos;ll get back to you soon.
                </p>
              </motion.div>
            )}

            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-center"
              >
                <p className="font-semibold">Failed to send message</p>
                <p className="text-sm mt-1 text-red-300">
                  Please try again or contact me directly at tahmidbintaslimrafi@gmail.com
                </p>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};
