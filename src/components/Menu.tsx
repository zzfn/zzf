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
            className='bg-black/30 backdrop-blur-sm fixed inset-0 z-50'
            onClick={() => setVisible(false)}
          >
            <motion.div
              initial={{ y: -10, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -10, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className='glass-panel absolute top-20 left-4 w-52 rounded-2xl p-2 shadow-lg dark:bg-bg-default/90'
              onClick={(event) => event.stopPropagation()}
            >
              <nav className='space-y-1'>
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href;

                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                    >
                      <Link
                        href={link.href}
                        className={classNames(
                          'group flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-all duration-150',
                          isActive
                            ? 'bg-fg-default text-bg-default'
                            : 'text-fg-default hover:bg-bg-muted/70',
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
