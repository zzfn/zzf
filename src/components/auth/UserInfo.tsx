'use client';
import Image from 'next/image';
import { LogOut } from 'lucide-react';
import Avatar from '@/components/Avatar';
import { CURRENT_USER_ENDPOINT, useCurrentUser, useLogout } from '@/services/auth';
import { useSWRConfig } from 'swr';

const UserInfo = () => {
  const { currentUser } = useCurrentUser();
  const { mutate } = useSWRConfig();
  const { trigger: logout, isMutating } = useLogout();

  if (currentUser) {
    return (
      <div className='mb-4 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='relative h-8 w-8 shrink-0'>
            <div className='bg-bg-accent/10 absolute inset-0 rounded-full'>
              {currentUser.avatarUrl ? (
                <Image
                  src={currentUser.avatarUrl}
                  alt=''
                  className='h-full w-full rounded-full object-cover'
                  width={32}
                  height={32}
                />
              ) : (
                <Avatar userId={currentUser.username} />
              )}
            </div>
          </div>
          <span className='text-sm font-medium text-fg-default'>
            {currentUser.nickname || currentUser.username}
          </span>
        </div>

        <button
          onClick={async () => {
            await logout();
            await mutate(
              {
                endpoint: CURRENT_USER_ENDPOINT,
                fetchParams: {
                  credentials: 'include',
                },
              },
              null,
              { revalidate: false },
            );
          }}
          disabled={isMutating}
          className='hover:bg-bg-default/5 flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs
              text-fg-muted transition-colors duration-200 hover:text-fg-accent'
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
