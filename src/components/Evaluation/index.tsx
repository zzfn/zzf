import React, { useEffect, useState } from 'react';
import { listDiscuss } from 'api/discuss';
import classNames from 'classnames';
import { Modal, Comment } from '@zzf/design';
import Comments from './Comment';
function Evaluation(props: any) {
  const { id } = props;
  const [list, setList] = useState([]);
  const [len, setLen] = useState(0);
  const [visible, setVisible] = useState(false);

  const initial = async () => {
    const { data } = await listDiscuss({ id });
    setLen(data.length);
    const r = data.reduce((prev: any, curr: any) => {
      if (curr.parentId) {
        const obj = data.find((item: any) => item.id === curr.parentId);
        if (obj) {
          const reply = data.find((item: any) => item.id === curr.replyId);
          curr.replyName = reply.nickName;
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
  useEffect(() => {
    initial();
  }, [id]);
  return (
    <>
      <header
        className={classNames('border-y', 'my-4', 'flex', 'justify-between', 'text-gray-400')}
      >
        全部评论（{len}）
        <span onClick={() => setVisible(true)} className='text-gray-400'>
          点击回复
        </span>
      </header>
      {list?.map((item: any) => {
        return (
          <Comment
            avatar={`https://www.dmoe.cc/random.php?id=${item.id}`}
            content={item.content}
            datetime={`${item.address}-${item.createTime}`}
            author={item.nickName}
            key={item.id}
          >
            {item.children?.map(
              (_: {
                id: React.Key;
                content: string;
                address: any;
                createTime: any;
                nickName: string;
              }) => (
                <Comment
                  avatar={`https://www.dmoe.cc/random.php?id=${_.id}`}
                  content={_.content}
                  datetime={`${_.address}-${_.createTime}`}
                  author={_.nickName}
                  key={_.id}
                ></Comment>
              ),
            )}
          </Comment>
        );
      })}
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        onConfirm={() => setVisible(false)}
      >
        <Comments articleId={id} updateList={initial} />
      </Modal>
    </>
  );
}

export default Evaluation;
