'use client';
import { Modal } from '@oc/design';
import { useState } from 'react';
import Image from 'next/image';

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
      <Modal onCancel={() => setVisible(false)} visible={visible}>
        <div className='h-[95vmin] w-[95min]'>
          <Image
            className='cursor-zoom-out object-scale-down'
            fill
            onClick={() => setVisible(false)}
            {...props}
          />
        </div>
      </Modal>
    </>
  );
};
export default MdImage;
