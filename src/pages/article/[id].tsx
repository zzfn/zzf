import React from "react";
import {getArticle} from "@/services/article";
import {translateMarkdown} from "@/utils/translateMarkdown";
import styles from '@/styles/article.module.scss'
import Head from "next/head";
export default function ArticleDetail({serverProps}) {
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
        <div
            className={['markdown-template'].join(' ')}
            dangerouslySetInnerHTML={{
                __html: translateMarkdown(serverProps.content),
            }}
        />
    </div>
}

export const getServerSideProps = async (context) => {
    const {params: {id}} = context
    const {data} = await getArticle({id});
    return {
        props: {
            serverProps: data
        },
    };
};