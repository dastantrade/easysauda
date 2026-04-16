'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';

const sections = [
  {
    title: '1. Общие положения',
    content: `Настоящая Политика конфиденциальности регулирует порядок обработки и защиты персональных данных пользователей сайта EasySauda (далее — «Сайт»), принадлежащего ИП Талғатханұлы Дастан (БИН 920921300544).

Используя Сайт, вы соглашаетесь с условиями настоящей Политики. Если вы не согласны с условиями, пожалуйста, прекратите использование Сайта.`,
  },
  {
    title: '2. Какие данные мы собираем',
    content: `При использовании Сайта мы можем собирать следующие данные:

• Имя и фамилия — при регистрации или заполнении формы
• Адрес электронной почты — для связи и уведомлений
• Номер телефона — при оставлении заявки
• Технические данные — IP-адрес, тип браузера, страницы посещений (в обезличенном виде через аналитику)

Мы не собираем платёжные данные напрямую — все транзакции обрабатываются защищёнными платёжными системами.`,
  },
  {
    title: '3. Цели обработки данных',
    content: `Ваши персональные данные используются исключительно для:

• Обеспечения доступа к обучающим материалам
• Связи с вами по вопросам обучения
• Отправки уведомлений об обновлениях курсов (только при наличии согласия)
• Улучшения качества сервиса

Мы не продаём, не передаём и не сдаём в аренду ваши данные третьим лицам без вашего согласия.`,
  },
  {
    title: '4. Хранение данных',
    content: `Персональные данные хранятся на защищённых серверах. Мы принимаем технические и организационные меры для защиты ваших данных от несанкционированного доступа, изменения, раскрытия или уничтожения.

Данные хранятся в течение срока, необходимого для выполнения целей обработки, или до момента отзыва согласия пользователем.`,
  },
  {
    title: '5. Права пользователя',
    content: `Вы имеете право:

• Запросить информацию о хранящихся данных о вас
• Потребовать исправления неточных данных
• Потребовать удаления ваших данных
• Отозвать согласие на обработку данных в любое время

Для реализации своих прав свяжитесь с нами по email: dtalgatkhanuly@gmail.com`,
  },
  {
    title: '6. Cookies',
    content: `Сайт может использовать файлы cookie для улучшения пользовательского опыта. Cookie — это небольшие текстовые файлы, которые сохраняются в вашем браузере.

Вы можете отключить cookie в настройках браузера, однако это может повлиять на функциональность Сайта.`,
  },
  {
    title: '7. Изменения в политике',
    content: `Мы оставляем за собой право изменять настоящую Политику конфиденциальности. Актуальная версия всегда доступна на данной странице. Продолжение использования Сайта после изменений означает ваше согласие с обновлённой Политикой.`,
  },
  {
    title: '8. Контакты',
    content: `По вопросам, связанным с обработкой персональных данных:

ИП Талғатханұлы Дастан
БИН: 920921300544
Email: dtalgatkhanuly@gmail.com
Телефон: 8 707 494 01 33
Telegram: @dastan_talgatkhanuly`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-24 px-4" style={{ background: '#08090E' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 25% at 50% 5%, rgba(0,212,170,0.04) 0%, transparent 70%)' }} />

      <div className="relative max-w-2xl mx-auto">

        {/* Back */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          <Link href="/" className="inline-flex items-center gap-2 text-white/30 text-sm hover:text-white/60 transition-colors mb-10">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11 7H3M6 4L3 7l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            На главную
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-accent-green/20 bg-accent-green/[0.06] text-accent-green text-[11px] font-mono tracking-widest uppercase mb-4">
            Юридические документы
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-3">
            Политика конфиденциальности
          </h1>
          <p className="text-white/35 text-sm">Последнее обновление: апрель 2026</p>
          <div className="h-px w-full mt-6" style={{ background: 'linear-gradient(to right, rgba(0,212,170,0.2), transparent)' }} />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-8"
        >
          {sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-lg font-bold text-white mb-3">{section.title}</h2>
              <p className="text-white/45 text-sm leading-relaxed whitespace-pre-line">{section.content}</p>
            </div>
          ))}
        </motion.div>

        {/* Bottom nav */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 pt-8 flex gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <Link href="/oferta" className="text-accent-green text-sm hover:underline">
            Договор публичной оферты →
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
