import { getTranslations } from 'next-intl/server';
import Hero from '@/components/landing/Hero';
import About from '@/components/landing/About';
import CourseCards from '@/components/landing/CourseCards';
import Testimonials from '@/components/landing/Testimonials';
import FAQ from '@/components/landing/FAQ';
import CTA from '@/components/landing/CTA';
import { OrganizationJsonLd, WebsiteJsonLd } from '@/components/seo/JsonLd';
import FAQJsonLdWrapper from '@/components/seo/FAQJsonLdWrapper';

export default async function HomePage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faq' });

  const faqItems = [
    { question: t('q1'), answer: t('a1') },
    { question: t('q2'), answer: t('a2') },
    { question: t('q3'), answer: t('a3') },
    { question: t('q4'), answer: t('a4') },
  ];

  return (
    <>
      <OrganizationJsonLd />
      <WebsiteJsonLd />
      <FAQJsonLdWrapper items={faqItems} />
      <Hero />
      <About />
      <CourseCards />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
