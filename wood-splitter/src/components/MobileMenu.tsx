'use client';

import { useState, useEffect } from 'react';
import { X, Menu } from 'lucide-react';
import { LocaleSwitcher } from './LocaleSwitcher';

const NAV_LINKS = [
  { href: '#product', labelKey: 'product' },
  { href: '#advantages', labelKey: 'advantages' },
  { href: '#about', labelKey: 'about' },
  { href: '#contact', labelKey: 'contact' },
];

export function MobileMenu({ labels }: { labels: Record<string, string> }) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        className="lg:hidden p-2 text-surface-white min-w-[44px] min-h-[44px] flex items-center justify-center"
      >
        <Menu size={24} />
      </button>

      {isOpen && (
        <div
          data-mobile-menu
          className="fixed inset-0 z-50 bg-dark flex flex-col items-center justify-center gap-8"
        >
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="absolute top-5 right-5 p-2 text-surface-white min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <X size={24} />
          </button>

          {NAV_LINKS.map(({ href, labelKey }) => (
            <a
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className="font-heading text-3xl text-surface-white hover:text-brand-red transition-colors uppercase"
            >
              {labels[labelKey]}
            </a>
          ))}

          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="mt-4 inline-flex items-center justify-center h-12 px-8 rounded-[4px] bg-brand-red text-surface-white font-heading text-base uppercase tracking-wider hover:bg-brand-red-hover transition-colors"
          >
            {labels.cta || 'Get a Quote'}
          </a>

          <div className="mt-4">
            <LocaleSwitcher />
          </div>
        </div>
      )}
    </>
  );
}
