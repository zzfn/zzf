import React from 'react';
import Image from 'next/image';
import favorites from 'favorites.json';
import styles from 'styles/favorites.module.scss';
import Link from 'next/link';

function Favorites(props) {
  return (
    <>
      {favorites.map((node) => (
        <React.Fragment key={node.category}>
          <h3 className={styles.header}>{node.category}</h3>
          <nav className={styles.ul}>
            {node.list.map((item) => (
              <Link key={item.title} href={item.link}>
                <a>
                  <Image height={40} width={40} layout={'intrinsic'} src={item.img} />
                  <section>{item.title}</section>
                </a>
              </Link>
            ))}
          </nav>
        </React.Fragment>
      ))}
    </>
  );
}

export default Favorites;
