import { signOut, useSession } from 'next-auth/react';
import Avatar from '@/app/post/[id]/_components/Avatar';
import { LogOut } from 'lucide-react';

const UserInfo = () => {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <div className='mb-4 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='relative h-8 w-8 shrink-0'>
            <div className='bg-accent/10 absolute inset-0 rounded-full'>
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt=''
                  className='h-full w-full rounded-full object-cover'
                />
              ) : (
                <Avatar userId={session.user.name || ''} />
              )}
            </div>
          </div>
          <span className='text-sm font-medium text-default'>{session.user.name}</span>
        </div>

        <button
          onClick={() => signOut()}
          className='hover:bg-default/5 flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs
              text-muted transition-colors duration-200 hover:text-accent'
        >
          <LogOut size={14} />
          <span>退出登录</span>
        </button>
      </div>
    );
  }
  return null;
};
export default UserInfo;
