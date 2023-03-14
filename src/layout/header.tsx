import React from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';

function Header(): JSX.Element {
  const router = useRouter();

  return (
    <header
      className={classNames(
        'container max-w-4xl flex items-center mx-auto justify-between gap-x-2',
      )}
    ></header>
  );
}

export default Header;
