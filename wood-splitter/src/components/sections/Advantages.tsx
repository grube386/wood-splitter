import { useTranslations } from 'next-intl';
import { Shield, Gauge, Wrench, Mountain } from 'lucide-react';
import { AdvantageCard } from '@/components/AdvantageCard';
import { ScrollReveal } from '@/components/ScrollReveal';

const ADVANTAGES = [
  { icon: Shield, titleKey: 'safety', descKey: 'safetyDesc' },
  { icon: Gauge, titleKey: 'productivity', descKey: 'productivityDesc' },
  { icon: Wrench, titleKey: 'easySetup', descKey: 'easySetupDesc' },
  { icon: Mountain, titleKey: 'anyTerrain', descKey: 'anyTerrainDesc' },
] as const;

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ADVANTAGES.map(({ icon, titleKey, descKey }) => (
            <ScrollReveal key={titleKey}>
              <AdvantageCard
                icon={icon}
                title={t(titleKey)}
                description={t(descKey)}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
