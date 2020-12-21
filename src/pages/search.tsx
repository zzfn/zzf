import React, { useState } from 'react';
import { esList } from 'api/article';
import SearchCard from 'components/article/SearchCard';
import styles from 'styles/search.module.scss';
import Head from 'next/head';

function Search(props) {
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState([]);

  async function query() {
    const { data } = await esList({ keyword });
    setResult(data);
  }
  async function handleSubmit(event) {
    event.preventDefault();
    await query();
  }
  return (
    <>
      <Head>
        <title>搜索~zzf</title>
      </Head>
      <>
        <div className={styles.search}>
          <form onSubmit={handleSubmit} action={''}>
            <input
              className={styles.ipt}
              onChange={(event) => setKeyword(event.target.value)}
              value={keyword}
              type='search'
              placeholder='elasticsearch强力驱动'
            />
            <button className={styles.btn} type={'submit'}>
              搜索
            </button>
          </form>
        </div>
        <div style={{ padding: '0 10px' }}>
          共找到<strong>{result.length}</strong>条结果
        </div>
        <div className={styles.result}>
          {result.length ? (
            result.map((item) => <SearchCard dataSource={item} key={item.id} />)
          ) : (
            <div style={{ margin: 'auto' }}>暂无数据</div>
          )}
        </div>
      </>
    </>
  );
}

export default Search;
