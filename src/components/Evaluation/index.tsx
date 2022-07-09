import React, { useEffect, useState } from 'react';
import Card from './Card';
import { listDiscuss } from 'api/discuss';
import classNames from 'classnames';
import Comment from './Comment';
import { Modal } from "@zzf/design";

function Evaluation(props: any) {
  const { id } = props;
  const [list, setList] = useState([]);
  const [len, setLen] = useState(0);
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
        <Modal toggled={<span className='text-gray-400'>点击回复</span>}>
          <Comment articleId={id} updateList={initial} />
        </Modal>
      </header>
      {list?.map((item: any) => {
        return <Card updateList={initial} key={item.id} dataSource={item} />;
      })}
    </>
  );
}

export default Evaluation;
