import { useTranslations } from 'next-intl';
import { MobileMenu } from './MobileMenu';
import { LocaleSwitcher } from './LocaleSwitcher';

export function Navigation() {
  const t = useTranslations('Nav');

  const links = [
    { href: '#product', label: t('product') },
    { href: '#advantages', label: t('advantages') },
    { href: '#about', label: t('about') },
    { href: '#contact', label: t('contact') },
  ];

  const mobileLabels = {
    product: t('product'),
    advantages: t('advantages'),
    about: t('about'),
    contact: t('contact'),
    cta: t('cta'),
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-dark/90 backdrop-blur-md border-b border-dark-tertiary">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between h-16 px-5 md:px-10 lg:px-20">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 shrink-0">
          <img
            src="/images/logo.jpg"
            alt="Wood Splitter"
            className="h-8 w-auto"
          />
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="font-body text-sm font-semibold text-steel-light hover:text-surface-white transition-colors uppercase tracking-wide"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Desktop right side */}
        <div className="hidden lg:flex items-center gap-4">
          <LocaleSwitcher />
          <a
            href="#contact"
            className="inline-flex items-center justify-center h-10 px-6 rounded-[4px] bg-brand-red text-surface-white font-heading text-sm uppercase tracking-wider hover:bg-brand-red-hover transition-colors"
          >
            {t('cta')}
          </a>
        </div>

        {/* Mobile hamburger */}
        <MobileMenu labels={mobileLabels} />
      </div>
    </nav>
  );
}
