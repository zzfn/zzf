'use client';
import { useEffect, useState } from 'react';
import { useCommentOrReply, useGetComment } from 'models/comment';
import { Button, useMessage } from '@oc/design';
import { AnimatePresence, motion } from 'framer-motion';
import Avatar from './Avatar';

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

const Comment = ({ params, username }: any) => {
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

  const ReplyInput = ({ parentId, username }: { parentId: string; username: string }) => (
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
              onClick={async () => {
                await trigger();
                await mutate();
                setContent('');
                setActiveReplyId(null);
                message?.add({ content: '回复成功' });
              }}
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

  useEffect(() => {
    console.log(1111, data);
  }, [data]);
  return (
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

      {/* 主评论输入框 */}
      <div className='relative space-y-4'>
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
                  onClick={async () => {
                    await trigger();
                    await mutate();
                    setContent('');
                    setReplyTo(null);
                    message?.add({ content: '发布成功' });
                  }}
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

      {/* 评论列表 */}
      <div className='space-y-6'>
        {data.map((comment: any) => (
          <motion.div key={comment.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* 主评论 */}
            <div className='flex gap-4'>
              {/* 头像 */}
              <div className='relative h-10 w-10 shrink-0'>
                <div className='bg-accent/10 absolute inset-0 rounded-full'>
                  {comment.appUser?.avatar_url ? (
                    <img
                      src={comment.appUser.avatar_url}
                      alt=''
                      className='h-full w-full rounded-full object-cover'
                    />
                  ) : (
                    <Avatar userId={comment.username || comment.ip} />
                  )}
                </div>
              </div>

              {/* 评论内容区 */}
              <div className='flex-1 space-y-2'>
                {/* 用户名 */}
                <div className='font-medium text-default'>{comment.username}</div>

                {/* 评论内容 */}
                <p className='text-sm text-default'>{comment.content}</p>

                {/* 时间和地址 */}
                <div className='flex items-center gap-3 text-xs text-muted'>
                  <span>{formatTime(comment.createdAt)}</span>
                  {comment.address && (
                    <>
                      <span>·</span>
                      <span>{comment.address}</span>
                    </>
                  )}
                </div>

                {/* 回复按钮 */}
                <div className='flex items-center gap-4 text-xs'>
                  <button
                    onClick={() => {
                      setActiveReplyId(activeReplyId === comment.id ? null : comment.id);
                      setContent('');
                    }}
                    className='text-muted hover:text-accent'
                  >
                    回复
                  </button>
                </div>

                <AnimatePresence>
                  {activeReplyId === comment.id && (
                    <ReplyInput parentId={comment.id} username={comment.username} />
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* 回复列表 */}
            {comment.replies?.length > 0 && (
              <div className='ml-12 space-y-4 border-l border-default pl-4'>
                {comment.replies.map((reply: any) => (
                  <div key={reply.id} className='flex gap-4'>
                    {/* 回复头像 */}
                    <div className='relative h-8 w-8 shrink-0'>
                      <div className='bg-accent/5 absolute inset-0 rounded-full'>
                        {reply.appUser?.avatar_url ? (
                          <img
                            src={reply.appUser.avatar_url}
                            alt=''
                            className='h-full w-full rounded-full object-cover'
                          />
                        ) : (
                          <Avatar userId={reply.username || reply.ip} />
                        )}
                      </div>
                    </div>

                    {/* 回复内容区 */}
                    <div className='flex-1 space-y-2'>
                      {/* 用户名 */}
                      <div className='font-medium text-default'>{reply.username}</div>

                      {/* 回复内容 */}
                      <p className='text-sm text-default'>{reply.content}</p>

                      {/* 时间和地址 */}
                      <div className='flex items-center gap-3 text-xs text-muted'>
                        <span>{formatTime(reply.createdAt)}</span>
                        {reply.address && (
                          <>
                            <span>·</span>
                            <span>{reply.address}</span>
                          </>
                        )}
                      </div>

                      {/* 回复按钮 */}
                      <button
                        onClick={() => {
                          setActiveReplyId(activeReplyId === reply.id ? null : reply.id);
                          setContent('');
                        }}
                        className='text-xs text-muted hover:text-accent'
                      >
                        回复
                      </button>

                      <AnimatePresence>
                        {activeReplyId === reply.id && (
                          <ReplyInput parentId={comment.id} username={reply.username} />
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
