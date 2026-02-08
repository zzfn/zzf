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
import { MessageCircle } from 'lucide-react';

const CommentTree = ({ params }: CommentTreeProps) => {
  const { data = [], mutate } = useGetComment(params);
  return (
    <SessionProvider>
      <div className='animate-fade-in space-y-8'>
        {/* 评论统计头 */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='border-border-muted text-fg-muted bg-bg-subtle flex h-10 w-10 items-center justify-center rounded-xl border'>
              <MessageCircle size={18} />
            </div>
            <div>
              <h3 className='text-fg-default text-lg font-semibold'>评论</h3>
              <p className='text-fg-muted text-xs font-medium'>共 {data.length} 条</p>
            </div>
          </div>
        </div>

        <MainCommentInput params={params} mutate={mutate}></MainCommentInput>

        <div className='space-y-4'>
          {data.map((comment: CommentType) => (
            <TreeItem mutate={mutate as never} key={comment.id} comment={comment}></TreeItem>
          ))}
        </div>
      </div>
    </SessionProvider>
  );
};

export default CommentTree;
