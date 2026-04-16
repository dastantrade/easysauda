'use client';

import { useRef, useCallback } from 'react';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';

/* ── Icons ── */
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconGroup = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="8" cy="7" r="3" stroke="currentColor" strokeWidth="1.4"/>
    <circle cx="15" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4" opacity="0.6"/>
    <path d="M2 18c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M15 14c2 0 4 1 4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.6"/>
  </svg>
);
const IconSolo = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M3.5 19c0-4.142 3.358-7 7.5-7s7.5 2.858 7.5 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M15 10l1.5 1.5M16.5 10L15 11.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
  </svg>
);

/* ── Locale content ── */
const content = {
  ru: {
    sectionBadge: 'Форматы участия',
    sectionTitle: 'Тарифы обучения',
    sectionSubtitle: 'Выберите формат участия и начните путь к профессиональному трейдингу.',
    popular: 'Популярный',
    questionText: 'Есть вопросы? Напишите в',
    answerText: '— отвечаю лично.',
    plans: [
      {
        id: 'group',
        badge: 'Групповой',
        title: 'Менторшип',
        format: 'Мини-группа · 3–5 участников',
        Icon: IconGroup,
        for: 'Тем, кому важна поддержка единомышленников и структурное обучение',
        features: [
          'Полный доступ к платформе с уроками',
          'Общие созвоны 2 раза в неделю (разбор сделок)',
          'Закрытый чат группы для обмена опытом',
          'Проверка домашних заданий лично мной',
        ],
        price: '400 000',
        currency: '₸',
        highlight: false,
        ctaLabel: 'Записаться в группу',
      },
      {
        id: 'personal',
        badge: 'Индивидуально',
        title: 'Personal 1-on-1',
        format: 'Личное наставничество',
        Icon: IconSolo,
        for: 'Тем, кто ценит время и хочет максимально быстрый результат под контролем',
        features: [
          'Персональный график обучения',
          'Личные созвоны — разбираем только твои графики и психологию',
          'Моя поддержка 24/7',
          'Ускоренный результат без лишних шагов',
        ],
        price: '700 000',
        currency: '₸',
        highlight: true,
        ctaLabel: 'Начать лично со мной',
      },
    ],
  },
  kz: {
    sectionBadge: 'Қатысу форматтары',
    sectionTitle: 'Оқу бағдарламалары',
    sectionSubtitle: 'Қатысу форматын таңдап, кәсіби трейдингке апаратын жолды бастаңыз.',
    popular: 'Танымал',
    questionText: 'Сұрақтарыңыз бар ма? Жазыңыз',
    answerText: '— жеке жауап беремін.',
    plans: [
      {
        id: 'group',
        badge: 'Топтық',
        title: 'Менторшип',
        format: 'Мини-топ · 3–5 қатысушы',
        Icon: IconGroup,
        for: 'Пікірлес адамдардың қолдауы мен құрылымды оқу маңызды болғандар үшін',
        features: [
          'Сабақтары бар платформаға толық қол жеткізу',
          'Аптасына 2 рет жалпы қоңыраулар (мәмілелер талдауы)',
          'Тәжірибе алмасуға арналған жабық топ чаты',
          'Үй тапсырмаларын мен жеке тексеремін',
        ],
        price: '400 000',
        currency: '₸',
        highlight: false,
        ctaLabel: 'Топқа жазылу',
      },
      {
        id: 'personal',
        badge: 'Жеке',
        title: 'Personal 1-on-1',
        format: 'Жеке тәлімгерлік',
        Icon: IconSolo,
        for: 'Уақытты бағалайтын және бақылауда жылдам нәтиже алғысы келетіндер үшін',
        features: [
          'Жеке оқу кестесі',
          'Жеке қоңыраулар — тек сенің графиктеріңді және психологияңды талдаймыз',
          'Менің қолдауым 24/7',
          'Артық қадамсыз жеделдетілген нәтиже',
        ],
        price: '700 000',
        currency: '₸',
        highlight: true,
        ctaLabel: 'Мен арқылы бастау',
      },
    ],
  },
};

// 3D Perspective Tilt wrapper
function TiltCard({ children, className = '' }) {
  const cardRef = useRef(null);

  const handleMove = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    el.style.transform = `perspective(900px) rotateX(${-dy * 5}deg) rotateY(${dx * 5}deg) scale(1.02)`;
    el.style.boxShadow = `${-dx * 10}px ${-dy * 10}px 40px rgba(0,212,170,0.10)`;
  }, []);

  const handleLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
    el.style.boxShadow = '';
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}

export default function CourseCards() {
  const locale = useLocale();
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const { sectionBadge, sectionTitle, sectionSubtitle, popular, questionText, answerText, plans } =
    content[locale] ?? content.ru;

  return (
    <section className="relative py-20 overflow-hidden" id="courses">
      {/* Grid pattern background */}
      <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />

      {/* Top section glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(0,184,255,0.05) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00B8FF]/20 bg-[#00B8FF]/[0.06] text-[#00B8FF] text-[11px] font-mono tracking-widest uppercase mb-4">
            {sectionBadge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {sectionTitle}
          </h2>
          <p className="text-white/45 max-w-xl mx-auto">
            {sectionSubtitle}
          </p>
        </motion.div>

        {/* Cards — 2 columns, centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              className="h-full"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.14, ease: 'easeOut' }}
            >
              <TiltCard className="h-full">
                <div
                  className="relative h-full rounded-2xl flex flex-col overflow-hidden"
                  style={plan.highlight ? {
                    background: 'linear-gradient(160deg, rgba(0,212,170,0.10) 0%, rgba(10,12,18,0.98) 55%, rgba(0,40,160,0.07) 100%)',
                    border: '1px solid rgba(0,212,170,0.35)',
                    boxShadow: '0 0 48px rgba(0,212,170,0.10), inset 0 1px 0 rgba(0,212,170,0.15)',
                  } : {
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {/* Popular label */}
                  {plan.highlight && (
                    <div className="absolute top-4 right-4">
                      <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-accent-green bg-accent-green/10 border border-accent-green/25 rounded-full px-2.5 py-0.5">
                        {popular}
                      </span>
                    </div>
                  )}

                  {/* Inner glow for highlight */}
                  {plan.highlight && (
                    <div
                      className="absolute inset-0 pointer-events-none rounded-2xl"
                      style={{ background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(0,212,170,0.08) 0%, transparent 65%)' }}
                    />
                  )}

                  <div className="relative p-7 flex flex-col gap-6 flex-1">

                    {/* Icon + Badge row */}
                    <div className="flex items-start gap-4">
                      <div
                        className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                        style={plan.highlight ? {
                          background: 'rgba(0,212,170,0.12)',
                          border: '1px solid rgba(0,212,170,0.25)',
                          color: '#00D4AA',
                        } : {
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.10)',
                          color: 'rgba(255,255,255,0.45)',
                        }}
                      >
                        <plan.Icon />
                      </div>
                      <div>
                        <div
                          className="text-[10px] font-bold tracking-[0.18em] uppercase mb-0.5"
                          style={{ color: plan.highlight ? '#00D4AA' : 'rgba(255,255,255,0.35)' }}
                        >
                          {plan.badge}
                        </div>
                        <div className="text-xl font-bold text-white">{plan.title}</div>
                        <div className="text-[12px] text-white/35 mt-0.5">{plan.format}</div>
                      </div>
                    </div>

                    {/* For whom */}
                    <p className="text-[13px] text-white/40 leading-relaxed border-l-2 pl-3"
                      style={{ borderColor: plan.highlight ? 'rgba(0,212,170,0.35)' : 'rgba(255,255,255,0.10)' }}>
                      {plan.for}
                    </p>

                    {/* Features */}
                    <ul className="flex flex-col gap-3 flex-1">
                      {plan.features.map((f, fi) => (
                        <motion.li
                          key={fi}
                          className="flex items-start gap-2.5 text-[13px] text-white/55 leading-snug"
                          initial={{ opacity: 0, x: -6 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 + fi * 0.06, duration: 0.3 }}
                        >
                          <span
                            className="flex-shrink-0 mt-[1px] w-5 h-5 rounded-md flex items-center justify-center"
                            style={plan.highlight ? {
                              background: 'rgba(0,212,170,0.12)',
                              color: '#00D4AA',
                            } : {
                              background: 'rgba(255,255,255,0.05)',
                              color: 'rgba(255,255,255,0.35)',
                            }}
                          >
                            <IconCheck />
                          </span>
                          {f}
                        </motion.li>
                      ))}
                    </ul>

                    {/* Divider */}
                    <div
                      className="h-px"
                      style={{ background: plan.highlight ? 'rgba(0,212,170,0.15)' : 'rgba(255,255,255,0.06)' }}
                    />

                    {/* Price + CTA */}
                    <div className="flex flex-col gap-4">
                      <div>
                        <span
                          className="text-3xl font-black tracking-tight"
                          style={{ color: plan.highlight ? '#00D4AA' : 'rgba(255,255,255,0.85)' }}
                        >
                          {plan.price}
                        </span>
                        <span className="text-lg font-bold ml-1" style={{ color: plan.highlight ? '#00D4AA' : 'rgba(255,255,255,0.50)' }}>
                          {plan.currency}
                        </span>
                      </div>

                      <motion.a
                        href="https://t.me/dastan_talgatkhanuly"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 text-sm font-bold px-5 py-3 rounded-xl w-full transition-colors duration-200"
                        style={plan.highlight ? {
                          background: '#00D4AA',
                          color: '#08090E',
                        } : {
                          background: 'rgba(255,255,255,0.06)',
                          color: 'rgba(255,255,255,0.75)',
                          border: '1px solid rgba(255,255,255,0.10)',
                        }}
                        whileHover={plan.highlight ? {
                          scale: 1.03,
                          boxShadow: '0 0 28px rgba(0,212,170,0.45)',
                        } : {
                          scale: 1.02,
                          background: 'rgba(255,255,255,0.09)',
                        }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {plan.ctaLabel}
                        <IconArrow />
                      </motion.a>
                    </div>

                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          className="text-center text-[12px] text-white/25 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {questionText}{' '}
          <a href="https://t.me/dastan_talgatkhanuly" target="_blank" rel="noopener noreferrer"
            className="text-accent-green/60 hover:text-accent-green transition-colors underline underline-offset-2">
            Telegram
          </a>{' '}
          {answerText}
        </motion.p>

      </div>
    </section>
  );
}
