# VELOXA — Contact Page Specification

> **Path:** `/contact`  
> **Documentation File:** `contact.md`  
> **Objective:** Primary conversion engine featuring structured intake form with React Hook Form + Zod, direct Calendly embed for consultation booking, and instant success confirmation.

---

## 1. Page Layout Architecture

```
+--------------------------------------------------------+
| 1. Navigation Bar                                      |
+--------------------------------------------------------+
| 2. Contact Header: "LET'S BUILD SOMETHING EXTRAORDINARY"|
+--------------------------------------------------------+
| 3. Two-Column Conversion Section:                      |
|    +-------------------------+-----------------------+ |
|    | Column A: Contact Form  | Column B: Calendly    | |
|    | (Name, Email, Service,  | Live Embed Widget     | |
|    | Budget, Message)        | & Direct Details      | |
|    +-------------------------+-----------------------+ |
+--------------------------------------------------------+
| 4. Frequently Asked Questions (FAQ) Accordion          |
+--------------------------------------------------------+
| 5. Footer                                              |
+--------------------------------------------------------+
```

---

## 2. Contact Form Specification (React Hook Form + Zod)

The form uses client-side validation with real-time feedback and accessibility attributes.

### Form Fields & Schema Validation:
1. **Full Name (`name`)**
   - Type: Text input
   - Requirement: Minimum 2 characters
   - Error Message: "Please enter your full name."
2. **Business Email (`email`)**
   - Type: Email input
   - Requirement: Valid email address pattern
   - Error Message: "Please provide a valid business email address."
3. **Selected Service (`service`)**
   - Type: Custom dropdown select
   - Options:
     - `AI Integration & LLM Workflows`
     - `High-Performance Web Engineering`
     - `Passion & Growth Marketing`
     - `Full Agency Retainer (AI + Web + Marketing)`
   - Error Message: "Please select a primary service area."
4. **Project Budget Range (`budget`)**
   - Type: Button selector or radio group
   - Options: `$5k - $10k` | `$10k - $25k` | `$25k - $50k` | `$50k+`
5. **Project Details & Message (`message`)**
   - Type: Textarea (4 rows)
   - Requirement: Minimum 10 characters
   - Error Message: "Please briefly describe your business goals or challenges."

### Form Submission States:
- **Default State:** Active input form with submit button: `"Send Consultation Request"` (Lime `#BAFF7A` background).
- **Submitting State:** Spinner icon with label: `"Encrypting & Transmitting..."`
- **Success State:** Form slides out to reveal animated checkmark with message:  
  *“Request Received! An AI Specialist from Veloxa will review your submission and reach out within 24 hours. Alternatively, pick a time directly on the right.”*

---

## 3. Calendly Live Consultation Embed & Direct Contact Info

### Column B Details:
- **Direct Email:** `hello@veloxa.ai` (Clickable mailto link)
- **Office Location:** San Francisco, CA & London, UK (Global Remote SME Services)
- **Response Time Guarantee:** `< 24 Hours`
- **Embedded Scheduler Widget:** Interactive calendar selector allowing visitors to book a 30-minute strategic consultation instantly without leaving the page.

---

## 4. FAQ Accordion Section

Interactive toggle accordion answering common SME client questions:
1. *How fast can Veloxa deploy a custom AI agent for my business?*  
   **Answer:** Most initial AI workflows and chat agents are deployed within 7 to 14 business days.
2. *What is guaranteed in the sub-2-second website build?*  
   **Answer:** We optimize all assets, server-render dynamic routes, and ensure Core Web Vitals pass Lighthouse audits before launch.
3. *Do you provide ongoing support after deployment?*  
   **Answer:** Yes, we offer monthly maintenance, model retraining, and continuous CRO tuning packages.

---

## 5. Component Mapping

| Component | Path | Description |
|---|---|---|
| `ContactForm.jsx` | `components/contact/ContactForm.jsx` | React Hook Form + Zod schema validation form |
| `CalendlyEmbed.jsx` | `components/contact/CalendlyEmbed.jsx` | Responsive booking iframe widget |
| `FAQAccordion.jsx` | `components/contact/FAQAccordion.jsx` | Expandable FAQ list with smooth transitions |
