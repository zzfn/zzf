'use client';
import { Modal, Portal } from '@oc/design';
import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';

const MdImage = (props: any) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <span className='relative h-36 flex flex-col'>
        <Image
          className='cursor-zoom-in rounded transition-all hover:brightness-75'
          sizes="100vw"
          fill
          style={{
            width: '100%',
            objectFit: 'scale-down',
          }}
          onClick={() => setVisible(true)}
          {...props}
        />
      </span>
      <AnimatePresence>
        {visible && (
          <Portal className='fixed z-50 h-screen w-screen'>
            <div className='h-screen w-screen' />
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
