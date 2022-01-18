import React from 'react';
import dayjs from 'dayjs';
import { Layout, SvgIcon } from '@zzf/design';
import classNames from 'classnames';
import Icon from 'components/Icon';
import Link from 'next/link';
import json from '../../menus.json';

function Footer(): JSX.Element {
  return (
    <Layout.Footer
      className={classNames('flex', 'justify-between', 'items-center', 'py-6', 'leading-6')}
    >
      <div className={classNames('flex', 'flex-col', 'justify-between', 'leading-6','h-full')}>
        <div>
          <div
            className={classNames(
              'font-medium',
              'text-primary',
              'text-2xl',
              'flex',
              'items-center',
            )}
          >
            Zzf <Icon name={'logo-min'} size={16} /> Zzf
          </div>
          <div className={classNames('text-gray-700', 'font-medium', 'text-sm')}>
            Powered by zzfn
          </div>
        </div>
        <div className={classNames('text-gray-700', 'text-xs')}>
          2020-{dayjs().format('YYYY')}&copy;苏ICP备18059856号
        </div>
      </div>
      <div className={'flex'}>
        <div>
          <div className={classNames('text-gray-700', 'font-light', 'mb-3')}>导航</div>
          <ul>
            {json.map((menu) => (
              <li key={menu.path}>
                <Link href={`${menu.path}`}>
                  <a>{menu.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={'ml-36'}>
          <div className={classNames('text-gray-700', 'font-light', 'mb-3')}>链接</div>
          <ul>
            <li>
              <Link href={'https://jenkins.zzfzzf.com/'}>
                <a target={'_blank'}>jenkins</a>
              </Link>
            </li>
            <li>
              <Link href={'https://npm.zzfzzf.com/'}>
                <a target={'_blank'}>npm</a>
              </Link>
            </li>
            <li>
              <Link href={'https://admin.zzfzzf.com/'}>
                <a target={'_blank'}>admin</a>
              </Link>
            </li>
            <li>
              <Link href={'https://github.com/zzfn'}>
                <a target={'_blank'}>github</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Layout.Footer>
  );
}

export default Footer;
