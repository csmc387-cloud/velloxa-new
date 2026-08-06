# VELOXA — Services Page Specification

> **Path:** `/services`  
> **Documentation File:** `services.md`  
> **Objective:** Detailed breakdown of Veloxa's core service offerings (AI Integration, Web Engineering, Passion Marketing), step-by-step agency process, and technology partner logos.

---

## 1. Page Architecture

```
+--------------------------------------------------------+
| 1. Header & Navigation                                 |
+--------------------------------------------------------+
| 2. Services Page Hero Title & Subtext                  |
+--------------------------------------------------------+
| 3. Interactive Tabbed Service Showcase                 |
|    - Tab A: AI Integration for SMEs                    |
|    - Tab B: High-Performance Web Engineering           |
|    - Tab C: Passion & Growth Marketing                 |
+--------------------------------------------------------+
| 4. 4-Step Agency Execution Process                     |
+--------------------------------------------------------+
| 5. Tool & Technology Ecosystem Logo Wall               |
+--------------------------------------------------------+
| 6. CTABanner                                           |
+--------------------------------------------------------+
| 7. Footer                                              |
+--------------------------------------------------------+
```

---

## 2. Interactive Tabbed Services Breakdown

Users can toggle between three tabs with instant content switching, smooth fade-in transitions, and highlighted active tab states (`#BAFF7A` Lime indicator).

### Tab 1: AI Integration for SMEs
- **Headline:** Custom AI Agents, LLM Automation & Smart Workflows
- **Key Capabilities:**
  - **Customer Intake Agents:** 24/7 AI chat & voice agents that qualify leads and auto-book appointments into CRM.
  - **Document & Data Processing:** Custom RAG (Retrieval-Augmented Generation) pipelines for internal SME documents.
  - **Workflow Automation:** Zapier/Make/n8n custom API integrations reducing manual data entry by 80%+.
- **Deliverables:** Fully trained AI model, API key setup, staff onboarding, custom web interface.
- **Key Tech:** OpenAI API, Anthropic, Python FastAPI, Pinecone, LangChain.

### Tab 2: High-Performance Web Engineering
- **Headline:** Modern, Lightning-Fast Web Applications & Brand Portals
- **Key Capabilities:**
  - **Next.js & React Frontend:** SSR/SSG architecture guaranteed to load in under 2.0 seconds.
  - **Conversion-Optimized UX:** Interactive calculators, booking widgets, dark mode aesthetics, and micro-animations.
  - **Mobile-First Responsiveness:** Flawless rendering from 375px mobile screens up to 4K displays.
- **Deliverables:** Complete source code, Vercel/Cloudflare deployment, CMS integration, sub-second LCP optimization.
- **Key Tech:** React 18, Next.js, Tailwind CSS, Zod, Lucide Icons.

### Tab 3: Passion & Growth Marketing
- **Headline:** Targeted SME Growth Campaigns & Brand Elevation
- **Key Capabilities:**
  - **Conversion Rate Optimization (CRO):** A/B testing landing pages to push visitor-to-lead rates to 4-8%.
  - **Technical & Content SEO:** Structured data (JSON-LD), sitemap generation, programmatic SEO content strategy.
  - **Brand & Messaging Strategy:** Defining core value propositions that resonate with high-value clients.
- **Deliverables:** Campaign strategy roadmap, monthly performance dashboards, CRO audit report.
- **Key Tech:** Google Analytics 4, PostHog, Lighthouse CI, Schema.org.

---

## 3. 4-Step Agency Process

Visual timeline/process steps showing how Veloxa delivers projects:

1. **Step 01: Discovery & AI Audit**
   - We audit your current workflow, site performance, and conversion bottlenecks to create a tailored blueprint.
2. **Step 02: Architecture & Prototype**
   - Interactive UI mockups and AI system architecture wireframes are finalized within 7 business days.
3. **Step 03: Agile Build & Integration**
   - High-velocity development sprint with weekly demo builds, performance audits, and security checks.
4. **Step 04: Launch, Optimize & Scale**
   - Deployment to production, full staff training, live monitoring, and ongoing conversion rate tuning.

---

## 4. Tool & Technology Ecosystem Logo Wall

Grid of partner tools & technology logos:
- `React` | `Next.js` | `Tailwind CSS` | `OpenAI` | `Anthropic` | `Vercel` | `Spring Boot` | `PostgreSQL` | `Docker` | `Google Cloud`

---

## 5. Component Mapping

| Component | Path | Description |
|---|---|---|
| `ServiceTabs.jsx` | `components/services/ServiceTabs.jsx` | Tab selector & active content renderer |
| `ProcessTimeline.jsx` | `components/services/ProcessTimeline.jsx` | 4-step interactive timeline with step numbers |
| `ToolLogoGrid.jsx` | `components/services/ToolLogoGrid.jsx` | Responsive logo grid with hover tooltips |
