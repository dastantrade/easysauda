'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence, useInView } from 'framer-motion';

export default function FAQ() {
  const t = useTranslations('faq');
  const [open, setOpen] = useState(null);
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  const items = [
    { q: t('q1'), a: t('a1') },
    { q: t('q2'), a: t('a2') },
    { q: t('q3'), a: t('a3') },
    { q: t('q4'), a: t('a4') },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Dot pattern background */}
      <div className="absolute inset-0 dot-pattern opacity-35 pointer-events-none" />

      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 100% at 50% 100%, rgba(0,212,170,0.05) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={titleRef}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('title')}
          </h2>
          {/* Gradient divider */}
          <div className="mx-auto w-32 h-px bg-gradient-to-r from-transparent via-accent-green/30 to-transparent" />
        </motion.div>

        <div className="space-y-2">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="rounded-xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-sm overflow-hidden"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ borderColor: 'rgba(0,212,170,0.14)' }}
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 transition-colors duration-200 hover:bg-white/[0.02]"
                onClick={() => setOpen(open === index ? null : index)}
              >
                <span className="text-white/75 font-medium text-sm sm:text-base">{item.q}</span>
                <motion.div
                  className="flex-shrink-0 w-7 h-7 rounded-full border border-white/10 flex items-center justify-center"
                  animate={{ rotate: open === index ? 180 : 0, borderColor: open === index ? 'rgba(0,212,170,0.30)' : 'rgba(255,255,255,0.10)' }}
                  transition={{ duration: 0.25 }}
                >
                  <svg className="w-3.5 h-3.5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence>
                {open === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-0">
                      {/* Gradient divider */}
                      <div className="w-full h-px bg-gradient-to-r from-accent-green/20 via-accent-green/10 to-transparent mb-4" />
                      <p className="text-white/45 text-sm leading-relaxed">{item.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
