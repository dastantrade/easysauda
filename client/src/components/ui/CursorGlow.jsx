'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorGlow() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const rawX = useMotionValue(-400);
  const rawY = useMotionValue(-400);

  // Slow, smooth follow
  const x = useSpring(rawX, { stiffness: 80, damping: 20, restDelta: 0.5 });
  const y = useSpring(rawY, { stiffness: 80, damping: 20, restDelta: 0.5 });

  useEffect(() => {
    // Skip on touch devices
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      setIsMobile(true);
      return;
    }

    const onMove = (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, [rawX, rawY, visible]);

  if (isMobile) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9998]"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Outer large glow */}
      <div
        className="w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,170,0.045) 0%, transparent 60%)',
        }}
      />
      {/* Inner tighter glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,170,0.08) 0%, transparent 70%)',
        }}
      />
    </motion.div>
  );
}
