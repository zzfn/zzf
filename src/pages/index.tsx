import React, { useEffect, useRef, useState } from 'react';
import { Os } from '@zzf/toolkit';
import Head from 'next/head';
import { lastUpdated, listArticles, overview } from 'api/article';
import More from 'components/loading/Loading';
import { BackTop, Card, Layout, Loading } from '@zzf/design';
import ArticleCard from '../components/article/articleCard';
import { getTitle } from '../utils/getTitle';
import Image from 'next/image';
import styles from 'styles/home.module.scss';
import { formatImg } from '../utils/formatImg';
import Link from 'next/link';
import { diff } from '../utils/time';
import classNames from 'classnames';

const Home: React.FC<NextProps<any>> = (props) => {
  const { serverProps } = props;
  const page = useRef(serverProps.current);
  const [noMore, setNoMore] = useState(false);
  const [request, setRequest] = useState(0);
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

  useEffect(() => {
    const { request }: any = getPerformanceTiming();
    setRequest(request);
  }, []);
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
              <Image
                className={styles.wrapAvatar}
                src={formatImg('https://cdn.zzfzzf.com/1621500127578INeO4C.jpg', 100)}
                alt='Landscape picture'
                width={100}
                height={100}
              />
            </div>
          </Card>
          <Card
            title={
              <div className={'text-primary flex items-center mb-1'}>
                <img
                  className={'mr-3 w8 h8'}
                  src={formatImg('https://cdn.zzfzzf.com/1621502693811rjP4r7.png', 20)}
                  alt=''
                />
                关于本站
              </div>
            }
            className={styles.card}
          >
            本次加载时间{request}ms
            {/*文章数目 : {serverProps.aLlArticleCount} <br />*/}
            {/*最后更新时间 : {serverProps.lastUpdateTime}*/}
          </Card>
          <Card
            title={
              <div className={'text-primary flex items-center mb-1'}>
                <img
                  className={'mr-3 w8 h8'}
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
  return {
    props: {
      serverProps: { ...data, ...over, list },
    },
    revalidate: 1,
  };
};
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};
export default Home;
function getPerformanceTiming() {
  const performance = window.performance;

  if (!performance) {
    // 当前浏览器不支持
    console.log('你的浏览器不支持 performance 接口');
    return;
  }

  const t = performance.timing;
  const times: any = {};

  //【重要】页面加载完成的时间
  //【原因】这几乎代表了用户等待页面可用的时间
  times.loadPage = t.loadEventEnd - t.fetchStart;

  //【重要】解析 DOM 树结构的时间
  //【原因】反省下你的 DOM 树嵌套是不是太多了！
  times.domReady = t.domComplete - t.responseEnd;

  //【重要】重定向的时间
  //【原因】拒绝重定向！比如，http://example.com/ 就不该写成 http://example.com
  times.redirect = t.redirectEnd - t.redirectStart;

  //【重要】DNS 查询时间
  //【原因】DNS 预加载做了么？页面内是不是使用了太多不同的域名导致域名查询的时间太长？
  // 可使用 HTML5 Prefetch 预查询 DNS ，见：[HTML5 prefetch](http://segmentfault.com/a/1190000000633364)
  times.lookupDomain = t.domainLookupEnd - t.domainLookupStart;

  //【重要】读取页面第一个字节的时间
  //【原因】这可以理解为用户拿到你的资源占用的时间，加异地机房了么，加CDN 处理了么？加带宽了么？加 CPU 运算速度了么？
  // TTFB 即 Time To First Byte 的意思
  // 维基百科：https://en.wikipedia.org/wiki/Time_To_First_Byte
  times.ttfb = t.responseStart - t.navigationStart;

  //【重要】内容加载完成的时间
  //【原因】页面内容经过 gzip 压缩了么，静态资源 css/js 等压缩了么？
  times.request = t.responseEnd - t.requestStart;

  //【重要】执行 onload 回调函数的时间
  //【原因】是否太多不必要的操作都放到 onload 回调函数里执行了，考虑过延迟加载、按需加载的策略么？
  times.loadEvent = t.loadEventEnd - t.loadEventStart;

  // DNS 缓存时间
  times.appcache = t.domainLookupStart - t.fetchStart;

  // 卸载页面的时间
  times.unloadEvent = t.unloadEventEnd - t.unloadEventStart;

  // TCP 建立连接完成握手的时间
  times.connect = t.connectEnd - t.connectStart;

  return times;
}
