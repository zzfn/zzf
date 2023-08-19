'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Navigation = ({ navLinks }: any) => {
  const pathname = usePathname();

  return (
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
