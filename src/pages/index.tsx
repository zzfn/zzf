import React, { useEffect, useRef, useState } from 'react';
import { Os } from '@zzf/toolkit';
import Head from 'next/head';
import { lastUpdated, listArticles, overview } from 'api/article';
import { BackTop, Card, Layout, Loading } from '@zzf/design';
import ArticleCard from '../components/article/articleCard';
import { getTitle } from '../utils/getTitle';
import Image from 'next/image';
import styles from 'styles/home.module.scss';
import { formatImg } from '../utils/formatImg';
import Link from 'next/link';
import { diff } from '../utils/time';

const Home: React.FC<NextProps<any>> = (props) => {
  const { serverProps } = props;
  const page = useRef(serverProps.current);
  const [noMore, setNoMore] = useState(false);
  const [records, setRecords] = useState(serverProps.records);

  async function handleLoad() {
    console.log(serverProps);
    console.log(Os.getBrowser());
    const { data } = await listArticles({
      current: page.current + 1,
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
            文章数目 : {serverProps.aLlArticleCount} <br />
            最后更新时间 : {serverProps.lastUpdateTime}
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
            新版博客上线啦
          </Card>
          <Card
            title={
              <div className={styles.header}>
                <img
                  className={styles.logo}
                  src='https://cdn.zzfzzf.com/1621502693811rjP4r7.png?imageView2/5/w/20/h/20/format/webp/interlace/1/q/75'
                  alt=''
                />
                最近更新
              </div>
            }
            className={styles.card}
          >
            <ul>
              {serverProps.list.map((n) => (
                <li className={styles.title} key={n.id}>
                  <Link prefetch={false} href={`/article/${n.id}`}>
                    <a className={styles.title} target={'_blank'}>
                      {n.title}
                      <br />
                      <div style={{ width: '66px', marginLeft: 'auto', textDecoration: 'none' }}>
                        --{diff(n.updateTime)}
                      </div>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        </Layout.Sidebar>
      </Layout>
    </>
  );
};
export const getStaticProps = async () => {
  const num = 1;
  const size = 10;
  const { data } = await listArticles({ pageNumber: num, pageSize: size });
  const { data: over } = await overview();
  const { data: list } = await lastUpdated();
  console.log(list);
  return {
    props: {
      serverProps: { ...data, ...over, list },
    },
    revalidate: 1,
  };
};
export default Home;
