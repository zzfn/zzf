import React, { useState } from 'react';
import { esList } from 'api/article';
import SearchCard from 'components/article/SearchCard';
import Head from 'next/head';
import { getTitle } from '../utils/getTitle';
import { Button, Input } from '@zzf/design';
import LottiePlayer from '../components/LottiePlayer/LottiePlayer';
import classNames from 'classnames';

function Search(): JSX.Element {
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  async function query() {
    setLoading(true);
    const { data } = await esList({ keyword });
    setLoading(false);
    setResult(data);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await query();
  }

  return (
    <>
      <Head>
        <title>{getTitle('搜索')}</title>
      </Head>
      <form className={classNames('flex', 'py-4')} onSubmit={handleSubmit} action={''}>
        <Input
          autoFocus
          onChange={(event) => setKeyword(event.target.value)}
          value={keyword}
          type='search'
          placeholder='elasticsearch强力驱动'
        />
        <Button>回车搜索</Button>
      </form>
      <div className={'text-secondary'}>
        {loading ? (
          <div>🔍 努力搜索中，请等待</div>
        ) : (
          <div>
            共找到<strong>{result.length}</strong>条结果
          </div>
        )}
      </div>
      {result.length ? (
        result.map((item) => <SearchCard dataSource={item} key={item.id} />)
      ) : (
        <LottiePlayer size={100} url={'https://cdn.zzfzzf.com/1632384732662vd6JJP.json'} />
      )}
    </>
  );
}

export default Search;
