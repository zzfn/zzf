import { CommentType } from './type';
import { MessageSquare } from 'lucide-react';

const formatTime = (timestamp: string) => {
  return new Date(timestamp).toLocaleString('zh-CN', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const CommentMeta = ({
  comment,
  onReply,
}: {
  comment: CommentType;
  onReply: (id: string) => void;
}) => (
  <div className='text-fg-muted flex items-center gap-3 text-xs'>
    <span>{formatTime(comment.createdAt)}</span>
    {comment.address && (
      <>
        <span>·</span>
        <span>{comment.address}</span>
      </>
    )}
    <span>·</span>
    <button
      onClick={() => onReply(comment.id)}
      className='hover:text-fg-accent flex items-center gap-1 transition-colors'
    >
      <MessageSquare size={12} />
      <span>回复</span>
    </button>
  </div>
);

export default CommentMeta;
