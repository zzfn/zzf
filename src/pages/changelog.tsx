import { GetStaticProps } from 'next';
import { changelogList } from 'api/changelog';
import dayjs from 'dayjs';
import classNames from 'classnames';

const Changelog = (props: any) => {
  const { serverProps } = props;
  return (
    <ul>
      {serverProps.map((item: any) => (
        <li key={item.id} className='mb-2'>
          <h3 className={classNames('flex', 'justify-between')}>
            <span>{item.title}</span>
            <span>{dayjs(item.updateTime).format('YYYY-MM-DD HH:mm')}</span>
          </h3>
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
