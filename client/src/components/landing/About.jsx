'use client';

import { useRef, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import Card from '@/components/ui/Card';

// Number odometer hook — counts up when entering viewport
function useCountUp(target, suffix = '', duration = 1600) {
  const [display, setDisplay] = useState('0' + suffix);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const numeric = parseInt(target.replace(/\D/g, ''), 10);
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(eased * numeric);
      setDisplay(String(current) + suffix);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, target, suffix, duration]);

  return [display, ref];
}

function OdometerStat({ value, rawNum, suf, label, prefix }) {
  const [count, ref] = useCountUp(rawNum ?? '0', suf, 1600);

  return (
    <div ref={ref} className="text-center p-4">
      <div className="text-2xl sm:text-3xl font-bold text-accent-green tabular-nums font-mono">
        {rawNum === null ? value : (prefix ? `${prefix}${count}` : count)}
      </div>
      <div className="text-xs text-white/45 mt-1">{label}</div>
    </div>
  );
}

export default function About() {
  const t = useTranslations('about');
  const contentRef = useRef(null);
  const contentInView = useInView(contentRef, { once: true, margin: '-60px' });
  const photoRef = useRef(null);
  const photoInView = useInView(photoRef, { once: true, margin: '-60px' });

  const stats = [
    { value: '2+',   rawNum: '2',   suf: '+', label: 'лет опыта' },
    { value: 'MNQ',  rawNum: null,  suf: '',  label: 'мой инструмент' },
    { value: '$200', rawNum: '200', suf: '',  label: 'тейк в день', prefix: '$' },
  ];

  const bullets = [
    'В рекламе — заявки и продажи для бизнеса',
    'В рынке — контроль риска и стабильный результат',
    'Показываю реальные сделки, не симуляции',
  ];

  return (
    <section className="relative py-20 overflow-hidden" id="about">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Photo placeholder */}
          <motion.div
            ref={photoRef}
            initial={{ opacity: 0, x: -40 }}
            animate={photoInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="relative">
              <div className="w-full aspect-square max-w-md mx-auto bg-dark-card rounded-2xl border border-dark-border overflow-hidden flex items-center justify-center relative">
                {/* Teal corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at top right, rgba(0,212,170,0.12), transparent 70%)' }} />
                <div className="text-center p-8">
                  <motion.div
                    className="w-32 h-32 bg-accent-green/8 rounded-full mx-auto mb-4 flex items-center justify-center border border-accent-green/15"
                    whileHover={{ scale: 1.04, borderColor: 'rgba(0,212,170,0.30)' }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-16 h-16 text-accent-green/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </motion.div>
                  <p className="text-white/35 text-sm">Ваше фото</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent-green/8 rounded-xl -z-10 border border-accent-green/10" />
              <div className="absolute -top-3 -left-3 w-16 h-16 bg-[#00B8FF]/6 rounded-xl -z-10 border border-[#00B8FF]/10" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, x: 40 }}
            animate={contentInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {t('title')}
            </h2>
            <p className="text-white/45 mb-8">
              {t('subtitle')}
            </p>

            {/* Odometer stats */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="rounded-xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-sm overflow-hidden"
                  initial={{ opacity: 0, y: 16 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  whileHover={{
                    borderColor: 'rgba(0,212,170,0.20)',
                    boxShadow: '0 0 20px rgba(0,212,170,0.08)',
                    y: -2,
                  }}
                >
                  <OdometerStat {...stat} />
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
