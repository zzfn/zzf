import { useSession } from 'next-auth/react';
import SignIn from '@/components/auth/SignIn';
import { Button, useMessage } from '@/components/ui';
import { useState } from 'react';
import UserInfo from '@/components/auth/UserInfo';
import { useCommentOrReply, useGithubLogin } from '@/services/comment';
interface CommentTreeProps {
  params: {
    objectId: string;
    objectType: string;
  };
  mutate: any;
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
      message?.add({ content: '发布失败', type: 'error' });
    }
  };

  if (status === 'loading') {
    return <div>loading...</div>;
  }

  if (!session) {
    return (
      <div className='animate-fade-in border-default flex flex-col items-center justify-center space-y-3 rounded-lg border border-dashed p-6'>
        <p className='text-muted text-sm'>登录后参与讨论</p>
        <SignIn />
      </div>
    );
  }

  return (
    <div className='animate-fade-in relative space-y-4'>
      <UserInfo />
      <div className='relative'>
        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          rows={1}
          className='bg-opacity border-default placeholder:text-muted focus:border-accent focus:ring-accent w-full rounded-lg border p-4 pb-14 text-sm transition-colors duration-200 focus:ring-1 focus:outline-none'
          placeholder={replyTo ? `回复 @${replyTo}...` : '参与讨论...'}
        />
        <div className='absolute right-3 bottom-3 flex items-center gap-3'>
          {content && (
            <div className='text-muted/80 bg-default/5 rounded-md px-2 py-1 text-xs'>
              <span className='font-mono tabular-nums'>{content.length}</span>
              <span className='ml-1'>字</span>
            </div>
          )}
          {content && (
            <>
              {replyTo && (
                <Button
                  onClick={() => setReplyTo(null)}
                  className='bg-default/5 hover:bg-default/10 text-muted hover:text-accent rounded-md px-3 py-1.5 text-xs transition-colors duration-200'
                >
                  取消回复
                </Button>
              )}
              <button
                onClick={handleSubmit}
                className='bg-accent-muted text-muted hover:bg-accent flex items-center gap-1.5 rounded-md px-4 py-1.5 text-sm font-medium transition-colors duration-200'
              >
                <span>发布</span>
                <span className='font-mono'>→</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainCommentInput;
