import React, { useRef, useState } from 'react';
import { Os } from '@zzf/toolkit';
import Head from 'next/head';
import { getHot, lastUpdated, listArticles, overview } from 'api/article';
import More from 'components/loading/Loading';
import { BackTop, Card, Layout, Loading } from '@zzf/design';
import ArticleCard from '../components/article/articleCard';
import LottiePlayer from 'components/LottiePlayer/LottiePlayer';
import { getTitle } from '../utils/getTitle';
import Image from 'next/image';
import styles from 'styles/home.module.scss';
import { formatImg } from '../utils/formatImg';
import Link from 'next/link';
import { diff } from '../utils/time';
import classNames from 'classnames';
import type { GetStaticProps } from 'next';

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
        <Layout.Content className={'Box'}>
          <Loading noMore={noMore} key={page.current} onLoad={handleLoad} loading={<More />}>
            {records.map((item: Article) => (
              <ArticleCard key={item.id} dataSource={item} />
            ))}
          </Loading>
        </Layout.Content>
        <Layout.Sidebar>
          <Card
            className={styles.card}
            title={
              <div className={'flex items-center mb-1'}>
                <Image
                  loader={({ src }) => src}
                  src={formatImg('https://cdn.zzfzzf.com/1621502933504Q5xgaS.png', 20)}
                  alt='Landscape picture'
                  width={20}
                  height={20}
                />
                <span className={'ml-3'}>关于我</span>
              </div>
            }
          >
            <div className={styles.wrap}>
              <LottiePlayer
                size={100}
                url={'https://assets8.lottiefiles.com/packages/lf20_osthueqs.json'}
              />
            </div>
          </Card>
          <Card
            title={
              <div className={'text-primary flex items-center mb-1'}>
                <Image
                  loader={({ src }) => src}
                  src={formatImg('https://cdn.zzfzzf.com/1621502933504Q5xgaS.png', 20)}
                  alt='Landscape picture'
                  width={20}
                  height={20}
                />
                关于本站
              </div>
            }
            className={styles.card}
          >
            <div>本次加载时间{props.metric.FCP}ms</div>
          </Card>
          <Card
            title={
              <div className={'text-primary flex items-center mb-1'}>
                <img
                  className={'mr-3 w8 h8'}
                  src='https://cdn.zzfzzf.com/1621502693811rjP4r7.png?imageView2/5/w/20/h/20/format/webp/interlace/1/q/75'
                  alt=''
                />
                排行榜
              </div>
            }
            className={styles.card}
          >
            <ul>
              {serverProps.hot.slice(0, 5).map((n) => (
                <li className={styles.title} key={n.id}>
                  <Link prefetch={false} href={`/article/${n.id}`}>
                    <a
                      title={n.title}
                      className={classNames(styles.title, 'flex')}
                      target={'_blank'}
                    >
                      <div className={'truncate w-36'}>{n.title}</div>
                      <div className={'whitespace-nowrap'}>--{n.viewCount}</div>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
          <Card
            title={
              <div className={'text-primary flex items-center mb-1'}>
                <img
                  className={'mr-3 w8 h8'}
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
                    <a
                      title={n.title}
                      className={classNames(styles.title, 'flex')}
                      target={'_blank'}
                    >
                      <div className={'truncate w-36'}>{n.title}</div>
                      <div className={'whitespace-nowrap'}>--{diff(n.updateTime)}</div>
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
export const getStaticProps: GetStaticProps = async () => {
  const num = 1;
  const size = 10;
  const { data } = await listArticles({ pageNumber: num, pageSize: size });
  const { data: over } = await overview();
  const { data: list } = await lastUpdated();
  const { data: hot } = await getHot();
  return {
    props: {
      serverProps: { ...data, ...over, list, hot },
    },
    revalidate: 1,
  };
};

export default Home;
