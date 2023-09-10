'use client';
import React, { useState } from 'react';
import SearchArticleCard from 'components/SearchArticleCard';
import { Input } from '@oc/design';
import useDebouncedCallback from 'hooks/useDebouncedCallback';
import { useSearch } from "models/search";

function Page() {
  const [keyword, setKeyword] = useState('');
  const handleInputChange = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setKeyword(value);
  }, 200);
  const { data } = useSearch({ keyword });

  return (
    <>
      <h1 className='mt-18 mb-8 text-2.5xl text-center'>搜索</h1>
      <Input onChange={handleInputChange} placeholder='elasticsearch强力驱动' />
      {data?.map((item) => (
        <SearchArticleCard dataSource={item} key={item.id} />
      ))}
    </>
  );
}

export default Page;
