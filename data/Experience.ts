export type ExperienceItem = {
  index: string;
  accent: boolean;
  role: string;
  company: string;
  period: string;
  tags: string[];
  bullets: string[];
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    index: "01",
    accent: true,
    role: "Software Engineer",
    company: "Centralogic Private Limited · Client: Monotype",
    period: "SEPT 2025 — PRESENT",
    tags: ["Monotype", "100+ bugs", "Jenkins CI/CD"],
    bullets: [
      "Built scalable, responsive enterprise web applications with React.js and TypeScript, using reusable components and translating Figma designs into pixel-perfect UI.",
      "Optimized React components and state management, cutting unnecessary re-renders and improving responsiveness.",
      "Integrated RESTful APIs with backend developers, handling errors and data validation so the frontend and backend stay in sync.",
      "Resolved 100+ bugs through debugging and root cause analysis, and kept quality high through code reviews.",
      "Owned a frontend module end to end — from requirements and acceptance criteria through development, testing, and QA — in Agile/Scrum sprints, and supported deployments through Jenkins CI/CD.",
    ],
  },
  {
    index: "02",
    accent: false,
    role: "Software Developer Intern",
    company: "5M India Technologies",
    period: "JUN 2025 — AUG 2025",
    tags: ["MyRoadIndia.com", "React · Bootstrap", "MySQL"],
    bullets: [
      "Developed responsive frontend interfaces for MyRoadIndia.com using React.js and Bootstrap.",
      "Integrated RESTful APIs built with Node.js and Express.js for frontend-backend communication.",
      "Optimized MySQL queries to improve application performance, resolved bugs, and joined code reviews and Agile sprints.",
    ],
  },
];
