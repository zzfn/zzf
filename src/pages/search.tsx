import React, { useState } from 'react';
import { esList } from 'api/article';
import SearchCard from 'components/article/SearchCard';
import styles from 'styles/search.module.scss';
import Head from 'next/head';
import { log } from 'util';

function Search(props) {
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState([]);

  async function query() {
    const { data } = await esList({ keyword });
    setResult(data);
  }
  function handleSubmit(event) {
    event.preventDefault();
    alert('aa');
  }
  return (
    <>
      <Head>
        <title>搜索~zzf</title>
      </Head>
      <div className={styles.search}>
        <form onSubmit={handleSubmit} action=''>
          <div>
            <input type='search' placeholder='搜索' />
          </div>
          <button>搜索</button>
        </form>
        <div className={styles.content}>
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            className={styles.ipt}
            type='text'
          />
          <button onClick={query} className={styles.btn}>
            搜索
          </button>
          <span>
            共找到<strong>{result.length}</strong>条结果
          </span>
        </div>
        {result.length
          ? result.map((item) => <SearchCard dataSource={item} key={item.id} />)
          : '暂无数据'}
      </div>
    </>
  );
}

export default Search;
