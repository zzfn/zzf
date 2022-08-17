import React, { useEffect, useState } from 'react';
import { listDiscuss, saveDiscuss } from 'api/discuss';
import classNames from 'classnames';
import { Modal, Comment, Input, Alert } from '@dekopon/design';
import multiavatar from '@multiavatar/multiavatar/esm';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { Message } from '@dekopon/design';
function getImageDataURL(svgXml: string) {
  return 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svgXml)));
}
function Evaluation(props: any) {
  const { id } = props;
  const [list, setList] = useState<any>([]);
  const [len, setLen] = useState(0);
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState('');
  const user = useSelector((state: RootState) => state.user);
  const [replyInfo, setReplyInfo] = useState({ replyId: '', parentId: '' });
  const initial = async () => {
    const { data } = await listDiscuss({ id });
    setLen(data.length);
    const r = data.reduce((prev: any, curr: any) => {
      if (curr.parentId) {
        const obj = data.find((item: any) => item.id === curr.parentId);
        if (obj) {
          const reply = data.find((item: any) => item.id === curr.replyId);
          curr.replyName = reply?.nickName || reply.createBy;
          obj.children = obj.children || [];
          obj.children.push(curr);
        }
      } else {
        prev.push(curr);
      }
      return prev;
    }, []);
    setList(r);
  };
  const handleComment = async () => {
    if (!content) return;
    const { data } = await saveDiscuss({
      articleId: id,
      content,
      ...replyInfo,
      username: user.info.username,
    });
    if (data) {
      Message.success('评论成功');
      setVisible(false);
      initial();
    }
  };
  useEffect(() => {
    initial();
  }, [id]);
  return (
    <>
      <header
        className={classNames('border-y', 'my-4', 'flex', 'justify-between', 'text-gray-400')}
      >
        全部评论（{len}）
        <span
          onClick={() => {
            setReplyInfo({ replyId: '', parentId: '' });
            setVisible(true);
          }}
          className='text-gray-400'
        >
          评论
        </span>
      </header>
      {list?.map((item: any) => {
        return (
          <Comment
            onReply={() => {
              setReplyInfo({ replyId: item.id, parentId: item.id });
              setVisible(true);
            }}
            avatar={item.avatar ?? getImageDataURL(multiavatar(item.createBy || item.id))}
            content={item.content}
            datetime={`${item.address}-${item.createTime}`}
            author={item.nickName || item.createBy}
            key={item.id}
          >
            {item.children?.map(
              (_: {
                id: React.Key;
                content: string;
                address: any;
                createTime: any;
                nickName: string;
                avatar: any;
                createBy: string;
                replyName: string;
              }) => (
                <Comment
                  onReply={() => {
                    setReplyInfo({ replyId: _.id as string, parentId: item.id });
                    setVisible(true);
                  }}
                  avatar={_.avatar ?? getImageDataURL(multiavatar(_.createBy || _.id))}
                  content={_.content}
                  datetime={`${_.address}-${_.createTime}`}
                  author={`${_.nickName || _.createBy} 回复 ${_.replyName}`}
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
        {!user.isLogin && <Alert className='mb-2'>当前未登陆，可匿名评论</Alert>}
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
