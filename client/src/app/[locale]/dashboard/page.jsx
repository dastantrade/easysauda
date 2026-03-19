'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ProgressBar from '@/components/ui/ProgressBar';
import { getLocalizedField } from '@/lib/utils';
import api from '@/lib/api';

export default function DashboardPage() {
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
      {/* Stats */}
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

      {/* My Courses */}
      <h2 className="text-xl font-bold text-text-primary mb-4">{t('myCourses')}</h2>

      {data?.courses?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.courses.map(course => (
            <Card key={course.id} hover>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {getLocalizedField(course, 'title', locale)}
              </h3>
              <div className="flex items-center justify-between text-sm text-text-secondary mb-3">
                <span>{course.completedLessons}/{course.totalLessons} {locale === 'kz' ? 'сабақ' : 'уроков'}</span>
                <span className="text-accent-green font-medium">{course.progressPercent}%</span>
              </div>
              <ProgressBar value={course.progressPercent} className="mb-4" />
              <Link href={`/courses/${course.slug}`}>
                <Button variant="secondary" size="sm">{t('continueLearning')}</Button>
              </Link>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <p className="text-text-secondary mb-4">{t('noCourses')}</p>
          <Link href="/courses">
            <Button>{t('browseCourses')}</Button>
          </Link>
        </Card>
      )}
    </div>
  );
}
