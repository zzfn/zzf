'use client';
import IconSymbols from './IconSymbols';
import { Drawer, IconButton } from '@oc/design';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAtomValue } from 'jotai';
import {articleRecoil, articleState} from "store/store";
import {useRecoilValue} from "recoil";

const Menu = ({ navLinks }: any) => {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const atomValue= useAtomValue(articleState);
  const articleRecoilValue = useRecoilValue(articleRecoil)
  useEffect(()=>{
      console.log(pathname,atomValue,articleRecoilValue);
  },[atomValue])
  return (
    <>
      <IconButton>
        <IconSymbols onClick={() => setVisible(true)} icon='menu'></IconSymbols>
      </IconButton>
      <Drawer onCancel={() => setVisible(false)} visible={visible}>
        <div className='flex flex-col items-center justify-center h-full gap-y-8'>
          {navLinks.map((link: any) => {
            const isActive = pathname === link.href;

            return (
              <Link
                className={isActive ? 'text-accent' : 'text-default'}
                href={link.href}
                key={link.name}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </Drawer>
    </>
  );
};
export default Menu;
