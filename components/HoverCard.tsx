'use client';

import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface HoverCardProps {
  children: ReactNode;
}

export default function HoverCard({ children }: HoverCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}