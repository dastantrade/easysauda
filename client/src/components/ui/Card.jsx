'use client';

import { motion } from 'framer-motion';

export default function Card({
  children,
  className = '',
  hover = false,
  float = false,
  as = 'div',
  ...props
}) {
  const Comp = hover || float ? motion[as] || motion.div : as;

  const motionProps = hover || float
    ? {
        whileHover: {
          y: float ? -4 : -2,
          borderColor: 'rgba(0,212,170,0.20)',
          boxShadow: '0 12px 48px rgba(0,0,0,0.50), 0 0 0 1px rgba(0,212,170,0.15)',
        },
        transition: { type: 'spring', stiffness: 300, damping: 24 },
      }
    : {};

  return (
    <Comp
      className={`
        glass-card rounded-[20px] p-6
        ${hover ? 'cursor-pointer' : ''}
        ${className}
      `}
      {...motionProps}
      {...props}
    >
      {children}
    </Comp>
  );
}
