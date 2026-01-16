import type { Metadata } from "next";

const SITE_URL = "https://tahmid.space";
const SITE_NAME = "Tahmid Bin Taslim Rafi";
const SITE_TITLE = "Tahmid Bin Taslim Rafi | Senior Software Engineer & Full-Stack Developer";
const SITE_DESCRIPTION = "Senior Software Engineer with 4+ years of experience specializing in React, Next.js, Node.js, TypeScript, GraphQL, AI/ML integration, cloud-native architecture, and scalable e-commerce solutions. Expert in building high-performance web applications.";

export const siteConfig: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    // Primary keywords for SEO
    "Tahmid Bin Taslim Rafi",
    "Tahmid Bin Taslim",
    "Senior Software Engineer",
    "Full-Stack Developer",
    "React Developer",
    "Next.js Developer",

    // Technology expertise (consolidated, removed duplicates)
    "React",
    "Next.js 15",
    "Node.js",
    "TypeScript",
    "JavaScript",
    "GraphQL",
    "MongoDB",
    "PostgreSQL",

    // Specializations
    "AI/ML Integration",
    "Machine Learning",
    "Cloud-Native Architecture",
    "Microservices",
    "E-commerce Solutions",
    "SaaS Development",
    "API Development",
    "RESTful APIs",

    // Skills and practices
    "Web Development",
    "Frontend Development",
    "Backend Development",
    "Full-Stack Development",
    "Software Architecture",
    "Performance Optimization",
    "Responsive Design",
    "UI/UX Design",

    // Frameworks and tools
    "Express.js",
    "Tailwind CSS",
    "Framer Motion",
    "Three.js",
    "Redux",

    // Portfolio specific
    "Developer Portfolio",
    "Software Engineer Portfolio",
    "3D Portfolio",
    "Interactive Portfolio",
    "Space Theme Portfolio",
  ] as Array<string>,
  authors: [
    {
      name: SITE_NAME,
      url: "https://github.com/tahmidbintaslim/",
    },
  ],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Senior Software Engineer Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: "@RAFI_it100",
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
      noimageindex: false,
    },
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE || "", // Add via .env.local
    // yandex: process.env.YANDEX_VERIFICATION_CODE || "",
    // bing: process.env.BING_VERIFICATION_CODE || "",
  },
  category: "technology",
} as const;
