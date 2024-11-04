'use client';
import { IconButton } from '@oc/design';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import { Menu } from 'lucide-react';
const MenuItem = ({ navLinks }: any) => {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <IconButton onClick={() => setVisible(true)}>
        <Menu className='text-default transition-colors hover:text-accent' />
      </IconButton>

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // @ts-ignore
            className='bg-emphasis/80 fixed inset-0 z-50 backdrop-blur-sm'
            onClick={() => setVisible(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              // @ts-ignore
              className='absolute left-4 top-16 w-48 rounded-lg bg-default p-2 shadow-lg'
              onClick={(e: any) => e.stopPropagation()}
            >
              <nav className='space-y-1'>
                {navLinks.map((link: any, index: number) => {
                  const isActive = pathname === link.href;

                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        className={classNames(
                          'group flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors',
                          isActive
                            ? 'bg-accent text-accent'
                            : 'text-default hover:bg-neutral-muted',
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
