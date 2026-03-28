'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* Premium SVG icons — larger */
const IconCalendar = () => (
  <svg width="40" height="40" viewBox="0 0 28 28" fill="none">
    <rect x="3" y="5" width="22" height="20" rx="3" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3 11h22" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M9 3v4M19 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <rect x="8" y="15" width="4" height="4" rx="1" fill="currentColor" opacity="0.5"/>
    <rect x="16" y="15" width="4" height="4" rx="1" fill="currentColor" opacity="0.5"/>
  </svg>
);
const IconMonitor = () => (
  <svg width="40" height="40" viewBox="0 0 28 28" fill="none">
    <rect x="2" y="4" width="24" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M9 24h10M14 20v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7 12l3 3 5-6 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconChart = () => (
  <svg width="40" height="40" viewBox="0 0 28 28" fill="none">
    <rect x="2" y="2" width="24" height="24" rx="3" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 18v-4M13 18V9M18 18v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="22" cy="6" r="3.5" fill="currentColor" opacity="0.85"/>
    <path d="M21 6l1 1 1.5-2" stroke="#08090E" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const steps = [
  { num: '01', Icon: IconCalendar, value: '2 месяца',        label: 'системной работы', highlight: false },
  { num: '02', Icon: IconMonitor,  value: '2 раза в неделю', label: 'онлайн, без воды', highlight: false },
  { num: '03', Icon: IconChart,    value: '1 Проп-счёт',     label: 'сразу в работу',   highlight: true  },
];

const paragraphs = [
  'С первого занятия ты уже в рынке. Без долгой теории — только то, что сразу применяется.',
  'Разбираем твои сделки, ошибки и мышление. Смотрим рынок вместе и учимся читать его в реальном времени.',
  'В итоге: ты не просто «понимаешь трейдинг» — у тебя есть своя рабочая система и контроль риска.',
];

/* subtle grid pattern for background */
const GridBg = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="cpGrid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,212,170,1)" strokeWidth="0.5"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#cpGrid)"/>
  </svg>
);

export default function CourseProcess() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="relative py-20 px-4 overflow-hidden">

      {/* Grid background */}
      <GridBg />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(0,212,170,0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto relative">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-white/40 mb-3">
            Формат обучения
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Как проходит курс
          </h2>
        </motion.div>

        {/* 3 step cards */}
        <div className="grid grid-cols-3 gap-4 lg:gap-6 mb-12">
          {steps.map(({ num, Icon, value, label, highlight }, i) => (
            <motion.div
              key={i}
              className="relative rounded-xl backdrop-blur-sm p-5 lg:p-8 text-center overflow-hidden"
              style={{
                background: highlight
                  ? 'rgba(0,212,170,0.07)'
                  : 'rgba(255,255,255,0.025)',
                border: highlight
                  ? '1px solid rgba(0,212,170,0.40)'
                  : '1px solid rgba(255,255,255,0.07)',
                boxShadow: highlight
                  ? '0 0 32px rgba(0,212,170,0.14), inset 0 1px 0 rgba(0,212,170,0.15)'
                  : undefined,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              whileHover={{
                borderColor: 'rgba(0,212,170,0.35)',
                y: -3,
                boxShadow: '0 8px 32px rgba(0,212,170,0.12)',
              }}
            >
              {/* Step number — large background */}
              <span
                className="absolute -bottom-3 -right-1 text-[72px] lg:text-[100px] font-black leading-none select-none pointer-events-none"
                style={{
                  color: highlight ? 'rgba(0,212,170,0.12)' : 'rgba(255,255,255,0.06)',
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '-0.04em',
                }}
              >
                {num}
              </span>

              {/* Highlight glow pulse */}
              {highlight && (
                <div className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,212,170,0.10) 0%, transparent 70%)' }}
                />
              )}

              <div className="flex justify-center mb-4" style={{ color: '#00D4AA' }}>
                <Icon />
              </div>
              <div className="text-base lg:text-xl font-extrabold leading-tight mb-2"
                style={{ color: '#00D4AA' }}>
                {value}
              </div>
              <div className="text-xs lg:text-sm text-white/40 leading-snug">{label}</div>
            </motion.div>
          ))}
        </div>

        {/* Description */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-10">
          {paragraphs.map((text, i) => (
            <motion.p
              key={i}
              className="text-white/55 text-sm lg:text-base leading-relaxed lg:border-l lg:border-white/[0.06] lg:pl-5"
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.35 + i * 0.08, duration: 0.45 }}
            >
              {text}
            </motion.p>
          ))}
        </div>

        {/* "For whom" — two columns */}
        <motion.div
          className="grid grid-cols-2 gap-4 lg:gap-6"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {/* Column 1 */}
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-4">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-white/30 mb-2">Новичкам</p>
            <p className="text-sm font-semibold text-white leading-snug">
              Подходит <span className="text-accent-green">даже если ты с нуля</span>
            </p>
            <p className="text-[12px] text-white/40 mt-1 leading-relaxed">
              Начнём с основ — к концу у тебя будет рабочая стратегия
            </p>
          </div>

          {/* Column 2 */}
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-4">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-white/30 mb-2">Опытным</p>
            <p className="text-sm font-semibold text-white leading-snug">
              Если уже торгуешь, но <span className="text-accent-green">нет стабильности</span>
            </p>
            <p className="text-[12px] text-white/40 mt-1 leading-relaxed">
              Найдём слабое место и выстроим систему
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
