'use client';
import React, { useState } from 'react';
import { esList } from 'api/article';
import SearchArticleCard from 'components/SearchArticleCard';
import { Input } from '@oc/design';
import classNames from 'classnames';

function Page() {
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState<Article[]>([]);

  async function refetch() {
    const { data } = await esList({ keyword });
    setResult(data);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await refetch();
  }

  return (
    <>
      <h1 className='mt-18 mb-8 text-2.5xl text-center'>搜索</h1>
      <form className={classNames('flex', 'py-4')} onSubmit={handleSubmit} action=''>
        <Input
          onChange={(event) => setKeyword(event.target.value.trim())}
          value={keyword}
          placeholder='elasticsearch强力驱动'
        />
      </form>
      {result.map((item: any) => (
        <SearchArticleCard dataSource={item} key={item.id} />
      ))}
    </>
  );
}

export default Page;
