'use client';

import { useState } from 'react';

export function ContactForm({
  labels,
}: {
  labels: {
    name: string;
    email: string;
    phone: string;
    message: string;
    submit: string;
    success: string;
    error: string;
  };
}) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // For now, just show success. Real submission TBD.
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-red/20 text-brand-red mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-surface-white text-xl font-heading mb-2">Message Sent!</p>
        <p className="text-steel-light text-base font-body">{labels.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-body text-steel-light ml-1">Name</label>
          <input
            name="name"
            type="text"
            required
            placeholder={labels.name}
            aria-label={labels.name}
            className="w-full h-14 px-5 rounded-[8px] border border-white/10 bg-white/5 text-surface-white font-body text-base placeholder:text-steel focus:outline-none focus:border-brand-red focus:bg-white/10 transition-all duration-300 hover:border-white/20"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-body text-steel-light ml-1">Email</label>
          <input
            name="email"
            type="email"
            required
            placeholder={labels.email}
            aria-label={labels.email}
            className="w-full h-14 px-5 rounded-[8px] border border-white/10 bg-white/5 text-surface-white font-body text-base placeholder:text-steel focus:outline-none focus:border-brand-red focus:bg-white/10 transition-all duration-300 hover:border-white/20"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-body text-steel-light ml-1">Phone (Optional)</label>
        <input
          name="phone"
          type="tel"
          placeholder={labels.phone}
          aria-label={labels.phone}
          className="w-full h-14 px-5 rounded-[8px] border border-white/10 bg-white/5 text-surface-white font-body text-base placeholder:text-steel focus:outline-none focus:border-brand-red focus:bg-white/10 transition-all duration-300 hover:border-white/20"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-body text-steel-light ml-1">Message</label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder={labels.message}
          aria-label={labels.message}
          className="w-full px-5 py-4 rounded-[8px] border border-white/10 bg-white/5 text-surface-white font-body text-base placeholder:text-steel focus:outline-none focus:border-brand-red focus:bg-white/10 transition-all duration-300 resize-none hover:border-white/20"
        />
      </div>
      <button
        type="submit"
        className="w-full group relative h-14 mt-4 rounded-[8px] bg-brand-red text-white font-heading text-lg uppercase tracking-wider overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(226,35,26,0.4)]"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        <span className="relative z-10 flex items-center justify-center gap-2">
          {labels.submit}
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </span>
      </button>
      {status === 'error' && (
        <p className="text-brand-red text-sm text-center mt-4 bg-brand-red/10 py-2 rounded-[4px]">{labels.error}</p>
      )}
    </form>
  );
}
