import React from 'react';
import Link from 'next/link';

function Header(): JSX.Element {
  return (
    <>
      <ul>
        <li>
          <Link href={'/'}>首页</Link>
        </li>
        <li>
          <Link href={'/archive'}>归档</Link>
        </li>
        <li>
          <Link href={'/tag'}>标签</Link>
        </li>
        <li>
          <Link href={'/about'}>关于</Link>
        </li>
      </ul>
    </>
  );
}

export default Header;
