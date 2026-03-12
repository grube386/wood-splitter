import { useTranslations } from 'next-intl';
import { HeroImage } from './HeroImage';

export function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="relative min-h-screen bg-dark flex items-center pt-16">
      <div className="max-w-[1280px] mx-auto w-full px-5 md:px-10 lg:px-20 flex flex-col lg:flex-row items-center gap-12 py-12 md:py-24">
        {/* Text side */}
        <div className="lg:w-[55%] text-center lg:text-left">
          <p className="text-brand-red font-body font-semibold text-sm uppercase tracking-[0.10em] mb-4">
            {t('tagline')}
          </p>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-[72px] text-surface-white leading-none mb-6">
            {t('headline')}
          </h1>
          <p className="text-steel-light text-lg md:text-xl max-w-lg mb-8 mx-auto lg:mx-0">
            {t('body')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="#contact"
              className="inline-flex items-center justify-center h-12 px-8 rounded-[4px] bg-brand-red text-surface-white font-heading text-base uppercase tracking-wider hover:bg-brand-red-hover transition-colors min-h-[44px]"
            >
              {t('primaryCta')}
            </a>
            <a
              href="#product-video"
              className="inline-flex items-center justify-center h-12 px-8 rounded-[4px] border-2 border-surface-white text-surface-white font-heading text-base uppercase tracking-wider hover:bg-surface-white hover:text-dark transition-colors min-h-[44px]"
            >
              {t('secondaryCta')}
            </a>
          </div>
        </div>

        {/* Image side */}
        <div className="lg:w-[45%] flex justify-center">
          <HeroImage />
        </div>
      </div>
    </section>
  );
}
