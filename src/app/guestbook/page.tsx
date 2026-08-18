import React from 'react';
import CommentTree from '@/components/comments/CommentTree';
import { Metadata } from 'next';
import { MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: '留言板 - Guestbook',
  description: '欢迎在这里留下您的想法和建议',
};

const Page = async () => {
  return (
    <div className='mx-auto max-w-2xl space-y-8 px-4 py-8'>
      <div className='space-y-4'>
        <div className='flex items-center gap-3 text-fg-accent'>
          <MessageCircle className='h-6 w-6' />
          <h1 className='text-xl font-medium'>留言板</h1>
        </div>

        <div className='prose dark:prose-invert'>
          <p className='text-fg-muted text-sm leading-relaxed'>
            欢迎在这里分享您的想法，留下您的足迹。交流讨论，分享心得。
          </p>
          <p className='text-fg-muted/60 mt-2 text-xs font-mono'>登录后参与讨论 · 保持友善交流</p>
        </div>
      </div>

      <CommentTree
        params={{
          objectId: '0',
          objectType: 'message',
        }}
      />
    </div>
  );
};

export default Page;
