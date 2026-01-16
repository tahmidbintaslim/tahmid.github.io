/**
 * Structured Data (JSON-LD) for SEO and AEO
 * This helps search engines and AI assistants understand the content better
 */

import { generateArticleSchema, generateProductSchema, generateBreadcrumbSchema } from "@/lib/og-utils";

export const structuredData = {
  // Person schema for the portfolio owner
  person: {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tahmid Bin Taslim Rafi",
    alternateName: "Tahmid Bin Taslim",
    url: "https://tahmid.space",
    image: "https://tahmid.space/logo.png",
    sameAs: [
      "https://github.com/tahmidbintaslim",
      "https://twitter.com/RAFI_it100",
      "https://www.linkedin.com/in/tahmid-bin-taslim/",
    ],
    jobTitle: "Senior Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Freelance / Contract",
    },
    description: "Senior Software Engineer with 4+ years of experience specializing in React, Next.js, Node.js, TypeScript, GraphQL, AI/ML integration, cloud-native architecture, and scalable e-commerce solutions.",
    knowsAbout: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "JavaScript",
      "GraphQL",
      "MongoDB",
      "PostgreSQL",
      "AI/ML Integration",
      "Cloud-Native Architecture",
      "Microservices",
      "E-commerce Solutions",
      "SaaS Development",
      "Full-Stack Development",
    ],
  },

  // Website schema
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tahmid Bin Taslim Rafi - Portfolio",
    alternateName: "Tahmid's Portfolio",
    url: "https://tahmid.space",
    description: "Senior Software Engineer portfolio showcasing 4+ years of experience in full-stack development, AI/ML integration, and cloud-native solutions.",
    author: {
      "@type": "Person",
      name: "Tahmid Bin Taslim Rafi",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://tahmid.space?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en-US",
  },

  // Professional Service schema
  professionalService: {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Tahmid Bin Taslim Rafi - Software Development Services",
    url: "https://tahmid.space",
    description: "Professional software development services specializing in full-stack web development, AI/ML integration, and cloud-native solutions.",
    serviceType: "Software Development",
    provider: {
      "@type": "Person",
      name: "Tahmid Bin Taslim Rafi",
    },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Software Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full-Stack Web Development",
            description: "Custom web application development using React, Next.js, and Node.js",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI/ML Integration",
            description: "Integration of artificial intelligence and machine learning solutions into existing applications",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cloud-Native Architecture",
            description: "Design and implementation of scalable cloud-native solutions",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "E-commerce Solutions",
            description: "Development of robust and scalable e-commerce platforms",
          },
        },
      ],
    },
  },

  /**
   * Helper function to generate blog post schema
   * Usage: structuredData.createBlogPostSchema(title, description, imageUrl, datePublished, url)
   */
  createBlogPostSchema: generateArticleSchema,

  /**
   * Helper function to generate project/product schema
   * Usage: structuredData.createProjectSchema(name, description, imageUrl, url, author)
   */
  createProjectSchema: generateProductSchema,

  /**
   * Helper function to generate breadcrumb schema
   * Usage: structuredData.createBreadcrumbSchema([{name: 'Home', url: 'https://...'}, ...])
   */
  createBreadcrumbSchema: generateBreadcrumbSchema,
};
