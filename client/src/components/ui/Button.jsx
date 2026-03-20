'use client';

import { motion } from 'framer-motion';

const variants = {
  // Primary — teal gradient
  primary: {
    base: `
      bg-gradient-to-br from-[#00D4AA] to-[#00A882]
      hover:from-[#00E0B5] hover:to-[#00B890]
      text-[#08090E] font-semibold
      shadow-[0_4px_20px_rgba(0,212,170,0.30)]
      hover:shadow-[0_6px_30px_rgba(0,212,170,0.45)]
      active:shadow-[0_2px_10px_rgba(0,212,170,0.20)]
      border border-[#00D4AA]/20
    `,
    scale: { hover: 1.02, tap: 0.97 },
  },
  // Blue
  blue: {
    base: `
      bg-gradient-to-br from-[#00B8FF] to-[#0099DD]
      hover:from-[#22C5FF] hover:to-[#00B8FF]
      text-[#08090E] font-semibold
      shadow-[0_4px_20px_rgba(0,184,255,0.25)]
      hover:shadow-[0_6px_28px_rgba(0,184,255,0.40)]
      border border-[#00B8FF]/20
    `,
    scale: { hover: 1.02, tap: 0.97 },
  },
  // Secondary — dark glass
  secondary: {
    base: `
      bg-white/5
      hover:bg-white/10
      text-white font-medium
      border border-white/10
      hover:border-white/20
    `,
    scale: { hover: 1.01, tap: 0.98 },
  },
  // Glass — premium glassmorphism (for "watch free lesson" etc.)
  glass: {
    base: `
      glass-button
      hover:bg-white/8
      text-white/80 hover:text-white font-medium
      hover:border-white/20
      hover:shadow-[0_4px_20px_rgba(0,0,0,0.30)]
    `,
    scale: { hover: 1.01, tap: 0.98 },
  },
  // Danger
  danger: {
    base: `
      bg-gradient-to-br from-[#FF4D40] to-[#FF3B30]
      hover:from-[#FF6059] hover:to-[#FF4D40]
      text-white font-semibold
      shadow-[0_4px_20px_rgba(255,59,48,0.25)]
      hover:shadow-[0_6px_28px_rgba(255,59,48,0.35)]
      border border-[#FF3B30]/20
    `,
    scale: { hover: 1.02, tap: 0.97 },
  },
  // Ghost
  ghost: {
    base: `
      bg-transparent
      hover:bg-white/5
      text-white/60 hover:text-white
      border border-transparent hover:border-white/10
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
