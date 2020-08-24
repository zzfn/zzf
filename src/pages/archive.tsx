import React, { useEffect } from "react";
import styles from '@/styles/article.module.scss'
import Head from "next/head";
import 'markdown-navbar/dist/navbar.css';
import { listTags } from "@/services/article";
import { Tag, Badge } from "antd";
export default function About({ serverProps }) {
    return <div className={styles.detail}>
        <Head>
            <title>zzf~归档</title>
        </Head>
    </div>
}

export const getServerSideProps = async () => {
    const { data } = await listTags({});
    return {
        props: {
            serverProps: data
        },
    };
};