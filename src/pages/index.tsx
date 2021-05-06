import React, { useRef, useState } from 'react';
import { Os } from '@zzf/toolkit';
import Head from 'next/head';
import styles from 'styles/home.module.scss';
import { listArticles } from 'api/article';
import ArticleCard from 'components/article/articleCard';
import Loading from '../components/loading/Loading';
export default function Home(props): JSX.Element {
  const { serverProps } = props;
  const page = useRef(serverProps.current);
  const [noMore, setNoMore] = useState(false);
  const [records, setRecords] = useState(serverProps.records);

  async function handleLoad() {
    console.log(Os.getBrowser());
    const { data } = await listArticles({
      pageNumber: page.current + 1,
      pageSize: 10,
    });
    setRecords([...records, ...data.records]);
    setNoMore(data.records.length === 0);
    page.current = data.current;
  }

  return (
    <div className={styles.home}>
      <Head>
        <title>首页|zzfzzf|前端博客</title>
      </Head>
      <Loading noMore={noMore} key={page.current} onLoad={handleLoad}>
        {records.map((item: Article) => (
          <ArticleCard key={item.id} dataSource={item} />
        ))}
      </Loading>
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
    notFound: true,
    revalidate: 1,
  };
};
