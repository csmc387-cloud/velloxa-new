# VELOXA — Home Page Specification

> **Path:** `/`  
> **Documentation File:** `home.md`  
> **Objective:** Dark, high-impact landing page designed to capture SME attention and drive 4-8% conversion to consultation bookings.

---

## 1. Page Architecture & Section Breakdown

```
+--------------------------------------------------------+
| 1. Sticky Navigation Bar (Navbar)                     |
+--------------------------------------------------------+
| 2. Animated Hero Section with Gradient Glow & Dual CTA |
+--------------------------------------------------------+
| 3. Animated Gradient Stat Counters Bar                 |
+--------------------------------------------------------+
| 4. 3-Column Services Overview Grid                     |
+--------------------------------------------------------+
| 5. Client Testimonials Interactive Carousel           |
+--------------------------------------------------------+
| 6. High-Conversion CTA Banner                         |
+--------------------------------------------------------+
| 7. Master Footer                                       |
+--------------------------------------------------------+
```

---

## 2. Detailed Section Specifications

### 2.1 Hero Section
- **Visual Style:** Dark charcoal background (`#1A1A1A`) with ambient cyan (`#00FFCC`) and lime (`#BAFF7A`) background mesh gradient animations.
- **Badge:** (Removed)
- **Main Headline (Oswald font):**  
  `WE BUILD . YOU GROW .`
- **Minimal Design:** Simplified hero layout with description and action buttons removed for maximum visual impact.
- **Trust Badges:** Sub-2s Load Speeds, 95+ Lighthouse Score, WCAG AAA Accessible.

### 2.2 Animated Gradient Stat Counters Bar
Interactive numbers that animate upward when scrolled into view using `IntersectionObserver`:
- **Stat 1:** `4-8%` — Average Visitor-to-Booking Conversion Rate
- **Stat 2:** `< 2.0s` — Sub-2-Second Load Speed Guarantee
- **Stat 3:** `150+` — SME AI Workflows Deployed
- **Stat 4:** `95+` — Lighthouse Score Target

### 2.3 3-Column Services Grid
Cards featuring 12px border radius, subtle dark surface (`#242424`), hover glow shadows, and Lucide React icons.

1. **Card 1: SME AI Integration**
   - Icon: `Bot` or `Cpu` (Cyan stroke)
   - Title: Custom AI Workflows & Agents
   - Excerpt: Automate customer support, lead qualification, and operations with custom LLMs & API pipelines.
   - Link: "Explore AI Solutions ->" (`/services#ai`)

2. **Card 2: Web Engineering**
   - Icon: `Code2` or `Globe` (Lime stroke)
   - Title: High-Conversion Web Platforms
   - Excerpt: Lightning-fast, mobile-optimized websites built on Next.js/React designed to convert traffic into leads.
   - Link: "Explore Web Engineering ->" (`/services#web`)

3. **Card 3: Passion Marketing**
   - Icon: `TrendingUp` or `Zap` (Cyan stroke)
   - Title: Growth & Brand Positioning
   - Excerpt: Data-driven marketing strategies, SEO optimization, and funnel engineering to scale SME revenues.
   - Link: "Explore Marketing ->" (`/services#marketing`)

### 2.4 Testimonial Carousel
- **Header:** "WHAT OUR CLIENTS SAY"
- **Interactive Controls:** Left/Right navigation arrows + pagination indicator dots.
- **Testimonial Card Content:**
  - Quote in Cyan text with quote icon: *"Veloxa transformed our customer intake process with a custom AI agent. Our consultation bookings doubled within 30 days."*
  - Client Name: Sarah Jenkins
  - Role & Company: Founder, Apex Legal Solutions
  - Rating: 5/5 Stars (`#BAFF7A` colored stars)

### 2.5 High-Conversion CTA Banner
- **Background:** High-contrast Lime-tinted box with glowing cyan accent border.
- **Headline:** `READY TO TRANSFORM YOUR SME WITH AI & MODERN WEB TECH?`
- **Subtext:** `Book your 30-minute strategic consultation. No commitment required.`
- **Action Button:** "Schedule Consultation Now" (Solid Charcoal button text `#1A1A1A` on `#BAFF7A` Lime fill).

---

## 3. Frontend Component Mapping

| Component File | Role | State & Dependencies |
|---|---|---|
| `components/Hero.jsx` | Hero section layout & animations | React state for badge animation |
| `components/StatCounters.jsx` | Animated counter bar | IntersectionObserver hook, counter state |
| `components/ServicesGrid.jsx` | 3-column service cards | Static card props + hover glow effects |
| `components/TestimonialCarousel.jsx` | Interactive slider | Active index state, swipe/click handlers |
| `components/CTABanner.jsx` | Bottom page banner | Direct router navigation trigger |
