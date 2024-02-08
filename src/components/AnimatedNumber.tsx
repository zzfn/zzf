import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

const AnimatedNumber = ({ number }: { number: number }) => {
  const count = useSpring(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    count.set(number);
  }, [number]);

  return <motion.span className='font-mono'>{rounded}</motion.span>;
};

export default AnimatedNumber;
