import React, { useRef, useState } from 'react';
import styles from './search.module.scss';
import useClickOutside from 'hooks/useClickOutside';
import { esList } from 'api/article';
import { useRouter } from 'next/router';
import { translateMarkdown } from '../../utils/translateMarkdown';

function Search({ children }) {
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const router = useRouter();
  const search = useRef();
  useClickOutside(search, () => {
    setIsShow(!isShow);
  });
  async function query() {
    const { data } = await esList({ keyword });
    setResult(data);
  }
  return (
    <>
      <span onClick={() => setIsShow(true)}>{children}</span>
      {isShow && (
        <div ref={search} className={styles.search}>
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
          </div>
          {result.length
            ? result.map((item, idx) => (
                <span
                  onClick={() => {
                    router.push(`/article/${item.id}`);
                    setIsShow(false);
                  }}
                  key={idx}
                >
                  {item.title &&
                    item.title.map((_, a) => (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: _,
                        }}
                        key={a}
                        className={['markdown-template', styles.content].join(' ')}
                      ></div>
                    ))}
                </span>
              ))
            : '暂无数据'}
        </div>
      )}
    </>
  );
}

export default Search;
