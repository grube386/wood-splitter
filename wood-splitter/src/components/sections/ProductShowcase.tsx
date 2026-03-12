import { useTranslations } from 'next-intl';
import { ScrollReveal } from '@/components/ScrollReveal';

const FEATURES = [
  { titleKey: 'dualSide', descKey: 'dualSideDesc' },
  { titleKey: 'wedge', descKey: 'wedgeDesc' },
  { titleKey: 'safety', descKey: 'safetyDesc' },
  { titleKey: 'power', descKey: 'powerDesc' },
] as const;

export function ProductShowcase() {
  const t = useTranslations('Product');

  return (
    <section id="product" className="bg-dark py-12 md:py-24">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20">
        <ScrollReveal className="flex flex-col lg:flex-row items-start gap-12">
          {/* Features */}
          <div className="lg:w-1/2">
            <p className="text-brand-red font-body font-semibold text-sm uppercase tracking-[0.10em] mb-4">
              {t('eyebrow')}
            </p>
            <h2 className="font-heading text-3xl md:text-[48px] text-surface-white mb-4">
              {t('title')}
            </h2>
            <p className="text-steel-light text-lg mb-8">
              {t('subtitle')}
            </p>

            <ul className="space-y-4 mb-8">
              {FEATURES.map(({ titleKey, descKey }) => (
                <li key={titleKey} data-feature className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-brand-red shrink-0" aria-hidden="true" />
                  <div>
                    <span className="font-body font-bold text-surface-white">
                      {t(titleKey)}
                    </span>
                    <span className="text-steel-light"> — {t(descKey)}</span>
                  </div>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="inline-flex items-center justify-center h-12 px-8 rounded-[4px] border-2 border-surface-white text-surface-white font-heading text-base uppercase tracking-wider hover:bg-surface-white hover:text-dark transition-colors min-h-[44px]"
            >
              {t('specsCta')}
            </a>
          </div>

          {/* Product image */}
          <div className="lg:w-1/2">
            <img
              src="/images/wood-splitter-detail.jpg"
              alt="BOWS 20 close-up showing hydraulic mount and build quality"
              className="w-full rounded-[4px]"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
