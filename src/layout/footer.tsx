import React from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';

function Footer(): JSX.Element {
  return (
    <footer className={classNames('text-[var(--secondary-text)]', 'text-xs', 'text-center', 'mt-6', 'mx-auto')}>
      <p>Copyright&copy;2020-{dayjs().format('YYYY')} </p>
      <p>oocc.run Inc. All rights reserved.</p>
      <a rel='noreferrer' target='_blank' href='https://beian.miit.gov.cn'>
        苏ICP备18059856号
      </a>
    </footer>
  );
}

export default Footer;
