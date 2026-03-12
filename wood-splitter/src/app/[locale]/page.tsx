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
