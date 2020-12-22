import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from 'styles/home.module.scss';
import { listArticles } from 'api/article';
import ArticleCard from 'components/article/articleCard';

export default function Home(props): JSX.Element {
  const { serverProps } = props;
  const [total, setTotal] = useState(serverProps.total);
  const [page, setPage] = useState(serverProps.page);
  const [records, setRecords] = useState(serverProps.records);

  async function change() {
    const { data } = await listArticles({ pageNumber: page, pageSize: 10 });
    setTotal(data.total);
    setPage(data.current);
    setRecords(data.records);
  }

  useEffect(() => {
    change();
  }, [page]);
  return (
    <div className={styles.home}>
      <Head>
        <title>首页~zzf</title>
      </Head>
      {records.map((item: Article) => (
        <ArticleCard key={item.id} dataSource={item} />
      ))}
      <div>
        目前第 {page} 頁，共有 {Number.parseInt(String(total / 10))} 頁
        {page > 1 && <span onClick={() => setPage(page - 1)}>上一页</span>}
        {page < Number.parseInt(String(total / 10)) && (
          <span onClick={() => setPage(page + 1)}>下一页</span>
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
