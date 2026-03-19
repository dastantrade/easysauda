'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Link } from '@/i18n/routing';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { formatPrice, getLocalizedField, formatDuration } from '@/lib/utils';
import { CourseJsonLd } from '@/components/seo/JsonLd';
import api from '@/lib/api';

export default function CourseDetailPage() {
  const t = useTranslations('courses');
  const lt = useTranslations('lesson');
  const locale = useLocale();
  const params = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/courses/${params.slug}`)
      .then(res => setCourse(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [params.slug]);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="animate-spin w-8 h-8 border-2 border-accent-green border-t-transparent rounded-full mx-auto" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold text-text-primary mb-4">Курс не найден</h1>
        <Link href="/courses">
          <Button variant="secondary">Вернуться к курсам</Button>
        </Link>
      </div>
    );
  }

  const levelMap = { BEGINNER: 'green', INTERMEDIATE: 'blue', ADVANCED: 'red' };

  return (
    <div className="py-12">
      <CourseJsonLd course={course} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Badge variant={levelMap[course.level]} className="mb-4">
              {t(course.level.toLowerCase())}
            </Badge>

            <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              {getLocalizedField(course, 'title', locale)}
            </h1>

            <p className="text-text-secondary mb-8 leading-relaxed">
              {getLocalizedField(course, 'description', locale)}
            </p>

            {/* Course Program */}
            <h2 className="text-2xl font-bold text-text-primary mb-6">{t('program')}</h2>
            <div className="space-y-3 mb-12">
              {course.lessons?.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className="flex items-center justify-between p-4 bg-dark-card border border-dark-border rounded-lg hover:border-accent-green/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 bg-dark rounded-lg flex items-center justify-center text-sm text-text-muted font-medium">
                      {index + 1}
                    </span>
                    <div>
                      <div className="text-text-primary font-medium">
                        {getLocalizedField(lesson, 'title', locale)}
                      </div>
                      <div className="text-xs text-text-muted mt-1">
                        {formatDuration(lesson.durationMinutes)}
                      </div>
                    </div>
                  </div>
                  {lesson.isFree && (
                    <Badge variant="green">{t('freePreview')}</Badge>
                  )}
                </div>
              ))}
            </div>

            {/* Reviews */}
            {course.reviews?.length > 0 && (
              <>
                <h2 className="text-2xl font-bold text-text-primary mb-6">{t('reviews')}</h2>
                <div className="space-y-4">
                  {course.reviews.map((review) => (
                    <Card key={review.id}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-accent-green/10 rounded-full flex items-center justify-center">
                          <span className="text-accent-green text-sm font-semibold">
                            {review.user.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="text-text-primary text-sm font-medium">{review.user.name}</div>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className={`w-3 h-3 ${i < review.rating ? 'text-yellow-400' : 'text-dark-border'}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      {review.comment && (
                        <p className="text-text-secondary text-sm">{review.comment}</p>
                      )}
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sidebar - Purchase Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="p-6">
                <div className="mb-4">
                  <span className="text-3xl font-bold text-accent-green">{formatPrice(course.price)}</span>
                  {course.originalPrice && (
                    <span className="text-lg text-text-muted line-through ml-3">{formatPrice(course.originalPrice)}</span>
                  )}
                </div>

                <div className="space-y-3 mb-6 text-sm text-text-secondary">
                  <div className="flex justify-between">
                    <span>{t('lessons')}:</span>
                    <span className="text-text-primary">{course.totalLessons}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('hours')}:</span>
                    <span className="text-text-primary">{Number(course.totalDurationHours)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Студентов:</span>
                    <span className="text-text-primary">{course._count?.enrollments || 0}</span>
                  </div>
                </div>

                <Button size="lg" className="w-full mb-3">
                  {t('enrollButton')}
                </Button>

                <p className="text-xs text-text-muted text-center">
                  Безопасная оплата через Stripe/Kaspi
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
