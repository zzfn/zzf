import React from 'react';
import styles from './articleCard.module.scss';
import {Tag} from 'antd';
import {useRouter} from "next/router";

interface ArticleCardProps {
    dataSource: Article
}

export default function ArticleCard<ArticleCardProps>({dataSource}) {
    const router = useRouter();

    function toDetail(id: string) {
        router.push(`/article/${id}`)
    }

    return (
        <div onClick={() => toDetail(dataSource.id)} className={styles.page}>
            <h3>
                {dataSource.orderNum ? <Tag color="#9494E3">置顶</Tag> : null}{dataSource.title}
            </h3>
            <ul>
                <li>
                    <Tag color="#0095C7">{dataSource.tagDesc}</Tag>
                </li>
                <li>{dataSource.viewCount}</li>
                <li>{dataSource.createTime}</li>
            </ul>
        </div>
    );
};
