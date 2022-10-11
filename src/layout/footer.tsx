import React from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';

function Footer(): JSX.Element {
  return (
    <div className={classNames('text-neutral-3', 'text-xs', 'text-center', 'mt-6', 'mx-auto')}>
      <p>Copyright&copy;2020-{dayjs().format('YYYY')} </p>
      <p>oocc.run Inc. All rights reserved.</p>
      <a className='text-link-4' rel='noreferrer' target='_blank' href='https://beian.miit.gov.cn'>
        苏ICP备18059856号
      </a>
    </div>
  );
}

export default Footer;
