import React, { useEffect, useState } from 'react';
import { listDiscuss, saveDiscuss } from 'api/discuss';
import { Modal, Comment, Input, Alert, Tag, Tooltip, Button } from '@oc/design';
import multiAvatar from '@multiavatar/multiavatar/esm';
import { Message } from '@oc/design';
import { useQuery } from '@tanstack/react-query';
import { list2tree } from 'utils/list2tree';
import { diff } from 'utils/time';
import { IconHistory, IconHome, IconShareInternal } from '@oc/icon';
import Monitor from '../utils/monitor';

function getImageDataURL(avatar: string) {
  return (
    'data:image/svg+xml;base64,' +
    window.btoa(decodeURIComponent(encodeURIComponent(multiAvatar(avatar))))
  );
}
const EvaluationCard = ({ record, children, onReply }: any) => {
  return (
    <Comment
      avatar={getImageDataURL(record.createBy)}
      author={record.createBy.slice(-6)}
      content={`${record.content}`}
      actions={[
        <li
          onClick={onReply}
          className='mr-2 cursor-pointer text-[var(--secondary-text)]'
          key='reply'
        >
          <IconShareInternal className='mr-1' />
          回复
        </li>,
        <li className='mr-2 text-[var(--secondary-text)]' key='address'>
          <IconHome className='mr-1' />
          {record.address}
        </li>,
        <li className='text-[var(--secondary-text)]' key='time'>
          <IconHistory className='mr-1' />
          <Tooltip placement='bottom' content={record.createTime}>
            <span>{diff(record.createTime)}</span>
          </Tooltip>
        </li>,
      ]}
    >
      {children}
    </Comment>
  );
};

function Evaluation(props: any) {
  const { id } = props;
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState('');
  const [reply, setReply] = useState('');
  const [replyId, setReplyId] = useState('');
  const [ownerImg, setOwnerImg] = useState('');
  const { data = [] } = useQuery([id], () =>
    listDiscuss({ id }).then(({ data }) => list2tree(data)),
  );
  const handleComment = async () => {
    if (!content) return;
    const { data } = await saveDiscuss({
      interfaceId: id,
      content,
      reply,
      replyId,
    });
    if (data) {
      Message.success('评论成功');
      setVisible(false);
    }
  };
  const getVisitorId = async () => {
    const monitor = new Monitor();
    const id = await monitor.getVisitor();
    setVisitorId(id);
    setOwnerImg(getImageDataURL(id));
  };
  const [visitorId, setVisitorId] = useState('');
  useEffect(() => {
    getVisitorId();
  }, [visible]);
  return (
    <>
      <div className='flex'>
        <div className='flex flex-col items-center mr-3 justify-center'>
          <img className='w-10 h-10' src={ownerImg} alt='' />
          <Button onClick={handleComment} className='mt-2' type='primary'>评论</Button>
        </div>
        <Input
          type='textarea'
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder='说点什么'
        ></Input>
      </div>
      {data.map((item: any) => {
        return (
          <EvaluationCard
            onReply={() => {
              setVisible(true);
              setReply(item.createBy);
              setReplyId(item.id);
            }}
            key={item.id}
            record={item}
          >
            {item.children?.map((child: any) => (
              <EvaluationCard
                onReply={() => {
                  setVisible(true);
                  setReply(child.createBy);
                  setReplyId(item.id);
                }}
                key={child.id}
                record={child}
              />
            ))}
          </EvaluationCard>
        );
      })}
      <Modal
        title='评论'
        visible={visible}
        onCancel={() => setVisible(false)}
        onConfirm={handleComment}
      >
        <Alert>根据您的设备特征计算出设备指纹，并作为用户标识</Alert>
        设备指纹为<Tag className='mb-2'>{visitorId}</Tag>
        <Input
          type='textarea'
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder='请输入您的意见'
        ></Input>
      </Modal>
    </>
  );
}

export default Evaluation;
