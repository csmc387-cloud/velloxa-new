import { DM_Sans, Oswald } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import '../index.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['500', '700'],
});

export const viewport = {
  themeColor: '#0d0d0d',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export const metadata = {
  metadataBase: new URL('https://veloxa.io'),
  title: {
    default: 'Velloxa — AI Integration, Web Engineering & Growth Agency',
    template: '%s | Velloxa',
  },
  description:
    'Velloxa is an elite digital engineering agency specializing in custom AI integration, sub-second Next.js web applications, and generative search optimization for modern SMEs.',
  keywords: [
    'AI Integration Agency',
    'Custom AI Workflows',
    'Next.js Web Engineering',
    'Web Engineering Agency',
    'Generative Engine Optimization',
    'GEO Agency',
    'Answer Engine Optimization',
    'AEO Agency',
    'High Performance Web Development',
    'SME Automation Agency',
    'Velloxa',
    'Velloxa Agency',
    'Veloxa',
  ],
  authors: [{ name: 'Velloxa Engineering Team', url: 'https://veloxa.io' }],
  creator: 'Velloxa Agency',
  publisher: 'Velloxa Agency',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  referrer: 'strict-origin-when-cross-origin',
  alternates: {
    canonical: 'https://veloxa.io/',
  },
  openGraph: {
    title: 'Velloxa — AI Integration, Web Engineering & Growth Agency',
    description:
      'Velloxa builds high-conversion digital platforms, bespoke AI integrations, and organic acquisition funnels for ambitious SMEs.',
    url: 'https://veloxa.io',
    siteName: 'Velloxa Agency',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Velloxa Agency — AI Integration & Web Engineering',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Velloxa — AI Integration, Web Engineering & Growth Agency',
    description:
      'Custom AI workflows, high-performance web engineering, and organic growth architecture engineered for modern businesses.',
    images: ['/og-image.jpg'],
    creator: '@velloxa_agency',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.webmanifest',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': 'https://veloxa.io/#agency',
      name: 'Velloxa Agency',
      alternateName: ['Velloxa', 'Veloxa', 'Velloxa Digital Agency'],
      url: 'https://veloxa.io/',
      logo: 'https://veloxa.io/favicon.svg',
      image: 'https://veloxa.io/og-image.jpg',
      description:
        'Velloxa is an elite digital engineering and growth agency specializing in custom AI workflow integration, sub-second web engineering, and passion marketing for modern SMEs.',
      email: 'velloxa.agency@gmail.com',
      priceRange: '₹₹ - ₹₹₹',
      currenciesAccepted: 'INR, USD, EUR, GBP',
      paymentAccepted: 'Bank Transfer, Stripe, Wire Transfer',
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Global' },
        { '@type': 'Country', name: 'India' },
        { '@type': 'Country', name: 'United States' },
        { '@type': 'Country', name: 'United Kingdom' },
        { '@type': 'Country', name: 'United Arab Emirates' },
      ],
      sameAs: [
        'https://www.instagram.com/velloxa.agency/',
        'https://github.com/csmc387-cloud/velloxa-new',
        'https://twitter.com/velloxa_agency',
        'https://www.linkedin.com/company/velloxa',
      ],
      founder: {
        '@type': 'Person',
        name: 'Velloxa Core Team',
        jobTitle: 'Principal Systems & AI Engineers',
        url: 'https://veloxa.io/',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Sales & Client Consultation',
        email: 'velloxa.agency@gmail.com',
        availableLanguage: ['English', 'Hindi'],
      },
      serviceType: [
        'Artificial Intelligence Solutions & Workflow Integration',
        'Next.js Custom Web Engineering',
        'Passion Marketing & Generative Engine Optimization',
      ],
      knowsAbout: [
        'Custom AI Integration',
        'Large Language Model Agents',
        'Web Engineering',
        'Next.js & React Architecture',
        'Generative Engine Optimization (GEO)',
        'Answer Engine Optimization (AEO)',
        'Search Engine Optimization (SEO)',
        'Conversion Rate Optimization (CRO)',
        'SME Operations Automation',
        'Multi-Agent Workflows',
        'Retrieval-Augmented Generation (RAG)',
        'OmniSearch Strategy',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Velloxa Core Growth Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Custom AI Integration',
              description: 'Automate internal operations, customer intake funnels, and enterprise workflows with bespoke LLM agents and multi-agent systems.',
              url: 'https://veloxa.io/#ai-integration',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'High-Performance Web Engineering',
              description: 'Sub-second mobile-first Next.js web applications engineered for 100% Core Web Vitals compliance and high-velocity conversion.',
              url: 'https://veloxa.io/#web-engineering',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Passion Marketing & GEO Growth',
              description: 'Organic acquisition engine combining elite SEO, AEO, Generative Engine Optimization (GEO), and high-retention brand positioning.',
              url: 'https://veloxa.io/#passion-marketing',
            },
          },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://veloxa.io/#website',
      url: 'https://veloxa.io/',
      name: 'Velloxa Agency — AI Integration & Web Engineering',
      description: 'Velloxa builds high-conversion digital platforms, bespoke AI integrations, and organic acquisition funnels.',
      publisher: {
        '@id': 'https://veloxa.io/#agency',
      },
      inLanguage: 'en-US',
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://veloxa.io/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does Velloxa help scale my business?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "We don't just build websites—we engineer complete digital growth systems for your business. By combining high-converting design, custom AI automation, and targeted growth strategies, we help you eliminate operational bottlenecks, increase conversion rates, and unlock sustainable revenue growth.",
          },
        },
        {
          '@type': 'Question',
          name: 'How do your AI workflows reduce recurring tasks?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our AI workflows are custom-built to connect directly into your existing tools—like email, CRM, WhatsApp, and Slack. They take over repetitive, time-consuming tasks like qualifying inbound leads, scheduling follow-ups, and syncing client data automatically.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is Passion Marketing, and how does it attract clients?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Passion Marketing is our strategy to build genuine brand authority and audience connection instead of relying solely on cold ads. We identify what makes your brand uniquely compelling, craft authentic stories, and build high-intent content funnels that resonate emotionally with your ideal clients.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does Velloxa build my online presence to bring in business?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We begin by analyzing your business, target audience, and market landscape to build a website tailored specifically to convert visitors into clients. We then optimize your entire presence across SEO, AEO, and GEO to give your brand maximum visibility across Google and modern AI search engines.',
          },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://veloxa.io/#breadcrumbs',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://veloxa.io/#hero-section',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Metrics & ROI',
          item: 'https://veloxa.io/#metrics',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Solutions & Engineering',
          item: 'https://veloxa.io/#solutions',
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'The Velloxa Advantage',
          item: 'https://veloxa.io/#comparison',
        },
        {
          '@type': 'ListItem',
          position: 5,
          name: 'Frequently Asked Questions',
          item: 'https://veloxa.io/#faq',
        },
        {
          '@type': 'ListItem',
          position: 6,
          name: 'Consultation & Intake',
          item: 'https://veloxa.io/#contact',
        },
      ],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${oswald.variable} dark`} suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
      </head>
      <body className="bg-charcoal text-white font-body antialiased selection:bg-lime selection:text-charcoal min-h-screen flex flex-col" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <Analytics />
        <Script
          id="bfcache-handler"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.addEventListener('pageshow',function(e){if(e.persisted){document.documentElement.style.overflow='';document.body.style.overflow=''}},{passive:true});window.addEventListener('pagehide',function(){document.documentElement.style.overflow='';document.body.style.overflow=''},{passive:true});`,
          }}
        />
        <Script
          id="microsoft-clarity"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `(function(){var l=false;function c(){if(l)return;l=true;['scroll','touchstart','pointerdown','keydown','wheel','click'].forEach(function(e){window.removeEventListener(e,c)});(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","ychkfp2hmu")}if(typeof window!=='undefined'){['scroll','touchstart','pointerdown','keydown','wheel','click'].forEach(function(e){window.addEventListener(e,c,{once:true,passive:true})})}})();`,
          }}
        />
      </body>
    </html>
  );
}
