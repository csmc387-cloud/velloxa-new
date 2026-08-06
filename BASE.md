# VELOXA — Base System Architecture & Specifications

> **Document Type:** Master System Specification (BASE.md)  
> **Brand:** VELOXA — Personal Brand & AI Web Agency Website  
> **Version:** 1.1 (Streamlined 3-Page Architecture)  
> **Target Outcome:** High-conversion, dark, tech-forward agency website with <2s load times & WCAG AAA contrast.

---

## 1. Executive Summary & Brand Positioning

**Veloxa** is a high-performance agency specializing in:
1. **AI Integration for SMEs** (Custom LLM agents, automated workflows, internal tools)
2. **Modern Web Engineering** (High-speed, conversion-optimized Next.js/React websites)
3. **Passion Marketing** (Growth campaigns, conversion rate optimization, brand positioning)

### Primary Objectives
- **Lead Generation:** Convert 4-8% of organic site visitors into consultation bookings.
- **Credibility & Trust:** Showcase quantifiable client metrics, case studies, and partner logos.
- **Technical Excellence:** Sub-2-second page load times and 95+ Lighthouse score across Performance, Accessibility, Best Practices, and SEO.

---

## 2. Design System Architecture & Tokens

The design aesthetic is **dark, futuristic, precise, and high-contrast**.

### 2.1 Color Palette Tokens
| Token | Hex Value | Role & Usage | Contrast Ratio (vs Charcoal) |
|---|---|---|---|
| **Primary BG** | `#1A1A1A` | Dark Charcoal — page canvas, container backgrounds, dark overlays | Base Canvas |
| **Surface Card** | `#242424` | Elevated card background with 12px border radius & subtle border | High |
| **Accent 1** | `#BAFF7A` | Lime — Primary CTAs, active tab highlights, key metric counters | 6.8:1 (WCAG AAA) |
| **Accent 2** | `#00FFCC` | Cyan — Secondary CTAs, decorative glow accents, icons, quotes | 7.2:1 (WCAG AAA) |
| **Text Primary** | `#FFFFFF` | Headings, primary body copy, button labels | 15.8:1 (WCAG AAA) |
| **Text Muted** | `#A0A0A0` | Subtitles, metadata, form labels, disabled states | 4.8:1 (WCAG AA) |
| **Border Dark** | `#333333` | Subtle structural division lines and card borders | N/A |

### 2.2 Typography Token Config
- **Display & Headings Font:** `Oswald` (Google Font) — All CAPS or strong bold headings, hero titles, CTA banners.
- **Body Font:** `DM Sans` (Google Font) — Clean, legible sans-serif for body paragraphs, descriptions, inputs.
- **Scale:**
  - `Display / Hero`: 64px - 96px (responsive `text-4xl md:text-7xl lg:text-8xl`)
  - `H1 / Section Header`: 36px - 48px (`text-3xl md:text-5xl`)
  - `H2 / Card Header`: 24px - 32px (`text-xl md:text-3xl`)
  - `H3 / Subtitle`: 18px - 20px (`text-lg md:text-xl`)
  - `Body / Inputs`: 16px (`text-base`)
  - `Small / Badges`: 12px - 14px (`text-xs md:text-sm`)

### 2.3 UI Components & Effects Rules
- **Button Radius:** `6px` (`rounded-md`)
- **Card Radius:** `12px` (`rounded-xl`)
- **Glow Effects:**
  - Lime Glow: `box-shadow: 0 0 20px rgba(186, 255, 122, 0.25)`
  - Cyan Glow: `box-shadow: 0 0 20px rgba(0, 255, 204, 0.25)`
- **Hover Micro-Interactions:** `transition-all duration-300 ease-out` with hover translate-y (`-translate-y-1`) and shadow enhancement.

---

## 3. Technology Stack & Architecture

### 3.1 Stack Blueprint
- **Framework:** React 18 / Next.js / Vite React App
- **Styling:** Tailwind CSS v3 with extended color definitions (`#1A1A1A`, `#BAFF7A`, `#00FFCC`)
- **Icons:** Lucide React icons (`strokeWidth={1.5}`)
- **Form State & Schema Validation:** React Hook Form + Zod
- **Animations:** CSS custom keyframes + IntersectionObserver scroll reveal hooks
- **Fonts:** `@fontsource/oswald` + `@fontsource/dm-sans` (or Google Fonts CDN)

### 3.2 Global Components Map
1. `Navbar`: Sticky dark header with logo, nav links (`/`, `/services`, `/contact`), Lime CTA button, and mobile menu drawer.
2. `Footer`: 3-column layout with brand mission, quick links, services list, social icons, and copyright.
3. `CTABanner`: Universal bottom-page conversion section with Lime accent background and instant booking trigger.
4. `StatCounter`: Reusable counter component with scroll-triggered increment animation.

---

## 4. Navigation & Sitemap Index (Streamlined 3-Page Setup)

| Page Name | Path | Markdown Documentation File |
|---|---|---|
| Home | `/` | [home.md](file:///Users/cosmic/velloxa%20/home.md) |
| Services | `/services` | [services.md](file:///Users/cosmic/velloxa%20/services.md) |
| Contact | `/contact` | [contact.md](file:///Users/cosmic/velloxa%20/contact.md) |

---

## 5. Performance & Accessibility Standards

- **Core Web Vitals Compliance:**
  - Largest Contentful Paint (LCP) < 2.5s
  - Cumulative Layout Shift (CLS) < 0.1
  - Interaction to Next Paint (INP) < 200ms
- **Touch Target Rule:** Minimum 44×44px touch target on all clickable mobile elements.
- **Keyboard Navigation:** Explicit visible focus rings (`focus:ring-2 focus:ring-[#BAFF7A] focus:outline-none`).
- **Screen Reader Support:** Semantic HTML5 tags (`<main>`, `<nav>`, `<header>`, `<footer>`, `<section>`) and ARIA expanded attributes.
