import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return {
    title: {
      template: '%s | EasySauda',
      default: locale === 'kz'
        ? 'EasySauda — Трейдинг оқу платформасы'
        : 'EasySauda — Платформа обучения трейдингу',
    },
    description: locale === 'kz'
      ? 'Жаңадан бастағандарға арналған трейдинг оқу платформасы. Нақты мәмілелер, тәуекелдерді басқару, тәжірибе.'
      : 'Платформа обучения трейдингу для начинающих. Реальные сделки, управление рисками, практика.',
    openGraph: {
      title: 'EasySauda',
      description: locale === 'kz'
        ? 'Биржада сауда жасауды үйреніңіз'
        : 'Научитесь торговать на бирже',
      type: 'website',
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
    <html lang={locale}>
      <body>
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
