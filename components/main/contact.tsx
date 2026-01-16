"use client";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";
import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
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
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error" | "loading"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [errors, setErrors] = useState<Partial<typeof formState>>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof typeof formState, boolean>>
  >({});
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const alertRef = useRef<HTMLDivElement>(null);

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
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });

    // Clear errors for this field when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<typeof formState> = {};

    if (!formState.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formState.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formState.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formState.subject.length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
    }

    if (!formState.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formState.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      setSubmitStatus("error");
      setSubmitMessage("Please fix the errors above");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("loading");
    setSubmitMessage("Sending your message...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setIsSubmitting(false);
      setSubmitStatus("success");
      setSubmitMessage("Message sent successfully! I'll get back to you soon.");
      setFormState({ name: "", email: "", subject: "", message: "" });
      setTouched({});

      timeoutRef.current = setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } catch (error) {
      console.error("Failed to send email:", error);
      setIsSubmitting(false);
      setSubmitStatus("error");
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again."
      );

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
        className="Welcome-box py-2 px-1.75 border border-[#7042f88b] opacity-[0.9]"
      >
        <SparklesIcon className="text-[#b49bff] mr-2.5 h-5 w-5" />
        <h2 className="Welcome-text text-[12px] sm:text-[13px]">
          Let&apos;s work together
        </h2>
      </motion.div>

      <motion.h2
        variants={slideInFromLeft(0.5)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-[28px] sm:text-[36px] md:text-[40px] lg:text-[50px] text-white font-bold mt-4 sm:mt-5 text-center mb-3 sm:mb-3.75"
      >
        Get In{" "}
        <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-cyan-500">
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
        I&apos;m always open to discussing new opportunities and interesting
        ideas.
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
          <h3 className="text-2xl font-bold text-white mb-4">
            Contact Information
          </h3>

          {contactInfo.map((info, index) => (
            <motion.div
              key={info.label}
              variants={slideInFromLeft(0.5)}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-lg bg-linear-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/20 backdrop-blur-sm hover:scale-105 transition-transform duration-300"
            >
              <div className="p-3 rounded-full bg-linear-to-r from-purple-500 to-cyan-500">
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
                className="p-3 rounded-lg bg-linear-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 hover:scale-110 transition-transform duration-300"
              >
                <svg
                  className="h-6 w-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/tahmid-bin-taslim/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-3 rounded-lg bg-linear-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 hover:scale-110 transition-transform duration-300"
              >
                <svg
                  className="h-6 w-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/RAFI_it100"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter Profile"
                className="p-3 rounded-lg bg-linear-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 hover:scale-110 transition-transform duration-300"
              >
                <svg
                  className="h-6 w-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
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
          {/* Status Alert with ARIA live region */}
          <div
            ref={alertRef}
            role="alert"
            aria-live="polite"
            aria-atomic="true"
            className={`mb-6 p-4 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 ${
              submitStatus === "success"
                ? "bg-green-500/20 border border-green-500/50 text-green-300"
                : submitStatus === "error"
                ? "bg-red-500/20 border border-red-500/50 text-red-300"
                : submitStatus === "loading"
                ? "bg-blue-500/20 border border-blue-500/50 text-blue-300"
                : "hidden"
            }`}
          >
            {submitStatus === "loading" && (
              <span className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                {submitMessage}
              </span>
            )}
            {(submitStatus === "success" || submitStatus === "error") &&
              submitMessage}
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 sm:space-y-6"
            noValidate
          >
            <div>
              <label
                htmlFor="name"
                className="block text-gray-300 mb-2 text-sm sm:text-base font-medium"
              >
                Your Name{" "}
                <span className="text-red-500" aria-label="required">
                  *
                </span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                aria-required="true"
                maxLength={100}
                aria-invalid={String(!!(touched.name && errors.name))}
                aria-describedby={
                  touched.name && errors.name ? "name-error" : undefined
                }
                className={`w-full px-4 py-3 sm:py-3.5 rounded-lg bg-[#1a1a2e] border transition-all text-base min-h-12 touch-manipulation text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 ${
                  touched.name && errors.name
                    ? "border-red-500 focus:border-red-500"
                    : "border-purple-500/30 focus:border-purple-500"
                }`}
                placeholder="John Doe"
              />
              {touched.name && errors.name && (
                <p
                  id="name-error"
                  className="text-red-400 text-sm mt-2 flex items-center gap-1"
                >
                  <span aria-hidden="true">⚠️</span> {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-gray-300 mb-2 text-sm sm:text-base font-medium"
              >
                Your Email{" "}
                <span className="text-red-500" aria-label="required">
                  *
                </span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                aria-invalid={String(!!(touched.email && errors.email))}
                aria-describedby={
                  touched.email && errors.email ? "email-error" : undefined
                }
                className={`w-full px-4 py-3 sm:py-3.5 rounded-lg bg-[#1a1a2e] border transition-all text-base min-h-12 touch-manipulation text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 ${
                  touched.email && errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-purple-500/30 focus:border-purple-500"
                }`}
                placeholder="your.email@example.com"
              />
              {touched.email && errors.email && (
                <p
                  id="email-error"
                  className="text-red-400 text-sm mt-2 flex items-center gap-1"
                >
                  <span aria-hidden="true">⚠️</span> {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-gray-300 mb-2 text-sm sm:text-base font-medium"
              >
                Subject{" "}
                <span className="text-red-500" aria-label="required">
                  *
                </span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                maxLength={200}
                aria-invalid={String(!!(touched.subject && errors.subject))}
                aria-describedby={
                  touched.subject && errors.subject
                    ? "subject-error"
                    : undefined
                }
                className={`w-full px-4 py-3 sm:py-3.5 rounded-lg bg-[#1a1a2e] border transition-all text-base min-h-12 touch-manipulation text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 ${
                  touched.subject && errors.subject
                    ? "border-red-500 focus:border-red-500"
                    : "border-purple-500/30 focus:border-purple-500"
                }`}
                placeholder="Project Inquiry"
              />
              {touched.subject && errors.subject && (
                <p
                  id="subject-error"
                  className="text-red-400 text-sm mt-2 flex items-center gap-1"
                >
                  <span aria-hidden="true">⚠️</span> {errors.subject}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-gray-300 mb-2 text-sm sm:text-base font-medium"
              >
                Message{" "}
                <span className="text-red-500" aria-label="required">
                  *
                </span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                maxLength={5000}
                minLength={10}
                rows={5}
                aria-invalid={String(!!(touched.message && errors.message))}
                aria-describedby={
                  touched.message && errors.message
                    ? "message-error"
                    : "message-hint"
                }
                className={`w-full px-4 py-3 sm:py-3.5 rounded-lg bg-[#1a1a2e] border transition-all resize-none text-base touch-manipulation text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 ${
                  touched.message && errors.message
                    ? "border-red-500 focus:border-red-500"
                    : "border-purple-500/30 focus:border-purple-500"
                }`}
                placeholder="Tell me about your project..."
              />
              {touched.message && errors.message && (
                <p
                  id="message-error"
                  className="text-red-400 text-sm mt-2 flex items-center gap-1"
                >
                  <span aria-hidden="true">⚠️</span> {errors.message}
                </p>
              )}
              {!touched.message ||
                (!errors.message && (
                  <p id="message-hint" className="text-xs text-gray-500 mt-1">
                    {formState.message.length}/5000 characters
                  </p>
                ))}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 sm:py-4 px-6 rounded-lg bg-linear-to-r from-purple-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-h-13 text-base active:scale-[0.98] touch-manipulation focus:outline-2 focus:outline-offset-2 focus:outline-purple-500"
              aria-busy={String(isSubmitting)}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
