'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';

export default function CoursesPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4" style={{ background: '#08090E' }}>

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 40%, rgba(0,212,170,0.06) 0%, transparent 70%)' }} className="absolute inset-0" />
      </div>

      <div className="relative max-w-2xl mx-auto text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-green/25 bg-accent-green/[0.07] text-accent-green text-sm font-mono tracking-widest uppercase mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
          Скоро
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight"
        >
          Видеокурс для<br />
          <span className="text-gradient">самостоятельной подготовки</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/50 text-lg leading-relaxed mb-10 max-w-lg mx-auto"
        >
          Полная программа обучения в формате видеоуроков. Учись в своём темпе — без привязки к расписанию, с доступом навсегда.
        </motion.p>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
        >
          {[
            { icon: '🎬', label: 'Видеоуроки', sub: 'Структурированная программа' },
            { icon: '⏱', label: 'Свой темп', sub: 'Доступ навсегда' },
            { icon: '📊', label: 'Практика', sub: 'Реальные разборы сделок' },
          ].map((f, i) => (
            <div
              key={i}
              className="rounded-xl p-4 text-center"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="text-2xl mb-2">{f.icon}</div>
              <div className="text-white text-sm font-semibold mb-1">{f.label}</div>
              <div className="text-white/35 text-xs">{f.sub}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <a
            href="https://t.me/dastan_talgatkhanuly"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-accent-green text-[#08090E] font-bold px-6 py-3 rounded-xl text-sm"
            style={{ boxShadow: '0 0 24px rgba(0,212,170,0.30)' }}
          >
            Узнать о старте
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 text-white/50 font-medium px-6 py-3 rounded-xl text-sm border border-white/[0.08] hover:border-white/20 transition-colors"
          >
            ← На главную
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
