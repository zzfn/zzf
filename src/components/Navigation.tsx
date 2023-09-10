'use client';

import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { useSelectedLayoutSegment } from 'next/navigation'
import { articleAtom } from "atoms/articleAtoms";

const Navigation = ({ navLinks }: any) => {
  const [isShow, setIsShow] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const { scrollY } = useScroll();
  const atomValue = useAtomValue(articleAtom);
  const segment = useSelectedLayoutSegment()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsShow(!!(params.id && pathname.includes('post') && latest > 100));
  });
  return isShow ? (
    <span>{atomValue?.title}</span>
  ) : (
    <>
      {navLinks.map((link: any) => {
        const isActive = segment === link.href;

        return (
          <Link
            className={isActive ? 'text-accent' : 'text-default'}
            href={`/${link.href}`}
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
