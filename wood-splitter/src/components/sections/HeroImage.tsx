'use client';

import { useEffect, useState } from 'react';

export function HeroImage() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

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
