import { useSession } from 'next-auth/react';
import SignIn from '@/app/_components/SignIn';
import { Button, useMessage } from '@oc/design';
import { useState } from 'react';
import UserInfo from '@/app/_components/UserInfo';
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
      <div className='animate-fade-in flex flex-col items-center justify-center space-y-3 rounded-lg border border-dashed border-default p-6'>
        <p className='text-sm text-muted'>登录后参与讨论</p>
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
            console.log(111, e.target.value);
            setContent(e.target.value);
          }}
          rows={1}
          className='bg-opacity w-full rounded-lg border border-default p-4 pb-14 text-sm
              transition-colors duration-200 placeholder:text-muted focus:border-accent focus:outline-none
              focus:ring-1 focus:ring-accent'
          placeholder={replyTo ? `回复 @${replyTo}...` : '参与讨论...'}
        />
        <div className='absolute bottom-3 right-3 flex items-center gap-3'>
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
                  className='bg-default/5 hover:bg-default/10 rounded-md px-3 py-1.5
                      text-xs text-muted transition-colors duration-200 hover:text-accent'
                >
                  取消回复
                </Button>
              )}
              <button
                onClick={handleSubmit}
                className='flex items-center gap-1.5 rounded-md bg-accent-muted px-4
                    py-1.5 text-sm font-medium text-muted transition-colors duration-200 hover:bg-accent'
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
