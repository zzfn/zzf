'use client';
import { motion } from 'framer-motion';

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (index: number) => {
    const delay = (index - 1) * 0.5;
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
const Logo = ({ width = 150, height = 50 }) => {
  const scaleFactor = width / 150;
  return (
    <motion.svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      initial='hidden'
      animate='visible'
    >
      <motion.circle
        cx={25 * scaleFactor}
        cy={25 * scaleFactor}
        r={20 * scaleFactor}
        stroke='var(--color-ansi-red)'
        fill='var(--bgColor-default)'
        variants={draw}
        custom={1}
      />
      <motion.line
        x1={55 * scaleFactor}
        y1={7.5 * scaleFactor}
        x2={90 * scaleFactor}
        y2={42.5 * scaleFactor}
        stroke='var(--color-ansi-green)'
        variants={draw}
        custom={2}
      />
      <motion.line
        x1={55 * scaleFactor}
        y1={42.5 * scaleFactor}
        x2={90 * scaleFactor}
        y2={7.5 * scaleFactor}
        stroke='var(--color-ansi-green)'
        variants={draw}
        custom={2.5}
      />
      <motion.rect
        width={35 * scaleFactor}
        height={35 * scaleFactor}
        x={102.5 * scaleFactor}
        y={7.5 * scaleFactor}
        rx={5 * scaleFactor}
        stroke='var(--color-ansi-blue)'
        fill='var(--bgColor-default)'
        variants={draw}
        custom={3}
      />
    </motion.svg>
  );
};
export default Logo;
