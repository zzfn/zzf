'use client';
import { Modal, Portal } from '@oc/design';
import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';

const MdImage = (props: any) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Image
        className='cursor-zoom-in rounded transition-all hover:brightness-75'
        width={200}
        height={200}
        onClick={() => setVisible(true)}
        {...props}
      />
      <AnimatePresence>
        {visible && (
          <Portal className='fixed z-50 h-screen w-screen'>
            <div className='h-screen w-screen'>11</div>
            <Image
              className='cursor-zoom-out bg-opacity object-scale-down'
              fill
              onClick={() => setVisible(false)}
              {...props}
            />
          </Portal>
        )}
      </AnimatePresence>
    </>
  );
};
export default MdImage;
