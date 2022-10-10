import React from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';

function Footer(): JSX.Element {
  return (
    <div className={classNames('text-gray-700', 'text-xs', 'text-center', 'mt-6', 'mx-auto')}>
      Powered by oocc 2020-{dayjs().format('YYYY')}&copy;
      <a rel="noreferrer" target='_blank' className='text-primary' href='https://beian.miit.gov.cn'>
        苏ICP备18059856号
      </a>
    </div>
  );
}

export default Footer;
