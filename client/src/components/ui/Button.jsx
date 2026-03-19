'use client';

import { motion } from 'framer-motion';

const variants = {
  // Primary — skeuomorphic green gradient with shadow
  primary: {
    base: `
      bg-gradient-to-b from-[#34C759] to-[#2DB34A]
      hover:from-[#3FD668] hover:to-[#30D158]
      text-white font-semibold
      shadow-[0_1px_3px_rgba(0,0,0,0.18),0_1px_0_rgba(255,255,255,0.25)_inset,0_-1px_0_rgba(0,0,0,0.12)_inset]
      hover:shadow-[0_4px_20px_rgba(48,209,88,0.35),0_1px_0_rgba(255,255,255,0.25)_inset]
      active:shadow-[0_0_1px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.12)_inset]
      active:from-[#2DB34A] active:to-[#25A244]
      border border-[#25A244]/40
    `,
    scale: { hover: 1.02, tap: 0.97 },
  },
  // Blue — Apple system blue
  blue: {
    base: `
      bg-gradient-to-b from-[#1A8BFF] to-[#007AFF]
      hover:from-[#2E96FF] hover:to-[#1A8BFF]
      text-white font-semibold
      shadow-[0_1px_3px_rgba(0,0,0,0.18),0_1px_0_rgba(255,255,255,0.20)_inset,0_-1px_0_rgba(0,0,0,0.12)_inset]
      hover:shadow-[0_4px_20px_rgba(0,122,255,0.30),0_1px_0_rgba(255,255,255,0.20)_inset]
      active:shadow-[0_0_1px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.12)_inset]
      border border-[#0062CC]/30
    `,
    scale: { hover: 1.02, tap: 0.97 },
  },
  // Secondary — glass with subtle stroke
  secondary: {
    base: `
      glass-strong
      text-ink font-medium
      hover:bg-white/90
      hover:shadow-glass-hover
      border-glass-stroke
    `,
    scale: { hover: 1.01, tap: 0.98 },
  },
  // Danger — red gradient
  danger: {
    base: `
      bg-gradient-to-b from-[#FF4D40] to-[#FF3B30]
      hover:from-[#FF6059] hover:to-[#FF4D40]
      text-white font-semibold
      shadow-[0_1px_3px_rgba(0,0,0,0.18),0_1px_0_rgba(255,255,255,0.20)_inset]
      hover:shadow-[0_4px_20px_rgba(255,59,48,0.30)]
      active:shadow-[0_0_1px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.12)_inset]
      border border-[#D93025]/30
    `,
    scale: { hover: 1.02, tap: 0.97 },
  },
  // Ghost — minimal, no background
  ghost: {
    base: `
      bg-transparent
      hover:bg-white/50
      text-ink-tertiary hover:text-ink
      border border-transparent hover:border-glass-stroke
    `,
    scale: { hover: 1.01, tap: 0.99 },
  },
};

const sizes = {
  sm: 'px-3.5 py-1.5 text-sm rounded-[10px]',
  md: 'px-5 py-2.5 text-[15px] rounded-[12px]',
  lg: 'px-8 py-3.5 text-base rounded-[14px]',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  ...props
}) {
  const v = variants[variant] || variants.primary;

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: v.scale.hover }}
      whileTap={disabled ? {} : { scale: v.scale.tap }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`
        inline-flex items-center justify-center gap-2 transition-all duration-200
        ${v.base} ${sizes[size]}
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
}
