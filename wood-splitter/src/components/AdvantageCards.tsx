'use client';

import { Shield, Gauge, Wrench, Mountain } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const ICONS: Record<string, LucideIcon> = {
  shield: Shield,
  gauge: Gauge,
  wrench: Wrench,
  mountain: Mountain,
};

export function AdvantageCards({
  cards,
}: {
  cards: { title: string; description: string; iconName: string }[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cards.map(({ title, description, iconName }) => {
        const Icon = ICONS[iconName] || Shield;
        return (
          <ScrollReveal key={title}>
            <div
              data-advantage-card
              className="bg-dark border border-dark-tertiary rounded-[4px] p-8 transition-all duration-200 hover:border-brand-red hover:-translate-y-0.5"
            >
              <Icon size={24} className="text-brand-red mb-4" strokeWidth={2} />
              <h3 className="font-body text-xl font-bold text-surface-white mb-2">
                {title}
              </h3>
              <p className="text-steel-light text-base leading-relaxed">
                {description}
              </p>
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
