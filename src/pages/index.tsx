import React, { useEffect, useRef, useState } from 'react';
import { Os } from '@zzf/toolkit';
import Head from 'next/head';
import { listArticles } from 'api/article';
import { BackTop, Card, Layout, Loading } from '@zzf/design';
import ArticleCard from '../components/article/articleCard';
import { getTitle } from '../utils/getTitle';
import Image from 'next/image';
import styles from 'styles/home.module.scss';
import { formatImg } from '../utils/formatImg';
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
        <title>{getTitle('小时光')}</title>
      </Head>
      <BackTop>
        <Image height={40} width={40} layout={'intrinsic'} src={'/static/img/top.png'} />
      </BackTop>
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
            <Card
              title={
                <div className={styles.header}>
                  <img
                    className={styles.logo}
                    src={formatImg('https://cdn.zzfzzf.com/1621502933504Q5xgaS.png', 20)}
                    alt=''
                  />
                  关于我
                </div>
              }
              className={styles.card}
            >
              <div className={styles.wrap}>
                <img
                  className={styles.avatar}
                  src={formatImg('https://cdn.zzfzzf.com/1621500127578INeO4C.jpg', 100)}
                  alt='头像'
                />
              </div>
            </Card>
            <Card
              title={
                <div className={styles.header}>
                  <img
                    className={styles.logo}
                    src={formatImg('https://cdn.zzfzzf.com/1621502693811rjP4r7.png', 20)}
                    alt=''
                  />
                  关于本站
                </div>
              }
              className={styles.card}
            >
              文章数目 :6 <br />
              本站访客数 999: <br />
              本站总访问量 :1000 <br />
              最后更新时间 : 108 天前
            </Card>
            <Card
              title={
                <div className={styles.header}>
                  <img
                    className={styles.logo}
                    src='https://cdn.zzfzzf.com/1621502693811rjP4r7.png?imageView2/5/w/20/h/20/format/webp/interlace/1/q/75'
                    alt=''
                  />
                  公告
                </div>
              }
              className={styles.card}
            >
              暂无
            </Card>
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
