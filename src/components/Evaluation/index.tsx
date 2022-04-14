import React, { useEffect, useState } from 'react';
import Card from './Card';
import { listDiscuss, saveDiscuss } from 'api/discuss';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { Button } from '@zzf/design';
import classNames from 'classnames';

function Evaluation(props: any) {
  const { id } = props;
  const [list, setList] = useState([]);
  const [msg, setMsg] = useState('');
  const initial = async () => {
    const { data } = await listDiscuss({ id });
    setList(data);
  };
  const save = async (dataSource: any) => {
    if (!msg) return;
    const instance = await FingerprintJS.load();
    const result = await instance.get();
    const { data } = await saveDiscuss({
      articleId: id,
      content: msg,
      createBy: result.visitorId,
    });
    // console.log(data);
    initial();
  };
  useEffect(() => {
    initial();
  }, [id]);
  return (
    <>
      <header className={classNames('border-y', 'my-4')}>全部评论（{list?.length}）</header>
      <section className='flex'>
        <textarea value={msg} onChange={(e) => setMsg(e.target.value)} className='border' />
        <Button onClick={save} className='border'>
          评论
        </Button>
      </section>
      {list?.map((item: any, index: number) => {
        return <Card index={list.length - index} key={item.id} data={item} />;
      })}
    </>
  );
}

export default Evaluation;
