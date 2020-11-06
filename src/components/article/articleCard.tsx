import React from "react";
import styles from "./articleCard.module.scss";
import { useRouter } from "next/router";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Tag } from "com/Tag/Tag";
import dayjs from "dayjs";
interface ArticleCardProps {
  dataSource: Article;
}

export default function ArticleCard<ArticleCardProps>({ dataSource }) {
  const router = useRouter();

  function toDetail(id: string) {
    router.push(`/article/${id}`);
  }

  return (
    <div onClick={() => toDetail(dataSource.id)} className={styles.card}>
      <h3>
        {dataSource.orderNum ? <Tag color="#9494E3">置顶</Tag> : null}
        {dataSource.title}
      </h3>
      <ul>
        <li>
          <Tag color="#0095C7">{dataSource.tagDesc}</Tag>
        </li>
        <li>{dataSource.viewCount}</li>
        <li>{dayjs(dataSource.createTime).format("YYYY-MM-DD")}</li>
      </ul>
    </div>
  );
}
