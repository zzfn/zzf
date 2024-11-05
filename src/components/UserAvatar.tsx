import { auth } from '../../auth';
import Image from 'next/image';

export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div className='flex items-center gap-2'>
      {session.user.name}
      {session.user.image && (
        <Image
          className='rounded-full'
          width={28}
          height={28}
          src={session.user.image}
          alt='User Avatar'
        />
      )}
    </div>
  );
}
