import React from 'react';
import CommentTree from '@/app/_components/CommenTree/CommentTree';
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
        <div className='flex items-center gap-3 text-accent'>
          <MessageCircle className='h-6 w-6' />
          <h1 className='text-xl font-medium'>留言板</h1>
        </div>

        <div className='prose prose-neutral dark:prose-invert'>
          <p className='text-muted/80 text-sm leading-relaxed'>
            欢迎在这里分享您的想法，留下您的足迹。 这里可以畅所欲言，交流讨论，分享心得。
            期待与您的互动交流！
          </p>
          <p className='text-muted/60 mt-2 text-xs'>💡 登录后评论 | 文明交流</p>
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
