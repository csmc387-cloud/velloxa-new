/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  transpilePackages: [
    'three',
    '@react-three/fiber',
    '@react-three/drei',
    'shadergradient',
  ],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
