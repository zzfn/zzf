'use client';
import { Modal, Portal } from '@oc/design';
import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';

const MdImage = (props: any) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      {/*<span className='relative h-36 flex flex-col'>*/}
      <Image
        className='m-0 cursor-zoom-in rounded-3xl transition-all hover:brightness-75'
        sizes='100vw'
        loading='lazy'
        style={{
          width: '100%',
          objectFit: 'scale-down',
        }}
        width={4}
        height={3}
        onClick={() => setVisible(true)}
        {...props}
      />
      {/*</span>*/}
      <AnimatePresence>
        {visible && (
          <Portal className='fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center backdrop-blur-md'>
            <Image
              className='max-h-[95vh] max-w-[95vw] cursor-zoom-out rounded bg-opacity object-scale-down'
              width={4}
              height={3}
              style={{
                width: '100%',
                objectFit: 'scale-down',
              }}
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
