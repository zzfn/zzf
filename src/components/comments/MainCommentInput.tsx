import SignIn from '@/components/auth/SignIn';
import { useMessage } from '@/components/ui';
import { useState } from 'react';
import UserInfo from '@/components/auth/UserInfo';
import { useCommentOrReply } from '@/services/comment';
import { useCurrentUser } from '@/services/auth';
import type { KeyedMutator } from 'swr';
import type { Comment } from 'types/comment';
interface CommentTreeProps {
  params: {
    objectId: string;
    objectType: string;
  };
  mutate: KeyedMutator<Comment[] | undefined>;
}

function MainCommentInput({ params, mutate }: CommentTreeProps) {
  const [content, setContent] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const { currentUser, isLoading } = useCurrentUser();
  const message = useMessage();
  const { trigger } = useCommentOrReply('comments', {
    objectId: params.objectId,
    objectType: params.objectType,
    content,
    username: currentUser?.username,
  });

  const handleSubmit = async () => {
    try {
      await trigger();
      await mutate();
      setContent('');
      setReplyTo(null);
      message?.add({ content: '发布成功' });
    } catch (error) {
      console.error(error);
      message?.add({ content: '发布失败', type: 'error' });
    }
  };

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (!currentUser) {
    return (
      <div className='animate-fade-in border-border-muted flex flex-col items-center justify-center space-y-3 rounded-2xl border border-dashed p-6'>
        <p className='text-fg-muted text-sm'>登录后参与讨论</p>
        <SignIn />
      </div>
    );
  }

  return (
    <div className='animate-fade-in space-y-4'>
      <div className='border-border-muted bg-bg-subtle rounded-2xl border p-5'>
        <UserInfo />

        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          rows={3}
          className='placeholder:text-fg-muted/50 border-border-muted bg-bg-default focus:border-border-accent-emphasis focus:ring-border-accent-emphasis mb-4 w-full resize-none rounded-xl border p-4 text-[15px] font-medium transition-colors focus:ring-1 focus:outline-none'
          placeholder={replyTo ? `回复 @${replyTo}...` : '分享你的想法...'}
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
            {replyTo && (
              <button
                onClick={() => setReplyTo(null)}
                className='text-fg-muted hover:bg-bg-muted border-border-muted rounded-xl border px-4 py-2 text-sm font-medium transition-colors'
              >
                取消
              </button>
            )}
            <button
              onClick={handleSubmit}
              disabled={!content.trim()}
              className='bg-bg-emphasis text-fg-onEmphasis group flex items-center gap-2 rounded-xl px-6 py-2 text-sm font-medium transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50'
            >
              <span>发送</span>
              <span className='transition-transform group-hover:translate-x-0.5'>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainCommentInput;
