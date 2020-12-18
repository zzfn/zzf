import React, { useState } from 'react';
import { esList } from 'api/article';
import SearchCard from 'components/article/SearchCard';
import styles from 'styles/search.module.scss';

function Search(props) {
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState([]);

  async function query() {
    const { data } = await esList({ keyword });
    setResult(data);
  }

  return (
    <div className={styles.search}>
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
        <span>共找到{result.length}条结果</span>
      </div>
      {result.length
        ? result.map((item) => <SearchCard dataSource={item} key={item.id} />)
        : '暂无数据'}
    </div>
  );
}

export default Search;
