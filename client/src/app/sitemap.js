const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://easysauda.kz';

const courseSlugs = [
  'osnovy-trejdinga',
  'tekhnicheskij-analiz',
  'upravlenie-riskami',
];

export default function sitemap() {
  const locales = ['ru', 'kz'];

  // Static pages
  const staticPages = ['', '/courses'];
  const staticEntries = [];

  for (const page of staticPages) {
    for (const locale of locales) {
      staticEntries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'daily',
        priority: page === '' ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map(l => [l, `${BASE_URL}/${l}${page}`])
          ),
        },
      });
    }
  }

  // Course pages
  const courseEntries = [];
  for (const slug of courseSlugs) {
    for (const locale of locales) {
      courseEntries.push({
        url: `${BASE_URL}/${locale}/courses/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
        alternates: {
          languages: Object.fromEntries(
            locales.map(l => [l, `${BASE_URL}/${l}/courses/${slug}`])
          ),
        },
      });
    }
  }

  return [...staticEntries, ...courseEntries];
}
