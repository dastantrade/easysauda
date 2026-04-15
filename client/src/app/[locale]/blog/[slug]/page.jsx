'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';

const articles = {
  'matematika-trejdinga-rr': {
    tag: 'Математика трейдинга',
    tagColor: 'text-accent-green',
    border: 'rgba(0,212,170,0.15)',
    title: 'RR 1:2 и 1:3: почему соотношение риск/прибыль решает всё',
    date: '12 апр 2026',
    readTime: '5 мин',
    content: [
      {
        type: 'lead',
        text: 'Большинство начинающих трейдеров думают, что главное — процент выигрышных сделок. Это миф. Ван Тарп, один из лучших тренеров трейдеров в мире, доказал математически: важно не КАК ЧАСТО ты прав, а СКОЛЬКО ты зарабатываешь когда прав и СКОЛЬКО теряешь когда ошибаешься.',
      },
      {
        type: 'h2',
        text: 'Что такое RR (Risk/Reward)?',
      },
      {
        type: 'p',
        text: 'RR — это соотношение потенциальной прибыли к риску в одной сделке. RR 1:2 означает: ты рискуешь $100, чтобы заработать $200. RR 1:3 — рискуешь $100, чтобы заработать $300.',
      },
      {
        type: 'callout',
        text: 'Формула: если ты торгуешь с RR 1:2 и выигрываешь всего 40% сделок — ты в плюсе. Потому что 40 выигрышей × $200 = $8000, а 60 проигрышей × $100 = $6000. Итог: +$2000.',
      },
      {
        type: 'h2',
        text: 'Система Ван Тарпа: R-кратность',
      },
      {
        type: 'p',
        text: 'Ван Тарп ввёл понятие R — единица риска. Одна R — это сумма, которую ты рискуешь в сделке. Все результаты измеряются в R. Выиграл $200 при риске $100 — это +2R. Проиграл $100 — это −1R.',
      },
      {
        type: 'p',
        text: 'Гениальность системы в том, что она убирает влияние размера счёта. Неважно, торгуешь ты с $1000 или $100 000 — ты считаешь в R и видишь реальную эффективность своей системы.',
      },
      {
        type: 'h2',
        text: 'Сравнение RR 1:2 vs RR 1:3',
      },
      {
        type: 'table',
        rows: [
          ['Система', 'Винрейт', 'Сделок', 'Итог (в R)'],
          ['RR 1:2', '40%', '100', '+20R'],
          ['RR 1:2', '50%', '100', '+50R'],
          ['RR 1:3', '35%', '100', '+40R'],
          ['RR 1:3', '40%', '100', '+70R'],
        ],
      },
      {
        type: 'h2',
        text: 'Практический вывод',
      },
      {
        type: 'p',
        text: 'Не гонись за высоким винрейтом. Ищи сетапы с хорошим RR. Правильно поставленный стоп и реалистичный тейк — это половина успеха. Вторая половина — дисциплина.',
      },
      {
        type: 'callout',
        text: 'Правило: не входи в сделку, если потенциальный RR меньше 1:2. Исключений нет.',
      },
    ],
  },

  'psihologiya-tilt-fomo': {
    tag: 'Психология',
    tagColor: 'text-blue-400',
    border: 'rgba(0,100,255,0.15)',
    title: 'Тильт и FOMO: два врага трейдера, которых не видно на графике',
    date: '10 апр 2026',
    readTime: '6 мин',
    content: [
      {
        type: 'lead',
        text: 'Ты можешь знать всю техническую аналитику, иметь прибыльную систему и правильный риск-менеджмент — и всё равно слить депозит. Причина — психология. Тильт и FOMO убивают больше счетов, чем плохие стратегии.',
      },
      {
        type: 'h2',
        text: 'Что такое тильт?',
      },
      {
        type: 'p',
        text: 'Тильт — это эмоциональное состояние, когда после серии потерь (или неожиданной прибыли) трейдер начинает принимать иррациональные решения. Термин пришёл из покера.',
      },
      {
        type: 'p',
        text: 'Признаки тильта: ты увеличиваешь размер позиции после убытка, чтобы «отыграться». Открываешь сделки без сетапа. Игнорируешь стоп-лосс. Торгуешь инструменты, которые обычно не трогаешь.',
      },
      {
        type: 'callout',
        text: 'Тильт — это не слабость характера. Это нейробиология. Потеря денег активирует те же зоны мозга, что и физическая боль. Твой мозг буквально пытается «остановить боль» любыми средствами.',
      },
      {
        type: 'h2',
        text: 'Что такое FOMO?',
      },
      {
        type: 'p',
        text: 'FOMO (Fear Of Missing Out) — страх упустить движение. Ты видишь, как цена улетает без тебя, и прыгаешь в рынок уже на хаях. Или видишь «очевидный» тренд и входишь без подтверждения.',
      },
      {
        type: 'p',
        text: 'FOMO особенно опасен на волатильных рынках — именно тогда, когда кажется, что «поезд уходит». На самом деле поезд уже ушёл, и ты покупаешь у тех, кто фиксирует прибыль.',
      },
      {
        type: 'h2',
        text: 'Как с этим бороться',
      },
      {
        type: 'list',
        items: [
          'Дневной лимит убытков. Потерял 2R за день — стоп, закрыл платформу.',
          'Торговый журнал. Записывай каждую сделку и своё эмоциональное состояние перед входом.',
          'Правило паузы. После стопа — 10 минут перерыва минимум.',
          'Чеклист перед входом. 3–5 пунктов, которые должны совпасть. Нет совпадения — нет сделки.',
          'Принять: пропустить сделку — это нормально. Следующая возможность будет всегда.',
        ],
      },
      {
        type: 'h2',
        text: 'Главный вывод',
      },
      {
        type: 'p',
        text: 'Рынок даёт деньги не тому, кто умнее. Он даёт деньги тому, кто дисциплинированнее. Система без психологии — это машина без водителя.',
      },
      {
        type: 'callout',
        text: 'Лучший индикатор твоей торговли — не винрейт, не прибыль. Это способность не нарушить правила в момент, когда очень хочется.',
      },
    ],
  },
};

function renderContent(block, i) {
  switch (block.type) {
    case 'lead':
      return <p key={i} className="text-lg sm:text-xl text-white/70 leading-relaxed mb-8 font-light">{block.text}</p>;
    case 'h2':
      return <h2 key={i} className="text-xl sm:text-2xl font-bold text-white mt-10 mb-4">{block.text}</h2>;
    case 'p':
      return <p key={i} className="text-white/55 leading-relaxed mb-4">{block.text}</p>;
    case 'callout':
      return (
        <div key={i} className="my-6 px-5 py-4 rounded-xl"
          style={{ background: 'rgba(0,212,170,0.07)', borderLeft: '3px solid rgba(0,212,170,0.6)' }}>
          <p className="text-white/80 text-sm leading-relaxed">{block.text}</p>
        </div>
      );
    case 'list':
      return (
        <ul key={i} className="space-y-3 mb-6">
          {block.items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-white/55 text-sm leading-relaxed">
              <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-green/60" />
              {item}
            </li>
          ))}
        </ul>
      );
    case 'table':
      return (
        <div key={i} className="my-6 overflow-x-auto rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
          <table className="w-full text-sm">
            {block.rows.map((row, j) => (
              <tr key={j} style={{ borderBottom: j < block.rows.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                {row.map((cell, k) => (
                  j === 0
                    ? <th key={k} className="px-4 py-3 text-left text-[11px] font-mono tracking-widest uppercase text-white/30">{cell}</th>
                    : <td key={k} className={`px-4 py-3 ${k === 0 ? 'text-white/70 font-semibold' : 'text-white/50'}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </table>
        </div>
      );
    default:
      return null;
  }
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug;
  const article = articles[slug];

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#08090E' }}>
        <div className="text-center">
          <p className="text-white/40 mb-4">Статья не найдена</p>
          <Link href="/blog" className="text-accent-green text-sm">← Назад к блогу</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4" style={{ background: '#08090E' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 30% at 50% 5%, rgba(0,212,170,0.04) 0%, transparent 70%)' }} />

      <div className="relative max-w-2xl mx-auto">

        {/* Back */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/30 text-sm hover:text-white/60 transition-colors mb-10">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11 7H3M6 4L3 7l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Все статьи
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className={`text-[11px] font-mono font-bold tracking-widest uppercase ${article.tagColor}`}>
              {article.tag}
            </span>
            <span className="text-white/20 text-xs">{article.date} · {article.readTime}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-6">
            {article.title}
          </h1>
          <div className="h-px w-full" style={{ background: `linear-gradient(to right, ${article.border}, transparent)` }} />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {article.content.map((block, i) => renderContent(block, i))}
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 rounded-2xl p-6 text-center"
          style={{ background: 'rgba(0,212,170,0.06)', border: '1px solid rgba(0,212,170,0.18)' }}
        >
          <p className="text-white/60 text-sm mb-4">Хочешь научиться торговать по системе?</p>
          <a
            href="https://t.me/dastan_talgatkhanuly"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent-green text-[#08090E] font-bold px-5 py-2.5 rounded-xl text-sm"
          >
            Записаться на обучение →
          </a>
        </motion.div>

      </div>
    </div>
  );
}
