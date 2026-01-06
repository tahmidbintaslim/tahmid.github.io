import { FaFacebook, FaYoutube } from "react-icons/fa";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxLinkedinLogo,
  RxTwitterLogo,
} from "react-icons/rx";

// Core Languages - No duplicates, organized properly
export const LANGUAGES_SKILL = [
  {
    skill_name: "JavaScript",
    image: "js.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "TypeScript",
    image: "ts.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Python",
    category: "language",
  },
  {
    skill_name: "PHP",
    category: "language",
  },
  {
    skill_name: "Rust",
    category: "language",
  },
  {
    skill_name: "Go",
    image: "go.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Ruby",
    category: "language",
  },
] as const;

export const SOCIALS = [
  {
    name: "Instagram",
    icon: RxInstagramLogo,
    link: "https://www.instagram.com/itstahmid100/",
  },
  {
    name: "Facebook",
    icon: FaFacebook,
    link: "https://www.facebook.com/itstahmid100/",
  },
  {
    name: "Twitter",
    icon: RxTwitterLogo,
    link: "https://x.com/RAFI_it100",
  },
] as const;

export const FRONTEND_SKILL = [
  {
    skill_name: "HTML",
    image: "html.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "CSS",
    image: "css.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React",
    image: "react.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Next.js",
    image: "next.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Redux",
    image: "redux.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React Query",
    image: "reactquery.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Tailwind CSS",
    image: "tailwind.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Material UI",
    image: "mui.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Vue.js",
    category: "frontend",
  },
  {
    skill_name: "Remix",
    category: "frontend",
  },
  {
    skill_name: "Angular",
    category: "frontend",
  },
] as const;

export const BACKEND_SKILL = [
  {
    skill_name: "Node.js",
    image: "node.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Express.js",
    image: "express.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "GraphQL",
    image: "graphql.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Django",
    category: "backend",
  },
  {
    skill_name: "Flask",
    category: "backend",
  },
  {
    skill_name: "FastAPI",
    category: "backend",
  },
  {
    skill_name: "Laravel",
    category: "backend",
  },
  {
    skill_name: "Ruby on Rails",
    category: "backend",
  },
] as const;

export const DATABASE_SKILL = [
  {
    skill_name: "MongoDB",
    image: "mongodb.png",
    width: 40,
    height: 40,
  },
  {
    skill_name: "PostgreSQL",
    image: "postgresql.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "MySQL",
    image: "mysql.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Prisma",
    image: "prisma.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Firebase",
    image: "firebase.png",
    width: 55,
    height: 55,
  },
  {
    skill_name: "Redis",
    category: "database",
  },
  {
    skill_name: "TypeORM",
    category: "database",
  },
] as const;

export const CLOUD_DEVOPS_SKILL = [
  {
    skill_name: "Docker",
    image: "docker.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "AWS",
    category: "cloud",
  },
  {
    skill_name: "GCP",
    category: "cloud",
  },
  {
    skill_name: "Azure",
    category: "cloud",
  },
  {
    skill_name: "Kubernetes",
    category: "devops",
  },
  {
    skill_name: "Terraform",
    category: "devops",
  },
  {
    skill_name: "CI/CD",
    category: "devops",
  },
] as const;

export const ECOMMERCE_SKILL = [
  {
    skill_name: "Shopify/Plus",
    category: "ecommerce",
  },
  {
    skill_name: "WordPress",
    category: "ecommerce",
  },
  {
    skill_name: "Headless CMS",
    category: "ecommerce",
  },
] as const;

export const AI_ML_SKILL = [
  {
    skill_name: "OpenAI",
    category: "ai",
  },
  {
    skill_name: "TensorFlow",
    category: "ai",
  },
  {
    skill_name: "PyTorch",
    category: "ai",
  },
] as const;

export const TOOLS_OTHER_SKILL = [
  {
    skill_name: "React Native",
    image: "reactnative.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Figma",
    image: "figma.png",
    width: 50,
    height: 50,
  },
  {
    skill_name: "Framer Motion",
    image: "framer.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Stripe",
    image: "stripe.png",
    width: 80,
    height: 80,
  },
] as const;

export const PROJECTS = [
  {
    title: "Amazing Properties",
    description:
      "Using Algolia AI, React, Next.js, Node.js, GraphQL, REST API and Wordpress. While working on Trienpont, I managed a team and build this Full Stack Headless Application.",
    image: "/projects/AP-Logo-on-White-Stack_Final_Hi.webp",
    link: "https://amazingproperties.org/",
    techStack: ["React", "Next.js", "Node.js", "GraphQL", "Algolia AI", "WordPress"] as const,
    role: "Team Lead",
  },
  {
    title: "Scholl Thailand",
    description:
      "Developed Scholl Thailand Website while working at Relevant. Shopify Plus website with loads of API integration (python, php, ruby), CRM, Payment, Automation, Delivery & Tracking.",
    image: "/projects/HvYrQMU4r6fe7KYdGkhJ.jpg",
    link: "https://schollshoesthailand.com/",
    techStack: ["Shopify Plus", "Python", "PHP", "Ruby", "CRM", "Payment Gateway"] as const,
    role: "Full Stack Developer",
  },
  {
    title: "Relevant Audience",
    description:
      "While working at Relevant Audience Co. Ltd, Developed its brand website using latest UI/UX. Made with Twig, Php, Wordpress, AlpineJS, and Tailwind CSS.",
    image: "/projects/RELEVANT-AUDIENCE.png",
    link: "https://www.relevantaudience.com/",
    techStack: ["WordPress", "PHP", "AlpineJS", "Tailwind CSS", "Twig"] as const,
    role: "Full Stack Developer",
  },
  {
    title: "Aroma Group",
    description:
      "The brand website of Aroma Group, a leading company in Thailand. Developed while working at Relevant Audience Co. Ltd. Made with Wordpress, AlpineJS, and Tailwind CSS. Also made their HR system with React, Node.js, and MongoDB.",
    image: "/projects/c1_657976_150817065848_790.jpg",
    link: "https://aromathailand.com/",
    techStack: ["WordPress", "React", "Node.js", "MongoDB", "Tailwind CSS"] as const,
    role: "Full Stack Developer",
  },
  {
    title: "Chao Doi",
    description:
      "Developed Chao Doi Website while working at Relevant. Headless wordpress website with loads of API integration, CRM, Payment, Automation, Delivery & Tracking.",
    image: "/projects/chao-doi.png",
    link: "https://chaodoi.co.th/",
    techStack: ["WordPress", "Headless CMS", "API Integration", "CRM"] as const,
    role: "Full Stack Developer",
  },
  {
    title: "Plantoys Thailand",
    description:
      "While working at Relevant Audience Co. Ltd, developed Plantoys Thailand's brand website. Made with Shopify, API integration to CRM, Payment, Automation, Delivery & Tracking.",
    image: "/projects/plantoys-24.jpg",
    link: "https://th.plantoys.com/",
    techStack: ["Shopify", "API Integration", "CRM", "Payment Gateway"] as const,
    role: "Full Stack Developer",
  },
] as const;

export const FOOTER_DATA = [
  {
    title: "Community",
    data: [
      {
        name: "YouTube",
        icon: FaYoutube,
        link: "https://www.youtube.com/@theasmrcoding",
      },
      {
        name: "GitHub",
        icon: RxGithubLogo,
        link: "https://github.com/tahmidbintaslim/",
      },
      {
        name: "Discord",
        icon: RxDiscordLogo,
        link: "https://discordapp.com/users/561564380022439950",
      },
    ],
  },
  {
    title: "Social Media",
    data: [
      {
        name: "Instagram",
        icon: RxInstagramLogo,
        link: "https://www.instagram.com/itstahmid100/",
      },
      {
        name: "Twitter",
        icon: RxTwitterLogo,
        link: "https://x.com/RAFI_it100",
      },
      {
        name: "Linkedin",
        icon: RxLinkedinLogo,
        link: "https://www.linkedin.com/in/tahmid-bin-taslim/",
      },
    ],
  },
  {
    title: "About",
    data: [
      {
        name: "Buy Me a Coffee",
        icon: null,
        link: "https://www.buymeacoffee.com/09071998",
      },
      {
        name: "Github",
        icon: null,
        link: "https://github.com/tahmidbintaslim/",
      },
      {
        name: "Contact Me",
        icon: null,
        link: "mailto:tahmidbintaslimrafi@gmail.com",
      },
    ],
  },
] as const;

export const NAV_LINKS = [
  {
    title: "About",
    link: "#about-me",
  },
  {
    title: "Skills",
    link: "#skills",
  },
  {
    title: "Projects",
    link: "#projects",
  },
  {
    title: "Contact",
    link: "#contact",
  },
] as const;

export const LINKS = {
  sourceCode: "https://github.com/tahmidbintaslim/tahmid.github.io",
};
