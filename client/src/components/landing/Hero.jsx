'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import Button from '@/components/ui/Button';
import CandlestickChart from '@/components/ui/CandlestickChart';

// Premium stat icons — consistent 1.5px stroke
function IconStudents() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
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
      <div className="absolute inset-0 opacity-[0.11] pointer-events-none overflow-hidden">
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
            Начни торговать сегодня
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
              { value: '500+', label: t('stats.students'), Icon: IconStudents },
              { value: '7+',   label: t('stats.experience'), Icon: IconExperience },
              { value: '3',    label: t('stats.courses'), Icon: IconCourses },
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
