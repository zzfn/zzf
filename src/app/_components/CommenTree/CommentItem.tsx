import Avatar from '@/app/post/[id]/_components/Avatar';
import { CommentType } from './type';
import CommentMeta from '@/app/_components/CommenTree/CommentMeta';

const CommentItem = ({
  comment,
  onReply,
}: {
  comment: CommentType;
  onReply: (id: string) => void;
}) => {
  return (
    <div className='flex gap-4'>
      <div className='relative h-10 w-10 shrink-0'>
        <div className='bg-accent/10 absolute inset-0 rounded-full'>
          {comment.appUser?.avatarUrl ? (
            <img
              src={comment.appUser.avatarUrl}
              alt=''
              className='h-full w-full rounded-full object-cover'
            />
          ) : (
            <Avatar userId={comment.username} />
          )}
        </div>
      </div>

      <div className='flex-1 space-y-2'>
        <div className='font-medium text-default'>{comment.username}</div>
        <p className='whitespace-pre-wrap text-sm text-default'>{comment.content}</p>
        <CommentMeta comment={comment} onReply={onReply} />
      </div>
    </div>
  );
};
export default CommentItem;
