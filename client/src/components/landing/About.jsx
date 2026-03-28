'use client';

import { useRef, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';

// Number odometer hook — counts up when entering viewport
function useCountUp(target, suffix = '', duration = 1600) {
  const [display, setDisplay] = useState('0' + suffix);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const numeric = parseInt(target.replace(/\D/g, ''), 10);
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(eased * numeric);
      setDisplay(String(current) + suffix);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, target, suffix, duration]);

  return [display, ref];
}

function OdometerStat({ value, rawNum, suf, label, prefix }) {
  const [count, ref] = useCountUp(rawNum ?? '0', suf, 1600);

  return (
    <div ref={ref} className="text-center p-4">
      <div className="text-2xl sm:text-3xl font-bold text-accent-green tabular-nums font-mono">
        {rawNum === null ? value : (prefix ? `${prefix}${count}` : count)}
      </div>
      <div className="text-xs text-white/45 mt-1">{label}</div>
    </div>
  );
}

/* ── Stacking Photo Gallery ─────────────────────────────────── */

// Grain SVG filter (defined once, hidden)
function GrainDef() {
  return (
    <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
      <defs>
        <filter id="about-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" result="noise"/>
          <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise"/>
          <feComposite in="grayNoise" in2="SourceGraphic" operator="in" result="maskedNoise"/>
          <feBlend in="SourceGraphic" in2="maskedNoise" mode="overlay"/>
        </filter>
      </defs>
    </svg>
  );
}

const photos = [
  {
    src: '/about/cert.jpg',
    alt: 'Сертификат Topstep Funded Trader',
    rotate: -11,
    tx: -52,
    ty: 18,
    scale: 0.84,
    brightness: 0.45,
    zIndex: 0,
  },
  {
    src: '/about/payouts.jpg',
    alt: 'Выплаты с проп-счёта',
    rotate: -4,
    tx: -22,
    ty: 7,
    scale: 0.91,
    brightness: 0.62,
    zIndex: 1,
  },
  {
    src: '/about/chart.jpg',
    alt: 'Реальная сделка на графике',
    rotate: 4,
    tx: 18,
    ty: 5,
    scale: 0.95,
    brightness: 0.78,
    zIndex: 2,
  },
  {
    src: '/about/desk.jpg',
    alt: 'За рабочим местом',
    rotate: 1,
    tx: 0,
    ty: 0,
    scale: 1.0,
    brightness: 1.0,
    zIndex: 3,
  },
];

function StackingGallery() {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className="relative w-full flex items-center justify-center" style={{ height: 380 }}>
      <GrainDef />

      {photos.map((photo, i) => {
        // Fan out wider on hover
        const fanMult = hovered ? 1.6 : 1;
        const tx = photo.tx * fanMult;
        const ty = hovered ? photo.ty * 0.5 : photo.ty;
        const scale = hovered ? (photo.scale + (i === 3 ? 0.02 : -0.01)) : photo.scale;
        const brightness = hovered ? Math.min(photo.brightness + 0.15, 1) : photo.brightness;

        return (
          <motion.div
            key={photo.src}
            className="absolute cursor-pointer"
            style={{ zIndex: photo.zIndex }}
            initial={{ opacity: 0, scale: 0.85, rotate: photo.rotate }}
            animate={inView ? {
              opacity: 1,
              scale,
              rotate: photo.rotate,
              x: tx,
              y: ty,
            } : {}}
            whileHover={{ zIndex: 10, scale: 1.04 }}
            transition={{
              delay: 0.08 * i,
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* Card shell */}
            <div
              className="relative overflow-hidden"
              style={{
                width: 240,
                height: 290,
                borderRadius: 20,
                boxShadow: photo.zIndex === 3
                  ? '0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,212,170,0.18)'
                  : '0 12px 32px rgba(0,0,0,0.45)',
              }}
            >
              {/* Photo */}
              <img
                src={photo.src}
                alt={photo.alt}
                draggable={false}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: `brightness(${brightness}) url(#about-grain)`,
                  userSelect: 'none',
                }}
                onError={(e) => {
                  // Fallback: show placeholder if image missing
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement.style.background = 'rgba(255,255,255,0.04)';
                }}
              />

              {/* Brand tint overlay — cool teal/blue shift */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(160deg, rgba(0,212,170,0.10) 0%, rgba(0,80,180,0.12) 100%)',
                  mixBlendMode: 'color',
                }}
              />

              {/* Bottom vignette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)',
                }}
              />

              {/* Front card: label */}
              {photo.zIndex === 3 && (
                <div className="absolute bottom-3 left-3 right-3">
                  <span
                    className="text-[10px] font-mono font-bold tracking-widest uppercase"
                    style={{ color: 'rgba(0,212,170,0.85)' }}
                  >
                    EASYSAUDA
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ── Bento Photo Grid ────────────────────────────────────────── */
function BentoPhoto({ src, alt, label, delay, inView, className = '', style = {} }) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={{
        borderRadius: 20,
        boxShadow: '0 16px 48px rgba(0,0,0,0.50), 0 0 0 1px rgba(255,255,255,0.06)',
        ...style,
      }}
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02, boxShadow: '0 24px 64px rgba(0,0,0,0.60), 0 0 0 1px rgba(0,212,170,0.18)', zIndex: 10 }}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', userSelect: 'none' }}
        onError={(e) => {
          e.currentTarget.parentElement.style.background = 'rgba(255,255,255,0.035)';
          e.currentTarget.style.display = 'none';
        }}
      />
      {/* Brand tint */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(0,212,170,0.07) 0%, rgba(0,60,180,0.09) 100%)', mixBlendMode: 'color' }} />
      {/* Bottom vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.50) 0%, transparent 55%)' }} />
      {/* Label */}
      {label && (
        <div className="absolute bottom-3 left-3">
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase"
            style={{ color: 'rgba(0,212,170,0.75)' }}>
            {label}
          </span>
        </div>
      )}
    </motion.div>
  );
}

function BentoGrid({ inView }) {
  return (
    <>
      {/* Mobile: simple stack */}
      <div className="mt-10 flex flex-col gap-3 sm:hidden">
        {[
          { src: '/about/payouts.jpg', alt: 'Выплаты с проп-счёта',            label: 'Реальные выплаты',      delay: 0.05, h: 180 },
          { src: '/about/chart.jpg',   alt: 'Реальная сделка на графике',       label: 'Живая торговля',        delay: 0.12, h: 160 },
          { src: '/about/cert.jpg',    alt: 'Сертификат Topstep Funded Trader', label: 'Topstep Funded Trader', delay: 0.18, h: 200 },
        ].map(p => (
          <BentoPhoto key={p.src} src={p.src} alt={p.alt} label={p.label} delay={p.delay} inView={inView}
            style={{ height: p.h }} />
        ))}
      </div>

      {/* sm+: asymmetric grid */}
      <div className="mt-14 w-full hidden sm:grid" style={{
        gridTemplateColumns: '1fr 1.4fr',
        gridTemplateRows: '220px 190px',
        gap: 10,
      }}>
        <BentoPhoto src="/about/cert.jpg" alt="Сертификат Topstep Funded Trader" label="Topstep Funded Trader"
          delay={0.05} inView={inView} style={{ gridColumn: '1', gridRow: '1 / 3' }} />
        <BentoPhoto src="/about/payouts.jpg" alt="Выплаты с проп-счёта" label="Реальные выплаты"
          delay={0.12} inView={inView} style={{ gridColumn: '2', gridRow: '1' }} />
        <BentoPhoto src="/about/chart.jpg" alt="Реальная сделка на графике" label="Живая торговля"
          delay={0.18} inView={inView} style={{ gridColumn: '2', gridRow: '2' }} />
      </div>
    </>
  );
}

export default function About() {
  const t = useTranslations('about');
  const contentRef = useRef(null);
  const contentInView = useInView(contentRef, { once: true, margin: '-60px' });

  const stats = [
    { value: '2+',   rawNum: '2',   suf: '+', label: 'лет опыта' },
    { value: 'MNQ',  rawNum: null,  suf: '',  label: 'мой инструмент' },
    { value: '$200', rawNum: '200', suf: '',  label: 'тейк в день', prefix: '$' },
  ];

  return (
    <section className="relative py-20 overflow-hidden" id="about">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: Personal photo — edge-blended into background ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative w-full aspect-[16/10]">
              {/* Photo */}
              <img
                src="/about/desk.jpg"
                alt="Dastan за работой"
                draggable={false}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  borderRadius: 16,
                }}
              />
              {/* Brand tint */}
              <div className="absolute inset-0 pointer-events-none" style={{ borderRadius: 16,
                background: 'linear-gradient(160deg, rgba(0,212,170,0.06) 0%, rgba(0,60,180,0.08) 100%)',
                mixBlendMode: 'color' }} />

              {/* ── Edge fades — dissolve into #08090E ── */}
              {/* Top */}
              <div className="absolute inset-x-0 top-0 pointer-events-none" style={{ height: '35%',
                background: 'linear-gradient(to bottom, #08090E 0%, transparent 100%)' }} />
              {/* Bottom */}
              <div className="absolute inset-x-0 bottom-0 pointer-events-none" style={{ height: '45%',
                background: 'linear-gradient(to top, #08090E 0%, transparent 100%)' }} />
              {/* Left */}
              <div className="absolute inset-y-0 left-0 pointer-events-none" style={{ width: '30%',
                background: 'linear-gradient(to right, #08090E 0%, transparent 100%)' }} />
              {/* Right */}
              <div className="absolute inset-y-0 right-0 pointer-events-none" style={{ width: '30%',
                background: 'linear-gradient(to left, #08090E 0%, transparent 100%)' }} />
            </div>
          </motion.div>

          {/* ── Right: Content ── */}
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, x: 40 }}
            animate={contentInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-accent-green/20 bg-accent-green/[0.06] text-accent-green text-[11px] font-mono tracking-widest uppercase mb-4">
              Преподаватель
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {t('title')}
            </h2>
            <p className="text-white/45 mb-8">
              {t('subtitle')}
            </p>

            {/* Stats — 3 columns with dividers */}
            <div className="flex items-stretch mb-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="flex-1 text-center py-4"
                  style={{
                    borderLeft: i !== 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                    paddingLeft: i !== 0 ? '1.5rem' : 0,
                    paddingRight: i !== stats.length - 1 ? '1.5rem' : 0,
                  }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                >
                  <OdometerStat {...stat} />
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>

        {/* ── Bottom: Bento photo grid ── */}
        <BentoGrid inView={contentInView} />

      </div>
    </section>
  );
}
