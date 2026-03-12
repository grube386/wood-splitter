import { setRequestLocale } from 'next-intl/server';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-dark text-surface-white font-body p-8">
      <h1 className="font-heading text-4xl text-brand-red mb-4">BOWS 20</h1>
      <p className="text-steel-light mb-6">Locale: {locale}</p>
      <LocaleSwitcher />
    </main>
  );
}
