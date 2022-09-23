import React, { useCallback, useEffect, useState } from 'react';
import { listDiscuss, saveDiscuss } from 'api/discuss';
import classNames from 'classnames';
import { Modal, Comment, Input, Alert, Tag } from '@dekopon/design';
import multiavatar from '@multiavatar/multiavatar/esm';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { Message } from '@dekopon/design';
import { useQuery } from '@tanstack/react-query';
import { spans } from "next/dist/build/webpack/plugins/profiling-plugin";

function getImageDataURL(svgXml: string) {
  return 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svgXml)));
}
function getAuthor(item:any) {
  if(item.reply){
    return <span>{item.createBy?.slice(-6)} @<a className="text-primary">{item.reply.slice(-6)}</a></span>
  }else {
    return item.createBy.slice(-6)
  }
}
function Evaluation(props: any) {
  const { id } = props;
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState('');
  const [reply, setReply] = useState('');
  const user = useSelector((state: RootState) => state.user);
  const { data = [] } = useQuery([id], () => listDiscuss({ id }).then(({ data }) => data));
  const handleComment = async () => {
    if (!content) return;
    const { data } = await saveDiscuss({
      interfaceId: id,
      content,
      reply,
    });
    if (data) {
      Message.success('评论成功');
      setVisible(false);
    }
  };
  return (
    <>
      <header
        className={classNames('border-y', 'my-4', 'flex', 'justify-between', 'text-gray-400')}
      >
        全部评论
        <span
          onClick={() => {
            setVisible(true);
            setReply(null);
          }}
          className='text-gray-400'
        >
          评论
        </span>
      </header>
      {data?.map((item: any) => {
        return (
          <Comment
            onReply={() => {
              setVisible(true);
              setReply(item.createBy);
            }}
            avatar={item.avatar ?? getImageDataURL(multiavatar(item.createBy || item.id))}
            content={`${item.content}`}
            datetime={`${item.address}-${item.createTime}`}
            author={getAuthor(item)}
            key={item.id}
          />
        );
      })}
      <Modal
        title='评论'
        visible={visible}
        onCancel={() => setVisible(false)}
        onConfirm={handleComment}
      >
        <Alert>根据您的设备特征计算出设备指纹，并作为用户标识</Alert>
        设备指纹为<Tag className='mb-2'>{user.id}</Tag>
        <Input
          type="textarea"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder='请输入您的意见'
        ></Input>
      </Modal>
    </>
  );
}

export default Evaluation;
