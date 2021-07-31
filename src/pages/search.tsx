import React, { useState } from 'react';
import { esList } from 'api/article';
import SearchCard from 'components/article/SearchCard';
import styles from 'styles/search.module.scss';
import Head from 'next/head';
import { getTitle } from '../utils/getTitle';
import classNames from 'classnames';
import { Button } from '@zzf/design';

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

  async function handleSubmit(event) {
    event.preventDefault();
    await query();
  }

  return (
    <>
      <Head>
        <title>{getTitle('搜索')}</title>
      </Head>
      <div className={styles.search}>
        <form onSubmit={handleSubmit} action={''}>
          <input
            className={classNames(styles.ipt)}
            onChange={(event) => setKeyword(event.target.value)}
            value={keyword}
            type='search'
            placeholder='elasticsearch强力驱动'
          />
          <Button>回车搜索</Button>
        </form>
      </div>
      <div style={{ padding: '0 10px' }} className={'color-text-secondary'}>
        {loading ? (
          <div className={styles.searchResult}>努力搜索中💪，请等待</div>
        ) : (
          <div className={styles.searchResult}>
            共找到<strong>{result.length}</strong>条结果
          </div>
        )}
      </div>
      <div className={styles.result}>
        {result.length ? (
          result.map((item) => <SearchCard dataSource={item} key={item.id} />)
        ) : (
          <div className={'color-text-tertiary'} style={{ margin: 'auto' }}>
            暂无数据
          </div>
        )}
      </div>
    </>
  );
}

export default Search;
