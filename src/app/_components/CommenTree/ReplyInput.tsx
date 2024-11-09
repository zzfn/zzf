import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import SignIn from '@/app/_components/SignIn';
import { useState } from 'react';
import { useCommentOrReply } from '@/models/comment';

const ReplyInput = ({
  parentId,
  username,
  mutate,
}: {
  parentId: string;
  mutate: any;
  username: string;
}) => {
  const { data: session } = useSession();
  const [content, setContent] = useState('');
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const { trigger } = useCommentOrReply('replies', {
    commentId: parentId,
    content,
    username: session?.user?.name,
  });
  async function handleSubmit() {
    await trigger();
    await mutate();
  }
  if (!session) {
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        style={{ overflow: 'hidden' }}
      >
        <div className='mt-2 flex flex-col items-center justify-center space-y-3 rounded-lg border border-dashed border-default p-4'>
          <p className='text-sm text-muted'>登录后回复评论</p>
          <SignIn />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      style={{ overflow: 'hidden' }}
    >
      <div className='mt-2'>
        <div className='relative'>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={2}
            className='bg-opacity w-full rounded-lg border border-default p-4 pb-14 text-sm
                transition-colors duration-200 placeholder:text-muted focus:border-accent focus:outline-none
                focus:ring-1 focus:ring-accent'
            placeholder={`回复 @${username}...`}
            autoFocus
          />
          <div className='absolute bottom-3 right-3 flex items-center gap-3'>
            {content && (
              <div className='text-muted/80 bg-default/5 rounded-md px-2 py-1 text-xs'>
                <span className='font-mono tabular-nums'>{content.length}</span>
                <span className='ml-1'>字</span>
              </div>
            )}
            <button
              onClick={() => {
                setActiveReplyId(null);
                setContent('');
              }}
              className='bg-default/5 hover:bg-default/10 rounded-md px-3 py-1.5
                  text-xs text-muted transition-colors duration-200 hover:text-accent'
            >
              取消
            </button>
            <button
              onClick={handleSubmit}
              className='bg-accent/90 flex items-center gap-1.5 rounded-md px-4
                  py-1.5 text-sm font-medium text-muted transition-colors duration-200 hover:bg-accent'
            >
              <span>发送</span>
              <span className='font-mono'>→</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default ReplyInput;
