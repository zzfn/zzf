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
    <>
      <h6 className='text-center font-bold'>评论区</h6>
      共有评论 <span className='text-accent'>{data.length}</span> 条
      <textarea
        value={content}
        onChange={(evt) => {
          setContent(evt.target.value);
          setIsVisible(!!evt.target.value);
        }}
        rows={3}
        className='block w-full resize-none rounded-lg border border-default bg-muted p-2.5 text-sm text-muted focus:border-blue-500 focus:ring-blue-500'
        placeholder='说点什么'
      />
      <AnimatePresence>
        {isVisible && (
          <>
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className='flex items-center justify-between py-2'
            >
              <Button
                onClick={async () => {
                  await trigger();
                  await mutate();
                  setContent('');
                  setIsVisible(false);
                  message?.add({
                    content: '操作成功',
                  });
                }}
              >
                Post comment
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {data.length === 0 ? (
        <div className='h-10 py-6 text-center'>暂无评论</div>
      ) : (
        <div className='py-6'>
          {data.map((item: any) => (
            <CommentCard mutate={mutate} key={item.id} item={item} commentId={item.id}>
              {item.replies?.map((_: any) => (
                <CommentCard mutate={mutate} commentId={item.id} key={_.id} item={_} />
              ))}
            </CommentCard>
          ))}
        </div>
      )}
    </>
  );
};
export default Comment;
