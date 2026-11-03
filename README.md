# LUCKYXDEV - Portfolio of Lucky

Personal portfolio of **Lucky**, an Android and web app developer based in Bokaro, India.
Live at **[luckyxdev.me](https://luckyxdev.me)**

I build apps people actually use: complete products, end to end - idea, clean UI,
working software, shipped.

## Highlights

- **Interactive ASCII portrait** - the hero portrait is rendered live on a `<canvas>`:
  the photo is sampled into a grid and redrawn as characters by brightness, reacting to the mouse.
- **Smooth scrolling** with Lenis, plus scroll-triggered reveals and word-by-word heading
  animations built on Framer Motion. All motion respects `prefers-reduced-motion`.
- **Content separated from UI** - every project, product and line of copy lives in `lib/data.ts`
  as typed data; components only render it.
- **SEO done properly** - per-page metadata, Open Graph and Twitter cards, canonical URL,
  sitemap, and JSON-LD structured data.
- **Editorial design system** - near-black `#0A0A0A`, a single lime accent `#A3E635`,
  Space Grotesk / Inter / JetBrains Mono. No gradients.

## Tech stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion 14, Lenis 1.3 |
| Hosting | Netlify (custom domain: luckyxdev.me) |

## Project structure

```
app/
  layout.tsx      Root layout: fonts, navigation, footer, smooth scroll, page transitions
  page.tsx        Homepage: hero, selected work, products, about, contact sections
  globals.css     Design tokens (colors, fonts) and Tailwind setup
  products/       Product pages (for example the Gym Management APK download page)
components/
  AsciiPortrait.tsx   Canvas ASCII portrait with mouse interaction
  Navigation.tsx      Top navigation
  SmoothScroll.tsx    Lenis smooth-scroll wrapper
  ScrollReveal.tsx    Scroll-triggered fade/rise wrapper (Framer Motion)
  WordReveal.tsx      Word-by-word heading reveal
  MarqueeStrip.tsx    Scrolling tech strip
  PhoneShot.tsx       Phone frame for app screenshots
  LiveClock.tsx       Live IST clock in the footer
  ContactFooter.tsx   Contact section and footer
lib/
  data.ts         All site content as typed data (projects, products, site metadata)
public/
  portrait.jpg    Source photo for the ASCII portrait
  og.jpg          Social share image
```

## Featured work

- **ARISE** - gamified fitness app with on-device pose detection and focus-mode app blocking
  (React Native, Expo, Kotlin, ML Kit, Supabase). APK coming soon.
- **Gym Management** - member and fee management app for a real 100+ member gym: member records,
  automatic fee dues, payment receipts and one-tap WhatsApp reminders. Offline-first.
  Free Android APK: [luckyxdev.me/products/gym-management](https://luckyxdev.me/products/gym-management)

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deployment

The site is deployed on Netlify from this repository. The custom domain `luckyxdev.me`
is connected with HTTPS, and the site is indexed in Google Search Console.

## Contact

- Email: code.rahulx@gmail.com
- GitHub: https://github.com/rahulx-dev
- LinkedIn: https://www.linkedin.com/in/rahul-mahato-46111234a/

---

© 2026 Lucky. All rights reserved.
