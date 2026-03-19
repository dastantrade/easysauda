'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { Link, useRouter } from '@/i18n/routing';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { formatPrice, getLocalizedField } from '@/lib/utils';
import api from '@/lib/api';

export default function CheckoutPage() {
  const locale = useLocale();
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('STRIPE');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/courses/${params.courseId}`)
      .then(res => setCourse(res.data))
      .catch(() => setError(locale === 'kz' ? 'Курс табылмады' : 'Курс не найден'))
      .finally(() => setLoading(false));
  }, [params.courseId, locale]);

  const handleCheckout = async () => {
    setProcessing(true);
    setError('');

    try {
      const { data } = await api.post('/payments/create-checkout', {
        courseId: course.id,
        paymentMethod,
      });

      // For dev: auto-confirm
      await api.post('/payments/confirm', { enrollmentId: data.enrollmentId });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || (locale === 'kz' ? 'Төлем қатесі' : 'Ошибка оплаты'));
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="animate-spin w-8 h-8 border-2 border-accent-green border-t-transparent rounded-full mx-auto" />
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
        <Card className="max-w-md w-full text-center p-8">
          <div className="w-16 h-16 bg-accent-green/10 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            {locale === 'kz' ? 'Төлем сәтті!' : 'Оплата прошла успешно!'}
          </h1>
          <p className="text-text-secondary mb-6">
            {locale === 'kz'
              ? 'Курсқа қол жеткізу ашылды. Оқуды бастаңыз!'
              : 'Доступ к курсу открыт. Начинайте обучение!'}
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/dashboard">
              <Button>{locale === 'kz' ? 'Менің курстарым' : 'Мои курсы'}</Button>
            </Link>
            <Link href={`/courses/${course?.slug || ''}`}>
              <Button variant="secondary">{locale === 'kz' ? 'Курсқа өту' : 'Перейти к курсу'}</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
      <Card className="max-w-lg w-full p-8">
        <h1 className="text-2xl font-bold text-text-primary mb-6">
          {locale === 'kz' ? 'Төлем' : 'Оформление оплаты'}
        </h1>

        {error && (
          <div className="bg-accent-red/10 border border-accent-red/20 text-accent-red px-4 py-3 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}

        {/* Course Summary */}
        {course && (
          <div className="bg-dark rounded-lg p-4 border border-dark-border mb-6">
            <h3 className="font-semibold text-text-primary mb-1">
              {getLocalizedField(course, 'title', locale)}
            </h3>
            <p className="text-text-secondary text-sm mb-3">
              {course.totalLessons} {locale === 'kz' ? 'сабақ' : 'уроков'} · {Number(course.totalDurationHours)} {locale === 'kz' ? 'сағат' : 'часов'}
            </p>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-accent-green">{formatPrice(course.price)}</span>
              {course.originalPrice && (
                <span className="text-text-muted line-through">{formatPrice(course.originalPrice)}</span>
              )}
              {course.originalPrice && (
                <Badge variant="green">
                  -{Math.round((1 - Number(course.price) / Number(course.originalPrice)) * 100)}%
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Payment Method */}
        <div className="mb-6">
          <label className="block text-sm text-text-secondary mb-3">
            {locale === 'kz' ? 'Төлем әдісі' : 'Способ оплаты'}
          </label>
          <div className="space-y-2">
            {[
              { value: 'STRIPE', label: 'Банковская карта (Stripe)', labelKz: 'Банк картасы (Stripe)' },
              { value: 'KASPI', label: 'Kaspi QR / Kaspi Gold', labelKz: 'Kaspi QR / Kaspi Gold' },
            ].map(method => (
              <button
                key={method.value}
                onClick={() => setPaymentMethod(method.value)}
                className={`w-full flex items-center gap-3 p-4 rounded-lg border transition-colors text-left
                  ${paymentMethod === method.value
                    ? 'border-accent-green bg-accent-green/5'
                    : 'border-dark-border hover:border-dark-hover bg-dark-card'
                  }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${paymentMethod === method.value ? 'border-accent-green' : 'border-dark-border'}`}
                >
                  {paymentMethod === method.value && (
                    <div className="w-2.5 h-2.5 rounded-full bg-accent-green" />
                  )}
                </div>
                <span className="text-text-primary text-sm">
                  {locale === 'kz' ? method.labelKz : method.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <Button size="lg" className="w-full" onClick={handleCheckout} disabled={processing}>
          {processing ? '...' : (locale === 'kz' ? `Төлеу ${formatPrice(course?.price || 0)}` : `Оплатить ${formatPrice(course?.price || 0)}`)}
        </Button>

        <p className="text-xs text-text-muted text-center mt-4">
          {locale === 'kz'
            ? 'Төлем қауіпсіз. Деректеріңіз қорғалған.'
            : 'Безопасная оплата. Ваши данные защищены.'}
        </p>
      </Card>
    </div>
  );
}
