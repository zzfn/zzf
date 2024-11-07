'use client';
import { useEffect, useState } from 'react';
import { useCommentOrReply, useGetComment } from 'models/comment';
import { Button, useMessage } from '@oc/design';
import { AnimatePresence, motion } from 'framer-motion';
import Avatar from './Avatar';
import SignIn from '@/app/_components/SignIn';
import { useSession, SessionProvider } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
// 添加时间格式化函数
const formatTime = (timestamp: string) => {
  return new Date(timestamp).toLocaleString('zh-CN', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// 添加类型定义
interface CommentType {
  id: string;
  content: string;
  username: string;
  createdAt: string;
  address?: string;
  appUser?: {
    avatar_url?: string;
  };
  replies?: CommentType[];
}

interface CommentProps {
  params: {
    objectId: string;
    objectType: string;
  };
  username: string;
}

// 优化评论项组件
const CommentItem = ({
  comment,
  onReply,
}: {
  comment: CommentType;
  onReply: (id: string) => void;
}) => {
  return (
    <div className='flex gap-4'>
      <div className='relative h-10 w-10 shrink-0'>
        <div className='bg-accent/10 absolute inset-0 rounded-full'>
          {comment.appUser?.avatar_url ? (
            <img
              src={comment.appUser.avatar_url}
              alt=''
              className='h-full w-full rounded-full object-cover'
            />
          ) : (
            <Avatar userId={comment.username} />
          )}
        </div>
      </div>

      <div className='flex-1 space-y-2'>
        <div className='font-medium text-default'>{comment.username}</div>
        <p className='text-sm text-default'>{comment.content}</p>
        <CommentMeta comment={comment} onReply={onReply} />
      </div>
    </div>
  );
};

// 优化评论元数据组件
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

const Comment = ({ params, username }: CommentProps) => {
  const message = useMessage();
  const { data = [], mutate } = useGetComment(params);
  const [content, setContent] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  const { trigger } = useCommentOrReply('comments', {
    objectId: params.objectId,
    objectType: params.objectType,
    content,
    userID: username,
  });

  // 优化回复处理函数
  const handleReply = (id: string) => {
    setActiveReplyId(activeReplyId === id ? null : id);
    setContent('');
  };

  // 优化提交处理函数
  const handleSubmit = async () => {
    try {
      await trigger();
      await mutate();
      setContent('');
      setActiveReplyId(null);
      setReplyTo(null);
      message?.add({ content: '发布成功' });
    } catch (error) {
      message?.add({ content: '发布失败', type: 'error' });
    }
  };

  // 添加用户信息显示组件
  const UserInfo = () => {
    const { data: session } = useSession();

    if (session?.user) {
      return (
        <div className='mb-4 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='relative h-8 w-8 shrink-0'>
              <div className='bg-accent/10 absolute inset-0 rounded-full'>
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt=''
                    className='h-full w-full rounded-full object-cover'
                  />
                ) : (
                  <Avatar userId={session.user.name || ''} />
                )}
              </div>
            </div>
            <span className='text-sm font-medium text-default'>{session.user.name}</span>
          </div>

          <button
            onClick={() => signOut()}
            className='hover:bg-default/5 flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs 
              text-muted transition-colors duration-200 hover:text-accent'
          >
            <LogOut size={14} />
            <span>退出登录</span>
          </button>
        </div>
      );
    }
    return null;
  };

  const ReplyInput = ({ parentId, username }: { parentId: string; username: string }) => {
    const { data: session } = useSession();
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
              <Button
                onClick={() => {
                  setActiveReplyId(null);
                  setContent('');
                }}
                className='bg-default/5 hover:bg-default/10 rounded-md px-3 py-1.5
                  text-xs text-muted transition-colors duration-200 hover:text-accent'
              >
                取消
              </Button>
              <Button
                onClick={handleSubmit}
                className='bg-accent/90 flex items-center gap-1.5 rounded-md px-4
                  py-1.5 text-sm font-medium text-muted transition-colors duration-200 hover:bg-accent'
              >
                <span>发送</span>
                <span className='font-mono'>→</span>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const MainCommentInput = () => {
    const { data: session } = useSession();
    if (!session) {
      return (
        <div className='flex flex-col items-center justify-center space-y-3 rounded-lg border border-dashed border-default p-6'>
          <p className='text-sm text-muted'>登录后参与讨论</p>
          <SignIn />
        </div>
      );
    }

    return (
      <div className='relative space-y-4'>
        <UserInfo />
        <div className='relative'>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
                <Button
                  onClick={handleSubmit}
                  className='bg-accent/90 flex items-center gap-1.5 rounded-md px-4
                    py-1.5 text-sm font-medium text-muted transition-colors duration-200 hover:bg-accent'
                >
                  <span>发布</span>
                  <span className='font-mono'>→</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <SessionProvider>
      <div className='space-y-8'>
        {/* 评论统计 */}
        <div className='flex items-center justify-between border-b border-default pb-4'>
          <div className='flex items-center gap-3'>
            <div className='flex items-center gap-2 text-sm text-muted'>
              <span className='font-mono text-accent'>#</span>
              <span className='font-medium'>讨论区</span>
            </div>
            <div className='flex items-center gap-1 text-xs text-muted'>
              <span className='font-mono'>{data.length.toString().padStart(2, '0')}</span>
              <span>条评论</span>
            </div>
          </div>
          <div className='flex items-center gap-1.5 text-xs'>
            <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-success-muted'></span>
            <span className='font-mono'>实时对话</span>
          </div>
        </div>

        <MainCommentInput />

        <div className='space-y-6'>
          {data.map((comment: CommentType) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <CommentItem comment={comment} onReply={handleReply} />

              {/* 回复输入框 */}
              <AnimatePresence>
                {activeReplyId === comment.id && (
                  <ReplyInput parentId={comment.id} username={comment.username} />
                )}
              </AnimatePresence>

              {/* 回复列表 */}
              {comment.replies?.length > 0 && (
                <div className='ml-12 space-y-4 border-l border-default pl-4'>
                  {comment.replies.map((reply) => (
                    <motion.div key={reply.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <CommentItem comment={reply} onReply={handleReply} />
                      {activeReplyId === reply.id && (
                        <ReplyInput parentId={comment.id} username={reply.username} />
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </SessionProvider>
  );
};

export default Comment;
