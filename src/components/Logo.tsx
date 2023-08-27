'use client';
import { motion } from 'framer-motion';

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: 'spring', duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};
const Logo = () => {
  return (
    <motion.svg width='75' height='25' viewBox='0 0 75 25' initial='hidden' animate='visible'>
      <motion.circle
        cx='12.5'
        cy='12.5'
        r='10'
        stroke='var(--color-ansi-red)'
        fill='var(--bgColor-default)'
        variants={draw}
        custom={1}
      />
      <motion.line
        x1='27.5'
        y1='3.75'
        x2='45'
        y2='21.25'
        stroke='var(--color-ansi-green)'
        variants={draw}
        custom={2}
      />
      <motion.line
        x1='27.5'
        y1='21.25'
        x2='45'
        y2='3.75'
        stroke='var(--color-ansi-green)'
        variants={draw}
        custom={2.5}
      />
      <motion.rect
        width='17.5'
        height='17.5'
        x='51.25'
        y='3.75'
        rx='2.5'
        stroke='var(--color-ansi-blue)'
        fill='var(--bgColor-default)'
        variants={draw}
        custom={3}
      />
    </motion.svg>
  );
};
export default Logo;
