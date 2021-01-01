import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from 'styles/home.module.scss';
import { listArticles } from 'api/article';
import ArticleCard from 'components/article/articleCard';
import Page from 'components/page/Page';
export default function Home(props): JSX.Element {
  const { serverProps } = props;
  const [total, setTotal] = useState(serverProps.total);
  const [click, setClick] = useState(false);
  const [page, setPage] = useState(serverProps.current);
  const [records, setRecords] = useState(serverProps.records);

  async function change() {
    const { data } = await listArticles({ pageNumber: page, pageSize: 10 });
    setTotal(data.total);
    setPage(data.current);
    setRecords(data.records);
  }

  useEffect(() => {
    if (click) {
      change();
    }
  }, [page]);
  return (
    <div className={styles.home}>
      <Head>
        <title>首页~zzf</title>
      </Head>
      {records.map((item: Article) => (
        <ArticleCard key={item.id} dataSource={item} />
      ))}
      <Page
        current={page}
        total={total}
        onChange={(v) => {
          setClick(true);
          setPage(v);
        }}
      />
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
