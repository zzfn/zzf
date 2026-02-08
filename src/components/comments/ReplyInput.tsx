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
        <div className='border-border-muted bg-bg-subtle flex flex-col items-center justify-center space-y-3 rounded-xl border border-dashed p-4'>
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
      <div className='border-border-muted bg-bg-subtle rounded-xl border p-4'>
        <div className='mb-3 flex items-center gap-2'>
          <span className='text-fg-muted text-xs'>回复</span>
          <span className='text-fg-default text-xs font-semibold'>@{username}</span>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={2}
          className='placeholder:text-fg-muted/50 border-border-muted bg-bg-default focus:border-border-accent-emphasis focus:ring-border-accent-emphasis mb-3 w-full resize-none rounded-lg border p-3 text-sm transition-colors focus:ring-1 focus:outline-none'
          placeholder='输入回复内容...'
          autoFocus
        />

        <div className='flex items-center justify-between'>
          <div className='text-fg-muted text-xs'>
            {content && (
              <span className='bg-bg-muted rounded-lg px-2 py-1 font-medium tabular-nums'>
                {content.length} 字
              </span>
            )}
          </div>

          <div className='flex gap-2'>
            <button
              onClick={() => {
                setContent('');
              }}
              className='text-fg-muted hover:bg-bg-muted border-border-muted rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors'
            >
              取消
            </button>
            <button
              onClick={handleSubmit}
              disabled={!content.trim()}
              className='bg-bg-emphasis text-fg-onEmphasis flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-xs font-medium transition-all hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50'
            >
              <span>发送</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default ReplyInput;
