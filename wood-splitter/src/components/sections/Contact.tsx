import { useTranslations } from 'next-intl';
import { ContactForm } from '@/components/ContactForm';

export function Contact() {
  const t = useTranslations('Contact');

  return (
    <section id="contact" className="relative bg-[#0F1115] py-20 md:py-32 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-brand-red/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1000px] mx-auto px-5 md:px-10 relative z-10 text-center">
        <h2 className="font-heading text-4xl md:text-5xl lg:text-[64px] text-surface-white mb-6 tracking-tight">
          {t('title')}
        </h2>
        <p className="text-steel-light text-lg md:text-xl mb-12 max-w-2xl mx-auto font-body">
          {t('subtitle')}
        </p>
        
        <div className="relative group max-w-3xl mx-auto text-left">
          {/* Subtle animated border effect */}
          <div className="absolute -inset-[1px] bg-gradient-to-r from-brand-red/0 via-brand-red/50 to-brand-red/0 rounded-[16px] opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-300" />
          
          <div className="relative bg-dark-secondary/80 backdrop-blur-xl border border-white/5 rounded-[16px] p-6 md:p-12 shadow-2xl">
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
        </div>
      </div>
    </section>
  );
}
