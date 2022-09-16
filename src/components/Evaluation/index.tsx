import React, { useCallback, useEffect, useState } from 'react';
import { listDiscuss, saveDiscuss } from 'api/discuss';
import classNames from 'classnames';
import { Modal, Comment, Input, Alert, Tag } from '@dekopon/design';
import multiavatar from '@multiavatar/multiavatar/esm';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { Message } from '@dekopon/design';
import { useQuery } from '@tanstack/react-query';

function getImageDataURL(svgXml: string) {
  return 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svgXml)));
}

function Evaluation(props: any) {
  const { id } = props;
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState('');
  const user = useSelector((state: RootState) => state.user);
  const { data = [] } = useQuery([id], () => listDiscuss({ id }).then(({ data }) => data));
  const handleComment = async () => {
    if (!content) return;
    const { data } = await saveDiscuss({
      interfaceId: id,
      content,
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
        <span onClick={() => setVisible(true)} className='text-gray-400'>
          评论
        </span>
      </header>
      {data?.map((item: any) => {
        return (
          <Comment
            onReply={() => {
              setVisible(true);
            }}
            avatar={item.avatar ?? getImageDataURL(multiavatar(item.createBy || item.id))}
            content={item.content}
            datetime={`${item.address}-${item.createTime}`}
            author={item.userInfo.username}
            key={item.id}
          >
            {item.replyInfos?.map(
              (_: {
                id: React.Key;
                content: string;
                address: any;
                createTime: any;
                nickName: string;
                avatar: any;
                createBy: string;
                replyName: string;
                userInfo: {
                  username: string;
                };
              }) => (
                <Comment
                  onReply={() => {
                    setVisible(true);
                  }}
                  avatar={_.avatar ?? getImageDataURL(multiavatar(_.createBy || _.id))}
                  content={_.content}
                  datetime={`${_.address}-${_.createTime}`}
                  author={`${_.userInfo.username}`}
                  key={_.id}
                ></Comment>
              ),
            )}
          </Comment>
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
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder='请输入您的意见'
        ></Input>
      </Modal>
    </>
  );
}

export default Evaluation;
