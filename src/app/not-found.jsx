import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found | VELOXA',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-charcoal flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-8xl sm:text-9xl font-display font-black text-lime mb-2">404</h1>
      <h2 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-400 max-w-md text-sm mb-8">
        The platform or resource you requested could not be located. Return to the homepage to explore our solutions.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-lime text-charcoal font-mono text-sm font-bold uppercase tracking-wider hover:bg-[#a6ff5e] transition-all"
      >
        Return Home
      </Link>
    </div>
  );
}
