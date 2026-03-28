'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform, useSpring } from 'framer-motion';

/* ── Icons ── */
const IconMarket   = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="11" width="2.5" height="6" rx="0.5" stroke="currentColor" strokeWidth="1.3"/><rect x="8.75" y="6" width="2.5" height="11" rx="0.5" stroke="currentColor" strokeWidth="1.3"/><rect x="14.5" y="3" width="2.5" height="14" rx="0.5" stroke="currentColor" strokeWidth="1.3"/><path d="M4.25 8l4.5-4 5.75 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const IconTerminal = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="3" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.3"/><path d="M5 8l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 14h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>);
const IconLevels   = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 6h16M2 14h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="6" cy="6" r="1.5" fill="currentColor"/><circle cx="14" cy="14" r="1.5" fill="currentColor"/><path d="M6 6 L14 14" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.5"/></svg>);
const IconCandle   = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><line x1="5" y1="2" x2="5" y2="5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><rect x="3" y="5" width="4" height="7" rx="0.5" stroke="currentColor" strokeWidth="1.3"/><line x1="5" y1="12" x2="5" y2="16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><line x1="13" y1="4" x2="13" y2="7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><rect x="11" y="7" width="4" height="6" rx="0.5" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.3"/><line x1="13" y1="13" x2="13" y2="17" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>);
const IconTrend    = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 16 L8 9 L12 12 L18 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 4h4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 16h16" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeLinecap="round"/></svg>);
const IconStrategy = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.3"/><circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.3"/><circle cx="10" cy="10" r="1.5" fill="currentColor"/><path d="M10 2.5v2M10 15.5v2M2.5 10h2M15.5 10h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>);
const IconScalp    = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M11 2 L7 10h5l-3 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 10h2M15 10h2M4.5 5l1.5 1.5M14 13.5l1.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/></svg>);
const IconRisk     = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2 L17 5.5v5c0 4-3 6.5-7 7.5-4-1-7-3.5-7-7.5v-5z" stroke="currentColor" strokeWidth="1.3"/><path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const IconProp     = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="6" width="16" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M6 6V4.5a4 4 0 018 0V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><circle cx="10" cy="11.5" r="2" stroke="currentColor" strokeWidth="1.3"/></svg>);
const IconPsych    = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 3c3.866 0 7 2.686 7 6 0 2.5-1.5 4.7-3.75 5.65V17H6.75v-2.35C4.5 13.7 3 11.5 3 9c0-3.314 3.134-6 7-6z" stroke="currentColor" strokeWidth="1.3"/><path d="M7.5 17h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>);
const IconLive     = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3" fill="currentColor" opacity="0.6"/><circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.2" opacity="0.4"/><circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1" opacity="0.2"/><path d="M10 1.5v2M10 16.5v2M1.5 10h2M16.5 10h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/></svg>);

/* ── 5 thematic blocks ── */
const groups = [
  {
    id: 1,
    label: 'Блок 1',
    title: 'Фундамент и инструменты',
    modules: [
      { num: 1,  Icon: IconMarket,   title: 'Основа рынка',              result: 'Понимаешь логику движения цены',      points: ['Как устроен рынок и за счёт чего движется цена', 'Участники: толпа и крупный капитал', 'Тренд, коррекция, боковик', 'Почему большинство теряет деньги'] },
      { num: 2,  Icon: IconTerminal, title: 'Работа в терминале',        result: 'Умеешь работать в торговой платформе', points: ['Интерфейс торговой платформы', 'Выставление ордеров: лимит, маркет, стоп', 'Работа с графиками и таймфреймами', 'Базовые настройки под MNQ/NQ'] },
    ],
  },
  {
    id: 2,
    label: 'Блок 2',
    title: 'Технический арсенал',
    modules: [
      { num: 3,  Icon: IconLevels,   title: 'Уровни и структура',        result: 'Находишь ключевые зоны на графике',   points: ['Поддержка и сопротивление', 'Как строить сильные уровни', 'Ложные пробои и их фильтрация', 'Накопление и распределение'] },
      { num: 4,  Icon: IconCandle,   title: 'Свечной анализ',            result: 'Читаешь рынок через свечи',           points: ['Чтение свечей: баланс покупателя и продавца', 'Пин-бар, поглощение, inside bar', 'Фильтрация ложных сигналов', 'Подтверждение от уровня'] },
      { num: 5,  Icon: IconTrend,    title: 'Тренды и фазы рынка',       result: 'Понимаешь направление и фазу рынка',  points: ['Определение тренда и его структура', 'Линии тренда и каналы', 'Слом структуры и переход в боковик', 'Фазы рынка: накопление, движение, распределение'] },
    ],
  },
  {
    id: 3,
    label: 'Блок 3',
    title: 'Торговые стратегии',
    modules: [
      { num: 6,  Icon: IconStrategy, title: 'Пошаговый алгоритм торговли', result: 'Есть система — знаешь когда входить', points: ['Готовая система входа: алгоритм действий', 'Сценарии: отбой, пробой, ретест', 'Комбинация: уровень + тренд + свеча', 'Когда входить, а когда пропускать'] },
      { num: 7,  Icon: IconScalp,    title: 'Скальпинг и интрадей',       result: 'Забираешь движение внутри дня',       points: ['Что такое скальпинг и как на нём зарабатывают', 'Работа на младших таймфреймах (1m–5m)', 'Быстрые входы и частичная фиксация', 'Интрадей-структура на NQ/MNQ'] },
    ],
  },
  {
    id: 4,
    label: 'Блок 4',
    title: 'Математика трейдинга',
    modules: [
      { num: 8,  Icon: IconRisk,     title: 'Риск-менеджмент',           result: 'Сохраняешь депозит и контролируешь риск', points: ['Постановка стопов по структуре', 'Работа с 1–2 контрактами MNQ', 'RR (риск/прибыль): расчёт позиций', 'Дневной лимит убытков и правила проп'] },
      { num: 9,  Icon: IconProp,     title: 'Как пройти проп-трейдинг',  result: 'Получаешь проп-счёт от $50 000',       points: ['Что такое проп-трейдинг и как он работает', 'Правила проп-компаний: цели, ограничения', 'Стратегия прохождения оценки', 'Как торговать чужим капиталом без риска своих денег'] },
    ],
  },
  {
    id: 5,
    label: 'Блок 5',
    title: 'Психология и практика',
    modules: [
      { num: 10, Icon: IconPsych,    title: 'Психология трейдинга',      result: 'Торгуешь по системе, не по эмоциям',  points: ['Почему трейдеры теряют на знаниях', 'Страх, жадность, месть рынку', 'Дисциплина как главный актив', 'Ведение торгового журнала'] },
      { num: 11, Icon: IconLive,     title: 'Live-сессии',               result: 'Торгуешь вместе с ментором в реальном времени', points: ['Разбор рынка в реальном времени', 'Совместный анализ перед сессией', 'Индивидуальный разбор твоих сделок', 'Переход к самостоятельной торговле'] },
    ],
  },
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
        className="flex items-center gap-3 sm:gap-6 px-3 sm:px-6 py-4 sm:py-5 rounded-xl"
        style={{
          background: open ? 'rgba(0,212,170,0.05)' : 'rgba(255,255,255,0.02)',
          borderLeft: open ? '2px solid rgba(0,212,170,0.8)' : '2px solid rgba(255,255,255,0.07)',
        }}
        whileHover={{
          background: 'rgba(255,255,255,0.04)',
          borderLeftColor: 'rgba(0,212,170,0.5)',
        }}
      >
        {/* Number — dominant */}
        <span
          className="font-mono font-black flex-shrink-0 w-10 text-right leading-none"
          style={{
            fontSize: '22px',
            color: open ? 'rgba(0,212,170,1)' : 'rgba(255,255,255,0.18)',
            letterSpacing: '-0.03em',
          }}
        >
          {String(mod.num).padStart(2, '0')}
        </span>

        {/* Icon */}
        <div className="flex-shrink-0" style={{ color: open ? '#00D4AA' : 'rgba(255,255,255,0.30)' }}>
          <Icon />
        </div>

        {/* Title & result */}
        <div className="flex-1 min-w-0 flex items-center justify-between gap-6">
          <span className="text-[14px] sm:text-[17px] font-semibold text-white tracking-tight">{mod.title}</span>
          {!open && (
            <span className="hidden lg:block text-[13px] text-white/25 truncate max-w-[240px] font-normal">{mod.result}</span>
          )}
        </div>

        {/* Chevron */}
        <motion.svg
          className="flex-shrink-0"
          style={{ color: open ? '#00D4AA' : 'rgba(255,255,255,0.20)' }}
          width="18" height="18" viewBox="0 0 16 16" fill="none"
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
            <div className="pl-4 sm:pl-[100px] pr-4 sm:pr-6 pb-6 pt-2">
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
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-accent-green/20 bg-accent-green/[0.06] text-accent-green text-[11px] font-mono tracking-widest uppercase mb-4">
            11 модулей · 5 блоков
          </div>
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
                <p className="text-2xl lg:text-3xl font-bold text-white leading-snug mb-4">
                  Ты не просто изучаешь трейдинг —
                </p>
                <p className="text-base lg:text-lg text-white/60 leading-relaxed">
                  ты получаешь{' '}
                  <span className="text-accent-green font-semibold">конкретную модель</span>{' '}
                  и{' '}
                  <span className="text-accent-green font-semibold">чёткий алгоритм действий</span>{' '}
                  на рынке.
                </p>
              </div>

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

          {/* RIGHT — module accordion grouped by block */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-6">
              {groups.map((group, gi) => (
                <div key={group.id}>
                  {/* Group header */}
                  <motion.div
                    className="flex items-center gap-3 mb-2 px-2"
                    initial={{ opacity: 0, x: -8 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.08 * gi, duration: 0.4 }}
                  >
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-accent-green/60 whitespace-nowrap">
                      {group.label}
                    </span>
                    <div className="flex-1 h-px bg-white/[0.06]" />
                    <span className="text-[12px] font-semibold text-white/30 whitespace-nowrap">
                      {group.title}
                    </span>
                  </motion.div>

                  {/* Modules in this group */}
                  <div className="flex flex-col gap-1.5">
                    {group.modules.map((mod, i) => (
                      <ModuleCard key={mod.num} mod={mod} index={gi * 3 + i} inView={inView} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
