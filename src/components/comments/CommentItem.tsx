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
    <div className='group bg-bg-subtle hover:bg-bg-muted border-border-muted rounded-2xl border p-5 transition-all duration-200'>
      <div className='flex gap-4'>
        {/* 头像容器 */}
        <div className='relative h-10 w-10 shrink-0'>
          <div className='border-border-muted flex items-center justify-center overflow-hidden rounded-xl border'>
            {comment.appUser?.avatarUrl ? (
              <Image
                src={comment.appUser.avatarUrl}
                alt=''
                className='h-full w-full object-cover transition-transform duration-200 group-hover:scale-105'
                width={40}
                height={40}
              />
            ) : (
              <Avatar userId={comment.username} />
            )}
          </div>
        </div>

        <div className='flex-1 space-y-3'>
          {/* 用户信息 */}
          <div className='flex items-center gap-2'>
            <span className='text-fg-default text-sm font-semibold'>@{comment.username}</span>
            <span className='bg-border-muted h-1 w-1 rounded-full' />
            <span className='text-fg-muted text-[10px] font-medium tracking-wider uppercase'>
              Level 1 Maker
            </span>
          </div>

          {/* 评论内容 */}
          <div className='text-fg-default text-[15px] leading-relaxed font-medium'>
            {comment.content}
          </div>

          {/* Meta 信息 */}
          <CommentMeta comment={comment} onReply={onReply} />
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
