'use client';
import { useAnimate } from 'framer-motion';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

const List = ({ children }: { children: ReactNode }) => {
  const [scope, animate] = useAnimate();
  useEffect(() => {
    animate('a', { opacity: 1 });
  });
  return (
    <div
      ref={scope}
      className='flex flex-col text-sm p-6'
    >
      {children}
    </div>
  );
};
export default List;
