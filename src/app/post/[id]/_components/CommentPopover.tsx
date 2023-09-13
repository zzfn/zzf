'use client';
import { useEffect, useState } from 'react';
import { IconButton, Input, Message, Popover } from '@oc/design';
import Monitor from 'utils/monitor';
import Avatar from './Avatar';
import IconSymbols from 'components/IconSymbols';
import useSWRMutation from 'swr/mutation';
import { useCommentOrReply } from 'models/comment';

const CommentPopover = function ({ children,commentId,mutate }: any) {
  const [content, setContent] = useState('');
  const [visitorId, setVisitorId] = useState('');
  const [visible, setVisible] = useState(false);
  const { trigger } = useCommentOrReply(
    'replies',
    {
      commentId: commentId,
      content,
      userID: visitorId,
    },
  );
  const handleComment = async () => {
    if (!content) return;
    await trigger();
    await mutate()
    setVisible(false)
    setContent('')
  };
  const getVisitorId = async () => {
    const monitor = new Monitor();
    const id = await monitor.getVisitor();
    setVisitorId(id);
  };
  useEffect(() => {
    getVisitorId();
  }, []);
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
            className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none'
            placeholder='说点什么'
          />
          <div className='flex items-center justify-between py-1'>
            <Avatar userId={visitorId} />
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
