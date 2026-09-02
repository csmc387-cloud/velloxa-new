export default function manifest() {
  return {
    name: 'VELOXA — AI Integration & Web Engineering',
    short_name: 'VELOXA',
    description: 'Veloxa is a high-growth digital agency specializing in custom AI integration, web engineering, and passion marketing.',
    start_url: '/',
    display: 'standalone',
    background_color: '#1A1A1A',
    theme_color: '#0d0d0d',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/og-image.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
