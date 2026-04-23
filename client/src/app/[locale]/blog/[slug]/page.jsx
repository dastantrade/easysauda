'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';

function FvgChart() {
  const [cur, setCur] = useState(0);

  const steps = [
    {
      caption: 'Это обычное спокойное движение цены. Покупатели и продавцы в балансе — свечи небольшие, хаотичные.',
      show: [],
    },
    {
      caption: 'Свеча A — последняя «нормальная» свеча перед импульсом. Запомни её High (верхнюю тень) — это нижняя граница будущей зоны.',
      show: ['cA'],
    },
    {
      caption: 'Свеча B — мощный импульс вверх! Цена улетела так быстро, что никто не успел нормально наторговать. Свеча C — первая после импульса. Её Low = верхняя граница зоны.',
      show: ['cA', 'cB', 'cC'],
    },
    {
      caption: 'Голубая зона между High(A) и Low(C) — это и есть имбаланс (FVG). Там не было реальных сделок. Цена продолжает расти...',
      show: ['cA', 'cB', 'cC', 'fvg', 'after'],
    },
    {
      caption: 'Цена разворачивается и возвращается в зону FVG — это митигация. Коснулась зоны и отскочила вверх. Многие трейдеры входят именно здесь.',
      show: ['cA', 'cB', 'cC', 'fvg', 'after', 'mit'],
    },
  ];

  const ids = ['cA', 'cB', 'cC', 'fvg', 'after', 'mit'];
  const go = (dir) => setCur(prev => Math.max(0, Math.min(steps.length - 1, prev + dir)));
  const s = steps[cur];

  return (
    <div className="my-8 rounded-2xl p-6 sm:p-8" style={{ background: '#151820', border: '0.5px solid rgba(255,255,255,0.12)' }}>
      {/* Caption */}
      <div className="rounded-lg px-4 py-3 mb-5 text-sm leading-relaxed min-h-[56px]"
        style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)', color: '#b0b8c8' }}>
        {s.caption}
      </div>

      {/* Chart */}
      <svg viewBox="0 0 640 280" className="w-full rounded-lg">
        {/* Grid */}
        {[30, 80, 130, 180, 230].map(y => (
          <line key={y} x1="50" y1={y} x2="610" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>
        ))}
        <line x1="50" y1="30" x2="50" y2="250" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
        {/* Price labels */}
        {[['105',34],['100',84],['95',134],['90',184],['85',234]].map(([label, y]) => (
          <text key={y} fontSize="10" fill="rgba(255,255,255,0.25)" textAnchor="end" x="46" y={y} fontFamily="monospace">{label}</text>
        ))}
        {/* Base candles */}
        <line x1="80" y1="172" x2="80" y2="222" stroke="#ef4444" strokeWidth="1"/>
        <rect x="72" y="182" width="16" height="28" rx="2" fill="#ef4444"/>
        <line x1="110" y1="168" x2="110" y2="215" stroke="#22c87a" strokeWidth="1"/>
        <rect x="102" y="176" width="16" height="26" rx="2" fill="#22c87a"/>
        <line x1="140" y1="165" x2="140" y2="225" stroke="#ef4444" strokeWidth="1"/>
        <rect x="132" y="178" width="16" height="30" rx="2" fill="#ef4444"/>
        <line x1="170" y1="170" x2="170" y2="208" stroke="#22c87a" strokeWidth="1"/>
        <rect x="162" y="178" width="16" height="20" rx="2" fill="#22c87a"/>
        {/* Candle A */}
        <g style={{ opacity: s.show.includes('cA') ? 1 : 0, transition: 'opacity 0.45s' }}>
          <line x1="220" y1="165" x2="220" y2="220" stroke="#ef4444" strokeWidth="1"/>
          <rect x="212" y="175" width="16" height="32" rx="2" fill="#ef4444"/>
          <text fontSize="11" fill="rgba(255,255,255,0.4)" textAnchor="middle" x="220" y="158" fontFamily="monospace">A</text>
        </g>
        {/* Candle B (impulse) */}
        <g style={{ opacity: s.show.includes('cB') ? 1 : 0, transition: 'opacity 0.45s' }}>
          <line x1="265" y1="58" x2="265" y2="220" stroke="#22c87a" strokeWidth="1.5"/>
          <rect x="257" y="68" width="16" height="140" rx="2" fill="#22c87a"/>
          <text fontSize="11" fill="rgba(255,255,255,0.4)" textAnchor="middle" x="265" y="51" fontFamily="monospace">B</text>
          <text fontSize="10" fill="rgba(34,200,122,0.6)" textAnchor="middle" x="265" y="145" fontFamily="sans-serif">импульс</text>
        </g>
        {/* Candle C */}
        <g style={{ opacity: s.show.includes('cC') ? 1 : 0, transition: 'opacity 0.45s' }}>
          <line x1="310" y1="45" x2="310" y2="112" stroke="#22c87a" strokeWidth="1"/>
          <rect x="302" y="52" width="16" height="48" rx="2" fill="#22c87a"/>
          <text fontSize="11" fill="rgba(255,255,255,0.4)" textAnchor="middle" x="310" y="38" fontFamily="monospace">C</text>
        </g>
        {/* FVG zone */}
        <g style={{ opacity: s.show.includes('fvg') ? 1 : 0, transition: 'opacity 0.5s' }}>
          <rect x="212" y="100" width="398" height="75" fill="rgba(59,130,246,0.09)"/>
          <line x1="212" y1="100" x2="610" y2="100" stroke="rgba(59,130,246,0.5)" strokeWidth="1" strokeDasharray="5 4"/>
          <line x1="212" y1="175" x2="610" y2="175" stroke="rgba(59,130,246,0.5)" strokeWidth="1" strokeDasharray="5 4"/>
          <rect x="215" y="107" width="80" height="18" rx="3" fill="rgba(13,15,20,0.85)"/>
          <text fontSize="11" fontWeight="500" fill="#60a5fa" x="219" y="120" fontFamily="sans-serif">FVG — зона</text>
          <text fontSize="10" fill="rgba(255,255,255,0.2)" textAnchor="end" x="206" y="104" fontFamily="monospace">~98</text>
          <text fontSize="10" fill="rgba(255,255,255,0.2)" textAnchor="end" x="206" y="179" fontFamily="monospace">~91</text>
        </g>
        {/* After candles */}
        <g style={{ opacity: s.show.includes('after') ? 1 : 0, transition: 'opacity 0.45s' }}>
          <line x1="348" y1="38" x2="348" y2="85" stroke="#22c87a" strokeWidth="1"/>
          <rect x="340" y="45" width="16" height="32" rx="2" fill="#22c87a"/>
          <line x1="378" y1="32" x2="378" y2="75" stroke="#ef4444" strokeWidth="1"/>
          <rect x="370" y="38" width="16" height="28" rx="2" fill="#ef4444"/>
          <line x1="408" y1="34" x2="408" y2="72" stroke="#22c87a" strokeWidth="1"/>
          <rect x="400" y="40" width="16" height="26" rx="2" fill="#22c87a"/>
        </g>
        {/* Mitigation */}
        <g style={{ opacity: s.show.includes('mit') ? 1 : 0, transition: 'opacity 0.5s' }}>
          <line x1="438" y1="34" x2="438" y2="132" stroke="#ef4444" strokeWidth="1.5"/>
          <rect x="430" y="42" width="16" height="82" rx="2" fill="#ef4444"/>
          <line x1="468" y1="88" x2="468" y2="178" stroke="#ef4444" strokeWidth="1"/>
          <rect x="460" y="102" width="16" height="62" rx="2" fill="#ef4444"/>
          <line x1="498" y1="98" x2="498" y2="188" stroke="#ef4444" strokeWidth="1"/>
          <rect x="490" y="112" width="16" height="62" rx="2" fill="#ef4444"/>
          <line x1="528" y1="82" x2="528" y2="168" stroke="#22c87a" strokeWidth="1.5"/>
          <rect x="520" y="90" width="16" height="70" rx="2" fill="#22c87a"/>
          <line x1="558" y1="65" x2="558" y2="125" stroke="#22c87a" strokeWidth="1"/>
          <rect x="550" y="72" width="16" height="46" rx="2" fill="#22c87a"/>
          <rect x="468" y="186" width="72" height="18" rx="3" fill="rgba(13,15,20,0.9)"/>
          <text fontSize="11" fontWeight="500" fill="#60a5fa" x="472" y="199" fontFamily="sans-serif">митигация</text>
          <rect x="534" y="62" width="56" height="18" rx="3" fill="rgba(13,15,20,0.9)"/>
          <text fontSize="11" fontWeight="500" fill="#22c87a" x="538" y="75" fontFamily="sans-serif">отскок</text>
        </g>
      </svg>

      {/* Controls */}
      <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <span key={i} onClick={() => setCur(i)} className="cursor-pointer transition-all duration-300 rounded-full"
                style={{ width: 7, height: 7, display: 'inline-block', background: i === cur ? '#3b82f6' : 'rgba(255,255,255,0.15)', transform: i === cur ? 'scale(1.3)' : 'scale(1)' }} />
            ))}
          </div>
          <span className="text-[11px] font-mono text-white/30">шаг {cur + 1} / {steps.length}</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => go(-1)} disabled={cur === 0}
            className="text-xs px-4 py-1.5 rounded-lg border transition-colors disabled:opacity-30"
            style={{ border: '0.5px solid rgba(255,255,255,0.15)', background: 'transparent', color: '#e8eaf0', cursor: cur === 0 ? 'default' : 'pointer' }}>
            ← назад
          </button>
          <button onClick={() => go(1)} disabled={cur === steps.length - 1}
            className="text-xs px-4 py-1.5 rounded-lg border transition-colors disabled:opacity-30"
            style={{ border: '0.5px solid rgba(255,255,255,0.15)', background: 'transparent', color: '#e8eaf0', cursor: cur === steps.length - 1 ? 'default' : 'pointer' }}>
            вперёд →
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 flex-wrap mt-4 pt-4 text-xs text-white/35" style={{ borderTop: '0.5px solid rgba(255,255,255,0.08)' }}>
        <span className="flex items-center gap-1.5"><span style={{ width: 10, height: 10, borderRadius: 2, background: '#22c87a', display: 'inline-block' }}/> Бычья свеча</span>
        <span className="flex items-center gap-1.5"><span style={{ width: 10, height: 10, borderRadius: 2, background: '#ef4444', display: 'inline-block' }}/> Медвежья свеча</span>
        <span className="flex items-center gap-1.5"><span style={{ width: 10, height: 10, borderRadius: 2, background: 'rgba(59,130,246,0.35)', border: '1px dashed rgba(59,130,246,0.6)', display: 'inline-block' }}/> Зона FVG</span>
        <span className="ml-auto text-white/18 text-[11px]">A, C — соседние свечи · B — импульс</span>
      </div>
    </div>
  );
}

const articles = {
  'imbalan-fvg-smart-money': {
    tag: 'Smart Money',
    tagColor: 'text-blue-400',
    border: 'rgba(59,130,246,0.2)',
    title: 'Имбаланс (FVG): как умные деньги оставляют след на графике',
    date: '22 апр 2026',
    readTime: '4 мин',
    content: [
      {
        type: 'lead',
        text: 'Fair Value Gap (FVG) — один из ключевых концептов Smart Money. Это зона на графике, где цена двигалась так быстро, что между свечами образовался «пробел». Рынок почти всегда возвращается, чтобы закрыть его.',
      },
      {
        type: 'h2',
        text: 'Что такое имбаланс?',
      },
      {
        type: 'p',
        text: 'Имбаланс (он же FVG — Fair Value Gap, или «зона справедливой стоимости») — это область между тремя свечами, где High предыдущей свечи не перекрывается с Low следующей после импульса. Другими словами: цена прыгнула так резко, что там не было реальных двусторонних сделок.',
      },
      {
        type: 'p',
        text: 'Это не просто «пустое место» на графике. Это след институциональных игроков — крупных банков, фондов и маркетмейкеров, которые провернули большой объём за короткое время.',
      },
      {
        type: 'fvg-chart',
      },
      {
        type: 'h2',
        text: 'Как найти FVG: три свечи',
      },
      {
        type: 'list',
        items: [
          'Свеча A — последняя свеча перед импульсом. Запоминаем её High.',
          'Свеча B — мощный импульсный бар (бычий или медвежий). Тело большое, закрытие далеко от открытия.',
          'Свеча C — первая свеча после импульса. Запоминаем её Low.',
          'Зона FVG = от High(A) до Low(C). Если там есть пространство — это имбаланс.',
        ],
      },
      {
        type: 'callout',
        text: 'Правило: чем больше тело свечи B и чем крупнее таймфрейм — тем сильнее зона FVG. На M15 это шум. На H4 или D1 — серьёзный уровень.',
      },
      {
        type: 'h2',
        text: 'Почему цена возвращается в FVG?',
      },
      {
        type: 'p',
        text: 'Рынок — это механизм поиска баланса. Когда крупный игрок открывает огромную позицию, он создаёт дисбаланс. Позже рынок «закрывает» эту зону, чтобы предоставить возможность тем, кто не успел наторговать в момент импульса.',
      },
      {
        type: 'p',
        text: 'Процесс возврата в зону называется митигацией. После митигации зона либо «перезаряжается» (и цена продолжает движение в сторону импульса), либо пробивается — это сигнал смены тренда.',
      },
      {
        type: 'h2',
        text: 'Как торговать от FVG',
      },
      {
        type: 'list',
        items: [
          'Определи направление тренда на старшем таймфрейме (H4/D1).',
          'Найди FVG, образованный в направлении тренда.',
          'Жди возврата цены в зону — это твой вход.',
          'Стоп-лосс — за нижнюю/верхнюю границу зоны FVG.',
          'Тейк-профит — к ближайшему структурному уровню или в соотношении 1:2+.',
        ],
      },
      {
        type: 'callout',
        text: 'Важно: не каждый FVG отрабатывает. Лучшие зоны — те, что сформированы на смене структуры (BOS/CHoCH) в направлении старшего тренда. Именно там Smart Money набирают позиции.',
      },
      {
        type: 'h2',
        text: 'Бычий и медвежий FVG',
      },
      {
        type: 'p',
        text: 'Бычий FVG (Bullish FVG) — образован на импульсе вверх. Зона находится ниже текущей цены. Ищем лонг при возврате в зону.',
      },
      {
        type: 'p',
        text: 'Медвежий FVG (Bearish FVG) — образован на импульсе вниз. Зона выше текущей цены. Ищем шорт при возврате в зону.',
      },
    ],
  },

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
    case 'fvg-chart':
      return <FvgChart key={i} />;
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
