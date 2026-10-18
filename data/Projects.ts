export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  title: string;
  period: string;
  description: string;
  highlights: string[];
  image?: string;
  tags: string[];
  links?: ProjectLink[];
};

export const PROJECTS: Project[] = [
  {
    id: "proj-monotype-connect",
    title: "Monotype Connect",
    period: "SEPT 2025 — DEC 2026",
    description:
      "Font management and typography platform. Built scalable, responsive enterprise applications with reusable components and REST API integration.",
    highlights: [
      "Developed the product with React 19, TypeScript, JavaScript, Tailwind CSS, and React Router.",
      "Managed state and data with Redux Toolkit, Apollo Client, TanStack Query, Zustand, and React Context.",
      "Improved performance and quality with a PWA (Workbox, IndexedDB), Vitest unit tests, and Agile delivery on GitHub and Jira.",
    ],
    tags: [
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "TanStack Query",
      "Zustand",
      "Apollo Client",
      "Vitest",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/1123Aditya",
      },
    ],
  },
  {
    id: "proj-agri-optimization",
    title: "Optimization of Agricultural Production",
    period: "OCT 2024 — JAN 2025",
    description:
      "MERN web application that helps farmers plan crops, irrigation, and fertilization from field data.",
    highlights: [
      "Built data-driven recommendations for crop planning, irrigation, and fertilization.",
      "Designed an interface where farmers enter field data and receive personalized insights, improving decisions and resource use.",
    ],
    tags: ["MongoDB", "Express.js", "React", "Node.js"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/1123Aditya",
      },
    ],
  },
  {
    id: "proj-sadhguru-estate",
    title: "SadhGuru Real Estate",
    period: "JUL 2024 — SEP 2024",
    description:
      "Real estate marketplace built from scratch, with secure access and fast property search.",
    highlights: [
      "Built JWT authentication and Redux Toolkit so listings stay behind secure access.",
      "Implemented property listing and search, and improved search speed by 60%.",
    ],
    tags: ["React", "Redux Toolkit", "JWT", "Node.js", "MongoDB"],
    links: [
      {
        label: "Code",
        href: "https://github.com/1123Aditya/mern-estate",
      },
    ],
  },
  {
    id: "proj-algorithm-visualizer",
    title: "Algorithm Visualizer",
    period: "APR 2024 — MAY 2024",
    description:
      "Interactive tool that walks through sorting and searching algorithms with live animations.",
    highlights: [
      "Step-by-step execution for Bubble Sort, Merge Sort, and Binary Search.",
      "Real-time animations that make each step easier to follow.",
    ],
    tags: ["JavaScript", "HTML", "CSS"],
    links: [
      {
        label: "Code",
        href: "https://github.com/1123Aditya/ALGORITHM-VISUALIZER",
      },
    ],
  },
];
