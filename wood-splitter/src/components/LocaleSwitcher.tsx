'use client';
import { useTransition } from 'react';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

const LOCALES = [
  { code: 'sl', label: 'SL' },
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
  { code: 'it', label: 'IT' },
] as const;

export function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (locale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale, scroll: false });
    });
  };

  return (
    <div className="flex items-center gap-1" aria-label="Language switcher">
      {LOCALES.map(({ code, label }, i) => (
        <span key={code} className="flex items-center">
          <button
            onClick={() => switchLocale(code)}
            disabled={isPending || code === currentLocale}
            aria-current={code === currentLocale ? 'true' : undefined}
            className={`px-1.5 py-1 text-sm font-body font-semibold transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center ${
              code === currentLocale
                ? 'text-brand-red'
                : 'text-steel-light hover:text-surface-white'
            }`}
          >
            {label}
          </button>
          {i < LOCALES.length - 1 && (
            <span className="text-dark-tertiary text-sm" aria-hidden="true">|</span>
          )}
        </span>
      ))}
    </div>
  );
}
