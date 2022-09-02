import { GetStaticProps } from 'next';
import { changelogList } from 'api/changelog';
import dayjs from 'dayjs';
import classNames from "classnames";

const Changelog = (props: any) => {
  const { serverProps } = props;
  return (
    <ul>
      {serverProps.map((item: any) => (
        <li key={item.id}>
          <div className={classNames('flex', 'justify-between')}>
            <p>{item.title}</p>
            <p>{dayjs(item.updateTime).format('YYYY-MM-DD HH:mm')}</p>
          </div>
          <p className='text-gray-500'>{item.content}</p>
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
