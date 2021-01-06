import React, { useState } from 'react';
import Head from 'next/head';
import styles from 'styles/home.module.scss';
import { listArticles } from 'api/article';
import ArticleCard from 'components/article/articleCard';

export default function Home(props): JSX.Element {
  const { serverProps } = props;
  const [page, setPage] = useState(serverProps.current);
  const [records, setRecords] = useState(serverProps.records);
  async function handleLoad(cur) {
    const { data } = await listArticles({ pageNumber: cur, pageSize: 10 });
    setRecords([...records, ...data.records]);
    setPage(data.current);
  }
  return (
    <div className={styles.home}>
      <Head>
        <title>首页~zzf</title>
      </Head>
      {records.map((item: Article) => (
        <ArticleCard key={item.id} dataSource={item} />
      ))}
      <div className={styles.more} onClick={() => handleLoad(page + 1)}>
        点击加载更多
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
