'use client';
import { useGetComment } from '@/services/comment';
import TreeItem from './TreeItem';
import MainCommentInput from './MainCommentInput';
import { SessionProvider } from 'next-auth/react';
import type { CommentType } from './type';

interface CommentTreeProps {
  params: {
    objectId: string;
    objectType: string;
  };
}
import { MessageCircle, Zap } from 'lucide-react';

const CommentTree = ({ params }: CommentTreeProps) => {
  const { data = [], mutate } = useGetComment(params);
  return (
    <SessionProvider>
      <div className='animate-fade-in space-y-10'>
        {/* 评论统计头 */}
        <div className='flex items-center justify-between border-b border-white/20 pb-6'>
          <div className='flex items-center gap-4'>
            <div className='bg-bg-accent-muted text-fg-accent flex h-10 w-10 items-center justify-center rounded-2xl shadow-sm'>
              <MessageCircle size={20} />
            </div>
            <div>
              <h3 className='text-fg-default text-lg font-bold'>交流互动</h3>
              <p className='text-fg-muted text-xs font-bold tracking-wider uppercase'>
                {data.length} 条精彩讨论
              </p>
            </div>
          </div>

          <div className='bg-bg-success-muted text-fg-success flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-black uppercase'>
            <span className='relative flex h-2 w-2'>
              <span className='bg-bg-success-emphasis absolute inline-flex h-full w-full animate-ping rounded-full opacity-75'></span>
              <span className='bg-bg-success-emphasis relative inline-flex h-2 w-2 rounded-full'></span>
            </span>
            <span className='flex items-center gap-1'>
              <Zap size={10} fill='currentColor' /> 实时对话
            </span>
          </div>
        </div>

        <MainCommentInput params={params} mutate={mutate}></MainCommentInput>

        <div className='space-y-8'>
          {data.map((comment: CommentType) => (
            <TreeItem mutate={mutate as never} key={comment.id} comment={comment}></TreeItem>
          ))}
        </div>
      </div>
    </SessionProvider>
  );
};

export default CommentTree;
