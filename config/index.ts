import type { Metadata } from "next";

const SITE_URL = "https://tahmid.space";
const SITE_NAME = "Tahmid Bin Taslim Rafi";
const SITE_TITLE = "Tahmid Bin Taslim Rafi | Senior Software Engineer & Full-Stack Developer";
const SITE_DESCRIPTION = "Senior Software Engineer with 6+ years of experience specializing in React, Next.js, Node.js, TypeScript, GraphQL, AI/ML integration, cloud-native architecture, and scalable e-commerce solutions. Expert in building high-performance web applications.";

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
    
    // Technology expertise
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
    "React.js",
    "Next.js",
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
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "icon",
        url: "/icon1.png",
      },
      {
        rel: "icon",
        url: "/icon2.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: "", // Add Google Search Console verification code
    // yandex: "", // Add Yandex verification code if needed
    // bing: "", // Add Bing verification code if needed
  },
  category: "technology",
} as const;
