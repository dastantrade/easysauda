'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import Button from '@/components/ui/Button';
import CandlestickChart from '@/components/ui/CandlestickChart';

// Premium stat icons — consistent 1.5px stroke
function IconFundingMin() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
    </svg>
  );
}
function IconFundingMax() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
  );
}
function IconExperience() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
function IconCourses() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
  );
}

const WORDS = {
  ru: ['торговать', 'читать рынок', 'управлять рисками', 'зарабатывать'],
  kz: ['сауда жасауды', 'нарықты оқуды', 'тәуекелді басқаруды', 'табыс табуды'],
};
const PREFIX = { ru: 'Научитесь', kz: 'Биржада' };
const SUFFIX = { ru: 'на бирже', kz: 'үйреніңіз' };

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();

  const words = WORDS[locale] ?? WORDS.ru;
  const prefix = PREFIX[locale] ?? PREFIX.ru;
  const suffix = SUFFIX[locale] ?? SUFFIX.ru;

  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIdx(i => (i + 1) % words.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <section className="relative overflow-hidden py-20 sm:py-36 min-h-screen flex items-center">

      {/* ── Animated Candlestick Chart (background) ── */}
      <div className="absolute inset-0 opacity-[0.18] pointer-events-none overflow-hidden">
        <CandlestickChart />
      </div>

      {/* ── Diagonal decoration lines ── */}
      <div className="absolute top-0 left-0 w-64 h-64 pointer-events-none opacity-[0.12]">
        <svg viewBox="0 0 256 256" fill="none" className="w-full h-full">
          <line x1="0" y1="60"  x2="60"  y2="0"  stroke="white" strokeWidth="0.8"/>
          <line x1="0" y1="110" x2="110" y2="0"  stroke="white" strokeWidth="0.6"/>
          <line x1="0" y1="160" x2="160" y2="0"  stroke="white" strokeWidth="0.5"/>
          <line x1="0" y1="210" x2="210" y2="0"  stroke="white" strokeWidth="0.4"/>
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none opacity-[0.09]">
        <svg viewBox="0 0 192 192" fill="none" className="w-full h-full">
          <line x1="192" y1="50"  x2="142" y2="0" stroke="white" strokeWidth="0.8"/>
          <line x1="192" y1="100" x2="92"  y2="0" stroke="white" strokeWidth="0.6"/>
          <line x1="192" y1="150" x2="42"  y2="0" stroke="white" strokeWidth="0.5"/>
        </svg>
      </div>

      {/* ── Soft teal glow behind heading ── */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(0,212,170,0.06) 0%, transparent 70%)' }}
      />

      {/* ── Ambient orbs ── */}
      <motion.div
        className="absolute top-20 left-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,212,170,0.055) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-10 right-1/3 w-60 h-60 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,184,255,0.04) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Planet glow (horizon) ── */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-[50%]"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,212,170,0.11) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] rounded-[50%]"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(0,212,170,0.17) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[200px] h-[100px] rounded-[50%]"
          style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(0,212,170,0.26) 0%, transparent 70%)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-4xl mx-auto">

          {/* ── Level 1: Brand (serif, thin) ── */}
          <motion.span
            className="block text-[11px] sm:text-xs font-light uppercase mb-4 text-white/28"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif", letterSpacing: '0.38em' }}
            initial={{ opacity: 0, letterSpacing: '0.55em' }}
            animate={{ opacity: 1, letterSpacing: '0.38em' }}
            transition={{ duration: 1.4 }}
          >
            EasySauda
          </motion.span>

          {/* ── Level 2: Kinetic Heading ── */}
          <div className="mb-8">
            {/* Static prefix */}
            <motion.div
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white/80 tracking-tight leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {prefix}
            </motion.div>

            {/* Animated cycling word */}
            <div className="h-14 sm:h-18 lg:h-24 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={wordIdx}
                  className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-none text-gradient"
                  initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -30, filter: 'blur(12px)' }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {words[wordIdx]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Static suffix */}
            <motion.div
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white/80 tracking-tight leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {suffix}
            </motion.div>
          </div>

          {/* Pill badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-green/25 bg-accent-green/8 text-accent-green text-sm font-medium mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
            EASYSAUDA: Твой алгоритм в хаосе рынка
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-base sm:text-lg text-white/45 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            {t('subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <Link href="/courses">
              <Button size="lg" className="animate-pulse-green">{t('cta')}</Button>
            </Link>
            <Link href="/courses">
              <Button variant="glass" size="lg">{t('ctaSecondary')}</Button>
            </Link>
          </motion.div>

          {/* ── Premium Stats ── */}
          <motion.div
            className="grid grid-cols-3 gap-4 sm:gap-8 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            {[
              { value: '$50 000', label: 'Стартовый фандинг', Icon: IconFundingMin },
              { value: '$150 000', label: 'Максимальный счёт', Icon: IconFundingMax },
              { value: '7+',   label: 'Лет торгового опыта', Icon: IconExperience },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-white/[0.06] bg-white/[0.025] backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.08 }}
                whileHover={{
                  borderColor: 'rgba(0,212,170,0.22)',
                  boxShadow: '0 0 24px rgba(0,212,170,0.10)',
                  y: -2,
                }}
              >
                <div className="text-accent-green/65"><stat.Icon /></div>
                <div className="text-2xl sm:text-3xl font-bold text-accent-green tabular-nums">{stat.value}</div>
                <div className="text-xs text-white/38 text-center leading-tight">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
