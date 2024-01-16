import Image from 'next/image';
import { useMemo } from 'react';

const Avatar = function ({ userId = '' }: { userId: string | null; size?: number }) {
  const avatar = useMemo(() => {
    return 'https://avatar.zzfzzf.com/7.x/bottts/svg?seed=' + userId;
  }, [userId]);
  return <Image className='w-10 h-10' width={40} height={40} src={avatar} alt={userId ?? ''} />;
};
export default Avatar;
