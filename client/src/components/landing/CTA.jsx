'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Button from '@/components/ui/Button';

export default function CTA() {
  const t = useTranslations('hero');

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-accent-green/10 to-accent-blue/10 border border-accent-green/20 rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            {t('title')}
          </h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto">
            {t('subtitle')}
          </p>
          <Link href="/courses">
            <Button size="lg" className="animate-pulse-green">
              {t('cta')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
