import React, { useState } from 'react';
import { esList, topSearch } from 'api/article';
import SearchArticleCard from 'components/SearchArticleCard';
import Head from 'next/head';
import { getTitle } from '../utils/getTitle';
import { Card, Input, Space, Tag } from '@oc/design';
import LottiePlayer from '../components/LottiePlayer';
import classNames from 'classnames';
import { useQuery } from '@tanstack/react-query';
import { getCdn } from '../utils/getCdn';

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
      <h1 className='mt-18 mb-8 text-2.5xl text-center'>搜索</h1>
      <Card>
        <Head>
          <title>{getTitle('搜索')}</title>
        </Head>
        <form className={classNames('flex', 'py-4')} onSubmit={handleSubmit} action=''>
          <Input
            onChange={(event) => setKeyword(event.target.value.trim())}
            value={keyword}
            type='search'
            placeholder='elasticsearch强力驱动'
          />
        </form>
        <div className='text-[var(--blue-link)]'>
          {isFetching ? (
            <div>🔍 努力搜索中，请等待</div>
          ) : (
            <div>
              共找到<strong className='text-[var(--blue-link)]'>{result.length}</strong>条结果
            </div>
          )}
        </div>
        {result.length ? (
          result.map((item) => <SearchArticleCard dataSource={item} key={item.id} />)
        ) : (
          <>
            <h3 className='my-3'>你可能需要</h3>
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
      </Card>
    </>
  );
}

export default Search;
