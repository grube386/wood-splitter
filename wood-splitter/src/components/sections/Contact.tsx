import { useTranslations } from 'next-intl';
import { ContactForm } from '@/components/ContactForm';

export function Contact() {
  const t = useTranslations('Contact');

  return (
    <section id="contact" className="bg-brand-red py-12 md:py-24">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20 text-center">
        <h2 className="font-heading text-3xl md:text-[48px] text-surface-white mb-4">
          {t('title')}
        </h2>
        <p className="text-surface-white/90 text-lg mb-8 max-w-md mx-auto">
          {t('subtitle')}
        </p>
        <ContactForm
          labels={{
            name: t('namePlaceholder'),
            email: t('emailPlaceholder'),
            phone: t('phonePlaceholder'),
            message: t('messagePlaceholder'),
            submit: t('submitButton'),
            success: t('successMessage'),
            error: t('errorMessage'),
          }}
        />
      </div>
    </section>
  );
}
