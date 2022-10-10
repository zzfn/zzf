import React, { useState } from 'react';
import { esList, topSearch } from 'api/article';
import SearchCard from 'components/article/SearchCard';
import Head from 'next/head';
import { getTitle } from '../utils/getTitle';
import { Input, Space, Tag } from '@ootd/design';
import LottiePlayer from '../components/LottiePlayer/LottiePlayer';
import classNames from 'classnames';
import { useQuery } from '@tanstack/react-query';
import { getCdn } from "../utils/getCdn";

function Search(): JSX.Element {
  const [keyword, setKeyword] = useState('');
  const {
    data: result = [],
    isFetching,
    refetch,
  } = useQuery(['search'], () => esList({ keyword }).then((data) => data.data), {
    enabled: false,
    refetchOnWindowFocus: false,
  });

  const { data = [] } = useQuery(['topSearch'], () => topSearch().then(({ data }) => data));

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await refetch();
  }

  return (
    <>
      <Head>
        <title>{getTitle('搜索')}</title>
      </Head>
      <form className={classNames('flex', 'py-4')} onSubmit={handleSubmit} action=''>
        <Input
          autoFocus
          onChange={(event) => setKeyword(event.target.value.trim())}
          value={keyword}
          type='search'
          placeholder='elasticsearch强力驱动'
        />
      </form>
      <div className='text-info'>
        {isFetching ? (
          <div>🔍 努力搜索中，请等待</div>
        ) : (
          <div>
            共找到<strong className='text-primary'>{result.length}</strong>条结果
          </div>
        )}
      </div>
      {result.length ? (
        result.map((item) => <SearchCard dataSource={item} key={item.id} />)
      ) : (
        <>
          <LottiePlayer size={100} url={getCdn('/assets/loading.json')} />
          <h3 className="my-3">热搜</h3>
          <Space>
            {data.map((item: string) => (
              <Tag
                onClick={() => {
                  setKeyword(item);
                  setTimeout(refetch);
                }}
                key={item}
              >
                {item}
              </Tag>
            ))}
          </Space>
        </>
      )}
    </>
  );
}

export default Search;
