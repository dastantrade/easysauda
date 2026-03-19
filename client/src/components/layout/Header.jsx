'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Glass bar */}
      <div
        className="
          mx-auto mt-3 max-w-6xl px-3
          sm:px-4
        "
      >
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="
            glass-strong rounded-[18px] px-4
            shadow-[0_4px_32px_rgba(0,0,0,0.08),0_1px_0_rgba(255,255,255,1)_inset]
          "
        >
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <motion.div
                whileHover={{ scale: 1.08, rotate: 3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="
                  w-8 h-8 rounded-[10px] flex items-center justify-center
                  bg-gradient-to-b from-[#34C759] to-[#25A244]
                  shadow-[0_2px_8px_rgba(48,209,88,0.40),0_1px_0_rgba(255,255,255,0.30)_inset]
                "
              >
                <span className="text-white font-bold text-[13px] tracking-tight">ES</span>
              </motion.div>
              <span className="text-ink font-semibold text-[17px] tracking-tight">
                EasySauda
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              <NavLink href="/">{t('home')}</NavLink>
              <NavLink href="/courses">{t('courses')}</NavLink>

              {/* Locale toggle */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                onClick={switchLocale}
                className="
                  ml-1 px-3 py-1.5 text-xs font-semibold rounded-[8px]
                  bg-white/60 border border-glass-stroke
                  text-ink-tertiary hover:text-ink
                  transition-colors duration-150
                  shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_0_rgba(255,255,255,0.9)_inset]
                "
              >
                {locale === 'ru' ? 'KZ' : 'RU'}
              </motion.button>

              <div className="ml-2 flex items-center gap-2">
                {isAuthenticated ? (
                  <>
                    <Link href="/dashboard">
                      <Button variant="secondary" size="sm">{t('dashboard')}</Button>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-sm text-ink-muted hover:text-accent-red transition-colors duration-150 px-2 py-1"
                    >
                      {t('logout')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login">
                      <Button variant="ghost" size="sm">{t('login')}</Button>
                    </Link>
                    <Link href="/auth/register">
                      <Button size="sm">{t('register')}</Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>

            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              className="
                md:hidden w-9 h-9 flex items-center justify-center rounded-[10px]
                bg-white/60 border border-glass-stroke text-ink
                shadow-[0_1px_3px_rgba(0,0,0,0.06)]
              "
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <AnimatePresence mode="wait" initial={false}>
                  {mobileMenuOpen ? (
                    <motion.path
                      key="close"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                      strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <motion.path
                      key="menu"
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                      transition={{ duration: 0.2 }}
                      strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </AnimatePresence>
              </svg>
            </motion.button>
          </div>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="
                mt-2 glass-strong rounded-[18px] p-4
                shadow-[0_8px_40px_rgba(0,0,0,0.10),0_1px_0_rgba(255,255,255,1)_inset]
              "
            >
              <div className="flex flex-col gap-1">
                <MobileNavLink href="/" onClick={() => setMobileMenuOpen(false)}>
                  {t('home')}
                </MobileNavLink>
                <MobileNavLink href="/courses" onClick={() => setMobileMenuOpen(false)}>
                  {t('courses')}
                </MobileNavLink>

                <div className="border-t border-glass-stroke my-2" />

                <button
                  onClick={switchLocale}
                  className="text-left px-3 py-2.5 rounded-[10px] text-ink-tertiary hover:text-ink hover:bg-white/50 transition-all duration-150 text-[15px]"
                >
                  {locale === 'ru' ? 'Қазақша' : 'Русский'}
                </button>

                {isAuthenticated ? (
                  <>
                    <MobileNavLink href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                      {t('dashboard')}
                    </MobileNavLink>
                    <button
                      onClick={handleLogout}
                      className="text-left px-3 py-2.5 rounded-[10px] text-accent-red hover:bg-accent-red-soft transition-all duration-150 text-[15px]"
                    >
                      {t('logout')}
                    </button>
                  </>
                ) : (
                  <div className="flex gap-2 pt-1">
                    <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)} className="flex-1">
                      <Button variant="secondary" size="sm" className="w-full">{t('login')}</Button>
                    </Link>
                    <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)} className="flex-1">
                      <Button size="sm" className="w-full">{t('register')}</Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="
        px-3 py-2 rounded-[10px] text-[15px] text-ink-secondary
        hover:text-ink hover:bg-white/50
        transition-all duration-150
      "
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, children, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="
        px-3 py-2.5 rounded-[10px] text-[15px] text-ink-secondary
        hover:text-ink hover:bg-white/50
        transition-all duration-150
      "
    >
      {children}
    </Link>
  );
}
