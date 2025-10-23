import { CommentType } from './type';
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
  <>
    <div className='flex items-center gap-3 text-xs text-muted'>
      <span>{formatTime(comment.createdAt)}</span>
      {comment.address && (
        <>
          <span>·</span>
          <span>{comment.address}</span>
        </>
      )}
    </div>
    <button onClick={() => onReply(comment.id)} className='text-xs text-muted hover:text-accent'>
      回复
    </button>
  </>
);
export default CommentMeta;
