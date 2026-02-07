'use client';
import { IconButton } from '@/components/ui';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import { Menu } from 'lucide-react';

type NavLink = {
  href: string;
  name: string;
};

type MenuItemProps = {
  navLinks: NavLink[];
};

const MenuItem = ({ navLinks }: MenuItemProps) => {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <IconButton onClick={() => setVisible(true)}>
        <Menu className='text-fg-default hover:text-fg-accent transition-colors' />
      </IconButton>

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='bg-bg-emphasis/60 fixed inset-0 z-50'
            onClick={() => setVisible(false)}
          >
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.16, ease: 'easeOut' }}
              className='border-jan-ink bg-bg-default absolute top-16 left-4 w-48 rounded-2xl border-2 p-2 shadow-[5px_5px_0_var(--color-jan-ink)]'
              onClick={(event) => event.stopPropagation()}
            >
              <nav className='space-y-1'>
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href;

                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className={classNames(
                          'group flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-all duration-200 ease-out',
                          isActive
                            ? 'bg-bg-accent text-fg-accent'
                            : 'text-fg-default hover:bg-bg-muted',
                        )}
                        onClick={() => setVisible(false)}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MenuItem;
