'use client';
import CommentItem from './CommentItem';
import { AnimatePresence, motion } from 'framer-motion';
import ReplyInput from './ReplyInput';
import { useState } from 'react';
import { CommentType } from './type';
import type { KeyedMutator } from 'swr';

function TreeItem({
  comment,
  mutate,
}: {
  comment: CommentType;
  mutate: KeyedMutator<Comment[] | undefined>;
}) {
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const handleReply = (id: string) => {
    setActiveReplyId(activeReplyId === id ? null : id);
  };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <CommentItem comment={comment} onReply={handleReply} />

      {/* 回复输入框 */}
      <AnimatePresence>
        {activeReplyId === comment.id && (
          <div className='mt-3 ml-14'>
            <ReplyInput
              mutate={mutate as never}
              parentId={comment.id}
              username={comment.username}
            />
          </div>
        )}
      </AnimatePresence>

      {/* 回复列表 */}
      {(comment.replies ?? []).length > 0 && (
        <div className='border-border-muted relative mt-4 ml-14 space-y-3 border-l-2 pl-6'>
          {comment.replies?.map((reply) => (
            <motion.div key={reply.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <CommentItem comment={reply} onReply={handleReply} />
              <AnimatePresence>
                {activeReplyId === reply.id && (
                  <div className='mt-3 ml-14'>
                    <ReplyInput
                      mutate={mutate as never}
                      parentId={comment.id}
                      username={reply.username}
                    />
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default TreeItem;
