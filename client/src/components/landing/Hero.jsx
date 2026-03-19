'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Button from '@/components/ui/Button';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent-green/5 via-transparent to-transparent" />
      <motion.div
        className="absolute top-20 left-1/4 w-96 h-96 bg-accent-green/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-10 right-1/4 w-72 h-72 bg-accent-blue/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main heading */}
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="text-gradient">{t('title')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            {t('subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
          >
            <Link href="/courses">
              <Button size="lg" className="animate-pulse-green">
                {t('cta')}
              </Button>
            </Link>
            <Link href="/courses">
              <Button variant="secondary" size="lg">
                {t('ctaSecondary')}
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-8 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
          >
            {[
              { value: '500+', label: t('stats.students') },
              { value: '7+', label: t('stats.experience') },
              { value: '3', label: t('stats.courses') },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
              >
                <div className="text-2xl sm:text-3xl font-bold text-accent-green">{stat.value}</div>
                <div className="text-sm text-text-secondary mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Animated Chart */}
        <motion.div
          className="mt-16 max-w-3xl mx-auto opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.5, delay: 1 }}
        >
          <svg viewBox="0 0 800 200" className="w-full">
            <motion.polyline
              points="0,150 50,140 100,145 150,120 200,130 250,100 300,110 350,80 400,90 450,60 500,70 550,40 600,50 650,30 700,45 750,20 800,25"
              fill="none"
              stroke="#00C853"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.8, ease: 'easeInOut' }}
            />
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00C853" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#00C853" stopOpacity="0" />
            </linearGradient>
            <motion.polygon
              points="0,150 50,140 100,145 150,120 200,130 250,100 300,110 350,80 400,90 450,60 500,70 550,40 600,50 650,30 700,45 750,20 800,25 800,200 0,200"
              fill="url(#chartGradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
