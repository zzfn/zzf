import Head from 'next/head'
import styles from '@/styles/home.module.scss'
import {StepBackwardOutlined} from '@ant-design/icons'
import {Pagination} from "antd";
import ZImg from "com/common/zImg";
import {listArticles} from "@/services/article";
import ArticleCard from "com/article/articleCard";

export default function Home(props) {
    const {serverProps} = props
    const {total}=serverProps
    return (
        <div className={styles.home}>
            <Head>
                <title>zzf~首页</title>
            </Head>
            <ZImg className={styles.bg} src={'/static/img/img-8.jfif'}/>
            {
                serverProps.records.map((item: Article) => <ArticleCard key={item.id} dataSource={item}/>)
            }
            <Pagination
                size="small"
                total={total}
            />
        </div>
    )
}
export const getServerSideProps = async () => {
    const num = 1;
    const size = 10;
    const {data} = await listArticles({page: num, limit: size});
    return {
        props: {
            serverProps: data
        },
    };
};