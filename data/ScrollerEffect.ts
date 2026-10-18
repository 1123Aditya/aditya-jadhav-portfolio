export const ICON_BASE =
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/";

// The scroll route: [scrollProgress, x fraction of viewport, y fraction of viewport]
export const ROUTE_WAYPOINTS: Array<[number, number, number]> = [
  [0.0, 0.07, 0.17],
  [0.19, 0.84, 0.5],
  [0.33, 0.13, 0.28],
  [0.47, 0.87, 0.66],
  [0.61, 0.11, 0.32],
  [0.75, 0.88, 0.62],
  [0.88, 0.18, 0.44],
  [1.0, 0.78, 0.72],
];

export const CHIP_LABELS = [
  ICON_BASE + "react/react-original.svg",
  ICON_BASE + "typescript/typescript-original.svg",
  ICON_BASE + "javascript/javascript-original.svg",
  ICON_BASE + "nodejs/nodejs-original.svg",
  ICON_BASE + "express/express-original.svg",
  ICON_BASE + "mongodb/mongodb-original.svg",
  ICON_BASE + "mysql/mysql-original.svg",
  ICON_BASE + "git/git-original.svg",
];

export const FLOAT_ICONS = [
  { name: "React", icon: ICON_BASE + "react/react-original.svg" },
  {
    name: "TypeScript",
    icon: ICON_BASE + "typescript/typescript-original.svg",
  },
  {
    name: "JavaScript",
    icon: ICON_BASE + "javascript/javascript-original.svg",
  },
  { name: "Node.js", icon: ICON_BASE + "nodejs/nodejs-original.svg" },
  { name: "Express", icon: ICON_BASE + "express/express-original.svg" },
  { name: "MongoDB", icon: ICON_BASE + "mongodb/mongodb-original.svg" },
  { name: "MySQL", icon: ICON_BASE + "mysql/mysql-original.svg" },
  {
    name: "Tailwind",
    icon: ICON_BASE + "tailwindcss/tailwindcss-original.svg",
  },
];
