import { setRequestLocale } from 'next-intl/server';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/sections/Hero';
import { ProductVideo } from '@/components/sections/ProductVideo';
import { About } from '@/components/sections/About';
import { Advantages } from '@/components/sections/Advantages';
import { ProductShowcase } from '@/components/sections/ProductShowcase';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-brand-red focus:text-surface-white focus:px-4 focus:py-2 focus:rounded-[4px]"
      >
        Skip to content
      </a>
      <Navigation />
      <main id="main-content">
        <Hero />
        <ProductVideo />
        <About />
        <Advantages />
        <ProductShowcase />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
