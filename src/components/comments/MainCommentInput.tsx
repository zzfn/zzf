import { useSession } from 'next-auth/react';
import SignIn from '@/components/auth/SignIn';
import { useMessage } from '@/components/ui';
import { useState } from 'react';
import UserInfo from '@/components/auth/UserInfo';
import { useCommentOrReply, useGithubLogin } from '@/services/comment';
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
  const { data: session, status } = useSession();
  const { trigger: githubLogin } = useGithubLogin({
    username: session?.user?.name,
    avatarUrl: session?.user?.image,
  });
  const message = useMessage();
  const { trigger } = useCommentOrReply('comments', {
    objectId: params.objectId,
    objectType: params.objectType,
    content,
    username: session?.user?.name,
  });

  const handleSubmit = async () => {
    try {
      await trigger();
      await githubLogin();
      await mutate();
      setContent('');
      setReplyTo(null);
      message?.add({ content: '发布成功' });
    } catch (error) {
      console.error(error);
      message?.add({ content: '发布失败', type: 'error' });
    }
  };

  if (status === 'loading') {
    return <div>loading...</div>;
  }

  if (!session) {
    return (
      <div className='animate-fade-in border-border-default flex flex-col items-center justify-center space-y-3 rounded-lg border border-dashed p-6'>
        <p className='text-fg-muted text-sm'>登录后参与讨论</p>
        <SignIn />
      </div>
    );
  }

  return (
    <div className='animate-fade-in relative space-y-6'>
      <div className='flex items-center gap-3'>
        <div className='bg-bg-accent-muted h-10 w-10 overflow-hidden rounded-2xl border-2 border-white/50 shadow-sm'>
          <UserInfo />
        </div>
        <span className='text-fg-default text-sm font-bold'>@{session.user?.name}</span>
      </div>

      <div className='clay relative !rounded-2xl !p-1'>
        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          rows={3}
          className='placeholder:text-fg-muted/50 w-full rounded-2xl border-none bg-transparent p-4 pb-16 text-lg font-medium focus:ring-0 focus:outline-none'
          placeholder={replyTo ? `回复 @${replyTo}...` : '分享你的想法...'}
        />
        <div className='absolute right-4 bottom-4 flex items-center gap-4'>
          {content && (
            <div className='text-fg-muted/60 rounded-lg bg-white/40 px-2 py-1 text-[10px] leading-none font-black tracking-widest uppercase'>
              <span className='tabular-nums'>{content.length}</span> chars
            </div>
          )}
          {content && (
            <div className='flex gap-2'>
              {replyTo && (
                <button
                  onClick={() => setReplyTo(null)}
                  className='text-fg-muted rounded-xl bg-white/50 px-4 py-2 text-sm font-bold transition-all hover:bg-white/80'
                >
                  取消
                </button>
              )}
              <button
                onClick={handleSubmit}
                className='clay-btn clay-blue group flex items-center gap-2 !rounded-xl !px-6 !py-2 !text-sm'
              >
                <span>发送</span>
                <span className='transition-transform group-hover:translate-x-1'>→</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainCommentInput;
