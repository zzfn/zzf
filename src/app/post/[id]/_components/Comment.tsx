'use client';
import CommentCard from './CommentCard';
import { Button, useMessage } from '@oc/design';
import { useState } from 'react';
import { useCommentOrReply, useGetComment } from 'models/comment';
import { AnimatePresence, motion } from 'framer-motion';

const Comment = ({
  params,
  username,
}: {
  params: { objectType: string; objectId: string };
  username?: string;
}) => {
  const message = useMessage();
  const { data = [], mutate } = useGetComment(params);
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState<string>('');
  const { trigger } = useCommentOrReply('comments', {
    objectId: params.objectId,
    objectType: params.objectType,
    content,
    userID: username,
  });
  return (
    <div className='mx-auto my-8 max-w-3xl rounded-xl bg-white/50 p-6 backdrop-blur-sm'>
      <div className='mb-8 text-center'>
        <h6 className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent'>
          评论区
        </h6>
        <p className='text-neutral-2 mt-2 flex items-center justify-center'>
          共有评论 <span className='mx-1 font-medium text-accent'>{data.length}</span> 条
        </p>
      </div>

      <div className='relative mb-6'>
        <textarea
          value={content}
          onChange={(evt) => {
            setContent(evt.target.value);
            setIsVisible(!!evt.target.value);
          }}
          rows={3}
          className='block w-full resize-none rounded-xl border border-neutral-200 
            bg-white/70 p-4 text-sm text-neutral-800 
            transition-all duration-200 ease-in-out 
            placeholder:text-neutral-400 focus:border-blue-500 focus:ring-2
            focus:ring-blue-200'
          placeholder='说点什么吧...'
        />
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className='mb-4 flex items-center justify-end py-2'
          >
            <Button
              onClick={async () => {
                await trigger();
                await mutate();
                setContent('');
                setIsVisible(false);
                message?.add({
                  content: '评论成功',
                });
              }}
              className='transform rounded-full bg-gradient-to-r from-blue-500 to-blue-600
                px-6 py-2 text-white shadow-md transition-all duration-200 
                hover:-translate-y-0.5 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg'
            >
              发表评论
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {data.length === 0 ? (
        <div className='py-12 text-center'>
          <p className='text-neutral-400'>暂无评论，来说两句吧～</p>
        </div>
      ) : (
        <div className='space-y-6'>
          {data.map((item: any) => (
            <CommentCard
              mutate={mutate}
              key={item.id}
              item={item}
              commentId={item.id}
              className='transition-colors duration-200 hover:bg-neutral-50'
            >
              {item.replies?.map((_: any) => (
                <CommentCard
                  mutate={mutate}
                  commentId={item.id}
                  key={_.id}
                  item={_}
                  className='ml-8 mt-4 border-l-2 border-neutral-100 pl-4'
                />
              ))}
            </CommentCard>
          ))}
        </div>
      )}
    </div>
  );
};
export default Comment;
