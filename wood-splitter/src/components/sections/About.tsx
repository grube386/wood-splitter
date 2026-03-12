import { useTranslations } from 'next-intl';
import { ScrollReveal } from '@/components/ScrollReveal';

export function About() {
  const t = useTranslations('About');

  return (
    <section id="about" className="bg-surface-white py-12 md:py-24">
      <ScrollReveal className="max-w-[720px] mx-auto px-5 md:px-10 text-center">
        <p className="text-steel-mid font-body font-semibold text-sm uppercase tracking-[0.10em] mb-4">
          {t('title')}
        </p>
        <h2 className="font-heading text-3xl md:text-[48px] text-dark leading-tight mb-6">
          {t('headline')}
        </h2>
        <p className="text-steel-dark text-lg leading-relaxed mb-4">
          {t('story')}
        </p>
        <p className="text-steel-dark text-lg leading-relaxed mb-4">
          {t('anniversary')}
        </p>
        <p className="text-steel-dark text-lg leading-relaxed">
          {t('mission')}
        </p>
      </ScrollReveal>

      {/* Banner image */}
      <div className="mt-12 md:mt-16">
        <img
          src="/images/wood-splitter-banner.jpg"
          alt="BOWS 20 wood splitter with company branding"
          className="w-full object-cover"
        />
      </div>
    </section>
  );
}
