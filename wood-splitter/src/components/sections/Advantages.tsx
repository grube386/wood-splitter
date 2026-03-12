import { useTranslations } from 'next-intl';
import { AdvantageCards } from '@/components/AdvantageCards';
import { ScrollReveal } from '@/components/ScrollReveal';

export function Advantages() {
  const t = useTranslations('Advantages');

  return (
    <section id="advantages" className="bg-dark-secondary py-12 md:py-24">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20">
        <ScrollReveal className="text-center mb-12">
          <p className="text-brand-red font-body font-semibold text-sm uppercase tracking-[0.10em] mb-4">
            {t('eyebrow')}
          </p>
          <h2 className="font-heading text-3xl md:text-[48px] text-surface-white">
            {t('title')}
          </h2>
        </ScrollReveal>

        <AdvantageCards
          cards={[
            { title: t('safety'), description: t('safetyDesc'), iconName: 'shield' },
            { title: t('productivity'), description: t('productivityDesc'), iconName: 'gauge' },
            { title: t('easySetup'), description: t('easySetupDesc'), iconName: 'wrench' },
            { title: t('anyTerrain'), description: t('anyTerrainDesc'), iconName: 'mountain' },
          ]}
        />
      </div>
    </section>
  );
}
