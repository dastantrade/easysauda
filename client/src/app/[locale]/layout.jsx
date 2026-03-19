import localFont from 'next/font/local';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  display: 'swap',
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://easysauda.kz';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const altLocale = locale === 'ru' ? 'kz' : 'ru';

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      template: '%s | EasySauda',
      default: locale === 'kz'
        ? 'EasySauda — Трейдинг оқу платформасы'
        : 'EasySauda — Платформа обучения трейдингу',
    },
    description: locale === 'kz'
      ? 'Жаңадан бастағандарға арналған трейдинг оқу платформасы. Нақты мәмілелер, тәуекелдерді басқару, тәжірибе.'
      : 'Платформа обучения трейдингу для начинающих. Реальные сделки, управление рисками, практика.',
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        'ru': `${BASE_URL}/ru`,
        'kk': `${BASE_URL}/kz`,
        'x-default': `${BASE_URL}/ru`,
      },
    },
    openGraph: {
      title: locale === 'kz'
        ? 'EasySauda — Биржада сауда жасауды үйреніңіз'
        : 'EasySauda — Научитесь торговать на бирже',
      description: locale === 'kz'
        ? 'Жаңадан бастағандарға арналған трейдинг оқу платформасы'
        : 'Платформа обучения трейдингу для начинающих',
      type: 'website',
      siteName: 'EasySauda',
      locale: locale === 'kz' ? 'kk_KZ' : 'ru_RU',
      url: `${BASE_URL}/${locale}`,
      images: [
        {
          url: `${BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'EasySauda — Trading Education Platform',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: locale === 'kz'
        ? 'EasySauda — Биржада сауда жасауды үйреніңіз'
        : 'EasySauda — Научитесь торговать на бирже',
      description: locale === 'kz'
        ? 'Жаңадан бастағандарға арналған трейдинг оқу платформасы'
        : 'Платформа обучения трейдингу для начинающих',
      images: [`${BASE_URL}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale === 'kz' ? 'kk' : locale} className={geistSans.variable}>
      <body className={geistSans.className}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
