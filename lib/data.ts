export interface ProjectItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  year: string;
  type: string;
  metaStatus: string;
  whatItIs: string[];
  builtWith: string[];
  status: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  tag: string;
  type: string;
  metaStatus: string;
  downloadUrl?: string;
  isDownloadDisabled?: boolean;
  buttonText: string;
  features: string[];
}

export const SITE_METADATA = {
  title: "Lucky (Rahul Mahato) • App & Web Developer",
  description:
    "Lucky builds Android & web apps end to end, creator of ARISE and Gym Management. Web developer from Bokaro, Jharkhand, India.",
  url: "https://luckyxdev.me",
  author: "Rahul Kumar Mahato",
  displayName: "Lucky",
  handle: "luckyxdev",
  location: "Bokaro, India",
  email: "code.rahulx@gmail.com",
  copyrightYear: "2026",
  socials: [
    {
      label: "GITHUB",
      href: "https://github.com/rahulx-dev",
    },
    {
      label: "LINKEDIN",
      href: "https://www.linkedin.com/in/rahul-mahato-46111234a/",
    },
  ],
};

export const ABOUT_COPY =
  "Web developer from Jharkhand, India. I design and build Android & web apps end to end and ship them.";

export const PROJECTS: ProjectItem[] = [
  {
    id: "arise",
    slug: "arise",
    name: "ARISE",
    tagline: "Gamified fitness + app blocker",
    year: "2026",
    type: "MOBILE APP",
    metaStatus: "ACTIVE DEV",
    whatItIs: [
      "A mobile app pairing physical fitness tracking with screen-time discipline.",
      "Complete exercise goals to unlock restricted applications on your device.",
    ],
    builtWith: ["React Native", "TypeScript", "Tailwind CSS", "Expo", "SQLite"],
    status: "Active development • Launching 2026",
  },
  {
    id: "gym-management",
    slug: "gym-management",
    name: "Gym Management",
    tagline: "Android app for gyms: members, fee due dates, WhatsApp reminders.",
    year: "2026",
    type: "ANDROID APP",
    metaStatus: "STABLE RELEASE",
    whatItIs: [
      "Management app designed for gym owners to track members, automate monthly fee due dates, and send one-tap WhatsApp reminders.",
    ],
    builtWith: ["React Native / Expo (Android)"],
    status: "Android APK available for free download from the Products page.",
  },
];

export const PRODUCTS: ProductItem[] = [
  {
    id: "gym-management",
    slug: "gym-management",
    name: "Gym Management",
    tagline: "Android app for gyms: members, fee due dates, WhatsApp reminders.",
    tag: "ANDROID APK",
    type: "ANDROID APP",
    metaStatus: "AVAILABLE",
    downloadUrl:
      "https://drive.google.com/file/d/1lRyHWLtG1M3kGR4GZKCN2SIIfbIltXe6/view?usp=sharing",
    buttonText: "DOWNLOAD APK",
    features: [
      "Member records with automatic monthly due dates",
      "One-tap WhatsApp fee reminders",
      "Monthly collected vs pending view",
    ],
  },
  {
    id: "arise",
    slug: "arise",
    name: "ARISE",
    tagline: "Gamified fitness app with OS-level app blocking.",
    tag: "Free",
    type: "MOBILE APP",
    metaStatus: "IN DEVELOPMENT",
    isDownloadDisabled: true,
    buttonText: "APK COMING SOON",
    features: [
      "Workout-to-unlock app restriction engine",
      "Streak-based habit building",
      "Zero data collection, fully on-device",
    ],
  },
];
