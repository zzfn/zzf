'use client';

import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <motion.div
      className={`inline-flex items-center gap-2 select-none group ${className || ''}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {/* 现代几何光晕徽标 */}
      <div className='relative flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-xs transition-shadow duration-300 group-hover:shadow-md'>
        <div className='flex h-full w-full items-center justify-center rounded-[10px] bg-bg-default dark:bg-zinc-950 transition-colors'>
          <span className='font-mono text-xs font-black tracking-tighter bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 bg-clip-text text-transparent'>
            K.
          </span>
        </div>
      </div>

      {/* 品牌名称 */}
      <span className='font-mono text-sm font-bold tracking-tight text-fg-default group-hover:text-fg-accent transition-colors'>
        krupp<span className='text-fg-accent'>.</span>
      </span>
    </motion.div>
  );
};

export default Logo;
