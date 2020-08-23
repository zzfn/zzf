import React from "react";
import Head from "next/head";
import '@/styles/globals.scss'
import styles from '@/styles/app.module.scss'
import {Affix} from "antd";
import Link from "next/link";


function MyApp({Component, pageProps}) {
    return <>
        <Head>
            <title>zzf</title>
            <link rel="icon" href="/favicon.ico"/>
        </Head>
        <Affix offsetTop={0}>
        <header className={styles.header}>
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
        </header>
        </Affix>
        <main className={styles.main}>
            <Component {...pageProps} />
        </main>
        <footer className={styles.footer}>Powered by Zzf</footer>
    </>
}

export default MyApp
