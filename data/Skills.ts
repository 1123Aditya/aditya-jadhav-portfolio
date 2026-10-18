import type { IconType } from "react-icons";

import {
  SiAxios,
  SiBootstrap,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGithub,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiJenkins,
  SiJira,
  SiJsonwebtokens,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiPostman,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

import { FaJava, FaCss3Alt } from "react-icons/fa6";
import { TbApi, TbBrandVscode } from "react-icons/tb";

export type SkillItem = {
  name: string;
  icon?: IconType;
  color?: string;
};

export type SkillGroup = {
  title: string;
  items: SkillItem[];
};

export type SkillTab = {
  id: string;
  label: string;
};

export const SKILL_TABS: SkillTab[] = [
  { id: "languages", label: "Languages" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "databases", label: "Databases" },
  { id: "tools", label: "Tools & DevOps" },
  { id: "foundations", label: "Core Concepts" },
];

export const SKILLS: Record<string, SkillGroup[]> = {
  languages: [
    {
      title: "Languages",
      items: [
        { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
        { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
        { name: "Java", icon: FaJava, color: "#ED8B00" },
      ],
    },
  ],

  frontend: [
    {
      title: "Frontend",
      items: [
        { name: "React.js", icon: SiReact, color: "#61DAFB" },
        { name: "Redux", icon: SiRedux, color: "#764ABC" },
        { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
        { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
        { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
        { name: "Responsive Design" },
        { name: "Figma to UI", icon: SiFigma, color: "#F24E1E" },
      ],
    },
  ],

  backend: [
    {
      title: "Backend & APIs",
      items: [
        { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
        { name: "Express.js", icon: SiExpress, color: "#A3A3A3" },
        { name: "REST APIs", icon: TbApi, color: "#A3A3A3" },
        { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
        { name: "Axios", icon: SiAxios, color: "#5A29E4" },
        { name: "Fetch API" },
        { name: "JWT Auth", icon: SiJsonwebtokens, color: "#D63AFF" },
      ],
    },
  ],

  databases: [
    {
      title: "Databases",
      items: [
        { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
        { name: "Mongoose", icon: SiMongodb, color: "#880000" },
        { name: "MySQL", icon: SiMysql, color: "#4479A1" },
        { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
      ],
    },
  ],

  tools: [
    {
      title: "Tools & DevOps",
      items: [
        { name: "Git", icon: SiGit, color: "#F05032" },
        { name: "GitHub", icon: SiGithub, color: "#181717" },
        { name: "Jenkins", icon: SiJenkins, color: "#D24939" },
        { name: "CI/CD" },
        { name: "Postman", icon: SiPostman, color: "#FF6C37" },
        { name: "Jira", icon: SiJira, color: "#0052CC" },
        { name: "VS Code", icon: TbBrandVscode, color: "#007ACC" },
      ],
    },
  ],

  foundations: [
    {
      title: "Core Concepts & Testing",
      items: [
        { name: "DSA" },
        { name: "API Integration" },
        { name: "Unit Testing" },
        { name: "Performance" },
        { name: "Debugging" },
        { name: "Root Cause Analysis" },
        { name: "Code Reviews" },
        { name: "Agile / Scrum" },
      ],
    },
  ],
};
