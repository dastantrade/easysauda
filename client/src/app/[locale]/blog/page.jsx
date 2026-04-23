'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';

export const posts = [
  {
    slug: 'imbalan-fvg-smart-money',
    tag: 'Smart Money',
    title: 'Имбаланс (FVG): как умные деньги оставляют след на графике',
    excerpt: 'Что такое Fair Value Gap, как его найти и почему цена почти всегда возвращается в эту зону. Пошаговый интерактивный разбор с графиком.',
    readTime: '4 мин',
    date: '22 апр 2026',
    color: 'rgba(59,130,246,0.08)',
    border: 'rgba(59,130,246,0.20)',
    tagColor: 'text-blue-400',
  },
  {
    slug: 'matematika-trejdinga-rr',
    tag: 'Математика трейдинга',
    title: 'RR 1:2 и 1:3: почему соотношение риск/прибыль решает всё',
    excerpt: 'Как система Ван Тарпа объясняет, почему трейдер может терять 60% сделок и всё равно зарабатывать. Разбираем математику на конкретных примерах.',
    readTime: '5 мин',
    date: '12 апр 2026',
    color: 'rgba(0,212,170,0.12)',
    border: 'rgba(0,212,170,0.25)',
    tagColor: 'text-accent-green',
  },
  {
    slug: 'psihologiya-tilt-fomo',
    tag: 'Психология',
    title: 'Тильт и FOMO: два врага трейдера, которых не видно на графике',
    excerpt: 'Почему эмоции убивают прибыльные системы и как распознать тильт и FOMO до того, как они сольют депозит. Практические техники контроля.',
    readTime: '6 мин',
    date: '10 апр 2026',
    color: 'rgba(0,100,255,0.08)',
    border: 'rgba(0,100,255,0.20)',
    tagColor: 'text-blue-400',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen py-20 px-4" style={{ background: '#08090E' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 35% at 50% 10%, rgba(0,212,170,0.05) 0%, transparent 70%)' }} />

      <div className="relative max-w-3xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-accent-green/20 bg-accent-green/[0.06] text-accent-green text-[11px] font-mono tracking-widest uppercase mb-4">
            Блог
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">Статьи о трейдинге</h1>
          <p className="text-white/40 text-lg">Без воды — только то, что работает на рынке.</p>
        </motion.div>

        {/* Posts */}
        <div className="flex flex-col gap-4">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <motion.div
                  className="group relative rounded-2xl p-6 sm:p-8 cursor-pointer"
                  style={{ background: post.color, border: `1px solid ${post.border}` }}
                  whileHover={{ scale: 1.01, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <span className={`text-[11px] font-mono font-bold tracking-widest uppercase ${post.tagColor}`}>
                      {post.tag}
                    </span>
                    <span className="text-white/25 text-xs flex-shrink-0">{post.date} · {post.readTime}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-snug group-hover:text-accent-green transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-white/45 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-1.5 text-accent-green text-sm font-semibold">
                    Читать
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
