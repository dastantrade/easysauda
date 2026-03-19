'use client';

import { motion } from 'framer-motion';

// Apple-style spring — snappy, physical feel
const appleSpring = { type: 'spring', stiffness: 400, damping: 30 };
const appleEase = { duration: 0.5, ease: [0.16, 1, 0.3, 1] };
const bouncySpring = { type: 'spring', stiffness: 360, damping: 22 };

export function FadeIn({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ ...appleEase, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInStagger({ children, className = '', stagger = 0.08 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={{
        visible: { transition: { staggerChildren: stagger } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInItem({ children, className = '' }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.90 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ ...bouncySpring, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideIn({ children, direction = 'left', delay = 0, className = '' }) {
  const x = direction === 'left' ? -32 : direction === 'right' ? 32 : 0;
  const y = direction === 'up' ? 32 : direction === 'down' ? -32 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ ...appleEase, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Bouncy spring entrance — for cards, modals, CTAs
export function SpringIn({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 8 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 360, damping: 22, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Hover lift for interactive elements
export function HoverLift({ children, className = '', amount = 4 }) {
  return (
    <motion.div
      whileHover={{ y: -amount, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={appleSpring}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Floating element (infinite loop)
export function FloatLoop({ children, className = '' }) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function CountUp({ value, duration = 2, className = '' }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={className}
    >
      {value}
    </motion.span>
  );
}
