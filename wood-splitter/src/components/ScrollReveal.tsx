'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

export function ScrollReveal({
  children,
  className = '',
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <Tag ref={ref as React.Ref<never>} className={className} data-scroll-reveal>
      {children}
    </Tag>
  );
}
