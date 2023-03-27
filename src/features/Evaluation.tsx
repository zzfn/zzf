import React, { useEffect, useMemo, useState } from 'react';
import { listDiscuss, saveDiscuss } from 'api/discuss';
import { Button, Comment, Input, Message, Tooltip } from '@oc/design';
import { createAvatar } from '@dicebear/core';
import { adventurer } from '@dicebear/collection';
import { useQuery } from '@tanstack/react-query';
import { list2tree } from 'utils/list2tree';
import { diff } from 'utils/time';
import Monitor from '../utils/monitor';
import Image from 'next/image';
import IconSymbols from '../components/IconSymbols';

const EvaluationCard = ({ record, children, onReply, visible }: any) => {
  const avatar = useMemo(() => {
    return createAvatar(adventurer, {
      size: 128,
      flip: true,
      hairColor: ['5E74FD', 'CB54E3', 'FBC35D', '546DE3', '0e0e0e', '85c2c6', 'dba3be', 'E7AB9A'],
      seed: record.createBy,
    }).toDataUriSync();
  }, [record.createBy]);
  return (
    <Comment
      avatar={<img className={'w-10 h-10'} src={avatar} alt='' />}
      author={record.createBy.slice(-6)}
      content={`${record.content}`}
      actions={
        <ul className='flex gap-x-2'>
          <li className='flex items-center gap-x-1' key='address'>
            <IconSymbols icon='home' />
            {record.address}
          </li>
          <li className='flex items-center gap-x-1' key='time'>
            <IconSymbols icon='schedule' />
            <Tooltip placement='bottom' content={record.createTime}>
              <span>{diff(record.createTime)}</span>
            </Tooltip>
          </li>
          <li onClick={onReply} className='flex items-center gap-x-1 cursor-pointer' key='reply'>
            <IconSymbols icon='reply' />
            <Tooltip placement='bottom' content='功能调整中，暂不可用'>
              <span className='block'>回复</span>
            </Tooltip>
          </li>
        </ul>
      }
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
  const [visitorId, setVisitorId] = useState('');
  const { data = [] } = useQuery([id], () =>
    listDiscuss({ id }).then(({ data }) => list2tree(data)),
  );
  const avatar = useMemo(() => {
    return createAvatar(adventurer, {
      size: 128,
      flip: true,
      hairColor: ['5E74FD', 'CB54E3', 'FBC35D', '546DE3', '0e0e0e', '85c2c6', 'dba3be', 'E7AB9A'],
      seed: visitorId,
    }).toDataUriSync();
  }, [visitorId]);
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
  };
  useEffect(() => {
    getVisitorId();
  }, [visible]);
  return (
    <>
      <div className='flex'>
        <div className='flex flex-col items-center mr-3 justify-center shrink-0'>
          <Image width={40} height={40} src={avatar} alt={visitorId} />
          <Button onClick={handleComment} className='mt-2'>
            评论
          </Button>
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
                visible={visible}
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
    </>
  );
}

export default Evaluation;
