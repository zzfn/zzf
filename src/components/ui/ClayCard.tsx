'use client';

import type { ReactNode } from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';

interface ClayCardProps {
  children: ReactNode;
  color?: 'blue' | 'pink' | 'green' | 'yellow' | 'default';
  className?: string;
  delay?: number;
}

export function ClayCard({ children, color = 'default', className, delay = 0 }: ClayCardProps) {
  const colorClass = {
    default: '',
    blue: 'clay-blue',
    pink: 'clay-pink',
    green: 'clay-green',
    yellow: 'clay-yellow',
  }[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={classNames('clay p-6', colorClass, className)}
    >
      {children}
    </motion.div>
  );
}
