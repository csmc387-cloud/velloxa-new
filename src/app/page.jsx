import dynamic from 'next/dynamic';
import ScrollExpandMedia from '@/components/ScrollExpandMedia';
import HomePage from '@/components/sections/HomePage';
import Footer from '@/components/Footer';

const BackgroundShader = dynamic(() => import('@/components/BackgroundShader'), {
  ssr: false,
});

export default function Page() {
  return (
    <div className="bg-charcoal text-white min-h-screen flex flex-col font-body selection:bg-lime selection:text-charcoal relative">
      <BackgroundShader />
      <ScrollExpandMedia>
        <div className="relative z-10 flex flex-col min-h-screen">
          <main className="flex-grow">
            <HomePage />
          </main>
          <Footer />
        </div>
      </ScrollExpandMedia>
    </div>
  );
}
