'use client';

import { useTranslations } from 'next-intl';
import Card from '@/components/ui/Card';
import { SlideIn, FadeIn, FadeInStagger, FadeInItem } from '@/components/ui/Animations';

export default function About() {
  const t = useTranslations('about');

  const stats = [
    { value: '7+', label: t('experience') },
    { value: '500+', label: t('students') },
    { value: '78%', label: t('winRate') },
  ];

  return (
    <section className="py-20" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Photo placeholder */}
          <SlideIn direction="left">
            <div className="relative">
              <div className="w-full aspect-square max-w-md mx-auto bg-dark-card rounded-2xl border border-dark-border overflow-hidden flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 bg-accent-green/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-16 h-16 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <p className="text-text-muted text-sm">Ваше фото</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent-green/10 rounded-xl -z-10" />
            </div>
          </SlideIn>

          {/* Content */}
          <SlideIn direction="right">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
                {t('title')}
              </h2>
              <p className="text-text-secondary mb-8">
                {t('subtitle')}
              </p>

              <FadeInStagger className="grid grid-cols-3 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <FadeInItem key={index}>
                    <Card className="text-center p-4">
                      <div className="text-2xl font-bold text-accent-green">{stat.value}</div>
                      <div className="text-xs text-text-secondary mt-1">{stat.label}</div>
                    </Card>
                  </FadeInItem>
                ))}
              </FadeInStagger>

              <FadeInStagger className="space-y-3">
                {[
                  'Действующий трейдер — торгую каждый день',
                  'Реальная статистика — всё прозрачно',
                  'Фокус на управление рисками',
                  'Индивидуальный подход к каждому',
                ].map((item, i) => (
                  <FadeInItem key={i}>
                    <li className="flex items-start gap-3 text-text-secondary list-none">
                      <svg className="w-5 h-5 text-accent-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  </FadeInItem>
                ))}
              </FadeInStagger>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}
