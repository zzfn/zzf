import React from "react";
import Head from "next/head";
import '@/styles/globals.scss'
import '@/styles/markdown.scss';

import styles from '@/styles/app.module.scss'


function MyApp({Component, pageProps}) {
    return <>
        <Head>
            <title>zzf</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <header className={styles.header}>
            <img src={'/static/img/img-3.png'} alt="logo" />
            <nav>
                <a>首页</a>
                <a>归档</a>
                <a>标签</a>
                <a>更新日志</a>
                <a>关于本站</a>
            </nav>
        </header>
        <main>
            <Component {...pageProps} />
        </main>
        <footer className={styles.footer}>Powered by Zzf</footer>
    </>
}

export default MyApp
