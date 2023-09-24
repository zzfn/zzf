'use client';
import CommentCard from './CommentCard';
import { Button } from '@oc/design';
import { useEffect, useState } from 'react';
import Avatar from './Avatar';
import { useAtomValue } from 'jotai';
import { userAtom } from 'atoms/userAtoms';
import { useCommentOrReply, useGetComment } from 'models/comment';
import { AnimatePresence, motion } from 'framer-motion';

const Comment = ({ params }: { params: { objectType: string; objectId: string } }) => {
  const { data = [], mutate } = useGetComment(params);
  const visitorId = useAtomValue(userAtom);
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState<string>('');
  const { trigger } = useCommentOrReply('comments', {
    objectId: params.objectId,
    objectType: params.objectType,
    content,
    userID: visitorId,
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
        className='block p-2.5 w-full text-sm text-muted bg-muted rounded-lg border border-default focus:ring-blue-500 focus:border-blue-500 resize-none'
        placeholder='说点什么'
      />
      <AnimatePresence>
        {isVisible && (
          <>
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className='flex justify-between items-center py-2'
            >
              <Avatar userId={visitorId} />
              <Button
                onClick={async () => {
                  await trigger();
                  await mutate();
                  setContent('');
                  setIsVisible(false);
                }}
              >
                Post comment
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {data.length === 0 ? (
        <div className='h-10 text-center py-6'>暂无评论</div>
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
