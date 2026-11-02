export interface ProjectItem {
  id: string;
  slug: string | null;
  name: string;
  tagline: string;
  year: string;
  index: string;
  type: string;
  metaStatus: string;
  whatItIs?: string[];
  builtWith?: string[];
  status?: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  tag: "Free" | "In Beta";
  index: string;
  type: string;
  metaStatus: string;
  features: string[];
}

export const SITE_METADATA = {
  title: "Lucky — App Developer | luckyxdev",
  description:
    "Lucky builds Android & web apps end-to-end. Creator of ARISE and Royal Gym Manager. Web developer from Jharkhand, India.",
  url: "https://luckyxdev.me",
  author: "Lucky",
  handle: "luckyxdev",
  location: "Bokaro, India",
  email: "hello@luckyxdev.me",
  copyrightYear: "2026",
  portfolioYear: "2026",
  socials: [
    { label: "GITHUB", href: "https://github.com/luckyxdev" },
    { label: "LINKEDIN", href: "https://linkedin.com/in/luckyxdev" },
    { label: "INSTAGRAM", href: "https://instagram.com/luckyxdev" },
  ],
};

export const ABOUT_COPY =
  "Web developer from Jharkhand, India. I design and build Android & web apps end-to-end — and ship them.";

export const PROJECTS: ProjectItem[] = [
  {
    id: "arise",
    slug: "arise",
    name: "ARISE",
    tagline: "Gamified fitness + app blocker",
    year: "2026",
    index: "01",
    type: "MOBILE APP",
    metaStatus: "ACTIVE DEV",
    whatItIs: [
      "A mobile app pairing physical fitness tracking with screen-time discipline.",
      "Complete exercise goals to unlock restricted applications on your device.",
    ],
    builtWith: ["React Native", "TypeScript", "Tailwind CSS", "Expo", "SQLite"],
    status: "Active development — Launching 2026",
  },
  {
    id: "royal-gym",
    slug: "royal-gym",
    name: "Royal Gym",
    tagline: "Member & fee manager for gyms",
    year: "2026",
    index: "02",
    type: "WEB PLATFORM",
    metaStatus: "PRIVATE BETA",
    whatItIs: [
      "Management dashboard and member records portal designed for gym owners.",
      "Automates subscription dues, attendance logs, and automated reminders.",
    ],
    builtWith: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma"],
    status: "Private beta — Deploying Q2 2026",
  },
  {
    id: "project-three",
    slug: null,
    name: "Project Three",
    tagline: "Coming soon",
    year: "2026",
    index: "03",
    type: "CONCEPT",
    metaStatus: "UNRELEASED",
  },
];

export const PRODUCTS: ProductItem[] = [
  {
    id: "arise",
    slug: "arise",
    name: "ARISE",
    tagline: "Gamified fitness + app blocker",
    tag: "Free",
    index: "01",
    type: "ANDROID & IOS",
    metaStatus: "FREE",
    features: [
      "Workout-to-unlock app restriction engine",
      "Streak-based habit building",
      "Zero data collection, fully on-device",
    ],
  },
  {
    id: "royal-gym",
    slug: "royal-gym",
    name: "Royal Gym Manager",
    tagline: "Member & fee manager for gyms",
    tag: "In Beta",
    index: "02",
    type: "SAAS PLATFORM",
    metaStatus: "IN BETA",
    features: [
      "Automated fee collection and WhatsApp reminders",
      "Instant member check-in with attendance logs",
      "Revenue analytics and renewal forecasting",
    ],
  },
];
