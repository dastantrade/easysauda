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

/* ── Horizontal Photo Strip ──────────────────────────────────── */
const stripPhotos = [
  { src: '/about/desk.jpg',    alt: 'За рабочим местом',           rotate: -2.5, y: 10 },
  { src: '/about/chart.jpg',   alt: 'Реальная сделка на графике',  rotate:  1.5, y: 0  },
  { src: '/about/payouts.jpg', alt: 'Выплаты с проп-счёта',        rotate: -1.5, y: 6  },
  { src: '/about/cert.jpg',    alt: 'Сертификат Topstep',          rotate:  2,   y: 3  },
];

function PhotoStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="relative mt-14 -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #08090E 0%, transparent 100%)' }} />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #08090E 0%, transparent 100%)' }} />

      <div className="flex gap-4 justify-center px-6 pb-2" style={{ paddingTop: 12 }}>
        {stripPhotos.map((photo, i) => (
          <motion.div
            key={photo.src}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: photo.y } : {}}
            transition={{ delay: 0.08 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: photo.y - 8, scale: 1.03, zIndex: 10 }}
            style={{ rotate: `${photo.rotate}deg`, position: 'relative' }}
          >
            <div
              className="relative overflow-hidden flex-shrink-0"
              style={{
                width: 'clamp(220px, 22vw, 340px)',
                height: 'clamp(150px, 15vw, 230px)',
                borderRadius: 20,
                boxShadow: '0 16px 48px rgba(0,0,0,0.50), 0 0 0 1px rgba(255,255,255,0.06)',
              }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                draggable={false}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  userSelect: 'none',
                  display: 'block',
                }}
                onError={(e) => {
                  e.currentTarget.parentElement.style.background = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.display = 'none';
                }}
              />
              {/* Brand tint */}
              <div className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,212,170,0.08) 0%, rgba(0,80,200,0.10) 100%)',
                  mixBlendMode: 'color',
                }}
              />
              {/* Vignette */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.40) 0%, transparent 55%)' }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
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

          {/* ── Left: Photo placeholder ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex justify-center lg:justify-start"
          >
            <div
              className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1.5px dashed rgba(0,212,170,0.20)',
                boxShadow: '0 0 40px rgba(0,212,170,0.04)',
              }}
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                style={{ background: 'radial-gradient(circle at top right, rgba(0,212,170,0.08), transparent 70%)' }} />
              <div className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none"
                style={{ background: 'radial-gradient(circle at bottom left, rgba(0,100,200,0.06), transparent 70%)' }} />

              {/* Center icon */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: 'rgba(0,212,170,0.07)', border: '1px solid rgba(0,212,170,0.15)' }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(0,212,170,0.5)" strokeWidth="1.4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
                  </svg>
                </div>
                <span className="text-[11px] font-mono tracking-widest uppercase text-white/20">
                  Фото скоро
                </span>
              </div>
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

            {/* Odometer stats */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="rounded-xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-sm overflow-hidden"
                  initial={{ opacity: 0, y: 16 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  whileHover={{
                    borderColor: 'rgba(0,212,170,0.20)',
                    boxShadow: '0 0 20px rgba(0,212,170,0.08)',
                    y: -2,
                  }}
                >
                  <OdometerStat {...stat} />
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>

        {/* ── Bottom: Horizontal photo strip ── */}
        <PhotoStrip />

      </div>
    </section>
  );
}
