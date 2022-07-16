import type { NextPageWithLayout } from './_app';
import type { ReactElement } from 'react';
import NoAsideLayout from 'components/layout/NoAsideLayout';
import { listDiscuss } from 'api/discuss';
import React, { useEffect, useState } from 'react';
import Evaluation from '../components/Evaluation';

const Message: NextPageWithLayout = () => {
  const [list, setList] = useState([]);

  const initial = async () => {
    const { data } = await listDiscuss({ id: '' });
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
  }, []);
  return (
    <div>
      留言
      <Evaluation id='' />
    </div>
  );
};
export default Message;

Message.getLayout = function (page: ReactElement) {
  return <NoAsideLayout>{page}</NoAsideLayout>;
};
