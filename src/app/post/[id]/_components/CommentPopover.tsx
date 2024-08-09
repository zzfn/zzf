'use client';
import { useState } from 'react';
import { IconButton, Popover } from '@oc/design';
import Avatar from './Avatar';
import IconSymbols from 'components/IconSymbols';
import { useCommentOrReply } from 'models/comment';
import { useAtomValue } from 'jotai';
import { userAtom } from 'atoms/userAtoms';

const CommentPopover = function ({ children, commentId, mutate }: any) {
  const [content, setContent] = useState('');
  const visitorId = useAtomValue(userAtom);
  const [visible, setVisible] = useState(false);
  const { trigger } = useCommentOrReply('replies', {
    commentId: commentId,
    content,
    userID: visitorId,
  });
  const handleComment = async () => {
    if (!content) return;
    await trigger();
    await mutate();
    setVisible(false);
    setContent('');
  };

  return (
    <Popover
      visible={visible}
      hide={() => setVisible(false)}
      show={() => setVisible(true)}
      placement='bottomLeft'
      content={
        <div className='px-3 py-2'>
          <textarea
            value={content}
            onChange={(evt) => {
              setContent(evt.target.value);
            }}
            rows={3}
            className='block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
            placeholder='说点什么'
          />
          <div className='flex items-center justify-between py-1'>
            <Avatar userId={visitorId!} />
            <IconButton
              onClick={() => {
                handleComment();
              }}
            >
              <IconSymbols icon='send' />
            </IconButton>
          </div>
        </div>
      }
    >
      {children}
    </Popover>
  );
};
export default CommentPopover;
