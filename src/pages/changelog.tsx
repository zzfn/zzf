import { GetStaticProps } from 'next';
import { changelogList } from 'api/changelog';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { Card } from '@oc/design';
import { translateMarkdown } from '../utils/translateMarkdown';
import Head from "next/head";
import { getTitle } from "../utils/getTitle";

const Changelog = (props: any) => {
  const { serverProps } = props;
  return (
    <ul>
      <Head>
        <title>{getTitle('公告')}</title>
      </Head>
      {serverProps.map((item: any) => (
        <li key={item.id} className='mb-2'>
          <Card>
            <h3 className={classNames('flex', 'justify-between','text-base','font-semibold')}>
              <span>{item.title}</span>
              <span>{dayjs(item.updateTime).format('YYYY-MM-DD')}</span>
            </h3>
            <article
              dangerouslySetInnerHTML={{
                __html: translateMarkdown(item.content),
              }}
              className='markdown-body text-xs font-normal'
            />
          </Card>
        </li>
      ))}
    </ul>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await changelogList();
  return {
    props: {
      serverProps: data,
    },
    revalidate: 5,
  };
};
export default Changelog;
