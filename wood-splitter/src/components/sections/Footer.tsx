import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('Footer');
  const nav = useTranslations('Nav');

  const links = [
    { href: '#product', label: nav('product') },
    { href: '#advantages', label: nav('advantages') },
    { href: '#about', label: nav('about') },
    { href: '#contact', label: nav('contact') },
  ];

  return (
    <footer className="bg-dark border-t border-dark-tertiary py-12 md:py-16">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <img src="/images/logo.jpg" alt="Wood Splitter" className="h-8 w-auto mb-4" />
            <p className="text-steel-light text-sm">
              {t('tagline')}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-body font-bold text-surface-white text-sm uppercase tracking-wider mb-4">
              {t('navHeading')}
            </h3>
            <ul className="space-y-2">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-steel-light text-sm hover:text-surface-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-body font-bold text-surface-white text-sm uppercase tracking-wider mb-4">
              {t('contactHeading')}
            </h3>
            <p className="text-steel-light text-sm mb-2">{t('email')}</p>
            <div className="flex gap-4 mt-4">
              <a
                href="https://www.facebook.com/p/Wood-splitter-100057073915000/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-steel-light hover:text-surface-white transition-colors text-sm"
              >
                {t('facebook')}
              </a>
              <a
                href="https://www.instagram.com/wood.splitter/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-steel-light hover:text-surface-white transition-colors text-sm"
              >
                {t('instagram')}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-dark-tertiary mt-8 pt-8 text-center">
          <p className="text-steel-mid text-sm">{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
