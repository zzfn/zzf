'use client';
import IconSymbols from './IconSymbols';
import { Drawer, IconButton } from '@oc/design';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const variantsNav = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};
const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};
const Menu = ({ navLinks }: any) => {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <IconButton>
        <IconSymbols onClick={() => setVisible(true)} icon='menu'></IconSymbols>
      </IconButton>
      <Drawer onCancel={() => setVisible(false)} visible={visible}>
        <motion.nav
          variants={variantsNav}
          className='flex flex-col items-center justify-center h-full gap-y-8'
        >
          {navLinks.map((link: any) => {
            const isActive = pathname === link.href;

            return (
              <motion.li
                variants={variants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                key={link.name}
              >
                <Link className={isActive ? 'text-accent' : 'text-default'} href={link.href}>
                  {link.name}
                </Link>
              </motion.li>
            );
          })}
        </motion.nav>
      </Drawer>
    </>
  );
};
export default Menu;
