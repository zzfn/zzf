import React from 'react';
import Comment from '@/app/_components/CommenTree/CommentTree';
import type { Metadata } from 'next';
import { Coffee, SparkleIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: '日常 | Moments',
  description: '分享生活的点点滴滴，记录日常的所思所想',
};

const Page = async (props: { searchParams: Promise<{ id: string }> }) => {
  return (
    <div className='mx-auto max-w-2xl space-y-8 px-4 py-8'>
      <div className='space-y-4'>
        <div className='flex items-center gap-3 text-accent'>
          <Coffee className='h-6 w-6' />
          <h1 className='text-xl font-medium'>日常</h1>
        </div>

        <div className='relative'>
          <div className='text-muted/80 flex items-center gap-2 text-sm'>
            <SparkleIcon className='h-4 w-4' />
            <p className='leading-relaxed'>记录生活中的小确幸</p>
          </div>

          <div className='text-muted/70 mt-4 flex items-center gap-4 text-xs'>
            <span>共 123 条动态</span>
            <span>最近更新 2024/03/21</span>
          </div>
        </div>
      </div>
      <Comment
        params={{
          objectId: (await props.searchParams).id || '0',
          objectType: 'thinking',
        }}
      />
    </div>
  );
};

export default Page;
