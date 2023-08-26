'use client';

import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { articleState } from 'store/store';

const Navigation = ({ navLinks }: any) => {
  const [isShow, setIsShow] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const { scrollY } = useScroll();
  const atomValue = useAtomValue(articleState);
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsShow(!!(params.id && pathname.includes('post') && latest > 100));
  });

  return isShow ? (
    <>{atomValue?.title}</>
  ) : (
    <>
      {navLinks.map((link: any) => {
        const isActive = pathname === link.href;

        return (
          <Link
            className={isActive ? 'text-accent' : 'text-default'}
            href={link.href}
            key={link.name}
          >
            {link.name}
          </Link>
        );
      })}
    </>
  );
};
export default Navigation;
