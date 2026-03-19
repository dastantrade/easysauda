'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import Card from '@/components/ui/Card';
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
  BEGINNER: { label: 'beginner', variant: 'green' },
  INTERMEDIATE: { label: 'intermediate', variant: 'blue' },
  ADVANCED: { label: 'advanced', variant: 'red' },
};

export default function CourseCards() {
  const t = useTranslations('courses');
  const locale = useLocale();

  return (
    <section className="py-20" id="courses">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">{t('title')}</h2>
          <p className="text-text-secondary max-w-xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demoCourses.map((course) => {
            const badge = levelBadge[course.level];
            return (
              <Card key={course.slug} hover className="flex flex-col">
                {/* Thumbnail placeholder */}
                <div className="w-full h-48 bg-dark rounded-lg mb-4 flex items-center justify-center border border-dark-border">
                  <svg className="w-12 h-12 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                {/* Badge */}
                <Badge variant={badge.variant} className="self-start mb-3">
                  {t(badge.label)}
                </Badge>

                {/* Title */}
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  {getLocalizedField(course, 'title', locale)}
                </h3>

                {/* Description */}
                <p className="text-text-secondary text-sm mb-4 flex-grow">
                  {getLocalizedField(course, 'shortDescription', locale)}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-text-muted mb-4">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    {course.totalLessons} {t('lessons')}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {course.totalDurationHours} {t('hours')}
                  </span>
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-dark-border">
                  <div>
                    <span className="text-xl font-bold text-accent-green">{formatPrice(course.price)}</span>
                    {course.originalPrice && (
                      <span className="text-sm text-text-muted line-through ml-2">{formatPrice(course.originalPrice)}</span>
                    )}
                  </div>
                  <Link href={`/courses/${course.slug}`}>
                    <Button size="sm">{t('enrollButton')}</Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
