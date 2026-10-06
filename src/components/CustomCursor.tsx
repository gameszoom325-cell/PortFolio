import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface CustomCursorProps {
  isLightMode: boolean;
}

export default function CustomCursor({ isLightMode }: CustomCursorProps) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on pointer-fine devices (not touch phones)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('cursor-pointer'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden select-none">
      {/* Outer Reticle Ring */}
      <motion.div
        animate={{
          x: pos.x - (isHovered ? 24 : 16),
          y: pos.y - (isHovered ? 24 : 16),
          scale: isHovered ? 1.4 : 1,
          borderColor: isHovered
            ? isLightMode
              ? '#d97706'
              : '#f59e0b'
            : isLightMode
              ? 'rgba(100, 116, 139, 0.45)'
              : 'rgba(255, 170, 0, 0.4)'
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        className="fixed w-8 h-8 rounded-full border border-dashed pointer-events-none"
      />

      {/* Center Laser Dot */}
      <motion.div
        animate={{
          x: pos.x - 3,
          y: pos.y - 3,
          scale: isHovered ? 1.8 : 1
        }}
        transition={{ type: 'spring', stiffness: 1000, damping: 50 }}
        className={`fixed w-1.5 h-1.5 rounded-full pointer-events-none ${
          isLightMode ? 'bg-amber-600 shadow-sm' : 'bg-amber-400 shadow-[0_0_8px_#f59e0b]'
        }`}
      />
    </div>
  );
}
