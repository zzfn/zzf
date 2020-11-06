import React from "react";
import styles from "./articleCard.module.scss";
import { useRouter } from "next/router";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Tag } from "com/Tag/Tag";
interface ArticleCardProps {
  dataSource: Article;
}

export default function ArticleCard<ArticleCardProps>({ dataSource }) {
  const router = useRouter();

  function toDetail(id: string) {
    router.push(`/article/${id}`);
  }

  return (
    <div onClick={() => toDetail(dataSource.id)} className={styles.page}>
      <h3>
        {dataSource.orderNum ? <Tag color="#9494E3">置顶</Tag> : null}
        {dataSource.title}
      </h3>
      <ul>
        <li>
          <span color="#0095C7">{dataSource.tagDesc}</span>
        </li>
        <li>{dataSource.viewCount}</li>
        <li>
          <ClockCircleOutlined />
          发布于{dataSource.createTime}
        </li>
      </ul>
    </div>
  );
}
