import React, { useEffect, useState } from 'react';
import Card from './Card';
import { listDiscuss, saveDiscuss } from 'api/discuss';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

function Evaluation(props: any) {
  const { id } = props;
  const [list, setList] = useState([]);
  const initial = async () => {
    const { data } = await listDiscuss({ id });
    setList(data);
  };
  const save = async (dataSource: any) => {
    const instance = await FingerprintJS.load();
    const result = await instance.get();
    const { data } = await saveDiscuss({
      articleId: '1414224246711787522',
      content: 'asd12312321312asdasd',
      createBy: result.visitorId,
    });
    // console.log(data);
  };
  useEffect(() => {
    initial();
  }, [id]);
  return (
    <>
      <hr />
      <header>
        <span>全部评论（{list?.length}）</span>
        <span onClick={save}>评论</span>
        <input type='text' />
      </header>
      {list?.map((item: any, index: number) => {
        return <Card index={index} key={item.id} data={item} />;
      })}
    </>
  );
}

export default Evaluation;
