'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function FAQ() {
  const t = useTranslations('faq');
  const [open, setOpen] = useState(null);

  const items = [
    { q: t('q1'), a: t('a1') },
    { q: t('q2'), a: t('a2') },
    { q: t('q3'), a: t('a3') },
    { q: t('q4'), a: t('a4') },
  ];

  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">{t('title')}</h2>
        </div>

        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-dark-hover transition-colors"
                onClick={() => setOpen(open === index ? null : index)}
              >
                <span className="text-text-primary font-medium">{item.q}</span>
                <svg
                  className={`w-5 h-5 text-text-secondary flex-shrink-0 transition-transform ${open === index ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open === index && (
                <div className="px-6 pb-4 text-text-secondary text-sm leading-relaxed">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
