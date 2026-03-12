'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';

export function HeroImage() {
  const reducedMotion = useReducedMotion();

  return (
    <img
      src="/images/wood-splitter-hero.jpg"
      alt="BOWS 20 excavator-mounted log splitter"
      data-hero-image
      className={`max-h-[320px] lg:max-h-[520px] w-auto object-contain ${
        reducedMotion ? '' : 'animate-float'
      }`}
    />
  );
}
