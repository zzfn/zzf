import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from 'styles/home.module.scss';
import { listArticles } from 'api/article';
import ArticleCard from 'components/article/articleCard';
import { useDebounce } from 'hooks/useDebounce';

export default function Home(props): JSX.Element {
  const { serverProps } = props;
  const [total, setTotal] = useState(serverProps.total);
  const [val, setVal] = useState<string>();
  const [page, setPage] = useState(serverProps.page);
  const [records, setRecords] = useState(serverProps.records);
  const de = useDebounce(change, 500);

  async function change() {
    const { data } = await listArticles({ pageNumber: page, pageSize: 10, title: val });
    setTotal(data.total);
    setPage(data.current);
    setRecords(data.records);
  }

  useEffect(() => {
    de();
  }, [page, val]);

  return (
    <div className={styles.home}>
      <Head>
        <title>zzf~首页</title>
      </Head>
      <input
        placeholder='🔍   请输入关键字搜索文章'
        className={styles.input}
        value={val}
        onChange={(event) => setVal(event.target.value)}
        type='text'
      />
      {records.map((item: Article) => (
        <ArticleCard key={item.id} dataSource={item} />
      ))}
      <div>
        目前第 {page} 頁，共有 {Number.parseInt(String(total / 10))} 頁
        {page > 1 && (
          <span className={styles.page} onClick={() => setPage(page - 1)}>
            上一页
          </span>
        )}
        {page < Number.parseInt(String(total / 10)) && (
          <span className={styles.page} onClick={() => setPage(page + 1)}>
            下一页
          </span>
        )}
        <span>共{total}篇文章</span>
      </div>
    </div>
  );
}
export const getStaticProps = async () => {
  const num = 1;
  const size = 10;
  const { data } = await listArticles({ pageNumber: num, pageSize: size });
  return {
    props: {
      serverProps: data,
    },
    revalidate: 1,
  };
};
