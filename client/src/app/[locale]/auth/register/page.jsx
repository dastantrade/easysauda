'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import useAuthStore from '@/store/authStore';

export default function RegisterPage() {
  const t = useTranslations('auth');
  const locale = useLocale();
  const router = useRouter();
  const { register } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError(locale === 'kz' ? 'Құпия сөздер сәйкес келмейді' : 'Пароли не совпадают');
      return;
    }

    setLoading(true);

    try {
      await register(name, email, password, locale);
      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-text-primary text-center mb-8">{t('registerTitle')}</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-accent-red/10 border border-accent-red/20 text-accent-red px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <Input
            label={t('name')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={locale === 'kz' ? 'Сіздің атыңыз' : 'Ваше имя'}
            required
          />

          <Input
            label={t('email')}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            required
          />

          <Input
            label={t('password')}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••"
            required
          />

          <Input
            label={t('confirmPassword')}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••"
            required
          />

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? '...' : t('registerButton')}
          </Button>
        </form>

        <p className="text-center text-text-secondary text-sm mt-6">
          {t('hasAccount')}{' '}
          <Link href="/auth/login" className="text-accent-green hover:underline">
            {t('loginButton')}
          </Link>
        </p>
      </Card>
    </div>
  );
}
