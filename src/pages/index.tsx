import React, { useEffect, useRef, useState } from 'react';
import { Os } from '@zzf/toolkit';
import Head from 'next/head';
import { listArticles } from 'api/article';
import { BackTop, Layout, Loading } from '@zzf/design';
import ArticleCard from '../components/article/articleCard';
import { geTitle } from '../utils/geTitle';

const Home: React.FC<NextProps<any>> = (props) => {
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
    <>
      <Head>
        <title>{geTitle('小时光')}</title>
      </Head>
      <BackTop />
      <Layout>
        <Layout.Content>
          <Loading noMore={noMore} key={page.current} onLoad={handleLoad}>
            {records.map((item: Article) => (
              <ArticleCard key={item.id} dataSource={item} />
            ))}
          </Loading>
        </Layout.Content>
        <Layout.Sidebar>
          <div>
            <div>热门专区</div>
            <p>待开发</p>
            <div>
              {/*<img*/}
              {/*  style={{ width: '100%' }}*/}
              {/*  src='https://cdn.zzfzzf.com/16213140255307Gk6nA.jpeg'*/}
              {/*  alt=''*/}
              {/*/>*/}
            </div>
          </div>
        </Layout.Sidebar>
      </Layout>
    </>
  );
};
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
export default Home;
