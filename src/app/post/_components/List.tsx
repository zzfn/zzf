'use client';
import { useAnimate } from 'framer-motion';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

const List = ({ children }: { children: ReactNode }) => {
  const [scope, animate] = useAnimate();
  useEffect(() => {
    // This "li" selector will only select children
    // of the element that receives `scope`.
    animate('a', { opacity: 1 });
  });
  return (
    <div
      ref={scope}
      // initial={{ opacity: 0.5 }}
      // animate={{ opacity: 1 }}
      className='flex flex-col text-sm p-6'
    >
      {children}
    </div>
  );
};
export default List;
