import React, {useEffect, useRef, useState} from "react";
import Head from "next/head";
import '@/styles/globals.scss'
import styles from '@/styles/app.module.scss'
import {Affix} from "antd";
import Link from "next/link";
import {HomeOutlined, DatabaseOutlined, TagOutlined, BugOutlined, PaperClipOutlined} from '@ant-design/icons';
import {Scrollbars} from 'react-custom-scrollbars';
import Zooming from 'zooming'

function MyApp({Component, pageProps}) {
    const [height, setHeight] = useState(0)
    useEffect(() => {
        const zooming = new Zooming({
            enableGrab: false,
            bgColor: 'rgb(0, 0, 0)',
            bgOpacity: '0.5'
        });
        zooming.listen('.zoom');
        setHeight(window.innerHeight - 75)
    }, [])
    return <>
        <Head>
            <title>zzf</title>
            <link rel="icon" href="/static/favicon.ico"/>
        </Head>
        <Affix offsetTop={0}>
            <header className={styles.header}>
                <div className={styles['header_main']}>
                    <Link href="/">
                        <img className={styles.logo} src={'/static/img/img-3.png'} alt="logo"/>
                    </Link>
                    <nav>
                        <Link href="/">
                            <span>
                                <HomeOutlined style={{color: '#00a7de'}}/>
                                <a>首页</a>
                            </span>
                        </Link>
                        <Link href="/archive">
      <span>
          <DatabaseOutlined style={{color: '#00a7de'}}/>
                            <a>归档</a>
      </span>
                        </Link>
                        <Link href="/tag">
                                  <span>
                                      <TagOutlined style={{color: '#00a7de'}}/>
                             <a>标签</a>
      </span>

                        </Link>
                        <Link href="/changelog">
                                                              <span>
                                                                  <BugOutlined style={{color: '#00a7de'}}/>
                             <a>更新日志</a>
      </span>
                        </Link>
                        <Link href="/about">
                                                                                          <span>
                                                                                              <PaperClipOutlined
                                                                                                  style={{color: '#00a7de'}}/>
                             <a>关于本站</a>
      </span>
                        </Link>
                    </nav>
                </div>
            </header>
        </Affix>
        {/*<Scrollbars*/}
        {/*    autoHide*/}
        {/*    autoHideTimeout={1000}*/}
        {/*    autoHideDuration={200}*/}
        {/*    autoHeight*/}
        {/*    autoHeightMin={0}*/}
        {/*    autoHeightMax={height}*/}
        {/*    thumbMinSize={30}*/}
        {/*    universal={true}>*/}
        <main className={styles.main}>
            <Component {...pageProps} />
        </main>
        <footer className={styles.footer}>Powered by Zzf</footer>
        {/*</Scrollbars>*/}
    </>
}

export default MyApp
