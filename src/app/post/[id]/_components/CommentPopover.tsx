'use client';
import { useEffect, useState } from 'react';
import { Input, Message, Popover } from '@oc/design';
import Monitor from '../../../../utils/monitor';
import Avatar from './Avatar';
import IconSymbols from '../../../../components/IconSymbols';
import useSWRMutation from 'swr/mutation';
import { useCommentOrReply } from '../../../../models/comment';

async function sendRequest(
  url: string,
  {
    arg,
  }: {
    arg: { objectId: string; content: string; createdBy: string; updatedBy: string };
  },
) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
}

const CommentPopover = function ({ children, onSuccess, params }: any) {
  const { action, ...rest } = params;
  const [content, setContent] = useState('');
  const [visitorId, setVisitorId] = useState('');
  const [visible, setVisible] = useState(false);
  const { data, trigger } = useCommentOrReply(
    params.action === 'comment' ? `comments` : `replies`,
    {
      ...rest,
      objectId: rest.objectId || 0,
      content,
      userID: visitorId,
    },
  );
  const handleComment = async () => {
    if (!content) return;
    trigger();
    if (data) {
      onSuccess();
      setVisible(false);
      setContent('');
      Message.success('评论成功');
    }
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
          <Input
            className='h-full'
            onChange={(e) => setContent(e.target.value)}
            value={content}
            placeholder='说点什么'
          />
          <div className='flex items-center justify-between py-1'>
            <Avatar userId={visitorId} />
            <IconSymbols
              onClick={() => {
                handleComment();
              }}
              icon='send'
            />
          </div>
        </div>
      }
    >
      {children}
    </Popover>
  );
};
export default CommentPopover;
