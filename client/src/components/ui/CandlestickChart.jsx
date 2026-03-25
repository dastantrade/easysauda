'use client';

import { useState, useEffect, useRef } from 'react';
import { useMotionValue, animate, motion, useTransform } from 'framer-motion';

// ─── Gaussian (Box-Muller) ─────────────────────────────────────────
function randn() {
  let u = 0, v = 0;
  while (!u) u = Math.random();
  while (!v) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

// ─── Realistic candle: Ornstein-Uhlenbeck intrabar + natural wicks ──
// OU process: dp = theta*(mu-p) + sigma*randn()
// This keeps price in a realistic range (mean-reverting like real markets)
function makeCandle(open, { sigma = 15, theta = 0.12, mu = 24400, trend = 0 }, id = 0) {
  let p = open;
  let hi = open;
  let lo = open;
  const TICKS = 12;

  for (let i = 0; i < TICKS; i++) {
    // OU drift toward mu + external slow trend
    const ouDrift = theta * (mu - p) * 0.015;
    p += ouDrift + trend * 0.4 + sigma * randn() * 0.28;
    if (p > hi) hi = p;
    if (p < lo) lo = p;
  }

  // Doji (9% chance) — candle with almost no body
  let close = p;
  if (Math.random() < 0.09) {
    close = open + randn() * sigma * 0.06;
  }

  const bodyHi = Math.max(open, close);
  const bodyLo = Math.min(open, close);
  const bodySize = bodyHi - bodyLo;

  // Natural wicks on EVERY candle (wicks = 0.5–2.5x the body)
  const wickMult = 0.5 + Math.random() * 2.0;
  const upperWick = Math.abs(randn()) * bodySize * wickMult * 0.6;
  const lowerWick = Math.abs(randn()) * bodySize * wickMult * 0.6;

  let finalHigh = Math.max(hi, bodyHi + upperWick);
  let finalLow  = Math.min(lo, bodyLo - lowerWick);

  // Spike candle (11% chance) — long wick like in the video
  if (Math.random() < 0.11) {
    const spike = sigma * (1.8 + Math.random() * 2.2);
    // Lower spikes more common (buyers testing support)
    if (Math.random() < 0.65) {
      finalLow = Math.min(finalLow, bodyLo - spike);
    } else {
      finalHigh = Math.max(finalHigh, bodyHi + spike);
    }
  }

  return {
    id,
    open,
    close,
    high: finalHigh,
    low: finalLow,
    isUp: close >= open,
  };
}

// ─── Constants ────────────────────────────────────────────────────
const COUNT   = 38;
const W       = 1200;
const H       = 320;
const AXIS_W  = 88;
const PAD_L   = 10;
const PAD_Y   = 26;
const CHART_W = W - PAD_L - AXIS_W;
const CHART_H = H - PAD_Y * 2;
const SPACING = CHART_W / COUNT;
const BODY_W  = Math.max(SPACING * 0.52, 5);
const MU      = 24400; // OU center price

// ─── Component ────────────────────────────────────────────────────
export default function CandlestickChart() {
  const [candles,  setCandles]  = useState(null);
  const [incoming, setIncoming] = useState(null);

  const nextOpenRef = useRef(MU);
  const trendRef    = useRef(0);   // slow external trend (AR-1)
  const idRef       = useRef(0);
  const busyRef     = useRef(false);

  const mvX        = useMotionValue(0);
  const transformX = useTransform(mvX, v => `translateX(${v}px)`);

  // ── Init ─────────────────────────────────────────────────────
  useEffect(() => {
    const arr = [];
    let p = MU + (Math.random() - 0.5) * 40;
    let t = 0;
    for (let i = 0; i < COUNT; i++) {
      // Slow trend evolution (AR-1)
      t = t * 0.94 + randn() * 0.22;
      const c = makeCandle(p, { sigma: 16, theta: 0.12, mu: MU, trend: t }, idRef.current++);
      p = c.close + (Math.random() - 0.5) * 0.5;
      arr.push(c);
    }
    nextOpenRef.current = p;
    trendRef.current    = t;
    setCandles(arr);
  }, []);

  // ── Tick every 2.5 s ─────────────────────────────────────────
  useEffect(() => {
    if (!candles) return;

    const tick = () => {
      if (busyRef.current) return;
      busyRef.current = true;

      trendRef.current = trendRef.current * 0.94 + randn() * 0.22;
      const newC = makeCandle(
        nextOpenRef.current,
        { sigma: 16, theta: 0.12, mu: MU, trend: trendRef.current },
        idRef.current++
      );
      nextOpenRef.current = newC.close + (Math.random() - 0.5) * 0.5;

      setIncoming(newC);
      mvX.set(0);

      animate(mvX, -SPACING, {
        duration: 0.7,
        ease: [0.4, 0.0, 0.2, 1],
      }).then(() => {
        setCandles(prev => [...prev.slice(1), newC]);
        setIncoming(null);
        mvX.set(0);
        busyRef.current = false;
      });
    };

    const id = setInterval(tick, 2500);
    return () => clearInterval(id);
  }, [candles, mvX]);

  if (!candles) return null;

  // ── Price scale ───────────────────────────────────────────────
  const all   = incoming ? [...candles, incoming] : candles;
  const rawLo = Math.min(...all.map(c => c.low));
  const rawHi = Math.max(...all.map(c => c.high));
  const pad   = (rawHi - rawLo) * 0.10 + 3;
  const minP  = rawLo - pad;
  const maxP  = rawHi + pad;
  const span  = maxP - minP || 1;

  const py = (v) => PAD_Y + CHART_H - ((v - minP) / span) * CHART_H;
  const cx = (i) => PAD_L + SPACING * i + SPACING / 2;

  const last       = candles[candles.length - 1];
  const lastY      = py(last.close);
  const priceColor = last.isUp ? '#00D4AA' : '#FF3B30';

  // 5 price axis levels
  const levels = [0, 0.25, 0.5, 0.75, 1].map(t => minP + span * (1 - t));

  // ── Candle render ─────────────────────────────────────────────
  const renderCandle = (c, i) => {
    const x       = cx(i);
    const bodyTop = py(Math.max(c.open, c.close));
    const bodyBot = py(Math.min(c.open, c.close));
    const bodyH   = Math.max(bodyBot - bodyTop, 1.0);
    const col     = c.isUp ? '#00D4AA' : '#FF3B30';
    const isDojiLike = bodyH < 3;

    return (
      <g key={c.id}>
        {/* Wick */}
        <line
          x1={x} y1={py(c.high)}
          x2={x} y2={py(c.low)}
          stroke={col}
          strokeWidth={isDojiLike ? '1.5' : '1.2'}
          strokeOpacity="0.72"
        />
        {/* Body */}
        {isDojiLike ? (
          // Doji: horizontal dash
          <line
            x1={x - BODY_W / 2} y1={bodyTop}
            x2={x + BODY_W / 2} y2={bodyTop}
            stroke={col} strokeWidth="1.5" strokeOpacity="0.85"
          />
        ) : (
          <rect
            x={x - BODY_W / 2} y={bodyTop}
            width={BODY_W} height={bodyH}
            fill={col}
            fillOpacity={c.isUp ? 0.60 : 0.50}
            rx="1"
          />
        )}
      </g>
    );
  };

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
    >
      <defs>
        <clipPath id="esClip">
          <rect x={PAD_L} y={0} width={CHART_W} height={H} />
        </clipPath>
      </defs>

      {/* ── Grid + price axis ────────────────────────────────── */}
      {levels.map((price, i) => {
        const y = py(price);
        return (
          <g key={i}>
            <line
              x1={PAD_L} y1={y} x2={PAD_L + CHART_W} y2={y}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
              strokeDasharray="2 10"
            />
            <text
              x={PAD_L + CHART_W + 6} y={y + 4}
              fill="rgba(255,255,255,0.20)"
              fontSize="10.5"
              fontFamily="'SF Mono','Fira Mono','Consolas',monospace"
            >
              {price.toFixed(2)}
            </text>
          </g>
        );
      })}

      {/* ── Candles (clipped, smooth slide) ──────────────────── */}
      <g clipPath="url(#esClip)">
        <motion.g style={{ transform: transformX }}>
          {candles.map((c, i) => renderCandle(c, i))}
          {incoming && renderCandle(incoming, COUNT)}
        </motion.g>
      </g>

      {/* ── Last price dotted line ───────────────────────────── */}
      <line
        x1={PAD_L} y1={lastY} x2={PAD_L + CHART_W} y2={lastY}
        stroke={priceColor} strokeWidth="0.8"
        strokeOpacity="0.40" strokeDasharray="3 6"
      />

      {/* ── Last price badge ─────────────────────────────────── */}
      <rect
        x={PAD_L + CHART_W + 1} y={lastY - 11}
        width={AXIS_W - 5} height={22}
        fill={priceColor} fillOpacity="0.80" rx="3"
      />
      <text
        x={PAD_L + CHART_W + (AXIS_W - 4) / 2 + 1} y={lastY + 4.5}
        fill="white" fontSize="11" fontWeight="700"
        fontFamily="'SF Mono','Fira Mono','Consolas',monospace"
        textAnchor="middle"
      >
        {last.close.toFixed(2)}
      </text>
    </svg>
  );
}
