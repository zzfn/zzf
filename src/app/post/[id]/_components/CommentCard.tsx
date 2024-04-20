import Avatar from './Avatar';
import Footer from './Footer';
import Image from 'next/image';

const CommentCard = ({ item, children, commentId, mutate }: any) => {
  return (
    <>
      <div key={item.id} className='flex items-start gap-x-4'>
        {item.appUser?.avatar_url ? (
          <Image
            className='h-10 w-10 rounded-full'
            width={40}
            height={40}
            src={item.appUser?.avatar_url}
            alt={item.appUser?.username ?? ''}
          />
        ) : (
          <Avatar userId={item.username} />
        )}
        <div>
          <div className='rounded bg-neutral-muted px-3 py-2'>
            <div className='flex items-center gap-x-1 text-sm'>
              <span className='font-medium'>{item.username.slice(0, 6)}</span>
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
