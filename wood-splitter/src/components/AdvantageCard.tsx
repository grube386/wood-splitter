'use client';

import type { LucideIcon } from 'lucide-react';

export function AdvantageCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
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
  );
}
