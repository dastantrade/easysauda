'use client';

import { useLocale } from 'next-intl';

export function CourseJsonLd({ course }) {
  const locale = useLocale();
  const title = locale === 'kz' ? course.titleKz : course.titleRu;
  const description = locale === 'kz' ? course.descriptionKz : course.descriptionRu;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: title,
    description: description,
    provider: {
      '@type': 'Organization',
      name: 'EasySauda',
      sameAs: 'https://easysauda.kz',
    },
    offers: {
      '@type': 'Offer',
      price: Number(course.price),
      priceCurrency: 'KZT',
      availability: 'https://schema.org/InStock',
      url: `https://easysauda.kz/${locale}/courses/${course.slug}`,
    },
    educationalLevel: course.level === 'BEGINNER' ? 'Beginner'
      : course.level === 'INTERMEDIATE' ? 'Intermediate' : 'Advanced',
    inLanguage: locale === 'kz' ? 'kk' : 'ru',
    numberOfLessons: course.totalLessons,
    timeRequired: `PT${Number(course.totalDurationHours)}H`,
  };

  if (course.reviews?.length > 0) {
    const avgRating = course.reviews.reduce((sum, r) => sum + r.rating, 0) / course.reviews.length;
    jsonLd.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: Math.round(avgRating * 10) / 10,
      reviewCount: course.reviews.length,
      bestRating: 5,
      worstRating: 1,
    };

    jsonLd.review = course.reviews.slice(0, 5).map(r => ({
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: 5,
      },
      author: {
        '@type': 'Person',
        name: r.user?.name || 'Студент',
      },
      ...(r.comment ? { reviewBody: r.comment } : {}),
    }));
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function FAQJsonLd({ items }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'EasySauda',
    url: 'https://easysauda.kz',
    description: 'Платформа обучения трейдингу для начинающих',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Almaty',
      addressCountry: 'KZ',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'info@easysauda.kz',
      contactType: 'customer service',
      availableLanguage: ['Russian', 'Kazakh'],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebsiteJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'EasySauda',
    url: 'https://easysauda.kz',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://easysauda.kz/ru/courses?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
