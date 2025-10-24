import { motion, useMotionValueEvent, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

const AnimatedNumber = ({ number }: { number: number }) => {
  const count = useSpring(0);
  const [display, setDisplay] = useState(0);

  useMotionValueEvent(count, 'change', (latest) => {
    setDisplay(Math.round(latest));
  });

  useEffect(() => {
    count.set(number);
  }, [count, number]);
  return <motion.span className='font-mono'>{display}</motion.span>;
};

export default AnimatedNumber;
