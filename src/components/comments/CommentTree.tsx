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
const CommentTree = ({ params }: CommentTreeProps) => {
  const { data = [], mutate } = useGetComment(params);
  return (
    <SessionProvider>
      <div className='space-y-8'>
        {/* 评论统计 */}
        <div className='flex items-center justify-between border-b border-default pb-4'>
          <div className='flex items-center gap-3'>
            <div className='flex items-center gap-2 text-sm text-muted'>
              <span className='font-mono text-accent'>#</span>
              <span className='font-medium'>讨论区</span>
            </div>
            <div className='flex items-center gap-1 text-xs text-muted'>
              <span className='font-mono'>{data.length.toString().padStart(2, '0')}</span>
              <span>条评论</span>
            </div>
          </div>
          <div className='flex items-center gap-1.5 text-xs'>
            <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-success-muted'></span>
            <span className='font-mono'>实时对话</span>
          </div>
        </div>
        <MainCommentInput params={params} mutate={mutate}></MainCommentInput>
        <div className='space-y-6'>
          {data.map((comment: CommentType) => (
            <TreeItem mutate={mutate} key={comment.id} comment={comment}></TreeItem>
          ))}
        </div>
      </div>
    </SessionProvider>
  );
};
export default CommentTree;
