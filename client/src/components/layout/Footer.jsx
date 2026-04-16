'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');

  return (
    <footer style={{ background: '#08090E', borderTop: '1px solid rgba(255,255,255,0.06)' }} className="mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand + реквизиты */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-[10px] flex items-center justify-center bg-gradient-to-br from-[#00D4AA] to-[#00A882] shadow-[0_2px_12px_rgba(0,212,170,0.4)]">
                <span className="text-[#08090E] font-bold text-[13px] tracking-tight">ES</span>
              </div>
              <span className="text-white font-semibold text-[17px] tracking-tight">EasySauda</span>
            </div>

            <p className="text-white/35 text-sm leading-relaxed mb-6 max-w-xs">
              {t('description')}
            </p>

            {/* Реквизиты */}
            <div className="space-y-1.5">
              <p className="text-white/55 text-xs font-semibold uppercase tracking-widest font-mono mb-2">{t('sectionRekvizity')}</p>
              <p className="text-white/35 text-xs">ИП Талғатханұлы Дастан</p>
              <p className="text-white/35 text-xs">БИН: 920921300544</p>
              <p className="text-white/35 text-xs">
                {t('phone')}:{' '}
                <a href="tel:87074940133" className="hover:text-accent-green transition-colors">
                  8 707 494 01 33
                </a>
              </p>
              <p className="text-white/35 text-xs">
                Email:{' '}
                <a href="mailto:dtalgatkhanuly@gmail.com" className="hover:text-accent-green transition-colors">
                  dtalgatkhanuly@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white/55 text-xs font-semibold uppercase tracking-widest font-mono mb-4">{t('sectionNav')}</h3>
            <ul className="space-y-2.5">
              <li><Link href="/" className="text-white/40 hover:text-accent-green text-sm transition-colors">{nav('home')}</Link></li>
              <li><Link href="/courses" className="text-white/40 hover:text-accent-green text-sm transition-colors">{nav('courses')}</Link></li>
              <li><Link href="/blog" className="text-white/40 hover:text-accent-green text-sm transition-colors">{nav('blog')}</Link></li>
              <li><Link href="/privacy" className="text-white/40 hover:text-accent-green text-sm transition-colors">{t('privacy')}</Link></li>
              <li><Link href="/oferta" className="text-white/40 hover:text-accent-green text-sm transition-colors">{t('oferta')}</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white/55 text-xs font-semibold uppercase tracking-widest font-mono mb-4">{t('sectionSocial')}</h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://t.me/dastan_talgatkhanuly"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-white/40 hover:text-accent-green transition-colors text-sm"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                Telegram
              </a>

              <a
                href="https://www.tiktok.com/@just_dastan?_r=1&_t=ZS-95ZQwd2HTI0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-white/40 hover:text-accent-green transition-colors text-sm"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
                </svg>
                TikTok
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} EasySauda. {t('rights')}.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-white/20 hover:text-white/50 text-xs transition-colors">
              {t('confidentiality')}
            </Link>
            <Link href="/oferta" className="text-white/20 hover:text-white/50 text-xs transition-colors">
              {t('ofertaShort')}
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
