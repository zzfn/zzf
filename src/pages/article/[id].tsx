import React, { useEffect } from "react";
import { getArticle } from "@/services/article";
import { translateMarkdown } from "@/utils/translateMarkdown.tsx";
import styles from '@/styles/article.module.scss'
import Head from "next/head";
import MarkdownNavbar from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import { Affix } from "antd";
export default function ArticleDetail({ serverProps }) {
    return <div className={styles.detail}>
        <Head>
            <title>zzf~{serverProps.title}</title>
        </Head>
        <div className={styles.title}>
            <h1>{serverProps.title}</h1>
        </div>
        <div className={styles.tip}>
            <ul>
                <li>
                    <span>标签</span>
                    {serverProps.tagDesc}
                </li>
                <li>
                    <span>阅读量</span>
                    {serverProps.viewCount}
                </li>
                <li>
                    <span>发布于</span>
                    {serverProps.createTime}
                </li>
            </ul>
        </div>
        {/* <Affix offsetTop={50}> */}
            <MarkdownNavbar headingTopOffset={80} onNavItemClick={(e, el, v) => {
                console.log(v);
            }} source={serverProps.content} />
        {/* </Affix> */}
        <div
            className={['markdown-template', styles.content].join(' ')}
            dangerouslySetInnerHTML={{
                __html: translateMarkdown(serverProps.content),
            }}
        />
    </div>
}

export const getServerSideProps = async (context) => {
    const { params: { id } } = context
    const { data } = await getArticle({ id });
    return {
        props: {
            serverProps: data
        },
    };
};