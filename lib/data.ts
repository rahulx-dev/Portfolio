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

export interface ProductFeature {
  title: string;
  description: string;
}

export interface ScreenshotItem {
  src: string;
  caption: string;
  alt: string;
}

export interface ProductHighlight {
  stat: string;
  label: string;
}

export interface ProductStep {
  title: string;
  description: string;
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
  intro?: string;
  features: string[];
  detailedFeatures?: ProductFeature[];
  screenshots?: ScreenshotItem[];
  highlights?: ProductHighlight[];
  steps?: ProductStep[];
}

export const SITE_METADATA = {
  title: "Lucky — Android & Web App Developer",
  description:
    "Android and web app developer based in Bokaro, India. I design and build complete digital products end to end — clean interfaces, solid engineering, and software that ships. Available for freelance projects and collaborations.",
  url: "https://luckyxdev.me",
  author: "Lucky",
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
    name: "Royal Gym",
    tagline: "The register book is retired.",
    tag: "ANDROID APK",
    type: "ANDROID APP",
    metaStatus: "AVAILABLE",
    downloadUrl:
      "https://www.mediafire.com/file/vkdfeb7jskcjacn/Royal-Gym-Release.apk/file",
    buttonText: "DOWNLOAD APK",
    intro:
      "Royal Gym is a boutique, offline-first gym management app built to replace manual registers and error-prone spreadsheets. It brings the entire member lifecycle into one precise fee engine - smart multi-month billing with automatic advance rollovers, instant fee settlement, digital receipts, and one-tap WhatsApp payment reminders. Everything runs on the device itself: 100% offline, zero server dependency, and no recurring cloud subscription fees, with real-time revenue analytics always at hand.",
    features: [
      "Smart multi-month billing with advance rollovers",
      "Instant fee settlement down to the rupee",
      "Digital fee receipts with one-tap WhatsApp sharing",
      "One-tap ready-made WhatsApp fee reminders",
      "Real-time revenue analytics & monthly statements",
      "100% offline, zero server, single-device lock",
    ],
    detailedFeatures: [
      {
        title: "Smart multi-month billing",
        description:
          "1, 3 and 12 month plans with admission fee, custom rates and discounts. Advance payments roll into the next cycle automatically, so no fee month is ever lost or double-counted.",
      },
      {
        title: "Instant fee settlement",
        description:
          "Record UPI or cash in two taps, including partial payments. The balance (baki) is tracked per member, per cycle, down to the rupee.",
      },
      {
        title: "Digital fee receipts",
        description:
          "Every payment generates a numbered receipt slip with plan, amount, mode and balance - share it on WhatsApp in one tap, or download and print it.",
      },
      {
        title: "One-tap WhatsApp reminders",
        description:
          "Pending-fee members get a ready-made reminder message through WhatsApp. No typing, no awkward phone calls.",
      },
      {
        title: "Real-time revenue analytics",
        description:
          "Collected vs pending, settlement percentage, UPI vs cash split and monthly statements, computed live from the same records. Download a full statement whenever it is needed.",
      },
      {
        title: "100% offline and private",
        description:
          "All data stays on the owner's phone. No server, no account, no subscription. An absent-month policy skips charging inactive members, and a one-time device activation keeps each copy locked to one gym.",
      },
    ],
    highlights: [
      { stat: "100%", label: "OFFLINE, NO SERVER" },
      { stat: "0", label: "CLOUD FEES, EVER" },
      { stat: "1 TAP", label: "WHATSAPP FEE REMINDERS" },
      { stat: "2 MIN", label: "MEMBER SETUP TO FIRST RECEIPT" },
    ],
    screenshots: [
      {
        src: "/gym/01-home-overview.jpg",
        caption: "HOME - COLLECTED VS PENDING, LIVE",
        alt: "Royal Gym app home screen showing collected and pending fees",
      },
      {
        src: "/gym/02-members-list.jpg",
        caption: "MEMBERS - PAID AND PENDING FILTERS",
        alt: "Royal Gym members list with paid and pending filters",
      },
      {
        src: "/gym/03-member-details.jpg",
        caption: "MEMBER PROFILE - PLAN, DUES, HISTORY",
        alt: "Royal Gym member profile with plan, dues, and payment history",
      },
      {
        src: "/gym/04-add-member.jpg",
        caption: "ADD MEMBER - PLAN AND DISCOUNT IN ONE FLOW",
        alt: "Royal Gym add member screen with plan selection and discount",
      },
      {
        src: "/gym/05-payments.jpg",
        caption: "PAYMENTS - UPI VS CASH, MONTHLY STATEMENT",
        alt: "Royal Gym payments overview with UPI vs cash breakdown",
      },
      {
        src: "/gym/06-fee-receipt.jpg",
        caption: "DIGITAL RECEIPT - SHARE ON WHATSAPP",
        alt: "Royal Gym digital fee receipt ready to share on WhatsApp",
      },
      {
        src: "/gym/07-settings.jpg",
        caption: "SETTINGS - PLANS, POLICIES, BACKUP",
        alt: "Royal Gym settings for plans, absent policies, and data backup",
      },
      {
        src: "/gym/08-welcome-setup.jpg",
        caption: "FIRST RUN - YOUR GYM, YOUR PRICES",
        alt: "Royal Gym initial setup screen for gym name and fee rates",
      },
      {
        src: "/gym/09-activation.jpg",
        caption: "ACTIVATION - ONE DEVICE, ONE GYM",
        alt: "Royal Gym one-time offline device activation screen",
      },
    ],
    steps: [
      {
        title: "Activate",
        description:
          "Enter the one-time activation key. The app unlocks for this device only, fully offline.",
      },
      {
        title: "Set up your gym",
        description:
          "Gym name, monthly fee and admission fee. Two minutes, once.",
      },
      {
        title: "Run the desk",
        description:
          "Add members, record fees, send reminders, share receipts. The notebook stays closed.",
      },
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
