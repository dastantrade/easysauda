'use client';

import { useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { formatPrice, getLocalizedField } from '@/lib/utils';

const demoCourses = [
  {
    slug: 'osnovy-trejdinga',
    titleRu: 'Основы трейдинга',
    titleKz: 'Трейдинг негіздері',
    shortDescriptionRu: 'Научитесь торговать с нуля за 4 недели',
    shortDescriptionKz: 'Нөлден бастап 4 аптада сауда жасауды үйреніңіз',
    price: 29990,
    originalPrice: 49990,
    level: 'BEGINNER',
    totalLessons: 8,
    totalDurationHours: 12,
  },
  {
    slug: 'tekhnicheskij-analiz',
    titleRu: 'Технический анализ PRO',
    titleKz: 'Техникалық талдау PRO',
    shortDescriptionRu: 'Освойте профессиональный технический анализ',
    shortDescriptionKz: 'Кәсіби техникалық талдауды меңгеріңіз',
    price: 49990,
    originalPrice: 79990,
    level: 'INTERMEDIATE',
    totalLessons: 12,
    totalDurationHours: 18,
  },
  {
    slug: 'upravlenie-riskami',
    titleRu: 'Управление рисками',
    titleKz: 'Тәуекелдерді басқару',
    shortDescriptionRu: 'Не теряйте деньги — управляйте рисками',
    shortDescriptionKz: 'Ақша жоғалтпаңыз — тәуекелдерді басқарыңыз',
    price: 39990,
    originalPrice: null,
    level: 'INTERMEDIATE',
    totalLessons: 6,
    totalDurationHours: 8,
  },
];

const levelBadge = {
  BEGINNER:     { label: 'beginner',     variant: 'green' },
  INTERMEDIATE: { label: 'intermediate', variant: 'blue' },
  ADVANCED:     { label: 'advanced',     variant: 'red' },
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
    const dx = (e.clientX - cx) / (rect.width / 2);   // -1 … 1
    const dy = (e.clientY - cy) / (rect.height / 2);  // -1 … 1
    el.style.transform = `perspective(900px) rotateX(${-dy * 6}deg) rotateY(${dx * 6}deg) scale(1.025)`;
    el.style.boxShadow = `${-dx * 12}px ${-dy * 12}px 40px rgba(0,212,170,0.10)`;
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
  const t = useTranslations('courses');
  const locale = useLocale();
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00B8FF]/20 bg-[#00B8FF]/8 text-[#00B8FF] text-[11px] font-mono tracking-widest uppercase mb-4">
            Программы обучения
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{t('title')}</h2>
          <p className="text-white/45 max-w-xl mx-auto">{t('subtitle')}</p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demoCourses.map((course, cardIndex) => {
            const badge = levelBadge[course.level];
            return (
              <motion.div
                key={course.slug}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: cardIndex * 0.12, ease: 'easeOut' }}
              >
                <TiltCard>
                  <div className="h-full glass-card rounded-2xl p-6 flex flex-col border border-white/[0.07] hover:border-white/[0.12] transition-colors duration-300">
                    {/* Thumbnail */}
                    <div className="w-full h-44 rounded-xl mb-5 flex items-center justify-center border border-white/[0.06] bg-white/[0.025] relative overflow-hidden">
                      {/* Subtle inner glow */}
                      <div className="absolute inset-0"
                        style={{ background: 'radial-gradient(circle at 50% 100%, rgba(0,212,170,0.06), transparent 70%)' }} />
                      <motion.div
                        whileHover={{ scale: 1.12, color: '#00D4AA' }}
                        transition={{ duration: 0.25 }}
                      >
                        <svg className="w-12 h-12 text-white/20 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                        </svg>
                      </motion.div>
                    </div>

                    {/* Badge */}
                    <Badge variant={badge.variant} className="self-start mb-3">
                      {t(badge.label)}
                    </Badge>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white mb-2">
                      {getLocalizedField(course, 'title', locale)}
                    </h3>

                    {/* Description */}
                    <p className="text-white/42 text-sm mb-5 flex-grow leading-relaxed">
                      {getLocalizedField(course, 'shortDescription', locale)}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-white/35 mb-5">
                      <span className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                        </svg>
                        {course.totalLessons} {t('lessons')}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {course.totalDurationHours} {t('hours')}
                      </span>
                    </div>

                    {/* Price + CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                      <div>
                        <span className="text-xl font-bold text-accent-green">{formatPrice(course.price)}</span>
                        {course.originalPrice && (
                          <span className="text-xs text-white/30 line-through ml-2">{formatPrice(course.originalPrice)}</span>
                        )}
                      </div>
                      <Link href={`/courses/${course.slug}`}>
                        <Button size="sm">{t('enrollButton')}</Button>
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
