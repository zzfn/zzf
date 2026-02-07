'use client';

import type { ReactNode } from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  interactive?: boolean;
}

export function Card({ children, className, delay = 0, interactive = false }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25, delay, ease: 'easeOut' }}
      className={classNames(interactive ? 'card-interactive' : 'card', 'p-6', className)}
    >
      {children}
    </motion.div>
  );
}

// 向后兼容别名
export const ClayCard = Card;
