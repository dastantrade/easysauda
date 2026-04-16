'use client';

import { useRef } from 'react';
import { useLocale } from 'next-intl';
import { motion, useInView, useScroll, useSpring } from 'framer-motion';

/* ── Icons (shared) ── */
const IconChaos = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M3 7c3 0 5 2 5 4s-2 4-5 4M3 7c0-1.105.895-2 2-2h2M21 17c-3 0-5-2-5-4s2-4 5-4M21 17c0 1.105-.895 2-2 2h-2M9 12h6" />
  </svg>
);
const IconFilter = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
  </svg>
);
const IconAlgo = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
);
const IconFree = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
  </svg>
);

const ICONS = [IconChaos, IconFilter, IconAlgo, IconFree];
const COLORS = [
  { hex: '#FF6B6B', rgb: '255,107,107' },
  { hex: '#00B8FF', rgb: '0,184,255' },
  { hex: '#FFD060', rgb: '255,208,96' },
  { hex: '#00D4AA', rgb: '0,212,170' },
];

const roadmapContent = {
  ru: {
    badge: 'Эволюция капитала',
    title: 'Твой путь от',
    titleGradient: '0 до Pro',
    subtitle: 'Каждый уровень — это конкретный навык, который меняет результат',
    stages: [
      { label: 'Этап 1', title: 'Хаос',      desc: 'Пытаешься угадать движение цены, теряешь на комиссиях. Слышишь «стоп-лосс», «шорт», «паттерн» — и всё смешивается в голове.' },
      { label: 'Этап 2', title: 'Фильтр',    desc: 'Изучаешь базу EasySauda. Отсекаешь шум — видишь логику крупных игроков. Понимаешь структуру рынка и ключевые уровни.' },
      { label: 'Этап 3', title: 'Алгоритм',  desc: 'У тебя есть чёткая точка входа, стоп-лосс и холодный расчёт. Торговля перестаёт быть азартом — становится системой.' },
      { label: 'Этап 4', title: 'Свобода',   desc: 'Торговля становится скучной рутиной, которая приносит деньги. Ты контролируешь риски, следуешь плану — и видишь стабильный результат.' },
    ],
  },
  kz: {
    badge: 'Капитал эволюциясы',
    title: 'Сенің жолың',
    titleGradient: '0-ден Про-ға',
    subtitle: 'Әрбір деңгей — нәтижені өзгертетін нақты дағды',
    stages: [
      { label: 'Кезең 1', title: 'Хаос',       desc: 'Баға қозғалысын болжауға тырысасың, комиссияда жоғалтасың. «Стоп-лосс», «шорт», «паттерн» естисің — бәрі басыңда шатасады.' },
      { label: 'Кезең 2', title: 'Сүзгі',      desc: 'EasySauda негізін зерттейсің. Шуды кесесің — ірі ойыншылардың логикасын көресің. Нарық құрылымы мен негізгі деңгейлерді түсінесің.' },
      { label: 'Кезең 3', title: 'Алгоритм',   desc: 'Сенің нақты кіру нүктең, стоп-лоссың және салқын есебің бар. Сауда азартты болуды тоқтатады — жүйеге айналады.' },
      { label: 'Кезең 4', title: 'Еркіндік',   desc: 'Сауда ақша әкелетін жалықтыратын рутинге айналады. Сен тәуекелдерді бақылайсың, жоспарды орындайсың — және тұрақты нәтиже көресің.' },
    ],
  },
};

function Stage({ stage, index, total, color }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isLast = index === total - 1;
  const Icon = ICONS[index];
  const CIRCLE_R = 22;
  const circumference = 2 * Math.PI * CIRCLE_R;

  return (
    <div ref={ref} className="relative flex gap-6 sm:gap-10">
      {/* Left: icon + line */}
      <div className="flex flex-col items-center flex-shrink-0" style={{ width: 48 }}>
        <div className="relative flex-shrink-0" style={{ width: 48, height: 48 }}>
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: `rgba(${color.rgb},0.12)` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.15 }}
          />
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r={CIRCLE_R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5"/>
            <motion.circle
              cx="24" cy="24" r={CIRCLE_R}
              fill="none" stroke={color.hex} strokeWidth="1.5" strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={inView ? { strokeDashoffset: 0 } : {}}
              transition={{ duration: 0.9, delay: index * 0.15 + 0.1, ease: 'easeInOut' }}
            />
          </svg>
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ color: color.hex }}
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ type: 'spring', stiffness: 300, damping: 18, delay: index * 0.15 + 0.3 }}
          >
            <Icon />
          </motion.div>
        </div>
        {!isLast && (
          <div className="w-px flex-1 mt-1 bg-white/[0.05] relative overflow-hidden" style={{ minHeight: 60 }}>
            <motion.div
              className="absolute inset-x-0 top-0 w-full"
              style={{ background: `linear-gradient(to bottom, ${color.hex}50, transparent)` }}
              initial={{ height: 0 }}
              animate={inView ? { height: '100%' } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 + 0.5 }}
            />
          </div>
        )}
      </div>

      {/* Right: content */}
      <motion.div
        className="pb-14 pt-1 flex-1"
        initial={{ opacity: 0, x: 28 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55, delay: index * 0.15 + 0.15 }}
      >
        <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-1"
          style={{ color: `rgba(${color.rgb}, 0.7)` }}>
          {stage.label}
        </div>
        <h3 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: color.hex }}>
          {stage.title}
        </h3>
        <p className="text-white/42 text-sm leading-relaxed max-w-md">{stage.desc}</p>
      </motion.div>
    </div>
  );
}

export default function Roadmap() {
  const locale = useLocale();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  const rc = roadmapContent[locale] ?? roadmapContent.ru;

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 0.85', 'end 0.15'] });
  const lineScaleY = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden" id="roadmap">
      <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 100% at 50% 0%, rgba(0,212,170,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          ref={titleRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-green/20 bg-accent-green/8 text-accent-green text-[11px] font-mono tracking-widest uppercase mb-5">
            {rc.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {rc.title}{' '}
            <span className="text-gradient">{rc.titleGradient}</span>
          </h2>
          <p className="text-white/42 max-w-md mx-auto text-sm">{rc.subtitle}</p>
        </motion.div>

        {/* Stages */}
        <div className="relative pl-0">
          <div className="absolute left-6 top-12 bottom-12 w-px bg-white/[0.04] overflow-hidden pointer-events-none">
            <motion.div
              className="absolute inset-x-0 top-0 w-full"
              style={{
                background: 'linear-gradient(to bottom, #00D4AA40, #00B8FF30, #FFD06020, #00D4AA50)',
                scaleY: lineScaleY,
                transformOrigin: 'top',
              }}
            />
          </div>
          {rc.stages.map((stage, i) => (
            <Stage key={i} stage={stage} index={i} total={rc.stages.length} color={COLORS[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}
