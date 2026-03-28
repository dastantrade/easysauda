'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform, useSpring } from 'framer-motion';

/* ── Line-art icons per module ── */
const IconMarket = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="3" y="11" width="2.5" height="6" rx="0.5" stroke="currentColor" strokeWidth="1.3"/>
    <rect x="8.75" y="6" width="2.5" height="11" rx="0.5" stroke="currentColor" strokeWidth="1.3"/>
    <rect x="14.5" y="3" width="2.5" height="14" rx="0.5" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M4.25 8l4.5-4 5.75 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconLevels = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M2 6h16M2 14h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="6"  cy="6"  r="1.5" fill="currentColor"/>
    <circle cx="14" cy="14" r="1.5" fill="currentColor"/>
    <path d="M6 6 L14 14" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.5"/>
  </svg>
);
const IconTrend = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M2 16 L8 9 L12 12 L18 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 4h4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 16h16" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeLinecap="round"/>
  </svg>
);
const IconCandle = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <line x1="5" y1="2" x2="5" y2="5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <rect x="3" y="5" width="4" height="7" rx="0.5" stroke="currentColor" strokeWidth="1.3"/>
    <line x1="5" y1="12" x2="5" y2="16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <line x1="13" y1="4" x2="13" y2="7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <rect x="11" y="7" width="4" height="6" rx="0.5" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.3"/>
    <line x1="13" y1="13" x2="13" y2="17" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);
const IconStrategy = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.3"/>
    <circle cx="10" cy="10" r="4"   stroke="currentColor" strokeWidth="1.3"/>
    <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
    <path d="M10 2.5v2M10 15.5v2M2.5 10h2M15.5 10h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);
const IconScalp = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M11 2 L7 10h5l-3 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 10h2M15 10h2M4.5 5l1.5 1.5M14 13.5l1.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
  </svg>
);
const IconAccum = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="7" width="16" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M6 7V5M10 7V4M14 7V5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M6 14v2M14 14v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M5 10.5h10" stroke="currentColor" strokeWidth="1" strokeDasharray="2 1.5" strokeLinecap="round" opacity="0.5"/>
  </svg>
);
const IconRisk = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2 L17 5.5v5c0 4-3 6.5-7 7.5-4-1-7-3.5-7-7.5v-5z" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconPractice = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M4 17c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M13 8l1.5 1.5-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const modules = [
  { num: 1, Icon: IconMarket,   title: 'Основа рынка',        result: 'Понимаешь логику движения цены',       points: ['Как устроен рынок и за счёт чего движется цена', 'Участники: толпа и крупный капитал', 'Тренд, коррекция, боковик'] },
  { num: 2, Icon: IconLevels,   title: 'Уровни',              result: 'Находишь ключевые зоны',               points: ['Поддержка и сопротивление', 'Как строить сильные уровни', 'Ложные пробои', 'Накопление и распределение'] },
  { num: 3, Icon: IconTrend,    title: 'Тренды и структура',  result: 'Понимаешь направление рынка',          points: ['Определение тренда', 'Линии тренда', 'Слом структуры', 'Переход в боковик'] },
  { num: 4, Icon: IconCandle,   title: 'Свечной анализ',      result: 'Точный вход, а не угадывание',         points: ['Чтение свечей (баланс покупателя/продавца)', 'Пин-бар, поглощение, inside bar', 'Фильтрация ложных сигналов', 'Подтверждение от уровней'] },
  { num: 5, Icon: IconStrategy, title: 'Стратегия торговли',  result: 'Есть чёткая стратегия',                points: ['Готовая система входа (алгоритм действий)', 'Сценарии: отбой от уровня, пробой, ретест', 'Комбинация: уровень + тренд + свечной сигнал', 'Когда входить, а когда пропускать'] },
  { num: 6, Icon: IconScalp,    title: 'Скальпинг',           result: 'Умеешь забирать короткие движения',    points: ['Что такое скальпинг и как на нём зарабатывают', 'Работа на младших таймфреймах', 'Быстрые входы и фиксация прибыли', 'Как "забирать движение частями"'] },
  { num: 7, Icon: IconAccum,    title: 'Накопление',          result: 'Понимаешь, когда будет импульс',       points: ['Как формируется боковик', 'Где идёт набор позиции', 'Выход из диапазона', 'Работа внутри флэта'] },
  { num: 8, Icon: IconRisk,     title: 'Риск-менеджмент',     result: 'Сохраняешь депозит',                   points: ['Постановка стопов', 'Работа с 1–2 контрактами', 'RR (риск/прибыль)', 'Контроль убытков'] },
  { num: 9, Icon: IconPractice, title: 'Практика',            result: 'Переход к самостоятельной торговле',   points: ['Разбор рынка в реальном времени', 'Индивидуальный разбор сделок', 'Работа над ошибками', 'Формирование своей системы'], wide: true },
];

function ModuleCard({ mod, index, inView }) {
  const [open, setOpen] = useState(false);
  const Icon = mod.Icon;

  return (
    <motion.div
      className="relative cursor-pointer overflow-hidden"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.04 * index, duration: 0.4 }}
      onClick={() => setOpen(o => !o)}
    >
      {/* Row */}
      <motion.div
        className="flex items-center gap-5 px-5 py-4 rounded-xl transition-colors duration-200"
        style={{
          background: open ? 'rgba(0,212,170,0.05)' : 'rgba(255,255,255,0.02)',
          borderLeft: open ? '2px solid rgba(0,212,170,0.7)' : '2px solid rgba(255,255,255,0.06)',
        }}
        whileHover={{
          background: 'rgba(255,255,255,0.035)',
          borderLeftColor: 'rgba(0,212,170,0.4)',
        }}
      >
        {/* Number */}
        <span className="text-[13px] font-mono font-bold w-6 flex-shrink-0"
          style={{ color: open ? 'rgba(0,212,170,0.9)' : 'rgba(255,255,255,0.2)' }}>
          {String(mod.num).padStart(2, '0')}
        </span>

        {/* Icon */}
        <div className="flex-shrink-0" style={{ color: open ? '#00D4AA' : 'rgba(255,255,255,0.35)' }}>
          <Icon />
        </div>

        {/* Title & result */}
        <div className="flex-1 min-w-0 flex items-center justify-between gap-4">
          <span className="text-[15px] font-semibold text-white">{mod.title}</span>
          {!open && (
            <span className="hidden sm:block text-[12px] text-white/30 truncate max-w-[220px]">{mod.result}</span>
          )}
        </div>

        {/* Chevron */}
        <motion.svg
          className="flex-shrink-0"
          style={{ color: open ? '#00D4AA' : 'rgba(255,255,255,0.25)' }}
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22 }}
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
      </motion.div>

      {/* Expanded body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pl-[76px] pr-5 pb-5 pt-2">
              <ul className="space-y-2 mb-4">
                {mod.points.map((p, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.22 }}
                    className="flex items-start gap-3 text-[13px] text-white/45 leading-relaxed"
                  >
                    <span className="flex-shrink-0 mt-[7px] w-1 h-1 rounded-full bg-accent-green/50" />
                    {p}
                  </motion.li>
                ))}
              </ul>
              <div className="inline-flex items-center gap-1.5 bg-accent-green/[0.08] border border-accent-green/20 rounded-lg px-3 py-1.5">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" className="text-accent-green">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-[11px] font-semibold text-accent-green">Результат: {mod.result}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function CourseProgram() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  /* scroll-linked timeline fill */
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rawFill = useTransform(scrollYProgress, [0.05, 0.75], [0, 1]);
  const fill = useSpring(rawFill, { stiffness: 80, damping: 20 });
  const lineWidth = useTransform(fill, v => `${v * 100}%`);

  return (
    <section ref={ref} className="relative py-20 px-4">

      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ background: 'radial-gradient(ellipse 70% 40% at 20% 30%, rgba(0,212,170,0.04) 0%, transparent 60%)' }} className="absolute inset-0"/>
        <div style={{ background: 'radial-gradient(ellipse 50% 35% at 80% 70%, rgba(0,100,255,0.03) 0%, transparent 60%)' }} className="absolute inset-0"/>
      </div>

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-white/40 mb-3">9 модулей</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Программа курса</h2>

          {/* Dynamic scroll-linked timeline */}
          <div className="flex items-center gap-3">
            <div className="text-xs text-white/35 bg-white/[0.04] border border-white/[0.07] rounded-md px-2.5 py-1 whitespace-nowrap">
              Точка А: не понимаю рынок
            </div>
            <div className="flex-1 relative h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full rounded-full"
                style={{
                  width: lineWidth,
                  background: 'linear-gradient(to right, rgba(0,212,170,0.4), rgba(0,212,170,1))',
                  boxShadow: '0 0 8px rgba(0,212,170,0.6)',
                }}
              />
            </div>
            <div className="text-xs text-accent-green bg-accent-green/[0.08] border border-accent-green/25 rounded-md px-2.5 py-1 font-semibold whitespace-nowrap">
              Точка Б: торгую по системе
            </div>
          </div>
        </motion.div>

        {/* Two-column layout: left CTA card + right accordion */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-start">

          {/* LEFT — sticky dark card */}
          <motion.div
            className="lg:sticky lg:top-32 w-full lg:w-[340px] flex-shrink-0 rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, rgba(0,212,170,0.10) 0%, rgba(10,12,18,0.95) 50%, rgba(0,40,160,0.08) 100%)',
              border: '1px solid rgba(0,212,170,0.20)',
              boxShadow: '0 0 40px rgba(0,212,170,0.06), inset 0 1px 0 rgba(0,212,170,0.12)',
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="p-5 lg:p-7 flex flex-col gap-4 lg:gap-6">
              {/* Label */}
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent-green/70">
                Итог курса
              </span>

              {/* Main text */}
              <div>
                <p className="text-xl font-bold text-white leading-snug mb-3">
                  Ты не просто изучаешь трейдинг —
                </p>
                <p className="text-sm text-white/55 leading-relaxed">
                  ты получаешь{' '}
                  <span className="text-accent-green font-semibold">конкретную модель</span>{' '}
                  и{' '}
                  <span className="text-accent-green font-semibold">чёткий алгоритм действий</span>{' '}
                  на рынке.
                </p>
              </div>

              {/* Mini checklist */}
              <ul className="space-y-2.5">
                {['Своя торговая система', 'Контроль риска на каждой сделке', 'Проп-счёт сразу в работу'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-white/60">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 text-accent-green">
                      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.a
                href="#courses"
                className="inline-flex items-center justify-center gap-2 bg-accent-green text-[#08090E] text-sm font-bold px-5 py-3 rounded-xl w-full"
                whileHover={{ scale: 1.03, boxShadow: '0 0 24px rgba(0,212,170,0.45)' }}
                whileTap={{ scale: 0.97 }}
              >
                Записаться на курс
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* RIGHT — module accordion */}
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-1 gap-2.5">
              {modules.map((mod, i) => (
                <ModuleCard key={mod.num} mod={mod} index={i} inView={inView} />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
