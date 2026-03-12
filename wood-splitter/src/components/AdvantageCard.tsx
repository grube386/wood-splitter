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
      className="group relative bg-[#0F1115] border border-dark-tertiary rounded-[8px] p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(226,35,26,0.2)] hover:border-brand-red overflow-hidden"
    >
      {/* Interactive hover glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none" />
      
      <div className="relative z-10 text-center md:text-left">
        <Icon size={36} className="text-brand-red mb-6 mx-auto md:mx-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" strokeWidth={1.5} />
        <h3 className="font-body text-xl font-bold text-surface-white mb-3 group-hover:text-brand-red transition-colors duration-300">
          {title}
        </h3>
        <p className="text-steel-light text-base leading-relaxed group-hover:text-surface-white transition-colors duration-300">
          {description}
        </p>
      </div>
    </div>
  );
}
