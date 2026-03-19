'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import { getLocalizedField } from '@/lib/utils';
import api from '@/lib/api';

export default function ProgressPage() {
  const t = useTranslations('dashboard');
  const locale = useLocale();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard/overview')
      .then(res => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-10 text-center">
        <div className="animate-spin w-8 h-8 border-2 border-accent-green border-t-transparent rounded-full mx-auto" />
      </div>
    );
  }

  return (
    <div>
      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card className="text-center">
          <div className="text-3xl font-bold text-accent-green">{data?.stats?.totalCourses || 0}</div>
          <div className="text-sm text-text-secondary mt-1">{t('totalCourses')}</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-accent-green">{data?.stats?.completedLessons || 0}</div>
          <div className="text-sm text-text-secondary mt-1">{t('completedLessons')}</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-accent-green">{data?.stats?.totalWatchTimeHours || 0}</div>
          <div className="text-sm text-text-secondary mt-1">{t('totalHours')}</div>
        </Card>
      </div>

      {/* Per-Course Progress */}
      <h2 className="text-xl font-bold text-text-primary mb-4">
        {locale === 'kz' ? 'Курс бойынша прогресс' : 'Прогресс по курсам'}
      </h2>

      <div className="space-y-4">
        {data?.courses?.map(course => (
          <Card key={course.id}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-text-primary">
                {getLocalizedField(course, 'title', locale)}
              </h3>
              <span className="text-accent-green font-bold">{course.progressPercent}%</span>
            </div>
            <ProgressBar value={course.progressPercent} className="mb-2" />
            <div className="text-sm text-text-secondary">
              {course.completedLessons} / {course.totalLessons} {locale === 'kz' ? 'сабақ' : 'уроков'}
            </div>
          </Card>
        ))}

        {(!data?.courses || data.courses.length === 0) && (
          <Card className="text-center py-8">
            <p className="text-text-secondary">{t('noCourses')}</p>
          </Card>
        )}
      </div>
    </div>
  );
}
