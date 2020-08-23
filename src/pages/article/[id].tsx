import React from "react";
import {getArticle} from "@/services/article";
import {translateMarkdown} from "@/utils/translateMarkdown";

export default function ArticleDetail({serverProps}) {
    return <div>
        <div
            className={'markdown-template'}
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