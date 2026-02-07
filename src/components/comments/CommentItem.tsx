import Image from 'next/image';
import Avatar from '@/components/Avatar';
import { CommentType } from './type';
import CommentMeta from './CommentMeta';

const CommentItem = ({
  comment,
  onReply,
}: {
  comment: CommentType;
  onReply: (id: string) => void;
}) => {
  return (
    <div className='group flex gap-5'>
      {/* 头像容器 */}
      <div className='relative h-12 w-12 shrink-0'>
        <div className='border-border-muted flex items-center justify-center overflow-hidden rounded-2xl border'>
          {comment.appUser?.avatarUrl ? (
            <Image
              src={comment.appUser.avatarUrl}
              alt=''
              className='h-full w-full object-cover transition-transform duration-200 group-hover:scale-105'
              width={48}
              height={48}
            />
          ) : (
            <Avatar userId={comment.username} />
          )}
        </div>
      </div>

      <div className='flex-1 space-y-3'>
        <div className='flex items-center gap-2'>
          <span className='text-fg-default font-semibold'>@{comment.username}</span>
          <span className='bg-border-muted h-1 w-1 rounded-full' />
          <span className='text-fg-muted text-[10px] font-medium tracking-wider uppercase'>
            Level 1 Maker
          </span>
        </div>

        <div className='text-fg-default border-border-muted hover:bg-bg-muted rounded-2xl border p-4 text-[15px] leading-relaxed font-medium transition-colors duration-200'>
          {comment.content}
        </div>

        <CommentMeta comment={comment} onReply={onReply} />
      </div>
    </div>
  );
};

export default CommentItem;
