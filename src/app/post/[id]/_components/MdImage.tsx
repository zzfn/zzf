'use client';
import { Portal } from '@/components/ui';
import { useState } from 'react';
import Image, { type ImageProps } from 'next/image';
import { AnimatePresence } from 'framer-motion';

const MdImage = ({ onClick, alt, ...rest }: ImageProps) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Image
        className='m-0 w-full cursor-zoom-in rounded-3xl transition-all hover:brightness-75'
        sizes='100vw'
        loading='lazy'
        style={{
          maxWidth: '100%',
          objectFit: 'scale-down',
          maxHeight: '100%',
        }}
        width={4}
        height={3}
        onClick={(event) => {
          setVisible(true);
          onClick?.(event);
        }}
        alt={alt}
        {...rest}
      />
      <AnimatePresence>
        {visible && (
          <Portal className='fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center backdrop-blur-md'>
            <Image
              className='bg-opacity max-h-[95vh] max-w-[95vw] cursor-zoom-out rounded object-scale-down'
              width={4}
              height={3}
              style={{
                width: '100%',
                objectFit: 'scale-down',
              }}
              onClick={() => setVisible(false)}
              alt={alt}
              {...rest}
            />
          </Portal>
        )}
      </AnimatePresence>
    </>
  );
};
export default MdImage;
