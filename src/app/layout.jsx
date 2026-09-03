import { DM_Sans, Oswald } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';
import '../index.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
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
    default: 'Velloxa agency',
    template: '%s | Velloxa agency',
  },
  description:
    'Velloxa is a high-growth digital agency specializing in custom AI integration, modern web engineering, and passion marketing. We build high-conversion, tech-forward platforms that scale.',
  keywords: [
    'AI Integration',
    'Web Engineering',
    'Web Development',
    'Passion Marketing',
    'Digital Agency',
    'Tech-Forward Web Platforms',
    'High-Conversion Web Apps',
    'Velloxa',
    'Velloxa agency',
    'SME Automation',
    'Next.js Agency',
  ],
  authors: [{ name: 'Velloxa Team', url: 'https://veloxa.io' }],
  creator: 'Velloxa agency',
  publisher: 'Velloxa agency',
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
    title: 'Velloxa agency',
    description:
      'Velloxa builds high-conversion, tech-forward digital platforms. Specializing in custom AI integrations, web engineering, and passion marketing.',
    url: 'https://veloxa.io',
    siteName: 'Velloxa agency',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Velloxa agency — AI Integration & Web Engineering',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Velloxa agency',
    description:
      'Velloxa builds high-conversion, tech-forward digital platforms. Specializing in custom AI integrations, web engineering, and passion marketing.',
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
      name: 'Velloxa agency',
      url: 'https://veloxa.io/',
      logo: 'https://veloxa.io/favicon.svg',
      image: 'https://veloxa.io/og-image.jpg',
      description:
        'Velloxa is a high-growth digital agency specializing in custom AI integration, web engineering, and passion marketing for ambitious businesses.',
      serviceType: [
        'Artificial Intelligence Solutions',
        'Custom Web Development',
        'Marketing & Growth Engineering',
      ],
      areaServed: 'Worldwide',
      knowsAbout: [
        'AI Integration',
        'Web Engineering',
        'Web Development',
        'Passion Marketing',
        'Digital Growth',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://veloxa.io/#website',
      url: 'https://veloxa.io/',
      name: 'VELOXA',
      publisher: {
        '@id': 'https://veloxa.io/#agency',
      },
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
          name: 'Metrics',
          item: 'https://veloxa.io/#metrics',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Solutions',
          item: 'https://veloxa.io/#solutions',
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Consultation & Contact',
          item: 'https://veloxa.io/#contact',
        },
      ],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${oswald.variable} dark scroll-smooth`}>
      <head>
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        <link
          rel="preload"
          as="image"
          href="/opening-card-logo.svg"
          type="image/svg+xml"
          fetchpriority="high"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* BFCache restoration resilience handler */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('pageshow', function(event) {
                if (event.persisted) {
                  document.body.style.overflow = '';
                }
              });
              window.addEventListener('pagehide', function() {
                document.body.style.overflow = '';
              });
            `,
          }}
        />
        <Script
          id="microsoft-clarity"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var loaded = false;
                function loadClarity(){
                  if (loaded) return;
                  loaded = true;
                  ['scroll','touchstart','pointerdown','keydown','wheel','click'].forEach(function(e){
                    window.removeEventListener(e, loadClarity);
                  });
                  (function(c,l,a,r,i,t,y){
                      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                  })(window, document, "clarity", "script", "ychkfp2hmu");
                }
                if (typeof window !== 'undefined') {
                  ['scroll','touchstart','pointerdown','keydown','wheel','click'].forEach(function(e){
                    window.addEventListener(e, loadClarity, { once: true, passive: true });
                  });
                }
              })();
            `,
          }}
        />
      </head>
      <body className="bg-charcoal text-white font-body antialiased selection:bg-lime selection:text-charcoal min-h-screen flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
