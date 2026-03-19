'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ProgressBar from '@/components/ui/ProgressBar';
import { getLocalizedField } from '@/lib/utils';
import api from '@/lib/api';

export default function MyCoursesPage() {
  const t = useTranslations('dashboard');
  const locale = useLocale();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard/courses')
      .then(res => setCourses(res.data))
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

  if (courses.length === 0) {
    return (
      <Card className="text-center py-12">
        <p className="text-text-secondary mb-4">{t('noCourses')}</p>
        <Link href="/courses">
          <Button>{t('browseCourses')}</Button>
        </Link>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {courses.map(course => (
        <Card key={course.id} hover>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-text-primary mb-1">
                {getLocalizedField(course, 'title', locale)}
              </h3>
              <div className="text-sm text-text-secondary mb-3">
                {course.completedLessons}/{course.lessons?.length || course.totalLessons || 0} {locale === 'kz' ? 'сабақ өтілді' : 'уроков пройдено'}
              </div>
              <ProgressBar value={course.progressPercent} />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-accent-green font-bold text-lg">{course.progressPercent}%</span>
              <Link href={`/courses/${course.slug}`}>
                <Button variant="secondary" size="sm">{t('continueLearning')}</Button>
              </Link>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
