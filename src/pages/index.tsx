import React, {useEffect, useState} from "react";
import Head from 'next/head'
import styles from '@/styles/home.module.scss'
import {Pagination} from "antd";
import ZImg from "com/common/zImg";
import {listArticles} from "@/services/article";
import ArticleCard from "com/article/articleCard";

export default function Home(props) {
    const {serverProps} = props
    const [total,setTotal]=useState(serverProps.total)
    const [page,setPage]=useState(serverProps.page)
    const [records,setRecords]=useState(serverProps.records)

    useEffect(()=>{
        listArticles({pageNumber: page, pageSize: 10}).then(({data})=>{
            setTotal(data.total)
            setPage(data.current)
            setRecords(data.records)
        })
    },[page])
    return (
        <div  className={styles.home}>
            <Head>
                <title>zzf~首页</title>
            </Head>
            <ZImg className={styles.bg} src={'/static/img/img-8.jfif'}/>
            {
                records.map((item: Article) => <ArticleCard key={item.id} dataSource={item}/>)
            }
            <Pagination
                onChange={(page)=>setPage(page)}
                current={page}
                size="small"
                total={total}
            />
        </div>
    )
}
export const getServerSideProps = async () => {
    const num = 1;
    const size = 10;
    const {data} = await listArticles({pageNumber: num, pageSize: size});
    return {
        props: {
            serverProps: data
        },
    };
};