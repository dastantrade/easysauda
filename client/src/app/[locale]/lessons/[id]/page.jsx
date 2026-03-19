'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { Link } from '@/i18n/routing';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import ProgressBar from '@/components/ui/ProgressBar';
import VideoPlayer from '@/components/courses/VideoPlayer';
import { getLocalizedField, formatDuration } from '@/lib/utils';
import api from '@/lib/api';

export default function LessonPage() {
  const t = useTranslations('lesson');
  const locale = useLocale();
  const params = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [marking, setMarking] = useState(false);

  useEffect(() => {
    api.get(`/lessons/${params.id}`)
      .then(res => setData(res.data))
      .catch(err => setError(err.response?.data?.error || 'Ошибка загрузки'))
      .finally(() => setLoading(false));
  }, [params.id]);

  const handleProgress = useCallback(async ({ watchTimeSeconds }) => {
    try {
      await api.post(`/lessons/${params.id}/progress`, { watchTimeSeconds });
    } catch {
      // Silent fail for progress updates
    }
  }, [params.id]);

  const handleMarkComplete = async () => {
    setMarking(true);
    try {
      await api.post(`/lessons/${params.id}/progress`, {
        completed: true,
        progressPercent: 100,
      });
      setData(prev => ({
        ...prev,
        progress: { ...prev.progress, completed: true, progressPercent: 100 },
      }));
    } catch {
      // Silent fail
    } finally {
      setMarking(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="animate-spin w-8 h-8 border-2 border-accent-green border-t-transparent rounded-full mx-auto" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <div className="bg-accent-red/10 border border-accent-red/20 text-accent-red px-6 py-4 rounded-lg inline-block mb-4">
          {error}
        </div>
        <div>
          <Link href="/courses">
            <Button variant="secondary">{locale === 'kz' ? 'Курстарға оралу' : 'Вернуться к курсам'}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const { lesson, progress, prevLesson, nextLesson } = data;
  const isCompleted = progress?.completed;

  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-text-secondary mb-6">
          <Link href={`/courses/${lesson.course.slug}`} className="hover:text-accent-green transition-colors">
            {getLocalizedField(lesson.course, 'title', locale)}
          </Link>
          <span>/</span>
          <span className="text-text-primary">
            {getLocalizedField(lesson, 'title', locale)}
          </span>
        </div>

        {/* Video Player */}
        <VideoPlayer
          videoUrl={lesson.videoUrl}
          onProgress={handleProgress}
          initialProgress={progress?.progressPercent || 0}
        />

        {/* Lesson Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-2xl font-bold text-text-primary">
                {getLocalizedField(lesson, 'title', locale)}
              </h1>
              {isCompleted && (
                <Badge variant="green">{t('completed')}</Badge>
              )}
            </div>

            {lesson.descriptionRu && (
              <p className="text-text-secondary leading-relaxed mb-6">
                {getLocalizedField(lesson, 'description', locale)}
              </p>
            )}

            {/* Duration */}
            <div className="flex items-center gap-4 text-sm text-text-muted mb-6">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatDuration(lesson.durationMinutes)}
              </span>
              {lesson.isFree && <Badge variant="green">{locale === 'kz' ? 'Тегін' : 'Бесплатно'}</Badge>}
            </div>

            {/* Mark Complete Button */}
            {!isCompleted && (
              <Button onClick={handleMarkComplete} disabled={marking} className="mb-6">
                {marking ? '...' : t('markComplete')}
              </Button>
            )}

            {/* Progress Bar */}
            {progress && (
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-text-secondary">{locale === 'kz' ? 'Прогресс' : 'Прогресс'}</span>
                  <span className="text-accent-green">{progress.progressPercent}%</span>
                </div>
                <ProgressBar value={progress.progressPercent} />
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-6 border-t border-dark-border">
              {prevLesson ? (
                <Link href={`/lessons/${prevLesson.id}`}>
                  <Button variant="secondary" size="sm">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {t('prevLesson')}
                  </Button>
                </Link>
              ) : <div />}

              {nextLesson ? (
                <Link href={`/lessons/${nextLesson.id}`}>
                  <Button size="sm">
                    {t('nextLesson')}
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </Link>
              ) : <div />}
            </div>
          </div>

          {/* Sidebar - Course Lessons */}
          <div className="lg:col-span-1">
            <Card>
              <h3 className="font-semibold text-text-primary mb-4">
                {locale === 'kz' ? 'Курс бағдарламасы' : 'Программа курса'}
              </h3>
              <div className="space-y-1">
                {/* Will be populated from course lessons list */}
                <Link
                  href={`/courses/${lesson.course.slug}`}
                  className="block text-sm text-accent-green hover:underline"
                >
                  {locale === 'kz' ? 'Барлық сабақтарды көру' : 'Смотреть все уроки'}
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
