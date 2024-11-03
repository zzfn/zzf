import Image from 'next/image';
import { croodles } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';

const Avatar = function ({ userId = '' }: { userId: string; size?: number }) {
  const avatar = createAvatar(croodles, {
    seed: userId,
    flip: true,
  });
  return (
    <Image
      className='h-10 w-10'
      width={40}
      height={40}
      src={avatar.toDataUri()}
      alt={userId ?? ''}
    />
  );
};
export default Avatar;
