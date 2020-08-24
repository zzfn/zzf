import React, { useEffect } from "react";
import styles from '@/styles/article.module.scss'
import Head from "next/head";
import 'markdown-navbar/dist/navbar.css';
export default function About({ serverProps }) {
    return <div className={styles.detail}>
        <Head>
            <title>zzf~关于</title>
        </Head>
        <h3>GitHub https://github.com/nanaouyang/zzf</h3>
        <h3>
            该系统采用 react typescript nextjs 编写。
        </h3>
        <h3>
            后台地址 https://github.com/nanaouyang/jello.git
        </h3>
        <h3> 支持特性：</h3>

        <ul>
            <li>文章：创建、分类、标签、预览、发布、编辑、密码访问，以及搜索</li>
            <li>页面：创建、预览、发布</li>
            <li>评论：发布、回复（后台审核通过后可显示）</li>
            <li>用户：访客注册、访客授权</li>
            <li>文件上传：目前仅支持上传到 阿里云 OSS</li>
            <li>邮件通知：收到新评论时，会邮件通知管理员；评论通过后，会邮件通知被评论人</li>
            <li>动态系统设置：系统标题、Logo、favicon、页脚、 SEO 配置、OSS配置以及邮箱配置等</li>
            <li>系统访问统计：ip + user-agent</li>
        </ul>

    </div>
}
