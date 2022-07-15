import React, { useState } from 'react';
import { esList } from 'api/article';
import SearchCard from 'components/article/SearchCard';
import Head from 'next/head';
import { getTitle } from '../utils/getTitle';
import { Input } from '@zzf/design';
import LottiePlayer from '../components/LottiePlayer/LottiePlayer';
import classNames from 'classnames';
import { useQuery } from 'react-query';

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
        <LottiePlayer size={100} url='https://oss-zzf.zzfzzf.com/cdn/1632384732662vd6JJP.json' />
      )}
    </>
  );
}

export default Search;
