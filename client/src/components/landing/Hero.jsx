'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Button from '@/components/ui/Button';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent-green/5 via-transparent to-transparent" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-accent-green/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-accent-blue/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in">
            <span className="text-gradient">{t('title')}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 animate-slide-up">
            {t('subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up">
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
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto animate-slide-up">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-accent-green">500+</div>
              <div className="text-sm text-text-secondary mt-1">{t('stats.students')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-accent-green">7+</div>
              <div className="text-sm text-text-secondary mt-1">{t('stats.experience')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-accent-green">3</div>
              <div className="text-sm text-text-secondary mt-1">{t('stats.courses')}</div>
            </div>
          </div>
        </div>

        {/* Chart decoration */}
        <div className="mt-16 max-w-3xl mx-auto opacity-30">
          <svg viewBox="0 0 800 200" className="w-full">
            <polyline
              points="0,150 50,140 100,145 150,120 200,130 250,100 300,110 350,80 400,90 450,60 500,70 550,40 600,50 650,30 700,45 750,20 800,25"
              fill="none"
              stroke="#00C853"
              strokeWidth="2"
            />
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00C853" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#00C853" stopOpacity="0" />
            </linearGradient>
            <polygon
              points="0,150 50,140 100,145 150,120 200,130 250,100 300,110 350,80 400,90 450,60 500,70 550,40 600,50 650,30 700,45 750,20 800,25 800,200 0,200"
              fill="url(#chartGradient)"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
