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
      {/* 具有粘土感的头像容器 */}
      <div className='relative h-12 w-12 shrink-0'>
        <div className='clay flex items-center justify-center overflow-hidden !rounded-2xl border-2 border-white/50 shadow-sm'>
          {comment.appUser?.avatarUrl ? (
            <Image
              src={comment.appUser.avatarUrl}
              alt=''
              className='h-full w-full object-cover transition-transform group-hover:scale-110'
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
          <span className='text-fg-default font-bold'>@{comment.username}</span>
          <span className='bg-fg-muted/30 h-1 w-1 rounded-full' />
          <span className='text-fg-muted text-[10px] font-bold tracking-wider uppercase'>
            Level 1 Maker
          </span>
        </div>

        <div className='clay text-fg-default !rounded-2xl !bg-white/30 !p-4 text-[15px] leading-relaxed font-medium transition-colors hover:!bg-white/50'>
          {comment.content}
        </div>

        <CommentMeta comment={comment} onReply={onReply} />
      </div>
    </div>
  );
};

export default CommentItem;
