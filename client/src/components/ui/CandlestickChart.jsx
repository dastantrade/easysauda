'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function generateCandles(count = 48) {
  const candles = [];
  let price = 105;
  for (let i = 0; i < count; i++) {
    const isUp = Math.random() > 0.42;
    const bodySize = Math.random() * 8 + 2;
    const open = price;
    const close = isUp ? price + bodySize : price - bodySize;
    const wickUp = Math.random() * 5 + 1;
    const wickDown = Math.random() * 5 + 1;
    const high = Math.max(open, close) + wickUp;
    const low = Math.min(open, close) - wickDown;
    price = close + (Math.random() - 0.46) * 2;
    candles.push({ open, close, high, low, isUp });
  }
  return candles;
}

export default function CandlestickChart({ className = '' }) {
  // Client-only: generates after mount to avoid SSR hydration mismatch
  const [candles, setCandles] = useState(null);

  useEffect(() => {
    setCandles(generateCandles(48));
  }, []);

  // Don't render during SSR
  if (!candles) return null;

  const W = 1200;
  const H = 260;
  const PAD_X = 20;
  const PAD_Y = 20;
  const usableW = W - PAD_X * 2;
  const usableH = H - PAD_Y * 2;
  const spacing = usableW / candles.length;
  const bodyW = Math.max(spacing * 0.55, 5);

  const minP = Math.min(...candles.map(c => c.low));
  const maxP = Math.max(...candles.map(c => c.high));
  const range = maxP - minP || 1;

  const py = (v) => PAD_Y + usableH - ((v - minP) / range) * usableH;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={`absolute inset-0 w-full h-full ${className}`}
    >
      {/* Subtle grid lines */}
      {[0.25, 0.5, 0.75].map((t, i) => (
        <line
          key={i}
          x1={PAD_X} y1={PAD_Y + usableH * t}
          x2={W - PAD_X} y2={PAD_Y + usableH * t}
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
      ))}

      {candles.map((c, i) => {
        const x = PAD_X + spacing * i + spacing / 2;
        const bodyTop = py(Math.max(c.open, c.close));
        const bodyBot = py(Math.min(c.open, c.close));
        const bodyH = Math.max(bodyBot - bodyTop, 1.5);
        const color = c.isUp ? '#00D4AA' : '#FF3B30';
        // Animate right → left: last candle (right) appears first
        const delay = ((candles.length - 1 - i) / candles.length) * 1.6;

        return (
          <motion.g
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay }}
          >
            <line
              x1={x} y1={py(c.high)}
              x2={x} y2={py(c.low)}
              stroke={color}
              strokeWidth="1"
              strokeOpacity="0.65"
            />
            <rect
              x={x - bodyW / 2}
              y={bodyTop}
              width={bodyW}
              height={bodyH}
              fill={color}
              fillOpacity={c.isUp ? 0.55 : 0.45}
              rx="1.5"
            />
          </motion.g>
        );
      })}
    </svg>
  );
}
