'use client';
import CommentItem from '@/app/_components/CommenTree/CommentItem';
import { AnimatePresence, motion } from 'framer-motion';
import ReplyInput from '@/app/_components/CommenTree/ReplyInput';
import { useState } from 'react';
import { CommentType } from '@/app/_components/CommenTree/type';

function TreeItem({ comment, mutate }: { comment: CommentType; mutate: any }) {
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
          <ReplyInput mutate={mutate} parentId={comment.id} username={comment.username} />
        )}
      </AnimatePresence>

      {/* 回复列表 */}
      {(comment.replies ?? []).length > 0 && (
        <div className='ml-12 space-y-4 border-l border-default pl-4'>
          {comment.replies?.map((reply) => (
            <motion.div key={reply.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <CommentItem comment={reply} onReply={handleReply} />
              {activeReplyId === reply.id && (
                <ReplyInput mutate={mutate} parentId={comment.id} username={reply.username} />
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default TreeItem;
