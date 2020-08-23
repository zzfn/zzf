import React, {useEffect, useRef, useState} from "react";
import Head from "next/head";
import '@/styles/globals.scss'
import styles from '@/styles/app.module.scss'
import {Affix} from "antd";
import Link from "next/link";
import { Scrollbars } from 'react-custom-scrollbars';
import Zooming from 'zooming'
function MyApp({Component, pageProps}) {
    const [height,setHeight]=useState(0)
    useEffect(()=>{
        const zooming = new Zooming({
            scaleBase: 0.5,
            bgColor: 'rgb(0, 0, 0)',
            bgOpacity: '0.5'
        });
        zooming.listen('.zoom');
        setHeight(window.innerHeight-75)
    },[])
    return <>
        <Head>
            <title>zzf</title>
            <link rel="icon" href="/favicon.ico"/>
        </Head>
        <Affix offsetTop={0}>
            <header className={styles.header}>
                <div className={styles['header_main']}>
                    <img src={'/static/img/img-3.png'} alt="logo"/>
                    <nav>
                        <Link href="/">
                            <a>首页</a>
                        </Link>
                        <Link href="/archive">
                            <a>归档</a>
                        </Link>
                        <Link href="/tag">
                            <a>标签</a>
                        </Link>
                        <Link href="/changelog">
                            <a>更新日志</a>
                        </Link>
                        <Link href="/about">
                            <a>关于本站</a>
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
