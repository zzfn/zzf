import Avatar from './Avatar';
import Footer from './Footer';

const CommentCard = ({ item, children, commentId, mutate }: any) => {
  return (
    <>
      <div key={item.id} className='flex items-start gap-x-4'>
        <Avatar userId={item.userID} />
        <div>
          <div className='rounded bg-neutral-muted px-3 py-2'>
            <div className='flex items-center gap-x-1 text-sm'>
              <span className='font-medium'>{item.userID.slice(0, 6)}</span>
            </div>
            <p className='my-2'>{item.content}</p>
          </div>
          <Footer mutate={mutate} commentId={commentId} dataSource={item} />
        </div>
      </div>
      <div className='ml-14'>{children}</div>
    </>
  );
};
export default CommentCard;
