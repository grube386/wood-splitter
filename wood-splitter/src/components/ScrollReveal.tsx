'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

export function ScrollReveal({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={className} data-scroll-reveal>
      {children}
    </div>
  );
}
