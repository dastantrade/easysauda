'use client';

import { useRef } from 'react';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';

/* Premium SVG icons */
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

const ICONS = [IconCalendar, IconMonitor, IconChart];

const processContent = {
  ru: {
    badge: 'Формат обучения',
    heading: 'Как проходит курс',
    steps: [
      { num: '01', value: '2 месяца',        label: 'системной работы', highlight: false },
      { num: '02', value: '2 раза в неделю', label: 'онлайн, без воды', highlight: false },
      { num: '03', value: '1 Проп-счёт',     label: 'сразу в работу',   highlight: true  },
    ],
    paragraphs: [
      'С первого занятия ты уже в рынке. Без долгой теории — только то, что сразу применяется.',
      'Разбираем твои сделки, ошибки и мышление. Смотрим рынок вместе и учимся читать его в реальном времени.',
      'В итоге: ты не просто «понимаешь трейдинг» — у тебя есть своя рабочая система и контроль риска.',
    ],
    forBeginner: 'Новичкам',
    forBeginnerTitle: 'Подходит',
    forBeginnerHighlight: 'даже если ты с нуля',
    forBeginnerDesc: 'Начнём с основ — к концу у тебя будет рабочая стратегия',
    forAdvanced: 'Опытным',
    forAdvancedTitle: 'Если уже торгуешь, но',
    forAdvancedHighlight: 'нет стабильности',
    forAdvancedDesc: 'Найдём слабое место и выстроим систему',
  },
  kz: {
    badge: 'Оқу форматы',
    heading: 'Курс қалай өтеді',
    steps: [
      { num: '01', value: '2 ай',               label: 'жүйелі жұмыс',    highlight: false },
      { num: '02', value: 'Аптасына 2 рет',     label: 'онлайн, нақты',   highlight: false },
      { num: '03', value: '1 Проп-шот',         label: 'бірден жұмысқа',  highlight: true  },
    ],
    paragraphs: [
      'Бірінші сабақтан бастап сен нарықтасың. Ұзақ теориясыз — тек бірден қолданылатын нәрсе.',
      'Сенің мәмілелеріңді, қателіктеріңді және ойлауыңды талдаймыз. Нарықты бірге қараймыз және оны нақты уақытта оқуды үйренеміз.',
      'Нәтижесінде: сен жай ғана «трейдингті түсінбейсің» — сенің жұмыс жүйең және тәуекел бақылауың бар.',
    ],
    forBeginner: 'Жаңадан бастағандарға',
    forBeginnerTitle: 'Жарайды',
    forBeginnerHighlight: 'нөлден бастасаң да',
    forBeginnerDesc: 'Негізден бастаймыз — соңында жұмыс стратегияң болады',
    forAdvanced: 'Тәжірибелілерге',
    forAdvancedTitle: 'Егер сауда жасайтын болсаң, бірақ',
    forAdvancedHighlight: 'тұрақтылық жоқ',
    forAdvancedDesc: 'Əлсіз жерді табып, жүйе құрамыз',
  },
};

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
  const locale = useLocale();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const pc = processContent[locale] ?? processContent.ru;

  return (
    <section ref={ref} className="relative py-20 px-4 overflow-hidden">
      <GridBg />
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
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-accent-green/20 bg-accent-green/[0.06] text-accent-green text-[11px] font-mono tracking-widest uppercase mb-4">
            {pc.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            {pc.heading}
          </h2>
        </motion.div>

        {/* 3 step cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-12">
          {pc.steps.map(({ num, value, label, highlight }, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={i}
                className="relative rounded-xl backdrop-blur-sm p-5 lg:p-8 text-center overflow-hidden"
                style={{
                  background: highlight ? 'rgba(0,212,170,0.07)' : 'rgba(255,255,255,0.025)',
                  border: highlight ? '1px solid rgba(0,212,170,0.40)' : '1px solid rgba(255,255,255,0.07)',
                  boxShadow: highlight ? '0 0 32px rgba(0,212,170,0.14), inset 0 1px 0 rgba(0,212,170,0.15)' : undefined,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                whileHover={{ borderColor: 'rgba(0,212,170,0.35)', y: -3, boxShadow: '0 8px 32px rgba(0,212,170,0.12)' }}
              >
                <span
                  className="absolute -bottom-3 -right-1 text-[72px] lg:text-[100px] font-black leading-none select-none pointer-events-none"
                  style={{ color: highlight ? 'rgba(0,212,170,0.12)' : 'rgba(255,255,255,0.06)', letterSpacing: '-0.04em' }}
                >
                  {num}
                </span>
                {highlight && (
                  <div className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,212,170,0.10) 0%, transparent 70%)' }}
                  />
                )}
                <div className="flex justify-center mb-4" style={{ color: '#00D4AA' }}>
                  <Icon />
                </div>
                <div className="text-base lg:text-xl font-extrabold leading-tight mb-2" style={{ color: '#00D4AA' }}>
                  {value}
                </div>
                <div className="text-xs lg:text-sm text-white/40 leading-snug">{label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Description */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-10">
          {pc.paragraphs.map((text, i) => (
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

        {/* For whom */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-4">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-white/30 mb-2">{pc.forBeginner}</p>
            <p className="text-sm font-semibold text-white leading-snug">
              {pc.forBeginnerTitle} <span className="text-accent-green">{pc.forBeginnerHighlight}</span>
            </p>
            <p className="text-[12px] text-white/40 mt-1 leading-relaxed">{pc.forBeginnerDesc}</p>
          </div>
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-4">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-white/30 mb-2">{pc.forAdvanced}</p>
            <p className="text-sm font-semibold text-white leading-snug">
              {pc.forAdvancedTitle} <span className="text-accent-green">{pc.forAdvancedHighlight}</span>
            </p>
            <p className="text-[12px] text-white/40 mt-1 leading-relaxed">{pc.forAdvancedDesc}</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
