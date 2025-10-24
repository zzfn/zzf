import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import SignIn from '@/components/auth/SignIn';
import { useState } from 'react';
import { useCommentOrReply } from '@/services/comment';
import type { KeyedMutator } from 'swr';
import type { Comment } from 'types/comment';

const ReplyInput = ({
  parentId,
  username,
  mutate,
}: {
  parentId: string;
  mutate: KeyedMutator<Comment[] | undefined>;
  username: string;
}) => {
  const { data: session } = useSession();
  const [content, setContent] = useState('');
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
        <div className='border-border-default mt-2 flex flex-col items-center justify-center space-y-3 rounded-lg border border-dashed p-4'>
          <p className='text-fg-muted text-sm'>登录后回复评论</p>
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
            className='bg-opacity border-border-default placeholder:text-fg-muted focus:border-border-accent-emphasis focus:ring-border-accent-emphasis w-full rounded-lg border p-4 pb-14 text-sm transition-colors duration-200 focus:ring-1 focus:outline-none'
            placeholder={`回复 @${username}...`}
            autoFocus
          />
          <div className='absolute right-3 bottom-3 flex items-center gap-3'>
            {content && (
              <div className='text-fg-muted/80 bg-bg-default/5 rounded-md px-2 py-1 text-xs'>
                <span className='font-mono tabular-nums'>{content.length}</span>
                <span className='ml-1'>字</span>
              </div>
            )}
            <button
              onClick={() => {
                setContent('');
              }}
              className='bg-bg-default/5 hover:bg-bg-default/10 text-fg-muted hover:text-fg-accent rounded-md px-3 py-1.5 text-xs transition-colors duration-200'
            >
              取消
            </button>
            <button
              onClick={handleSubmit}
              className='bg-bg-accent/90 text-fg-muted hover:bg-bg-accent flex items-center gap-1.5 rounded-md px-4 py-1.5 text-sm font-medium transition-colors duration-200'
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
