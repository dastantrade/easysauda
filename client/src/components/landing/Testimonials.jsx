'use client';

import { useTranslations } from 'next-intl';
import Card from '@/components/ui/Card';

const testimonials = [
  {
    name: 'Айдана К.',
    role: 'Студент',
    text: 'За 2 месяца обучения я научилась читать графики и сделала первые прибыльные сделки. Самое ценное — разборы реальных сделок преподавателя.',
    rating: 5,
  },
  {
    name: 'Нурлан М.',
    role: 'Студент',
    text: 'Наконец-то нормальный курс без обещаний "стань миллионером за неделю". Честный подход, фокус на рисках. Рекомендую всем новичкам.',
    rating: 5,
  },
  {
    name: 'Арман Б.',
    role: 'Студент',
    text: 'Прошёл базовый курс и сейчас на продвинутом. Telegram-чат с поддержкой — это мощно, всегда можно задать вопрос и получить ответ.',
    rating: 5,
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-dark-border'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const t = useTranslations('testimonials');

  return (
    <section className="py-20 bg-dark-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">{t('title')}</h2>
          <p className="text-text-secondary">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <Card key={index} className="flex flex-col">
              <StarRating rating={item.rating} />
              <p className="text-text-secondary mt-4 mb-6 flex-grow text-sm leading-relaxed">
                &ldquo;{item.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-dark-border">
                <div className="w-10 h-10 bg-accent-green/10 rounded-full flex items-center justify-center">
                  <span className="text-accent-green font-semibold text-sm">
                    {item.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="text-text-primary text-sm font-medium">{item.name}</div>
                  <div className="text-text-muted text-xs">{item.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
