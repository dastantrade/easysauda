'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import useAuthStore from '@/store/authStore';
import Button from '@/components/ui/Button';
import { useLocale } from 'next-intl';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const switchLocale = () => {
    const newLocale = locale === 'ru' ? 'kz' : 'ru';
    router.replace(pathname, { locale: newLocale });
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-xl border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent-green rounded-lg flex items-center justify-center">
              <span className="text-dark font-bold text-sm">ES</span>
            </div>
            <span className="text-text-primary font-bold text-xl">EasySauda</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-text-secondary hover:text-text-primary transition-colors">
              {t('home')}
            </Link>
            <Link href="/courses" className="text-text-secondary hover:text-text-primary transition-colors">
              {t('courses')}
            </Link>

            <button
              onClick={switchLocale}
              className="text-text-secondary hover:text-text-primary transition-colors text-sm border border-dark-border rounded-md px-2 py-1"
            >
              {locale === 'ru' ? 'KZ' : 'RU'}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link href="/dashboard">
                  <Button variant="secondary" size="sm">{t('dashboard')}</Button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-text-secondary hover:text-accent-red transition-colors text-sm"
                >
                  {t('logout')}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">{t('login')}</Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm">{t('register')}</Button>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-text-primary p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-dark-border mt-2 pt-4">
            <div className="flex flex-col gap-3">
              <Link href="/" className="text-text-secondary hover:text-text-primary py-2" onClick={() => setMobileMenuOpen(false)}>
                {t('home')}
              </Link>
              <Link href="/courses" className="text-text-secondary hover:text-text-primary py-2" onClick={() => setMobileMenuOpen(false)}>
                {t('courses')}
              </Link>

              <button onClick={switchLocale} className="text-text-secondary hover:text-text-primary py-2 text-left">
                {locale === 'ru' ? 'Қазақша' : 'Русский'}
              </button>

              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" className="text-text-secondary hover:text-text-primary py-2" onClick={() => setMobileMenuOpen(false)}>
                    {t('dashboard')}
                  </Link>
                  <button onClick={handleLogout} className="text-accent-red py-2 text-left">
                    {t('logout')}
                  </button>
                </>
              ) : (
                <div className="flex gap-3 pt-2">
                  <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="secondary" size="sm">{t('login')}</Button>
                  </Link>
                  <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button size="sm">{t('register')}</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
