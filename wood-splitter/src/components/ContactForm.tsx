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
      <p className="text-surface-white text-lg font-body text-center py-8">
        {labels.success}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <input
        name="name"
        type="text"
        required
        placeholder={labels.name}
        aria-label={labels.name}
        className="w-full h-12 px-4 rounded-[4px] border border-transparent bg-surface-white text-dark font-body text-base focus:outline-none focus:border-dark focus:ring-2 focus:ring-dark/20"
      />
      <input
        name="email"
        type="email"
        required
        placeholder={labels.email}
        aria-label={labels.email}
        className="w-full h-12 px-4 rounded-[4px] border border-transparent bg-surface-white text-dark font-body text-base focus:outline-none focus:border-dark focus:ring-2 focus:ring-dark/20"
      />
      <input
        name="phone"
        type="tel"
        placeholder={labels.phone}
        aria-label={labels.phone}
        className="w-full h-12 px-4 rounded-[4px] border border-transparent bg-surface-white text-dark font-body text-base focus:outline-none focus:border-dark focus:ring-2 focus:ring-dark/20"
      />
      <textarea
        name="message"
        required
        rows={4}
        placeholder={labels.message}
        aria-label={labels.message}
        className="w-full px-4 py-3 rounded-[4px] border border-transparent bg-surface-white text-dark font-body text-base focus:outline-none focus:border-dark focus:ring-2 focus:ring-dark/20 resize-none"
      />
      <button
        type="submit"
        className="w-full h-12 rounded-[4px] bg-surface-white text-brand-red font-heading text-base uppercase tracking-wider hover:bg-surface-light transition-colors min-h-[44px]"
      >
        {labels.submit}
      </button>
      {status === 'error' && (
        <p className="text-surface-white text-sm text-center">{labels.error}</p>
      )}
    </form>
  );
}
